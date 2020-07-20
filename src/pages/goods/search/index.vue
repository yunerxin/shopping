<template>
  <div class="search">
    <good-search></good-search>
    <search-list></search-list>
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
      searchVal: ""
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
