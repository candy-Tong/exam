<template>
    <div class="setting-page">

        <link rel="stylesheet" href="//unpkg.com/iview/dist/styles/iview.css">
        <div class="header">
            <span class="icon-cog2"></span>
            <span class="title">个人设置</span>
        </div>

        <Card style="width:320px" class="card">
            <div style="text-align:center">
                <img class="avatar" :src="avatar">
                <div class="rank">
                    <!--<span>{{account}}</span>-->
                    <span>等级: {{rank}}</span>
                </div>

                <Collapse v-model="board" accordion class="board">
                    <Panel name="1">
                        用户名: {{username}}
                        <p slot="content">
                        <Form ref="usernameForm" :model="usernameForm" :rules="usernameRule" inline>
                            <Form-item prop="username">
                                <Input type="text" v-model="usernameForm.username" placeholder="新的用户名"></Input>
                            </Form-item>

                            <Form-item>
                                <Button type="primary" @click="handleSubmit('usernameForm')">更改</Button>
                            </Form-item>
                        </Form>
                        </p>
                    </Panel>
                    <Panel name="2">
                        学院: {{college}}
                        <p slot="content">
                        <Form ref="collegeForm" :model="collegeForm" :rules="collegeRule" inline>
                            <Form-item prop="college">
                                <Input type="text" v-model="collegeForm.college" placeholder="学院"></Input>
                            </Form-item>

                            <Form-item>
                                <Button type="primary" @click="handleSubmit('collegeForm')">更改</Button>
                            </Form-item>
                        </Form>
                        </p>
                    </Panel>
                    <Panel name="3">
                        修改密码
                        <p slot="content">
                        <Form ref="passwordForm" :model="passwordForm" :rules="passwordRule" inline>
                            <Form-item prop="oldPassword">
                                <Input type="text" v-model="passwordForm.oldPassword" placeholder="旧密码"></Input>
                            </Form-item>

                            <Form-item prop="newPassword">
                                <Input type="text" v-model="passwordForm.newPassword" placeholder="新密码"></Input>
                            </Form-item>

                            <Form-item>
                                <Button type="primary" @click="handleSubmit('passwordForm')">更改</Button>
                            </Form-item>
                        </Form>
                        </p>
                    </Panel>
                </Collapse>

                <div class="tips">Tips: 点击选项展开修改个人信息</div>
            </div>

        </Card>
        <span class="icon-close" @click="back"></span>
    </div>
</template>

<script type="text/ecmascript-6">

    export default{
        data(){
            return {
                board: '1',
                user_id: 1,
                account: 'account',
                password: ['password', 'admin'],
                username: 'username',
                rank: 1,
                college: 'college',
                avatar: 'https://b-ssl.duitang.com/uploads/item/201202/25/20120225131321_Ve5E8.jpg',
                usernameForm: {
                    username: ''
                },
                usernameRule: {
                    username: {
                        required: true, message: '用户名不能为空'
                    }
                },
                collegeForm: {
                    college: ''
                },
                collegeRule: {
                    college: {
                        required: true, type: 'string', message: '学员不能为空'
                    }
                },
                passwordForm: {
                    oldPassword: '',
                    newPassword: ''
                },
                passwordRule: {
                    oldPassword: [
                        {required: true, type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur'}
                    ],
                    newPassword: [
                        {required: true, type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur'}
                    ]
                }
            };
        },
        created(){
            let user_id = localStorage.getItem('user_id');
            this.user_id = user_id;
            let obj = this;
            this.$http.get('/exam/setting?user_id=' + user_id).then(response => {

                let data = JSON.parse(response.body);
                console.log(data);
                obj.username = data.username;
                obj.account = data.account;
                obj.password = data.password;
                obj.rank = data.rank;
                obj.college = data.college;
                obj.avatar = data.avatar;

                console.log(response);
            }, response => {
                // error callback
            });
        },
        methods: {
            updateName(){
                let _this = this;
                this.$http.post('/exam/setting', {}, {
                    params: {
                        user_id: _this.user_id,
                        username: _this.usernameForm.username
                    }
                }).then(response => {

                    let data = JSON.parse(response.body);
                    console.log(data);
                    if (data.status) {
                        _this.username = _this.usernameForm.username;
                    }
                    console.log(response);
                }, response => {
                    // error callback
                });
            },
            updateCollege(){
                let _this = this;
                this.$http.post('/exam/setting', {}, {
                    params: {
                        user_id: _this.user_id,
                        college: _this.collegeForm.college
                    }
                }).then(response => {

                    let data = JSON.parse(response.body);
                    if (data.status) {
                        _this.college = _this.collegeForm.college;
                    }
                    console.log(response);
                }, response => {
                    // error callback
                });
            },
            updatePassword(){
                let _this = this;
                this.$http.post('/exam/setting', {}, {
                    params: {
                        user_id: _this.user_id,
                        password: _this.passwordForm.newPassword
                    }
                }).then(response => {

                    let data = JSON.parse(response.body);
                    console.log(data);
                    console.log(response);
                    if (data.status) {
                        _this.password = _this.passwordForm.newPassword;
                    }
                }, response => {
                    // error callback
                });
            },
            back(){
                this.count = false;
                this.$router.go(-1);
            },
            handleSubmit(name) {
                console.log(this.$refs);
                if (name === 'passwordForm' && this.password !== this.passwordForm.oldPassword) {
                    this.$Message.error('原密码错误!');
                    return;
                }
//                console.log(name);
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('提交成功!');
                        if (name === 'usernameForm') {
                            this.updateName();
                        } else if (name === 'collegeForm') {
                            this.updateCollege();
                        } else if (name === 'passwordForm') {
                            this.updatePassword();
                        }

                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                });

            }

        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .setting-page
        text-align center
        .header
            margin-top 10%
            margin-bottom 5%
            .icon-cog2
                font-size 50px
                color #5cadff
                vertical-align top
            .title
                display inline-block
                margin-left 10px
                font-size 20px
                line-height 50px
                height 50px
                vertical-align top
        .card
            display inline-block
            margin-bottom 100px
            overflow hidden
            .avatar
                display inline-block
                width 100px
                height 100px
                border-radius 100px
            .rank
                margin-bottom 20px
            .board
                text-align left
                border 1px solid #dddee1
                background-color #ffffff
            .input
                width 200px
            .tips
                margin 20px 0
        .icon-close
            display inline-block
            position fixed
            bottom 40px
            right 0
            left 0
            width 40px
            height 40px
            margin 0 auto
            font-size 40px

</style>
