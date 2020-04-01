<template>
    <div style="background-color: #FFFFFF">
        <div style="padding: 15px 10px 0 10px;" class="text-right">
            <van-icon style="margin-right: 10px" @click="openPage('SystemMessage')" size="25" name="envelop-o" :info="unread==0?'':unread"/>
            <span> </span>
            <van-icon @click="openPage('Setting')" size="25" name="setting-o"/>
        </div>
        <!--会员资料卡片-->
        <div class="vip-window" style="background-image: url(http://xkq.vxyz.cn/Uploads/1/uc_bg.jpg);background-size: cover;background-position: center center">
            <div class="discount-tip">
                <span>星卡其会员中心</span>
            </div>
            <div class="head-window table">
                <div class="table-cell head-left">
                    <img :src="userData.headimgurl" class="image head">
                </div>
                <div class="table-cell head-middle">
                    <div><span class="nickname">{{userData.nickname}}</span></div>
                    <div><span class="font-13">{{userData.invest}}</span></div>
                </div>
                <div class="table-cell head-right">
                    <span class="level">{{userData.level_text}}</span>
                </div>
            </div>
            <div class="default-window text-center">
                <van-row gutter="15">
                    <van-col @click="checkIntegral(item.integral_type)" v-for="(item,index) in wallet" :key="index" span="12">{{item.integral_type_name}}：<span
                        style="color: goldenrod;text-shadow: 0px 0px 2px #8e1414;">{{item.num}}</span></van-col>
                </van-row>
            </div>
        </div>

        <div>
            <div class="table" style="padding: 10px 20px 0 20px">
                <div class="table-cell">
                    <span style="font-size: 20px">我的订单</span>
                </div>
                <div class="table-cell text-right font-gary">
                    <span @click="openPage('OrderList',{type:'all'})">全部</span>
                    <van-icon name="arrow"/>
                </div>
            </div>
            <van-grid icon-size="35" :border="false" :column-num="5">
                <van-grid-item :info="orderNumber[0]==0?'':orderNumber[0]" :to="{name:'OrderList',params:{type:'0'}}" icon="pending-payment"
                               text="未付款"/>
                <van-grid-item :info="orderNumber[1]==0?'':orderNumber[1]" :to="{name:'OrderList',params:{type:'1'}}" icon="paid"
                               text="待发货"/>
                <van-grid-item :info="orderNumber[2]==0?'':orderNumber[2]" :to="{name:'OrderList',params:{type:'2'}}" icon="logistics"
                               text="待收货"/>
                <van-grid-item :info="orderNumber[3]==0?'':orderNumber[3]" :to="{name:'OrderList',params:{type:'3'}}" icon="certificate"
                               text="已完成"/>
                <van-grid-item :info="orderNumber[4]+orderNumber[5]==0?'':orderNumber[4]+orderNumber[5]" :to="{name:'OrderList',params:{type:'other'}}"
                               icon="orders-o" text="其他"/>
            </van-grid>
        </div>

        <div>
            <div style="padding: 10px 20px 0 20px">
                <span style="font-size: 20px">我的应用</span>
            </div>
            <van-grid icon-size="30" :border="false" :column-num="4">
                <van-grid-item to="/AddressList" icon="location-o" text="地址管理"/>
                <van-grid-item to="/Poster" icon="photo-o" text="推广海报"/>
                <van-grid-item to="/UserData" icon="manager-o" text="个人资料"/>
                <van-grid-item to="/Wallet" icon="paid" text="我的钱包"/>
                <van-grid-item to="/MyTeam" icon="cluster-o" text="我的团队"/>
            </van-grid>
        </div>

        <shop-tab :choose-item="3"></shop-tab>
    </div>
</template>

<script>
    import shopTab from "../../components/shopTab";

    export default {
        name: "UserCenter",
        data() {
            return {
                userData: {},
                wallet: [],
                unread: 0,
                orderNumber: []
            }
        },
        components: {
            shopTab: shopTab
        },
        mounted() {
            this.loadUserCenter();
        },
        methods: {
            //查看积分详情
            checkIntegral(type){
                this.$router.push({name:'IntegralRecord',params:{type:type}});
            },
            openPage(urlName, urlParams) {
                this.$router.push({name: urlName, params: urlParams});
            },
            //加载个人资料
            loadUserCenter() {
                this.$api('UserCenter/index').then(data => {
                    console.log(data);
                    this.userData = data.user_info;
                    this.wallet = data.integral_wallet;
                    this.unread = data.unread_num;
                    this.orderNumber = data.order_num;
                });
            },
        }
    }
</script>

<style scoped>
    html {
        background-color: #FFFFFF;
    }

    .vip-window {
        margin: 10px;
        padding: 10px;
        border-radius: 8px;
        background-color: #222222;
        /*box-shadow: 2px 2px 5px #333333;*/
        color: #ffefcc;
    }

    .discount-tip {
        text-align: right;
        font-size: 12px;
    }

    .head-window {
        padding: 10px;
    }

    .head-left {
        width: 60px;
    }

    .head {
        border-radius: 100%;
    }

    .head-middle {
        padding: 0 10px;
    }

    .nickname {
        font-size: 17px;
    }

    .head-right {
        width: 100px;
        text-align: right;
    }

    .level {
        font-size: 22px;
        color: goldenrod;
        text-shadow: 0px 0px 2px #8e1414;
    }

    .value-window {
        color: #969799
    }

</style>
