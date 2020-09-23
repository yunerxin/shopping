import Vue from 'vue'
import Vuex from 'vuex'
import orderForm from "@/pages/order/store"
import address from "@/pages/address/store"
import goods from "@/pages/goods/store"

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        orderForm,
        address,
        goods
    }
})