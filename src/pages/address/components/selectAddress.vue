<template>
    <div>
        <van-popup v-model="showPop" round position="bottom">
            <div class="content">
                <ul class="area-select">
                    <li v-for="(item, index) in areaMain" :key="index" :class="{'hasSelect':index === hasSelectIndex}"
                        @click="changeArea(index)"> {{ item }} </li>
                </ul>
                <ul class="address-select">
                    <div v-show="hasSelectIndex === 0">
                        <li v-for="(item, index) in province" :key="index"
                            :class="{'select-li-provice': index === pSelectLiIndex}" @click="selectProvince(index)">
                            {{ item.name }}</li>
                    </div>
                    <div v-show="hasSelectIndex === 1">
                        <li v-for="(item, index) in city" :key="index"
                            :class="{'select-li-provice': index === cSelectLiIndex}" @click="selectCity(index)">
                            {{ item.name }}</li>
                    </div>
                    <div v-show="hasSelectIndex === 2">
                        <li v-for="(item, index) in area" :key="index"
                            :class="{'select-li-provice': index === aSelectLiIndex}" @click="selectArea(index)">
                            {{ item.name }}</li>
                    </div>
                    <div v-show="hasSelectIndex === 3">
                        <li v-for="(item, index) in street" :key="index"
                            :class="{'select-li-provice': index === sSelectLiIndex}" @click="selectStreet(index)">
                            {{ item.name }}</li>
                    </div>
                </ul>
            </div>
        </van-popup>
    </div>
