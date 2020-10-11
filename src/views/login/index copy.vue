<template>
  <!-- 这里使用的时Form表单，没有使用v-model相较于element-ui来说比较繁琐，弃用，转用formModel表单 -->
  <div class="login-container">
    <div class="loginFrom-container">
      <a-form :form="form" @submit="handleSubmit">
        <!-- username -->
        <a-form-item>
          <!-- 使用方式一时，Username就是该input的key，使用方式二时，这里的Username相当于id，可以跟双向绑定的key不相同 -->
          <a-input v-decorator="['username', rules.username ]" prop="Username" placeholder="请输入用户名">
            <a-icon slot="prefix" type="user" />
          </a-input>
        </a-form-item>
        <!-- password -->
        <a-form-item>
          <a-input
            v-decorator="['password', rules.password]"
            :type="isShowPassword ? 'input' : 'password'"
            placeholder="请输入密码"
          >
            <a-icon slot="prefix" type="lock" />
            <a-icon slot="suffix" :type="isShowPassword ? 'eye' : 'eye-invisible'" @click="() => isShowPassword = !isShowPassword" />
          </a-input>
        </a-form-item>
        <!-- submit -->
        <a-form-item>
          <!-- <a-button type="primary" @click="getValue"> -->
          <a-button type="primary" html-type="submit">
            Login
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowPassword: false, // 是否显示密码
      form: this.$form.createForm(this, { name: 'dynamic_rule' }), // 表单验证
      // 验证规则
      rules: {
        username: {
          rules: [{ required: true, message: '请输入用户名' }]
        },
        password: {
          rules: [
            { required: true, message: '请输入密码' },
            { validator: this.checkInputPassord }
          ]
        }
      }
    }
  },
  /* activated() { // 生命周期钩子，挂载后和更新前被调用
    this.setValue() // 设置表单的值
  }, */
  methods: {
    checkInputPassord(rule, value, callback) {
      if (value.length < 5 && value.length > 0) {
        callback('密码长度不能小于6位')
      } else {
        callback()
      }
    },
    // 双向绑定方式一
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$store
            .dispatch('user/login', values)
            .then(() => {
              this.$router.push({ path: '/' })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        }
      })
    }
    // 双向绑定方式二

    // 双向绑定实现
    // 1.设置表单中按先后顺序一一对应inout框所要绑定的key(有没有初始值都一样)
    /*  setValue() {
      this.form.setFieldsValue({
        username: '',
        password: ''
      })
    },
    // 2.获取表单中的值
    getValue() {
      const loginForm = this.form.getFieldsValue()
      this.$store
        .dispatch('user/login', loginForm)
        .then(() => {
          this.$router.push({ path: '/' })
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    } */
  }
}
</script>

<style lang="less" scoped>
.login-container {
  height: 100%;
  background-color: rgb(75, 124, 189);
  position: relative;
  .loginFrom-container {
    width: 200px;
    background-color: transparent;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 400px;
    transform: translate(-50%, -50%);
    /deep/ .ant-form {
      .ant-form-item {
        .ant-col-8 {
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
