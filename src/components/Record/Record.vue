<template>
    <div class='record-page'>

        <div class='header'>
            <span class='icon-clock2'></span>
            <span class='title'>个人设置</span>
        </div>
        <Table border :columns='columns' :data='data' class='record-table'></Table>

        <span class='icon-close' @click='back'></span>
    </div>
</template>

<script type='text/ecmascript-6'>
    export default {
        data () {
            return {
                columns: [
                    {
                        title: '日期',
                        key: 'date',
                        sortable: true
                    },
                    {
                        title: '分数',
                        key: 'grade',
                        sortable: true,
                        filters: [
                            {
                                label: '优秀',
                                value: 1
                            }, {
                                label: '良好',
                                value: 2
                            }, {
                                label: '合格',
                                value: 3
                            },
                            {
                                label: '不合格',
                                value: 4
                            }
                        ],
                        filterMultiple: false,
                        filterMethod (value, row) {
                            if (value === 1) {
                                return row.grade >= 90;
                            } else if (value === 2) {
                                return row.grade < 90 && row.grade >= 80;
                            } else if (value === 3) {
                                return row.grade >= 60;
                            } else if (value === 4) {
                                return row.grade < 60;
                            }
                        }

                    },
                    {
                        title: '用时',
                        key: 'time',
                        sortable: true
                    }
                ],
                data: []
            };
        },
        methods: {
            back(){
                this.count = false;
                this.$router.go(-1);
            },
            format(timestamp){
                let time = new Date(timestamp);
                let year = time.getFullYear();
                let month = (time.getMonth() + 1) > 9 && (time.getMonth() + 1) || ('0' + (time.getMonth() + 1));
                let date = time.getDate() > 9 && time.getDate() || ('0' + time.getDate());
                let hour = time.getHours() > 9 && time.getHours() || ('0' + time.getHours());
                let minute = time.getMinutes() > 9 && time.getMinutes() || ('0' + time.getMinutes());
//                let second = time.getSeconds() > 9 && time.getSeconds() || ('0' + time.getSeconds());
                let YmdHis = year + '-' + month + '-' + date + ' ' + ('0' + hour).substr(-2) + ':' + ('0' + minute).substr(-2);
                return YmdHis;
            }
        },
        created(){
//            let obj = this;
            this.user_id = localStorage.getItem('user_id');
            this.$http.get('/exam/record?user_id=' + this.user_id).then(response => {
                // get body data
                let data = JSON.parse(response.body);
                if (data.status) {
                    for (let i = 0; i < data.result.length; i++) {
                        let record = {};
                        let timestamp3 = data.result[i].date;
                        record.date = this.format(timestamp3 * 1000);
                        record.grade = data.result[i].grade;
                        record.time = ('0' + Math.floor(data.result[i].time / 60)).substr(-2) + ':' + ('0' + data.result[i].time % 60).substr(-2);
                        console.log(record);
                        this.data.push(record);
                    }
                }
            }, response => {
                // error callback
            });
        }
    };
</script>

<style lang='stylus' rel='stylesheet/stylus'>
    .record-page
        text-align center
        .header
            margin-top 10%
            margin-bottom 10%
            .icon-clock2
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
        .record-table
            margin 10px 0
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
