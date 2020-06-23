<template>
    <div>
        <video :src="videoDetail.path" class="player" controls="controls"></video>
        <div class="table default-window">
            <div class="table-cell">
                <span class="title">{{videoDetail.title}}</span>
            </div>
            <div class="table-cell" style="width: 60px;text-align: right;">
                <van-tag plain size="large" type="danger">回放中</van-tag>
            </div>
        </div>
        <div style="padding: 0 10px"><span class="font-gary">时间：{{videoDetail.time}}</span></div>
        <van-tabs sticky>
            <van-tab title="视频简介">
                <div class="default-window">
                    <div v-html="videoDetail.description"></div>
                </div>
            </van-tab>
            <van-tab title="推荐商品">
                <van-card
                    v-for="(item,index) in videoDetail.product"
                    :key="index"
                    :tag="item.product_type_text"
                    :price="item.discount_price"
                    :desc="item.label_text"
                    @click="openProduct(item.product_id)"
                    :thumb="item.thumb_img_url"
                    :origin-price="item.original_price"
                >
                    <div slot="title">
                        <span style="font-size: 14px;font-weight: 500">{{item.product_name}}</span>

                    </div>
                </van-card>
            </van-tab>
        </van-tabs>

    </div>
</template>

<script>
    export default {
        name: "Detail",
        data() {
            return {
                videoDetail: {}
            }
        },
        mounted() {
            this.loadVideo();
        },
        methods: {
            loadVideo() {
                let params = {
                    video_id: this.$route.params.loadId
                };
                this.$api('Video/detail', params).then(data => {
                    console.log(data)
                    this.videoDetail = data;
                });
            },
            //跳转到商品详情
            openProduct(id) {
                this.$router.push({name: 'ProductDetail', params: {loadId: id}});
            },
        }
    }
</script>

<style scoped>
    .player {
        width: 100%;
    }

    .title {
        font-size: 20px;
    }
    image{
        width: 100% !important;
    }
</style>
