<template>
    <div class="grade-page">
        <link rel="stylesheet" href="//unpkg.com/iview/dist/styles/iview.css">

        <i-circle :percent="grade" class="show-grade" :size="200">
            <span class="demo-i-circle-inner" style="font-size:24px">{{grade}}分</span>
        </i-circle>

        <Card style="width:350px" class="result">
            <p slot="title">得分情况</p>
            <ul>
                <li v-for="(item,index) in question" class="result-item">
                    <span class="question">{{ item.title }}</span>


                    <span class="grade">{{result[index] ? item.value : 0}}</span>
                    <span :class="result[index]?'icon-checkmark2':'icon-close'"></span>
                    <!--<span class="answer">{{item.answerList[0]}}</span>-->

                </li>
            </ul>
        </Card>


        <span class="back" @click="back">返回</span>
    </div>
</template>

<script type="text/ecmascript-6">
    export default{
        data(){
            return {
                id: NaN,
                grade: 0,
                question: [],
                result: []
            };
        },
        methods: {
            back(){
                this.count = false;
                this.$router.push({
                    name: 'Home'
                });
            }
        },
        created() {
            this.id = this.$route.params.id;
            this.question = this.$route.params.question;
            this.result = this.$route.params.result;
            let grade = this.$route.params.grade;

            let inc = true;
            let obj = this;
            setTimeout(function add() {
                if (inc) {
                    obj.grade += 10;
                    if (obj.grade <= grade) {
                        setTimeout(add, 50);
                    } else {
                        obj.grade = grade;
                        inc = false;
                    }
                }
            }, 50);
        },
        computed: {
            answer(){
                let answer = [];
                let choose;
                for (let i = 0; i < this.question.length; i++) {
                    // 单选题
                    if (this.question[i].type === 1) {
                        switch (this.question[i].answer) {
                            case 1:
                                choose = 'A';
                                break;
                            case 2:
                                choose = 'B';
                                break;
                            case 3:
                                choose = 'C';
                                break;
                            case 4:
                                choose = 'D';
                                break;
                        }
                        answer.push(choose);
                    } else if (this.question[i].type === 2) {
                        let answers = [];
                        for (let j = 0; j < this.question[i].answer; j++) {
                            switch (this.question[i].answer[j]) {
                                case 1:
                                    choose = 'A';
                                    break;
                                case 2:
                                    choose = 'B';
                                    break;
                                case 3:
                                    choose = 'C';
                                    break;
                                case 4:
                                    choose = 'D';
                                    break;
                            }
                            answers.push(choose);
                        }
                        answer.push(answers);
                    }
                }
                return answer;
            }
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .grade-page
        text-align center
        .show-grade
            margin-top 60px
            overflow hidden
        .result
            margin 30px auto 0 auto
            .result-item
                overflow hidden
                line-height 100%
                margin 8px 0
                .question
                    float left
                    max-width 50%
                    overflow hidden;
                    text-overflow ellipsis
                    white-space nowrap
                .answer
                    float right
                    width 3em
                    margin 0 0.5em
                .icon-checkmark2
                    float right
                    color #00cc66
                    margin 0 0.5em
                .icon-close
                    float right
                    color #ff3300
                    margin 0 0.5em
                .grade
                    width 2em
                    float right

        .back
            display inline-block
            font-size 20px
            line-height 40px
            width 50%
            border 2px solid #d7dde4
            border-radius 40px
            margin-top 30px


</style>
