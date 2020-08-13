<template>
    <div class="orderForm">
        <div style="height: 46px;">
            <van-nav-bar title="填写订单" left-arrow @click-left="onClickLeft" :fixed='true' />
        </div>
        <div>
            <div class="orderForm-address" @click='jumpAddress()'>
                <div>
                    <p><span>{{defalutInfo.receiptName}}</span><span style="margin-left: .2rem;">{{defalutInfo.receiptPhone}}</span></p>
                    <p>{{defalutInfo.completeAddress}}</p>
                </div>
                <van-icon name="arrow" size='.32rem' />
            </div>
            <img src="@/assets/order/border@2x.png" alt="" style="width: 100vw;">
            <div style="border-top: .2rem solid #f5f5f5;" v-if='shopsArray.length>0'>
                <form-list v-for='(item,i) in shopsArray' :key='i' :item='item'></form-list>
            </div>
        </div>
        <div style="height:84px">
            <van-submit-bar :price="calculateObj.allPrice*100" button-text="提交订单" @submit="onSubmit">
                <template #tip>收货地址：上海市浦东新区张东路1388号19棟</template>
            </van-submit-bar>
        </div>
    </div>
</template>
<script>
    import { NavBar, Icon, Toast, SubmitBar } from 'vant';
    import formList from "../components/formList.vue"
    import api from "@/api"
    import _ from "lodash"
    export default {
        components: {
            [NavBar.name]: NavBar,
            [Icon.name]: Icon,
            [Toast.name]: Toast,
            formList,
            [SubmitBar.name]: SubmitBar
        },
        data() {
            return {
                sid: '',
                shoppingcartId: '',
                shopsArray: [],
                array: [1, 2, 3],
                calculateObj: {},
                addressList:[],
                defalutInfo:{}
            }
        },
        async created() {
            this.sid = localStorage.getItem('sid');
            this.shoppingcartId = this.$route.query.shoppingcartId || '5751386,5751373,5751387,5751375';
            let params2 = {
                "cityId": 7448,
                "active": 0,
                "regionId": 7449,
                "sid": this.sid,
                "shoppingcartId": this.shoppingcartId,
                "allIntegralPrice": 0,
                "terminal": "P_TERMINAL_MOBILE",
                "commodityId": 0,
                "specifications": "",
                "count": 0,
                "couponParams": [{ "shopId": 0, "couponId": "" }]
            }
            let calculateObj = await api.post2(`order-api/m/mall/price/calculate?sid=${this.sid}`, params2);
            if (calculateObj.state == 1) {
                this.calculateObj = calculateObj.data || {};
            } else {
                Toast(calculateObj.msg)
            }
            let params = {
                shoppingcartId: this.shoppingcartId,
                commodityId: 0,
                specifications: '',
                count: 0,
                ignoreLogin: 1,
                active: 0,
                productGroupId: 0,
                parentOpenGroupId: 0,
                activeId: 0,
                terminal: 'P_TERMINAL_MOBILE',
                sid: this.sid,
                insideCode: ''
            };
            let data = await api.post(`order-api/m/mall/init`, params)
            if (data.state == 1) {
                if (data.data.shops && data.data.shops.length > 0) {
                    data.data.shops.filter(val => {
                        this.calculateObj.shopOverallPrice.filter(item => {
                            if (item.shopId == val.shopsId) {
                                val.postage = item.postage;
                                val.singleShopSumPrice = item.singleShopSumPrice
                            }
                        })
                    })
                }
                this.shopsArray = data.data.shops || [];
            } else {
                Toast(data.msg)
            }
            let addressList = await api.post(`order-api/m/mall/receipt-address/list?sid=${this.sid}`);
            if(addressList.state==1){
                this.addressList = addressList.data.receiptAddressList.list || [];
                this.defalutInfo = _.find(this.addressList, function(item) { return item.defalutAddress == 1; });
            }else{
                Toast(addressList.msg)
            }
        },
        methods: {
            onClickLeft() {
                this.$router.go(-1)
            },
            onSubmit() {
                Toast('提交订单')
            },
            jumpAddress(){
                this.$router.push('/address/list')
            }
        }
    }
</script>
<style lang='scss' scoped>
    @import "./index.scss";
</style>