<template>
    <div>
        <van-swipe indicator-color="#ee0a24" :autoplay="3000">
            <van-swipe-item v-for="(image, index) in productImg" :key="index">
                <img class="image" :src="image.img_url"/>
            </van-swipe-item>
        </van-swipe>
        <div class="default-window">
            <div class="table">
                <div class="table-cell">
                    <span class="font-red">￥</span><span class="font-red" style="font-size: 25px">{{productInfo.discount_price}}</span>
                </div>
                <div class="table-cell text-right">
                    <span class="font-gary font-13">{{freight}}</span>
                </div>
            </div>
            <div>
                <div>
                    <span class="product-name">{{productInfo.product_name}}</span>

                </div>
<!--                <div><van-tag style="margin-right: 5px" type="danger">{{productInfo.product_type_text}}</van-tag><span class="font-gary font-13">{{productInfo.label_text}}</span></div>-->
            </div>
        </div>
        <van-divider>商品详情</van-divider>
        <div>
            <div v-html="productInfo.description"></div>
        </div>

        <!-- 分享选择框 -->
        <van-popup
            v-model="showShare"
            position="bottom"
            :style="{height:'50%'}"
            closeable
        >
        </van-popup>

        <!--        规格选择框-->
        <van-popup
            v-model="showSku"
            position="bottom"
            :style="{ height: '50%' }"
            closeable
        >
            <div class="sku-image-window">
                <div class="table">
                    <div class="table-cell sku-image-left">
                        <img :src="productInfo.img_url" class="image" alt="">
                    </div>
                    <div style="position: relative" class="table-cell sku-image-right">
                        <div><span class="font-red" style="font-size: 25px">￥{{skuPrice||productInfo.discount_price}}</span></div>
                        <div><span>剩余</span> <span class="font-red">{{skuStock||productInfo.stock}}</span> <span>件</span></div>
                        <!--                        <div style="position: absolute;bottom: 0"><span class="font-gary">已选择：蓝色；红色；大码；打包</span></div>-->
                    </div>
                </div>
            </div>
            <div class="sku-item-window default-window">
                <div v-for="(item,index) in skuArray" :key="index">
                    <div class="sku-item-title"><span>{{item.sku_key_name}}</span></div>
                    <div class="sku-item-list">
                        <div v-for="(sku,skuIndex) in item.sku_key" :key="skuIndex" class="sku-item">
                            <van-tag @click="chooseSku(index,skuIndex)"
                                     :plain="hasChooseSku[index]==skuIndex?false:true" type="danger" size="large">
                                {{sku}}
                            </van-tag>
                        </div>
                    </div>
                </div>

            </div>

            <!--            清除底部按钮浮动-->
            <div style="width: 100%;height: 64px"></div>
            <div class="sku-window-button white-bg">
                <div class="table">
                    <div class="table-cell">
                        <van-stepper v-model="num" min="1" input-width="50px" button-size="30px" integer/>
                    </div>
                    <div class="table-cell" style="width: 150px">
                        <van-button @click="goPush()" type="danger" round block>{{buyText}}</van-button>
                    </div>
                </div>
            </div>
        </van-popup>

        <div style="width: 100%;height: 50px"></div>
        <van-goods-action>
            <van-goods-action-icon icon="shop-o" text="首页" @click="onClickIcon('index')"/>
            <van-goods-action-icon icon="cart-o" text="购物车" @click="onClickIcon('cart')"/>
            <van-goods-action-button type="warning" text="加入购物车" @click="onClickBuy('cart')"/>
            <van-goods-action-button type="danger" text="立即购买" @click="onClickBuy('buy')"/>
        </van-goods-action>
    </div>
</template>

