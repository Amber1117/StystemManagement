<template>
  <div class="nav-header">
    <el-icon @click="handleFoldClick" class="fold-menu">
      <component :is="isFold ? 'fold' : 'expand'"></component>
    </el-icon>

    <div class="content">
       <breadcrumb :breadcrumbs="breadcrumbs"/>
       <user-info></user-info>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import UserInfo from './user-info.vue'
import breadcrumb from '@/base-ui/breadcrumb/src/breadcrumb.vue'
import { pathMapBreadcrumbs } from '@/utils/map-menus'
export default defineComponent({
  emits: ['foldChange'],
  components: {
    UserInfo,
    breadcrumb
  },
  setup (props, { emit }) {
    const isFold = ref(false)  //是否折叠
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit("foldChange", isFold.value)
    }

    //面包屑相关逻辑
    const store = useStore()

    const breadcrumbs = computed(() => {
      const userMenus = store.state.login.userMenus
      const route = useRoute()
      return pathMapBreadcrumbs(userMenus, route.path)
    })
    return {
      isFold,
      handleFoldClick,
      breadcrumbs
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;
  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }
  .content {
    padding: 0 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
  }
}
</style>
