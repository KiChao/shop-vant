<template>
    <div>
        <van-search @search="goSearch()" v-model="searchValue" placeholder="请输入搜索关键词"/>
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
        name: "Search",
        data() {
            return {
                searchValue: '',
                productList: []
            }
        },
        components:{
            noData
        },
        mounted() {

        },
        methods: {
            checkProduct(id) {
                this.$router.push({name: 'ProductDetail', params: {loadId: id}});
            },
            goSearch() {
                if (this.searchValue != '') {
                    let params = {
                        search_key: this.searchValue
                    };
                    this.$api('Product/lists', params).then(data => {
                        this.productList = data.product_list;
                    });

                } else {
                    this.$notify('请输入搜索内容');
                }
            }
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
