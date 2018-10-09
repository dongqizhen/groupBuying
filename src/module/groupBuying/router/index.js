import Vue from 'vue'
import Router from 'vue-router'
const GroupIndex = () =>
    import ('@/module/groupBuying/page/GroupIndex.vue')
const GroupDetails = () =>
    import ('../page/GroupDetails')
const myComponyGroupBuy = () =>
    import ('../page/company/myCroupBuy')
const myHospitalGroupBuy = () =>
    import ('../page/hospital/myCroupBuy')
const uploadedProducts = () =>
    import ('../page/company/uploadedProducts')
const companyProfile = () =>
    import ('../page/company/companyProfile')
const enterpriseSeal = () =>
    import ('../page/company/enterpriseSeal')
const typeOfEnterprise = () =>
    import ('../page/company/typeOfEnterprise')
const registrationSuccess = () =>
    import ('../page/company/registrationSuccess')
const mainBusiness = () =>
    import ('../page/company/mainBusiness')
const groupEquipment = () =>
    import ('../page/hospital/groupEquipment')
const perdictTime = () =>
    import ('../page/hospital/perdictTime')
const mainParams = () =>
    import ('../page/hospital/mainParams')
const uploadProduct = () =>
    import ('../page/company/uploadProduct')
const selectBrand = () =>
    import ('../page/company/selectBrand')
const productCategory = () =>
    import ('../page/company/productCategory')
const GroupRequireDetails = () =>
    import ('../page/hospital/GroupRequireDetails')
const selectModel = () =>
    import ('../page/company/selectModel')
const demandTable = () =>
    import ('../page/hospital/demandTable')
const demandTableDetaile = () =>
    import ('../page/hospital/demandTableDetaile')
const hospitalProfile = () =>
    import ('../page/hospital/hospitalProfile')
const hospitalSeal = () =>
    import ('../page/hospital/hospitalSeal')
const submitGroupDemand = () =>
    import ('../page/hospital/submitGroupDemand')
const groupDemand = () =>
    import ('../page/groupDemand/groupDemand')
const groupDemandDetails = () =>
    import ('../page/groupDemand/groupDemandDetails')
const groupClassification = () =>
    import ('../page/product/groupClassification')
const groupInventory = () =>
    import ('../page/product/groupInventory')
const productDetails = () =>
    import ('../page/product/productDetails')
const searchIndex = () =>
    import ('../page/search/searchIndex')



Vue.use(Router)

const router = new Router({
    mode: 'hash',
    routes: [{
            path: '/',
            search: true,
            name: '首页',
            component: GroupIndex
        }, {
            path: '/Details',
            name: '团购详情',
            component: GroupDetails
        },
        {
            path: '/productDetails',
            name: '产品详情',
            component: productDetails
        },
        {
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

        },
        {
            path: '/enterpriseSeal',
            name: '企业团购报名',
            component: enterpriseSeal
        },
        {
            path: '/hospitalSeal',
            name: '医院团购报名',
            component: hospitalSeal
        },
        {
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
            component: registrationSuccess,
            meta: {
                keepAlive: true
            }
        }, {
            path: '/groupInventory',
            name: '产品清单',
            component: groupInventory
        }, {
            path: '/groupClassification',
            name: '团购分类',
            component: groupClassification
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
            path: '/mainParams',
            name: '选择重要参数',
            component: mainParams
        }, {
            path: '/uploadProduct',
            name: '上传团购产品（企业）',
            component: uploadProduct,
            meta: {
                keepAlive: true
            }
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
            component: selectModel,
            meta: {
                // keepAlive: true
            }
        }, {
            path: '/myHospitalGroupBuy',
            name: '我的团购（医院）',
            component: myHospitalGroupBuy
        }, {
            path: '/demandTable',
            name: '团购需求表',
            component: demandTable
        }, {
            path: '/demandTableDetaile',
            name: '团购需求表详情',
            component: demandTableDetaile
        }, {
            path: '/hospitalProfile',
            component: hospitalProfile
        }, {
            path: '/submitGroupDemand',
            name: '提交团购需求 (医院)',
            component: submitGroupDemand
        }, {
            path: '/groupDemand',
            name: '团购需求',
            component: groupDemand
        }, {
            path: '/groupDemandDetails',
            name: '团购需求详情',
            component: groupDemandDetails
        }, {
            path: '/sda',
            name: '搜索',
            component: searchIndex
        }
    ],
    /* scrollBehavior(to, from, savedPosition) {
        console.log(to, from, savedPosition)
        if (savedPosition) {
            console.log(1)
            return { x: 0, y: 100 }
        } else {
            if (from.meta.keepAlive) {
                from.meta.savedPosition = document.body.scrollTop;
            }
            return {
                x: 0,
                y: to.meta.savedPosition || 0
            }
        }
    } */
})

/* router.beforeEach((to, from, next) => {
    if (this.default.apps[0].$store) {
        this.default.apps[0].$store.commit("setTransition", "turn-on");
    }

    next()
}) */

export default router