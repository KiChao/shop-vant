<template>
    <div>
        <no-data v-if="cartList.length==0"  content="购物车空空如也~"/>

        <!--        商品列表-->
        <div>
            <van-checkbox-group v-model="result">
                <van-panel v-for="(item,index) in cartList" :key="index" :title="item.provider_name" icon="shop-o">
                    <div v-for="(product,tip) in item.cart_list" :key="tip" class=" table">
                        <div class="table-cell"
                             style="width: 20px;background-color: #fbfbfb;text-align: center;padding-left: 16px">
                            <van-checkbox checked-color="#ee0a24" :name="product.cart_id"></van-checkbox>
                        </div>
                        <div>
                            <van-card
                                :price="product.discount_price"
                                :title="product.product_name"
                                :thumb="product.img_url"
                                origin-price="10.00"
                                :desc="'数量 *'+product.num"
                                :num="product.num"
                            >
                                <div slot="tags">
                                    <div v-for="(sku,skuIndex) in product.sku_info" :key="skuIndex">
                                        <span>{{sku.sku_key}}：</span>
                                        <van-tag type="danger">{{sku.sku_name}}</van-tag>
                                    </div>
                                </div>
                                <div slot="num">
                                    <van-button @click="delCart(product.cart_id)" size="mini">删除</van-button>
                                </div>
                            </van-card>
                        </div>
                    </div>
                </van-panel>
            </van-checkbox-group>
        </div>
        <!--        清除浮动-->
        <div>
            <div style="width: 100%;height: 50px"></div>
            <van-submit-bar
                button-text="立即结算"
                @submit="onClickButton"
                :disabled="cartList.length==0"
            >
            </van-submit-bar>
        </div>

    </div>
</template>

<script>
    import noData from "@/components/noData";
    export default {
        name: "ShopCart",
        components: {
            noData: noData
        },
        data() {
            return {
                checked: false,
                num: 1,

                totalPrice: 0,//选中的总价格

                cartList: [],
                cartArray: [],

                result: [],
            }
        },
        mounted() {
            this.loadCart();
        },
        methods: {

            //购物车删除
            delCart(cartId){
                this.$dialog.confirm({
                    message:'是否删除该购物车？'
                }).then(()=>{
                    let params = {
                        cart_array: JSON.stringify([cartId])
                    };
                    this.$api('Cart/delete',params).then(data=>{
                        this.$toast.success('删除成功');
                        this.loadCart();
                    });
                }).catch(()=>{});
            },
            //购物车提交
            onClickButton() {
                let formData = [];
                for (let m in this.result) {
                    for (let n in this.cartArray) {
                        if (this.result[m] == this.cartArray[n].cart_id) {
                            let temp = {
                                cart_id: this.cartArray[n].cart_id,
                                num: this.cartArray[n].num
                            };
                            formData.push(temp);
                        }
                    }
                }
                if (formData.length == 0) {
                    this.$notify('请先选择商品');
                } else {
                    let params = {
                        cart: JSON.stringify(formData),
                    };
                    this.$api('Order/settlement', params).then(data => {
                        this.$store.state.cartInfo = data;
                        this.$router.push({name:'ShopCartSettlement'});
                    });
                }
            },
            //加载购物车列表
            loadCart() {
                this.$api('Cart/index').then(data => {
                    this.cartList = data.cart_list;
                    //生成购物车价格组
                    let providerList = this.cartList;
                    for (let m in providerList) {
                        let cartList = providerList[m].cart_list;
                        for (let n in cartList) {
                            let temp = {
                                cart_id: cartList[n].cart_id,
                                num: cartList[n].num,
                            };
                            this.cartArray.push(temp);
                        }
                    }
                });
            },
        }

    }
</script>

<style scoped>

</style>
