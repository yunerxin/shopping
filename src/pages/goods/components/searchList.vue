<template>
  <div>
    <van-nav-bar
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <van-search
        v-model="searchValue"
        placeholder="请输入搜索关键词"
        slot="title"
        shape="round"
      />
      <van-icon :name="icon" slot="right" size=".4rem" @click="changeIcon" />
    </van-nav-bar>
    <div style="display: flex;justify-content: space-around;font-size: .28rem;">
      <p
        v-for="(item, i) in tabs"
        :key="i"
        style="display: flex;align-items: center"
      >
        <span>{{ item.name }}</span
        ><i
          v-if="item.hasTriangle"
          style="border: .07rem solid transparent;border-top-color: #000;margin: 5px 0 0 5px;"
        ></i>
      </p>
    </div>
    <div v-if="listArray.length > 0" style="padding:0 .3rem">
      <div
        style="display:flex;border-bottom: 1px solid #f5f5f5;"
        v-for="(item, i) in listArray"
        :key="i"
      >
        <p
          style="width: 2.4rem;height: 2.4rem;position: relative;">
          <img
            :src="handelImg(item.imageUrl, 'PD750')"
            alt=""
            style="max-width: 100%;max-height: 100%;position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);"/>
        </p>

        <div style="margin-left: .4rem;">
          <p style="margin-bottom: 1.2rem;">{{ item.productName }}</p>
          <p>
            <span style="font-size: .34rem;color: red;"><i style="font-style:normal;font-size:.24rem">￥</i>{{ handelMoney(item.price) }}</span><span style="margin-left: .2rem;color: #999;">月销{{ item.salesCount }}件</span>
          </p>
          <p>
            <span>{{ item.shopsName }}</span><span style="color:#666">进店<van-icon name="arrow" /></span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Search, Icon, NavBar, Toast } from "vant";
import cardIcon from "@/assets/search/card@2x.png";
import listIcon from "@/assets/search/list@2x.png";
import api from "@/api";
import { buildImagePath } from "@/util";
import filters from "@/filters";
export default {
  components: {
    [Search.name]: Search,
    [Icon.name]: Icon,
    [NavBar.name]: NavBar,
    [Toast.name]: Toast
  },
  data() {
    return {
      searchValue: "",
      icon: cardIcon,
      tabs: [
        {
          name: "综合",
          hasTriangle: false,
          isActive: true
        },
        {
          name: "销量",
          hasTriangle: true,
          isActive: false
        },
        {
          name: "价格",
          hasTriangle: true,
          isActive: false
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
      orderByCombinationScore:2
    };
  },
  created() {
    this.onLoad();
  },
  methods: {
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
    onClickRight() {},
    changeIcon() {
      this.icon = this.icon == "cardIcon" ? "listIcon" : "cardIcon";
    },
    async onLoad() {
      let obj = {
        pageNo:this.pageInfo.pageNo,
        pageSize:this.pageInfo.pageSize,
        keyword:this.keyword,
        orderByCombinationScore:this.orderByCombinationScore,
        isWelfare: 0,
        isVip: false,
        // orderBySalesCount:this.orderBySalesCount,
        // orderByPrice:this.orderByPrice
      }
      let data = await api.post2(
        `search-api/m/mall/goods/search`,
        obj
      );
      console.log(data);
      if (data.state == 1) {
        this.listArray = data.data || [];
      } else {
        Toast.fail(data.msg);
      }
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
