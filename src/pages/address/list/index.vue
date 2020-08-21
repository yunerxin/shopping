<template>
    <div class="address">
        <div style="height:46px">
            <van-nav-bar title="收货地址" left-arrow @click-left="onClickLeft" />
        </div>
        <van-address-list v-model="selectedAddressId" :list="addressList" @add="addAddress" @edit="editAddress"
            @select='modifyDefalut' />
    </div>
</template>
<script>
    import api from "@/api"
    import { NavBar, Icon, Toast, AddressList } from 'vant';
    import _ from "lodash"
    import { mapGetters } from "vuex";
    export default {
        components: {
            [Toast.name]: Toast,
            [NavBar.name]: NavBar,
            [AddressList.name]: AddressList
        },
        data() {
            return {}
        },
        computed: {
            ...mapGetters({
                addressList: "orderForm/addressList",
                // selectedAddressId: "orderForm/selectedAddressId"
            }),
            selectedAddressId:{
                get(){
                    return this.$store.state.orderForm.selectedAddressId
                },
                set(val){
                    this.$store.state.orderForm.selectedAddressId=val
                }
            }
        },
        async created() {
            await this.$store.dispatch('orderForm/addressList')
        },
        methods: {
            //返回上一页
            onClickLeft() {
                this.$router.go(-1)
            },
            editAddress(item, index) {
                this.$router.push(`edit?id=${item.id}`)
            },
            addAddress() {
                this.$router.push('add')
            },
            async modifyDefalut(item,index) {
                let params = {
                    id: item.id,
                    sid:localStorage.getItem('sid')
                };
                let data = await api.post(`order-api/m/mall/receipt-address/set-default`, params);;
                if (data.state == 1) {
                    Toast('选择地址成功');
                    this.onClickLeft()
                } else {
                    Toast(data.msg)
                }
            }
        }
    }
</script>
<style lang='scss' scoped>
    @import "./index.scss";
</style>