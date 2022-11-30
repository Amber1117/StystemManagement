<template>
  <div class="wp-table">
     <div class="header">
       <slot>
         <div class="title">{{ title }}</div>
         <div class="handler">
           <slot name="headerHandler"></slot>
         </div>
       </slot>
     </div>
    <el-table
    :data="listData"
    border
    style="width: 100%"
    @selection-change="handleSelectionChange">
      <!-- type="selection" 选中列  @selection-change监听选中行-->
      <el-table-column
      v-if="showSelectColumn"
      type="selection"
      align="center"
      width="60"
      ></el-table-column>
      <el-table-column
      v-if="showIndexColumn"
      type="index"
      align="center"
      width="60"
      ></el-table-column>
      <template v-for="propItem in propList" :key="propItem.prop">
         <el-table-column v-bind="propItem" align="center" >
           <!-- 外层是作用域插槽的使用 scope.row表格一行数据-->
            <template #default="scope">
              <slot :name="propItem.slotName" :row="scope.row">
                {{scope.row[propItem.prop]}}
              </slot>

            </template>
         </el-table-column>

      </template>

  </el-table>

  <div class="footer">
    <slot name="footer">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        >
      </el-pagination>
    </slot>
  </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
   listData: {
     type: Array,
     required: true
   },
   propList: {
     type: Array,
     required: true
   },
   showSelectColumn: {
     type: Boolean
   },
   showIndexColumn: {
     type: Boolean
   },
   title: {
     type: String,
   }
  },
  emits:['selectionChange'],
  setup (props, { emit }) {
    const handleSelectionChange = (value: any) => {
      emit('selectionChange', value)
    }

    return {
      handleSelectionChange
    }
  }
})
</script>

<style scoped lang="less">
.header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 20px;
    font-weight: 700;
  }

  .handler {
    align-items: center;
  }
}
.footer {
  margin-top: 15px;
  overflow: hidden;
  .el-pagination {
    text-align: right;
    float:right;
  }
}
</style>
