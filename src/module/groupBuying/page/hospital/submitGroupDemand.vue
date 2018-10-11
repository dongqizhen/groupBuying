<template>
    <div class="container submitGroupDemand">
        <Header title="提交团购需求 (医院)"></Header>
        <div class="content">
            <div class="scroll-list-wrap">
            <cube-scroll ref="scroll">
            <div class="selectGroupMeeting">
                <basic-title title="选择团购大会" imgurl="../static/images/groupBuy.png">
                    <span slot="select">(必选项)</span>
                </basic-title>
                <div class="list_box">
                    <list-item v-for="(item,index) in groupUnderWayList" :isActive="current===index?true:false" v-on:changeIdx="getIndex" :index="index" :key="item.id" :dataValue="item" :disabled="true"></list-item>
                </div>
            </div>
            <div class="groupType">
                <basic-title title="团购需求类型" imgurl="../static/images/selectproject.png">
                    <span slot="select">(必选项)</span>
                </basic-title>
                <select-project-nav :editSelectValue="editSelectId" :come="editSelectId?'1':''"  v-on:selectObj="getItemObj" v-on:select-value="handleSelect"></select-project-nav>
            </div>
            <div class="productBasicInfromation">
                <basic-title :title="title" imgurl="../static/images/basicInformation.png">
                    <span slot="select">(必填项)</span>
                </basic-title>
                <group-demand-write-info :data="data" ref="groupDemandWriteInfo" :groupPurchaseId="this.submitData.groupPurchaseId" :groupType="this.groupItemObj" :groupPurchaseTypeId="submitData.groupPurchaseTypeId"></group-demand-write-info>
            </div>
            <x-button v-if="submitBtnStatus" type="primary" @click.native="submitBtnClick">提交团购需求表</x-button>
            <x-button v-else type="primary" show-loading>提交中</x-button>
             </cube-scroll>
           </div>
        </div>
    </div>
</template>

