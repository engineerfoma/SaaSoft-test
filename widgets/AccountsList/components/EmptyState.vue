<template>
    <div class="uk-text-center uk-padding-large">
        <div class="uk-text-muted">
            <span
                uk-icon="info"
                class="uk-margin-small-right"
            ></span>
            Нет учетных записей. Нажмите "Добавить учетную запись" для создания первой записи.
        </div>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
@import '@/shared/styles/css-variables.css';

.uk-text-muted {
    font-size: var(--font-sm);
}
</style>
