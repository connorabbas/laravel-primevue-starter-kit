<script setup>
import { useTemplateRef, onMounted } from 'vue';
import { useForm } from '@inertiajs/vue3';
import GuestAuthLayout from '@/layouts/GuestAuthLayout.vue';

const registerForm = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
});

const nameInput = useTemplateRef('name-input');

const submit = () => {
    registerForm.post(route('register'), {
        onFinish: () => registerForm.reset('password', 'password_confirmation'),
    });
};

onMounted(() => {
    nameInput.value.$el.focus();
});
</script>

<template>
    <GuestAuthLayout>
        <InertiaHead title="Register" />

        <form
            class="space-y-6"
            @submit.prevent="submit"
        >
            <div class="flex flex-col gap-2">
                <label for="name">Name</label>
                <InputText
                    id="name"
                    ref="name-input"
                    v-model="registerForm.name"
                    :invalid="Boolean(registerForm.errors?.name)"
                    type="text"
                    autocomplete="name"
                    required
                    fluid
                />
                <Message
                    v-if="registerForm.errors?.name"
                    severity="error"
                    variant="simple"
                    size="small"
                >
                    {{ registerForm.errors?.name }}
                </Message>
            </div>

            <div class="flex flex-col gap-2">
                <label for="email">Email</label>
                <InputText
                    id="email"
                    v-model="registerForm.email"
                    :invalid="Boolean(registerForm.errors?.email)"
                    type="email"
                    autocomplete="username"
                    required
                    fluid
                />
                <Message
                    v-if="registerForm.errors?.email"
                    severity="error"
                    variant="simple"
                    size="small"
                >
                    {{ registerForm.errors?.email }}
                </Message>
            </div>

            <div class="flex flex-col gap-2">
                <label for="password">Password</label>
                <Password
                    id="password"
                    v-model="registerForm.password"
                    :invalid="Boolean(registerForm.errors?.password)"
                    autocomplete="new-password"
                    toggleMask
                    required
                    fluid
                />
                <Message
                    v-if="registerForm.errors?.password"
                    severity="error"
                    variant="simple"
                    size="small"
                >
                    {{ registerForm.errors?.password }}
                </Message>
            </div>

            <div class="flex flex-col gap-2">
                <label for="password_confirmation">Confirm Password</label>
                <Password
                    id="password_confirmation"
                    v-model="registerForm.password_confirmation"
                    :invalid="Boolean(registerForm.errors?.password_confirmation)"
                    :feedback="false"
                    autocomplete="new-password"
                    toggleMask
                    required
                    fluid
                />
                <Message
                    v-if="registerForm.errors?.password_confirmation"
                    severity="error"
                    variant="simple"
                    size="small"
                >
                    {{ registerForm.errors?.password_confirmation }}
                </Message>
            </div>

            <div class="flex justify-end items-center gap-4 pt-2">
                <InertiaLink :href="route('login')">
                    <Button
                        class="p-0"
                        variant="link"
                        label="Already registered?"
                    />
                </InertiaLink>
                <Button
                    type="submit"
                    :loading="registerForm.processing"
                    label="Register"
                />
            </div>
        </form>
    </GuestAuthLayout>
</template>