<script>
import Header from "../../components/header/header";
import listItem from "../../components/common/listItem";
import basicTitle from "../../components/common/basicTitle";
import selectProjectNav from "../../components/common/selectProjectNav";
import groupDemandWriteInfo from "../../components/common/groupDemandWriteInfo";
import { Group, XTextarea, XNumber, CellBox } from "vux";
import compress from "../../../../../static/js/compressImage";
import { mapMutations } from "vuex";
import { _getData } from "../../service/getData";
import _ from "lodash";
import { Toast } from "vant";
export default {
  data() {
    return {
      data: {},
      title: "",
      toastBrandText: "",
      toastPriceText: "",
      toastApplicationText: "",
      toastNumPriceText: "",
      toastParamText: "",
      toastIntroduceText: "",
      toastPredictTimeText: "",
      editSelectId: "",
      groupItemObj: {},
      productSort: {},
      current: null,
      submitBtnStatus: true,
      groupUnderWayList: [],
      submitData: {
        id: "",
        hospitalId: "",
        groupPurchaseId: "",
        groupPurchaseTypeId: "",
        productLine: "",
        brand: "",
        brandList: [],
        modelList: [],
        num: "",
        application: "",
        loadTime: "",
        price: "",
        introduce: "",
        installTime: "",
        deviceCheckNum: "",
        responseTime: "",
        maintenanceType: "",
        params: ""
      }
    };
  },
  components: {
    Header,
    listItem,
    basicTitle,
    selectProjectNav,
    Group,
    XTextarea,
    XNumber,
    CellBox,
    groupDemandWriteInfo
  },
  methods: {
    ...mapMutations([
      "setTransition",
      "SBTGProductSort",
      "HCTGProductSort",
      "SHTGProductSort",
      "XXHTGProductSort",
      "JRTGProductSort",
      "ZXTGProductSort",
      "SBTGProductBrandFirst",
      "SBTGProductBrandSecond",
      "SBTGProductBrandThird",
      "HCTGProductBrandFirst",
      "HCTGProductBrandSecond",
      "HCTGProductBrandThird",
      "SHTGProductBrand",
      "XXHTGProductBrand",
      "JRTGProductBrand",
      "ZXTGProductBrand",
      "SBTGProductModelFirst",
      "SBTGProductModelSecond",
      "SBTGProductModelThird",
      "HCTGProductModelFirst",
      "HCTGProductModelSecond",
      "HCTGProductModelThird",
      "SHTGProductModel",
      "XXHTGProductModel",
      "JRTGProductModel",
      "ZXTGProductModel",
      "SBTGPredictTime",
      "HCTGPredictTime",
      "SHTGPredictTime",
      "XXHTGPredictTime",
      "JRTGPredictTime",
      "ZXTGPredictTime",
      "SBTGMainParam",
      "HCTGMainParam",
      "SHTGMainParam",
      "XXHTGMainParam",
      "JRTGMainParam",
      "ZXTGMainParam"
    ]),
    submitBtnClick() {
      this.submitBtnStatus = false;
      console.log(this.$refs.groupDemandWriteInfo.info);
      if (this.$refs.groupDemandWriteInfo.info.productLineId == "") {
        Toast({ message: "请选择分类", duration: 1000 });
        this.submitBtnStatus = true;
        return;
      } else {
        this.$refs.groupDemandWriteInfo.info.productLine = JSON.stringify(
          this.$refs.groupDemandWriteInfo.info.productLine
        );
      }
      if (this.$refs.groupDemandWriteInfo.info.price == "") {
        Toast({ message: this.toastPriceText, duration: 1000 });
        this.submitBtnStatus = true;
        return;
      } else {
        if (
          !/^[0-9]+(.[0-9])?$/.test(this.$refs.groupDemandWriteInfo.info.price)
        ) {
          Toast({ message: this.toastNumPriceText, duration: 1000 });
          this.submitBtnStatus = true;
          return;
        }
      }
      if (this.groupItemObj.code != "SHTG") {
        if (this.$refs.groupDemandWriteInfo.info.application == "") {
          Toast({ message: this.toastApplicationText, duration: 1000 });
          this.submitBtnStatus = true;
          return;
        }
        if (this.$refs.groupDemandWriteInfo.info.params == "") {
          Toast({ message: this.toastParamText, duration: 1000 });
          this.submitBtnStatus = true;
          return;
        }
      }

      if (
        this.groupItemObj.code == "SBTG" ||
        this.groupItemObj.code == "HCTG"
      ) {
        this.submitData.brandList = [];
        var brandFirst = {},
          brandSecond = {},
          brandThird = {};
        if (this.$refs.groupDemandWriteInfo.info.brandFirstId) {
          brandFirst = {
            brandId: this.$refs.groupDemandWriteInfo.info.brandFirstId,
            aliasId: this.$refs.groupDemandWriteInfo.info.aliasBrandFirstId,
            brandName: this.$refs.groupDemandWriteInfo.info
              .productBrandFirstName,
            model: this.$refs.groupDemandWriteInfo.info.modelListFirst
          };
        }
        if (this.$refs.groupDemandWriteInfo.info.brandSecondId) {
          brandSecond = {
            brandId: this.$refs.groupDemandWriteInfo.info.brandSecondId,
            aliasId: this.$refs.groupDemandWriteInfo.info.aliasBrandSecondId,
            brandName: this.$refs.groupDemandWriteInfo.info
              .productBrandSecondName,
            model: this.$refs.groupDemandWriteInfo.info.modelListSecond
          };
        }
        if (this.$refs.groupDemandWriteInfo.info.brandThirdId) {
          brandThird = {
            brandId: this.$refs.groupDemandWriteInfo.info.brandThirdId,
            aliasId: this.$refs.groupDemandWriteInfo.info.aliasBrandThirdId,
            brandName: this.$refs.groupDemandWriteInfo.info
              .productBrandThirdName,
            model: this.$refs.groupDemandWriteInfo.info.modelListThird
          };
        }
        if (Object.keys(brandFirst).length != 0) {
          this.submitData.brandList.push(brandFirst);
        }
        if (Object.keys(brandSecond).length != 0) {
          this.submitData.brandList.push(brandSecond);
        }
        if (Object.keys(brandThird).length != 0) {
          this.submitData.brandList.push(brandThird);
        }
        if (this.submitData.brandList.length == 0) {
          Toast({ message: "至少选择或填写一个品牌", duration: 1000 });
          this.submitBtnStatus = true;
          return;
        } else {
          this.$refs.groupDemandWriteInfo.info.brandList = JSON.stringify(
            this.submitData.brandList
          );
        }
      }
      if (
        this.groupItemObj.code != "SBTG" &&
        this.groupItemObj.code != "HCTG"
      ) {
        if (this.$refs.groupDemandWriteInfo.info.brandId == "") {
          Toast({ message: this.toastBrandText, duration: 1000 });
          this.submitBtnStatus = true;
          return;
        } else {
          this.$refs.groupDemandWriteInfo.info.brand = JSON.stringify(
            this.$refs.groupDemandWriteInfo.info.brand
          );
        }
      }
      if (
        this.groupItemObj.code == "SHTG" ||
        this.groupItemObj.code == "XXHTG"
      ) {
        this.$refs.groupDemandWriteInfo.info.modelList = JSON.stringify(
          this.$refs.groupDemandWriteInfo.info.modelList
        );
      }
      if (this.groupItemObj.code == "SHTG") {
        if (
          this.$refs.groupDemandWriteInfo.info.installTime == "请选择安装日期"
        ) {
          Toast({ message: "请选择安装日期", duration: 1000 });
          this.submitBtnStatus = true;
          return;
        }
        if (this.$refs.groupDemandWriteInfo.info.deviceCheckNum == "") {
          Toast({ message: "请填写每天检查量", duration: 1000 });
          this.submitBtnStatus = true;
          return;
        }
        if (this.$refs.groupDemandWriteInfo.info.responseTime == "") {
          Toast({ message: "请填写响应时间", duration: 1000 });
          this.submitBtnStatus = true;
          return;
        }
        if (this.$refs.groupDemandWriteInfo.info.maintenanceType === "") {
          Toast({ message: "请选择维保类型", duration: 1000 });
          this.submitBtnStatus = true;
          return;
        }
      }

      if (this.$refs.groupDemandWriteInfo.info.loadTime == "") {
        Toast({ message: this.toastPredictTimeText, duration: 1000 });
        this.submitBtnStatus = true;
        return;
      }
      if (this.$refs.groupDemandWriteInfo.info.introduce == "") {
        Toast({ message: this.toastIntroduceText, duration: 1000 });
        this.submitBtnStatus = true;
        return;
      }
      this.submitData = {
        ...this.submitData,
        ...this.$refs.groupDemandWriteInfo.info
      };
      this.submitData.hospitalId = this.$store.state.userCompanyIdOrHospitalId;
      console.log(this.submitData);
      _getData(
        "/server_pro/groupPurchaseHospital!request.action",
        {
          method: "addOrUpdateGroupPurchaseHospitalDemand",
          params: this.submitData
        },
        data => {
          console.log(data);
          this.$router.replace("myHospitalGroupBuy");
          this.submitBtnStatus = true;
        }
      );
    },
    handleSelect(value) {
      this.submitData.groupPurchaseTypeId = value;
    },
    getItemObj(val) {
      this.groupItemObj = val;
    },
    getIndex(index) {
      this.current = index;
      this.submitData.groupPurchaseId = this.groupUnderWayList[index].id;
    }
  },
  watch: {
    groupItemObj() {
      switch (this.groupItemObj.code) {
        case "SBTG":
          this.title = "设备团购需求详情";
          this.toastApplicationText = "请输入应用需求";
          this.toastPriceText = "请填写期望采购价格";
          this.toastNumPriceText = "期望价格只能为数字";
          this.toastParamText = "请选择或输入重要参数";
          this.toastPredictTimeText = "请选择预装机时间";
          this.toastIntroduceText = "请填写采购需求说明";
          break;
        case "HCTG":
          this.title = "耗材团购需求详情";
          this.toastApplicationText = "请输入应用需求";
          this.toastPriceText = "请填写期望采购价格";
          this.toastNumPriceText = "期望价格只能为数字";
          this.toastParamText = "请选择或输入重要规格";
          this.toastPredictTimeText = "请选择预计需求时间";
          this.toastIntroduceText = "请填写采购需求说明";
          break;
        case "SHTG":
          this.title = "售后团购需求详情";
          this.toastBrandText = "请选择品牌";
          this.toastPriceText = "请填写维修预算";
          this.toastNumPriceText = "维修预算只能为数字";
          this.toastIntroduceText = "请填写备注信息";
          this.toastPredictTimeText = "请选择维修时间";
          break;
        case "XXHTG":
          this.title = "信息化团购需求详情";
          this.toastBrandText = "请选择品牌";
          this.toastApplicationText = "请输入应用需求";
          this.toastPriceText = "请填写期望采购价格";
          this.toastNumPriceText = "期望价格只能为数字";
          this.toastParamText = "请选择或输入重要参数";
          this.toastPredictTimeText = "请选择预装机时间";
          this.toastIntroduceText = "请填写采购需求说明";
          break;
        case "JRTG":
          this.title = "金融团购需求详情";
          this.toastBrandText = "请选择服务商";
          this.toastApplicationText = "请输入应用方向";
          this.toastPriceText = "请填写融资金额";
          this.toastNumPriceText = "融资金额只能为数字";
          this.toastParamText = "请选择或输入关键词";
          this.toastPredictTimeText = "请选择预计融资时间";
          this.toastIntroduceText = "请填写采购需求说明";
          break;
        case "ZXTG":
          this.title = "咨询团购需求详情";
          this.toastBrandText = "请选择服务商";
          this.toastApplicationText = "请输入应用方向";
          this.toastPriceText = "请填写期望采购价格";
          this.toastNumPriceText = "期望价格只能为数字";
          this.toastParamText = "请选择或输入关键词";
          this.toastPredictTimeText = "请选择预计咨询时间";
          this.toastIntroduceText = "请填写采购需求说明";
          break;
        default:
          this.toastApplicationText = "设备团购需求详情";
          this.toastPriceText = "请填写期望采购价格";
          this.toastNumPriceText = "期望价格只能为数字";
          this.toastParamText = "请选择或输入重要参数";
          this.toastPredictTimeText = "请选择预装机时间";
          this.toastIntroduceText = "请填写采购需求说明";
          break;
      }
    }
  },
  mounted() {},
  activated() {
    _getData(
      "/server_pro/groupPurchase!request.action",
      {
        method: "getUnderWayGroupPurchaseList",
        params: {}
      },
      data => {
        console.log("正在报名的团购大会：", data);
        this.groupUnderWayList = data.groupPurchaseList;
        if (this.$route.query.id) {
          _getData(
            "/server_pro/groupPurchaseHospital!request.action",
            {
              method: "getGroupPurchaseHospitalDemandInfo",
              params: { id: this.$route.query.id }
            },
            data => {
              console.log("提交的需求详情：", data);
              this.submitData.id = data.id;
              this.submitData.hospitalId = data.hospitalId;
              this.editSelectId = "" + data.groupPurchaseType.id;
              for (var i = 0; i < this.groupUnderWayList.length; i++) {
                if (this.groupUnderWayList[i].id == data.groupPurchaseId) {
                  this.current = i;
                  this.submitData.groupPurchaseId = data.groupPurchaseId;
                }
              }
              var flag = true;
              if (flag) {
                flag = false;
                switch (data.groupPurchaseType.code) {
                  case "SBTG":
                    this.SBTGProductSort([data.productLine]);
                    if (data.brandList.length == 1) {
                      this.SBTGProductBrandFirst(data.brandList[0].brand);
                      data.modelListFirst = data.brandList[0].model;
                      data.modelListSecond = [];
                      data.modelListThird = [];
                      data.productBrandFirstName = data.brandList[0].brandName;
                      data.brandFirstId = data.brandList[0].brandId;
                    } else if (data.brandList.length == 2) {
                      this.SBTGProductBrandFirst(data.brandList[0].brand);
                      this.SBTGProductBrandSecond(data.brandList[1].brand);
                      data.modelListFirst = data.brandList[0].model;
                      data.modelListSecond = data.brandList[1].model;
                      data.modelListThird = [];
                      data.productBrandFirstName = data.brandList[0].brandName;
                      data.productBrandSecondName = data.brandList[1].brandName;
                      data.brandFirstId = data.brandList[0].brandId;
                      data.brandSecondId = data.brandList[1].brandId;
                    } else if (data.brandList.length == 3) {
                      this.SBTGProductBrandFirst(data.brandList[0].brand);
                      this.SBTGProductBrandSecond(data.brandList[1].brand);
                      this.SBTGProductBrandThird(data.brandList[2].brand);
                      data.modelListFirst = data.brandList[0].model;
                      data.modelListSecond = data.brandList[1].model;
                      data.modelListThird = data.brandList[2].model;
                      data.productBrandFirstName = data.brandList[0].brandName;
                      data.productBrandSecondName = data.brandList[1].brandName;
                      data.productBrandThirdName = data.brandList[2].brandName;
                      data.brandFirstId = data.brandList[0].brandId;
                      data.brandSecondId = data.brandList[1].brandId;
                      data.brandThirdId = data.brandList[2].brandId;
                    }
                    this.SBTGMainParam(data.paramList);
                    this.SBTGPredictTime(data.loadTime);

                    break;
                  case "HCTG":
                    this.HCTGProductSort(data.productLine);
                    if (data.brandList.length == 1) {
                      this.HCTGProductBrandFirst(data.brandList[0].brand);
                      data.modelListFirst = data.brandList[0].model;
                      data.modelListSecond = [];
                      data.modelListThird = [];
                      data.productBrandFirstName = data.brandList[0].brandName;
                      data.productBrandSecondName = "";
                      data.productBrandThirdName = "";
                      data.brandFirstId = data.brandList[0].brandId;
                      data.brandSecondId = "";
                      data.brandThirdId = "";
                    } else if (data.brandList.length == 2) {
                      this.HCTGProductBrandFirst(data.brandList[0].brand);
                      this.HCTGProductBrandSecond(data.brandList[1].brand);
                      data.modelListFirst = data.brandList[0].model;
                      data.modelListSecond = data.brandList[1].model;
                      data.modelListThird = [];
                      data.productBrandFirstName = data.brandList[0].brandName;
                      data.productBrandSecondName = data.brandList[1].brandName;
                      data.productBrandThirdName = "";
                      data.brandFirstId = data.brandList[0].brandId;
                      data.brandSecondId = data.brandList[1].brandId;
                      data.brandThirdId = "";
                    } else if (data.brandList.length == 3) {
                      this.HCTGProductBrandFirst(data.brandList[0].brand);
                      this.HCTGProductBrandSecond(data.brandList[1].brand);
                      this.HCTGProductBrandThird(data.brandList[2].brand);
                      data.modelListFirst = data.brandList[0].model;
                      data.modelListSecond = data.brandList[1].model;
                      data.modelListThird = data.brandList[2].model;
                      data.productBrandFirstName = data.brandList[0].brandName;
                      data.productBrandSecondName = data.brandList[1].brandName;
                      data.productBrandThirdName = data.brandList[2].brandName;
                      data.brandFirstId = data.brandList[0].brandId;
                      data.brandSecondId = data.brandList[1].brandId;
                      data.brandThirdId = data.brandList[2].brandId;
                    }
                    this.HCTGMainParam(data.paramList);
                    this.HCTGPredictTime(data.loadTime);
                    break;
                  case "SHTG":
                    this.SHTGProductSort([data.productLine]);
                    this.SHTGProductBrand([data.brand]);
                    this.SHTGProductModel(data.modelList);
                    this.SHTGMainParam(data.paramList);
                    this.SHTGPredictTime(data.loadTime);
                    break;
                  case "XXHTG":
                    this.XXHTGProductSort([data.productLine]);
                    this.XXHTGProductBrand([data.brand]);
                    this.XXHTGProductModel(data.modelList);
                    this.XXHTGMainParam(data.paramList);
                    this.XXHTGPredictTime(data.loadTime);
                    break;
                  case "JRTG":
                    this.JRTGProductSort([data.productLine]);
                    this.JRTGProductBrand([data.brand]);
                    this.JRTGMainParam(data.paramList);
                    this.JRTGPredictTime(data.loadTime);
                    break;
                  case "ZXTG":
                    this.ZXTGProductSort([data.productLine]);
                    this.ZXTGProductBrand([data.brand]);
                    this.ZXTGMainParam(data.paramList);
                    this.ZXTGPredictTime(data.loadTime);
                    break;
                }
                data.mainParamsName = _.join(
                  _.map(data.paramList, "paramName"),
                  ","
                );
                this.data = data;
              }
            }
          );
        }
      }
    );
  },
  deactivated() {}
};
</script>

<style lang="scss" scoped>
@import "../../../../../static/scss/_commonScss";
.container {
  @include basic_container_style;
  /deep/ .basicTitle {
    h2 {
      p > span {
        font-family: PingFangSC-Regular;
        font-size: 15px;
        color: #aaaaaa;
        margin-left: 5px;
      }
    }
  }
  .content {
    .selectGroupMeeting {
      padding-bottom: 0.5px;
      margin-bottom: 10px;
      @include box_shadow_style;
      .list_box {
        padding: 0 10px;
      }
    }
    .groupType {
      @include box_shadow_style;
      margin-bottom: 10px;
    }
    .productBasicInfromation {
      @include box_shadow_style;
      margin-bottom: 10px;
      /deep/ .basicTitle {
        h2 {
          p > span {
            font-size: 13px;
          }
          .server {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #333333;
            height: 100%;

            i {
              width: 17px;
              height: 14px;
              background: url("/static/images/service.png") no-repeat center;
              background-size: 100% 100%;
              margin-right: 3px;
            }
          }
        }
      }
    }
    /deep/ .weui-btn {
      background: #019ddd;
      font-family: PingFangSC-Regular;
      font-size: 16px;

      height: 50px;
      border-radius: 6px;
    }
  }
}
</style>
