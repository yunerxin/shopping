import Vue from 'vue'
import Vuex from 'vuex'
import orderForm from "@/pages/order/store"

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        orderForm
    }
})