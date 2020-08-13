import Vue from 'vue'
import Router from 'vue-router'
import Goods from "./goods"
import Order from "./order"
import Address from "./address"

Vue.use(Router)

export default new Router({
  routes: [
    Goods,
    Order,
    Address
  ]
})
