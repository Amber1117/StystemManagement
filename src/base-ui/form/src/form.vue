<template>
  <div class="wp-form">
    <div class="header">
      <slot name="header"></slot>
    </div>
      <el-form :label-width="labelWidth">
        <el-row>
          <template v-for="item in formItems" :key="item.label">
             <el-col v-bind="colLayout">
                <el-form-item
                :label="item.label"
                :style="itemStyle">

                  <template v-if="item.type === 'input' || item.type === 'password'">
                     <el-input
                      :placeholder="item.placeholder"
                       v-model="formData[`${item.field}`]"
                      :show-password="item.type === 'password'"
                     />
                  </template>

                  <template v-else-if="item.type === 'select'">
                    <el-select
                     :placeholder="item.placeholder"
                     v-model="formData[`${item.filed}`]"
                      v-bind="item.otherOptions"
                      style="width: 100%">
                      <el-option
                       v-for="option in item.options"
                        :key="option.value"
                        :value="option.value">
                          {{ option.title }}
                      </el-option>
                    </el-select>
                  </template>

                  <template v-else-if="item.type === 'datepicker'">
                    <el-date-picker
                    v-model="formData[`${item.filed}`]"
                     v-bind="item.otherOptions"/>
                  </template>

                </el-form-item>
             </el-col>
          </template>

        </el-row>

      </el-form>
      <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
import { IFormItem } from '../types'

export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    formItems: {
      type: Array as PropType<IFormItem[]>,
      default: () => [] //ts语法要求，必须是箭头函数
    },
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6, // >1920px 4个
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      })
    },
    itemStyle: {
      type: Object,
      default: () => ({
        padding: '10px 40px'
      })
    },
    labelWidth: {
      type: String,
      default: '100px'
    }
  },
  emits:['update:modelValue'],
  setup(props, { emit }) {
    const formData = ref({ ...props.modelValue })  //浅拷贝
    watch(formData,
    (newValue) => emit('update:modelValue',newValue),
    {deep: true})
    return {
      formData
    }
  }
})
</script>

<style scoped lang="less">
.wp-form {
  padding-top: 22px;
}
</style>
