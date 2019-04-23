<template>
  <div class="app-container">
    <ul class="pic-list">
      <header class="pic-header">
          <h3>#{{username}}</h3>
      </header>
      <li v-for="(item,index) in picList" :key="item.imgSrc">
        <img :src="item.imgSrc" alt>
        <footer class="pic-footer">
          <p class="detail">{{item.detail}}</p>
          <p class="like right">评论 {{item.commentList.length}}</p>
          <div class="icon-line">
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
      username: "",
      newComment: "",
      isComment: -1,
      isLike: true,
      picList: [],
      tagId:''
    };
  },
  mounted() {
    this.tagId = this.$route.query.tagId;
    this.getPicByTag();
  },
  methods: {
    getPicByTag() {
      axios.get("/tag/getPicByTag",{
        params:{
          tagId: this.tagId
        }
      }).then(response => {
        let res = response.data;
        if (res.status == "0") {
          this.picList = res.result.list[0].pictures;
          this.username = res.result.list[0].name;
        }
      });
    }
  }
};
</script>
