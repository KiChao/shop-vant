<template>
    <div>
        <van-notice-bar wrapable :scrollable="false" left-icon="volume-o" mode="closeable">
            温馨提示：为了您的财产安全，不要向陌生人透露您的支付信息以及商品物流信息
        </van-notice-bar>

        <!--地址选择-->
        <div @click="chooseAddress('choose')">
            <div class="address-window default-window table">
                <div class="table-cell" style="width: 35px">
                    <van-icon size="25px" class="block" name="location-o"/>
                </div>
                <div v-if="addressInfo.isChoose==true" class="table-cell">
                    <div><span>{{addressInfo.name}} {{addressInfo.phone}}</span></div>
                    <div><span>{{addressInfo.address}}</span></div>
                </div>
                <div v-else>
                    <div><span>点击选择收货地址</span></div>
                </div>
                <div class="table-cell" style="width: 30px;text-align: right">
                    <van-icon size="20px" color="#888888" class="block" name="arrow"/>
                </div>
            </div>
            <img src="@/assets/temp/border.png" class="image" alt="">
        </div>
        <div class="blank"></div>
        <!-- 商品信息-->
        <div v-for="(item,index) in providerList" :key="index">
            <van-card
                v-for="(product,tip) in item.product" :key="tip"
                :num="product.num"
                :price="product.discount_price"
                :title="product.product_name"
                :thumb="product.thumb_img_url"
            >
                <div slot="tags">
                    <div style="padding-top: 5px" v-for="(sku,skyIndex) in product.sku_info" :key="skyIndex">
                        {{sku.sku_key}}：
                        <van-tag type="danger">{{sku.sku_name}}</van-tag>
                    </div>
                </div>
            </van-card>
        </div>
        <div class="blank"></div>
        <!-- 订单金额信息-->
        <van-cell-group>
            <van-cell title="商品总价" :value="'￥'+allPrice"/>
            <!--            <van-cell title="优惠金额" value="￥30"/>-->
            <van-cell title="邮费" :value="postage==0?'包邮':postage+'元'"/>
            <van-cell title="支付费用">
                <span class="font-red">￥</span><span class="font-red"
                                                     style="font-size: 20px">{{allPrice + postage}}</span>
            </van-cell>
        </van-cell-group>

        <div>
            <div style="width: 100%;height: 50px"></div>
            <van-submit-bar
                :price="(allPrice + postage)*100"
                button-text="提交订单"
                text-align="left"
                :loading="buyButtonStatus"
                @submit="pushOrder()"
            />
        </div>

    </div>
</template>

<script>
    export default {
        name: "Settlement",
        data() {
            return {
                buyButtonStatus: false,

                productInfo: this.$store.state.productSattlement,
                num: this.$store.state.numSattlement,
                addressInfo: this.$store.state.chooseAddress,
                skuInfo: this.$store.state.skuInfo,

                providerList: [],
                allPrice: 0,

                postage: 0//邮费


            }
        },
        mounted() {
            this.loadOrderSettlement();
            this.checkPostage();

        },
        methods: {
            //提交订单
            pushOrder() {
                if (this.addressInfo.isChoose == false) {
                    this.$notify('请选择收货地址');
                    return;
                }

                this.$dialog.confirm({
                    message: '确认提交订单并支付？',
                    confirmButtonColor: '#ee0a24',
                }).then(() => {
                    this.buyButtonStatus = true;

                    let product = [];
                    for (let m in this.providerList) {
                        let ptemp = this.providerList[m].product;
                        for (let n in ptemp) {
                            let temp = `${ptemp[n].product_id}_${ptemp[n].product_detail_id}_${ptemp[n].num}`;
                            product.push(temp);
                        }
                    }
                    let params = {
                        user_address_id: this.addressInfo.address_id,
                        product_list: JSON.stringify(product),
                    };
                    this.$api('Order/create', params).then(data => {
                        let params = {
                            no: data.no
                        };
                        this.$api('Pay/pay', params).then(res => {
                            this.postData(res.response);
                        });
                    });
                }).catch(() => {
                });
            },
            //计算运费
            checkPostage() {
                this.addressInfo = this.$store.state.chooseAddress;
                if (this.addressInfo.isChoose == true) {
                    let params = {
                        user_address_id: this.addressInfo.address_id,
                        product_list: JSON.stringify([`${this.productInfo.product_id}_0_${this.num}`])
                    };
                    this.$api('Order/ajax_get_shipping_fee', params).then(data => {
                        console.log(data);
                        this.postage = data.fee;
                    });
                }
            },
            //结算订单
            loadOrderSettlement() {
                let params = {
                    product_id: this.productInfo.product_id,
                    sku_array: this.skuInfo.skuArray,
                    num: this.num,
                };
                this.$api('Order/settlement', params).then(data => {
                    console.log(data);
                    this.providerList = data.product_list;
                    this.allPrice = data.all_price;
                });
            },

            //选择地址
            chooseAddress(type) {
                this.$router.push({name: 'AddressList', params: {type: type}});
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
    .address-window {

    }
</style>
