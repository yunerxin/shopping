<template>
    <div class="goods-list">
        <div class="goods-list-left">
            <img :src="handelImg(item.imgPath,'SQ120')" alt="">
        </div>
        <div class="goods-list-right">
            <p class="goods-list-right-name">{{item.name}}</p>
            <p class="goods-list-right-color">颜色:{{item.code1}}、尺寸:LLLLLLL</p>
            <p class="goods-list-right-money"><span style="font-weight:600">￥{{handelMoney(item.price)}}</span><span
                    style="color: #666;">x{{item.count}}</span></p>
        </div>
    </div>
</template>
<script>
    import filter from '@/filters'
    import { buildImagePath } from "@/util";
    export default {
        props: {
            'item': {
                type: Object
            }
        },
        data() {
            return {}
        },
        methods: {
            handelMoney(money) {
                return filter.getCurrency(money)
            },
            //处理图片
            handelImg(imgUrl, size) {
                return buildImagePath(imgUrl, size);
            },
        }
    }
</script>
<style lang="scss" scoped>
    .goods-list {
        padding: .2rem .3rem;
        background-color: #f5f5f5;
        border-bottom: 5px solid #fff;
        display: flex;

        p {
            margin: 0;
        }

        &-left {
            background-color: #fff;
            width: 1.5rem;
            height: 1.5rem;
            position: relative;
            margin-right: .2rem;

            img {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                max-width: 100%;
                max-height: 100%;
            }
        }

        &-right {
            flex: 1;
            font-size: .26rem;
            color: #333;

            &-name {
                line-height: .36rem;
                width: 100%;
                word-break: break-all;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }

            &-color {
                color: #666;
                font-size: .24rem;
                line-height: .4rem;
                margin-bottom: 4px;
            }

            &-money {
                display: flex;
                justify-content: space-between;
            }
        }
    }
</style>