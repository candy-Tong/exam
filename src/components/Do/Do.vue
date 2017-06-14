<template>
    <div class="do-page">
        <link rel="stylesheet" href="//unpkg.com/iview/dist/styles/iview.css">
        <div class="exam-header">
            <div @click="back">
                <span class="icon-arrow_lift"></span>
                <span class="back">放弃</span>
            </div>
            <div @click="submit">
                <span class="icon-check" style="font-weight: 600"></span>
                <span class="submit">提交</span>
            </div>
        </div>
        <div class="exam-body">
            <div class="question" v-for="(item,index) in question">
                <div>
                    <span class="order">{{index + 1}}</span>
                    <span class="sum">/ {{question.length}}</span>
                    <span class="title">{{item.title}}</span>
                </div>
                <span class="type">{{item.type === 1 ? "单" : "多"}}</span>

                <Radio-group v-model="answer[index]">
                    <Radio class="choices" :label="C_index" v-for="(choice,C_index) in item.choices" :key="C_index">
                        <span>{{choice}}</span>
                    </Radio>
                </Radio-group>
            </div>
        </div>
        <div class="timer">{{time}}</div>
    </div>
</template>

<script type="text/ecmascript-6">

    export default{
        data() {
            return {
                exam_id: NaN,
                user_id: NaN,
                question: [],
                second: 0,
                count: true,
                radio1: 0,
                answer: []
            };
        },
        methods: {
            back(){
                this.count = false;
                this.$router.go(-1);
            },
            submit(){
                this.$http.post('/exam/grade', {}, {
                    params: {
                        user_id: this.user_id,
                        exam_id: this.exam_id,
                        answer: JSON.stringify(this.answer),
                        time: this.second
                    }
                }).then(response => {
                    // get body data
                    let data = JSON.parse(response.body);
                    console.log(data);
                    if (data.status) {
                        console.log('提交成功');
                        this.count = false;
                        this.$router.push({
                            name: 'Grade',
                            params: {id: data.id, grade: data.grade, question: data.question, result: data.result}
                        });
                    } else {
                        console.log('提交失败');
                    }
                    console.log(data);
                }, response => {
                    // error callback
                    console.log(this.exam_id + '' + JSON.stringify(this.answer));
                    console.log('提交失败');
                });
            },
            initAnswer(){
                for (let i = 0; i < this.question.length; i++) {
                    this.answer[i] = NaN;
                }

            }
        },
        created() {
            let obj = this;
            this.user_id = localStorage.getItem('user_id');
            this.$http.get('/exam/question').then(response => {
                // get body data
                let data = JSON.parse(response.body);
                obj.question = data.question;
                obj.exam_id = data.exam_id;
                console.log(obj.question);
                obj.initAnswer();

            }, response => {
                // error callback
            });
            this.second = 0;
            this.timer = setTimeout(function time() {
                if (obj.count) {
                    obj.second++;
                    setTimeout(time, 1000);
                }
            }, 1000);

        },
        computed: {
            time(){
                return Math.floor(this.second / 60) + ':' + this.second % 60;
            }
        }
//        ,
//        watch: {
//            answer: {
//                handler(newValue, oldValue) {
//                    console.log(newValue);
//                },
//                deep: true
//            }
//        }
    };
</script>


<!--<style src="./iview.css" scoped></style>-->
<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/radio.styl"
    /*@import "../../../node_modules/iview/dist/styles/iview.css"*/
    .do-page
        width 100%
        .exam-header
            height 50px
            background-color #b6ddff
            opacity 0.8
            span
                font-size 18px
                line-height 50px
            .back, .icon-arrow_lift
                float left
                margin-left 15px
            .submit, .icon-check
                float right
                margin-right 15px
        .exam-body
            padding-bottom 50px
            .question
                margin-top 50px
                margin-left 30px
                color #464c5b
                .order
                    color #3399ff
                    font-size 25px
                .title, .sum
                    color #464c5b
                    font-size 18px
                .type
                    float right
                    margin-top 3px
                    margin-right 30px
                    font-size 28px
                    height 45px
                    width 45px
                    text-align center
                    line-height 45px
                    border solid 3px #9ea7b4
                    border-radius 45px
                    color #9ea7b4
                    opacity 0.5
                .choices
                    display block
                    font-size 17px
                    margin-left 2em
                    margin-top 10px

        .timer
            position fixed
            top 60px
            right 30px
            background-color #5cadff
            font-size 15px
            line-height 25px
            height 25px
            padding 0 8px
            border-radius 25px
            color white
            opacity 0.8

</style>
