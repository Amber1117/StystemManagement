<template>
   <div class="page-content">
      <wp-table
      :listData="userList"
      v-bind="contentTableConfig"
      @selectionChange="selectionChange">
        <!-- 匹配动态插槽，修改状态信息 -->
        <template #status="scope">
          <el-button
          :type="scope.row.enable ? 'success':'danger'"
          plain
          size="small"
          >
          {{ scope.row.enable ? '启用' : '禁用' }}
          </el-button>
        </template>

        <template #createAt="scope">
          <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
        </template>

        <template #updateAt="scope">
          <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
        </template>

        <template #handler>
          <div class="handle-btns">
             <el-button size="small" type="text" >
               <el-icon size="small">
                 <Edit />
               </el-icon>编辑</el-button>

               <el-button size="small" type="text">
                <el-icon size="small">
                 <Delete />
               </el-icon>删除</el-button>
          </div>
        </template>
        <!-- 1.header中的插槽 -->
        <template #headerHandler>
          <el-button type="primary" size="medium">新建用户</el-button>
        </template>
      </wp-table>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import WpTable from '@/base-ui/table'
export default defineComponent({
  components: {
    WpTable
  },
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const store = useStore()
    //调用vuex中的的方法，获取用户列表
    store.dispatch('system/getPageListAction', {
      pageName: props.pageName,
      queryInfo: {
        offset: 0,
        size: 10
      }
    })
    //取出用户列表
    const userList = computed(() => store.state.system.userList)
    const userCount = computed(() => store.state.system.userCount)
    return {
      userList
    }
  }
})
</script>

<style scoped>
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
