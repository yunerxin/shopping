import api from "@/api"
import { Toast, Dialog } from 'vant';
const state = {
    sid: localStorage.getItem('sid'),
    terminal: localStorage.getItem('terminal'),
    goodsDetailObj: {},
    productImgs: [],
    rsMapObj: {},
    addressObj:[]
}
const actions = {
    async productDetail({
        commit,
        state
    }, params) {
        let data = await api.get(`mall-api/m/product/detail?productId=${params.productId}&active=0`);
        if (data.state == 1) {
            commit('PRODUCT_DETAIL', {
                ...data
            })
        } else {
            Dialog.alert({
                message: data.msg,
                className: 'errorDialog',
                confirmButtonColor: 'red',
                overlayStyle: {
                    'background-color': 'rgba(0,0,0,.9)'
                }
            }).then(() => {
                this.$router.go(-1)
            });
        }
    },
    async rsMap({
        commit,
        state
    }, params) {
        let data = await api.get(`mall-api/m/product/specification-detail/get?sid=${state.sid}&productId=${params.productId}&active=8&insideCode=`);
        if (data.state == 1) {
            commit('RS_MAP', {
                ...data
            })
        } else {
            Toast(data.msg)
        }
    },
    async defaultAddress({
        commit,
        state
    }, params) {
        let data = await api.post(`order-api/m/mall/receipt-address/list`,{
            sid:state.sid,
            terminal:state.terminal
        });
        if (data.state == 1) {
            commit('DEFAULT_ADDRESS', {
                ...data
            })
        } else {
            Toast(data.msg)
        }
    },
}
const mutations = {
    PRODUCT_DETAIL: (state, data) => {
        state.productImgs = data.data.product.productPics || [];
        state.goodsDetailObj = data.data.product || {};
    },
    RS_MAP: (state, data) => {
        state.rsMapObj = data.data.rsMap || {};
    },
    DEFAULT_ADDRESS: (state,data)=>{
        state.addressObj = data.data.receiptAddressList.list || [];
    }
}
const getters = {
    productImgs(state) {
        return state.productImgs
    },
    goodsDetailObj(state) {
        return state.goodsDetailObj
    },
    rsMapObj(state) {
        return state.rsMapObj
    },
    addressObj(state){
        return state.addressObj
    }
}
export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}