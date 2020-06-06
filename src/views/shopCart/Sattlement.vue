<template>
    <div>
        <van-notice-bar wrapable :scrollable="false" left-icon="volume-o" mode="closeable">
            温馨提示：为了您的财产安全，不要向陌生人透露您的支付信息以及商品物流信息
        </van-notice-bar>
        <div class=" white flex place">
            <div class="default-window"><span>配送方式</span></div>
            <van-radio-group v-model="pickType">
                <div class="default-window">
                    <van-radio name="1" checked-color="#07c160">邮寄</van-radio>
                </div>
                <div class="default-window">
                    <van-radio name="2" checked-color="#07c160">自提</van-radio>
                </div>
            </van-radio-group>
        </div>
        <div class="blank"></div>
        <!--地址选择-->
        <div v-if="pickType=='1'" @click="chooseAddress('choose')">
            <div class="address-window default-window table">
                <div class="table-cell" style="width: 30px">
                    <van-icon size="20px" class="block" name="location-o"/>
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
        <div v-if="pickType=='2'">
            <div @click="showPicker=true" class="address-window default-window table">
                <div class="table-cell" style="width: 30px">
                    <van-icon size="20px" class="block" name="shop-o"/>
                </div>
                <div class="table-cell">
                    <div><span>{{pickShop.shopName}}</span></div>
                    <div><span>{{pickShop.address}}</span></div>

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
                                                     style="font-size: 20px">{{pickType=='1'?allPrice + postage:allPrice}}</span>
            </van-cell>
        </van-cell-group>
        <div class=" white flex place">
            <div class="default-window"><span>支付方式</span></div>
            <van-radio-group v-model="payType">
                <div class="default-window">
                    <van-radio name="1" checked-color="#07c160">现金支付</van-radio>
                </div>
                <div class="default-window">
                    <van-radio name="3" checked-color="#07c160">充值卡</van-radio>
                </div>
            </van-radio-group>
        </div>
        <div class="blank"></div>

        <div>
            <div style="width: 100%;height: 50px"></div>
            <van-submit-bar
                :price="pickType=='1'?(allPrice + postage)*100:allPrice*100"
                button-text="提交订单"
                text-align="left"
                :loading="buyButtonStatus"
                @submit="pushOrder()"
            />
        </div>
        <!--        门店选择-->
        <van-popup v-model="showPicker" position="bottom">
            <van-picker
                title="选择门店"
                show-toolbar
                :columns="columns"
                @cancel="showPicker = false"
                @confirm="chooseShop"
            />
        </van-popup>

    </div>
</template>

<script>
    import axios from "axios";
    export default {
        name: "Sattlement",
        data() {
            return {
                cartInfo: this.$store.state.cartInfo,

                buyButtonStatus: false,

                providerList: [],
                allPrice: 0,

                postage: 0,//邮费

                addressInfo: this.$store.state.chooseAddress,
                pickShop: {
                    shopName: '选择自提门店',
                    address: '',

                },
                payType: '1',
                pickType: this.$store.state.pickType,
                showPicker: false,
                columns: [],
                groupId: '',
            }
        },
        mounted() {
            this.allPrice = this.cartInfo.all_price;
            this.providerList = this.cartInfo.product_list;
            this.checkPostage();
            this.loadShop();
        },
        methods:{
            //选择门店
            chooseShop(e) {
                console.log(e);
                this.groupId = e.data;
                this.showPicker = false;

                let data = {
                    shopName: e.text,
                    address: e.address,
                };
                this.pickShop = data;
            },
            //加载门店列表
            loadShop() {
                this.$api('Order/group').then(data => {
                    this.columns = [];
                    let shop = data.group_list;
                    for (let m in shop) {
                        let params = {
                            text: shop[m].store_name,
                            data: shop[m].group_id,
                            address: shop[m].pick_address,
                        };
                        this.columns.push(params);
                    }

                })
            },
            //提交订单
            pushOrder() {
                if (this.pickType == '1') {
                    if (this.addressInfo.isChoose == false) {
                        this.$notify('请选择收货地址');
                        return;
                    }
                }

                if (this.pickType == '2') {
                    if (this.groupId == '') {
                        this.$notify('请选择自提门店');
                        return;
                    }
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
                        pick_type: this.pickType,
                        group_id: this.groupId,
                        pay_type: this.payType
                    };
                    this.$api('Order/create', params).then(data => {
                        let params = {
                            no: data.no,
                            pay_type: this.payType
                        };
                        axios({
                            url: `http://xkq.vxyz.cn/api/Pay/pay`,
                            method: 'post',
                            data: params,
                        }).then(res => {
                            let data = res.data;
                            if (data.status == 0) {
                                this.$notify(data.msg);
                            } else if (data.status == 1) {
                                this.postData(data.data.response);
                            } else if (data.status == 2) {
                                this.$toast.success(data.msg);
                                this.$router.push({name: "Success"});
                            }

                        }).catch(fail => {

                        });
                    });
                }).catch(() => {
                });
            },
            //计算运费
            checkPostage() {
                this.addressInfo = this.$store.state.chooseAddress;
                if (this.addressInfo.isChoose == true) {
                    let product = [];
                    for (let m in this.providerList) {
                        let ptemp = this.providerList[m].product
                        for (let n in ptemp) {
                            let temp = `${ptemp[n].product_id}_${ptemp[n].product_detail_id}_${ptemp[n].num}`;
                            product.push(temp);
                        }
                    }
                    let params = {
                        user_address_id: this.addressInfo.address_id,
                        product_list: JSON.stringify(product)
                    };
                    this.$api('Order/ajax_get_shipping_fee', params).then(data => {
                        this.postage = data.fee;
                    });
                }
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
                        if (res.err_msg == "get_brand_wcpay_request：ok") {
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

</style>
