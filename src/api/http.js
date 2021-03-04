import axios from 'axios';
import router from '@/router';
import store from '@/store';
import { Message, Loading } from 'element-ui';

// 接口域名
let env = process.env.NODE_ENV, loading;
switch (env) {
	case 'development':
		window.config.API_HOST = window.config.API_HOST_TEST;
		break
	case 'release':
		window.config.API_HOST = window.config.API_HOST_RELEASE;
		break
}
const BASE_URL = window.config.API_HOST;

// 创建axios实例
const http = axios.create({
	baseURL: BASE_URL, // 设置接口地址
	timeout: 1000 * 30 // 设置超时时间
})
// POST请求头的设置
// http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
let isRefresh = false;
let requests = [];
// 请求拦截器
http.interceptors.request.use(
	config => {
		loading = Loading.service({
			lock: true,
			text: '努力载入中，请稍后...',
			background: 'rgba(255, 255, 255, .5)',
		})

		const nowTime = new Date().getTime();
		const oldTime = localStorage.getItem('oldtime');
		const expires = localStorage.getItem('expires');
		// 计算token是否过期
		if (Number(oldTime) + expires * 1000 <= nowTime) {
			// 判断是否正在刷新token
			if (!isRefresh) {
				isRefresh = true;
				// 请求刷新token，失败则跳转登录
				setTimeout(()=>{
					localStorage.setItem('token','321');
					localStorage.setItem('oldtime', nowTime)
					requests.forEach(i => i('321'))
					requests = [];
					isRefresh = false
					return http(config)
				},3000)
			} else {
				return new Promise((resolve) => {
					// 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
					requests.push((token) => {
						config.headers.Authorization = `Bearer ${token}`;
						resolve(http(config));
					});
				});
			}
			return Promise.reject();
		}

		// 获取token
		let authToken = getAccessToken();
		config.headers.Authorization = `Bearer ${authToken}`;
		
		return config
	},
	error => {
		return Promise.reject(error)
	}
)

// 响应拦截器
http.interceptors.response.use(
	response => {
		loading.close();
		// 自定义提示
		if (response.config.custom) {
			return Promise.resolve(response)
		}
		// 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据 否则的话抛出错误
		if (response.status === 200) {
			// 统一判断提示
			// Message({
			// 	duration: 2000,
			// 	message: response.data.message,
			// 	type: 'error'
			// })
			return Promise.resolve(response)
		} else {
			return Promise.reject(response)
		}
	},
	error => {
		loading.close();
		if (error.response) {
			switch (error.response.status) {
				case 401:
					/******* 处理token过期 刷新token *******/
					// 之前401错误请求
					// const originalRequest = error.config
					// 删除旧的token使用refresh_token 刷新token
					// store.dispatch('delToken');
					// store.dispatch('refreshToken').then(res=>{
					//     console.log(res);
					//     重新请求
					//     return http(originalRequest)
					// }).catch(err=>{
					//     Message.error('登陆过期请重新登陆！')
					//     store.dispatch('handleLogOut');
					//     router.replace('/Login')
					// })
					/************************** */
					break

				// 403 token过期 清除token并跳转登录页
				case 403:
					Message({
						duration: 2000,
						message: '登录过期，请重新登录',
						type: 'error'
					})
					// 清除token
					window.localStorage.removeItem('token')
					// 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
					setTimeout(() => {
						router.replace({
							path: '/Login',
							query: {
								redirect: router.currentRoute.fullPath
							}
						})
					}, 1000)
					break
				// 404请求不存在
				case 404:
					Message({
						duration: 2000,
						message: '请求不存在',
						type: 'error'
					})
					break
				// 其他错误，直接抛出错误提示
				default:
					Message({
						duration: 2000,
						message: error.response.data.message,
						type: 'error'
					})
			}
			return Promise.reject(error.response)
		} else if (error.message.includes('timeout')) {
			Message.error('请求超时，请稍后再试');
			return;
		}
	}
)
export default http

function getAccessToken(){
	return localStorage.getItem('token');
}