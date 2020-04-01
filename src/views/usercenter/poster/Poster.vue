<template>
    <div>
        <img :src="url" class="poster" alt/>
    </div>
</template>
<script>
    export default {
        name: "Poster",
        mounted() {
            this.$toast.loading({
                message: '海报加载中',
                duration: 0,
                mask: true
            });
            this.getPoster();

        },
        data() {
            return {
                url: ""
            };
        },
        methods: {
            //加载海报
            getPoster() {
                this.$api('UserCenter/qrcode').then(data => {
                    console.log(data);
                    this.url = data.qrcode_url;
                    this.$toast.clear();
                });
            }
        }
    };
</script>
<style scoped>
    .poster {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
    }
</style>
