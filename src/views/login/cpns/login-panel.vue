<template>
  <div class="login-panel">
  <h1>后台管理系统</h1>
  <el-tabs type="border-card" class="login-tabs" stretch>
    <el-tab-pane>
      <template #label>
        <span class="custom-tabs-label">
          <el-icon><Avatar /></el-icon>
          <span>账户登录</span>
        </span>
      </template>
      <login-account ref="accountRef" />
    </el-tab-pane>
    <el-tab-pane label="Config">
      <template #label>
        <span class="custom-tabs-label">
          <el-icon><Iphone /></el-icon>
          <span>手机登录</span>
        </span>
      </template>
      <login-phone />
    </el-tab-pane>
  </el-tabs>

    <div class="account-control">
      <el-checkbox>记住密码</el-checkbox>
      <el-link>忘记密码</el-link>
    </div>

    <el-button type="primary" class="login-btn" @click="handleLoginClick">立即登录</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

//导入组件
import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'

export default defineComponent({
  components: {
    LoginAccount,
    LoginPhone
  },
  setup() {
    //记录记住密码状态
     let isKeepPassword = ref(true)
     //获取组件 注意类型
     const accountRef = ref<InstanceType<typeof LoginAccount>>()
     //登录事件
     const handleLoginClick = () => {
       //当点击按钮后，按照情况调用组件内的事件
       accountRef.value?.loginAction()

     }
    return {
     isKeepPassword,
     accountRef,
     handleLoginClick
    }
  }
})
</script>

<style scoped lang="less">
.login-panel {
  width: 320px;
  min-width: 320px;
  margin-bottom: 150px;
  h1 {
    text-align: center;
  }

  .account-control {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }

  .login-btn {
    margin-top: 10px;
    width: 100%;
  }
}

.login-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.login-tabs .custom-tabs-label .el-icon {
  vertical-align: middle;
}
.login-tabs .custom-tabs-label span {
  vertical-align: middle;
  margin-left: 4px;
}
</style>
