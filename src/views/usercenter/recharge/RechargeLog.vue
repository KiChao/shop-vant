<template>
    <div>
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="loadRecord"
        >
            <van-cell-group>
                <van-cell v-for="(item,index) in log" :key="index" :title="`充值单号：${item.recharge_no}`" :label="item.time">
                    <div><span class="add">{{item.recharge_num}}</span></div>
                </van-cell>
            </van-cell-group>
        </van-list>
    </div>
</template>

<script>
    export default {
        name: "RechargeLog",
        data(){
            return{
                log: [],
                loading: false,
                finished: false,
                page: 0
            }
        },
        mounted() {
            this.loadLog();
        },
        methods: {
            //充值记录
            loadLog() {
                this.page = this.page + 1;
                let params = {
                    page: this.page
                };
                this.$api('Recharge/record',params).then(data => {
                    console.log(data);
                    let log = data.recharge_record_list;
                    if (log.length < 10) {
                        this.finished = true;
                    }
                    for (let m in log) {
                        this.log.push(log[m]);
                    }
                    this.loading = false;
                })
            }
        }
    }
</script>

<style scoped>
    .add {
        color: #07c160;
    }
</style>
