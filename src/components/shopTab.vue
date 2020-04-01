<template>
    <div>
<!--        清除浮动-->
        <div style="width: 100%;height: 50px"></div>
        <van-tabbar
            active-color="#ee0a24"
            inactive-color="#333333"
            v-model="item">
            <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
            <van-tabbar-item to="/Category" icon="apps-o">分类</van-tabbar-item>
            <van-tabbar-item to="/ShopCart" icon="cart-o">购物车</van-tabbar-item>
            <van-tabbar-item to="/UserCenter" icon="user-o">个人中心</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
    export default {
        name: "shopTab",
        data() {
            return {
                item: 0
            }
        },
        mounted() {
            this.item = this.chooseItem;
        },
        props: {
            chooseItem: {
                type: Number
            }
        }
    }
</script>

<style scoped>

</style>
