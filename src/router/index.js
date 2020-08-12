import Vue from 'vue'
import Router from 'vue-router'
import Goods from "./goods"
import Order from "./order"

Vue.use(Router)

export default new Router({
  routes: [
    Goods,
    Order
  ]
})
