<template>
    <div class="accounts-list">
        <div class="uk-flex uk-flex-between uk-flex-middle uk-margin-bottom">
            <h2 class="uk-heading-small uk-margin-remove">Учётные записи</h2>
            <button
                class="uk-button uk-button-primary uk-button-small"
                title="Добавить учетную запись"
            >
                <span uk-icon="plus"></span>
            </button>
        </div>

        <div class="uk-alert uk-alert-info uk-margin-bottom">
            <p class="uk-margin-remove">
                <strong>Подсказка:</strong> Для указания нескольких меток для одной пары логин/пароль используйте
                разделитель ;
            </p>
        </div>

   
        <div
            class="accounts-table-container"
        >
            <table class="accounts-table">
                <thead>
                    <tr>
                        <th class="width-30">Метки</th>
                        <th class="width-20">Тип записи</th>
                        <th class="width-20">Логин</th>
                        <th class="width-20">Пароль</th>
                        <th class="actions-column"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        class="account-row"
                    >
                        <td class="tags-cell">
                            <input
                                class="uk-input table-input"
                                type="text"
                                maxlength="50"
                                placeholder="Значение"
                            />
                        </td>
                        <td class="type-cell">
                            <select
                                class="uk-select table-select"
                            >
                            </select>
                        </td>
                        <td
                        >
                            <input
                                class="uk-input table-input"
                                type="text"
                                maxlength="100"
                                placeholder="Значение"
                            />
                        </td>
                        <td
                            class="password-cell"
                        >
                            <div class="password-input-container">
                                <input
                                    class="uk-input table-input password-input"
                                    maxlength="100"
                                    placeholder="Значение"
                                />
                                <button
                                    type="button"
                                    class="password-toggle"
                                >
                                  
                                    <span
                                        uk-icon="eye"
                                    ></span>
                                </button>
                            </div>
                        </td>
                        <td class="actions-cell">
                            <button
                                type="button"
                                class="delete-button"
                                title="Удалить учетную запись"
                            >
                                <span uk-icon="trash"></span>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const passwordVisibility = ref<Record<string, boolean>>({})


</script>

<style scoped>
.accounts-list {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0.75rem;
}

.uk-button-primary {
    background-color: #1e87f0;
    color: white;
    padding: 0.5rem;
}

.uk-button-primary:hover {
    background-color: #0f7ae5;
    color: white;
}

.uk-alert-info {
    background-color: #e8f4fd;
    border-left: 4px solid #1e87f0;
    color: #1e87f0;
    font-size: 0.875rem;
    padding: 0.75rem;
}

.uk-heading-small {
    color: #333;
    font-size: 1.25rem;
    font-weight: 600;
}

.uk-text-muted {
    font-size: 0.875rem;
}

.uk-text-small {
    font-size: 0.8rem;
}

.accounts-table-container {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
}

.accounts-table {
    width: 100%;
    border-collapse: collapse;
    margin: 0;
}

.accounts-table thead {
    background-color: #f8f9fa;
}

.accounts-table th {
    padding: 12px 16px;
    text-align: left;
    font-weight: 600;
    color: #333;
    border-bottom: 2px solid #e9ecef;
    font-size: 0.875rem;
}

.accounts-table td {
    padding: 8px 16px;
    border-bottom: 1px solid #e9ecef;
    vertical-align: middle;
}

.account-row:hover {
    background-color: #f8f9fa;
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
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 8px 12px;
    font-size: 0.875rem;
    background: white;
    transition: border-color 0.2s ease;
}

.table-input:focus,
.table-select:focus {
    outline: none;
    border-color: #1e87f0;
    box-shadow: 0 0 0 2px rgba(30, 135, 240, 0.1);
}

.table-input::placeholder {
    color: #999;
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
    color: #666;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition: color 0.2s ease;
}

.password-toggle:hover {
    color: #1e87f0;
}

.delete-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    color: #dc3545;
    border-radius: 4px;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.delete-button:hover {
    background-color: #f8d7da;
    color: #721c24;
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
        font-size: 0.8rem;
        padding: 6px 10px;
    }
}
</style>
