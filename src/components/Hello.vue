<template>
    <div class="hello">
           <login></login>
        <!-- sibling elements will be set to margin-left:240px for `fixed` and `is-fixed=true` -->

    </div>
</template>

<script>
    import login from './Login/Login.vue';
    export default {
        name: 'hello',
        data () {
            return {
                msg: 'Welcome to Your Vue.js App'
            };
        },
        components: {
            'login': login
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
    h1, h2
        font-weight normal

    ul
        list-style-type: none
        padding: 0

    li
        display inline-block
        margin 0 10px

    a
        color #42b983

</style>
