import Vue from 'vue'
import Router from 'vue-router'
import GroupIndex from '@/module/groupBuying/page/GroupIndex.vue'
import GroupDetails from '../page/GroupDetails'
Vue.use(Router)

const router = new Router({
    routes: [{
        path: '/',
        search: true,
        component: GroupIndex
    }, {
        path: '/Details',
        name: '团购详情',
        component: GroupDetails
    }]
})

/* router.beforeEach((to, from, next) => {
    if (this.default.apps[0].$store) {
        this.default.apps[0].$store.commit("setTransition", "turn-on");
    }

    next()
}) */

export default router