<template>
  <div class="user">
     <page-search :searchFormConfig="searchFormConfig"/>
    <page-content :contentTableConfig="contentTableConfig" pageName="users" />

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'

export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    PageContent,
  },
  setup() {

    const selectionChange = (value: any) => {
      console.log(value)
    }
    return {
      searchFormConfig,
      contentTableConfig,
      selectionChange,

    }
  }
})
</script>

<style scoped lang="less">

</style>
