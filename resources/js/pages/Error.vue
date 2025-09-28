<script setup lang="ts">
import { computed } from 'vue'
import { Head as InertiaHead, Link as InertiaLink } from '@inertiajs/vue3'
import { ArrowLeft } from 'lucide-vue-next'
import Container from '@/components/Container.vue'

const props = defineProps<{
    errorTitles: Record<number, string>
    errorDetails: Record<number, string>
    status: number
    homepageRoute: string
}>()

const title = computed(() => {
    return props.errorTitles[props.status]
})
const details = computed(() => {
    return props.errorDetails[props.status]
})
</script>

<template>
    <InertiaHead title="Error" />

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
                                {{ title }}
                            </h2>
                            <p class="text-xl font-semibold text-muted-color">
                                {{ details }}
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