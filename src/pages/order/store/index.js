import api from "@/api"
import { Toast } from 'vant';
const state = {
    sid: localStorage.getItem('sid'),
    calculateObj: {},
    shopsArray: [],
    defalutInfo:{},
    addressList:[],
    selectedAddressId:''
}
const actions = {
    async calculateFun({
        commit,
        state
    }, params) {
        let data = await api.post2(`order-api/m/mall/price/calculate?sid=${state.sid}`, 
        {
            ...params,
            sid:state.sid
        }
        );
        if (data.state == 1) {
            commit('CALCULATE_PRICE', {
                ...data
            })
        } else {
            Toast(data.msg)
        }
    },
    async initFun({ commit, state }, params) {
        let data = await api.post(`order-api/m/mall/init`, {
            ...params,
            sid:state.sid
        });
        if (data.state == 1) {
            commit('INIT_ORDER', {
                ...data
            })
        } else {
            Toast(data.msg)
        }
    },
    async addressList({ commit, state }) {
        let data = await api.post(`order-api/m/mall/receipt-address/list?sid=${state.sid}`)
        if (data.state == 1) {
            commit('ADDRESS_LIST', {
                ...data
            })
        } else {
            Toast(data.msg)
        }
    }
}
const mutations = {
    CALCULATE_PRICE: (state, data) => {
        state.calculateObj = data.data || {};
    },
    INIT_ORDER: (state, data) => {
        if (data.data.shops && data.data.shops.length > 0) {
            data.data.shops.filter(val => {
                state.calculateObj.shopOverallPrice.filter(item => {
                    if (item.shopId == val.shopsId) {
                        val.postage = item.postage;
                        val.singleShopSumPrice = item.singleShopSumPrice
                    }
                })
            })
        }
        state.shopsArray = data.data.shops || []
    },
    ADDRESS_LIST: (state, data) => {
        if (data.data.receiptAddressList.list && data.data.receiptAddressList.list.length > 0) {
            var keyMaps = {
                "receiptName": "name",
                "receiptPhone": "tel",
                "completeAddress": "address",
            };

            data.data.receiptAddressList.list.map((item) => {
                _.forEach(keyMaps, (newKey, oldKey) => {
                    item[newKey] = item[oldKey];
                    delete item[oldKey];
                });
                return item;
            });
        }
        state.addressList = data.data.receiptAddressList.list || [];
        state.selectedAddressId = _.find(state.addressList, function (item) { return item.defalutAddress == 1; }).id;
        state.defalutInfo = _.find(state.addressList, function (item) { return item.defalutAddress == 1; });
    }
}
const getters = {
    calculate(state) {
        return state.calculateObj
    },
    shopsArray(state) {
        return state.shopsArray
    },
    defalutInfo(state){
        return state.defalutInfo
    },
    addressList(state){
        return state.addressList
    },
    selectedAddressId(state){
        return state.selectedAddressId
    }
}
export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}