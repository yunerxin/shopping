<template>
  <div class="history">
    <van-search
      v-model="searchVal"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @cancel="onCancel"
      shape="round"
    />
    <div style="padding:0 .2rem">
      <p class="title" style="display: flex;justify-content: space-between;align-items: center;font-size: .28rem;"><span>搜索历史</span><van-icon name="delete" size='20px'/></p>
      <div class="list" v-if="arrayList.lenth>0">
        <p style="padding-bottom: .2rem;border-bottom: 1px solid #f5f5f5;" v-for="(item,i) in arrayList" :key="i">111</p>
      </div>
      <p v-else>暂无搜索历史</p>
    </div>
  </div>
</template>
<script>
import { Search, Icon } from "vant";
import _ from "lodash"
export default {
  components: {
    [Search.name]: Search,
    [Icon.name]: Icon
  },
  data() {
    return {
      searchVal: "",
      arrayList:[]
    };
  },
  created(){
    this.arrayList = JSON.parse(localStorage.getItem('historyArray')) || [];
  },
  methods: {
    onSearch(value) {
      if(value.replace(/\s*/g,"")){
        localStorage.setItem('historyArray',this.arrayList.push(value))
      }
    },
    onCancel() {
      // console.log()
    }
  }
};
</script>
<style scoped>

</style>
