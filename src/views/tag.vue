<template>
  <div class="app-container">
    <ul class="tag-detail">
      <li v-for="item in tagList" :key="item._id" @click="goTagDetail(item._id)">
        <img :src="item.imgSrc" alt>
        <p class="tag-name">#{{item.name}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      tagList:[]
    };
  },
  mounted() {
    this.getTagName();
  },
  methods: {
    getTagName() {
      axios.get("/tag/getTagName").then(response => {
        let res = response.data;
        if (res.status == "0") {
          this.tagList = res.result.list
        }
      });
    },
    goTagDetail(tagId) {
      this.$router.push({path:'/tagDetail?tagId='+tagId});
    }
  }
};
</script>