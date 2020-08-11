<template>
    <div class="goods-detail">
        <!-- 轮播图 -->
        <van-swipe :autoplay="3000" v-if='productImgs.length>0'>
            <van-swipe-item v-for="(image, index) in productImgs" :key="index">
                <img :src="handelImg(image.address,'PD750')" />
            </van-swipe-item>
        </van-swipe>
        <!-- 详情 -->
        <div class="goods-detail-info">
            <p class="goods-detail-info-price">￥{{handelMoney(productDetail.intrinsicPrice)}}</p>
            <p class="goods-detail-info-title">{{productDetail.title}}</p>
            <p class="goods-detail-info-sub">{{productDetail.productSubtitle}}</p>
            <p class="goods-detail-info-num"><span>月销{{productDetail.initialNumber}}</span><span>{{productDetail.cityName}}&nbsp;&nbsp;{{productDetail.regionName}}</span></p>
        </div>
        <!-- 选择规格和配送地址 -->
        <div class="goods-detail-select">
            <div class="goods-detail-select-sku" @click='selectSku'><p><span style="color: #999;">规格</span>&nbsp;&nbsp;&nbsp;&nbsp;选择 属性名称</p><van-icon name="arrow" /></div>
            <div class="goods-detail-select-address"><p><span style="color: #999;">参数</span>&nbsp;&nbsp;&nbsp;&nbsp;上市年份季节 材质分成 穿搭方式 袖长</p><van-icon name="arrow" /></div>
        </div>
        <!-- 选择规格 -->
        <van-sku v-model="showSku" :sku="sku" :goods="goods"
            :hide-stock="sku.hide_stock" @buy-clicked="onBuyClicked"
            @add-cart="onAddCartClicked" />
    </div>
</template>
<script>
    import { Swipe, SwipeItem, Toast, Icon,Sku } from 'vant';
    import { buildImagePath } from "@/util";
    import api from "@/api"
    import filters from '@/filters'
    import selectSku from "../components/selectSku.vue"
    export default {
        components: {
            [Swipe.name]: Swipe,
            [SwipeItem.name]: SwipeItem,
            [Toast.name]: Toast,
            [Icon.name]:Icon,
            [Sku.name]:Sku,
            selectSku
        },
        data() {
            return {
                sid:'',
                sku: {
                    tree: [
                        {
                            k: '颜色', // skuKeyName：规格类目名称
                            k_s: 's1', // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
                            v: [
                                {
                                    id: '1', // skuValueId：规格值 id
                                    name: '红色', // skuValueName：规格值名称
                                },
                                {
                                    id: '2',
                                    name: '蓝色',
                                }
                            ],
                            largeImageMode: false, //  是否展示大图模式
                        },
                        {
                            k: '品牌', // skuKeyName：规格类目名称
                            k_s: 's2', // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
                            v: [
                                {
                                    id: '1', // skuValueId：规格值 id
                                    name: '美的', // skuValueName：规格值名称
                                },
                                {
                                    id: '2',
                                    name: '美的2',
                                }
                            ],
                            largeImageMode: false, //  是否展示大图模式
                        }
                    ],
                    price: '1.00', // 默认价格（单位元）
                    stock_num: 227, // 商品总库存
                    hide_stock: false // 是否隐藏剩余库存
                },
                goods: {
                    // 默认商品 sku 缩略图
                    picture: 'https://img.yzcdn.cn/1.jpg'
                },
                showSku:false,
                productId: '',
                productImgs: [],
                productDetail:{}
            }
        },
        async created() {
            this.sid = localStorage.getItem('sid');
            this.productId = this.$route.query.productId || '';
            let data = await api.get(`mall-api/m/product/detail?productId=${this.productId}&active=0`);
            console.log(data);
            if (data.state == 1) {
                this.productImgs = data.data.product.productPics || [];
                this.productDetail = data.data.product || {}
            } else {
                Toast(data.msg)
            }
        },
        methods: {
            //处理图片
            handelImg(imgUrl, size) {
                return buildImagePath(imgUrl, size);
            },
            //处理钱
            handelMoney(money){
                return filters.getCurrency(money)
            },
            onBuyClicked(skuData){
                console.log('立即购买',skuData)
            },
            onAddCartClicked(){
                console.log('添加购物车',skuData)
            },
            async selectSku(){
                this.showSku=true;
                let data = await api.get(`mall-api/m/product/specification-detail/get?sid=${this.sid}&productId=${this.productId}&active=8&insideCode=`);
                console.log('________________',data)
            }
        }
    }
</script>
<style lang='scss' scoped>
    @import './index.scss';
</style>