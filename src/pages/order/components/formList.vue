<template>
    <div class="order-list">
        <p class="order-list-name">快乐蚂蚁旗舰店</p>
        <div>
            <goods-detail></goods-detail>
        </div>
        <div style="padding: 0 .3rem;" class="order-list-detail">
            <p class="order-list-detail-property"><span>资产抵扣</span>
                <van-icon name="arrow" size='.32rem' />
            </p>
            <p class="order-list-detail-express"><span>配送方式</span><span>快递 免邮</span></p>
            <p class="order-list-detail-msg">
                <van-field v-model="value" label="买家留言:" placeholder="选填:填写内容已和卖家协商确定" />
            </p>
            <p class="order-list-detail-count">共1件商品 合计：￥3218</p>
        </div>
    </div>
</template>
<script>
    import goodsDetail from './goodsDetail.vue'
    import { Icon, Field } from 'vant';
    export default {
        components: {
            goodsDetail,
            [Icon.name]: Icon,
            [Field.name]:Field
        },
        data() {
            return {
                value:''
            }
        }
    }
</script>
<style lang='scss' scoped>
    .order-list {
        height: .9rem;
        line-height: .9rem;

        &-name {
            font-size: .24rem;
            font-weight: 600;
            padding-left: .3rem;
            margin: 0;
            width: 100vw;
            box-sizing: border-box;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }

        &-detail {
            p{
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: .9rem;
                border-bottom: 1px solid #f5f5f5;
                font-size:.28rem;
                margin:0;
            }
            &-msg {
                /deep/ .van-cell{
                    padding: 0;
                }
            }
            &-count{
                justify-content: flex-end;
            }
        }
    }
</style>