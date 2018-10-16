import {
    _getData
} from '../../service/getData'
import {
    JsCallNativeMethods
} from '../../../../common/js/jsBridge';

//import noData from '../../components/noData/noData'



export const getProductList = {
    data() {
        return {
            typeData: [],
            modelData: [],
            swipeData: [{

            }],
            groupPurchaseTypeList: [],
            curTypeVal: "",
            activeIndex: -1, //控制滑动删除按钮唯一位置
            isLoading: true
        }
    },
    activated() {
        this.getData()
    },
    methods: {
        async changeModel(typeVal, modelVal) {
            //处理产品线函数
            const productLineList = _.filter(this.groupPurchaseTypeList, {
                name: typeVal
            })[0].productLineList;
            const NewmodelVal = modelVal ? modelVal : productLineList[0].name;

            this.modelData = await _.map(productLineList, "name");
            console.log(modelVal);
            this.showProduct(typeVal, NewmodelVal);
            console.log(typeVal, this.modelData);
        },
        async showProduct(typeVal, modelVal) {
            const groupPurchaseTypeList = _.filter(this.groupPurchaseTypeList, {
                name: typeVal
            });
            console.log(groupPurchaseTypeList, typeVal, modelVal);

            this.swipeData = _.filter(
                groupPurchaseTypeList[0].productLineList, {
                    name: modelVal
                }
            )[0].productList;

            console.log(this.swipeData);
            // await this.changeModel(typeVal);
        },
        TypeNavChange(val) {
            // this.showProduct(val);
            console.log(val)
            this.curTypeVal = val;
            this.changeModel(val);
            if (this.activeIndex >= 0) {
                this.$refs.swipeItem[this.activeIndex].shrink();
            }
        },
        ModelNavChange(val) {
            this.showProduct(this.curTypeVal, val);
            if (this.activeIndex >= 0) {
                this.$refs.swipeItem[this.activeIndex].shrink();
            }
        },
        getData() {
            _getData(
                "/server_pro/groupPurchaseCompanyProduct!request.action", {
                    method: "getGroupPUrchaseCompanyProductList",
                    params: {
                        companyId: this.$route.query.id
                    }
                },
                data => {
                    console.log(data);
                    this.isLoading = false
                    if (data.groupPurchaseTypeList.length != 0) {
                        this.groupPurchaseTypeList = data.groupPurchaseTypeList;
                        this.typeData = _.map(data.groupPurchaseTypeList, "name");
                        this.curTypeVal = this.groupPurchaseTypeList[0].name;
                        this.changeModel(
                            this.groupPurchaseTypeList[0].name,
                            this.groupPurchaseTypeList[0].productLineList[0].name
                        );
                    }
                }
            );
        }
    }
}



//打开原生自动定位功能
export const openNativeNav = {
    data() {
        return {
            responseData: ""
        }
    },

    methods: {
        openNative() {
            JsCallNativeMethods(
                "navNativePage", {
                    actionName: "selectAddressPage",
                    isForResult: true
                },
                data => {
                    if (data.provinceName == data.cityName) {
                        this.responseData = data.cityName;
                    } else {
                        this.responseData = `${data.provinceName}·${
                              data.cityName
                          }`;
                    }
                }
            );
        }

    }
}

//打开原生地图页面

export const ToNativeMap = {
    methods: {
        toNativeMapPage(value) {
            JsCallNativeMethods(
                "navNativePage", {
                    actionName: "navigationLocationPage",
                    isForResult: false,
                    doubleLatitude: value.lat,
                    doubleLongitude: value.lng,
                    title: value.address || value.hospitalName,
                    address: value.addr || value.province
                },
                data => {}
            );
        }
    }
}

//原生评论详情页

export const toNativeCommentDetails = {
    methods: {
        toNativeCommentDetails(id, index, type = 21) {
            JsCallNativeMethods(
                "navNativePage", {
                    actionName: 'CommonDiscuzz',
                    type: type,
                    id: id,
                    index: index
                },
                data => {}
            );
        }
    }
}

//原生个人主页
export const friendInfo = {
    methods: {
        friendInfo(userId) {
            JsCallNativeMethods(
                "navNativePage", {
                    actionName: 'friendInfo',
                    userId: userId,
                    id: userId
                },
                data => {}
            );
        }
    }
}

//打赏

export const moreOpetationReward = {
    methods: {
        moreOpetationReward(id, type = 23) {
            JsCallNativeMethods(
                "webInvokeNative", {
                    method: 'moreOpetationReward',
                    id: id,
                    type: type,
                    moduleActionCode: 'PURCHASECOMMENTREWARD'
                },
                data => {}
            );
        }
    }
}

//金币动画

export const goldCoinAnimation = {
    methods: {
        goldCoinAnimation(num) {
            JsCallNativeMethods(
                "webInvokeNative", {
                    method: 'goldCoinAnimation',
                    goldCoinNum: num
                },
                data => {}
            );
        }
    }
}

//私信

export const directMessages = {
    methods: {
        directMessages(userName, userId, imageUrl) {
            JsCallNativeMethods(
                "navNativePage", {
                    actionName: 'directMessages',
                    userName: userName,
                    userId: userId,
                    id: userId,
                    name: userName,
                    imageUrl: 'http://60.195.252.86:8080/server/upload/1490039174242.jpg'
                },
                data => {}
            );
        }
    }
}

//轮播
export const toNativeBanner = {
    methods: {
        toNativeBanner(val) {
            console.log(val)
            JsCallNativeMethods(
                'webInvokeNative', {
                    method: 'toNativeBanner',
                    id: val.id,
                    name: val.name ? val.name : '',
                    img: val.img,
                    linkedType: val.linkedType,
                    linkedId: val.linkedId,
                    linkedUrl: val.linkedUrl
                }, data => {

                }
            )
        }
    }
}