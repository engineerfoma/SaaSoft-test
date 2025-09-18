<template>
    <select
        :value="value"
        class="uk-select table-select"
        @change="handleChange"
    >
        <option :value="AccountType.LOCAL">{{ AccountType.LOCAL }}</option>
        <option :value="AccountType.LDAP">{{ AccountType.LDAP }}</option>
    </select>
</template>

<script setup lang="ts">
import { AccountType } from '@/entities/account/types'

interface Props {
    value: AccountType
}

interface Emits {
    (e: 'change', value: AccountType): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const handleChange = (event: Event) => {
    const target = event.target as HTMLSelectElement
    emit('change', target.value as AccountType)
}
</script>

<style scoped>
@import '@/shared/styles/css-variables.css';

.table-select {
    width: 100%;
    border: 1px solid var(--border-light);
    border-radius: var(--radius-sm);
    padding: 8px 12px;
    font-size: var(--font-sm);
    background: var(--bg-primary);
    transition: border-color var(--transition-fast);
}

.table-select:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: var(--shadow-focus);
}
</style>
