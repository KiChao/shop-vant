<template>
    <div>
        <div style="padding: 50px;text-align: center;">
            <img src="@/assets/temp/logo.jpeg" style="width: 100px;height: 100px" alt="">
            <div><span class="font-gary">星卡其</span></div>
        </div>
        <div>
            <van-cell-group>
                <van-cell title="客服">
                    <span class="font-red">15958963647</span>
                </van-cell>
                <van-cell title="版本号" value="1.0.4"/>
<!--                <van-cell title="微信" value="tobeyour1004"/>-->
                <van-cell title="技术支持" value="得人渔夫"/>
            </van-cell-group>
        </div>
        <div style="position: fixed;width: 100%;bottom: 0">
            <van-divider>Copyright© 2020</van-divider>
        </div>


    </div>
</template>

<script>
    export default {
        name: "AboutUs"
    }
</script>

<style scoped>

</style>
