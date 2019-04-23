<template>
  <div class="app-container">
    <div class="login">
      <img src="../themes/images/logo.png" alt>
      <form class="register-form">
        <p>用户名</p>
        <input type="text" v-model="username" name="username">
        <p>密码</p>
        <input type="password" v-model="userpwd" name="email">
        <p v-if="errorTip" style="color:#f65454">账号或密码错误</p>
        <p href="#" class="button" @click="login">登陆</p>
      </form>
      <router-link to="/register">
        <a href="#">没有账号，去注册</a>
      </router-link>
    </div>
    <div class="bg">
      <img src="../themes/images/bg.png" alt>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      username: "zhangfei",
      userpwd: "12345test",
      errorTip: false
    };
  },
  methods: {
    login() {
      if (!this.username || !this.userpwd) {
        this.errorTip = true;
        return;
      }
      axios
        .post("/users/login", {
          username: this.username,
          userpwd: this.userpwd
        })
        .then(response => {
          let res = response.data;
          // this.$store.commit("updateUserInfo",res.result);
          if (res.status == "0") {
            this.errorTip = false;
            this.$router.push('/home');
          } else {
            this.errorTip = true;
          }
        });
    }
  }
};
</script>

