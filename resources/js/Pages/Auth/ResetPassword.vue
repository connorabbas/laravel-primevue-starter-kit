<script setup>
import { ref, onMounted } from "vue";
import { useForm } from "@inertiajs/vue3";
import GuestLayout from "@/Layouts/GuestLayout.vue";
import InputError from "@/Components/InputError.vue";

const props = defineProps({
    email: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
});

const emailInput = ref(null);

const form = useForm({
    token: props.token,
    email: props.email,
    password: "",
    password_confirmation: "",
});

const submit = () => {
    form.post(route("password.store"), {
        onFinish: () => form.reset("password", "password_confirmation"),
    });
};

onMounted(() => {
    emailInput.value.$el.focus();
});
</script>

<template>
    <GuestLayout>
        <Head title="Reset Password" />

        <form @submit.prevent="submit" class="flex flex-column gap-4">
            <div class="flex flex-column gap-2">
                <label for="email">Email</label>
                <InputText
                    ref="emailInput"
                    id="email"
                    type="email"
                    v-model="form.email"
                    class="w-full"
                    :invalid="Boolean(form.errors?.email)"
                    required
                    autocomplete="username"
                />
                <InputError :message="form.errors?.email" />
            </div>

            <div class="flex flex-column gap-2">
                <label for="password">Password</label>
                <InputText
                    id="password"
                    type="password"
                    v-model="form.password"
                    class="w-full"
                    :invalid="Boolean(form.errors?.password)"
                    required
                    autocomplete="new-password"
                />
                <InputError :message="form.errors?.password" />
            </div>

            <div class="flex flex-column gap-2">
                <label for="password_confirmation">Password</label>
                <InputText
                    id="password_confirmation"
                    type="password"
                    v-model="form.password_confirmation"
                    class="w-full"
                    :invalid="Boolean(form.errors?.password_confirmation)"
                    required
                    autocomplete="new-password"
                />
                <InputError :message="form.errors?.password_confirmation" />
            </div>

            <div class="flex justify-content-end align-items-center">
                <Button
                    raised
                    type="submit"
                    :loading="form.processing"
                    label="Reset Password"
                    severity="contrast"
                />
            </div>
        </form>
    </GuestLayout>
</template>
