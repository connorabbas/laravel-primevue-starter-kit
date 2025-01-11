<script setup>
import { useTemplateRef, onMounted } from 'vue';
import { useForm } from '@inertiajs/vue3';
import GuestLayout from '@/Layouts/GuestLayout.vue';

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
    <GuestLayout>
        <Head title="Register" />

        <form class="space-y-6" @submit.prevent="submit">
            <div class="space-y-2">
                <label for="name">Name</label>
                <InputText
                    id="name"
                    ref="name-input"
                    v-model="form.name"
                    type="text"
                    :invalid="Boolean(form.errors.name)"
                    required
                    fluid
                    autocomplete="name"
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

            <div class="space-y-2">
                <label for="email">Email</label>
                <InputText
                    id="email"
                    v-model="form.email"
                    type="email"
                    :invalid="Boolean(form.errors.email)"
                    required
                    fluid
                    autocomplete="username"
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

            <div class="space-y-2">
                <label for="password">Password</label>
                <InputText
                    id="password"
                    v-model="form.password"
                    type="password"
                    :invalid="Boolean(form.errors.password)"
                    required
                    fluid
                    autocomplete="new-password"
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

            <div class="space-y-2">
                <label for="password_confirmation">Confirm Password</label>
                <InputText
                    id="password_confirmation"
                    v-model="form.password_confirmation"
                    type="password"
                    :invalid="Boolean(form.errors.password_confirmation)"
                    required
                    fluid
                    autocomplete="new-password"
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
                <Link
                    :href="route('login')"
                    class="mr-4 underline text-muted-color hover:text-color"
                >
                    Already registered?
                </Link>
                <Button
                    type="submit"
                    :loading="form.processing"
                    label="Register"
                    severity="contrast"
                    raised
                />
            </div>
        </form>
    </GuestLayout>
</template>
