<template>
    <div>

        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="loadRecord"
        >
            <van-cell-group>
                <van-cell v-for="(item,index) in log" :key="index" :title="item.remark" :label="item.time">
                    <div><span :class="item.flow==0?'add':'reduce'">{{item.num_text}}</span></div>
                </van-cell>
            </van-cell-group>
        </van-list>
        <no-data :show="log.length"/>
    </div>
</template>

<script>
    import noData from '@/components/noData.vue'
    export default {
        name: "integralRecord",
        components:{
            noData
        },
        data() {
            return {
                log: [],
                loading: false,
                finished: false,
                page: 0
            }
        },
        mounted() {
            this.loadRecord();
        },
        methods: {
            //加载记录
            loadRecord() {
                this.page = this.page + 1;
                let params = {
                    integral_type: this.$route.params.type,
                    page: this.page
                };
                this.$api('UserCenter/integral_log', params).then(data => {
                    console.log(data);
                    let log = data.integral_log_list;
                    if (log.length < 10) {
                        this.finished = true;
                    }
                    for (let m in log) {
                        this.log.push(log[m]);
                    }
                    this.loading = false;
                });
            }
        }
    }
</script>

<style scoped>
    .add {
        color: #07c160;
    }

    .reduce {
        color: #ee0a24;
    }
</style>
