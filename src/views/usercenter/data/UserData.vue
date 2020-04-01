<template>
    <div>
        <div class="default-window text-right">

        </div>
        <div class="default-window text-center">
            <img :src="formData.headimgurl" class="head" alt="">
        </div>
        <div class="default-window text-center">
            <span style="font-size: 22px">{{formData.nickname}}</span>
        </div>
<!--        <div class="text-center font-gary" style="padding: 0 10px">
            <div><span>{{formData.level_text}} / {{formData.invest}}</span></div>
            <div><span>推广代号：{{formData.sn}}</span></div>
        </div>-->
        <van-cell-group title="支付宝信息">
            <van-field label="支付宝账号" v-model="formData.ali_pay" placeholder="用于提现"/>
            <van-field label="支付宝姓名" v-model="formData.real_name" placeholder="用于提现,请与真实姓名匹配"/>
        </van-cell-group>
        <van-cell-group title="银行卡信息">
            <van-field label="银行名称" v-model="formData.bank_name" placeholder="如:工商银行"/>
            <van-field label="持有人姓名" v-model="formData.bank_user" placeholder="银行卡持有人必须正确"/>
            <van-field label="银行卡号码" v-model="formData.bank_account" placeholder="银行卡号码用于提现"/>
        </van-cell-group>

        <div class="default-window">
            <van-button @click="save()" type="danger" block round>保存</van-button>
        </div>

    </div>
</template>

<script>
    export default {
        name: "UserData",
        data() {
            return {
                nickname: 'tobeyour1004',

                userDetail: {},
                formData: {}
            }
        },
        mounted() {

            this.loadUserCenter();
        },
        methods: {

            //加载个人资料
            loadUserCenter() {
                this.$api('UserData/index').then(data => {
                    console.log(data);
                    this.formData = data.user_data;
                });
            },
            // 保存个人资料
            save() {
                this.$api('UserData/save', this.formData).then(data => {
                    this.$toast.success('保存成功');
                });
            }
        }
    }
</script>

<style scoped>
    .head {
        width: 100px;
        height: 100px;
        border-radius: 100%;
    }
</style>
