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
            isLoading: true,
            selectModelVal: ""
        }
    },
    activated() {

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
            console.log(NewmodelVal);
            this.selectModelVal = NewmodelVal;
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
        },
        TypeNavChange(val) {
            console.log(val)
            this.curTypeVal = val;
            this.changeModel(val);
            if (this.activeIndex >= 0) {
                this.$refs.swipeItem[this.activeIndex].shrink();
            }
        },
        ModelNavChange(val) {
            this.selectModelVal = val;
            this.showProduct(this.curTypeVal, val);
            if (this.activeIndex >= 0) {
                this.$refs.swipeItem[this.activeIndex].shrink();
            }
        },
        async getData() {
            console.log("走一下")
            _getData(
                "/server_pro/groupPurchaseCompanyProduct!request.action", {
                    userid: this.$route.query.userId || this.$USER_INFO.userid,
                    method: "getGroupPUrchaseCompanyProductList",
                    params: {
                        companyId: this.$route.query.id
                    }
                },
                data => {
                    console.log(data);
                    this.isLoading = false;
                    this.groupPurchaseTypeList = data.groupPurchaseTypeList;
                    if (data.groupPurchaseTypeList.length != 0) {
                        if (_.isEmpty(this.modelData)) {
                            this.typeData = _.map(data.groupPurchaseTypeList, "name");
                            this.curTypeVal = this.curTypeVal == "" ? this.typeData[0] : this.curTypeVal;
                            this.changeModel(
                                this.groupPurchaseTypeList[0].name,
                                this.groupPurchaseTypeList[0].productLineList[0].name
                            );
                        } else {
                            this.typeData = _.map(data.groupPurchaseTypeList, "name");
                            this.curTypeVal = _.isEmpty(
                                _.filter(this.typeData, o => {
                                    return o.slice(0, o.indexOf("(")) == this.curTypeVal.slice(0, this.curTypeVal.indexOf("("));
                                })) ? this.typeData[0] : _.filter(this.typeData, o => {
                                return o.slice(0, o.indexOf("(")) == this.curTypeVal.slice(0, this.curTypeVal.indexOf("("));
                            })[0];
                            const productLineList = _.filter(data.groupPurchaseTypeList, {
                                name: this.curTypeVal
                            })[0].productLineList;
                            _.isEmpty(
                                    _.filter(this.typeData, o => {
                                        return o.slice(0, o.indexOf("(")) == this.curTypeVal.slice(0, this.curTypeVal.indexOf("("));
                                    })) ?
                                this.changeModel(this.groupPurchaseTypeList[0].name, this.groupPurchaseTypeList[0].productLineList[0].name) :
                                this.changeModel(this.curTypeVal, _.isEmpty(_.filter(productLineList, o => {
                                    return o.name.slice(0, o.name.indexOf("(")) == this.selectModelVal.slice(0, this.selectModelVal.indexOf("("))
                                })) ? productLineList[0].name : _.filter(productLineList, o => {
                                    return o.name.slice(0, o.name.indexOf("(")) == this.selectModelVal.slice(0, this.selectModelVal.indexOf("("))
                                })[0].name)


                        }
                    }
                }
            ).then(() => {
                if (this.$refs.scroll)
                    this.$refs.scroll.refresh()
            });
        }
    }
}



//打开原生自动定位功能
export const openNativeNav = {
    data() {
        return {
            responseData: "",
            responseDataObj: {}
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
                    this.responseDataObj = data;
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
                    index: index,

                },
                data => {

                    this.deleteCallback(data.id, data.index)
                }
            );
        },
        deleteCallback(id, index) {

            if (id != '' || id != -1) {
                this.$emit('delete_child_comment', id, index)

            } else {
                this.$emit("delete_commit", '', index);
            }

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
                    imageUrl: imageUrl
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