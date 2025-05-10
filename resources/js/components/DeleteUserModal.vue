<script setup>
import { useTemplateRef } from 'vue';
import { useForm } from '@inertiajs/vue3';

const modalOpen = defineModel(false, {
    type: Boolean,
});

const passwordInput = useTemplateRef('password-input');

const form = useForm({
    password: '',
});

const deleteUser = () => {
    form.delete(route('profile.destroy'), {
        preserveScroll: true,
        onSuccess: () => (modalOpen.value = false),
        onError: () => {
            const passwordInputElement = passwordInput.value.$el.querySelector('input');
            if (passwordInputElement) {
                passwordInputElement.focus();
            }
        },
        onFinish: () => form.reset(),
    });
};
</script>

<template>
    <Dialog
        v-model:visible="modalOpen"
        position="center"
        header="Are you sure you want to delete your account?"
        :style="{ width: '40rem' }"
        :draggable="false"
        dismissableMask
        modal
    >
        <div class="mb-6">
            <p class="m-0 text-muted-color">
                Once your account is deleted, all of its resources and data
                will be permanently deleted. Please enter your password to
                confirm you would like to permanently delete your account.
            </p>
        </div>

        <div class="flex flex-col gap-2">
            <Password
                id="password"
                ref="password-input"
                v-model="form.password"
                :invalid="Boolean(form.errors?.password)"
                :feedback="false"
                autocomplete="current-password"
                toggleMask
                autofocus
                required
                fluid
                @keyup.enter="deleteUser"
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

        <template #footer>
            <Button
                class="mr-2"
                label="Cancel"
                plain
                text
                @click="modalOpen = false"
            />
            <Button
                :loading="form.processing"
                label="Delete Account"
                severity="danger"
                @click="deleteUser"
            />
        </template>
    </Dialog>
</template>
