<template>
  <div>
    <div style="height:46px">
      <van-nav-bar
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
        :fixed="true"
      >
        <van-search
          v-model="searchValue"
          placeholder="请输入搜索关键词"
          slot="title"
          shape="round"
        />
        <van-icon :name="icon" slot="right" size=".4rem"/>
      </van-nav-bar>
    </div>
    <div style="display: flex;justify-content: space-around;font-size: .28rem;">
      <p
        v-for="(item, i) in tabs"
        :key="i"
        style="display: flex;align-items: center"
        @click="changeSelect(i)"
      >
        <span :style="item.isActive ? 'color:red' : ''">{{ item.name }}</span
        ><i
          v-if="item.hasTriangle"
          style="border: .07rem solid transparent;border-top-color: #000;margin: 5px 0 0 5px;"
        ></i>
      </p>
    </div>
    <div v-if="listArray.length > 0" style="padding:0 .3rem">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div
          style="display:flex;border-bottom: 1px solid #f5f5f5;"
          v-for="(item, i) in listArray"
          :key="i"
        >
          <div style="width: 2.4rem;height: 2.4rem;position: relative;">
            <img
              :src="handelImg(item.imageUrl, 'PD750')"
              alt=""
              style="max-width: 100%;max-height: 100%;position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);"
              v-if="item.imageUrl"
            />
            <img src="@/assets/search/bitmap.png" alt="" v-else>
          </div>

          <div style="margin-left: .4rem;">
            <p style="margin-bottom: 1.2rem;font-size: .28rem;">
              {{ item.productName }}
            </p>
            <p>
              <span style="font-size: .34rem;color: red;"
                ><i style="font-style:normal;font-size:.24rem">￥</i
                >{{ handelMoney(item.price) }}</span
              ><span style="margin-left: .2rem;color: #999;"
                >月销{{ item.salesCount }}件</span
              >
            </p>
            <p style="display: flex;">
              <span>{{ item.shopsName }}</span
              ><span style="color:#666;display: flex;align-items: center;"
                >进店<van-icon name="arrow"
              /></span>
            </p>
          </div>
        </div>
      </van-list>
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
import bitmap from '@/assets/search/bitmap.png'
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
      bitmap:bitmap,
      loading: false,
      finished: false,
      searchValue: "",
      icon: cardIcon,
      tabs: [
        {
          name: "综合",
          hasTriangle: false,
          isActive: true,
          key: "orderByCombinationScore"
        },
        {
          name: "销量",
          hasTriangle: true,
          isActive: false,
          key: "orderBySalesCount"
        },
        {
          name: "价格",
          hasTriangle: true,
          isActive: false,
          key: "orderByPrice"
        }
      ],
      pageInfo: {
        pageSize: 15,
        pageNo: 1
      },
      keyword: "",
      orderBySalesCount: 2,
      orderByPrice: 2,
      listArray: [],
      orderByCombinationScore: 2,
      obj: {}
    };
  },
  created() {
    this.obj.orderByCombinationScore = this.orderByCombinationScore;
    this.onLoad();
  },
  methods: {
    changeSelect(i) {
      this.tabs.filter((item, index) => {
        item.isActive = i == index;
        if (i == index) {
          this.obj[item.key] = this[item.key];
        } else {
          delete this.obj[item.key];
        }
      });
      this.pageInfo.pageNo=1;
      this.onLoad()
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
      this.icon = this.icon == "cardIcon" ? "listIcon" : "cardIcon";
    },
    async onLoad() {
      this.loading = true;
      if(this.pageInfo.pageNo==1){
        this.listArray = []
      }
      let params = { ...this.obj, ...this.pageInfo, keyword: this.keyword };
      let data = await api.get(`search-api/m/mall/goods/search`, params);
      console.log(data);
      if (data.state == 1) {
        if(data.data && data.data.length==this.pageInfo.pageSize){
          this.listArray = this.listArray.concat(data.data);
          this.pageInfo.pageNo++;
        }else if(data.data && data.data.length<this.pageInfo.pageSize){
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
<style>
.van-nav-bar .van-icon {
  color: #000 !important;
}
.van-nav-bar__title {
  width: 80%;
  max-width: 100% !important;
}
</style>
