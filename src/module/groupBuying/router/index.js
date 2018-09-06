import Vue from 'vue'
import Router from 'vue-router'
import GroupIndex from '@/module/groupBuying/page/GroupIndex.vue'
import GroupDetails from '../page/GroupDetails'
import ProductDetails from '../page/ProductDetails'
import myComponyGroupBuy from '../page/company/myCroupBuy'
import uploadedProducts from '../page/company/uploadedProducts'
import companyProfile from '../page/company/companyProfile'
import enterpriseSeal from '../page/company/enterpriseSeal'
import typeOfEnterprise from '../page/company/typeOfEnterprise'
import mainBusiness from '../page/company/mainBusiness'
import registrationSuccess from '../page/company/registrationSuccess'
import Inventory from '../page/Inventory'
import BuyClassification from '../page/BuyClassification'
import GroupRequireDetails from '../page/hospital/GroupRequireDetails'
import groupEquipment from '../page/hospital/groupEquipment'
import perdictTime from '../page/hospital/perdictTime'
import uploadProduct from '../page/company/uploadProduct'
import selectBrand from '../page/company/selectBrand'
import productCategory from "../page/company/productCategory"
import selectModel from "../page/company/selectModel"

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
        path: '/ProDetails',
        name: '产品详情',
        component: ProductDetails
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
    }, {
        path: '/inventory',
        name: '产品清单',
        component: Inventory
    }, {
        path: '/classify',
        name: '团购分类',
        component: BuyClassification
    }, {
        path: '/GroupRequireDetails',
        name: '团购需求详情',
        component: GroupRequireDetails
    }, {
        path: '/groupEquipment',
        name: '设备团购',
        component: groupEquipment
    }, {
        path: '/perdictTime',
        name: '选择装机时间',
        component: perdictTime
    }, {
        path: '/uploadProduct',
        name: '上传团购产品（企业）',
        component: uploadProduct
    }, {
        path: '/selectBrand',
        name: '选择品牌',
        component: selectBrand
    }, {
        path: '/productCategory',
        name: '选择产品分类',
        component: productCategory
    }, {
        path: '/selectModel',
        name: '选择型号',
        component: selectModel
    }]
})

/* router.beforeEach((to, from, next) => {
    if (this.default.apps[0].$store) {
        this.default.apps[0].$store.commit("setTransition", "turn-on");
    }

    next()
}) */

export default router