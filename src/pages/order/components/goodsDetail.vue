<template>
    <div class="goods-list">
        <div class="goods-list-left">
            <img src="" alt="">
        </div>
        <div class="goods-list-right">
            <p class="goods-list-right-name">Lenovo/联想 小新潮7000 i5笔记本电脑 轻薄便捷 学生超薄商务</p>
            <p class="goods-list-right-color">颜色:白色白色白色白色白色、尺寸:LLLLLLL</p>
            <p class="goods-list-right-money"><span style="font-weight:600">￥{{handelMoney(324)}}</span><span style="color: #666;">x1</span></p>
        </div>
    </div>
</template>
<script>
    import filter from '@/filters'
    export default {
        data() {
            return {}
        },
        methods:{
            handelMoney(money){
                return filter.getCurrency(money)
            }
        }
    }
</script>
<style lang="scss" scoped>
    .goods-list {
        padding: .2rem .3rem;
        background-color: #f5f5f5;
        border-bottom: 5px solid #fff;
        display: flex;
        p{
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
            &-color{
                color: #666;
                font-size: .24rem;
                line-height: .4rem;
                margin-bottom: 4px;
            }
            &-money{
                display: flex;
                justify-content: space-between;
            }
        }
    }
</style>