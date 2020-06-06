<template>
    <div>
        <div v-for="(item, index) in articleList" :key="index" @click="checkArticle(item.notice_id)"
             class="default-window van-hairline--bottom">
            <div class="van-multi-ellipsis--l2"><span class="font-b">{{ item.title }}</span></div>
            <div><span class="font-gary">{{ item.sub_title }}</span></div>
            <div class="bg-image"
                 style="margin: 5px 0;padding-bottom: 50%;"
                 :style="{backgroundImage:`url(${item.main_img})`}"
            ></div>
            <div class="font-gary">
                {{ item.time }}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "List",
        data() {
            return {
                articleList: []
            }
        },
        mounted() {
            this.loadArticle();
        },
        methods: {
            checkArticle(id) {
                this.$router.push({name: 'NoticeDetail', params: {loadId: id}})
            },
            loadArticle() {
                this.$api('Notice/index').then(data => {
                    this.articleList = data.notice_list;
                    console.log(this.articleList)
                });
            }
        }
    }
</script>

<style scoped>
    .bg-image {
        width: 100%;
        height: 0;
        padding-bottom: 100%;
        background-size: cover;
        background-position: center center
    }
</style>
