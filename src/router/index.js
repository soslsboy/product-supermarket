import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import NProgress from 'nprogress';
import userCenter from './modules/userCenter';

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () => import(/* webpackChunkName: "login" */'@/views/Login'),
    meta: { title: '登录' }
  },
  {
    path: "/register",
    name: "Register",
    component: () => import(/* webpackChunkName: "register" */'@/views/Register'),
    meta: { title: '注册' }
  },
  {
    path: "/findPassword",
    name: "FindPassword",
    component: () => import(/* webpackChunkName: "findPassword" */'@/views/findPassword'),
    meta: { title: '找回密码' }
  },
  ...userCenter,
  {
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */'@/views/errorPage/404')
  },
  { path: '*', redirect: '/404' }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  // 某些拦截操作，是否登录权限等...
  const token = window.localStorage.getItem('token')
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  // 不需要校验的路由直接跳转
  if (!to.meta.requireAuth) {
    next()
    return
  }
  if (token && to.name !== 'Login') {
    // 已登录且要跳转的页面不是登录页
    next() // 可以直接跳转
  } else if (token && to.name === 'Login') {
    // 已登录且要跳转的页面是登录页
    next('/home') // 直接跳转到首页
  } else if (!token && to.name !== 'Login') {
    // 未登录且要跳转的页面不是登录页
    next('/login') // 跳转到登录页
  } else {
    next()
  }
})

router.afterEach(to => {
  NProgress.done();
  window.scrollTo(0, 0)
})

export default router;
