<template>
    <div>
        <van-popup v-model="showPop" round position="bottom">
            {{areaList}}
            <van-area title="标题" :area-list="areaList" />
          </van-popup>
    </div>
</template>
<script>
    import { Area, Popup } from 'vant';
    import { mapGetters } from "vuex";
    export default{
        components:{
            [Area.name]:Area,
            [Popup.name]:Popup
        },
        data(){
            return {
                showPop:true,
                regionId:778937,
                level:1,
                areaList:{}
            }
        },
        async created(){
            let params = {
                regionId:this.regionId,
                level:this.level
            }
            await this.$store.dispatch("address/areaListFun",params);
            this.areaList['province_list'] = this.addressObj
            console.log('areaList',this.areaList)
        },
        computed: {
            ...mapGetters({
                addressObj:'address/getAddress'
            })
        },
    }
</script>
<style></style>