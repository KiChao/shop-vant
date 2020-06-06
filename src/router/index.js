import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index/Index' //首页

import CateGory from '@/views/category/CateGory' //物品分类

import ShopCart from '@/views/shopCart/ShopCart' //购物车
import ShopCartSettlement from '@/views/shopCart/Sattlement' //购物车

import UserCenter from "@/views/usercenter/UserCenter" //个人中心

import AddressList from "@/views/usercenter/address/AddressList" //收货地址列表
import AddressEdit from "@/views/usercenter/address/AddressEdit" // 收货地址编辑

import OrderList from "@/views/usercenter/order/OrderList"; //订单列表
import OrderDetail from "@/views/usercenter/order/OrderDetail"; // 订单详情

import ProductList from "@/views/product/ProductList"; //商品列表
import ProductDetail from "@/views/product/ProductDetail"; //商品详情
import Settlement from "@/views/product/Settlement";//单个商品结算页面

import Success from "@/views/pay/Success";//支付成功回调

import SystemMessage from "@/views/usercenter/systemMessage/SystemMessage"; //系统消息列表

import Setting from "@/views/usercenter/setting/Setting";//系统设置列表
import AboutUs from "@/views/usercenter/setting/AboutUs";//关于我们
import UserBook from "@/views/usercenter/setting/UserBook";//用户协议
import Complaint from "@/views/usercenter/setting/Complaint";//投诉建议

import Poster from '@/views/usercenter/poster/Poster'//推广海报

import Search from '@/views/search/Search'//搜索页面

import Video from '@/views/video/Video'//媒体列表
import VideoDetail from '@/views/video/detail/Detail'//媒体详情

import UserData from '@/views/usercenter/data/UserData'//个人资料
import Wallet from '@/views/usercenter/wallet/Wallet'//个人钱包
import MyTeam from '@/views/usercenter/myTeam/MyTeam'//我的团队
import IntegralRecord from '@/views/usercenter/integralRecord/integralRecord'//积分记录


import Author from '@/views/public/Author'//微信登录授权页面
import Recharge from '@/views/usercenter/recharge/Recharge'//积分充值
import RechargeLog from '@/views/usercenter/recharge/RechargeLog'//积分充值记录


import NoticeList from '@/views/Notice/List'//公告列表
import NoticeDetail from '@/views/Notice/Detail'//公告详情

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Index',
            component: Index
        },
        {
            path: '/Category',
            name: 'CateGory',
            component: CateGory
        },
        {
            path: '/ShopCart',
            name: 'ShopCart',
            component: ShopCart
        },
        {
            path: '/ShopCartSettlement',
            name: 'ShopCartSettlement',
            component: ShopCartSettlement
        },
        {
            path: '/UserCenter',
            name: 'UserCenter',
            component: UserCenter
        },
        {
            path: '/AddressList/:type?',
            name: 'AddressList',
            component: AddressList
        },
        {
            path: '/AddressEdit',
            name: 'AddressEdit',
            component: AddressEdit
        },
        {
            path: '/OrderList',
            name: 'OrderList',
            component: OrderList
        },
        {
            path: '/OrderDetail/:loadId',
            name: 'OrderDetail',
            component: OrderDetail
        },
        {
            path: '/ProductList/:loadId/:type',
            name: 'ProductList',
            component: ProductList
        },
        {
            path: '/ProductDetail/:loadId',
            name: 'ProductDetail',
            component: ProductDetail
        },
        {
            path: '/Settlement',
            name: 'Settlement',
            component: Settlement
        },
        {
            path: '/Success',
            name: 'Success',
            component: Success
        },
        {
            path: '/SystemMessage',
            name: 'SystemMessage',
            component: SystemMessage
        },
        {
            path: '/Setting',
            name: 'Setting',
            component: Setting
        },
        {
            path: '/AboutUs',
            name: 'AboutUs',
            component: AboutUs
        },
        {
            path: '/UserBook',
            name: 'UserBook',
            component: UserBook
        },
        {
            path: '/Complaint',
            name: 'Complaint',
            component: Complaint
        },
        {
            path: '/Poster',
            name: 'Poster',
            component: Poster
        }, {
            path: '/Search',
            name: 'Search',
            component: Search
        },
        {
            path: '/Video',
            name: 'Video',
            component: Video
        },
        {
            path: '/VideoDetail/:loadId',
            name: 'VideoDetail',
            component: VideoDetail
        },
        {
            path: '/UserData',
            name: 'UserData',
            component: UserData
        },
        {
            path: '/Wallet',
            name: 'Wallet',
            component: Wallet
        },
        {
            path: '/Author',
            name: 'Author',
            component: Author
        },{
            path: '/MyTeam',
            name: 'MyTeam',
            component: MyTeam
        },{
            path: '/Recharge',
            name: 'Recharge',
            component: Recharge
        },{
            path: '/NoticeList',
            name: 'NoticeList',
            component: NoticeList
        },{
            path: '/NoticeDetail/:loadId',
            name: 'NoticeDetail',
            component: NoticeDetail
        },{
            path: '/IntegralRecord/:type',
            name: 'IntegralRecord',
            component: IntegralRecord
        },{
            path: '/RechargeLog',
            name: 'RechargeLog',
            component: RechargeLog
        },
    ]
})
