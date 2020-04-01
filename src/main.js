// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import router from './router'

import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);

import store from './store'

import {Notify} from 'vant';

//引入工具集
import * as toolBox from '@/common/util';

Vue.prototype.$toolBox = toolBox;

import axios from "axios";
Vue.prototype.$axios = axios;

//配置asiox的公用接口
const api = async (location, params = null) => {
    return await new Promise((resolve, reject) => {

        axios({
            url: `http://xkq.vxyz.cn/api/${location}`,
            method: 'post',
            data: params,
            headers: {
                // 'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(res => {
            // resolve(res.data);
            let data = res.data;
            if (data.status == 10001) {
                Notify('您的登录信息有误，请重新登录');
            } else if (data.status == 0) {
                Notify(data.msg);
            } else {
                resolve(data.data);
            }
        }).catch(fail => {
            alert(fail);
        });
    })
};


Vue.prototype.$api = api;

//asiox拦截器，拦截后添加token
axios.interceptors.request.use(
    config => {
        const token = toolBox.getCookie('token');
        // config.headers.Token = '6b12a5ab402b2bf2d6e90256472f554c';
        if (token) {
            config.headers.Token = token;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

//每次跳转路由时检查是否登陆


router.beforeEach((to, from, next) => {

    if (!store.state.isLoginLing && to.name != 'Author') {
        // 第一次进入项目
        toolBox.setCookie('beforeLoginUrl', to.path, 0.1); // 保存用户进入的url
        next('/Author');
        return false;
    }
    /*if (store.state.celebrity_lv == 0 && store.state.isLoginLing) {
        if (to.name == 'UserCenter' || to.name == 'AdoptGoods' || to.name == 'GoodsRelease' || to.name == 'ProductDetail' || to.name == 'ArticleDetail') {
            next('/RealNameAuthentication');
            return false;
        }

    }*/
    next();
});


Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {App},
    template: '<App/>'
});
