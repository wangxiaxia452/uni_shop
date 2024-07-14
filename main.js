
// #ifndef VUE3
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

import { $http } from '@escook/request-miniprogram'

uni.$http = $http

$http.baseUrl = 'https://api-hmugo-web.itheima.net'

$http.beforeRequest = function (options) {
  uni.showLoading({
  	title:"正在加载中......"
  })
}

$http.afterRequest = function () {
  uni.hideLoading()
}

uni.$showMsg = function(title='数据加载失败！', duration = 1500) {
	uni.showToast({
		title,
		duration,
		icon: 'none'
	})
}


// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif