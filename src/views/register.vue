<template>
  <div class="app-container">
    <div class="login">
        <img src="../themes/images/logo.png" alt="">
      <form class="register-form">
        <p>用户名</p>
        <input type="text" v-model="username" name="username">
        <p>密码</p>
        <input type="password" v-model="userpwd" name="password">
        <p>邮箱</p>
        <input type="text" v-model="email" name="email">
        <p v-if="errorTip" style="color:#f65454">请完整输入信息</p>
        <p v-if="error1Tip" style="color:#f65454">{{errmsg}}</p>
        <p href="#" class="button" @click="addUser">注册</p>
      </form>
       <router-link to="/login">
         <a href="#">已有账号，去登陆</a>
      </router-link>      
    </div>
    <div class="bg">
        <img src="../themes/images/bg.png" alt="">
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      userpwd: "",
      email: "",
      errorTip: false,
      error1Tip: false,
      errmsg:''
    };
  },
  methods: {
    addUser() {
      if (!this.username || !this.userpwd || !this.email) {
        this.errorTip = true;
        return;
      }
      axios
        .post("/users/addUser", {
          username: this.username,
          userpwd: this.userpwd,
          email: this.email
        })
        .then(response => {
          let res = response.data;
          if (res.status == "0") {
            this.$router.push('/login');
            this.errorTip = false;
          } else {
            this.error1Tip = true;
            this.errorTip = false;
            this.errmsg = res.msg
          }
        });
    }
  }
};
</script>

