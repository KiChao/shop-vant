<template>
    <div>
        <no-data :show="videoList.length"/>
        <div v-for="(item,index) in videoList" :key="index" @click="openPage(item.video_id)" class="video-window">
            <img :src="item.cover" class="image poster" alt="">
            <div class="tip">
                <div class="table">
                    <div class="table-cell"><van-icon style="display: block" name="play-circle-o" /></div>
                    <div class="table-cell" style="padding-left: 5px">回放中</div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import noData from "@/components/noData";
    export default {
        name: "Video",
        components:{
            noData
        },
        data(){
            return{
                videoList:[],
            }
        },
        mounted(){
            this.loadVideo();
        },
        methods:{
            //加载视频列表
            loadVideo(){
                this.$api('Video/index').then(data=>{
                    console.log(data);
                    this.videoList=data;
                });
            },
            openPage(id) {
                this.$router.push({name: 'VideoDetail', params: {loadId:id}});
            },

        }
    }
</script>

<style scoped>
    .video-window {
        margin: 10px;
        box-sizing: border-box;
        border-radius: 10px;
        position: relative;
    }
    .poster{
        border-radius: 10px;
    }
    .tip{
        position: absolute;
        bottom: 10px;
        right: 10px;
        background-color: rgba(0,0,0,0.2);
        padding: 3px 10px;
        color: #f2f2f2;
        border-radius: 30px;
    }
</style>
