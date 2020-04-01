<template>
    <div>

        <van-tabs sticky swipeable v-model="active">
            <van-tab name="all" title="全部">
                <van-panel @click="checkDetail(item.order_no)" v-for="(item,index) in order" :key="index"
                           :title="item.provider_name" :desc="item.order_no" :status="item.status_type">
                    <van-card
                        v-for="(product,tip) in item.order_product"
                        :key="tip"
                        :price="product.discount_price"
                        :desc="'数量 *'+product.num"
                        :title="product.product_name"
                        :thumb="product.thumb_img_url"

                    >
                        <div slot="tags">
                            <div v-for="(sku,skuIndex) in product.sku_info" :key="skuIndex">
                                <span>{{sku.sku_key}}：</span>
                                <van-tag type="danger">{{sku.sku_name}}</van-tag>
                            </div>
                        </div>
                    </van-card>
                </van-panel>
                <no-data :show="order.length"/>
            </van-tab>
            <van-tab name="0" title="待支付">
                <van-panel @click="checkDetail(item.order_no)" v-for="(item,index) in order_0" :key="index"
                           :title="item.provider_name" :desc="item.order_no">
                    <van-card
                        v-for="(product,tip) in item.order_product"
                        :key="tip"
                        :price="product.discount_price"
                        :desc="'数量 *'+product.num"
                        :title="product.product_name"
                        :thumb="product.thumb_img_url"

                    >
                        <div slot="tag">
                            <van-tag>{{item.status_type}}</van-tag>
                        </div>
                        <div slot="tags">
                            <div v-for="(sku,skuIndex) in product.sku_info" :key="skuIndex">
                                <span>{{sku.sku_key}}：</span>
                                <van-tag type="danger">{{sku.sku_name}}</van-tag>
                            </div>
                        </div>
                    </van-card>
                </van-panel>
                <no-data :show="order_0.length"/>
            </van-tab>
            <van-tab name="1" title="待发货">
                <van-panel @click="checkDetail(item.order_no)" v-for="(item,index) in order_1" :key="index"
                           :title="item.provider_name" :desc="item.order_no">
                    <van-card
                        v-for="(product,tip) in item.order_product"
                        :key="tip"
                        :price="product.discount_price"
                        :desc="'数量 *'+product.num"
                        :title="product.product_name"
                        :thumb="product.thumb_img_url"

                    >
                        <div slot="tag">
                            <van-tag type="success">{{item.status_type}}</van-tag>
                        </div>
                        <div slot="tags">
                            <div v-for="(sku,skuIndex) in product.sku_info" :key="skuIndex">
                                <span>{{sku.sku_key}}：</span>
                                <van-tag type="danger">{{sku.sku_name}}</van-tag>
                            </div>
                        </div>
                    </van-card>
                </van-panel>
                <no-data :show="order_1.length"/>
            </van-tab>
            <van-tab name="2" title="待收货">
                <van-panel @click="checkDetail(item.order_no)" v-for="(item,index) in order_2" :key="index"
                           :title="item.provider_name" :desc="item.order_no">
                    <van-card
                        v-for="(product,tip) in item.order_product"
                        :key="tip"
                        :price="product.discount_price"
                        :desc="'数量 *'+product.num"
                        :title="product.product_name"
                        :thumb="product.thumb_img_url"

                    >
                        <div slot="tag">
                            <van-tag type="success">{{item.status_type}}</van-tag>
                        </div>
                        <div slot="tags">
                            <div v-for="(sku,skuIndex) in product.sku_info" :key="skuIndex">
                                <span>{{sku.sku_key}}：</span>
                                <van-tag type="danger">{{sku.sku_name}}</van-tag>
                            </div>
                        </div>
                    </van-card>
                </van-panel>
                <no-data :show="order_2.length"/>
            </van-tab>
            <van-tab name="3" title="已完成">
                <van-panel @click="checkDetail(item.order_no)" v-for="(item,index) in order_3" :key="index"
                           :title="item.provider_name" :desc="item.order_no">
                    <van-card
                        v-for="(product,tip) in item.order_product"
                        :key="tip"
                        :price="product.discount_price"
                        :desc="'数量 *'+product.num"
                        :title="product.product_name"
                        :thumb="product.thumb_img_url"

                    >
                        <div slot="tag">
                            <van-tag type="success">{{item.status_type}}</van-tag>
                        </div>
                        <div slot="tags">
                            <div v-for="(sku,skuIndex) in product.sku_info" :key="skuIndex">
                                <span>{{sku.sku_key}}：</span>
                                <van-tag type="danger">{{sku.sku_name}}</van-tag>
                            </div>
                        </div>
                    </van-card>
                </van-panel>
                <no-data :show="order_3.length"/>
            </van-tab>
            <van-tab name="other" title="其他">
                <van-panel @click="checkDetail(item.order_no)" v-for="(item,index) in order_4" :key="index"
                           :title="item.provider_name" :desc="item.order_no">
                    <van-card
                        v-for="(product,tip) in item.order_product"
                        :key="tip"
                        :price="product.discount_price"
                        :desc="'数量 *'+product.num"
                        :title="product.product_name"
                        :thumb="product.thumb_img_url"

                    >
                        <div slot="tag">
                            <van-tag>{{item.status_type}}</van-tag>
                        </div>
                        <div slot="tags">
                            <div v-for="(sku,skuIndex) in product.sku_info" :key="skuIndex">
                                <span>{{sku.sku_key}}：</span>
                                <van-tag type="danger">{{sku.sku_name}}</van-tag>
                            </div>
                        </div>
                    </van-card>
                </van-panel>
                <no-data :show="order_4.length"/>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
    import noData from "@/components/noData";

    export default {
        name: "OrderList",
        components: {
            noData: noData
        },
        data() {
            return {
                active: this.$route.params.type,
                order: [],
                order_0: [],
                order_1: [],
                order_2: [],
                order_3: [],
                order_4: [],
            }
        },
        mounted() {
            this.loadOrder();
        },
        methods: {
            //加载订单列表
            loadOrder() {
                this.$api('Order/lists').then(data => {
                    this.order = [];
                    this.order_0 = [];
                    this.order_1 = [];
                    this.order_2 = [];
                    this.order_3 = [];
                    this.order_4 = [];
                    this.order = data.order_list;
                    let order = data.order_list;
                    for (let m in order) {
                        switch (order[m].status) {
                            case '0':
                                this.order_0.push(order[m]);
                                break;
                            case '1':
                                this.order_1.push(order[m]);
                                break;
                            case '2':
                                this.order_2.push(order[m]);
                                break;
                            case '3':
                                this.order_3.push(order[m]);
                                break;
                            default:
                                this.order_4.push(order[m]);
                                break;

                        }
                    }
                    console.log(this.order_0);
                });
            },
            checkDetail(id) {
                this.$router.push({name: 'OrderDetail', params: {loadId: id}});
            }
        }
    }
</script>

<style scoped>

</style>
