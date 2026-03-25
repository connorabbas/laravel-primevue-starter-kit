<script setup lang="ts">
import { useForm } from '@inertiajs/vue3'
import GuestAuthLayout from '@/layouts/GuestAuthLayout.vue'
import InputErrors from '@/components/InputErrors.vue'

const form = useForm({
    password: '',
})

const submit = () => {
    form.post(route('password.confirm'), {
        onFinish: () => {
            form.reset()
        },
    })
}
</script>

<template>
    <GuestAuthLayout
        title="Confirm password"
        description="Confirm your password to continue to this protected area of the application."
    >
        <template #title>
            <div class="text-center">
                Confirm your password
            </div>
        </template>

        <template #subtitle>
            <div class="text-center">
                This is a secure area of the application. Please confirm your password before continuing.
            </div>
        </template>

        <form @submit.prevent="submit">
            <div class="space-y-6 sm:space-y-8">
                <div class="flex flex-col gap-2">
                    <label for="password">Password</label>
                    <Password
                        v-model="form.password"
                        :invalid="Boolean(form.errors?.password)"
                        :feedback="false"
                        :inputProps="{ autocomplete: 'current-password', autofocus: true }"
                        inputId="password"
                        toggleMask
                        required
                        fluid
                    />
                    <InputErrors :errors="form.errors?.password" />
                </div>

                <div>
                    <Button
                        :loading="form.processing"
                        type="submit"
                        label="Confirm password"
                        fluid
                    />
                </div>
            </div>
        </form>
    </GuestAuthLayout>
</template>
