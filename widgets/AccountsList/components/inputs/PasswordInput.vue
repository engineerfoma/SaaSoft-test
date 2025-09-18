<template>
    <div class="password-input-container">
        <input
            :value="value"
            :type="isVisible ? 'text' : 'password'"
            class="uk-input table-input password-input"
            maxlength="100"
            placeholder="Значение"
            @input="handleInput"
        />
        <button
            type="button"
            class="password-toggle"
            @click="handleToggleVisibility"
        >
            <span
                v-if="isVisible"
                uk-icon="close"
            ></span>
            <span
                v-else
                uk-icon="eye"
            ></span>
        </button>
    </div>
</template>

<script setup lang="ts">
interface Props {
    value: string
    isVisible: boolean
}

interface Emits {
    (e: 'input', value: string): void
    (e: 'toggle-visibility'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement
    emit('input', target.value)
}

const handleToggleVisibility = () => {
    emit('toggle-visibility')
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

.password-input-container {
    position: relative;
    display: flex;
    align-items: center;
}

.password-input {
    padding-right: 40px;
}

.password-toggle {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    color: var(--text-secondary);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-sm);
    transition: color var(--transition-fast);
}

.password-toggle:hover {
    color: var(--primary-color);
}
</style>
