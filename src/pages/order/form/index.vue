<template>
    <div class="orderForm">
        <div style="height: 46px;">
            <van-nav-bar title="填写订单" left-arrow @click-left="onClickLeft" :fixed='true' />
        </div>
        <div>
            <div class="orderForm-address" @click='jumpList()' v-if='defalutInfo.name'>
                <div>
                    <p><span>{{defalutInfo.name}}</span><span style="margin-left: .2rem;">{{defalutInfo.tel}}</span></p>
                    <p>{{defalutInfo.address}}</p>
                </div>
                <van-icon name="arrow" size='.32rem' />
            </div>
            <div class="orderForm-address" @click='jumpAdd()' v-else>
                <div style="display: flex;align-items: center;">
                    <img src="@/assets/order/add.png" alt="" style="width:.3rem;height:.3rem">
                    <p style="margin: 0 0 0 2vw;font-size: 4vw;font-weight: 700;">添加收获地址</p>
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
                <template #tip v-if='defalutInfo.name'>收货地址：{{defalutInfo.address}}</template>
            </van-submit-bar>
        </div>
    </div>
</template>
<script>
    import { NavBar, Icon, Toast, SubmitBar, Dialog } from 'vant';
    import formList from "../components/formList.vue"
    import api from "@/api"
    import _ from "lodash"
    import { mapGetters } from "vuex";
    export default {
        components: {
            [NavBar.name]: NavBar,
            [Icon.name]: Icon,
            [Toast.name]: Toast,
            formList,
            [SubmitBar.name]: SubmitBar,
            [Dialog.name]: Dialog
        },
        data() {
            return {}
        },
        computed: {
            ...mapGetters({
                calculateObj: "orderForm/calculate",
                shopsArray: "orderForm/shopsArray",
                defalutInfo: "orderForm/defalutInfo"
            })
        },
        async created() {
            let params1 = {...this.$route.query,
                "cityId": 7448,
                "active": 0,
                "regionId": 7449
            }
            await this.$store.dispatch("orderForm/calculateFun", params1);
            let params2 = {...this.$route.query,
                ignoreLogin: 1,
                active: 0,
                productGroupId: 0,
                parentOpenGroupId: 0,
                activeId: 0,
            }
            await this.$store.dispatch("orderForm/initFun", params2)
            await this.$store.dispatch("orderForm/addressList");
            if (!this.defalutInfo.name) {
                Dialog.confirm({
                    title: '您还没有收货地址',
                    message: '快去新增一个吧！',
                    confirmButtonText: "新增地址",
                    cancelButtonText: "返回",
                    className: "formDialog"
                })
                    .then(async () => {
                        // on confirm
                        this.$router.push('/address/add')
                    })
                    .catch(() => {
                        // on cancel
                    });
            }
        },
        methods: {
            onClickLeft() {
                this.$router.go(-1)
            },
            onSubmit() {
                Toast('提交订单')
            },
            jumpList() {
                this.$router.push('/address/list')
            },
            jumpAdd(){
                this.$router.push('/address/add')
            }
        }
    }
</script>
<style lang='scss' scoped>
    @import "./index.scss";
</style>
<style lang='scss'>
    .formDialog {
        width: 70vw !important;

        .van-dialog__confirm {
            background: linear-gradient(90deg, red, #ff2e5d);
            color: #fff;
        }
    }
</style>