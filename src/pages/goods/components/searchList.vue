<template>
  <div class="searchList">
    <div style="height:46px">
      <van-nav-bar left-arrow @click-left="onClickLeft" @click-right="onClickRight" :fixed="true">
        <van-search v-model="searchValue" placeholder="请输入搜索关键词" slot="title" shape="round" @focus='goSearch' />
        <van-icon :name="icon" slot="right" size=".4rem" />
      </van-nav-bar>
    </div>
    <div style="display: flex;justify-content: space-around;font-size: .28rem;margin: .2rem;">
      <p v-for="(item, i) in tabs" :key="i" style="display: flex;align-items: center" @click="changeSelect(i)">
        <span :style="item.isActive ? 'color:red' : ''">{{ item.name }}</span><i v-if="item.hasTriangle" :class="['triangle',{topTriangle:item.isTop,bottomTriangle:!item.isTop}]"></i>
      </p>
    </div>
    <div v-if="listArray.length > 0" style="padding:0 .3rem" :class="isList?'verticalRank':'horizontalRank'">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div class="list" v-for="(item, i) in listArray" :key="i">
          <div :class="isList?'left':'top'">
            <img :src="handelImg(item.imageUrl, 'PD750')" alt="" v-if="item.imageUrl" />
            <img src="@/assets/search/bitmap.png" alt="" v-else />
          </div>

          <div :class="isList?'right':'bottom'">
            <p class="productName" style="font-size: .28rem;">
              {{ item.productName }}
            </p>
            <p class="num">
              <span style="font-size: .34rem;color: red;"><i
                  style="font-style:normal;font-size:.24rem">￥</i>{{ handelMoney(item.price) }}</span><span
                style="margin-left: .2rem;color: #999;">月销{{ item.salesCount }}件</span>
            </p>
            <p class="goShop">
              <span style="margin-right: 5px;">{{ item.shopsName }}</span><span
                style="color:#666;display: flex;align-items: center;">进店
                <van-icon name="arrow" /></span>
            </p>
          </div>
        </div>
      </van-list>
    </div>
    <div v-else style="text-align:center;margin-top: 1rem;">
      <img src="@/assets/search/noData@2x.png" alt="" style="width:4.8rem" />
      <p>抱歉，这个星球找不到呢！</p>
    </div>
  </div>
</template>
<script>
  import { Search, Icon, NavBar, Toast, Loading, List } from "vant";
  import cardIcon from "@/assets/search/card@2x.png";
  import listIcon from "@/assets/search/list@2x.png";
  import api from "@/api";
  import { buildImagePath } from "@/util";
  import filters from "@/filters";
  import bitmap from "@/assets/search/bitmap.png";
  export default {
    components: {
      [Search.name]: Search,
      [Icon.name]: Icon,
      [NavBar.name]: NavBar,
      [Toast.name]: Toast,
      [Loading.name]: Loading,
      [List.name]: List
    },
    data() {
      return {
        bitmap: bitmap,
        loading: false,
        finished: false,
        searchValue: "",
        icon: listIcon,
        isList: true,
        tabs: [
          {
            name: "综合",
            hasTriangle: false,
            isActive: true,
            key: "orderByCombinationScore",
            isTop:true,
          },
          {
            name: "销量",
            hasTriangle: true,
            isActive: false,
            key: "orderBySalesCount",
            isTop:true,
          },
          {
            name: "价格",
            hasTriangle: true,
            isActive: false,
            key: "orderByPrice",
            isTop:true,
          }
        ],
        pageInfo: {
          pageSize: 15,
          pageNo: 1
        },
        keyword: "",
        listArray: [],
        orderByCombinationScore: 2,
        obj: {}
      };
    },
    created() {
      this.keyword = this.$route.query.value;
      console.log("this.keyword", this.keyword);
      this.obj.orderByCombinationScore = this.orderByCombinationScore;
      this.onLoad();
    },
    methods: {
      goSearch() {
        this.$emit('goSearch')
      },
      changeSelect(i) {
        this.tabs.filter((item, index) => {
          if (i == index) {
            if(item.isActive){item.isTop = !item.isTop;}
            this.obj[item.key] = item.isTop?2:1;
          } else {
            item.isTop = true;
            delete this.obj[item.key];
          }
          item.isActive = i == index;
        });
        this.pageInfo.pageNo = 1;
        this.onLoad();
      },
      //处理钱
      handelMoney(money) {
        return filters.getCurrency(money);
      },
      //处理图片
      handelImg(imgUrl, size) {
        return buildImagePath(imgUrl, size);
      },
      onClickLeft() {
        this.$router.go(-1);
      },
      onClickRight() {
        this.icon = this.icon == cardIcon ? listIcon : cardIcon;
        this.isList = this.icon !== cardIcon;
      },
      async onLoad() {
        this.loading = true;
        if (this.pageInfo.pageNo == 1) {
          this.listArray = [];
        }
        let params = { ...this.obj, ...this.pageInfo, keyword: this.keyword };
        let data = await api.get(`search-api/m/mall/goods/search`, params);
        console.log(data);
        if (data.state == 1) {
          if (data.data && data.data.length == this.pageInfo.pageSize) {
            this.listArray = this.listArray.concat(data.data);
            this.pageInfo.pageNo++;
          } else if (data.data && data.data.length < this.pageInfo.pageSize) {
            this.listArray = this.listArray.concat(data.data);
            this.finished = true;
          }
        } else {
          this.finished = true;
          Toast.fail(data.msg);
        }
        this.loading = false;
      }
    }
  };
</script>
<style lang='scss' scoped>
  @import "./searchList.scss";
</style>