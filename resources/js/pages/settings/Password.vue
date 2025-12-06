<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useForm, Head as InertiaHead } from '@inertiajs/vue3'
import { useToast } from 'primevue/usetoast'
import Password from 'primevue/password'
import AppLayout from '@/layouts/AppLayout.vue'
import SettingsLayout from '@/layouts/UserSettingsLayout.vue'
import InputErrors from '@/components/InputErrors.vue'

const breadcrumbs = [
    { label: 'Dashboard', route: route('dashboard') },
    { label: 'Password settings' },
]

type PasswordInputType = InstanceType<typeof Password> & { $el: HTMLElement };
const currentPasswordInput = useTemplateRef<PasswordInputType>('current-password-input')
const newPasswordInput = useTemplateRef<PasswordInputType>('new-password-input')

const toast = useToast()
const updatePasswordForm = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
})

const showSuccessToast = () => {
    toast.add({
        severity: 'success',
        summary: 'Saved',
        detail: 'Your password has been updated',
        life: 3000,
    })
}
const updatePassword = () => {
    updatePasswordForm.put(route('password.update'), {
        preserveScroll: true,
        onSuccess: () => {
            updatePasswordForm.reset()
            showSuccessToast()
        },
        onError: () => {
            if (updatePasswordForm.errors?.password) {
                updatePasswordForm.reset('password', 'password_confirmation')
                if (newPasswordInput.value && newPasswordInput.value?.$el) {
                    const newPasswordInputElement = newPasswordInput.value.$el.querySelector('input')
                    newPasswordInputElement?.focus()
                }
            }
            if (updatePasswordForm.errors?.current_password) {
                updatePasswordForm.reset('current_password')
                if (currentPasswordInput.value && currentPasswordInput.value?.$el) {
                    const currentPasswordInputElement = currentPasswordInput.value.$el.querySelector('input')
                    currentPasswordInputElement?.focus()
                }
            }
        },
    })
}
</script>

<template>
    <InertiaHead title="Password settings" />

    <AppLayout :breadcrumbs>
        <SettingsLayout>
            <Card
                pt:body:class="max-w-2xl space-y-3"
                pt:caption:class="space-y-1"
            >
                <template #title>
                    Update password
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
                            <label for="current-password">Current password</label>
                            <Password
                                ref="current-password-input"
                                v-model="updatePasswordForm.current_password"
                                :invalid="Boolean(updatePasswordForm.errors?.current_password)"
                                :feedback="false"
                                autocomplete="current-password"
                                inputId="current-password"
                                toggleMask
                                required
                                fluid
                            />
                            <InputErrors :errors="updatePasswordForm.errors?.current_password" />
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="password">New password</label>
                            <Password
                                ref="new-password-input"
                                v-model="updatePasswordForm.password"
                                :invalid="Boolean(updatePasswordForm.errors?.password)"
                                autocomplete="new-password"
                                inputId="password"
                                toggleMask
                                required
                                fluid
                            />
                            <InputErrors :errors="updatePasswordForm.errors?.password" />
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="password-confirmation">Confirm new password</label>
                            <Password
                                v-model="updatePasswordForm.password_confirmation"
                                :invalid="Boolean(updatePasswordForm.errors?.password_confirmation)"
                                :feedback="false"
                                autocomplete="confirm-password"
                                inputId="password-confirmation"
                                toggleMask
                                required
                                fluid
                            />
                            <InputErrors :errors="updatePasswordForm.errors?.password_confirmation" />
                        </div>
                        <Button
                            :loading="updatePasswordForm.processing"
                            type="submit"
                            label="Save password"
                        />
                    </form>
                </template>
            </Card>
        </SettingsLayout>
    </AppLayout>
</template>
