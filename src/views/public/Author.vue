<template>
    <div></div>
</template>

<script>
    export default {
        name: "Author",
        created() {
            this.$toast.loading({
                mask: true,
                message: '登录中...',
                duration: 0,
            });
        },
        methods: {
            //获取网址上的code
            GetQueryString(name) {
                let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                let r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            },
        },
        mounted() {
            let code = this.GetQueryString('code');
            // 检测会员有没有登录
            if (code == '' || code == null || code == 'undefined') {

                let sn = this.GetQueryString('sn');
                if (sn) {
                    this.$toolBox.setCookie('sn', sn, 8760);
                }
                if (!this.$toolBox.getCookie('token')) {
                    console.log('跳转微信授权');
                    let ua = window.navigator.userAgent.toLowerCase();
                    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                        console.log('浏览器验证成功');
                        // 跳转到微信授权页面
                        let url = 'http://m.xkq.vxyz.cn/#/Author';
                        window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxfac95bd0c7bfa56f&redirect_uri=' + encodeURIComponent(url) + '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
                        // window.open('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx2368efa263120b88&redirect_uri=' + encodeURIComponent(url) + '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect');

                    }
                } else {
                    // 如果有token 但是vuex中没有用户登录信息则获取微信用户信息
                    let params = {
                        token: this.$toolBox.getCookie('token'),
                        sn: this.$toolBox.getCookie('sn'),
                    };
                    console.log('有token1');
                    this.$api('UserCenter/index', params).then(data => {
                        console.log(data);
                        this.$store.state.sn = data.sn;
                        this.$store.state.subscribe = data.subscribe;
                        this.$store.state.isLoginLing = true;
                        let toUrl = this.$toolBox.getCookie('beforeLoginUrl');
                        this.$toast.clear();
                        this.$router.push({path: toUrl});
                    });

                }
            } else {
                //微信授权回调，根据code调用微信登陆接口，返回用户信息
                let params = {
                    code: code,
                    sn: this.$toolBox.getCookie('sn'),
                };
                console.log('有token2');
                this.$api('Public/wx_login', params).then(data => {
                    console.log(data);
                    this.$store.state.sn = data.sn;
                    this.$store.state.subscribe = data.subscribe;
                    this.$store.state.isLoginLing = true;
                    this.$toolBox.setCookie('token', data.token, 8760);
                    let toUrl = this.$toolBox.getCookie('beforeLoginUrl');
                    console.log(toUrl);
                    this.$toast.clear();
                    this.$router.push({path: toUrl});
                }).catch((error) => {
                });
            }
        },
    }
</script>

<style scoped>

</style>
