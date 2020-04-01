<template>
    <div style="text-align: center">
        <div style="padding: 60px 0;">
            <van-icon size="110px" color="#ee0a24" name="checked"/>
        </div>
        <div>
            <span style="font-size: 30px">支付成功</span>
        </div>
        <div>
            <span class="font-gary">该笔订单已支付成功</span>
        </div>
        <div style="padding: 50px 30px">
            <van-button @click="go()" type="danger" size="large">确定</van-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Success",
        methods: {
            go() {
                this.$router.push({name: 'UserCenter'})
            }
        }
    }
</script>

<style scoped>

</style>
