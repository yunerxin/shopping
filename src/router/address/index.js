export default{
    path:'/address',
    meta: {},
    component: () => import('@/pages/address/'),
    children:[
        {
            path:'list',
            name:'list',
            component: (resolve) => require(['@/pages/address/list/'], resolve) // 地址列表
        }
    ]
}