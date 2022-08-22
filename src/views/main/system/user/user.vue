<template>
  <div class="user">
    <div class="search">
      <wp-form v-bind="searchFormConfig"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { searchFormConfig } from './config/search.config'
import WpForm from '@/base-ui/form'
export default defineComponent({
  name: 'user',
  components: {
    WpForm
  },
  setup() {
    return {
      searchFormConfig
    }
  }
})
</script>

<style scoped>
</style>
