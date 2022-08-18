<template>
  <div class="login-account">
   <el-form  label-width="65px" :rules="rules" :model="account" ref="formRef">
     <el-form-item label="用户名" prop="name">
       <el-input v-model="account.name"></el-input>
     </el-form-item>
     <el-form-item label="密码" prop="password">
       <el-input v-model="account.password" show-password></el-input>
     </el-form-item>
   </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { ElForm } from 'element-plus'

//导入本地存储方法
import LocalCache from '@/utils/cache'
 //表单验证规则
import { rules } from '../config/account-config'
//导入vuex
import { useStore } from 'vuex'
export default defineComponent({
  setup() {
    const store = useStore()
    const account = reactive({
      name: LocalCache.getCache("name") ?? '',
      password: LocalCache.getCache("password") ?? ''
    })
    //获取表单内容
   const formRef = ref<InstanceType<typeof ElForm>>()
   //登录点击事件
   const loginAction = (isKeepPassword: boolean) => {
     formRef.value?.validate((valid: boolean) => {
       if(valid) {
       //1.如果选择记住密码，则将密码保存在localStorage中
       if(isKeepPassword) {
          LocalCache.setCache("name", account.name)
          LocalCache.setCache("password", account.password)
       } else {
          LocalCache.deleteCache("name")
          LocalCache.deleteCache("password")
       }
       //2.进行表单验证事件{...account}将proxy对象转换为普通的对象
       store.dispatch('login/accountLoginAction', {...account})
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
