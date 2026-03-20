<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useForm, Head as InertiaHead } from '@inertiajs/vue3'
import { Check, Copy } from 'lucide-vue-next'
import { useClipboard } from '@vueuse/core'
import { useToast } from 'primevue/usetoast'
import AppLayout from '@/layouts/AppLayout.vue'
import SettingsLayout from '@/layouts/UserSettingsLayout.vue'
import InputErrors from '@/components/InputErrors.vue'

const props = defineProps<{
    status?: string
    twoFactorEnabled: boolean
    requiresConfirmation: boolean
    isConfirming: boolean
    qrCode: string | null
    setupKey: string | null
    recoveryCodes: string[]
}>()

const breadcrumbs = [
    { label: 'Dashboard', route: route('dashboard') },
    { label: 'Two-factor authentication' },
]

const toast = useToast()
const setupModalOpen = ref(false)
const confirmationCode = ref('')
const { copy, copied, isSupported: clipboardSupported } = useClipboard({ legacy: true })

const enableTwoFactorForm = useForm({})
const disableTwoFactorForm = useForm({})
const regenerateRecoveryCodesForm = useForm({})
const confirmTwoFactorForm = useForm({
    code: '',
})

const isSetupCodeComplete = computed(() => confirmationCode.value.length === 6)

const statusMessage = computed(() => {
    if (props.status === 'two-factor-authentication-enabled') {
        return props.twoFactorEnabled
            ? 'Two-factor authentication has been enabled.'
            : 'Please finish configuring two-factor authentication below.'
    }

    if (props.status === 'two-factor-authentication-confirmed' && props.twoFactorEnabled) {
        return 'Two-factor authentication is now confirmed and active.'
    }

    if (props.status === 'two-factor-authentication-disabled' && !props.twoFactorEnabled) {
        return 'Two-factor authentication has been disabled.'
    }

    return null
})

const resetConfirmationState = () => {
    confirmationCode.value = ''
    confirmTwoFactorForm.cancel()
    confirmTwoFactorForm.reset('code')
    confirmTwoFactorForm.clearErrors()
}

watch(setupModalOpen, (open) => {
    if (!open) {
        resetConfirmationState()
    }
})

const enableTwoFactor = () => {
    enableTwoFactorForm.post(route('two-factor.enable'), {
        preserveScroll: true,
        onSuccess: () => {
            setupModalOpen.value = true
        },
    })
}

const disableTwoFactor = () => {
    disableTwoFactorForm.delete(route('two-factor.disable'), {
        preserveScroll: true,
    })
}

const regenerateRecoveryCodes = () => {
    regenerateRecoveryCodesForm.post(route('two-factor.regenerate-recovery-codes'), {
        preserveScroll: true,
    })
}

const submitConfirmationCode = () => {
    confirmTwoFactorForm.code = confirmationCode.value

    confirmTwoFactorForm.post(route('two-factor.confirm'), {
        preserveScroll: true,
        errorBag: 'confirmTwoFactorAuthentication',
        onSuccess: () => {
            toast.add({
                severity: 'success',
                summary: 'Saved',
                detail: 'Two-factor authentication is now active',
                life: 3000,
            })
            setupModalOpen.value = false
        },
    })
}

const copySetupKey = async () => {
    if (!props.setupKey || !clipboardSupported.value) {
        return
    }

    await copy(props.setupKey)

    toast.add({
        severity: 'success',
        summary: 'Copied',
        detail: 'Setup key copied to clipboard',
        life: 3000,
    })
}
</script>

