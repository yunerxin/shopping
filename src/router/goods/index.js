export default{
    path:'/goods',
    meta: {},
    component: () => import('@/pages/goods/'),
    children:[
        {
            path:'search',
            name:'search',
            component: (resolve) => require(['@/pages/goods/search/'], resolve) // 商品搜索
        },
        {
            path:'list',
            name:'list',
            component: (resolve) => require(['@/pages/goods/list/'], resolve) // 商品列表
        },
        {
            path:'details',
            name:'details',
            component: (resolve) => require(['@/pages/goods/details/'], resolve) // 商品详情
        }
    ]
}