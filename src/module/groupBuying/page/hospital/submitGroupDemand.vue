<template>
    <div class="container submitGroupDemand">
        <Header title="提交团购需求 (医院)" :saveId="saveId" v-on:changeSaveId="changeSaveId"></Header>
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
                <select-project-nav :groupPurchaseId="submitData.groupPurchaseId"  :editSelectValue="editSelectId"  v-on:selectObj="getItemObj" v-on:select-value="handleSelect"></select-project-nav>
            </div>
            <div class="productBasicInfromation">
                <basic-title :title="title" imgurl="../static/images/basicInformation.png">
                    <span slot="select">(必填项)</span>
                </basic-title>
                <div>
                  <router-view></router-view>
                </div>
                <!-- <group-demand-write-info :data="data" ref="groupDemandWriteInfo" :groupPurchaseId="this.submitData.groupPurchaseId" :groupType="this.groupItemObj" :groupPurchaseTypeId="submitData.groupPurchaseTypeId"></group-demand-write-info> -->
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
      flag: true,
      saveId: "",
      saveCode: "",
      submitData: {
        id: "",
        hospitalId: "",
        groupPurchaseId: "",
        groupPurchaseTypeId: "",
        productLine: "",
        brandList: [],
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
    ...mapMutations(["setTransition", "SBTG", "HCTG", "SHTG"]),
    submitBtnClick() {
      this.submitBtnStatus = false;
      console.log(
        this.$store.state.page.submitGroupDemand[
          this.$route.query.groupTypeCode
        ]
      );
      var getSubmitInfo = this.$store.state.page.submitGroupDemand[
        this.$route.query.groupTypeCode
      ];

      if (getSubmitInfo.productLine[0].aliasId == "") {
        Toast({ message: "请选择分类", duration: 1000 });
        this.submitBtnStatus = true;
        return;
      } else {
        this.submitData.productLine = JSON.stringify(getSubmitInfo.productLine);
      }
      if (getSubmitInfo.price == "") {
        Toast({ message: this.toastPriceText, duration: 1000 });
        this.submitBtnStatus = true;
        return;
      } else {
        if (!/^[0-9]+(.[0-9])?$/.test(getSubmitInfo.price)) {
          Toast({ message: this.toastNumPriceText, duration: 1000 });
          this.submitBtnStatus = true;
          return;
        } else {
          this.submitData.price = getSubmitInfo.price;
        }
      }
      if (this.$route.query.groupTypeCode != "SHTG") {
        if (getSubmitInfo.application == "") {
          Toast({ message: this.toastApplicationText, duration: 1000 });
          this.submitBtnStatus = true;
          return;
        } else {
          this.submitData.application = getSubmitInfo.application;
        }
        if (getSubmitInfo.params.length == 0) {
          Toast({ message: this.toastParamText, duration: 1000 });
          this.submitBtnStatus = true;
          return;
        } else {
          this.submitData.params = JSON.stringify(getSubmitInfo.params);
        }
      }

      if (
        this.$route.query.groupTypeCode == "SBTG" ||
        this.$route.query.groupTypeCode == "HCTG"
      ) {
        this.submitData.brandList = [];
        var brandFirst = {},
          brandSecond = {},
          brandThird = {};
        if (getSubmitInfo.brandFirst[0].aliasId) {
          brandFirst = {
            brandId: getSubmitInfo.brandFirst[0].brandId,
            aliasId: getSubmitInfo.brandFirst[0].aliasId,
            brandName: getSubmitInfo.brandFirst[0].brandName,
            aliasName: getSubmitInfo.brandFirst[0].aliasName,
            model: getSubmitInfo.modelFirst
          };
        }
        if (getSubmitInfo.brandSecond[0].aliasId) {
          brandSecond = {
            brandId: getSubmitInfo.brandSecond[0].brandId,
            aliasId: getSubmitInfo.brandSecond[0].aliasId,
            brandName: getSubmitInfo.brandSecond[0].brandName,
            aliasName: getSubmitInfo.brandSecond[0].aliasName,
            model: getSubmitInfo.modelSecond
          };
        }
        if (getSubmitInfo.brandThird[0].aliasId) {
          brandThird = {
            brandId: getSubmitInfo.brandThird[0].brandId,
            aliasId: getSubmitInfo.brandThird[0].aliasId,
            brandName: getSubmitInfo.brandThird[0].brandName,
            aliasName: getSubmitInfo.brandThird[0].aliasName,
            model: getSubmitInfo.modelThird
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
          this.submitData.brandList = JSON.stringify(this.submitData.brandList);
        }
      }
      if (
        this.$route.query.groupTypeCode != "SBTG" &&
        this.$route.query.groupTypeCode != "HCTG"
      ) {
        if (getSubmitInfo.brand[0].brandId == "") {
          Toast({ message: this.toastBrandText, duration: 1000 });
          this.submitBtnStatus = true;
          return;
        } else {
          getSubmitInfo.model
            ? (getSubmitInfo.brand[0].model = getSubmitInfo.model)
            : "";
          this.submitData.brandList = JSON.stringify(getSubmitInfo.brand);
        }
      }

      if (this.$route.query.groupTypeCode == "SHTG") {
        if (getSubmitInfo.installTime == "请选择安装日期") {
          Toast({ message: "请选择安装日期", duration: 1000 });
          this.submitBtnStatus = true;
          return;
        } else {
          this.submitData.installTime = getSubmitInfo.installTime;
        }
        if (getSubmitInfo.deviceCheckNum == "") {
          Toast({ message: "请填写每天检查量", duration: 1000 });
          this.submitBtnStatus = true;
          return;
        } else {
          this.submitData.deviceCheckNum = getSubmitInfo.deviceCheckNum;
        }
        if (getSubmitInfo.responseTime == "") {
          Toast({ message: "请填写响应时间", duration: 1000 });
          this.submitBtnStatus = true;
          return;
        } else {
          this.submitData.responseTime = getSubmitInfo.responseTime;
        }
        if (getSubmitInfo.maintenanceType === "") {
          Toast({ message: "请选择维保类型", duration: 1000 });
          this.submitBtnStatus = true;
          return;
        } else {
          this.submitData.maintenanceType = getSubmitInfo.maintenanceType;
        }
      }
      if (getSubmitInfo.loadTime.flag == "") {
        Toast({ message: this.toastPredictTimeText, duration: 1000 });
        this.submitBtnStatus = true;
        return;
      } else {
        this.submitData.loadTime = JSON.stringify(getSubmitInfo.loadTime);
      }
      if (getSubmitInfo.introduce == "") {
        Toast({ message: this.toastIntroduceText, duration: 1000 });
        this.submitBtnStatus = true;
        return;
      } else {
        this.submitData.introduce = getSubmitInfo.introduce;
      }
      this.submitData.num = getSubmitInfo.num;
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
          this.$router.replace("/myHospitalGroupBuy");
        }
      );
      this.submitBtnStatus = true;
    },
    changeSaveId(val) {
      this.saveId = val;
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
      this.$router.replace({
        path: this.$route.path,
        query: {
          id: this.$route.query.id,
          groupPurchaseTypeId: this.submitData.groupPurchaseTypeId,
          groupPurchaseId: this.submitData.groupPurchaseId,
          groupTypeCode: this.groupItemObj.code
        }
      });
    }
  },
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
        if (this.$route.query.id && this.saveId != this.$route.query.id) {
          this.saveId = this.$route.query.id;
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
              this.submitData.groupPurchaseTypeId = data.groupPurchaseType.id;
              this.submitData.groupPurchaseId = data.groupPurchaseId;
              this.$router.replace({
                path: `/submitGroupDemand/${data.groupPurchaseType.code}`,
                query: {
                  id: this.$route.query.id,
                  groupPurchaseTypeId: this.submitData.groupPurchaseTypeId,
                  groupPurchaseId: this.submitData.groupPurchaseId,
                  groupTypeCode: data.groupPurchaseType.code
                }
              });
              this.editSelectId = "" + data.groupPurchaseType.id;
              for (var i = 0; i < this.groupUnderWayList.length; i++) {
                if (this.groupUnderWayList[i].id == data.groupPurchaseId) {
                  this.current = i;
                  this.submitData.groupPurchaseId = data.groupPurchaseId;
                }
              }
              var initialValue = [
                {
                  aliasId: "",
                  aliasName: "",
                  brandId: "",
                  brandLabel: "",
                  brandName: ""
                }
              ];
              this.saveCode = data.groupPurchaseType.code;
              data.productLine = [data.productLine];
              if (data.groupPurchaseType.code != "SHTG") {
                data.mainParamsName = _.join(_.map(data.params, "name"), ",");
              }
              switch (data.groupPurchaseType.code) {
                case "SBTG":
                  if (data.brandList.length == 1) {
                    data.brandFirst = [data.brandList[0].brand];
                    data.brandSecond = initialValue;
                    data.brandThird = initialValue;
                    data.brandFirstId = data.brandList[0].brand.brandId;
                    data.brandSecondId = "";
                    data.brandThirdId = "";
                    data.brandFirstName = data.brandList[0].brand.aliasName
                      ? data.brandList[0].brand.aliasName
                      : data.brandList[0].brand.brandName;
                    data.brandSecondName = "";
                    data.brandThirdName = "";
                    data.modelFirst = data.brandList[0].model;
                    data.modelSecond = [];
                    data.modelThird = [];
                  } else if (data.brandList.length == 2) {
                    data.brandFirst = [data.brandList[0].brand];
                    data.brandSecond = [data.brandList[1].brand];
                    data.brandThird = initialValue;
                    data.brandFirstId = data.brandList[0].brand.brandId;
                    data.brandSecondId = data.brandList[1].brand.brandId;
                    data.brandThirdId = "";
                    data.brandFirstName = data.brandList[0].brand.aliasName
                      ? data.brandList[0].brand.aliasName
                      : data.brandList[0].brand.brandName;
                    data.brandSecondName = data.brandList[1].brand.aliasName
                      ? data.brandList[1].brand.aliasName
                      : data.brandList[1].brand.brandName;
                    data.brandThirdName = "";
                    data.modelFirst = data.brandList[0].model;
                    data.modelSecond = data.brandList[1].model;
                    data.modelThird = [];
                  } else if (data.brandList.length == 3) {
                    data.brandFirst = [data.brandList[0].brand];
                    data.brandSecond = [data.brandList[1].brand];
                    data.brandThird = [data.brandList[2].brand];
                    data.brandFirstId = data.brandList[0].brand.brandId;
                    data.brandSecondId = data.brandList[1].brand.brandId;
                    data.brandThirdId = data.brandList[2].brand.brandId;
                    data.brandFirstName = data.brandList[0].brand.aliasName
                      ? data.brandList[0].brand.aliasName
                      : data.brandList[0].brand.brandName;
                    data.brandSecondName = data.brandList[1].brand.aliasName
                      ? data.brandList[1].brand.aliasName
                      : data.brandList[1].brand.brandName;
                    data.brandThirdName = data.brandList[2].brand.aliasName
                      ? data.brandList[2].brand.aliasName
                      : data.brandList[2].brand.brandName;
                    data.modelFirst = data.brandList[0].model;
                    data.modelSecond = data.brandList[1].model;
                    data.modelThird = data.brandList[2].model;
                  }

                  console.log("data", data);
                  this.SBTG(data);
                  this.HCTG({
                    productLine: [
                      {
                        aliasId: "",
                        aliasName: "",
                        productLineId: "",
                        productLineName: ""
                      }
                    ],
                    productLineId: "",
                    aliasProductLineId: "",
                    productLineName: "",
                    brandFirst: [
                      {
                        aliasId: "",
                        aliasName: "",
                        brandId: "",
                        brandLabel: "",
                        brandName: ""
                      }
                    ],
                    brandFirstId: "",
                    brandFirstName: "",
                    brandSecond: [
                      {
                        aliasId: "",
                        aliasName: "",
                        brandId: "",
                        brandLabel: "",
                        brandName: ""
                      }
                    ],
                    brandSecondId: "",
                    brandSecondName: "",
                    brandThird: [
                      {
                        aliasId: "",
                        aliasName: "",
                        brandId: "",
                        brandLabel: "",
                        brandName: ""
                      }
                    ],
                    brandThirdId: "",
                    brandThirdName: "",
                    modelFirst: [],
                    modelSecond: [],
                    modelThird: [],
                    params: [],
                    mainParamsName: "",
                    loadTime: {
                      outTime: "",
                      year: "",
                      quarter: "",
                      flag: ""
                    },
                    showLoadTime: "",
                    demandNum: "",
                    histroyTotalDemandNum: "",
                    totalPrice: "",
                    num: 1, //需求数量
                    price: "", //采购价格
                    application: "", //应用需求
                    introduce: "" //采购需求说明
                  });
                  this.SHTG({
                    productLine: [
                      {
                        aliasId: "",
                        aliasName: "",
                        productLineId: "",
                        productLineName: ""
                      }
                    ],
                    productLineId: "",
                    aliasProductLineId: "",
                    productLineName: "",
                    brand: [
                      {
                        aliasId: "",
                        aliasName: "",
                        brandId: "",
                        brandLabel: "",
                        brandName: ""
                      }
                    ],
                    brandId: "",
                    brandName: "",
                    model: [],
                    params: [],
                    mainParamsName: "",
                    loadTime: {
                      outTime: "",
                      year: "",
                      quarter: "",
                      flag: ""
                    },
                    showLoadTime: "",
                    demandNum: "",
                    histroyTotalDemandNum: "",
                    totalPrice: "",
                    installTime: "", //安装日期
                    deviceCheckNum: "", //每天检查量
                    responseTime: "", //响应时间
                    maintenanceType: "", //维保类型
                    num: 1, //设备台数
                    price: "", //维修预算
                    introduce: "" //备注说明
                  });
                  break;
                case "HCTG":
                  if (data.brandList.length == 1) {
                    data.brandFirst = [data.brandList[0].brand];
                    data.brandSecond = initialValue;
                    data.brandThird = initialValue;
                    data.brandFirstId = data.brandList[0].brand.brandId;
                    data.brandSecondId = "";
                    data.brandThirdId = "";
                    data.brandFirstName = data.brandList[0].brand.aliasName
                      ? data.brandList[0].brand.aliasName
                      : data.brandList[0].brand.brandName;
                    data.brandSecondName = "";
                    data.brandThirdName = "";
                    data.modelFirst = data.brandList[0].model;
                    data.modelSecond = [];
                    data.modelThird = [];
                  } else if (data.brandList.length == 2) {
                    data.brandFirst = [data.brandList[0].brand];
                    data.brandSecond = [data.brandList[1].brand];
                    data.brandThird = initialValue;
                    data.brandFirstId = data.brandList[0].brand.brandId;
                    data.brandSecondId = data.brandList[1].brand.brandId;
                    data.brandThirdId = "";
                    data.brandFirstName = data.brandList[0].brand.aliasName
                      ? data.brandList[0].brand.aliasName
                      : data.brandList[0].brand.brandName;
                    data.brandSecondName = data.brandList[1].brand.aliasName
                      ? data.brandList[1].brand.aliasName
                      : data.brandList[1].brand.brandName;
                    data.brandThirdName = "";
                    data.modelFirst = data.brandList[0].model;
                    data.modelSecond = data.brandList[1].model;
                    data.modelThird = [];
                  } else if (data.brandList.length == 3) {
                    data.brandFirst = [data.brandList[0].brand];
                    data.brandSecond = [data.brandList[1].brand];
                    data.brandThird = [data.brandList[2].brand];
                    data.brandFirstId = data.brandList[0].brand.brandId;
                    data.brandSecondId = data.brandList[1].brand.brandId;
                    data.brandThirdId = data.brandList[2].brand.brandId;
                    data.brandFirstName = data.brandList[0].brand.aliasName
                      ? data.brandList[0].brand.aliasName
                      : data.brandList[0].brand.brandName;
                    data.brandSecondName = data.brandList[1].brand.aliasName
                      ? data.brandList[1].brand.aliasName
                      : data.brandList[1].brand.brandName;
                    data.brandThirdName = data.brandList[2].brand.aliasName
                      ? data.brandList[2].brand.aliasName
                      : data.brandList[2].brand.brandName;
                    data.modelFirst = data.brandList[0].model;
                    data.modelSecond = data.brandList[1].model;
                    data.modelThird = data.brandList[2].model;
                  }

                  data.mainParamsName = _.join(_.map(data.params, "name"), ",");
                  this.HCTG(data);
                  this.SBTG({
                    productLine: [
                      {
                        aliasId: "",
                        aliasName: "",
                        productLineId: "",
                        productLineName: ""
                      }
                    ],
                    productLineId: "",
                    aliasProductLineId: "",
                    productLineName: "",
                    brandFirst: [
                      {
                        aliasId: "",
                        aliasName: "",
                        brandId: "",
                        brandLabel: "",
                        brandName: ""
                      }
                    ],
                    brandFirstId: "",
                    brandFirstName: "",
                    brandSecond: [
                      {
                        aliasId: "",
                        aliasName: "",
                        brandId: "",
                        brandLabel: "",
                        brandName: ""
                      }
                    ],
                    brandSecondId: "",
                    brandSecondName: "",
                    brandThird: [
                      {
                        aliasId: "",
                        aliasName: "",
                        brandId: "",
                        brandLabel: "",
                        brandName: ""
                      }
                    ],
                    brandThirdId: "",
                    brandThirdName: "",
                    modelFirst: [],
                    modelSecond: [],
                    modelThird: [],
                    params: [],
                    mainParamsName: "",
                    loadTime: {
                      outTime: "",
                      year: "",
                      quarter: "",
                      flag: ""
                    },
                    showLoadTime: "",
                    demandNum: "",
                    histroyTotalDemandNum: "",
                    totalPrice: "",
                    num: 1, //需求数量
                    price: "", //采购价格
                    application: "", //应用需求
                    introduce: "" //采购需求说明
                  });
                  this.SHTG({
                    productLine: [
                      {
                        aliasId: "",
                        aliasName: "",
                        productLineId: "",
                        productLineName: ""
                      }
                    ],
                    productLineId: "",
                    aliasProductLineId: "",
                    productLineName: "",
                    brand: [
                      {
                        aliasId: "",
                        aliasName: "",
                        brandId: "",
                        brandLabel: "",
                        brandName: ""
                      }
                    ],
                    brandId: "",
                    brandName: "",
                    model: [],
                    params: [],
                    mainParamsName: "",
                    loadTime: {
                      outTime: "",
                      year: "",
                      quarter: "",
                      flag: ""
                    },
                    showLoadTime: "",
                    demandNum: "",
                    histroyTotalDemandNum: "",
                    totalPrice: "",
                    installTime: "", //安装日期
                    deviceCheckNum: "", //每天检查量
                    responseTime: "", //响应时间
                    maintenanceType: "", //维保类型
                    num: 1, //设备台数
                    price: "", //维修预算
                    introduce: "" //备注说明
                  });
                  break;
                case "SHTG":
                  data.brand = [data.brandList[0].brand];
                  data.brandName = data.brandList[0].brand.aliasName
                    ? data.brandList[0].brand.aliasName
                    : data.brandList[0].brand.brandName;
                  data.model = data.brandList[0].model;
                  data.brandId = data.brandList[0].brand.brandId;
                  this.SHTG(data);
                  break;
                case "XXHTG":
                  break;
                case "JRTG":
                  break;
                case "ZXTG":
                  break;
              }
            }
          );
        }
      }
    );
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
