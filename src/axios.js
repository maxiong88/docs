import Vue from 'vue';
import Axios from 'axios';

// 清除 '' null undefined NaN数据
function H(e) {
    for (var t in e) 0 === e[t] || e[t] || delete e[t]
}

let test_dev = Boolean("localhost" === window.location.hostname || 
    "[::1]" === window.location.hostname || 
    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/))

let j = test_dev ? "development" : "production";

// 全局的 axios 默认值
// Axios.defaults.withCredentials = !0, 
// Axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
// // Axios.defaults.headers.common["MWeibo-Pwa"] = "1", 
Axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

// 自定义实例默认值
// 入住的参数是VUE实例
var q = function(e) {
    Axios.defaults.baseURL = "".concat(window.location.protocol, "//m.weibo.cn"), 
    "development" === j && (Axios.defaults.baseURL = "https://m.weibo.cn"), 
    /\.weibo.cn$/.test(window.location.hostname) && (Axios.defaults.baseURL = "".concat(window.location.protocol, "//").concat(window.location.hostname)),
     e.prototype.$http = Axios,
     e.http = Axios
     // 添加请求拦截器 
     Axios.interceptors.request.use(function(config) {
        var t = config.params, // get 获取参数
            n = config.data; // post 获取参数
        if ("get" === config.method) {
            if(t){
                H(t)
            }
        }
        console.log(config,'请求')
        return n && (H(n), config.data = JSON.stringify(n)), config
    }, 
        function(error) {
            // 对请求错误做些什么
            return Promise.reject(error)
        }
    ), 
    // 添加响应拦截器
    Axios.interceptors.response.use(function(response) {
        console.log(response,'相应1')
        if (response.status >= 400) {
            // 服务端报错
            let msg = "";
            return response.body && response.body.msg
                ?
                    msg = response.body.msg 
                : 
                    (msg = "接口请求失败", response.status && (msg += "(".concat(response.status, ")"))), 
            Vue.$emit("mvMsgbox", {
                type: "error",
                text: msg
            }), 
            response
        }
        var data = response.data;
        if (data) {
            // data返回 return code吗错误
        }
        
        return response;
    }, function(error) {
         // 对响应错误做点什么
         console.log(error,'相应2')
        return Promise.reject(error)
    })
};

Vue.use(q);