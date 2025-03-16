<script setup>
import { useTemplateRef, onMounted } from 'vue';
import { useForm } from '@inertiajs/vue3';
import { useToast } from 'primevue/usetoast';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue';
import SettingsLayout from '@/layouts/UserSettingsLayout.vue';

defineProps({
    mustVerifyEmail: {
        type: Boolean,
    },
    status: {
        type: String,
    },
});

defineOptions({ layout: AuthenticatedLayout });

const currentPasswordInput = useTemplateRef('current-password-input');
const newPasswordInput = useTemplateRef('new-password-input');

const toast = useToast();
const form = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
});

const showSuccessToast = () => {
    toast.add({
        severity: 'success',
        summary: 'Saved',
        detail: 'Your password has been updated',
        life: 3000,
    });
};
const updatePassword = () => {
    form.put(route('password.update'), {
        preserveScroll: true,
        onSuccess: () => {
            form.reset();
            showSuccessToast();
        },
        onError: () => {
            if (form.errors?.password) {
                form.reset('password', 'password_confirmation');
                newPasswordInput.value.$el.focus();
            }
            if (form.errors?.current_password) {
                form.reset('current_password');
                currentPasswordInput.value.$el.focus();
            }
        },
    });
};

onMounted(() => {
    currentPasswordInput.value.$el.focus();
});
</script>

<template>
    <InertiaHead title="Password Settings" />

    <SettingsLayout>
        <Card
            pt:body:class="max-w-2xl space-y-3"
            pt:caption:class="space-y-1"
        >
            <template #title>Update Password</template>
            <template #subtitle>
                Ensure your account is using a long, random password to stay secure
            </template>
            <template #content>
                <form
                    class="space-y-6"
                    @submit.prevent="updatePassword"
                >
                    <div class="flex flex-col gap-2">
                        <label for="current_password">Current Password</label>
                        <InputText
                            id="current_password"
                            ref="current-password-input"
                            v-model="form.current_password"
                            type="password"
                            required
                            fluid
                            :invalid="Boolean(form.errors?.current_password)"
                            autocomplete="current-password"
                        />
                        <Message
                            v-if="form.errors?.current_password"
                            severity="error"
                            variant="simple"
                            size="small"
                        >
                            {{ form.errors?.current_password }}
                        </Message>
                    </div>
                    <div class="flex flex-col gap-2">
                        <label for="password">New Password</label>
                        <InputText
                            id="password"
                            ref="new-password-input"
                            v-model="form.password"
                            type="password"
                            required
                            fluid
                            :invalid="Boolean(form.errors.password)"
                            autocomplete="new-password"
                        />
                        <Message
                            v-if="form.errors?.password"
                            severity="error"
                            variant="simple"
                            size="small"
                        >
                            {{ form.errors?.password }}
                        </Message>
                    </div>
                    <div class="flex flex-col gap-2">
                        <label for="password_confirmation">Confirm Password</label>
                        <InputText
                            id="password_confirmation"
                            v-model="form.password_confirmation"
                            type="password"
                            required
                            fluid
                            :invalid="Boolean(form.errors.password_confirmation)"
                            autocomplete="new-password"
                        />
                        <Message
                            v-if="form.errors?.password_confirmation"
                            severity="error"
                            variant="simple"
                            size="small"
                        >
                            {{ form.errors?.password_confirmation }}
                        </Message>
                    </div>
                    <Button
                        :loading="form.processing"
                        type="submit"
                        label="Save"
                    />
                </form>
            </template>
        </Card>
    </SettingsLayout>
</template>
