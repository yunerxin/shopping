<template>
    <div>
        <van-sku v-model="showSku" :sku="sku" :goods="goods" :goods-id="goodsId"
            :hide-stock="sku.hide_stock" @buy-clicked="onBuyClicked"
            @add-cart="onAddCartClicked" />
    </div>
</template>
<script>
    import { Sku } from 'vant';
    export default {
        props:{
            'goodsId':{
                type:String,
                default:''
            },
            'showSku':{
                type:Boolean,
                default:false
            }
        },
        components:{
            [Sku.name]:Sku
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
                                },
                                {
                                    id: '1',
                                    name: '蓝色'
                                }
                            ],
                            largeImageMode: false, //  是否展示大图模式
                        }
                    ],
                    price: '1.00', // 默认价格（单位元）
                    stock_num: 227, // 商品总库存
                    hide_stock: false // 是否隐藏剩余库存
                },
                goods: {
                    // 默认商品 sku 缩略图
                    picture: 'https://img.yzcdn.cn/1.jpg'
                },
            }
        },
        methods:{
            onBuyClicked(skuData){
                console.log('立即购买',skuData)
            },
            onAddCartClicked(){
                console.log('添加购物车',skuData)
            }
        }
    }
</script>
<style lang='scss' scoped></style>