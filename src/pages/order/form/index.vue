<template>
    <div class="orderForm">
        <van-nav-bar title="填写订单" left-arrow @click-left="onClickLeft" />
        <div class="orderForm-address">
            <div>
                <p><span>宋宇</span><span>186****2133</span></p>
                <p>上海市 徐汇区 漕河泾街道 虹梅路1905号甲</p>
            </div>
            <van-icon name="arrow" size='.32rem'/>
        </div>
        <img src="@/assets/order/border@2x.png" alt="" style="width: 100vw;">
        <div style="border-top: .2rem solid #f5f5f5;">
            <form-list></form-list>
        </div>
    </div>
</template>
<script>
    import { NavBar,Icon } from 'vant';
    import formList from "../components/formList.vue"
    export default {
        components:{
            [NavBar.name]:NavBar,
            [Icon.name]:Icon,
            formList
        },
        data() {
            return {}
        },
        methods: {
            onClickLeft() {
                this.$router.go(-1)
            }
        }
    }
</script>
<style lang='scss' scoped>
    @import "./index.scss";
</style>