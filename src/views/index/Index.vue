<template>
    <div>
        <div class="default-window" style="background-color: #333333;color: #ececec">
            <div class="table">
                <div class="table-cell user-left">
                    <img :src="userInfo.headimgurl" style="width: 45px;height: 45px;border-radius: 100%" alt="">
                </div>
                <div class="table-cell user-middle">
                    <div><span>{{userInfo.nickname}}</span></div>
                    <div><span class="font-12">{{userInfo.level_text}}</span></div>
                </div>
                <div class="table-cell user-right">
                    <div @click="openPage('Search')" class="search-window">
                        <div class="table-cell">
                            <van-icon name="search" style="display: block"/>
                        </div>
                        <div class="table-cell"><span>搜索</span></div>
                    </div>
                    <!--<van-search
                        shape="round"
                        placeholder="搜索"
                    />-->
                </div> 
                <div class="table-cell" style="width: 35px;padding-left: 10px;text-align: right">
                    <van-icon @click="openPage('SystemMessage')" :info="unread==0?'':unread" style="display: inherit" size="25"
                              name="envelop-o"/>
                </div>
            </div>
        </div>
        <div class="top-user-window">
            <div>
                <van-notice-bar style="height: 30px;border-radius: 5px" :text="indexNotice" mode="link"
                                left-icon="volume-o"/>
            </div>
        </div>
        <!--        轮播-->
        <div class="carousel-window">
            <van-swipe :show-indicators="false" class="my-swipe" duration="1000" :autoplay="3000"
                       indicator-color="white">
                <van-swipe-item v-for="(item,index) in carouselList" :key="index" class="swipe-item">
                    <img class="swipe-item-img"
                         :src="item.carousel_url" style="" alt="">
                </van-swipe-item>
            </van-swipe>
        </div>
        <!--        模块区-->
        <div class="modal-window">
            <div @click="modalJump(item.href_type,item.href_value)" v-for="(item,index) in modalList" :key="index"
                 :style="{width:`${item.proportion}%`}">
                <img :src="item.modal_url" class="image" alt="">
            </div>
        </div>

        <!--        推荐商品栏目-->
        <div>
            <van-card
                v-for="(item,index) in productList"
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
        </div>
        <!-- 页脚 -->
        <shop-tab :choose-item="0"></shop-tab>
    </div>
</template>

<script>
    import shopTab from "@/components/shopTab";

    export default {
        name: "Index",
        components: {
            shopTab: shopTab
        },
        data() {
            return {
                indexNotice: '',//首页滚动公告
                carouselList: [],//首页轮播组
                modalList: [],//首页模块组
                productList: [],//首页商品

                userInfo: {
                    nickname: '',
                    level_text: '',
                    headimgurl: ''
                },//用户信息
                unread: 0//未读信息

            };
        },
        mounted() {
            this.loadIndex();
            this.loadUserInfo();
        },
        methods: {
            //跳转到商品详情
            openProduct(id) {
                this.$router.push({name: 'ProductDetail', params: {loadId: id}});
            },
            //加载用户信息
            loadUserInfo() {
                this.$api('UserCenter/index').then(data => {
                    this.userInfo = data.user_info;
                    this.unread = data.unread_num;
                });
            },
            //加载首页数据
            loadIndex() {
                this.$api('Index/index').then(data => {

                    this.indexNotice = data.index_notice;
                    this.carouselList = data.carousel_list;
                    this.productList = data.product_list;
                    this.modalList = data.modal_list;
                });
            },
            openPage(urlName, urlParams) {
                this.$router.push({name: urlName, params: urlParams});
            },
            modalJump(type, value) {
                console.log(type);
                switch (type) {
                    case 'product':
                        this.$router.push({name: 'ProductDetail', params: {loadId: value || 0}});
                        break;
                    case 'cate':
                        this.$router.push({name: 'ProductList', params: {loadId: value || 0,type:1}});
                        break;
                    case 'video_area':
                        this.$router.push({name: 'Video'});
                        break;
                    case 'video':
                        this.$router.push({name: 'VideoDetail', params: {loadId: value || 0}});
                        break;
                    case 'vip_area':
                        this.$router.push({name: 'ProductList', params: {loadId:0,type:2}});
                        break;
                    case 'svip_area':
                        this.$router.push({name: 'ProductList', params: {loadId:0,type:3}});
                        break;
                }
            },

        }
    };
</script>

<style scoped>

    .modal-window {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
    }

    .swipe-item-img {
        width: 100%;
        border-radius: 10px;
        display: block;
    }

    .swipe-item {
        padding: 10px;
        box-sizing: border-box;
    }

    .carousel-window {

    }

    .search-window {
        display: table;
        background-color: rgba(171, 171, 171, 0.2);
        padding: 6px;
        border-radius: 15px;
        width: 100%;
        box-sizing: border-box;
    }

    .top-user-window {
        padding: 10px;
        background-color: #FFFFFF;
        color: #ececec;
    }

    .user-left {
        width: 45px;
        height: 45px;
    }

    .user-middle {
        padding: 0 10px;
    }

    .user-right {
        width: 70px;
    }
</style>
