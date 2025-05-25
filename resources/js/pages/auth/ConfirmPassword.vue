<script setup>
import { useForm } from '@inertiajs/vue3';
import GuestAuthLayout from '@/layouts/GuestAuthLayout.vue';

const form = useForm({
    password: '',
});

const submit = () => {
    form.post(route('password.confirm'), {
        onFinish: () => {
            form.reset();
        },
    });
};
</script>

<template>
    <GuestAuthLayout>
        <InertiaHead title="Confirm password" />

        <form @submit.prevent="submit">
            <div class="space-y-6">
                <PageTitleSection class="text-center">
                    <template #title>
                        Confirm your password
                    </template>
                    <template #subTitle>
                        <div class="text-sm">
                            This is a secure area of the application. Please confirm your password before continuing.
                        </div>
                    </template>
                </PageTitleSection>

                <div class="flex flex-col gap-2">
                    <label for="password">Password</label>
                    <Password
                        v-model="form.password"
                        :invalid="Boolean(form.errors?.password)"
                        :feedback="false"
                        autocomplete="current-password"
                        inputId="password"
                        toggleMask
                        required
                        fluid
                    />
                    <Message
                        v-if="form.errors?.password"
                        severity="error"
                        variant="simple"
                        size="small"
                    >
                        {{ form.errors?.password }}
                    </Message>
                </div>

                <div class="flex justify-end items-center">
                    <Button
                        :loading="form.processing"
                        type="submit"
                        label="Confirm Password"
                    />
                </div>
            </div>
        </form>
    </GuestAuthLayout>
</template>
