export enum AccountType {
    'LDAP' = 'LDAP',
    'LOCAL' = 'Локальная'
} 

export interface AccountLabel {
  text: string
}

export interface Account {
  id: string
  labels: AccountLabel[]
  type: AccountType
  login: string
  password: string | null
}

export interface AccountFormData {
  labels: string
  type: AccountType
  login: string
  password: string
}

export interface AccountValidation {
  labels: boolean
  login: boolean
  password: boolean
}
