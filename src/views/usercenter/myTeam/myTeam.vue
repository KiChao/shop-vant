<template>
    <div>
        <van-grid :border="false" :column-num="4">
            <van-grid-item v-for="(item,index) in teamList" :key="index">
<!--                <img class="image" style="border-radius: 100%" :src="item.headimgurl"/>-->
                <van-image
                    round
                    width="100%"
                    height="100%"
                    :src="item.headimgurl"
                />
                <div class="text-center">
                    <div><span class="font-13 font-gary">{{item.nickname}}</span></div>
                    <div><span class="font-13 font-gary">{{item.level_text}}</span></div>
                </div>
            </van-grid-item>
        </van-grid>
        <no-data :show="teamList.length"></no-data>
    </div>
</template>

<script>
    import noData from '@/components/noData.vue'
    export default {
        name: "myTeam",
        components:{
            noData
        },
        data() {
            return {
                teamList: [],
            }
        },
        mounted() {
            this.loadMyTeam();
        },
        methods: {
            //加载我的团队
            loadMyTeam() {
                this.$api('Invest/index').then(data => {
                    this.teamList = data.team_list;
                });
            },
        }
    }
</script>

<style scoped>

</style>
