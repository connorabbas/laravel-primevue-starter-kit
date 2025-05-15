<script setup>
import { computed } from 'vue';
import { ArrowLeft } from 'lucide-vue-next';

const props = defineProps({
    homepageRoute: String,
    status: Number
});

const title = computed(() => {
    return {
        503: 'Service Unavailable',
        500: 'Server Error',
        404: 'Page Not Found',
        403: 'Forbidden',
    }[props.status];
});

const description = computed(() => {
    return {
        503: 'Sorry, we are doing some maintenance. Please check back soon.',
        500: 'Whoops, something went wrong on our servers.',
        404: 'Sorry, the page you are looking for could not be found.',
        403: 'Sorry, you are forbidden from accessing this page.',
    }[props.status];
});
</script>

<template>
    <InertiaHead title="Error" />
    <Container fluid>
        <main>
            <div class="h-screen flex items-center justify-center">
                <Card class="p-4 py-6 sm:p-12">
                    <template #content>
                        <div class="flex flex-col gap-8 items-center justify-center text-center">
                            <h1 class="font-extrabold text-5xl md:text-8xl text-primary">
                                {{ props.status }}
                            </h1>
                            <h2 class="font-extrabold text-4xl md:text-6xl">
                                {{ title }}
                            </h2>
                            <p class="text-xl font-semibold md:text-3xl text-muted-color">
                                {{ description }}
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