<script setup lang="ts">
import { computed } from 'vue'
import { useForm, Head as InertiaHead } from '@inertiajs/vue3'
import GuestAuthLayout from '@/layouts/GuestAuthLayout.vue'

const props = defineProps<{
    status?: string
}>()

const sendVerificationForm = useForm({})
const submit = () => {
    sendVerificationForm.post(route('verification.send'))
}
const logoutForm = useForm({})
const logout = () => {
    logoutForm.post(route('logout'))
}

const verificationLinkSent = computed(() => props.status === 'verification-link-sent')
</script>

<template>
    <InertiaHead title="Email verification" />

    <GuestAuthLayout>
        <template #title>
            <div class="text-center">
                Verify email
            </div>
        </template>

        <template #subtitle>
            <div class="text-center">
                Please verify your email address by clicking on the link we just emailed to you.
            </div>
        </template>

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

        <div class="space-y-6 sm:space-y-8">
            <form @submit.prevent="submit">
                <Button
                    :loading="sendVerificationForm.processing"
                    type="submit"
                    label="Resend verification email"
                    fluid
                />
            </form>
            <div class="text-center">
                <Button
                    :loading="logoutForm.processing"
                    class="p-0"
                    variant="link"
                    label="Log out"
                    @click="logout"
                />
            </div>
        </div>
    </GuestAuthLayout>
</template>
