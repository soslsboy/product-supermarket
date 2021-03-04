const Home = () => import(/* webpackChunkName: "userCenter" */'@/views/userCenter/Home');

export default [
  {
    path: '/',
    component: Home,
    redirect: '/home',
    name: 'Home',
    meta: { title: '' },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: { title: '首页' }
      }
    ]
  }
]
