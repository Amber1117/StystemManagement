<template>
  <div class="login-account">
   <el-form  label-width="65px" :rules="rules" :model="account" ref="formRef">
     <el-form-item label="用户名" prop="name">
       <el-input v-model="account.name"></el-input>
     </el-form-item>
     <el-form-item label="密码" prop="password">
       <el-input v-model="account.password"></el-input>
     </el-form-item>
   </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { ElForm } from 'element-plus'
 //表单验证规则
 import { rules } from '../config/account-config'
export default defineComponent({
  setup() {
    const account = reactive({
      name: '',
      password: ''
    })
    //获取表单内容
   const formRef = ref<InstanceType<typeof ElForm>>()
   const loginAction = () => {
     formRef.value?.validate((valid) => {
       if(valid) {
         console.log('真正执行登录逻辑')
       }
     })
   }
    return {
      account,
      rules,
      loginAction,
      formRef
    }
  }
})
</script>

<style scoped>
</style>
