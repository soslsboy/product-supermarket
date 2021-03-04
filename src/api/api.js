import http from './http';
/**
 * 自定义提示，不使用请求封装的公共错误提示
 * custom: boolean
 */
export default {
    apiGet(params) {
        return http.request({
            url: '/api/getapi',
            method: 'get',
            params,
            custom: true
        })
    },
    apiPost(data) {
        return http.request({
            url: '/api/postapi',
            method: 'post',
            data
        })
    }
}