<template>
  <div class="login-container">
    <div class="loginFrom-container">
      <SelectLanguage />
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
      >
        <!-- username -->
        <a-form-model-item ref="username" prop="username">
          <a-input
            v-model="form.username"
            @blur="
              () => {
                $refs.username.onFieldBlur();
              }
            "
          >
            <a-icon slot="prefix" type="user" />
          </a-input>
        </a-form-model-item>
        <!-- password -->
        <a-form-model-item ref="password" prop="password">
          <a-input
            v-model="form.password"
            :type="isShowPassword ? 'input' : 'password'"
            @blur="
              () => {
                $refs.password.onFieldBlur();
              }
            "
          >
            <a-icon slot="prefix" type="lock" />
            <a-icon slot="suffix" :type="isShowPassword ? 'eye' : 'eye-invisible'" @click="() => isShowPassword = !isShowPassword" />
          </a-input>
        </a-form-model-item>

        <a-form-model-item>
          <a-button type="primary" :loading="loading" @click="onSubmit">
            {{ $t('login.signIn') }}
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
  </div>
</template>

<script>
import SelectLanguage from '@/components/langSelect/index'
export default {
  components: {
    SelectLanguage
  },
  data() {
    return {
      loading: false,
      form: {
        username: 'admin',
        password: 'admin'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, message: '密码长度最少为6位', trigger: 'blur' }
        ]
      },
      isShowPassword: false
    }
  },
  methods: {
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('user/login', this.form)
            .then(() => {
              this.$message.success({
                content: '登录成功',
                duration: 2
              })
              this.$router.push({ path: '/' })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.login-container {
  height: 100%;
  position: relative;
  .loginFrom-container {
    width: 500px;
    background-color: transparent;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 400px;
    transform: translate(-50%, -50%);
    /deep/ .ant-form {
      .ant-form-item {
        .ant-col-14 {
          width: 100%;
        }
        .ant-input {
          height: 50px;
        }
        .ant-form-item-children {
          .ant-btn-primary {
            height: 40px;
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
