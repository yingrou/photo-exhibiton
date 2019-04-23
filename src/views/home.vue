<template>
  <div class="app-container">
    <ul class="pic-list">
      <li v-for="(item,index) in picList" :key="item.imgSrc">
        <header class="pic-header">
          <div class="left">
            <img src="./../themes/images/pic1.jpg" alt="" class="left avatar">
             <p>{{item.author.username}}</p>
          </div>
          <div class="right operation">
            <!-- <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-bianji"></use>
            </svg>
             <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-jinrongxianxingge-"></use>
            </svg> -->
          </div>
        </header>
        <img :src="item.imgSrc" alt>
        <footer class="pic-footer">
          <p class="detail">{{item.detail}}</p>
          <p class="like right"> 评论 {{item.commentList.length}}</p>
          <div class="icon-line">
            <!-- <svg class="icon" aria-hidden="true" v-if="!isLike" @click="likePic(index)">
              <use xlink:href="#icon-aixin1"></use>
            </svg>
            <svg class="icon pink" aria-hidden="true" v-if="isLike" @click="likePic(index)">
              <use xlink:href="#icon-aixin1"></use>
            </svg> -->
            <svg class="icon" aria-hidden="true" @click="isComment=index">
              <use xlink:href="#icon-pinglun"></use>
            </svg>
          </div>
          <div class="tag">
            <span v-for="tag in item.tagList" :key="tag">{{tag}}</span>
          </div>
          <div class="comment">
            <p v-for="com in item.commentList" :key="com.user">
              <span>{{com.username}}： {{com.comment}}</span>
            </p>
          </div>
          <div class="add-comment" v-if="isComment==index">
            <textarea name="comment" id cols="30" rows="1" v-model="newComment"></textarea>
            <div class="right">
              <span @click="addComment(index)">发送评论</span>
              <span class="cancel" @click="isComment=null">取消</span>
            </div>
          </div>
        </footer>
      </li>
    </ul>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      username: "yingrou",
      newComment: "",
      isComment: -1,
      isLike: true,
      picList: []
    };
  },
  mounted() {
    this.getAllPic();
  },
  methods: {
    getAllPic() {
      axios.get("/users/getPic").then(response => {
        let res = response.data;
        if (res.status == "0") {
          this.picList = res.result.list;
        } else {
          this.picList = [];
        }
      });
    },
    addComment(val) {
      this.picList[val].commentList.push({
        username: "zhangfei",
        comment: this.newComment
      });
      this.isComment = -1;
      this.newComment = "";
    },
    likePic(val) {
      if (this.isLike == false) {
        this.isLike = true;
        this.picList[val].likeNum++;
      } else if (this.isLike == true) {
        this.isLike = false;
        this.picList[val].likeNum--;
      }
    }
  }
};
</script>

