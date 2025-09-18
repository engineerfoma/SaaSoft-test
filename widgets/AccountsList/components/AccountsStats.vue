<template>
    <div class="uk-text-muted uk-text-small uk-margin-top">
        Всего учетных записей: {{ accountsCount }}
    </div>
</template>

<script setup lang="ts">
interface Props {
    accountsCount: number
}

defineProps<Props>()
</script>

<style scoped>
@import '@/shared/styles/css-variables.css';

.uk-text-muted {
    font-size: var(--font-sm);
}

.uk-text-small {
    font-size: var(--font-xs);
}
</style>
