<template>
    <div>
        <van-cell-group>
            <van-field
                v-model="message"
                rows="4"
                autosize
                label="建议内容"
                type="textarea"
                maxlength="200"
                placeholder="您的建议将对我们非常有用"
                show-word-limit
            />
            <van-cell title="评分">
                <van-rate
                    :value="value"
                    size="25"
                    color="#ee0a24"
                    void-color="#eee"
                    void-icon="star"
                    @change="onChange"
                />
            </van-cell>
        </van-cell-group>
        <div class="default-window">
            <van-button type="danger" @click="push()" round block>确定提交</van-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Complaint",
        data() {
            return {
                value: 5,
                message: ''
            }
        },
        methods: {
            onChange(event) {

                this.value = event;
            },
            push() {
                this.$dialog.confirm({
                    message: '是否提交您的意见？',
                    confirmButtonColor: '#ee0a24',
                }).then(() => {
                    this.$toast.success('提交成功');
                }).catch();
            }
        }
    }
</script>

<style scoped>

</style>
