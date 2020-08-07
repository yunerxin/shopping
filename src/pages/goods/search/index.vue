<template>
  <div class="search">
    <good-search v-if="isSearch" @searchResult='isSearch=false'></good-search>
    <search-list v-else @goSearch='isSearch=true'></search-list>
  </div>
</template>
<script>
import goodSearch from "../components/history"
import searchList from "../components/searchList"
export default {
    components:{
        goodSearch,
        searchList
    },
  data() {
    return {
      searchVal: "",
      isSearch:true
    };
  },
  methods: {
    onSearch(value) {
      console.log(value);
    },
    onCancel() {
      // console.log()
    }
  }
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