<template>
    <InertiaHead title="Two-factor authentication" />

    <AppLayout :breadcrumbs>
        <SettingsLayout>
            <div class="space-y-4 md:space-y-8">
                <Card
                    pt:body:class="max-w-2xl space-y-4"
                    pt:caption:class="space-y-1"
                >
                    <template #title>
                        Two-factor authentication
                    </template>
                    <template #subtitle>
                        Add an extra layer of account security with one-time verification codes
                    </template>
                    <template #content>
                        <div class="space-y-6">
                            <div class="flex flex-wrap items-center gap-2">
                                <Tag
                                    :severity="twoFactorEnabled ? 'success' : 'warn'"
                                    :value="twoFactorEnabled ? 'Enabled' : isConfirming ? 'Setup in progress' : 'Disabled'"
                                />
                            </div>

                            <Message
                                v-if="statusMessage"
                                severity="success"
                                :closable="false"
                            >
                                {{ statusMessage }}
                            </Message>

                            <p class="text-sm text-muted-color">
                                {{
                                    twoFactorEnabled
                                        ? 'Your account currently requires a one-time code when signing in.'
                                        : isConfirming
                                            ? 'Finish setup in the modal by entering the 6-digit code from your authenticator app.'
                                            : 'Enable two-factor authentication to require a 6-digit code at login.'
                                }}
                            </p>

                            <div class="flex flex-wrap gap-2">
                                <Button
                                    v-if="!twoFactorEnabled && !isConfirming"
                                    :loading="enableTwoFactorForm.processing"
                                    label="Enable 2FA"
                                    @click="enableTwoFactor"
                                />

                                <Button
                                    v-else-if="isConfirming"
                                    label="Continue setup"
                                    severity="secondary"
                                    variant="outlined"
                                    @click="setupModalOpen = true"
                                />

                                <Button
                                    v-if="twoFactorEnabled"
                                    :loading="disableTwoFactorForm.processing"
                                    label="Disable two-factor"
                                    severity="danger"
                                    variant="outlined"
                                    @click="disableTwoFactor"
                                />
                            </div>
                        </div>
                    </template>
                </Card>

                <Card
                    v-if="twoFactorEnabled && recoveryCodes.length > 0"
                    pt:body:class="max-w-2xl space-y-4"
                    pt:caption:class="space-y-1"
                >
                    <template #title>
                        Recovery codes
                    </template>
                    <template #subtitle>
                        Store these backup codes somewhere secure in case you lose access to your authenticator app
                    </template>
                    <template #content>
                        <div class="grid gap-2 rounded-lg border dynamic-border p-4 sm:grid-cols-2">
                            <code
                                v-for="code in recoveryCodes"
                                :key="code"
                                class="text-sm"
                            >{{ code }}</code>
                        </div>

                        <Button
                            :loading="regenerateRecoveryCodesForm.processing"
                            class="mt-4"
                            label="Regenerate recovery codes"
                            severity="secondary"
                            variant="outlined"
                            @click="regenerateRecoveryCodes"
                        />
                    </template>
                </Card>
            </div>

            <Dialog
                v-if="isConfirming"
                v-model:visible="setupModalOpen"
                class="w-full max-w-xl"
                header="Enable Two-Factor Authentication"
                :draggable="false"
                dismissableMask
                modal
            >
                <div class="space-y-6">
                    <p class="text-sm text-muted-color">
                        To finish enabling two-factor authentication, scan the QR code or enter the setup code in your
                        authenticator app.
                    </p>

                    <div
                        v-if="qrCode"
                        class="mx-auto w-fit rounded-lg border dynamic-border p-4"
                        v-html="qrCode"
                    />

                    <form
                        v-if="requiresConfirmation"
                        class="space-y-4"
                        @submit.prevent="submitConfirmationCode"
                    >
                        <div class="flex flex-col items-center gap-2">
                            <InputOtp
                                id="two-factor-code"
                                v-model="confirmationCode"
                                size="large"
                                :invalid="Boolean(confirmTwoFactorForm.errors?.code)"
                                :length="6"
                                integerOnly
                                autofocus
                            />
                            <InputErrors :errors="confirmTwoFactorForm.errors?.code" />
                        </div>

                        <Button
                            :disabled="!isSetupCodeComplete"
                            :loading="confirmTwoFactorForm.processing"
                            class="w-full"
                            label="Confirm two-factor"
                            type="submit"
                        />
                    </form>

                    <Divider
                        align="center"
                        type="solid"
                    >
                        <b>or, enter the code manually</b>
                    </Divider>

                    <div
                        v-if="setupKey"
                        class="space-y-2"
                    >
                        <InputGroup>
                            <InputText
                                :model-value="setupKey"
                                class="w-full font-mono"
                                readonly
                            />
                            <InputGroupAddon>
                                <Button
                                    :aria-label="copied ? 'Setup key copied' : 'Copy setup key'"
                                    :disabled="!clipboardSupported"
                                    severity="secondary"
                                    text
                                    @click="copySetupKey"
                                >
                                    <template #icon>
                                        <Check
                                            v-if="copied"
                                            :size="16"
                                        />
                                        <Copy
                                            v-else
                                            :size="16"
                                        />
                                    </template>
                                </Button>
                            </InputGroupAddon>
                        </InputGroup>
                    </div>
                </div>
            </Dialog>
        </SettingsLayout>
    </AppLayout>
</template>
