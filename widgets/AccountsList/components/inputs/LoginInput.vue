<template>
    <input
        :value="value"
        :class="['uk-input', 'table-input', { 'error': hasError }]"
        type="text"
        maxlength="100"
        placeholder="Значение"
        @input="handleInput"
        @blur="handleBlur"
    />
</template>

<script setup lang="ts">
interface Props {
    value: string
    hasError?: boolean
}

interface Emits {
    (e: 'input', value: string): void
    (e: 'blur'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement
    emit('input', target.value)
}

const handleBlur = () => {
    emit('blur')
}
</script>

<style lang="scss" scoped>

.table-input {
    width: 100%;
    border: 1px solid var(--border-light);
    border-radius: var(--radius-sm);
    padding: 8px 12px;
    font-size: var(--font-sm);
    background: var(--bg-primary);
    transition: border-color var(--transition-fast);

    &:focus {
        outline: none;
        border-color: var(--primary-color);
        box-shadow: var(--shadow-focus);
    }

    &.error {
        border-color: var(--error-border);
        background-color: var(--error-bg);

        &:focus {
            border-color: var(--error-border);
            box-shadow: var(--error-shadow);
        }
    }

    &::placeholder {
        color: var(--text-muted);
    }
}
</style>
