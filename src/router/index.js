import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/login/login';
import Signup from '@/components/login/signup';
import Do from '@/components/Do/Do';
import Grade from '@/components/Grade/Grade';
import Home from '@/components/Home/Home';
import Setting from '@/components/Home/Setting';
import Record from '@/components/Record/Record';
Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Login',
            component: Login
        }, {
            path: '/signup',
            name: 'Signup',
            component: Signup
        }, {
            path: '/do',
            name: 'Do',
            component: Do
        }, {
            path: '/grade',
            name: 'Grade',
            component: Grade
        }, {
            path: '/home',
            name: 'Home',
            component: Home
        }, {
            path: '/setting',
            name: 'Setting',
            component: Setting
        }, {
            path: '/record',
            name: 'Record',
            component: Record
        }
    ]
});
