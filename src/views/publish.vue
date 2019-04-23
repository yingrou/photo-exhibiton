<template>
  <div class="app-container publish">
    <header>
      <h3 class="left">上传到我的主页</h3>
      <img src="../themes/images/logo.png" alt class="right">
    </header>
    <div class="add-detail add">
      <p>
        描述图片
        <span>（可不填）</span>
      </p>
      <input type="text" v-model="detail" name="detail">
    </div>
    <div class="add-pic add">
      <p>添加图片</p>
      <img :src="avatar" class="img-avatar">
      <div class="file">
        <p>选择图片</p>
        <input
          type="file"
          name="avatar"
          id="uppic"
          accept="image/gif, image/jpeg, image/jpg, image/png"
          @change="changeImage($event)"
          ref="avatarInput"
          class="file-btn"
        >
      </div>
      <span class="add-btn" v-if="avatar != ''" @click="addPic">发布</span>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      avatar: "",
      detail: "",
      imgSrc: ""
    };
  },
  methods: {
    changeImage(e) {
      this.imgSrc = "../../../static/add/" + e.target.files[0].name;
      var file = e.target.files[0];
      var reader = new FileReader();
      var that = this;
      reader.readAsDataURL(file);
      reader.onload = function(e) {
        that.avatar = this.result;
      };
      console.log(this.imgSrc);
    },
    addPic() {
      axios
        .post("/users/addPic", {
          imgSrc: this.imgSrc,
          detail: this.detail
        })
        .then(response => {
          let res = response.data;
          this.$router.push({path:'home'});
        });
    }
  }
};
</script>

