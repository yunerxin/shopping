<template>
    <div class="goods-detail" v-if='productDetail.title'>
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
            <p class="goods-detail-info-num">
                <span>月销{{productDetail.initialNumber}}</span><span>{{productDetail.cityName}}&nbsp;&nbsp;{{productDetail.regionName}}</span>
            </p>
        </div>
        <!-- 选择规格和配送地址 -->
        <div class="goods-detail-select">
            <!-- 选择规格 -->
            <select-sku :productId='productId' :code='productDetail.code'></select-sku>
            <div class="goods-detail-select-address">
                <p><span style="color: #999;margin-right: .6rem;">送至</span><span>请选择地区</span></p>
                <van-icon name="arrow" />
            </div>
        </div>
    </div>
</template>
<script>
    import { Swipe, SwipeItem, Toast, Icon, Dialog } from 'vant';
    import { buildImagePath } from "@/util";
    import api from "@/api"
    import filters from '@/filters'
    import selectSku from "../components/selectSku.vue"
    export default {
        components: {
            [Swipe.name]: Swipe,
            [SwipeItem.name]: SwipeItem,
            [Toast.name]: Toast,
            [Icon.name]: Icon,
            [Dialog.name]: Dialog,
            selectSku
        },
        data() {
            return {
                sid: '',
                productId: '',
                productImgs: [],
                productDetail: {}
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
                Dialog.alert({
                    message: data.msg,
                    className: 'errorDialog',
                    confirmButtonColor: 'red',
                    overlayStyle: {
                        'background-color': 'rgba(0,0,0,.9)'
                    }
                }).then(() => {
                    this.$router.go(-1)
                });
            }
        },
        methods: {
            //处理图片
            handelImg(imgUrl, size) {
                return buildImagePath(imgUrl, size);
            },
            //处理钱
            handelMoney(money) {
                return filters.getCurrency(money)
            }
        }
    }
</script>
<style lang='scss' scoped>
    @import './index.scss';
</style>
<style lang='scss'>
    .errorDialog {
        width: 70vw !important;
        /deep/ .van-dialog__confirm {
            background: red !important;
            color: #fff !important;
        }
        /deep/ .van-dialog__message{
            font-size: 16px;
        }
    }
</style>