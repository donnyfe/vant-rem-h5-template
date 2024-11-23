<template>
<div class="login-page">
  <!-- 顶部标题 -->
  <div class="page-header">
    <h2 class="title">欢迎登录</h2>
    <p class="subtitle">登录后体验更多功能</p>
  </div>

  <!-- 登录表单 -->
  <van-form
    class="login-form"
    @submit="onSubmit"
  >
    <van-cell-group inset>
      <!-- 用户名输入框 -->
      <van-field
        v-model="formData.username"
        name="username"
        placeholder="请输入用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      >
        <template #left-icon>
          <van-icon name="user-o" />
        </template>
      </van-field>

      <!-- 密码输入框 -->
      <van-field
        v-model="formData.password"
        type="password"
        name="password"
        placeholder="请输入密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      >
        <template #left-icon>
          <van-icon name="lock" />
        </template>
      </van-field>
    </van-cell-group>

    <!-- 协议勾选 -->
    <div class="agreement-section">
      <van-checkbox
        v-model="formData.agreement"
        shape="square"
      >
        我已阅读并同意
        <span
          class="link"
          @click="showAgreement"
        >《用户协议》</span>
      </van-checkbox>
    </div>

    <!-- 登录按钮 -->
    <div class="submit-btn">
      <van-button
        round
        block
        type="primary"
        native-type="submit"
        :disabled="!formData.agreement"
      >
        登录
      </van-button>
    </div>
  </van-form>
</div>
</template>

<script
  setup
  lang="ts"
>
import { reactive } from 'vue'
import { showToast } from 'vant'

// 表单数据
const formData = reactive({
  username: '',
  password: '',
  agreement: false
})

// 表单提交
const onSubmit = (values: any) => {
  console.log('submit:', values)
  // TODO: 实现登录逻辑

}

// 查看协议
const showAgreement = () => {
  // TODO: 实现协议展示逻辑
}
</script>

<style
  lang="scss"
  scoped
>
  .login-page {
    height: 100vh;
    background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);

    .page-header {
      padding: 48px 0;
      text-align: center;

      .title {
        font-size: 24px;
        font-weight: 600;
        color: #2c3e50;
        margin-bottom: 8px;
      }

      .subtitle {
        font-size: 14px;
        color: #7f8c8d;
      }
    }

    .login-form {
      padding: 0 20px;

      :deep(.van-cell-group) {
        background: transparent;
      }

      :deep(.van-cell) {
        background: rgba(255, 255, 255, 0.9);
        border: 1px solid #e8e8e8;
        transition: all 0.3s ease;
        padding: 12px 16px;
        margin-bottom: 16px;
        border-radius: 8px;

        &:hover {
          border-color: #a8c6df;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }

        &:focus-within {
          border-color: #2980b9;
          box-shadow: 0 2px 12px rgba(41, 128, 185, 0.1);
        }
      }

      :deep(.van-cell__value) {
        position: relative;
      }

      :deep(.van-field__error-message) {
        position: absolute;
        top: 50px;
        left: 0;
      }

      :deep(.van-field__left-icon) {
        color: #94a3b8;
        font-size: 18px;
        margin-right: 8px;
      }

      :deep(.van-field__control) {
        color: #2c3e50;
        font-size: 15px;

        &::placeholder {
          color: #94a3b8;
        }
      }

      .agreement-section {
        margin: 24px 16px;
        font-size: 14px;

        .link {
          color: #3498db;
        }
      }

      .submit-btn {
        margin: 0 16px;

        :deep(.van-button--primary) {
          background: #2980b9;
          border-color: #2980b9;

          &:active {
            background: #2472a4;
            border-color: #2472a4;
          }

          &[disabled] {
            background: #bdc3c7;
            border-color: #bdc3c7;
          }
        }
      }
    }
  }
</style>
