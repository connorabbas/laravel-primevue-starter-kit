<script setup>
import { useTemplateRef, onMounted } from 'vue';
import { useForm } from '@inertiajs/vue3';
import GuestLayout from '@/Layouts/GuestLayout.vue';

defineProps({
    status: {
        type: String,
    },
});

const emailInput = useTemplateRef('email-input');

const form = useForm({
    email: '',
});

const submit = () => {
    form.post(route('password.email'));
};

onMounted(() => {
    emailInput.value.$el.focus();
});
</script>

<template>
    <GuestLayout>
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
                    v-model="form.email"
                    type="email"
                    required
                    fluid
                    :invalid="Boolean(form.errors.email)"
                    autocomplete="username"
                />
                <Message
                    v-if="form.errors?.email"
                    severity="error"
                    variant="simple"
                    size="small"
                >
                    {{ form.errors?.email }}
                </Message>
            </div>

            <div class="flex justify-end items-center">
                <Button
                    :loading="form.processing"
                    type="submit"
                    label="Email Password Reset Link"
                    severity="contrast"
                    raised
                />
            </div>
        </form>
    </GuestLayout>
</template>
