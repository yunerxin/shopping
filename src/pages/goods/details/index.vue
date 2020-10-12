<template>
    <div class="goods-detail" v-if='productDetail.title'>
        <div style="height: calc(100vh - 50px);overflow-y: scroll;">
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
                <div class="goods-detail-select-sku" @click='showSelectSku = true'>
                    <p><span style="color: #999;margin-right: .6rem;">规格</span><span
                            v-if='productDetail.code'>{{productDetail.code.replace(/\_/g," ")}}</span><span
                            v-else>选择规格参数</span></p>
                    <van-icon name="arrow" />
                </div>
                <div class="goods-detail-select-address" @click='isChoose = true'>
                    <p>
                        <span style="color: #999;margin-right: .6rem;">送至</span>
                        <span>{{addressObj.length>0?addressObj[0].completeAddress:'请选择地区'}}</span>
                    </p>
                    <van-icon name="arrow" />
                </div>
            </div>
        </div>
        <van-button type="danger" size="large" style="position: absolute;bottom: 0;" @click='showSelectSku = true'>立即购买
        </van-button>
        <!-- 规格弹出窗 -->
        <van-popup v-model="showSelectSku" position="bottom" :style="{ height: '70%' }">
            <select-sku @closePop='closeSelectSku' :rsMap='rsMap' :code='productDetail.code'></select-sku>
        </van-popup>
        <select-address v-if='isChoose' @getAddressDetail='getAddressDetail'></select-address>
    </div>
</template>
<script>
    import { Swipe, SwipeItem, Toast, Icon, Dialog, Popup, Button } from 'vant';
    import { buildImagePath } from "@/util";
    import api from "@/api"
    import filters from '@/filters'
    import selectSku from "../components/selectSku.vue"
    import { mapGetters } from "vuex";
    import selectAddress from '../../address/components/selectAddress.vue'
    export default {
        components: {
            [Swipe.name]: Swipe,
            [SwipeItem.name]: SwipeItem,
            [Toast.name]: Toast,
            [Icon.name]: Icon,
            [Dialog.name]: Dialog,
            [Popup.name]: Popup,
            [Button.name]: Button,
            selectSku,
            selectAddress
        },
        data() {
            return {
                showSelectSku: false,
                productId: '',
                isChoose:false
            }
        },
        computed: {
            ...mapGetters({
                productDetail: 'goods/goodsDetailObj',
                productImgs: 'goods/productImgs',
                rsMap: 'goods/rsMapObj',
                addressObj:'goods/addressObj'
            })
        },
        async created() {
            this.productId = this.$route.query.productId || '';
            await this.$store.dispatch("goods/productDetail", { productId: this.productId });
            await this.$store.dispatch("goods/rsMap", { productId: this.productId });
            await this.$store.dispatch("goods/defaultAddress");
        },
        methods: {
            //处理图片
            handelImg(imgUrl, size) {
                return buildImagePath(imgUrl, size);
            },
            //处理钱
            handelMoney(money) {
                return filters.getCurrency(money)
            },
            closeSelectSku(obj) {
                this.showSelectSku = false;
                if (obj.type == 'confirm') {
                    this.productDetail.code = obj.code;
                    let params = {
                        commodityId: this.productId,
                        specifications: obj.id,
                        agentDetailId: 0,
                        // shareId: '',
                        shopId: this.productDetail.shopId,
                        // productGroupId: '',
                        count: obj.count
                    }
                    this.$router.push({
                        path: '/order/form',
                        query: params
                    })
                }
            },
            getAddressDetail(completeAddress, obj) {
                this.addressObj[0].completeAddress = completeAddress
                this.isChoose = false
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

        /deep/ .van-dialog__message {
            font-size: 16px;
        }
    }
</style>