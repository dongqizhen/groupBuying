import Vue from 'vue'
import Router from 'vue-router'
import GroupIndex from '@/module/groupBuying/page/GroupIndex.vue'
import GroupDetails from '../page/GroupDetails'
import myComponyGroupBuy from '../page/company/myCroupBuy'
import uploadedProducts from '../page/company/uploadedProducts'
import companyProfile from '../page/company/companyProfile'
import enterpriseSeal from '../page/company/enterpriseSeal'
import typeOfEnterprise from '../page/company/typeOfEnterprise'
import mainBusiness from '../page/company/mainBusiness'
import registrationSuccess from '../page/company/registrationSuccess'

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
    }, {
        path: '/myComponyGroupBuy',
        name: '我的团购（企业）',
        component: myComponyGroupBuy
    }, {
        path: '/uploadedProducts',
        name: '上传的产品',
        component: uploadedProducts
    }, {
        path: '/companyProfile',
        name: '企业介绍',
        component: companyProfile

    }, {
        path: '/enterpriseSeal',
        name: '企业团购报名',
        component: enterpriseSeal
    }, {
        path: '/typeOfEnterprise',
        name: '选择企业类型',
        component: typeOfEnterprise
    }, {
        path: '/mainBusiness',
        name: '选择主营业务',
        component: mainBusiness
    }, {
        path: '/registrationSuccess',
        name: '报名成功（企业）',
        component: registrationSuccess
    }]
})

/* router.beforeEach((to, from, next) => {
    if (this.default.apps[0].$store) {
        this.default.apps[0].$store.commit("setTransition", "turn-on");
    }

    next()
}) */

export default router