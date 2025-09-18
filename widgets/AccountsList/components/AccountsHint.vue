<template>
    <div class="uk-alert uk-alert-info uk-margin-bottom">
        <p class="uk-margin-remove">
            <strong>Подсказка:</strong> Для указания нескольких меток для одной пары логин/пароль используйте
            разделитель ;
        </p>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
@import '@/shared/styles/css-variables.css';

.uk-alert-info {
    background-color: var(--bg-info);
    border-left: 4px solid var(--border-info);
    color: var(--primary-color);
    font-size: var(--font-sm);
    padding: var(--spacing-lg);
}
</style>
