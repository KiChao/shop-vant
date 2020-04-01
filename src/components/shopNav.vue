<template>
    <div>
        <van-nav-bar
            :title="title"
            left-arrow
            :fixed="true"
            @click-left="onClickLeft"
        />
        <div style="width: 100%;height: 46px"></div>
    </div>

</template>

<script>
    export default {
        name: "shopNav",
        props: {
            title: {
                type: String,
                default: '标题'
            }
        },
        methods: {
            onClickLeft(){
                this.$router.go(-1);
            }
        }
    }
</script>

<style scoped>
    .van-nav-bar .van-icon{
        color: #ee0a24;
    }
</style>
