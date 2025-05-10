<script setup>
import { ref } from 'vue';
import { useForm, usePage } from '@inertiajs/vue3';
import { useToast } from 'primevue/usetoast';
import AppLayout from '@/layouts/AppLayout.vue';
import SettingsLayout from '@/layouts/UserSettingsLayout.vue';
import DeleteUserModal from '@/components/DeleteUserModal.vue';

defineProps({
    mustVerifyEmail: {
        type: Boolean,
    },
    status: {
        type: String,
    },
});

const deleteUserModalOpen = ref(false);

const user = usePage().props.auth.user;
const toast = useToast();
const updateProfileForm = useForm({
    name: user.name,
    email: user.email,
});

const sendVerificationForm = useForm({});
const sendEmailVerification = () => {
    sendVerificationForm.post(route('verification.send'));
};

const showSuccessToast = () => {
    toast.add({
        severity: 'success',
        summary: 'Saved',
        detail: 'Profile information has been updated',
        life: 3000,
    });
};
const updateProfileInformation = () => {
    updateProfileForm.patch(route('profile.update'), {
        preserveScroll: true,
        onSuccess: () => {
            showSuccessToast();
        },
    });
};
</script>

<template>
    <AppLayout>
        <InertiaHead title="Profile Settings" />

        <SettingsLayout>
            <div class="space-y-4 md:space-y-8">
                <Card
                    pt:body:class="max-w-2xl space-y-3"
                    pt:caption:class="space-y-1"
                >
                    <template #title>
                        Profile Information
                    </template>
                    <template #subtitle>
                        Update your name and email address
                    </template>
                    <template #content>
                        <form
                            class="space-y-6"
                            @submit.prevent="updateProfileInformation"
                        >
                            <div class="flex flex-col gap-2">
                                <label for="name">Name</label>
                                <InputText
                                    id="name"
                                    v-model="updateProfileForm.name"
                                    :invalid="Boolean(updateProfileForm.errors?.name)"
                                    type="text"
                                    autocomplete="name"
                                    required
                                    fluid
                                />
                                <Message
                                    v-if="updateProfileForm.errors?.name"
                                    severity="error"
                                    variant="simple"
                                    size="small"
                                >
                                    {{ updateProfileForm.errors?.name }}
                                </Message>
                            </div>
                            <div class="flex flex-col gap-2">
                                <label for="email">Email</label>
                                <InputText
                                    id="email"
                                    v-model="updateProfileForm.email"
                                    :invalid="Boolean(updateProfileForm.errors?.email)"
                                    type="email"
                                    autocomplete="username"
                                    required
                                    fluid
                                />
                                <Message
                                    v-if="updateProfileForm.errors?.email"
                                    severity="error"
                                    variant="simple"
                                    size="small"
                                >
                                    {{ updateProfileForm.errors?.email }}
                                </Message>
                            </div>
                            <div v-if="mustVerifyEmail && user.email_verified_at === null">
                                <p class="text-sm mt-2">
                                    Your email address is unverified.
                                    <Button
                                        :loading="sendVerificationForm.processing"
                                        class="p-0 text-sm"
                                        variant="link"
                                        label="Click here to re-send the verification email."
                                        @click="sendEmailVerification"
                                    />
                                </p>
                                <Message
                                    v-if="status === 'verification-link-sent'"
                                    severity="success"
                                    :closable="false"
                                    class="shadow-sm mt-4"
                                >
                                    A new verification link has been sent to your email address.
                                </Message>
                            </div>
                            <Button
                                :loading="updateProfileForm.processing"
                                type="submit"
                                label="Save"
                            />
                        </form>
                    </template>
                </Card>
                <Card
                    pt:body:class="max-w-2xl space-y-3"
                    pt:caption:class="space-y-1"
                >
                    <template #title>
                        Delete Account
                    </template>
                    <template #subtitle>
                        Delete your account and all of its resources
                    </template>
                    <template #content>
                        <DeleteUserModal v-model="deleteUserModalOpen" />
                        <Message
                            severity="error"
                            pt:root:class="p-2"
                        >
                            <div class="flex flex-col gap-4">
                                <div>
                                    <div class="text-lg">
                                        Warning
                                    </div>
                                    <div>
                                        Please proceed with caution, this cannot be undone.
                                    </div>
                                </div>
                                <div>
                                    <Button
                                        label="Delete Account"
                                        severity="danger"
                                        @click="deleteUserModalOpen = true"
                                    />
                                </div>
                            </div>
                        </Message>
                    </template>
                </Card>
            </div>
        </SettingsLayout>
    </AppLayout>
</template>
