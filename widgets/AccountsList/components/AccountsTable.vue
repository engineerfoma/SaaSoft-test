<template>
    <div class="accounts-table-container">
        <table class="accounts-table">
            <thead>
                <tr>
                    <th colspan="5" class="table-header-content">
                        <div class="header-fields">
                            <div class="header-field tags-header">Метки</div>
                            <div class="header-field type-header">Тип записи</div>
                            <div class="header-field login-password-header">
                                <div class="login-header">Логин</div>
                                <div class="password-header">Пароль</div>
                            </div>
                            <div class="header-field actions-header"></div>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                <AccountRow
                    v-for="account in accounts"
                    :key="account.id"
                    :account="account"
                    :is-password-visible="isPasswordVisible(account.id)"
                    @labels-change="handleLabelsChange"
                    @type-change="handleTypeChange"
                    @login-change="handleLoginChange"
                    @password-change="handlePasswordChange"
                    @delete-account="handleDeleteAccount"
                    @toggle-password-visibility="handleTogglePasswordVisibility"
                />
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { type Account } from '@/entities/account/types'
import { AccountRow } from './'

interface Props {
    accounts: Account[]
    passwordVisibility: Record<string, boolean>
}

interface Emits {
    (e: 'labels-change', accountId: string, value: string): void
    (e: 'type-change', accountId: string, value: string): void
    (e: 'login-change', accountId: string, value: string): void
    (e: 'password-change', accountId: string, value: string): void
    (e: 'delete-account', accountId: string): void
    (e: 'toggle-password-visibility', accountId: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const isPasswordVisible = (accountId: string) => {
    return props.passwordVisibility[accountId] || false
}

const handleLabelsChange = (accountId: string, value: string) => {
    emit('labels-change', accountId, value)
}

const handleTypeChange = (accountId: string, value: string) => {
    emit('type-change', accountId, value)
}

const handleLoginChange = (accountId: string, value: string) => {
    emit('login-change', accountId, value)
}

const handlePasswordChange = (accountId: string, value: string) => {
    emit('password-change', accountId, value)
}

const handleDeleteAccount = (accountId: string) => {
    emit('delete-account', accountId)
}

const handleTogglePasswordVisibility = (accountId: string) => {
    emit('toggle-password-visibility', accountId)
}
</script>

<style scoped>
@import '@/shared/styles/css-variables.css';

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
    padding: 0;
    text-align: left;
    font-weight: 600;
    color: var(--text-primary);
    border-bottom: 2px solid var(--border-medium);
    font-size: var(--font-sm);
}

.accounts-table td {
    padding: 0;
    border-bottom: 1px solid var(--border-medium);
    vertical-align: middle;
}

.table-header-content {
    padding: 0 !important;
    border: none !important;
}

.header-fields {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 12px 16px;
    width: 100%;
    box-sizing: border-box;
}

.header-field {
    display: flex;
    align-items: center;
    min-width: 0;
    font-weight: 600;
    color: var(--text-primary);
    font-size: var(--font-sm);
}

.tags-header {
    flex: 0 0 200px;
    max-width: 200px;
}

.type-header {
    flex: 0 0 120px;
    max-width: 120px;
}

.login-password-header {
    flex: 2;
    display: flex;
    gap: 16px;
    min-width: 0;
}

.login-header {
    flex: 1;
    min-width: 0;
}

.password-header {
    flex: 1;
    min-width: 0;
}

.actions-header {
    flex: 0 0 50px;
    max-width: 50px;
    justify-content: center;
}

@media (max-width: 768px) {
    .accounts-table-container {
        overflow-x: auto;
    }

    .accounts-table {
        min-width: 600px;
    }
    
    .header-fields {
        gap: 8px;
        padding: 10px 12px;
    }
    
    .tags-header {
        flex: 0 0 150px;
        max-width: 150px;
    }
    
    .type-header {
        flex: 0 0 100px;
        max-width: 100px;
    }
    
    .login-password-header {
        gap: 8px;
    }
    
    .login-header,
    .password-header {
        min-width: 0;
    }
    
    .actions-header {
        flex: 0 0 40px;
        max-width: 40px;
    }
}
</style>
