<template>
    <div class="goods-sku">
        <div class="goods-sku-info">
            <div class="goods-sku-info-left">
                <div class="goods-sku-info-left-image"><img :src="handelImg(selectedObj.address,'PD750')" alt=""></div>
                <div class="goods-sku-info-left-goods">
                    <p class="goods-sku-info-left-goods-money">￥<span
                            style="font-size: .5rem;">{{handelMoney(selectedObj.price)}}</span></p>
                    <p style="color: #666;">库存{{selectedObj.stock}}件</p>
                    <p style="margin-top: 5px;" v-if='selectedObj.code'>已选:"{{selectedObj.code.replace(/\_/g,",")}}"</p>
                </div>
            </div>
            <van-icon name="cross" size='.35rem' @click='closePop("close")' />
        </div>
        <div class="goods-sku-category">
            <div style="border-bottom: 1px solid #f5f5f5;" v-if='rsMap.productTtributesMap.seriesAttributes.length>0'>
                <div v-for='(item,i) in rsMap.productTtributesMap.seriesAttributes' :key='i'>
                    <p class="goods-sku-category-title">{{item.attributeName}}</p>
                    <div class="goods-sku-category-block">
                        <p v-for='(val,index) in item.attributeValue.split(",")' :key='index'
                            :class="{choose:selectedObj.code.indexOf(val)>-1}" @click='selected(val,i)'>{{val}}</p>
                    </div>
                </div>
            </div>
            <div class="goods-sku-count"><span>购买数量</span><van-stepper v-model="count" integer :max="selectedObj.stock"/></div>
        </div>
        <van-button type="danger" size="large" @click='closePop("confirm")' style="position: fixed;bottom: 0;">确定</van-button>
    </div>
</template>
<script>
    import { Icon, Button, Stepper } from 'vant';
    import api from "@/api"
    import filters from '@/filters'
    import _ from "lodash"
    import { buildImagePath } from "@/util";
    export default {
        props: {
            'rsMap': {
                type: Object
            },
            'code': {
                type: String
            }
        },
        components: {
            [Icon.name]: Icon,
            [Button.name]: Button,
            [Stepper.name]:Stepper
        },
        watch: {
            rsMap: {
                handler(newVal, oldVal) {
                    if (JSON.stringify(newVal) != "{}") {
                        this.selectedSku = this.code.split("_")
                        this.selectedObj = _.filter(newVal.descartesCombinationMap.SKU, item => { return item.code == this.code; })[0]; 
                    }
                },
                deep: true,
                immediate: true
            }
        },
        data() {
            return {
                selectedSku: [],
                selectedObj: {},
                count:1
            }
        },
        methods: {
            //处理图片
            handelImg(imgUrl, size) {
                return buildImagePath(imgUrl, size);
            },
            //处理钱
            handelMoney(money) {
                return filters.getCurrency(money)
            },
            closePop(type) {
                this.selectedObj.count = this.count;
                this.selectedObj.type = type;
                this.$emit('closePop', this.selectedObj)
            },
            selected(val, i) {
                this.selectedSku[i] = val;
                this.rsMap.descartesCombinationMap.SKU
                this.selectedObj = _.filter(this.rsMap.descartesCombinationMap.SKU, item => { return item.code == this.selectedSku.join('_'); })[0];
            }
        },
    }
</script>
<style lang='scss' scoped>
    @import './selectSku.scss';
</style>