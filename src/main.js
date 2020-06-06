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
        // config.headers.Token = '5113ac736346f048297cbc22355b0b2a';
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
        let sn = toolBox.GetQueryString("sn");
        if (sn) {
            toolBox.setCookie("sn", sn, 1);
        }

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
import wx from 'weixin-js-sdk'
//配置微信分享
const wxShare = (item) => {
    let params = {
        url: 'http://m.xkq.vxyz.cn/',
    };
    api('Base/get_jsjdk_config', params).then(data => {
        wxInit(data.js_jdk_config, item);
    })
};
Vue.prototype.$wxShare = wxShare;
const wxInit = (res, item) => {



    let links = item.links;//获取锚点之前的链接
    let title = item.title;
    let desc = item.desc;
    let imgUrl = item.imgUrl;

    wx.config({
        debug: false,
        appId: res.appId,
        timestamp: res.timestamp,
        nonceStr: res.nonceStr,
        signature: res.signature,
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage',],
    });
    wx.ready(function () {
        wx.onMenuShareAppMessage({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: links, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function () {
                this.$toast.success('分享成功');
            },
            cancel: function () {
                this.$toast.fail('分享失败');
            }
        });
        wx.onMenuShareTimeline({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: links, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function () {
                this.$toast.success('分享成功');
            },
            cancel: function () {
                this.$toast.fail('分享失败');
            }
        })
    });
};


Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {App},
    template: '<App/>'
});
