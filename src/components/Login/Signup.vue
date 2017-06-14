<template>
    <div class="signup-page">
        <img src="./timg.jpg" alt="" class="wallpaper">
        <div class="signup-wrapper">
            <div>
                <span class="icon-pig logo"></span>
                <input type="text" v-model="account" placeholder="请输入账号" class="account" @blur="checkAccount"
                       :class="[{pass:APass},{error:AError}]">
                <input type="password" v-model="password" placeholder="请输入密码" class="password"
                       :class="[{pass:PPass},{error:PError}]">
                <input type="password" v-model="password2" placeholder="请输入密码" class="password"
                       :class="[{error:P2Error},{pass:P2Pass&&PPass}]">
                <input type="button" value="注册" class="submit" @click="signup"
                       :class="{signup_pass:APass&&PPass&&P2Pass}"/>
                <span @click="back" class="back">返回</span>

            </div>
        </div>
    </div>

</template>

<script type="text/ecmascript-6">

    export default{
        data() {
            return {
                account: '',
                password: '',
                password2: '',
                P2Error: false,
                P2Pass: false,
                APass: false,
                AError: false,
                PPass: false,
                PError: false
            };
        },
        methods: {
            back(){
                this.count = false;
                this.$router.go(-1);
            },
            signup() {
                // POST /someUrl
                this.$http.post('/exam/signup', {}, {
                    params: {
                        account: this.account,
                        password: this.password
                    }
                }).then(response => {

                    // get body data
                    let data = response.body;
                    console.log(data);
                    if (this.APass && this.PPass && this.P2Pass) {
                        this.$router.push('/do');
                    }
                    localStorage.setItem('user_id', data.user_id);
//                    this.$router.push();
                }, response => {
                    // error callback
                });
            },
            checkAccount() {
                this.$http.get('/exam/signup', {
                    params: {account: this.account}
                }).then(response => {
                    // get body data
                    let data = JSON.parse(response.body);
                    console.log(data);
                    if (data.status) {
                        this.APass = true;
                        this.AError = false;
                    } else {
                        this.APass = false;
                        this.AError = true;
                    }
//                    this.$router.push();
                }, response => {
                    // error callback
                });
            }
        },
        watch: {
            password2(val, oldVal) {
                if (this.password === val) {
                    this.P2Error = false;
                    this.P2Pass = true;
                } else {
                    this.P2Error = true;
                    this.P2Pass = false;
                }
            },
            password(val, oldVal) {
                if (val.length < 6) {
                    this.PError = true;
                    this.PPass = false;
                } else {
                    this.PError = false;
                    this.PPass = true;
                }

            }
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/icon.styl"

    .signup-page
        position fixed
        overflow hidden
        font-size 20px
        color #657180
        .wallpaper
            position fixed
            width 100%
            height 100%
            z-index 1
        .signup-wrapper
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
            .pass
                border-bottom 2px rgba(92, 173, 255, 0.7) solid
            .error
                border-bottom 2px rgba(255, 51, 0, 0.7) solid
            .submit
                display block
                background-color rgba(255, 255, 255, 0)
                margin 30px auto
                width 10em
                color #657180
                line-height 40px
                border-radius 40px
                border 2px rgba(255, 255, 255, 0.7) solid

            .signup_pass
                border 2px rgba(92, 173, 255, 0.7) solid
            .back
                display block
                margin 0 auto 100px auto
                text-align center


</style>
