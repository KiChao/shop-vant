<template>
    <div>
        <!--        活动主图-->
        <div><img :src="articleDetail.main_cover" class="image" alt=""></div>
        <div class="title-window">
            <div><span class="title font-b">{{articleDetail.title}}</span></div>
            <div><span class="font-13 font-gary">{{articleDetail.sub_title}}</span></div>

            <!--            <div><span @click="openPage" class="font-red">{{fisherDetail.nickname}}</span> <span>发布于 {{articleDetail.time}}</span></div>-->
        </div>
        <div class="default-window">
            <div v-html="articleDetail.detail"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NoticeDetail",
        data(){
            return{
                content:'',
                articleDetail: {},
            }
        },
        mounted(){
            this.loadArticle();
        },
        methods:{
            //加载资讯内容
            loadArticle(){
                let params = {
                    notice_id: this.$route.params.loadId
                };
                this.$api('Notice/detail', params).then(data => {
                    this.articleDetail = data.detail;
                });
            }
        }
    }
</script>

<style scoped>
    .title-window{
        padding: 10px 15px;
        /*box-shadow: 0px 2px 10px #d2d2d2;*/
    }
</style>
