import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import NProgress from 'nprogress';
const Login = () => import(/* webpackChunkName: "userCenter" */'@/views/userCenter/Login');
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
    component: Login
  },
  ...userCenter,
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  // 某些拦截操作，是否登录权限等...
  const token = window.localStorage.getItem('token')

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
