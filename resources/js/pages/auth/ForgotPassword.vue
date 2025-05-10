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
        <InertiaHead title="Forgot Password" />

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

        <div class="mb-6 text-sm text-muted-color">
            Forgot your password? No problem. Just let us know your email
            address and we will email you a password reset link that will allow
            you to choose a new one.
        </div>

        <form
            class="space-y-6"
            @submit.prevent="submit"
        >
            <div class="flex flex-col gap-2">
                <label for="email">Email</label>
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

            <div class="flex justify-end items-center">
                <Button
                    :loading="forgotPasswordForm.processing"
                    type="submit"
                    label="Email Password Reset Link"
                />
            </div>
        </form>
    </GuestAuthLayout>
</template>
