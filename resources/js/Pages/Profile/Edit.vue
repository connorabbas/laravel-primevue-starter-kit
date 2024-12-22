<script setup>
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import DeleteUserForm from "./Partials/DeleteUserForm.vue";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm.vue";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm.vue";
import Container from "@/Components/Container.vue";
import { Head } from "@inertiajs/vue3";

const props = defineProps({
    auth: Object,
    mustVerifyEmail: {
        type: Boolean,
    },
    status: {
        type: String,
    },
});
</script>

<template>
    <Head title="Profile" />

    <AuthenticatedLayout>
        <template #header>
            <h1 class="font-bold text-2xl leading-tight m-0">Profile</h1>
        </template>

        <Container>
            <div class="py-3 md:py-6">
                <div class="flex flex-column gap-3 md:gap-5">
                    <Card>
                        <template #title>Profile Information</template>
                        <template #subtitle>
                            Update your account's profile information and email
                            address.
                        </template>
                        <template #content>
                            <!-- <UpdateProfileInformationForm
                                :must-verify-email="mustVerifyEmail"
                                :status="status"
                            /> -->
                        </template>
                    </Card>

                    <Card>
                        <template #title>Update Password</template>
                        <template #subtitle>
                            Ensure your account is using a long, random password
                            to stay secure.
                        </template>
                        <template #content>
                            <!-- <UpdatePasswordForm /> -->
                        </template>
                    </Card>

                    <Card>
                        <template #title>Delete Account</template>
                        <template #subtitle>
                            Once your account is deleted, all of its resources
                            and data will be permanently deleted. Before
                            deleting your account, please download any data or
                            information that you wish to retain.
                        </template>
                        <template #content>
                            <!--  <DeleteUserForm /> -->
                        </template>
                    </Card>
                </div>
            </div>
        </Container>
    </AuthenticatedLayout>
</template>
