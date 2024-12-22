<script setup>
import { ref, onMounted } from "vue";
import { useForm } from "@inertiajs/vue3";
import GuestLayout from "@/Layouts/GuestLayout.vue";
import InputError from "@/Components/InputError.vue";

defineProps({
    canResetPassword: {
        type: Boolean,
    },
    status: {
        type: String,
    },
});

const emailInput = ref(null);

const form = useForm({
    email: "",
    password: "",
    remember: false,
});

const submit = () => {
    form.post(route("login"), {
        onFinish: () => form.reset("password"),
    });
};

onMounted(() => {
    emailInput.value.$el.focus();
});
</script>

<template>
    <GuestLayout>
        <Head title="Log in" />

        <template #message v-if="status">
            <Message severity="success" :closable="false" class="shadow-1 m-0">
                {{ status }}
            </Message>
        </template>

        <form @submit.prevent="submit" class="flex flex-column gap-4">
            <div class="flex flex-column gap-2">
                <label for="email">Email</label>
                <InputText
                    required
                    ref="emailInput"
                    id="email"
                    type="email"
                    v-model="form.email"
                    class="w-full"
                    :invalid="Boolean(form.errors?.email)"
                    autocomplete="username"
                />
                <InputError :message="form.errors?.email" />
            </div>

            <div class="flex flex-column gap-2">
                <label for="password">Password</label>
                <InputText
                    required
                    id="password"
                    type="password"
                    v-model="form.password"
                    class="w-full"
                    :invalid="Boolean(form.errors?.password)"
                    autocomplete="current-password"
                />
                <InputError :message="form.errors?.password" />
            </div>

            <div class="flex align-items-center justify-content-between">
                <div class="flex gap-2 align-items-center">
                    <Checkbox
                        id="remember"
                        :binary="true"
                        v-model="form.remember"
                    ></Checkbox>
                    <label for="remember">Remember me</label>
                </div>
            </div>

            <div class="flex justify-content-end align-items-center">
                <Link
                    v-if="canResetPassword"
                    :href="route('password.request')"
                    class="mr-3 text-color-secondary hover:text-color"
                >
                    Forgot your password?
                </Link>
                <Button
                    raised
                    type="submit"
                    :loading="form.processing"
                    label="Log In"
                    severity="contrast"
                />
            </div>
        </form>
    </GuestLayout>
</template>
