<template>
    <div>
        <van-cell-group>
            <van-cell v-for="(item,index) in messageList" :key="index" :title="item.msg" :label="item.time"/>
        </van-cell-group>
        <no-data :show="messageList.length"></no-data>
    </div>
</template>

<script>
    import noData from "@/components/noData";

    export default {
        name: "SystemMessage",
        components: {
            noData: noData,

        },
        mounted(){
            this.loadSystemMessage();
        },
        data() {
            return {
                noData: true,
                messageList:[]
            }
        },
        methods:{
            //加载系统信息
            loadSystemMessage(){
                this.$api('Message/index').then(data=>{
                    this.messageList = data.message_list;
                });
            }
        }
    }
</script>

<style scoped>

</style>
