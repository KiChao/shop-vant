import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex);

export default new vuex.Store({
    state: {
        name: '',
        age: '',

        //微信公众号参数
        appid: '',

        userLevel: 0,

        //接口请求参数token
        token: '',

        //是否在登陆中
        isLoginLing: false,
        celebrity_lv: 0,
        identity_lv: 0,
        recordingAddress: false,
        subscribe: 0,

        //分享数据sn
        sn: '',

        //收货地址选择
        chooseAddress: {
            name: '',
            phone: '',
            address: '',
            address_id: 0,
            loadDefault: true,
            pick_type: 0,
            load_tpl: false,
            isChoose: false,
        },
        //自提地址
        pickAddress: '',

        //分类临时储存
        cateList: [],
        cateId: 0,

        //订单储存时候的记录
        productSattlement:{},
        numSattlement:0,
        skuInfo:{},

        //购物车资讯
        cartInfo:{},

        //取货方式
        pickType:'1'
    }
})
