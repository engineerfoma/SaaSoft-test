<template>
    <tr class="account-row">
        <td
            colspan="5"
            class="account-row-content"
        >
            <div class="account-fields">
                <div class="field-container tags-field">
                    <LabelsInput
                        :value="localValues.labels"
                        @input="value => localValues.labels = value"
                        @blur="() => handleLabelsBlur(account.id)"
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
                            :value="localValues.login"
                            :has-error="hasFieldError(account.id, 'login')"
                            @input="value => localValues.login = value"
                            @blur="() => handleLoginBlur(account.id)"
                        />
                    </div>
                    <div
                        v-if="getAccountType(account) === AccountType.LOCAL"
                        class="password-field"
                    >
                        <PasswordInput
                            :value="localValues.password"
                            :is-visible="isPasswordVisible"
                            :has-error="hasFieldError(account.id, 'password')"
                            @input="value => localValues.password = value"
                            @blur="() => handlePasswordBlur(account.id)"
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
import { reactive, computed } from 'vue'
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

const localValues = reactive({
    labels: accountsStore.stringifyLabels(props.account.labels),
    login: props.account.login,
    password: props.account.password || ''
})

const getAccountType = (account: Account) => {
    return account.type
}

const hasFieldError = (accountId: string, field: string) => {
    return accountsStore.hasFieldError(accountId, field)
}

const handleLabelsBlur = (accountId: string) => {
    accountsStore.parseLabels(localValues.labels)
    emit('labels-change', accountId, localValues.labels)
}

const handleTypeChange = (accountId: string, value: string) => {
    emit('type-change', accountId, value)
    
    if (value === 'LDAP') {
        localValues.password = ''
        emit('password-change', accountId, '')
    }
    
    accountsStore.validateAccountField(accountId, 'type')
}

const handleLoginBlur = (accountId: string) => {
    const tempAccount = { ...props.account, login: localValues.login }
    const errors = accountsStore.validateAccount(tempAccount)

    if (errors.login) {
        localValues.login = ''
        emit('login-change', accountId, '')
        accountsStore.validateAccountField(accountId, 'login')
    } else {
        emit('login-change', accountId, localValues.login)
        if (accountsStore.hasFieldError(accountId, 'login')) {
            accountsStore.clearValidationErrors(accountId)
        }
    }
}

const handlePasswordBlur = (accountId: string) => {
    const tempAccount = { ...props.account, password: localValues.password }
    const errors = accountsStore.validateAccount(tempAccount)

    if (errors.password) {
        localValues.password = ''
        emit('password-change', accountId, '')
        accountsStore.validateAccountField(accountId, 'password')
    } else {
        emit('password-change', accountId, localValues.password)
        if (accountsStore.hasFieldError(accountId, 'password')) {
            accountsStore.clearValidationErrors(accountId)
        }
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
