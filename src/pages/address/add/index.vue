<template>
    <div class="address-add">
        <van-nav-bar title="新增收货地址" left-arrow @click-left="goBack()" />
        <div>
            <van-field v-model="addressObj.name" label="姓名" placeholder="请输入姓名" />
            <van-field v-model="addressObj.tel" type='tel' label="手机号码" placeholder="请输入手机号" />
            <div class="address">
                <van-field v-model="addressObj.localAddress" label="所在地区" placeholder="请选择所在地区"/>
                    <van-icon name="arrow" />
            </div>
            <van-field v-model="addressObj.detailAddress" label="详细地址" placeholder="请输入详细地址" />
        </div>
        <div class="address-bottom">
            <van-button type="danger" round size="large" @click='save()' :class="{'grayBgc':!isSave}">保存
            </van-button>
        </div>
    </div>
</template>
<script>
    import { NavBar, Field, Icon, Button, Dialog, Toast } from 'vant';
    export default {
        components:{
            [NavBar.name]:NavBar,
            [Field.name]:Field,
            [Icon.name]:Icon,
            [Button.name]:Button,
            [Dialog.name]:Dialog,
            [Toast.name]:Toast
        },
        data(){
            return {
                addressObj:{},
                isSave:false
            }
        },
        methods:{
            goBack(){
                this.$router.go(-1)
            },
            save(){
                console.log('__________',this.addressObj)
            }
        },
        watch:{
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
<style lang="scss" scoped>
    @import "./index.scss";
</style>