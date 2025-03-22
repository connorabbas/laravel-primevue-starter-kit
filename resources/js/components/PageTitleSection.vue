<template>
    <section>
        <div class="flex items-end justify-between flex-wrap gap-2 md:gap-4">
            <div class="flex flex-col gap-2">
                <h1 class="font-bold text-2xl leading-tight">
                    <slot name="title" />
                </h1>
                <div
                    v-if="$slots.subTitle"
                    class="text-muted-color"
                >
                    <slot name="subTitle" />
                </div>
            </div>
            <div>
                <div v-if="$slots.end">
                    <slot name="end" />
                </div>
            </div>
        </div>
    </section>
</template>