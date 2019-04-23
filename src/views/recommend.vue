<template>
  <div class="app-container">
    <img src="../themes/images/slider.jpg" alt>
    <div class="recommend-tag">
      <header>
        <h3 class="left">推荐标签</h3>
        <router-link to="tag">
          <span class="right more">更多</span>
        </router-link>
      </header>
      <ul class="tag-list">
        <li v-for="item in reTagList" :key="item.tag" @click="goTagDetail(item.tagId)">
          <img :src="item.imgSrc" alt>
          <p>#{{item.tag}}</p>
        </li>
      </ul>
    </div>
    <div class="recommend-pic">
      <header>
        <h3>精选摄影美图</h3>
      </header>
      <ul class="pic-list">
        <li v-for="item in rePicList" :key="item.imgSrc">
          <img :src="item.imgSrc" alt>
          <p class="reason">{{item.reason}}</p>
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
      reTagList: [
        {
          imgSrc: "../../../static/images/pic1.jpg",
          tag: "猫咪",
          tagId:"5cbe8082b084ce256c06b722"
        },
        {
          imgSrc: "../../../static/images/pic2.jpg",
          tag: "人像",
          tagId:"5cbe8ab0708d701190355fb3"
        },
        {
          imgSrc: "../../../static/images/sky.jpg",
          tag: "天空",
          tagId:"5cbe8ab0708d701190355fb5"
        }
      ],
      rePicList: []
    };
  },
  mounted() {
    this.getRecommendPics();
  },
  methods: {
    goTagDetail(tagId) {
      this.$router.push({path:'/tagDetail?tagId='+tagId});
    },
    getRecommendPics() {
      axios.get("/tag/getRecpic").then(response => {
        let res = response.data;
        if (res.status == "0") {
          this.rePicList = res.result.list;
        }
      })
    }
  }
};
</script>
