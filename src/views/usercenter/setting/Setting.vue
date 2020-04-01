<template>
    <div>
        <van-cell-group>
            <van-cell
                is-link
                title="关于我们"
                link-type="navigateTo"
                :to="{name:'AboutUs'}"
            />
            <van-cell
                is-link
                title="用户协议"
                link-type="navigateTo"
                :to="{name:'UserBook'}"

            />
        </van-cell-group>
        <div class="blank"></div>
        <van-cell-group>
            <van-cell
                is-link
                title="投诉建议"
                link-type="navigateTo"
                :to="{name:'Complaint'}"

            />
        </van-cell-group>
    </div>
</template>

<script>
    export default {
        name: "Setting"
    }
</script>

<style scoped>

</style>
