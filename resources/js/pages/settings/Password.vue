<script setup>
import { useTemplateRef } from 'vue';
import { useForm } from '@inertiajs/vue3';
import { useToast } from 'primevue/usetoast';
import Password from 'primevue/password';
import AppLayout from '@/layouts/AppLayout.vue';
import SettingsLayout from '@/layouts/UserSettingsLayout.vue';

defineProps({
    mustVerifyEmail: {
        type: Boolean,
    },
    status: {
        type: String,
    },
});

const currentPasswordInput = useTemplateRef('current-password-input');
const newPasswordInput = useTemplateRef('new-password-input');

const toast = useToast();
const updatePasswordForm = useForm({
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
    updatePasswordForm.put(route('password.update'), {
        preserveScroll: true,
        onSuccess: () => {
            updatePasswordForm.reset();
            showSuccessToast();
        },
        onError: () => {
            if (updatePasswordForm.errors?.password) {
                updatePasswordForm.reset('password', 'password_confirmation');
                const newPasswordInputElement = newPasswordInput.value.$el.querySelector('input');
                if (newPasswordInputElement) {
                    newPasswordInputElement.focus();
                }
            }
            if (updatePasswordForm.errors?.current_password) {
                updatePasswordForm.reset('current_password');
                const currentPasswordInputElement = currentPasswordInput.value.$el.querySelector('input');
                if (currentPasswordInputElement) {
                    currentPasswordInputElement.focus();
                }
            }
        },
    });
};
</script>

<template>
    <AppLayout>
        <InertiaHead title="Password Settings" />

        <SettingsLayout>
            <Card
                pt:body:class="max-w-2xl space-y-3"
                pt:caption:class="space-y-1"
            >
                <template #title>
                    Update Password
                </template>
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
                            <Password
                                id="current_password"
                                ref="current-password-input"
                                v-model="updatePasswordForm.current_password"
                                :invalid="Boolean(updatePasswordForm.errors?.current_password)"
                                autocomplete="current-password"
                                :feedback="false"
                                toggleMask
                                required
                                fluid
                            />
                            <Message
                                v-if="updatePasswordForm.errors?.current_password"
                                severity="error"
                                variant="simple"
                                size="small"
                            >
                                {{ updatePasswordForm.errors?.current_password }}
                            </Message>
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="password">New Password</label>
                            <Password
                                id="password"
                                ref="new-password-input"
                                v-model="updatePasswordForm.password"
                                :invalid="Boolean(updatePasswordForm.errors?.password)"
                                autocomplete="new-password"
                                toggleMask
                                required
                                fluid
                            />
                            <Message
                                v-if="updatePasswordForm.errors?.password"
                                severity="error"
                                variant="simple"
                                size="small"
                            >
                                {{ updatePasswordForm.errors?.password }}
                            </Message>
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="password_confirmation">Confirm Password</label>
                            <Password
                                id="password_confirmation"
                                v-model="updatePasswordForm.password_confirmation"
                                :invalid="Boolean(updatePasswordForm.errors?.password_confirmation)"
                                autocomplete="confirm-password"
                                :feedback="false"
                                toggleMask
                                required
                                fluid
                            />
                            <Message
                                v-if="updatePasswordForm.errors?.password_confirmation"
                                severity="error"
                                variant="simple"
                                size="small"
                            >
                                {{ updatePasswordForm.errors?.password_confirmation }}
                            </Message>
                        </div>
                        <Button
                            :loading="updatePasswordForm.processing"
                            type="submit"
                            label="Save"
                        />
                    </form>
                </template>
            </Card>
        </SettingsLayout>
    </AppLayout>
</template>
