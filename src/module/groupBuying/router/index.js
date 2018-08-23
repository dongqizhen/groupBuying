import Vue from 'vue'
import Router from 'vue-router'
import GroupIndex from '@/module/groupBuying/page/GroupIndex.vue'
Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: '团购',
        component: GroupIndex
    }]
})