<script>
    export default {
        name: "ProductDetail",
        data() {
            return {
                showSku: false,
                showShare: false,

                productInfo: {},
                productImg: [],
                freight: '',//邮费

                skuShow: false,
                //显示的规格列表
                skuArray: [],
                //存放已经选择的规格
                hasChooseSku: [],
                //存放价格列表
                priceInfo: {},
                //是否选择完了规格
                isChooseSku: false,
                //该规格下的价格
                skuPrice: '',
                skuNeedPoint: '',
                skuStock: '',

                paySkuInfo: {
                    skuArray: '',
                    skuTexy: '',
                },

                buyType: 1,
                buyText: '立即购买',

                num:1
            }
        },
        mounted() {
            this.loadProductDetail();
        },
        methods: {
            getWxConfig() {
                let item = {
                    //获取锚点之前的链接
                    links: `http://m.xkq.vxyz.cn/?sn=${this.$store.state.sn}#/ProductDetail/${this.productInfo.product_id}`,
                    title: this.productInfo.product_name,
                    desc: '',
                    imgUrl: this.productInfo.img_url,
                };
                this.$wxShare(item);
            },
            //提交商品信息判断是否可购买
            goPush() {
                if (!this.isChooseSku) {
                    this.$notify('请先选择规格');
                    return;
                }
                let params = {
                    product_id: this.productInfo.product_id,
                    num: this.num,
                    sku_array: this.paySkuInfo.skuArray,
                    type: this.buyType
                };
                this.$api('Product/check', params).then(data => {
                    if (this.buyType == 1) {
                        this.productInfo.real_price=this.skuPrice;
                        this.$store.state.productSattlement = this.productInfo;
                        this.$store.state.numSattlement = this.num;
                        this.$store.state.skuInfo = this.paySkuInfo;
                        this.$router.push({name: 'Settlement'});
                    } else {
                        this.$toast.success('成功加入购物车');
                    }
                });

            },
            //选择规格
            chooseSku(index, skuIndex) {
                this.isChooseSku = false;
                this.$set(this.hasChooseSku, index, skuIndex);
                //加载价格
                let temp = this.hasChooseSku.join('_');
                this.paySkuInfo.skuArray = temp;
                for (let m in this.priceInfo) {
                    if (temp == m) {
                        this.isChooseSku = true;
                        this.skuPrice = this.priceInfo[m].discount_price;
                        this.skuStock = this.priceInfo[m].stock;
                        this.skuNeedPoint = this.priceInfo[m].need_point;
                    }
                }
            },
            //加载商品信息
            loadProductDetail() {
                let params = {
                    product_id: this.$route.params.loadId
                };
                this.$api('Product/detail', params).then(data => {
                    console.log(data);
                    this.productInfo = data.product;
                    this.productImg = data.product_main_img;
                    this.freight = data.freight_tpl;

                    this.priceInfo = data.price_info;
                    this.skuArray = data.sku_info;
                    if (this.skuArray == 0) {
                        this.isChooseSku = true;
                    }
                    this.getWxConfig();

                });
            },
            onClickIcon(type) {
                if (type == 'index') {
                    this.$router.push({name: 'Index'});
                } else {
                    this.$router.push({name: 'ShopCart'});
                }
            },
            onClickButton() {

            },
            onClickBuy(type) {
                this.showSku = true;
                if (type == 'buy') {
                    this.buyType = 1;
                    this.buyText = '立即购买';
                } else {
                    this.buyType = 2;
                    this.buyText = '加入购物车';
                }
            },
            //规格按钮提交操作
            pullResult() {
                this.$router.push({name: 'Settlement'});
            }
        }
    }
</script>

<style scoped>
    .sku-image-left {
        width: 100px;
        height: 100px;
    }

    .sku-image-right {
        padding-left: 10px;
        vertical-align: top;
    }

    .product-name {
        font-size: 17px;
    }

    .price {
        color: #ee0a24;
        font-size: 22px;
    }

    .sku-image-window {
        padding: 10px;
    }

    .sku-window-button {
        position: fixed;
        bottom: 0;
        width: 100%;
        padding: 10px;
        box-sizing: border-box
    }

    .sku-item-title {
        padding-bottom: 10px;
        font-weight: bold;
    }

    .sku-item-list {
        display: flex;
        flex-wrap: wrap;
    }

    .sku-item {
        margin: 0 10px 10px 0;
    }
</style>
