<script setup lang="ts">
import { Link as InertiaLink } from '@inertiajs/vue3'
import { ArrowLeft } from '@lucide/vue'
import AppHead from '@/components/AppHead.vue'
import Container from '@/components/Container.vue'

const props = defineProps<{
    title: string
    detail: string
    status: number
    homepageRoute: string
}>()
</script>

<template>
    <AppHead
        :title="props.title"
        :description="props.detail"
    />

    <Container fluid>
        <main>
            <div class="h-screen flex items-center justify-center">
                <Card class="p-4 py-6 sm:p-12">
                    <template #content>
                        <div class="flex flex-col gap-6 md:gap-8 items-center justify-center text-center">
                            <h1 class="font-extrabold text-2xl md:text-4xl text-primary">
                                {{ props.status }}
                            </h1>
                            <h2 class="font-extrabold text-4xl md:text-6xl">
                                {{ props.title }}
                            </h2>
                            <p class="text-xl font-semibold text-muted-color">
                                {{ props.detail }}
                            </p>
                            <InertiaLink :href="props.homepageRoute">
                                <Button
                                    label="Back to homepage"
                                    raised
                                >
                                    <template #icon>
                                        <ArrowLeft />
                                    </template>
                                </Button>
                            </InertiaLink>
                        </div>
                    </template>
                </Card>
            </div>
        </main>
    </Container>
</template>
