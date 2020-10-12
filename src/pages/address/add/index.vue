<template>
    <div class="address-add">
        <van-nav-bar title="新增收货地址" left-arrow @click-left="goBack()" />
        <div>
            <van-field v-model="addressObj.receiptName" label="姓名" placeholder="请输入姓名" />
            <van-field v-model="addressObj.receiptPhone" type='tel' label="手机号码" placeholder="请输入手机号" />
            <div class="address" @click='isChoose=true'>
                <van-field v-model="addressObj.completeAddress" label="所在地区" placeholder="请选择所在地区" />
                <van-icon name="arrow" />
            </div>
            <van-field v-model="addressObj.detailAddress" label="详细地址" placeholder="请输入详细地址" />
        </div>
        <div class="address-bottom">
            <van-button type="danger" round size="large" @click='save()' :class="{'grayBgc':!isSave}">保存
            </van-button>
        </div>
        <select-address v-if='isChoose' @getAddressDetail='getAddressDetail'></select-address>
    </div>
</template>
<script>
    import { NavBar, Field, Icon, Button, Dialog, Toast } from 'vant';
    import selectAddress from "../components/selectAddress.vue"
    export default {
        components: {
            [NavBar.name]: NavBar,
            [Field.name]: Field,
            [Icon.name]: Icon,
            [Button.name]: Button,
            [Dialog.name]: Dialog,
            [Toast.name]: Toast,
            selectAddress
        },
        data() {
            return {
                addressObj: {},
                isSave: false,
                isChoose: false,
                idObj: {},
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1)
            },
            async save() {
                let params = Object.assign(this.addressObj, this.idObj)
                await this.$store.dispatch('address/saveAddressFun',params);
                this.$router.go(-1)
            },
            getAddressDetail(completeAddress, obj) {
                this.idObj = obj;
                this.addressObj.completeAddress = completeAddress
                this.isChoose = false;
            }
        },
        watch: {
            addressObj: {
                deep: true,
                immediate: true,
                handler: async function (newVal) {
                    if (newVal) {
                        if (
                            !newVal.receiptName ||
                            !newVal.receiptPhone ||
                            !newVal.completeAddress ||
                            !newVal.detailAddress
                        ) {
                            this.isSave = false;
                        } else {
                            this.isSave = true;
                        }
                    }
                }
            },
        }
    }
</script>
<style lang="scss" scoped>
    @import "./index.scss";
</style>