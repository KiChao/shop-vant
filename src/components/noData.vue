<template>
    <div>
        <div v-if="show==0" class="image-window">
            <img class="icon" src="@/assets/temp/empty.png" alt="">
            <div><span class="font-gary">{{content}}</span></div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "noData",
        data() {
            return {

            }
        },
        props: {
            show: {
                type: Number,
                default: 0
            },
            content:{
                type:String,
                default: '暂无数据'
            }
        },

    }
</script>

<style scoped>
    .image-window {
        padding-top: 50px;
        text-align: center;
    }

    .icon {
        width: 100px;
    }
</style>
