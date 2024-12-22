<script setup>
import { nextTick, ref } from "vue";
import { useForm } from "@inertiajs/vue3";
import InputError from "@/Components/InputError.vue";

const passwordInput = ref(null);
const modalOpen = ref(false);

const form = useForm({
    password: "",
});

const deleteUser = () => {
    form.delete(route("profile.destroy"), {
        preserveScroll: true,
        onSuccess: () => (modalOpen.value = false),
        onError: () => passwordInput.value.$el.focus(),
        onFinish: () => form.reset(),
    });
};

function focusPasswordInput() {
    passwordInput.value.$el.focus();
}
</script>

<template>
    <section class="space-y-6">
        <Dialog
            :draggable="false"
            position="center"
            v-model:visible="modalOpen"
            modal
            header="Are you sure you want to delete your account?"
            :style="{ width: '40rem' }"
            @show="focusPasswordInput"
        >
            <div class="mb-4">
                <p class="m-0 text-color-secondary">
                    Once your account is deleted, all of its resources and data
                    will be permanently deleted. Please enter your password to
                    confirm you would like to permanently delete your account.
                </p>
            </div>

            <div class="flex flex-column gap-2">
                <InputText
                    autofocus
                    required
                    id="password"
                    ref="passwordInput"
                    type="password"
                    placeholder="Password"
                    v-model="form.password"
                    class="w-full"
                    :invalid="Boolean(form.errors?.password)"
                    autocomplete="current-password"
                    @keyup.enter="deleteUser"
                />
                <InputError :message="form.errors?.password" />
            </div>

            <template #footer>
                <div class="flex gap-2">
                    <Button
                        label="Cancel"
                        plain
                        text
                        @click="modalOpen = false"
                    />
                    <Button
                        raised
                        @click="deleteUser"
                        :loading="form.processing"
                        label="Delete Account"
                        severity="danger"
                    />
                </div>
            </template>
        </Dialog>

        <Button
            raised
            @click="modalOpen = true"
            label="Delete Account"
            severity="danger"
        />
    </section>
</template>
