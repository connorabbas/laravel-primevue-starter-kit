<script setup>
import { useTemplateRef, onMounted } from 'vue';
import { useForm } from '@inertiajs/vue3';
import GuestAuthLayout from '@/layouts/GuestAuthLayout.vue';

const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
});

const nameInput = useTemplateRef('name-input');

const submit = () => {
    form.post(route('register'), {
        onFinish: () => form.reset('password', 'password_confirmation'),
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
                    v-model="form.name"
                    :invalid="Boolean(form.errors.name)"
                    type="text"
                    autocomplete="name"
                    required
                    fluid
                />
                <Message
                    v-if="form.errors?.name"
                    severity="error"
                    variant="simple"
                    size="small"
                >
                    {{ form.errors?.name }}
                </Message>
            </div>

            <div class="flex flex-col gap-2">
                <label for="email">Email</label>
                <InputText
                    id="email"
                    v-model="form.email"
                    :invalid="Boolean(form.errors.email)"
                    type="email"
                    autocomplete="username"
                    required
                    fluid
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

            <div class="flex flex-col gap-2">
                <label for="password">Password</label>
                <Password
                    id="password"
                    v-model="form.password"
                    :invalid="Boolean(form.errors.password)"
                    autocomplete="new-password"
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

            <div class="flex flex-col gap-2">
                <label for="password_confirmation">Confirm Password</label>
                <InputText
                    id="password_confirmation"
                    v-model="form.password_confirmation"
                    :invalid="Boolean(form.errors.password_confirmation)"
                    type="password"
                    autocomplete="new-password"
                    required
                    fluid
                />
                <Message
                    v-if="form.errors?.password_confirmation"
                    severity="error"
                    variant="simple"
                    size="small"
                >
                    {{ form.errors?.password_confirmation }}
                </Message>
            </div>

            <div class="flex justify-end items-center pt-2">
                <InertiaLink
                    :href="route('login')"
                    class="mr-4 underline text-muted-color hover:text-color"
                >
                    Already registered?
                </InertiaLink>
                <Button
                    type="submit"
                    :loading="form.processing"
                    label="Register"
                />
            </div>
        </form>
    </GuestAuthLayout>
</template>
