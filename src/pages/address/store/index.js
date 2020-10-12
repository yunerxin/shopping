import api from "@/api"
import { Toast } from 'vant';
const state = {
    sid: localStorage.getItem('sid'),
    terminal:localStorage.getItem('terminal'),
    areaObj:{}
}
const actions = {
    async areaListFun({
        commit,
        state
    }, params) {
        let data = await api.get(`common-api/m/region/data-region/get`, params);
        commit('AREA_LIST', {
            data
        })
    },
    async saveAddressFun({
        commit,
        state
    }, params) {
        let data = await api.post2(`order-api/m/mall/v1/receipt-address/save?sid=${state.sid}`, {
            ...params,
            sid:state.sid,
            terminal:state.terminal
        });
        console.log('data',data)
        if(data.state==1){
            Toast('地址保存成功')
        }else{
            Toast(data.mag)
        }
    },
}
const mutations = {
    AREA_LIST: (state, data) => {
        state.areaObj = data.data || []
    },
}
const getters = {
    getAddress(state) {
        return state.areaObj
    }
}
export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}