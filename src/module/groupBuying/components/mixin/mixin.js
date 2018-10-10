import {
    _getData
} from '../../service/getData'
import {
    JsCallNativeMethods
} from '../../../../common/js/jsBridge';

export const getProductList = {
    data() {
        return {
            typeData: [],
            modelData: [],
            swipeData: [{
                item: {
                    id: "3646653877",
                    name: "还不是因为你长得不好看",
                    desc: "伤感：歌词再狠，也抵不过现实伤人",
                    imgurl: "http://p.qpic.cn/music_cover/MhQ4bJBPt3Yt5icXyBGNhyPJnE9O51CqaN72iaDgvFmDKaia12UFhU5uQ/600?n=1"
                }
            }],
            groupPurchaseTypeList: [],
            curTypeVal: "",
            activeIndex: -1 //控制滑动删除按钮唯一位置
        }
    },
    activated() {
        _getData(
            "/server_pro/groupPurchaseCompanyProduct!request.action", {
                method: "getGroupPUrchaseCompanyProductList",
                params: {
                    companyId: this.$route.query.id
                }
            },
            data => {
                console.log(data.groupPurchaseTypeList);
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
            console.log(value);
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