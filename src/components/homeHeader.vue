<template>
  <nav>
    <header class="home-header">
      <div class="left">
        <svg class="icon" aria-hidden="true" @click="isHide=false">
          <use xlink:href="#icon-mulu"></use>
        </svg>
      </div>
      <div class="right">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiaoxi"></use>
        </svg>
      </div>
    </header>
    <aside class="side">
      <div class="side-bar" :class="{sideHide:isHide}">
        <div class="side-top">
          <img src="../themes/images/logo.png" alt>
        </div>
        <ul></ul>
        <ul class="side-list">
          <li @click="goUserManage">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-yonghu"></use>
            </svg>
            <span>个人主页</span>
          </li>
          <li @click="logOut">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-084tuichu"></use>
            </svg>
            <span>返回登陆页面</span>
          </li>
        </ul>
      </div>
      <div class="side-bg" v-if="!isHide" @click="isHide=true"></div>
    </aside>
  </nav>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      search: true,
      isHide: true
    };
  },
  mounted() {},
  methods: {
    logOut() {
      axios.post("/users/logout").then(response => {
        let res = response.data;
        if (res.status == "0") {
          // this.$store.commit("updateUserInfo",'');
          this.isHide = true;
          this.$router.push("/login");
        }else {
          this.isHide = true;
          this.$router.push("/login");
        }
      });
    },
    goUserManage() {
      this.isHide = true;
      this.$router.push("/userManage");
    }
  }
};
</script>
