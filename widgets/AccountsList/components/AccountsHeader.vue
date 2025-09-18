<template>
    <div class="uk-flex uk-flex-between uk-flex-middle uk-margin-bottom">
        <h2 class="uk-heading-small uk-margin-remove">Учётные записи</h2>
        <button
            class="uk-button uk-button-primary uk-button-small"
            @click="handleAddAccount"
            title="Добавить учетную запись"
        >
            <span uk-icon="plus"></span>
        </button>
    </div>
</template>

<script setup lang="ts">
interface Emits {
    (e: 'add-account'): void
}

const emit = defineEmits<Emits>()

const handleAddAccount = () => {
    emit('add-account')
}
</script>

<style scoped>
@import '@/shared/styles/css-variables.css';

.uk-button-primary {
    background-color: var(--primary-color);
    color: white;
    padding: var(--spacing-sm);
}

.uk-button-primary:hover {
    background-color: var(--primary-hover);
    color: white;
}

.uk-heading-small {
    color: var(--text-primary);
    font-size: var(--font-lg);
    font-weight: 600;
}
</style>
