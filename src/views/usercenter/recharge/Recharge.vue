<template>
    <div>
        <div class="default-window">
            <span class="font-gary font-13">请选择充值金额</span>
        </div>
        <div class="recharge-window">
            <div v-for="(item,index) in rechargeList" :key="index" @click="chooseItem=item.recharge_pro_id"
                 class="recharge-item">
                <div class="recharge" :class="{'active':chooseItem==item.recharge_pro_id}">
                    <img v-if="chooseItem==item.recharge_pro_id" src="@/assets/temp/xuanzhong.png" class="choose"
                         alt="">
                    <div><span class="font-red">￥</span><span class="price">{{item.price}}</span></div>
                    <!-- <div><span>{{item.recharge_name}}</span></div> -->
                </div>
            </div>
        </div>
        <div class=""></div>
        <div class="default-window">
            <van-button :loading="btnStatus" @click="create" round block type="danger">立即充值</van-button>
        </div>
        <div class="default-window text-center">
            <router-link :to="{name:'RechargeLog'}"><span>查看充值记录</span></router-link>
        </div>

        <van-divider>充值说明</van-divider>
        <div class="default-window font-13">
            <div><span>1.充值2000元升级为经销商AA，享受8折优惠。</span></div>
            <div><span>2.充值3000元升级为经销商S，享受7.5折优惠。</span></div>
            <div><span>3.充值5000元升级为经销商SHG，享受7折优惠。</span></div>
            <div><span>4.充值10000元升级为经销商4A，享受6折优惠。</span></div>
            <div><span>5.充值20000+升级为Commune Beans. 肯木咖啡门店CB+1，享受5.5折扣优惠。</span></div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "Recharge",
        data() {
            return {
                chooseItem: '',
                rechargeList: [],
                btnStatus: false,
            }
        },
        mounted() {
            this.loadRecharge();
        },
        methods: {
            //加载充值列表
            loadRecharge() {
                this.$api('Recharge/lists').then(data => {
                    console.log(data);
                    this.rechargeList = data.recharge_pro_list;
                });
            },
            //创建充值订单
            create() {
                if (this.chooseItem == '') {
                    this.$notify('请选择充值面额');
                    return;
                }
                this.$toast.loading('支付中');
                this.btnStatus = true;
                let params = {
                    recharge_pro_id: this.chooseItem
                };
                this.$api('Recharge/create', params).then(data => {
                    let params2 = {
                        no: data.no
                    };
                    this.$api('Pay/recharge_pay', params2).then(res => {
                        this.postData(res.response);
                    })
                })
            },
            /**
             * @method:ajax请求数据方法
             */
            postData: function (params) {
                let vm = this;

                let data = JSON.parse(params);
                vm.weixinPay(data);
            },
            /**
             * @method :微信支付方法
             * @param data
             */
            weixinPay: function (data) {
                let vm = this;
                if (typeof WeixinJSBridge == "undefined") {
                    //微信浏览器内置对象。参考微信官方文档
                    if (document.addEventListener) {
                        document.addEventListener(
                            "WeixinJSBridgeReady",
                            vm.onBridgeReady(data),
                            false
                        );
                    } else if (document.attachEvent) {
                        document.attachEvent(
                            "WeixinJSBridgeReady",
                            vm.onBridgeReady(data)
                        );
                        document.attachEvent(
                            "onWeixinJSBridgeReady",
                            vm.onBridgeReady(data)
                        );
                    }
                } else {
                    vm.onBridgeReady(data);
                }
            },
            /**
             * @method 支付费用方法
             * @param data:后台返回的支付对象,(详情微信公众号支付API中H5提交支付);
             */
            onBridgeReady: function (data) {
                let vm = this;
                WeixinJSBridge.invoke(
                    "getBrandWCPayRequest",
                    {
                        appId: data.appId, //公众号名称，由商户传入
                        timeStamp: data.timeStamp, //时间戳，自1970年以来的秒数
                        nonceStr: data.nonceStr, //随机串
                        package: data.package,
                        signType: data.signType, //微信签名方式：
                        paySign: data.paySign //微信签名
                    },
                    function (res) {
                        // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                        if (res.err_msg == "get_brand_wcpay_request:ok") {
                            vm.$toast.success("支付成功");
                            vm.$router.push({name: "Success"});
                        } else {
                            vm.$notify("支付失败,订单已创建");
                            vm.$router.push({name: "UserCenter"});
                        }
                    }
                );
            },
        }
    }
</script>

<style scoped>
    .price {
        color: #ee0a24;
        font-size: 30px;
        font-weight: bold;
    }

    .choose {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 20px;
        display: block
    }

    .active {
        border: 2px solid #ee0a24 !important;
    }

    .recharge-window {
        display: flex;
        flex-wrap: wrap;
        box-sizing: border-box;
        padding: 5px;
    }

    .recharge-item {
        padding: 5px;
        width: 50%;
        box-sizing: border-box
    }

    .recharge {
        padding: 20px 10px;
        border: 2px solid #EEEEEE;
        position: relative;
        text-align: center;
    }
</style>
