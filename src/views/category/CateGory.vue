<template>
    <div>
        <van-row>
            <van-col span="6">
                <div class="cate-window">
                    <div
                        @click="chooseCate(item.category_list,item.father_cate_id)"
                        v-for="(item, index) in cateList"
                        :key="index"
                        :class="{ active: chooseItem == item.father_cate_id }"
                        class="item-cate"
                    >
                        {{ item.father_cate_name }}
                    </div>
                </div>
            </van-col>
            <van-col span="18">
                <van-row>
                    <van-col
                        span="6"
                        v-for="(child, tip) in childList"
                        :key="tip"
                    >
                    <img @click="goProductList(child.cate_id,item.category_list)" :src="child.cate_img_url" style="width:100%" alt="">
                    </van-col>
                </van-row>
            </van-col>
        </van-row>
        <!-- <div v-for="(item,index) in cateList" :key="index" class="f-cate">
            <img :src="item.img_url" class="image" alt="">
            <div>
                <van-grid :border="false" :column-num="3">
                    <van-grid-item @click="goProductList(cate.cate_id,item.category_list)" v-for="(cate,tip) in item.category_list" :key="tip">
                        <img class="image" :src="cate.cate_img_url" alt="">
                    </van-grid-item>
                </van-grid>
            </div>
        </div> -->
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
            chooseItem: 1,
            childList: [],
        };
    },
    mounted() {
        this.loadCate();
    },
    methods: {
        //跳转到商品列表
        goProductList(cateId, cateList) {
            this.$store.state.cateList = cateList;
            this.$store.state.cateId = cateId;
            this.$router.push({
                name: "ProductList",
                params: { loadId: cateId, type: 1 },
            });
        },
        //点击一级分类
        chooseCate(children,id) {
            this.childList = children;
            this.chooseItem=id;
        },
        //加载产品分类
        loadCate() {
            this.$api("Product/category").then((data) => {
                this.cateList = data.father_category_list;
                this.chooseItem = this.cateList[0]["father_cate_id"];
                this.childList = this.cateList[0]["category_list"];
            });
        },
    },
};
</script>

<style scoped>
.f-cate {
    width: 100%;
}
.item-cate {
    padding: 10px;
    text-align: center;
}
.active {
    background-color: #ffffff;
    color: #07c160;
}
.cate-window {
    width: 100%;
    height: 100vh;
    overflow-y: auto;
    padding-bottom: 50px;
    box-sizing: border-box;
}
</style>
