<template>
    <div>
        <div v-for="(item,index) in cateList" :key="index" class="f-cate">
            <img :src="item.img_url" class="image" alt="">
            <div>
                <van-grid :border="false" :column-num="3">
                    <van-grid-item @click="goProductList(cate.cate_id,item.category_list)" v-for="(cate,tip) in item.category_list" :key="tip">
                        <img class="image" :src="cate.cate_img_url" alt="">
                    </van-grid-item>
                </van-grid>
            </div>
        </div>
        <shop-tab :choose-item="1"></shop-tab>
    </div>
</template>

<script>
    import shopTab from "../../components/shopTab";
    export default {
        name: "category",
        components: {
            shopTab: shopTab,
        },
        data() {
            return {
                cateList: [],
            }
        },
        mounted() {
            this.loadCate();
        },
        methods: {
            //跳转到商品列表
            goProductList(cateId, cateList) {
                this.$store.state.cateList = cateList;
                this.$store.state.cateId = cateId;
                this.$router.push({name: 'ProductList', params: {loadId: cateId,type:1}});
            },
            //加载产品分类
            loadCate() {
                this.$api('Product/category').then(data => {
                    this.cateList = data.father_category_list;


                });
            },

        }
    }
</script>

<style scoped>
    .f-cate{
        width: 100%;
    }
</style>
