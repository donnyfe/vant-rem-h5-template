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
      <!-- 手机号输入框 -->
      <van-field
        v-model="formData.phone"
        name="phone"
        placeholder="请输入手机号"
        :rules="[
          { required: true, message: '请填写手机号' },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式错误' }
        ]"
      >
        <template #left-icon>
          <van-icon name="phone-o" />
        </template>
      </van-field>

      <!-- 验证码输入框 -->
      <van-field
        v-model="formData.code"
        name="code"
        placeholder="请输入验证码"
        :rules="[{ required: true, message: '请填写验证码' }]"
      >
        <template #left-icon>
          <van-icon name="shield-o" />
        </template>
        <template #button>
          <van-button
            size="small"
            type="primary"
            :disabled="!!timer || !formData.phone || !/^1[3-9]\d{9}$/.test(formData.phone)"
            @click="sendCode"
          >
            {{ timer ? `${countdown}s后重新获取` : '获取验证码' }}
          </van-button>
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
import { reactive, ref } from 'vue'
import { showToast, showSuccessToast, showFailToast } from 'vant'

// 表单数据
const formData = reactive({
  phone: '',
  code: '',
  agreement: false
})

// 倒计时相关
const timer = ref<number | null>(null)
const countdown = ref(60)

// 发送验证码
const sendCode = async () => {
  try {
    // TODO: 调用发送验证码接口
    await mockSendCode() // 模拟API调用

    showSuccessToast({
      message: '验证码发送成功',
      duration: 2000
    })

    // 开始倒计时
    countdown.value = 60
    timer.value = window.setInterval(() => {
      countdown.value--
      if (countdown.value <= 0) {
        clearInterval(timer.value!)
        timer.value = null
      }
    }, 1000)
  } catch (error) {
    showFailToast({
      message: '验证码发送失败，请稍后重试',
      duration: 2000
    })
  }
}

// 表单提交
const onSubmit = async (values: any) => {
  try {
    // 表单验证
    if (!values.phone) {
      showToast('请输入手机号')
      return
    }
    if (!/^1[3-9]\d{9}$/.test(values.phone)) {
      showToast('手机号格式不正确')
      return
    }
    if (!values.code) {
      showToast('请输入验证码')
      return
    }
    if (!values.agreement) {
      showToast('请阅读并同意用户协议')
      return
    }

    // TODO: 调用登录接口
    await mockLogin() // 模拟API调用

    showSuccessToast({
      message: '登录成功',
      duration: 1500,
      onClose: () => {
        // TODO: 登录成功后的跳转逻辑
      }
    })
  } catch (error) {
    showFailToast({
      message: '登录失败，请稍后重试',
      duration: 2000
    })
  }
}

// 查看协议
const showAgreement = () => {
  // TODO: 实现协议展示逻辑
  showToast('打开用户协议')
}

// 模拟API调用
const mockSendCode = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000)
  })
}

const mockLogin = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000)
  })
}
</script>

<style
  lang="scss"
  scoped
>
  .login-page {
    min-height: 100vh;
    background: linear-gradient(135deg, #f6f8ff 0%, #d8e2ff 100%);
    display: flex;
    flex-direction: column;

    .page-header {
      padding: 150px 0 50px;
      text-align: center;

      .title {
        font-size: 28px;
        font-weight: 600;
        color: #242333;
        margin-bottom: 12px;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }


      .subtitle {
        font-size: 16px;
        color: #666d92;
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
