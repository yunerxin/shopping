<template>
  <div class="search">
    <good-search v-if="isSearch"></good-search>
    <search-list v-else></search-list>
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
      isSearch:false
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
