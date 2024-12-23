<script setup>
import { ref, onMounted } from "vue";
import { useForm } from "@inertiajs/vue3";
import GuestLayout from "@/Layouts/GuestLayout.vue";
import InputError from "@/Components/InputError.vue";

const form = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
});

const nameInput = ref(null);

const submit = () => {
    form.post(route("register"), {
        onFinish: () => form.reset("password", "password_confirmation"),
    });
};

onMounted(() => {
    nameInput.value.$el.focus();
});
</script>

<template>
    <GuestLayout>
        <Head title="Register" />

        <form @submit.prevent="submit" class="flex flex-column gap-4">
            <div class="flex flex-column gap-2">
                <label for="name">Name</label>
                <InputText
                    ref="nameInput"
                    id="name"
                    type="text"
                    v-model="form.name"
                    class="w-full"
                    :invalid="Boolean(form.errors?.name)"
                    required
                    autocomplete="name"
                />
                <InputError :message="form.errors?.name" />
            </div>

            <div class="flex flex-column gap-2">
                <label for="email">Email</label>
                <InputText
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
                <label for="password_confirmation">Confirm Password</label>
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
                <Link
                    :href="route('login')"
                    class="mr-3 text-color-secondary hover:text-color"
                >
                    Already registered?
                </Link>
                <Button
                    raised
                    type="submit"
                    :loading="form.processing"
                    label="Register"
                    severity="contrast"
                />
            </div>
        </form>
    </GuestLayout>
</template>
