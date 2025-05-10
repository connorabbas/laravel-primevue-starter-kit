<script setup>
import { useTemplateRef, onMounted } from 'vue';
import { useForm } from '@inertiajs/vue3';
import GuestAuthLayout from '@/layouts/GuestAuthLayout.vue';

defineProps({
    canResetPassword: {
        type: Boolean,
    },
    status: {
        type: String,
    },
});

const emailInput = useTemplateRef('email-input');

const loginForm = useForm({
    email: '',
    password: '',
    remember: false,
});

const submit = () => {
    loginForm.post(route('login'), {
        onFinish: () => loginForm.reset('password'),
    });
};

onMounted(() => {
    emailInput.value.$el.focus();
});
</script>

<template>
    <GuestAuthLayout>
        <InertiaHead title="Log in" />

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

        <form
            class="space-y-6"
            @submit.prevent="submit"
        >
            <div class="flex flex-col gap-2">
                <label for="email">Email</label>
                <InputText
                    id="email"
                    ref="email-input"
                    v-model="loginForm.email"
                    :invalid="Boolean(loginForm.errors?.email)"
                    type="email"
                    autocomplete="username"
                    required
                    fluid
                />
                <Message
                    v-if="loginForm.errors?.email"
                    severity="error"
                    variant="simple"
                    size="small"
                >
                    {{ loginForm.errors?.email }}
                </Message>
            </div>

            <div class="flex flex-col gap-2">
                <label for="password">Password</label>
                <Password
                    id="password"
                    v-model="loginForm.password"
                    :invalid="Boolean(loginForm.errors?.password)"
                    :feedback="false"
                    autocomplete="current-password"
                    toggleMask
                    required
                    fluid
                />
                <Message
                    v-if="loginForm.errors?.password"
                    severity="error"
                    variant="simple"
                    size="small"
                >
                    {{ loginForm.errors?.password }}
                </Message>
            </div>

            <div>
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <Checkbox
                            id="remember"
                            v-model="loginForm.remember"
                            class="mr-2"
                            :binary="true"
                        />
                        <label for="remember">Remember me</label>
                    </div>
                </div>
            </div>

            <div class="flex justify-end items-center gap-4 pt-2">
                <InertiaLink
                    v-if="canResetPassword"
                    :href="route('password.request')"
                >
                    <Button
                        class="p-0"
                        variant="link"
                        label="Forgot your password?"
                    />
                </InertiaLink>
                <Button
                    :loading="loginForm.processing"
                    type="submit"
                    label="Log In"
                />
            </div>
        </form>
    </GuestAuthLayout>
</template>