</template>
<script>
    import { Popup } from 'vant';
    import { mapGetters } from "vuex";
    export default {
        components: {
            [Popup.name]: Popup
        },
        props: {
            leftValue: { // 定位的离左边的距离
                type: Number,
                default: 600
            },
            topValue: { // 定位的离上边的距离
                type: Number,
                default: 100
            }
        },
        data() {
            return {
                showPop: true,
                regionId: 778937,
                level: 1,
                areaList: {},
                areaMain: ['省', '市', '区', '街道'],
                hasSelectIndex: 0, // 控制显示第几个
                province: [], // 循环的省份的值
                city: [], // 循环的城市的值
                area: [], // 循环的地区的值
                street: [], // 循环的街道的值
                pid: '', // 省份id
                cid: '', // 城市id
                aid: '', // 地区id
                sid: '', // 街道id
                pSelectLiIndex: '', // 选中的省的下标
                cSelectLiIndex: '', // 选中的城市的下标
                aSelectLiIndex: '', // 选中的地区的下标
                sSelectLiIndex: '', // 选中的街道的下标
                addressDetail: [], // 传给父组件的地址名称
                addressId: [] // 传给父组件的地址id
            }
        },
        // async created() {
        //     let params = {
        //         regionId: this.regionId,
        //         level: this.level
        //     }
        //     await this.$store.dispatch("address/areaListFun", params);
        //     this.areaList['province_list'] = this.addressObj
        //     console.log('areaList', this.areaList)
        // },
        mounted() { this.getAllProvince() },
        computed: {
            ...mapGetters({
                addressObj: 'address/getAddress'
            })
        },
        methods: {
            async getCity(cid) {
                let params = {
                    regionId: cid,
                    level: this.level
                }
                await this.$store.dispatch("address/areaListFun", params);
            },
            changeArea(index) { // 切换模块 
                switch (index) { // 判断是否上级有值，如果上级没值则不能切换 
                    case 1: if (!this.pid) { return }
                        break
                    case 2: if (!this.pid || !this.cid) { return }
                        break
                    case 3: if (!this.pid || !this.cid || !this.aid) { return }
                        break
                    default: break
                }
                this.hasSelectIndex = index
            },
            async getAllProvince() { // 获取省份列表 
                await this.getCity(this.regionId)
                // let params = {
                //     regionId: this.regionId,
                //     level: this.level
                // }
                // await this.$store.dispatch("address/areaListFun", params);
                this.province = this.addressObj
                console.log('_______',this.province)
                // getProvince().then((res) => { this.province = res.data }).catch(() => { })
            },
            // 选择省份执行的事件  
            selectProvince(index) {
                this.addressDetail = []
                this.addressId = []
                this.pid = this.province[index].id
                this.pSelectLiIndex = index
                this.cSelectLiIndex = ''
                this.aSelectLiIndex = ''
                this.sSelectLiIndex = ''
                this.addressId[0] = this.province[index].id
                this.addressDetail[0] = this.province[index].name
                // this.$emit('getAddressDetail', this.addressDetail, this.addressId)
                this.pSearchC()
            },
            // 省份查找城市  
            async pSearchC() {
                this.level = 2;
                await this.getCity(this.pid)
                // 获取省份下城市的列表 
                this.city = this.addressObj
                this.hasSelectIndex = 1
                if (this.city.length === 1) {
                    // 如果只有一条数据，则默认选中并执行下一次查找,其他位置同理 
                    this.hasSelectIndex = 2
                    this.cSelectLiIndex = 0
                    this.cid = this.city[0].id
                    this.addressId.splice(1, this.addressId.length - 1)
                    this.addressDetail.splice(1, this.addressId.length - 1)
                    this.addressId[1] = this.city[0].id
                    this.addressDetail[1] = this.city[0].name
                    // this.$emit('getAddressDetail', this.addressDetail, this.addressId)
                    this.cSearchA()
                }
            },
            // 选择市执行的事件  
            selectCity(index) {
                this.cid = this.city[index].id
                this.cSelectLiIndex = index
                this.aSelectLiIndex = ''
                this.sSelectLiIndex = ''
                this.addressId.splice(index, this.addressId.length - 1)
                this.addressId[1] = this.city[index].id
                this.addressDetail.splice(1, this.addressDetail.length - 1)
                this.addressDetail[1] = this.city[index].name
                // this.$emit('getAddressDetail', this.addressDetail, this.addressId)
                this.cSearchA()
            },
            // 市查找区  
            async cSearchA() {
                this.level = 3
                await this.getCity(this.cid)
                // 获取城市下地区的列表 
                this.area = this.addressObj
                this.hasSelectIndex = 2
                if (this.area.length === 1) {
                    this.hasSelectIndex = 3
                    this.aSelectLiIndex = 0
                    this.aid = this.area[0].id
                    this.addressId.splice(2, this.addressId.length - 1)
                    this.addressDetail.splice(2, this.addressId.length - 1)
                    this.addressId[2] = this.area[0].id
                    this.addressDetail[2] = this.area[0].name
                    // this.$emit('getAddressDetail', this.addressDetail, this.addressId)
                    this.aSearchS()
                }
            },
            // 选择区执行的事件  
            selectArea(index) {
                this.aid = this.area[index].id
                this.aSelectLiIndex = index
                this.sSelectLiIndex = ''
                this.addressId.splice(2, this.addressId.length - 1)
                this.addressId[2] = this.area[index].id
                this.addressDetail.splice(2, this.addressId.length - 1)
                this.addressDetail[2] = this.area[index].name
                // this.$emit('getAddressDetail', this.addressDetail, this.addressId)
                this.aSearchS()
            },
            // 区查找街道  
            async aSearchS() {
                this.level = 4
                await this.getCity(this.aid)
                // 获取地区下街道的列表 
                this.street = this.addressObj
                const obj = { id: '123456', name: '暂不选择' }
                this.street.unshift(obj)
                this.hasSelectIndex = 3
                if (this.street.length === 1) {
                    this.sSelectLiIndex = 0
                    this.sid = this.street[0].id
                    this.addressId.splice(3, this.addressId.length - 1)
                    this.addressDetail.splice(3, this.addressId.length - 1)
                    this.addressId[3] = this.street[0].id
                    this.addressDetail[3] = this.street[0].name
                    // this.$emit('getAddressDetail', this.addressDetail, this.addressId)
                }
            },
            // 选择区执行的事件  
            selectStreet(index) {
                this.sid = this.street[index].id
                this.sSelectLiIndex = index
                this.addressId[3] = this.street[index].id
                this.addressDetail[3] = this.street[index].name
                let completeAddress = this.addressDetail.join(' '),
                idObj = {
                    cityId:this.addressId[0],
                    regionId:this.addressId[1],
                    blockId:this.addressId[2],
                    townId:this.addressId[3]
                }
                this.$emit('getAddressDetail', completeAddress, idObj)
            }
        },
        watch: {
            isEmpty: function (newV, oldV) {
                if (newV) {
                    this.pSelectLiIndex = ''
                    this.cSelectLiIndex = ''
                    this.aSelectLiIndex = ''
                    this.sSelectLiIndex = ''
                    this.pid = ''
                    this.cid = ''
                    this.aid = ''
                    this.sid = ''
                    this.hasSelectIndex = 0
                    this.addressId = []
                    // this.$emit('getAddressDetail', this.addressDetail, this.addressId) // 此时，父组件需通过addressId的长度是否为0来判断是否将传递过来的isEmpty设置为false ，重置选择框的值
                }
            }
        },
    }
</script>
<style scoped lang="scss">
    .content {
        .area-select {
            width: 100%;
            height: 30px;
            margin: 0;
            padding: 0;
            border: 1px solid #CCCCCC;

            li {
                list-style: none;
                float: left;
                height: 28px;
                line-height: 28px;
                text-align: center;
                background: #f0f0f0;
                width: 25%;
                cursor: pointer;
            }

            .hasSelect {
                background: #FFFFFF;
            }
        }

        .address-select {
            width: 100%;
            margin: 0;
            padding: 5px 10px;
            overflow-y: scroll;
            overflow-x: scroll;
            height: 320px;
            border: 1px solid #CCCCCC;
            border-top: 0;
            box-sizing: border-box;

            li {
                height: 40px;
                padding: 10px 5px;
                line-height: 20px;
                cursor: pointer;
            }

            .select-li-provice {
                color: #1470cc;
                cursor: default;
            }

            li:hover {
                color: #968CFF;
            }
        }
    }
</style>