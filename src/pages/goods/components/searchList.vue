<template>
    <div>
        <van-nav-bar
  left-arrow
  @click-left="onClickLeft"
  @click-right="onClickRight"
>
<van-search v-model="searchValue" placeholder="请输入搜索关键词" slot="title"/>
<van-icon :name="icon" slot="right"/>
</van-nav-bar>
    </div>
</template>
<script>
import { Search, Icon, NavBar } from "vant";
import cardIcon from "@/assets/search/card@2x.png"
import listIcon from "@/assets/search/list@2x.png"
export default {
    components:{
        [Search.name]:Search,
        [Icon.name]:Icon,
        [NavBar.name]:NavBar
    },
    data(){
        return {
            searchValue:'',
            icon:cardIcon,
        }
    }
}
</script>
<style scoped>

</style>
