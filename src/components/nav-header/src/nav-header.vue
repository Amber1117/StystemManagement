<template>
  <div class="nav-header">
    <el-icon @click="handleFoldClick" class="fold-menu">
      <component :is="isFold ? 'fold' : 'expand'"></component>
    </el-icon>

    <div class="content">
      <div>面包屑</div>
       <user-info></user-info>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import UserInfo from './user-info.vue'
export default defineComponent({
  emits: ['foldChange'],
  components: {
    UserInfo
  },
  setup (props, { emit }) {
    const isFold = ref(false)  //是否折叠
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit("foldChange", isFold.value)
    }
    return {
      isFold,
      handleFoldClick
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
