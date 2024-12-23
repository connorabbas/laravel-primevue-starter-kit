<script setup>
import { ref } from "vue";
import { useForm } from "@inertiajs/vue3";
import { useToast } from "primevue/usetoast";
import InputError from "@/Components/InputError.vue";

const currentPasswordInput = ref(null);
const passwordInput = ref(null);

const toast = useToast();
const form = useForm({
    current_password: "",
    password: "",
    password_confirmation: "",
});

const updatePassword = () => {
    form.put(route("password.update"), {
        preserveScroll: true,
        onSuccess: () => {
            form.reset();
            toast.add({
                severity: "success",
                summary: "Saved",
                detail: "Your password has been updated",
                life: 3000,
            });
        },
        onError: () => {
            if (form.errors?.password) {
                form.reset("password", "password_confirmation");
                passwordInput.value.$el.focus();
            }
            if (form.errors?.current_password) {
                form.reset("current_password");
                currentPasswordInput.value.$el.focus();
            }
        },
    });
};
</script>

<template>
    <section>
        <form @submit.prevent="updatePassword" class="flex flex-column gap-4">
            <div class="w-12 lg:w-10 xl:w-6">
                <div class="flex flex-column gap-2">
                    <label for="current_password">Current Password</label>
                    <InputText
                        required
                        id="current_password"
                        ref="currentPasswordInput"
                        type="password"
                        v-model="form.current_password"
                        class="w-full"
                        :invalid="Boolean(form.errors?.current_password)"
                        autocomplete="current-password"
                    />
                    <InputError :message="form.errors?.current_password" />
                </div>
            </div>

            <div class="w-12 lg:w-10 xl:w-6">
                <div class="flex flex-column gap-2">
                    <label for="password">New Password</label>
                    <InputText
                        required
                        id="password"
                        ref="passwordInput"
                        type="password"
                        v-model="form.password"
                        class="w-full"
                        :invalid="Boolean(form.errors?.password)"
                        autocomplete="new-password"
                    />
                    <InputError :message="form.errors?.password" />
                </div>
            </div>

            <div class="w-12 lg:w-10 xl:w-6">
                <div class="flex flex-column gap-2">
                    <label for="password_confirmation">Confirm Password</label>
                    <InputText
                        required
                        id="password_confirmation"
                        type="password"
                        v-model="form.password_confirmation"
                        class="w-full"
                        :invalid="Boolean(form.errors?.password_confirmation)"
                        autocomplete="new-password"
                    />
                    <InputError :message="form.errors?.password_confirmation" />
                </div>
            </div>

            <div class="flex align-content-center gap-3">
                <Button
                    raised
                    type="submit"
                    :loading="form.processing"
                    label="Save"
                    severity="contrast"
                />

                <Transition
                    enter-active-class="transition ease-in-out"
                    enter-from-class="opacity-0"
                    leave-active-class="transition ease-in-out"
                    leave-to-class="opacity-0"
                >
                    <p
                        v-if="form.recentlySuccessful"
                        class="text-sm text-gray-600 dark:text-gray-400"
                    >
                        Saved.
                    </p>
                </Transition>
            </div>
        </form>
    </section>
</template>
