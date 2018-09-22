import { _getData } from '../../service/getData'
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
    created() {
        _getData(
            "/server_pro/groupPurchaseCompanyProduct!request.action", {
                method: "getGroupPUrchaseCompanyProductList",
                params: {
                    companyId: "1"
                }
            },
            data => {
                console.log(data.groupPurchaseTypeList);
                this.groupPurchaseTypeList = data.groupPurchaseTypeList;
                this.typeData = _.map(data.groupPurchaseTypeList, "name");
                this.curTypeVal = this.groupPurchaseTypeList[0].name;
                this.changeModel(
                    this.groupPurchaseTypeList[0].name,
                    this.groupPurchaseTypeList[0].productLineList[0].name
                );
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