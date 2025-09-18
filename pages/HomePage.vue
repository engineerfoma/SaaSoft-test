<template>
  <div class="uk-container uk-container-large">
    <div class="uk-section uk-section-default">
      <div class="uk-container">
        <h1 class="uk-heading-large uk-text-center uk-margin-bottom">
          SaaSoft Test - Управление учетными записями
        </h1>
        <AccountsList />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AccountsList } from '@/widgets/AccountsList'
</script>
