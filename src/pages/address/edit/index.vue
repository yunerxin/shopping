<template>
    <div>
        <van-nav-bar title="编辑收货地址" right-text="删除" left-arrow @click-left="goBack()" @click-right="deleteAddress" />
        <div>
            <van-field v-model="addressObj.name" label="姓名" placeholder="请输入姓名" />
            <van-field v-model="addressObj.tel" type='tel' label="手机号码" placeholder="请输入手机号" />
            <div class="address" @click='isChoose=true'>
                <p class="address-label">所在地区</p>
                <p class="address-detail">
                    <span>{{addressObj.localAddress}}</span>
                    <van-icon name="arrow" />
                </p>
            </div>
            <van-field v-model="addressObj.detailAddress" label="详细地址" placeholder="请输入详细地址" />
        </div>
        <div class="address-bottom">
            <van-button type="danger" round size="large" @click='saveEdit()' :class="{'grayBgc':!isSave}">保存
            </van-button>
        </div>
        <select-address v-if='isChoose' @getAddressDetail='getAddressDetail'></select-address>
    </div>
</template>
<script>
    import { NavBar, Field, Icon, Button, Dialog, Toast } from 'vant';
    import { mapGetters } from "vuex";
    import _ from 'lodash'
    import api from "@/api"
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
                isChoose: false,
                id: '',
                oldaddressObj: {},
                addressObj: {},
                isSave: true,
                sid: localStorage.getItem('sid'),
                terminal: localStorage.getItem('terminal'),
                idObj:{},
            }
        },
        computed: {
            ...mapGetters({
                addressList: "orderForm/addressList"
            })
        },
        async created() {
            this.id = this.$route.query.id;
            await this.$store.dispatch('orderForm/addressList');
            this.oldaddressObj = _.filter(this.addressList, item => { return item.id == this.id; })[0];
            this.addressObj = Object.assign({}, this.oldaddressObj);
            console.log('___________', this.addressObj)
        },
        methods: {
            async saveEdit() {
                this.addressObj.receiptName = this.addressObj.name
                this.addressObj.receiptPhone = this.addressObj.tel
                this.addressObj.completeAddress = this.addressObj.address
                let params = Object.assign(this.addressObj,this.idObj)
                await this.$store.dispatch('address/saveAddressFun',params);
                this.$router.go(-1)
            },
            deleteAddress() {
                Dialog.confirm({
                    title: '',
                    message: '确认删除该地址吗？',
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    className: "addressDialog"
                })
                    .then(async () => {
                        // on confirm
                        let data = await api.post(`order-api/m/mall/receipt-address/delete?sid=${this.sid}&id=${this.id}`);
                        if (data.state == 1) {
                            Toast('删除地址成功');
                            this.$router.go(-1)
                        } else {
                            Toast(data.msg || '获取接口失败')
                        }
                    })
                    .catch(() => {
                        // on cancel
                    });
            },
            goBack() {
                let attrList = [
                    "name",
                    "tel",
                    "localAddress",
                    "detailAddress"
                ]
                var oldVue = _.pick(this.oldaddressObj, attrList);
                var newVue = _.pick(this.addressObj, attrList);
                if (JSON.stringify(oldVue) != JSON.stringify(newVue)) {
                    Dialog.confirm({
                        title: "",
                        message: "修改的信息还未保存，确认现在返回么？",
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        className: "addressDialog"
                    })
                        .then(async () => {
                            // on confirm
                            this.$router.go(-1)
                        })
                        .catch(() => {
                            // on cancel
                        });
                } else {
                    this.$router.go(-1)
                }
            },
            getAddressDetail(completeAddress, obj) {
                this.idObj = obj;
                this.addressObj.localAddress = completeAddress
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
                            !newVal.name ||
                            !newVal.tel ||
                            !newVal.localAddress ||
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
<style lang='scss' scoped>
    .van-nav-bar {
        /deep/ .van-icon {
            color: #000 !important;
        }

        /deep/ .van-nav-bar__text {
            color: #323233 !important;
        }
    }

    .van-address-edit {
        padding: 0 !important;
    }

    .address {
        display: flex;
        margin: 0 16px;
        font-size: 14px;
        border-bottom: 1px solid #ebedf0;

        &-label {
            color: #646566;
            width: 6em;
            margin-right: 12px;
        }

        &-detail {
            flex: 1;
            justify-content: space-between;
            display: flex;
            align-items: center;
        }
    }

    .address-bottom {
        padding: .3rem;
        position: absolute;
        bottom: 0;
        width: 100vw;
        box-sizing: border-box;

        /deep/ .van-button--large {
            height: 10.67vw;
        }
    }

    .grayBgc {
        background-color: #999 !important;
        border-color: #999;
    }
</style>
<style lang="scss">
    .addressDialog {
        width: 70vw !important;

        .van-dialog__confirm {
            background: linear-gradient(90deg, red, #ff2e5d);
            color: #fff;
        }
    }
</style>