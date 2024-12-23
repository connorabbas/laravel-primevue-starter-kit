<script setup>
import { ref, onMounted } from "vue";
import { useForm } from "@inertiajs/vue3";
import GuestLayout from "@/Layouts/GuestLayout.vue";
import InputError from "@/Components/InputError.vue";

defineProps({
    status: {
        type: String,
    },
});

const emailInput = ref(null);

const form = useForm({
    email: "",
});

const submit = () => {
    form.post(route("password.email"));
};

onMounted(() => {
    emailInput.value.$el.focus();
});
</script>

<template>
    <GuestLayout>
        <Head title="Forgot Password" />

        <template #message v-if="status">
            <Message severity="success" :closable="false" class="shadow-1 m-0">
                {{ status }}
            </Message>
        </template>

        <div class="mb-4 text-sm text-color-secondary">
            Forgot your password? No problem. Just let us know your email
            address and we will email you a password reset link that will allow
            you to choose a new one.
        </div>

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

            <div class="flex justify-content-end align-items-center">
                <Button
                    raised
                    type="submit"
                    :loading="form.processing"
                    label="Email Password Reset Link"
                    severity="contrast"
                />
            </div>
        </form>
    </GuestLayout>
</template>
