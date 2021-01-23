<template>
    <div>
        <van-tabs sticky v-model="active">
            <van-tab title="提现操作">
                <div class="table default-window">
                    <div class="table-cell">
                        <span class="money">可提现额度</span>
                    </div>
                    <div class="table-cell text-right" style="vertical-align: bottom"><span style="font-weight: bold"
                                                                                            class="font-red">{{balance}}</span>
                        <span>元</span></div>
                </div>

                <van-radio-group v-model="payWay">
                    <van-cell-group>
                        <van-cell icon="alipay" :label="ali_pay==''?'请前往个人中心填写支付宝信息':ali_pay" title="支付宝" clickable @click="payWay = '1'">
                            <template #right-icon>
                                <van-radio checked-color="#ee0a24" name="1"/>
                            </template>
                        </van-cell>
                        <!-- <van-cell icon="wechat" title="微信" clickable @click="payWay = '2'">
                            <template #right-icon>
                                <van-radio checked-color="#ee0a24" name="2"/>
                            </template>
                        </van-cell> -->
                        <van-cell :label="bank_account==''?'请前往个人中心填写银行卡信息':bank_name+' '+bank_user+' '+bank_account"
                                  icon="card" title="银行卡" clickable @click="payWay = '3'">
                            <template #right-icon>
                                <van-radio checked-color="#ee0a24" name="3"/>
                            </template>
                        </van-cell>
                    </van-cell-group>
                </van-radio-group>
                <div class="blank"></div>
                <div class="default-window">
                    <span class="money">提现金额</span>
                </div>
                <div>
                    <van-cell-group>
                        <van-field
                            label="额度（元）"
                            left-icon="after-sale"
                            placeholder="请输入金额"
                            size="large"
                            type="number"
                            clearable
                            v-model="money"
                        />
                    </van-cell-group>

                </div>
                <div class="font-gary default-window">
                    <p>1.提现到账时间：两个小时内，具体到账时间以银行为准。</p>
                    <p>2.可提现金额=账户余额-在途资金。</p>
                    <p>在途资金=当日提现未到账的金额</p>
                    <p>若在非工作日前一天或非工作日期间进行提现，均在第二个工作日进行结算。</p>
                </div>
                <div class="default-window">
                    <van-button round @click="submitWithdraw" type="danger" block>确认提现</van-button>
                </div>
            </van-tab>
            <van-tab title="提现记录">
                <van-cell-group>
                    <van-cell v-for="(item,index) in logs" :key="index" :title="`申请提现 金额 ￥${item.withdraw_num}`" :label="item.time" >
                        <van-tag :type="logType[item.status]">{{logStatus[item.status]}}</van-tag>
                    </van-cell>
                </van-cell-group>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
    export default {
        name: "Wallet",
        data() {
            return {
                active:0,

                balance: 0,
                payWay: 0,
                money: '',
                radio: 1,

                bank_name: '',
                bank_user: '',
                bank_account: '',
                ali_pay:'',

                logStatus: {
                    0: '申请中',
                    1: '已通过',
                    2: '被拒绝'
                },
                logType: {
                    0: 'primary',
                    1: 'success',
                    2: 'danger'
                },
                logs:[]
            }
        },
        mounted() {
            this.loadWallet();
            this.loadUserCenter();
            this.withdrawLog();
        },
        methods: {
            //加载提现记录
            withdrawLog() {
                this.$api('Withdraw/log').then(data => {
                    this.logs = data.withdraw_list;
                    console.log(data);
                });
            },
            //加载余额
            loadWallet() {
                this.$api('Withdraw/index').then(data => {
                    this.balance = data.balance;
                });
            },
            //加载个人资料
            loadUserCenter() {
                this.$api('UserData/index').then(data => {
                    let formData = data.user_data;
                    this.bank_name = formData.bank_name;
                    this.bank_user = formData.bank_user;
                    this.bank_account = formData.bank_account;
                    this.ali_pay = formData.ali_pay;
                });
            },
            //提交提现申请
            submitWithdraw() {
                if (this.payWay == 0) {
                    this.$notify('请选择提现方式');
                    return;
                }
                this.$dialog.confirm({
                    message: '是否提交提现申请？'
                }).then(() => {
                    let params = {
                        sum: this.money,
                        pay_type: this.payWay
                    };
                    this.$api('Withdraw/create', params).then(data => {
                        this.$toast.success('提现申请已提交');
                    });
                }).catch(() => {
                });
            }
        }
    }
</script>

<style scoped>
    .card-window {
        margin: 10px;
        border-radius: 7px;
        background-color: #333333;
        color: #EEEEEE;
        font-size: 20px;
        padding: 20px;

    }

    .money {
        font-size: 20px;
    }
</style>
