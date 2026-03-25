<script setup lang="ts">
import { computed, ref } from 'vue'
import { useForm } from '@inertiajs/vue3'
import GuestAuthLayout from '@/layouts/GuestAuthLayout.vue'
import InputErrors from '@/components/InputErrors.vue'

const usingRecoveryCode = ref(false)
const challengeCode = ref('')

const challengeForm = useForm({
    code: '',
    recovery_code: '',
})

const isCodeComplete = computed(() => challengeCode.value.length === 6)

const submit = () => {
    challengeForm.code = challengeCode.value

    challengeForm.post(route('two-factor.login.store'), {
        onSuccess: () => {
            challengeCode.value = ''
            challengeForm.reset()
        },
    })
}

const toggleMode = () => {
    usingRecoveryCode.value = !usingRecoveryCode.value
    challengeCode.value = ''
    challengeForm.clearErrors()
    challengeForm.reset('code', 'recovery_code')
}
</script>

<template>
    <GuestAuthLayout
        title="Two-factor challenge"
        description="Complete two-factor authentication to finish signing in to your account."
    >
        <template #title>
            <div class="text-center">
                Two-factor challenge
            </div>
        </template>

        <template #subtitle>
            <div class="text-center">
                Enter the code from your authenticator application.
            </div>
        </template>

        <form
            class="space-y-6 sm:space-y-8"
            @submit.prevent="submit"
        >
            <div
                v-if="!usingRecoveryCode"
                class="flex flex-col items-center gap-2"
            >
                <InputOtp
                    id="challenge-code"
                    v-model="challengeCode"
                    size="large"
                    :invalid="Boolean(challengeForm.errors?.code)"
                    :length="6"
                    integerOnly
                    autofocus
                />
                <InputErrors :errors="challengeForm.errors?.code" />
            </div>

            <div
                v-else
                class="flex flex-col gap-2"
            >
                <label for="recovery-code">Recovery code</label>
                <InputText
                    id="recovery-code"
                    v-model="challengeForm.recovery_code"
                    :invalid="Boolean(challengeForm.errors?.recovery_code)"
                    type="text"
                    placeholder="xxxx-xxxx"
                    autocomplete="one-time-code"
                    required
                    autofocus
                    fluid
                />
                <InputErrors :errors="challengeForm.errors?.recovery_code" />
            </div>

            <div>
                <Button
                    :disabled="!usingRecoveryCode && !isCodeComplete"
                    :loading="challengeForm.processing"
                    type="submit"
                    label="Continue"
                    fluid
                />
            </div>

            <div class="text-center">
                <Button
                    class="p-0"
                    :label="usingRecoveryCode ? 'Use authenticator code' : 'Use a recovery code'"
                    type="button"
                    variant="link"
                    @click="toggleMode"
                />
            </div>
        </form>
    </GuestAuthLayout>
</template>
