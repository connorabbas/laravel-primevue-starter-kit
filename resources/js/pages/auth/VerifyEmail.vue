<script setup>
import { computed } from 'vue';
import { useForm } from '@inertiajs/vue3';
import GuestAuthLayout from '@/layouts/GuestAuthLayout.vue';

const props = defineProps({
    status: {
        type: String,
    },
});

const sendVerificationForm = useForm({});
const submit = () => {
    sendVerificationForm.post(route('verification.send'));
};
const logoutForm = useForm({});
const logout = () => {
    logoutForm.post(route('logout'));
};

const verificationLinkSent = computed(
    () => props.status === 'verification-link-sent'
);
</script>

<template>
    <GuestAuthLayout>
        <InertiaHead title="Email Verification" />

        <template
            v-if="verificationLinkSent"
            #message
        >
            <Message
                severity="success"
                :closable="false"
                class="shadow-sm"
            >
                A new verification link has been sent to the email address you
                provided during registration.
            </Message>
        </template>

        <div class="mb-6 text-sm text-muted-color">
            Thanks for signing up! Before getting started, could you verify your
            email address by clicking on the link we just emailed to you? If you
            didn't receive the email, we will gladly send you another.
        </div>

        <div class="mt-6 flex justify-between items-center">
            <form @submit.prevent="submit">
                <Button
                    :loading="sendVerificationForm.processing"
                    type="submit"
                    label="Resend Verification Email"
                />
            </form>
            <Button
                :loading="logoutForm.processing"
                variant="link"
                label="Log Out"
                @click="logout"
            />
        </div>
    </GuestAuthLayout>
</template>
