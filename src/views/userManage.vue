<template>
  <div class="app-container user-manage">
    <div class="info-header">
      <img src="../themes/images/bg1.jpg" alt class="bg">
      <div class="info-detail">
        <img src="../themes/images/pic1.jpg" alt class="avatar">
        <p>{{username}}</p>
        <span style="color:white">{{email}}</span>
      </div>
    </div>
    <div class="user-pic">
      <h3>作品</h3>
      <ul>
        <li v-for="item in picList" :key="item.imgSrc">
          <img :src="item.imgSrc" alt>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      picList: [],
      username:'未登录',
      email:''
    };
  },
  mounted() {
    this.getUserPic();
  },
  methods: {
    getUserPic() {
      axios.get("/users/getUserPic").then(response => {
        let res = response.data;
        if (res.status == "0") {
          this.picList = res.result.list[0].pictures;
          this.username = res.result.list[0].username;
          this.email = res.result.list[0].email;
        }
      });
    }
  }
};
</script>
