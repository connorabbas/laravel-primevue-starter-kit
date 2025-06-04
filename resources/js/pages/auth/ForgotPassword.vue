<script setup>
import { useTemplateRef, onMounted } from 'vue';
import { useForm } from '@inertiajs/vue3';
import GuestAuthLayout from '@/layouts/GuestAuthLayout.vue';

defineProps({
    status: {
        type: String,
    },
});

const emailInput = useTemplateRef('email-input');

const forgotPasswordForm = useForm({
    email: '',
});

const submit = () => {
    forgotPasswordForm.post(route('password.email'));
};

onMounted(() => {
    emailInput.value.$el.focus();
});
</script>

<template>
    <GuestAuthLayout>
        <InertiaHead title="Forgot password" />

        <template
            v-if="status"
            #message
        >
            <Message
                severity="success"
                :closable="false"
                class="shadow-sm"
            >
                {{ status }}
            </Message>
        </template>

        <template #title>
            <div class="text-center">
                Forgot password
            </div>
        </template>

        <template #subtitle>
            <div class="text-center">
                Enter your email address to receive a password reset link
            </div>
        </template>

        <form
            class="space-y-6 sm:space-y-8"
            @submit.prevent="submit"
        >
            <div class="flex flex-col gap-2">
                <label for="email">Email address</label>
                <InputText
                    id="email"
                    ref="email-input"
                    v-model="forgotPasswordForm.email"
                    :invalid="Boolean(forgotPasswordForm.errors?.email)"
                    type="email"
                    autocomplete="username"
                    required
                    fluid
                />
                <Message
                    v-if="forgotPasswordForm.errors?.email"
                    severity="error"
                    variant="simple"
                    size="small"
                >
                    {{ forgotPasswordForm.errors?.email }}
                </Message>
            </div>

            <div>
                <Button
                    :loading="forgotPasswordForm.processing"
                    type="submit"
                    label="Email password reset link"
                    fluid
                />
            </div>

            <div class="text-center">
                <span class="text-muted-color mr-1">Or, return to</span>
                <InertiaLink :href="route('login')">
                    <Button
                        class="p-0"
                        variant="link"
                        label="log in"
                    />
                </InertiaLink>
            </div>
        </form>
    </GuestAuthLayout>
</template>
