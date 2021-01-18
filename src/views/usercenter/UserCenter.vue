<template>
    <div style="background-color: #FFFFFF">
        <div class="big-window">
            <div style="padding: 15px 10px 0 10px;" class="text-right">
                <van-icon style="margin-right: 10px" @click="openPage('SystemMessage')" size="25" name="envelop-o"
                    :info="unread==0?'':unread" />
                <span> </span>
                <van-icon @click="openPage('Setting')" size="25" name="setting-o" />
            </div>
            <!--会员资料卡片-->
            <div>
                <div style="position: relative;color: #2d3750;" class="flex default-window">
                    <div class="head-window">
                        <img :src="userData.headimgurl" class="head">
                    </div>
                    <div class="name-window">
                        <div class="name">{{userData.nickname}}</div>
                        <div>用户ID：{{userData.user_id}}</div>
                        <div>注册时间：{{userData.time}}</div>
                    </div>
                    <div>
                        <div class="level">{{userData.level_text}}</div>
                    </div>
                </div>
                <div class="flex default-window text-center">
                    <div @click="checkIntegral(item.integral_type)" v-for="(item,index) in wallet" :key="index" style="flex: 1;">
                        <div>{{item.num}}</div>
                        <div>{{item.integral_type_name}}</div>
                    </div>
                </div>
                <div class="" style="padding: 10px 30px 0 30px;">
                    <div class="card-window">
                        <div class="flex">
                            <div>
                                <img src="@/assets/temp/card-logo.png" class="card-logo">
                            </div>
                            <div class="text-center" style="flex: 1;">
                                <span class="card-text">
                                    开通经销商立享特权
                                </span>
                            </div>
                            <div>
                                <img src="@/assets/temp/card-btn.png" class="card-btn" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>




        <div>
            <div class="table" style="padding: 10px 20px 0 20px">
                <div class="table-cell">
                    <span style="font-size: 20px">我的订单</span>
                </div>
                <div class="table-cell text-right font-gary">
                    <span @click="openPage('OrderList',{type:'all'})">全部</span>
                    <van-icon name="arrow" />
                </div>
            </div>
            <van-grid icon-size="35" :border="false" :column-num="5">
                <van-grid-item :info="orderNumber[0]==0?'':orderNumber[0]" :to="{name:'OrderList',params:{type:'0'}}"
                    icon="pending-payment" text="未付款" />
                <van-grid-item :info="orderNumber[1]==0?'':orderNumber[1]" :to="{name:'OrderList',params:{type:'1'}}"
                    icon="paid" text="待发货" />
                <van-grid-item :info="orderNumber[2]==0?'':orderNumber[2]" :to="{name:'OrderList',params:{type:'2'}}"
                    icon="logistics" text="待收货" />
                <van-grid-item :info="orderNumber[3]==0?'':orderNumber[3]" :to="{name:'OrderList',params:{type:'3'}}"
                    icon="certificate" text="已完成" />
                <van-grid-item :info="orderNumber[4]+orderNumber[5]==0?'':orderNumber[4]+orderNumber[5]" :to="{name:'OrderList',params:{type:'other'}}"
                    icon="orders-o" text="其他" />
            </van-grid>
        </div>

        <div>
            <div style="padding: 10px 20px 0 20px">
                <span style="font-size: 20px">我的应用</span>
            </div>
            <van-grid icon-size="30" :border="false" :column-num="4">
                <van-grid-item to="/AddressList" icon="location-o" text="地址管理" />
                <van-grid-item to="/Poster" icon="photo-o" text="推广海报" />
                <van-grid-item to="/UserData" icon="manager-o" text="个人资料" />
                <van-grid-item to="/Wallet" icon="paid" text="我的钱包" />
                <van-grid-item to="/MyTeam" icon="cluster-o" text="我的团队" />
                <van-grid-item to="/Recharge" icon="cash-on-deliver" text="充值" />
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
            checkIntegral(type) {
                this.$router.push({
                    name: 'IntegralRecord',
                    params: {
                        type: type
                    }
                });
            },
            openPage(urlName, urlParams) {
                this.$router.push({
                    name: urlName,
                    params: urlParams
                });
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

    .big-window {
        background-image: url(../../assets/temp/usercenter-bg.jpg);
        border-bottom-left-radius: 60% 15%;
        border-bottom-right-radius: 60% 15%;
        overflow: hidden;
    }

    .card-window {
        background-image: linear-gradient(to right, #2d3750, #46577e);
        padding: 15px;
        border-radius: 20px 20px 0 0;

    }

    .card-logo {
        width: 50px;
        height: 50px;
        display: block;
        /* margin-left: -25px; */
    }

    .card-btn {
        width: 70px;
        height: 25.7px;
        display: block;
    }

    .card-text {
        background: linear-gradient(#f9e0a1, #ddb677);
        -webkit-background-clip: text;
        color: transparent;
        font-size: 17px;
        font-weight: bold;
    }

    .flex {
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
    }

    .head-window {
        height: 60px;
        height: 60px;
    }

    .head {
        height: 60px;
        width: 60px;
        border-radius: 50%;
        display: block;
    }

    .name-window {
        padding: 0 15px;
        flex: 1;
        font-size: 13px;

    }

    .name {
        font-size: 17px;
        font-weight: bold;
    }

    .level {
        padding: 5px 20px;
        background-color: #2d3750;
        color: #FFFFFF;
        border-top-left-radius: 40px;
        border-bottom-left-radius: 40px;
        margin-right: -10px;
    }
</style>
