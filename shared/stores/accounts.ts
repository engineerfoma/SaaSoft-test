import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { type Account, type AccountLabel, AccountType } from '@/entities/account/types'

export const useAccountsStore = defineStore('accounts', () => {
  const accounts = ref<Account[]>([])

  const loadAccounts = () => {
    const saved = localStorage.getItem('accounts')
    if (saved) {
      try {
        accounts.value = JSON.parse(saved)
      } catch (error) {
        console.error('Error loading accounts from localStorage:', error)
        accounts.value = []
      }
    }
  }

  const saveAccounts = () => {
    localStorage.setItem('accounts', JSON.stringify(accounts.value))
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
    const validation = {
      labels: true,
      login: account.login.trim().length > 0 && account.login.length <= 100,
      password: account.type === 'Локальная' 
        ? account.password !== null && account.password.length > 0 && account.password.length <= 100
        : true
    }
    
    return validation
  }

  const isAccountValid = (account: Account): boolean => {
    const validation = validateAccount(account)
    return validation.labels && validation.login && validation.password
  }

  const accountsCount = computed(() => accounts.value.length)

  loadAccounts()

  return {
    accounts,
    accountsCount,
    addAccount,
    updateAccount,
    removeAccount,
    parseLabels,
    stringifyLabels,
    validateAccount,
    isAccountValid,
    loadAccounts,
    saveAccounts
  }
})
