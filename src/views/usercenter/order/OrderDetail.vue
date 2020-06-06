<template>
    <div>
        <van-notice-bar wrapable :scrollable="false" left-icon="volume-o" mode="closeable">
            温馨提示：为了您的财产安全，不要向陌生人透露您的支付信息以及商品物流信息
        </van-notice-bar>
        <div class="status-window">
            <div style="width: 100%;height: 100px"></div>
        </div>
        <div style="padding: 10px;margin-top: -110px">
            <div class="info-window white-bg">
                <div class="address-window  table">
                    <div class="table-cell address-left">
                        <van-icon class="block" size="25" name="location-o"/>
                    </div>
                    <div class="table-cell">
                        <div><span>{{order.receiver_name}}</span><span style="padding-left: 10px">{{order.receiver_phone}}</span>
                        </div>
                        <div><span class="font-gary">{{order.receiver_address}}</span></div>
                    </div>
                </div>
                <div class="white-bg pay-window">
                    <div class="table">
                        <div class="table-cell address-left">
                            <van-icon class="block" size="25" name="label-o"/>
                        </div>
                        <div class="table-cell">
                            <div><span>订单编号：{{order.order_no}}</span></div>
                        </div>
                    </div>
                </div>
                <div class="white-bg pay-window">
                    <div class="table">
                        <div class="table-cell address-left">
                            <van-icon class="block" size="25" name="free-postage"/>
                        </div>
                        <div class="table-cell">
                            <div><span>快递公司：{{order.express_id}}</span></div>
                            <div><span>快递运单：{{order.express_no||'暂未发货'}}</span></div>
                        </div>
                        <div class="table-cell">
                            <van-icon name="arrow"/>
                        </div>
                    </div>
                </div>
                <div class="pay-window">
                    <van-steps :active="order.status">
                        <van-step>下单</van-step>
                        <van-step>付款</van-step>
                        <van-step>发货</van-step>
                        <van-step>收货</van-step>
                        <van-step>完成</van-step>
                    </van-steps>
                </div>
            </div>
        </div>
        <div>
            <van-panel :title="order.provider_detail.provider_name" :desc="order.provider_detail.company_phone">
                <van-card
                    v-for="(item,index) in order.order_product"
                    :key="index"
                    :price="item.discount_price"
                    :title="item.product_name"
                    :thumb="item.img_url"
                    :desc="'数量 *'+item.num"
                >
                    <div slot="tags">
                        <div v-for="(sku,skuIndex) in item.sku_info" :key="skuIndex">
                            <span>{{sku.sku_key}}：</span>
                            <van-tag type="danger">{{sku.sku_name}}</van-tag>
                        </div>
                    </div>
                </van-card>
            </van-panel>

        </div>
        <div>
            <van-cell-group>
                <van-cell center title="商品总价" :value="`￥`+order.total_fee"/>
                <van-cell center title="运费" :value="order.shipping_fee==0?`包邮`:order.shipping_fee+'元'"/>
                <van-panel title="订单总价" :status="`￥${parseFloat(order.total_fee)+parseFloat(order.shipping_fee)}`">
                </van-panel>
            </van-cell-group>
        </div>
        <div class="default-window text-right">
            <van-button  @click="closePay" v-if="order.status==0">取消订单</van-button>
            <van-button type="danger" @click="confirmOrder" v-if="order.status==2">确认收货</van-button>
        </div>
        <div>
            <!--        清除浮动-->
            <div style="width: 100%;height: 50px"></div>
            <van-submit-bar
                v-if="order.status==0"
                :price="(parseFloat(order.total_fee)+parseFloat(order.shipping_fee))*100"
                button-text="订单支付"
                text-align="left"
                button-type="danger"
                :loading="buyButtonStatus"
                @submit="payOrder"
            />
        </div>
    </div>
</template>

<script>


    export default {
        name: "OrderDetail",
        data() {
            return {
                buyButtonStatus: false,
                order: {
                    provider_detail: {
                        provider_name: '',
                        company_phone: '',
                    }
                }
            }
        },
        mounted() {
            this.loadOrderDetail();
        },
        methods: {
            //确认收货
            confirmOrder(){
                this.$dialog.confirm({
                    message: '是否收货此商品？',
                    confirmButtonColor: '#ee0a24',
                }).then(() => {
                    let params = {
                        order_no: this.order.order_no
                    };

                    this.$api('Order/confirm',params).then(data=>{
                        this.$toast.success('操作成功');
                        this.loadOrderDetail();
                    });
                }).catch(() => {
                });
            },
            //取消订单
            closePay(){
                this.$dialog.confirm({
                    message: '是否取消该笔订单？',
                    confirmButtonColor: '#ee0a24',
                }).then(() => {
                    let params = {
                        order_no: this.order.order_no
                    };
                    this.$api('Order/cancel',params).then(data=>{
                        this.$toast.success('取消成功');
                        this.loadOrderDetail();
                    });
                }).catch(() => {
                });
            },
            //加载订单详情
            loadOrderDetail() {
                let params = {
                    order_no: this.$route.params.loadId
                };
                this.$api('Order/detail', params).then(data => {
                    console.log(data);
                    this.order = data.order_detail;
                });
            },
            payOrder() {
                this.$dialog.confirm({
                    message: '确认支付该笔订单？',
                    confirmButtonColor: '#ee0a24',
                }).then(() => {
                    this.buyButtonStatus = true;
                    let params = {
                        no: this.order.order_no
                    };
                    this.$api('Pay/pay', params).then(res => {
                        this.postData(res.response);
                    });
                }).catch(() => {
                });
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
                        if (res.err_msg == "get_brand_wcpay_request：ok") {
                            this.$toast.success("支付成功");
                            this.buyButtonStatus = false;
                            this.loadOrderDetail();
                        } else {
                            this.$notify("支付失败");
                            this.buyButtonStatus = false;
                            this.loadOrderDetail();
                        }
                    }
                );
            },
        }
    }
</script>

<style scoped>
    .status-window {
        width: 100%;
        background-color: #ee0a24;
        color: #FFFFFF;
        padding: 10px;
        box-sizing: border-box;
    }

    .info-window {
        border-radius: 8px;
        box-shadow: 2px 2px 8px #a5a5a5;
    }

    .pay-window {
        padding: 10px;
        border-radius: 8px;
    }

    .address-window {
        padding: 10px;
        border-radius: 8px;
    }

    .address-left {
        width: 35px;
    }
</style>
