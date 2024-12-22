<script setup>
import { ref, onMounted } from "vue";
import { useForm, usePage } from "@inertiajs/vue3";
import { useToast } from "primevue/usetoast";
import InputError from "@/Components/InputError.vue";

defineProps({
    mustVerifyEmail: {
        type: Boolean,
    },
    status: {
        type: String,
    },
});

const nameInput = ref(null);

const user = usePage().props.auth.user;
const toast = useToast();
const form = useForm({
    name: user.name,
    email: user.email,
});

const updateProfileInformation = () => {
    form.patch(route("profile.update"), {
        preserveScroll: true,
        onSuccess: () => {
            toast.add({
                severity: "success",
                summary: "Saved",
                detail: "Profile information has been updated",
                life: 3000,
            });
        },
    });
};

onMounted(() => {
    nameInput.value.$el.focus();
});
</script>

<template>
    <section>
        <form
            @submit.prevent="updateProfileInformation"
            class="flex flex-column gap-4"
        >
            <div class="w-12 lg:w-10 xl:w-6">
                <div class="flex flex-column gap-2">
                    <label for="name">Name</label>
                    <InputText
                        required
                        ref="nameInput"
                        id="name"
                        type="text"
                        v-model="form.name"
                        class="w-full"
                        :invalid="Boolean(form.errors?.name)"
                        autocomplete="name"
                    />
                    <InputError :message="form.errors?.name" />
                </div>
            </div>
            <div class="w-12 lg:w-10 xl:w-6">
                <div class="flex flex-column gap-2">
                    <label for="email">Email</label>
                    <InputText
                        required
                        id="email"
                        type="email"
                        v-model="form.email"
                        class="w-full"
                        :invalid="Boolean(form.errors?.email)"
                        autocomplete="username"
                    />
                    <InputError :message="form.errors?.email" />
                </div>
            </div>
            <div
                v-if="mustVerifyEmail && user.email_verified_at === null"
                class="w-12 lg:w-10 xl:w-6"
            >
                <div class="flex flex-column gap-3">
                    <p class="text-sm m-0">
                        Your email address is unverified.
                        <Link
                            :href="route('verification.send')"
                            method="post"
                            class="underline text-sm text-color-secondary hover:text-color"
                        >
                            Click here to re-send the verification email.
                        </Link>
                    </p>
                    <Message
                        v-if="status === 'verification-link-sent'"
                        severity="success"
                        :closable="false"
                        class="shadow-1 m-0"
                    >
                        A new verification link has been sent to your email
                        address.
                    </Message>
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
                        class="text-sm text-color-secondary"
                    >
                        Saved.
                    </p>
                </Transition>
            </div>
        </form>
    </section>
</template>
