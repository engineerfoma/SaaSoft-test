import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { type Account, type AccountLabel, AccountType } from '@/entities/account/types'

export const useAccountsStore = defineStore('accounts', () => {
    const accounts = ref<Account[]>([])
    const validationErrors = ref<Record<string, Record<string, string>>>({})

    const loadAccounts = () => {
        const saved = sessionStorage.getItem('accounts')
        if (saved) {
            accounts.value = JSON.parse(saved)
        } else {
            accounts.value = []
        }
    }

    const saveAccounts = () => {
        sessionStorage.setItem('accounts', JSON.stringify(accounts.value))
    }

    const createAccount = (): Account => {
        return {
            id: Date.now().toString(),
            labels: [],
            type: AccountType.LOCAL,
            login: '',
            password: ''
        }
    }

    const addAccount = () => {
        const newAccount = createAccount()
        accounts.value.push(newAccount)
        saveAccounts()
        return newAccount
    }

    const updateAccount = (id: string, updates: Partial<Account>) => {
        const index = accounts.value.findIndex(account => account.id === id)
        if (index !== -1) {
            accounts.value[index] = { ...accounts.value[index], ...updates }
            saveAccounts()
        }
    }

    const removeAccount = (id: string) => {
        const index = accounts.value.findIndex(account => account.id === id)
        if (index !== -1) {
            accounts.value.splice(index, 1)
            saveAccounts()
        }
    }

    const parseLabels = (labelsString: string): AccountLabel[] => {
        if (!labelsString.trim()) return []

        return labelsString
            .split(';')
            .map(label => label.trim())
            .filter(label => label.length > 0)
            .map(label => ({ text: label }))
    }

    const stringifyLabels = (labels: AccountLabel[]): string => {
        return labels.map(label => label.text).join('; ')
    }

    const validateAccount = (account: Account) => {
        const errors: Record<string, string> = {}

        if (!account.login.trim()) {
            errors.login = 'Логин обязателен'
        } else if (account.login.length > 100) {
            errors.login = 'Логин не должен превышать 100 символов'
        }

        if (account.type === AccountType.LOCAL) {
            if (!account.password || !account.password.trim()) {
                errors.password = 'Пароль обязателен для локальных аккаунтов'
            } else if (account.password.length > 100) {
                errors.password = 'Пароль не должен превышать 100 символов'
            }
        }

        return errors
    }

    const validateAccountField = (accountId: string, field: keyof Account) => {
        const account = accounts.value.find(acc => acc.id === accountId)
        if (!account) return

        const errors = validateAccount(account)
        const fieldError = errors[field] || ''

        if (fieldError) {
            validationErrors.value[accountId] = {
                ...validationErrors.value[accountId],
                [field]: fieldError
            }
        } else {
            if (validationErrors.value[accountId]) {
                delete validationErrors.value[accountId][field]
                if (Object.keys(validationErrors.value[accountId]).length === 0) {
                    delete validationErrors.value[accountId]
                }
            }
        }
    }

    const getFieldError = (accountId: string, field: string): string => {
        return validationErrors.value[accountId]?.[field] || ''
    }

    const hasFieldError = (accountId: string, field: string): boolean => {
        return !!validationErrors.value[accountId]?.[field]
    }

    const isAccountValid = (account: Account): boolean => {
        const errors = validateAccount(account)
        return Object.keys(errors).length === 0
    }

    const clearValidationErrors = (accountId: string) => {
        delete validationErrors.value[accountId]
    }

    const accountsCount = computed(() => accounts.value.length)

    loadAccounts()

    return {
        accounts,
        accountsCount,
        validationErrors,
        addAccount,
        updateAccount,
        removeAccount,
        parseLabels,
        stringifyLabels,
        validateAccount,
        validateAccountField,
        getFieldError,
        hasFieldError,
        isAccountValid,
        clearValidationErrors,
        loadAccounts,
        saveAccounts
    }
})
