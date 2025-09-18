<template>
    <tr class="account-row">
        <td
            colspan="5"
            class="account-row-content"
        >
            <div class="account-fields">
                <div class="field-container tags-field">
                    <LabelsInput
                        :value="getAccountLabels(account)"
                        @input="value => handleLabelsChange(account.id, value)"
                        @blur="() => handleFieldBlur(account.id, 'labels')"
                    />
                </div>
                <div class="field-container type-field">
                    <TypeSelect
                        :value="getAccountType(account)"
                        @change="value => handleTypeChange(account.id, value)"
                    />
                </div>
                <div class="field-container login-password-container">
                    <div
                        class="login-field"
                        :class="{ 'ldap-mode': getAccountType(account) === AccountType.LDAP }"
                    >
                        <LoginInput
                            :value="getAccountLogin(account)"
                            :has-error="hasFieldError(account.id, 'login')"
                            @input="value => handleLoginChange(account.id, value)"
                            @blur="() => handleFieldBlur(account.id, 'login')"
                        />
                    </div>
                    <div
                        v-if="getAccountType(account) === AccountType.LOCAL"
                        class="password-field"
                    >
                        <PasswordInput
                            :value="getAccountPassword(account)"
                            :is-visible="isPasswordVisible"
                            :has-error="hasFieldError(account.id, 'password')"
                            @input="value => handlePasswordChange(account.id, value)"
                            @blur="() => handleFieldBlur(account.id, 'password')"
                            @toggle-visibility="togglePasswordVisibility"
                        />
                    </div>
                </div>
                <div class="field-container actions-field">
                    <button
                        type="button"
                        class="delete-button"
                        @click="handleDeleteAccount(account.id)"
                        title="Удалить учетную запись"
                    >
                        <span uk-icon="trash"></span>
                    </button>
                </div>
            </div>
        </td>
    </tr>
</template>

<script setup lang="ts">
import { type Account, AccountType } from '@/entities/account/types'
import { useAccountsStore } from '@/shared/stores/accounts'
import { LabelsInput, TypeSelect, LoginInput, PasswordInput } from './inputs'

interface Props {
    account: Account
    isPasswordVisible: boolean
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

const accountsStore = useAccountsStore()

const getAccountLabels = (account: Account) => {
    return accountsStore.stringifyLabels(account.labels)
}

const getAccountType = (account: Account) => {
    return account.type
}

const getAccountLogin = (account: Account) => {
    return account.login
}

const getAccountPassword = (account: Account) => {
    return account.password || ''
}

const hasFieldError = (accountId: string, field: string) => {
    return accountsStore.hasFieldError(accountId, field)
}

const handleLabelsChange = (accountId: string, value: string) => {
    emit('labels-change', accountId, value)
}

const handleTypeChange = (accountId: string, value: string) => {
    emit('type-change', accountId, value)
    // Валидация при изменении селекта
    accountsStore.validateAccountField(accountId, 'type')
}

const handleLoginChange = (accountId: string, value: string) => {
    emit('login-change', accountId, value)
}

const handlePasswordChange = (accountId: string, value: string) => {
    emit('password-change', accountId, value)
}

const handleFieldBlur = (accountId: string, field: string) => {
    if (field === 'login' || field === 'password') {
        accountsStore.validateAccountField(accountId, field as keyof Account)
    }
}

const handleDeleteAccount = (accountId: string) => {
    emit('delete-account', accountId)
}

const togglePasswordVisibility = () => {
    emit('toggle-password-visibility', props.account.id)
}
</script>

<style lang="scss" scoped>

.account-row {
    &:hover {
        background-color: var(--bg-secondary);
    }
}

.account-row-content {
    padding: 0 !important;
    border: none !important;
}

.account-fields {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 8px 16px;
    width: 100%;
    box-sizing: border-box;
}

.field-container {
    display: flex;
    align-items: center;
    min-width: 0;

    &.tags-field {
        flex: 0 0 200px;
        max-width: 200px;
    }

    &.type-field {
        flex: 0 0 120px;
        max-width: 120px;
    }

    &.login-password-container {
        flex: 2;
        display: flex;
        gap: 16px;
        min-width: 0;
    }

    &.actions-field {
        flex: 0 0 50px;
        max-width: 50px;
        justify-content: center;
    }
}

.login-field {
    flex: 1;
    min-width: 0;

    &.ldap-mode {
        flex: 1;
    }
}

.password-field {
    flex: 1;
    min-width: 0;
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

    &:hover {
        background-color: var(--danger-bg);
        color: var(--danger-hover);
    }
}

@media (max-width: 768px) {
    .account-fields {
        gap: 8px;
        padding: 6px 12px;
    }
}
</style>
