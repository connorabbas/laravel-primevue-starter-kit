<script setup>
import { ref, useTemplateRef } from 'vue';
import { useForm } from '@inertiajs/vue3';

const passwordInput = useTemplateRef('password-input');
const modalOpen = ref(false);

const form = useForm({
    password: '',
});

const deleteUser = () => {
    form.delete(route('profile.destroy'), {
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
    <section>
        <Dialog
            v-model:visible="modalOpen"
            :draggable="false"
            :dismissableMask="true"
            position="center"
            header="Are you sure you want to delete your account?"
            :style="{ width: '40rem' }"
            modal
            @show="focusPasswordInput"
        >
            <div class="mb-6">
                <p class="m-0 text-muted-color">
                    Once your account is deleted, all of its resources and data
                    will be permanently deleted. Please enter your password to
                    confirm you would like to permanently delete your account.
                </p>
            </div>

            <div class="flex flex-col gap-2">
                <InputText
                    id="password"
                    ref="password-input"
                    v-model="form.password"
                    type="password"
                    placeholder="Password"
                    autofocus
                    required
                    fluid
                    :invalid="Boolean(form.errors.password)"
                    autocomplete="current-password"
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

        <Button
            label="Delete Account"
            severity="danger"
            @click="modalOpen = true"
        />
    </section>
</template>
