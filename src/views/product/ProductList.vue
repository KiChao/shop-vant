<template>
    <div>
        <van-sticky>
            <van-dropdown-menu active-color="#ee0a24">
                <van-dropdown-item @change="changeCate" v-model="value1" :options="option1"/>
                <van-dropdown-item v-model="value2" :options="option2"/>
            </van-dropdown-menu>
        </van-sticky>

        <div class="product-window">
            <van-row>
                <van-col v-for="(item,index) in productList" :key="index" span="12">
                    <div @click="checkProduct(item.product_id)" class="product">
                        <div style="position: absolute;left: 0;top: 10px;">
                            <van-tag mark type="danger">{{item.product_type_text}}</van-tag>
                        </div>
                        <div class="">
                            <img :src="item.img_url" class="image" alt="">
                        </div>
                        <div style="padding: 5px;">
                            <div class="van-ellipsis"><span>{{item.product_name}}</span></div>
                            <div class="van-ellipsis font-12 font-gary"><span>{{item.label_text}}</span></div>
                            <div><span class="price">￥{{item.discount_price}}</span></div>
                        </div>
                    </div>
                </van-col>
            </van-row>
            <no-data :show="productList.length" />
        </div>
    </div>
</template>

<script>
    import noData from '@/components/noData.vue'
    export default {
        name: "ProductList",
        components:{
            noData
        },
        data() {
            return {
                value1: this.$store.state.cateId||'a',
                value2: 'a',
                option1: [{text: '默认分类', value: 'a'}],
                option2: [
                    {text: '默认排序', value: 'a'},
                ],
                productList: [],
            }
        },
        mounted() {

            this.loadCate();
            this.loadProduct();
        },
        methods: {
            //加载商品详情
            checkProduct(id) {
                this.$router.push({name: 'ProductDetail', params: {loadId: id}});
            },
            //加载商品列表
            loadProduct() {
                let type = this.$route.params.type;
                if (type == 1) {
                    let params = {
                        cate_id: this.$store.state.cateId || this.$route.params.loadId,

                    };
                    this.$api('Product/lists', params).then(data => {

                        this.productList = data.product_list;
                    });
                } else {
                    let params = {
                        type: type
                    };
                    this.$api('Product/v_area', params).then(data => {

                        this.productList = data.product_list;
                    });
                }

            },
            //加载该大分类下的所有分类
            loadCate() {
                let cate = this.$store.state.cateList;

                if (cate.length != 0) {
                    this.option1 = [];
                    for (let m in cate) {
                        let obj = {
                            text: cate[m].cate_name,
                            value: cate[m].cate_id
                        };
                        this.option1.push(obj);
                    }
                }


            },
            //分类变化
            changeCate(e) {
                this.$store.state.cateId = e;

                this.loadProduct();
            },
        }

    }
</script>

<style scoped>
    .product-window {
        padding: 5px;
    }

    .product {
        padding: 5px;
        position: relative;
    }


    .text-window {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .price {
        color: #ee0a24;
    }
</style>
