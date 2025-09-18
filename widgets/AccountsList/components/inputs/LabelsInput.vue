<template>
    <input
        :value="value"
        class="uk-input table-input"
        type="text"
        maxlength="50"
        placeholder="Значение"
        @input="handleInput"
    />
</template>

<script setup lang="ts">
interface Props {
    value: string
}

interface Emits {
    (e: 'input', value: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement
    emit('input', target.value)
}
</script>

<style scoped>
@import '@/shared/styles/css-variables.css';

.table-input {
    width: 100%;
    border: 1px solid var(--border-light);
    border-radius: var(--radius-sm);
    padding: 8px 12px;
    font-size: var(--font-sm);
    background: var(--bg-primary);
    transition: border-color var(--transition-fast);
}

.table-input:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: var(--shadow-focus);
}

.table-input::placeholder {
    color: var(--text-muted);
}
</style>
