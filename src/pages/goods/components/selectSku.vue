<template>
    <div>
        <div @click='selectSku' class="select-sku">
            <p><span style="color: #999;margin-right: .6rem;">规格</span><span
                    v-if='code'>{{code.replace(/\_/g," ")}}</span><span v-else>选择属性名称</span></p>
            <van-icon name="arrow" />
        </div>
        <van-sku v-model="showSku" :sku="sku" :goods="goods" :hide-stock="sku.hide_stock" @buy-clicked="onBuyClicked"
            @add-cart="onAddCartClicked" />
    </div>

</template>
<script>
    import { Sku, Toast, Icon } from 'vant';
    import api from "@/api"
    export default {
        props: {
            'productId': {
                type: String
            },
            'code': {
                type: String
            }
        },
        components: {
            [Sku.name]: Sku,
            [Toast.name]: Toast,
            [Icon.name]: Icon
        },
        data() {
            return {
                sku: {
                    tree: [
                        {
                            k: '颜色', // skuKeyName：规格类目名称
                            k_s: 's1', // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
                            v: [
                                {
                                    id: '1', // skuValueId：规格值 id
                                    name: '红色', // skuValueName：规格值名称
                                }
                            ],
                            largeImageMode: false, //  是否展示大图模式
                        },
                        {
                            k: '品牌', // skuKeyName：规格类目名称
                            k_s: 's2', // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
                            v: [
                                {
                                    id: '1', // skuValueId：规格值 id
                                    name: '美的', // skuValueName：规格值名称
                                }
                            ],
                            largeImageMode: false, //  是否展示大图模式
                        },
                    ],
                    price: '1.00', // 默认价格（单位元）
                    stock_num: 227, // 商品总库存
                    hide_stock: false, // 是否隐藏剩余库存
                    // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
                    list: [
                        {
                            id: 2259, // skuId
                            s1: '1', // 规格类目 k_s 为 s1 的对应规格值 id
                            s2: '1', // 规格类目 k_s 为 s2 的对应规格值 id
                            price: 100, // 价格（单位分）
                            stock_num: 110 // 当前 sku 组合对应的库存
                        }
                    ],
                },
                goods: {
                    // 默认商品 sku 缩略图
                    picture: 'https://img.yzcdn.cn/1.jpg'
                },
                showSku: false,
            }
        },
        methods: {
            onBuyClicked(skuData) {
                console.log('立即购买', skuData);
                this.$router.push('/order/form')
            },
            onAddCartClicked() {
                console.log('添加购物车', skuData)
            },
            async selectSku() {
                this.showSku = true;
                let data = await api.get(`mall-api/m/product/specification-detail/get?sid=${localStorage.getItem('sid')}&productId=${this.productId}&active=8&insideCode=`);
                console.log('________________', data)
                if (data.state == 1) {

                } else {
                    Toast(data.msg)
                }
            }
        }
    }
</script>
<style lang='scss' scoped>
    .select-sku {
        padding: 0 0.3rem;
        border-bottom: 1px solid #f5f5f5;
        height: 0.9rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>