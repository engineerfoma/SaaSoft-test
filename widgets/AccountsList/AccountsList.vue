<template>
    <div class="accounts-list">
        <AccountsHeader @add-account="handleAddAccount" />

        <AccountsHint />

        <EmptyState v-if="accounts.length === 0" />

        <AccountsTable
            v-else
            :accounts="accounts"
            :password-visibility="passwordVisibility"
            @labels-change="handleLabelsChange"
            @type-change="handleTypeChange"
            @login-change="handleLoginChange"
            @password-change="handlePasswordChange"
            @delete-account="handleDeleteAccount"
            @toggle-password-visibility="handleTogglePasswordVisibility"
        />

        <AccountsStats
            v-if="accounts.length > 0"
            :accounts-count="accountsCount"
        />
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useAccountsStore } from '@/shared/stores/accounts'
import { type Account, AccountType } from '@/entities/account/types'
import { AccountsHeader, AccountsHint, EmptyState, AccountsTable, AccountsStats } from './components'

const accountsStore = useAccountsStore()

const passwordVisibility = ref<Record<string, boolean>>({})

const accounts = computed(() => accountsStore.accounts)
const accountsCount = computed(() => accountsStore.accountsCount)

const updateAccount = (accountId: string, field: keyof Account, value: any) => {
    const account = accounts.value.find((acc: Account) => acc.id === accountId)
    if (!account) return

    const updatedAccount = { ...account, [field]: value }
    accountsStore.updateAccount(accountId, updatedAccount)
}

const handleAddAccount = () => {
    accountsStore.addAccount()
}

const handleDeleteAccount = (accountId: string) => {
    accountsStore.removeAccount(accountId)
    delete passwordVisibility.value[accountId]
}

const handleLabelsChange = (accountId: string, value: string) => {
    const labels = accountsStore.parseLabels(value)
    updateAccount(accountId, 'labels', labels)
}

const handleTypeChange = (accountId: string, value: string) => {
    updateAccount(accountId, 'type', value as AccountType)
    if (value === 'LDAP') {
        updateAccount(accountId, 'password', null)
    }
}

const handleLoginChange = (accountId: string, value: string) => {
    updateAccount(accountId, 'login', value)
}

const handlePasswordChange = (accountId: string, value: string) => {
    updateAccount(accountId, 'password', value)
}

const handleTogglePasswordVisibility = (accountId: string) => {
    passwordVisibility.value[accountId] = !passwordVisibility.value[accountId]
}
</script>

<style scoped>
@import '@/shared/styles/css-variables.css';

.accounts-list {
    max-width: 1200px;
    margin: 0 auto;
    padding: var(--spacing-lg);
}

.uk-button-primary {
    background-color: var(--primary-color);
    color: white;
    padding: var(--spacing-sm);
}

.uk-button-primary:hover {
    background-color: var(--primary-hover);
    color: white;
}

.uk-alert-info {
    background-color: var(--bg-info);
    border-left: 4px solid var(--border-info);
    color: var(--primary-color);
    font-size: var(--font-sm);
    padding: var(--spacing-lg);
}

.uk-heading-small {
    color: var(--text-primary);
    font-size: var(--font-lg);
    font-weight: 600;
}

.uk-text-muted {
    font-size: var(--font-sm);
}

.uk-text-small {
    font-size: var(--font-xs);
}

.accounts-table-container {
    background: var(--bg-primary);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-light);
    overflow: hidden;
}

.accounts-table {
    width: 100%;
    border-collapse: collapse;
    margin: 0;
}

.accounts-table thead {
    background-color: var(--bg-secondary);
}

.accounts-table th {
    padding: 12px 16px;
    text-align: left;
    font-weight: 600;
    color: var(--text-primary);
    border-bottom: 2px solid var(--border-medium);
    font-size: var(--font-sm);
}

.accounts-table td {
    padding: 8px 16px;
    border-bottom: 1px solid var(--border-medium);
    vertical-align: middle;
}

.account-row:hover {
    background-color: var(--bg-secondary);
}

.width-30 {
    width: 30%;
}

.width-20 {
    width: 20%;
}

.actions-column {
    width: 10%;
    text-align: center;
}

.table-input,
.table-select {
    width: 100%;
    border: 1px solid var(--border-light);
    border-radius: var(--radius-sm);
    padding: 8px 12px;
    font-size: var(--font-sm);
    background: var(--bg-primary);
    transition: border-color var(--transition-fast);
}

.table-input:focus,
.table-select:focus {
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

.delete-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    color: var(--danger-color);
    border-radius: var(--radius-sm);
    transition: all var(--transition-fast);
    display: flex;
    align-items: center;
    justify-content: center;
}

.delete-button:hover {
    background-color: var(--danger-bg);
    color: var(--danger-hover);
}

@media (max-width: 768px) {
    .accounts-table-container {
        overflow-x: auto;
    }

    .accounts-table {
        min-width: 600px;
    }

    .table-input,
    .table-select {
        font-size: var(--font-xs);
        padding: 6px 10px;
    }
}
</style>
