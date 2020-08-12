export default{
    path:'/order',
    meta: {},
    component: () => import('@/pages/order/'),
    children:[
        {
            path:'form',
            name:'form',
            component: (resolve) => require(['@/pages/order/form/'], resolve) // 提交订单
        }
    ]
}