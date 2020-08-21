export default{
    path:'/address',
    meta: {},
    component: () => import('@/pages/address/'),
    children:[
        {
            path:'list',
            name:'list',
            component: (resolve) => require(['@/pages/address/list/'], resolve) // 地址列表
        },
        {
            path:'edit',
            name:'edit',
            component: (resolve) => require(['@/pages/address/edit/'], resolve) // 编辑地址
        },
        {
            path:'add',
            name:'add',
            component: (resolve) => require(['@/pages/address/add/'], resolve) // 新增地址
        }
    ]
}