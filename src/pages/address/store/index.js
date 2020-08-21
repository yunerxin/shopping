import api from "@/api"
import { Toast } from 'vant';
const state = {
    sid: localStorage.getItem('sid'),
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
}
const mutations = {
    AREA_LIST: (state, data) => {
        console.log('????????????????',data.data);
        data.data.filter((item,i)=>{
            state.areaObj[item.id] = item.name
        })

    }
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