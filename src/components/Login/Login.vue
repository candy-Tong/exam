<template>
    <div class="login-page">
        <img src="./timg.jpg" alt="" class="wallpaper">
        <div class="login-wrapper">
            <div>
                <span class="icon-pig logo"></span>
                <input type="text" v-model="account" placeholder="请输入账号" class="account">
                <input type="password" v-model="password" placeholder="请输入密码" class="password">
                <input type="button" value="登录" class="submit" @click="login"/>
                <router-link to="/signup" class="signup">注册</router-link>

            </div>
        </div>


    </div>

</template>

<script type="text/ecmascript-6">

    export default{
        data() {
            return {
                account: '',
                password: ''
            };
        },
        methods: {
            login() {
                // POST /someUrl
                this.$http.get('/exam/login?account=' + this.account + '&password=' + this.password).then(response => {

                    // get body data
                    let data = response.body;
                    data = JSON.parse(data);
                    console.log(data);
                    if (data.msg === 'success') {
                        this.$router.push('/home');
                    } else if (data.msg === 'fail') {
                        console.log('fail to login');
                    }
                    localStorage.setItem('user_id', data.user_id);
                }, response => {
                    // error callback
                });
            }
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/icon.styl"

    .login-page
        position fixed
        overflow hidden
        font-size 20px
        color #657180
        .wallpaper
            position fixed
            width 100%
            height 100%
            z-index 1
        .login-wrapper
            position fixed
            display: flex
            justify-content center
            align-items center
            z-index 2
            width 100%
            height 100%
            background rgba(255, 255, 255, 0.2)
            .logo
                display block
                font-size 100px
                color #ffffff
                opacity 0.8
                margin 0 auto
                width 100px
            .account, .password
                display block
                background-color rgba(255, 255, 255, 0)
                margin 30px auto
                width 13em
                line-height 30px
                border-bottom 2px rgba(255, 255, 255, 0.7) solid
                text-align center
            .submit
                display block
                background-color rgba(255, 255, 255, 0)
                margin 30px auto
                width 10em
                color #657180
                line-height 40px
                border-radius 40px
                border 2px rgba(255, 255, 255, 0.7) solid
            .signup
                display block
                margin 0 auto 100px auto
                text-align center


</style>
