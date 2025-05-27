<script setup>
import { Check, Info, TriangleAlert, CircleAlert, Megaphone } from 'lucide-vue-next';
</script>

<template>
    <div class="m-0">
        <Message
            v-if="$page.props.flash.success"
            class="mb-6"
            severity="success"
            closable
        >
            <template #icon>
                <Check />
            </template>
            {{ $page.props.flash.success }}
        </Message>
        <Message
            v-if="$page.props.flash.info"
            class="mb-6"
            severity="info"
            closable
        >
            <template #icon>
                <Info />
            </template>
            {{ $page.props.flash.info }}
        </Message>
        <Message
            v-if="$page.props.flash.warn"
            class="mb-6"
            severity="warn"
            closable
        >
            <template #icon>
                <TriangleAlert />
            </template>
            {{ $page.props.flash.warn }}
        </Message>
        <Message
            v-if="$page.props.flash.error"
            class="mb-6"
            severity="error"
            closable
        >
            <template #icon>
                <CircleAlert />
            </template>
            {{ $page.props.flash.error }}
        </Message>
        <Message
            v-if="$page.props.flash.message"
            class="mb-6"
            severity="secondary"
            closable
        >
            <template #icon>
                <Megaphone />
            </template>
            {{ $page.props.flash.message }}
        </Message>
    </div>
</template>
