<template>
    <div class="home-page">
        <div class="user-wrapper">
            <img :src="avatar" alt="" class="avatar">
            <span class="username">{{username}}</span>
            <span class="rank">等级: {{rank}}</span>
        </div>
        <div class="line-item" @click="doExam">
            <span class="icon-book"></span>
            <span class="exam">模拟考试</span>
        </div>
        <div class="line-item" @click="record">
            <span class="icon-clock2"></span>
            <span class="record">考试记录</span>
        </div>
        <div class="line-item" @click="setting">
            <span class="icon-cog2"></span>
            <span class="setting">个人设置</span>
        </div>

        <div class="line-item" @click="exit">
            <span class="icon-close"></span>
            <span class="exit">退出</span>
        </div>

    </div>
</template>

<script type="text/ecmascript-6">
    export default{
        data(){
            return {
                user_id: NaN,
                username: 'username',
                rank: 1,
                avatar: ''
            };
        },
        methods: {
            exit(){
                this.$router.push({
                    name: 'Login'
                });
            },
            setting(){
                this.$router.push({
                    name: 'Setting'
                });
            },
            doExam(){
                this.$router.push({
                    name: 'Do'
                });
            },
            record(){
                this.$router.push({
                    name: 'Record'
                });
            }
        },
        beforeCreate() {
            let user_id = localStorage.getItem('user_id');
            this.user_id = user_id;
            let obj = this;
            this.$http.get('/exam/home?user_id=' + user_id).then(response => {
                // get body data
//                let data = JSON.parse(response.body);
//                obj.user = data.res;\

                let data = JSON.parse(response.body);
                console.log(data);
                obj.username = data.username;
                obj.rank = data.rank;
                obj.avatar = data.avatar;

                console.log(response);
            }, response => {
                // error callback
            });
        },
        computed: {}
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .home-page
        text-align center
        color #2d8cf0
        font-size 20px
        .user-wrapper
            margin-top 50px
            padding-bottom 50px
            border-bottom 1px solid #bbbec4
            overflow hidden
            .avatar
                margin-left 50px
                float left
                width 70px
                height 70px
                border-radius 70px
            .username
                margin-left 20px
                float left
                font-size 25px
                line-height 70px
            .rank
                margin-left 20px
                float left
                font-size 17px
                line-height 70px
        .line-item
            width 160px
            margin 35px auto
            clear both
            overflow hidden
            .icon-book, .icon-clock2, .icon-cog2
                display inline-block
                float left
                font-size 60px
                margin 10px 20px 10px 0
                color #5cadff
            .icon-close
                display inline-block
                float left
                font-size 40px
                margin 10px 10px 10px 0
                color #80848f
            .exam, .record, .setting
                float left
                line-height 80px
            .exit
                float left
                color #80848f
                line-height 60px
            &:last-child
                width 90px

</style>
