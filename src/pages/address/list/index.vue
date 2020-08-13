<template>
    <div class="address">
        <div style="height:46px">
            <van-nav-bar title="收货地址" left-arrow @click-left="onClickLeft" />
        </div>
        <van-address-list v-model="selectedAddressId" :list="addressList" @add="addAddress" @edit="editAddress" @click-item='modifyDefalut()'/>
    </div>
</template>
<script>
    import api from "@/api"
    import { NavBar, Icon, Toast, AddressList } from 'vant';
    import _ from "lodash"
    export default {
        components: {
            [Toast.name]: Toast,
            [NavBar.name]: NavBar,
            [AddressList.name]: AddressList
        },
        data() {
            return {
                sid: "",
                addressList: [],
                selectedAddressId: ''
            }
        },
        async created() {
            this.sid = localStorage.getItem('sid')
            let data = await api.post(`order-api/m/mall/receipt-address/list?sid=${this.sid}`)
            if (data.state == 1) {
                if (data.data.receiptAddressList.list && data.data.receiptAddressList.list.length > 0) {
                    var keyMaps = {
                        "receiptName": "name",
                        "receiptPhone": "tel",
                        "completeAddress": "address",
                    };

                    data.data.receiptAddressList.list.map((item) => {
                        _.forEach(keyMaps, (newKey, oldKey) => {
                            item[newKey] = item[oldKey];
                            delete item[oldKey];
                        });
                        return item;
                    });
                }
                this.addressList = data.data.receiptAddressList.list || [];
                this.selectedAddressId = _.find(this.addressList, function (item) { return item.defalutAddress == 1; }).id
            } else {
                Toast(data.msg)
            }
        },
        methods: {
            //返回上一页
            onClickLeft() {
                this.$router.go(-1)
            },
            editAddress(item, index) {
                console.log(item, '_____________', index)
            },
            addAddress() { },
            async modifyDefalut(){
                let params = {
                    sid:this.sid,
                    id:this.selectedAddressId
                };
                let data = await api.post(`order-api/m/mall/receipt-address/set-default`,params);
                if(data.state==1){
                    Toast('选择地址成功');
                    this.onClickLeft()
                }else{
                    Toast(data.msg)
                }
            }
        }
    }
</script>
<style lang='scss' scoped>
    @import "./index.scss";
</style>