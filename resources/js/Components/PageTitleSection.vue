<template>
    <section>
        <div class="flex items-end justify-between flex-wrap gap-2 md:gap-4">
            <div>
                <h1 class="font-bold text-2xl md:text-3xl leading-tight">
                    <slot name="title" />
                </h1>
            </div>
            <div>
                <div v-if="$slots.end">
                    <slot name="end" />
                </div>
            </div>
        </div>
    </section>
</template>