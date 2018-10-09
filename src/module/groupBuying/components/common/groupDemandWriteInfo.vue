<template>
    <div class="groupDemandWriteInfo">
        <ul>
            <li @click="jumpProductCateGory">
                <a >
                    <span>{{infoText.productSortText}}</span>
                    <cube-input :placeholder="infoText.sortPlaceholder" :disabled="true" v-model="info.productLineName">
                      <i slot="append"></i>
                    </cube-input>
                </a>
            </li>
            <li class="number" v-if="this.groupType.code != 'JRTG'">
                <group>
                    <x-number :title="infoText.numText"  v-model="info.num" :min="1" fillable></x-number>
                </group>
                <p>
                    本次团购,{{info.productLineName}}{{infoText.typeText}}已累计申报<span>{{demandNum}}</span>{{infoText.unitText}},历史累计申报共<span>{{histroyTotalDemandNum}}</span>{{infoText.unitText}}
                </p>
            </li>
            <li class="price">
                <div>
                  <span>{{infoText.hopePriceText}}</span>
                    <cube-input :placeholder="infoText.hopePricePlaceholder" type="number" :disabled="false" v-model="info.price">
                    </cube-input>
                  <div class="unit">万元</div>
                </div>
                <p>
                    本次团购,{{info.productLineName}}{{infoText.typeText}}已累计申报<span>{{demandNum}}</span>{{infoText.unitText}},{{infoText.countText}}为<span>{{totalPrice}}</span>万元
                </p>
            </li>
            <li class="clinic" v-if="!infoText.show">
                <group>
                    <x-textarea :title="infoText.applicationText" v-model="info.application" :placeholder="infoText.appPlaceholder" autosize></x-textarea>
                </group>
            </li>
            <li class="SHTGbrand" v-if="!infoText.isShow" @click="jumpSelectBrand">
              <a>
                 <span>{{infoText.productBrandText}}</span>
                    <cube-input :placeholder="infoText.brandPlaceholder" :disabled="true" v-model="info.brandName">
                      <i slot="append"></i>
                    </cube-input></a>
            </li>
            <li class="SHTGmodel" v-if="infoText.isModel" @click="jumpSelectModel">
              <a>
                  <span>{{infoText.productModelText}}</span>
                  <cube-input :placeholder="infoText.modelPlaceholder" :class="this.info.modelList.length!=0?'showStyle':''" :disabled="true">
                    <span slot="prepend" class="showModel">
                      <span v-for="(item,index) in info.modelList" :key="index">{{item.name}}</span>
                    </span>
                    <i slot="append"></i>
                  </cube-input>
              </a>
            </li>
        </ul>
        <div class="selectBrand" v-if="infoText.isShow">
            <basic-title title='首选' imgurl='../../../../../static/images/selected-first.png'>
                <span slot="select">(必填)</span>
                <span slot="check" @click.stop="clear(0)">清空</span>
            </basic-title>
            <ul>
                <li @click="jumpToBrand(0)">
                    <a>
                    <span>品牌：</span>
                        <cube-input placeholder="请选择品牌" :disabled="true" v-model="info.productBrandFirstName">
                            <i slot="append"></i>
                        </cube-input>
                    </a>
                </li>
                <li @click="jumpToModel(0)">
                    <a>
                        <span>型号：</span>
                        <cube-input placeholder="请选择型号" :class="this.info.modelListFirst.length!=0?'showStyle':''" :disabled="true">
                          <span slot="prepend" class="showModel">
                            <span v-for="(item,index) in info.modelListFirst" :key="index">{{item.name}}</span>
                          </span>
                          <i slot="append"></i>
                        </cube-input>
                    </a>
                </li>
            </ul>
            <basic-title title='次选' imgurl='../../../../../static/images/selected-second.png'>
                <span slot="check" @click.stop="clear(1)">清空</span>
            </basic-title>
            <ul>
                <li @click="jumpToBrand(1)">
                    <a>
                    <span>品牌：</span>
                        <cube-input placeholder="请选择品牌" :disabled="true" v-model="info.productBrandSecondName">
                            <i slot="append"></i>
                        </cube-input>
                    </a>
                </li>
                <li @click="jumpToModel(1)">
                    <a>
                        <span>型号：</span>
                        <cube-input placeholder="请选择型号" :class="this.info.modelListSecond.length!=0?'showStyle':''" :disabled="true">
                          <span slot="prepend" class="showModel">
                            <span v-for="(item,index) in info.modelListSecond" :key="index">{{item.name}}</span>
                          </span>
                          <i slot="append"></i>
                        </cube-input>
                    </a>
                </li>
            </ul>
            <basic-title title='再选' imgurl='../../../../../static/images/selected-three.png'>
            <span slot="check" @click.stop="clear(2)">清空</span></basic-title>
            <ul>
                <li @click="jumpToBrand(2)">
                    <a>
                    <span>品牌：</span>
                        <cube-input placeholder="请选择品牌" :disabled="true" v-model="info.productBrandThirdName">
                              <i slot="append"></i>
                        </cube-input>
                    </a>
                </li>
                <li @click="jumpToModel(2)">
                    <a>
                        <span>型号：</span>
                        <cube-input placeholder="请选择型号" :class="this.info.modelListThird.length!=0?'showStyle':''" :disabled="true">
                            <span slot="prepend" class="showModel">
                                <span v-for="(item,index) in info.modelListThird" :key="index">{{item.name}}</span>
                            </span>
                            <i slot="append"></i>
                        </cube-input>
                    </a>
                </li>
            </ul>
        </div>
        <div class="saleAfterGroupField" v-if="infoText.show">
          <ul>
            <li @click="jumpInstallTime">
              <a>
                  <span>设备安装日期:</span>
                  <cube-button @click="showDatePicker" :class="info.installTime.indexOf('-')!=-1?'valueStyle':''">{{info.installTime}}</cube-button>
                  <!-- <cube-input placeholder="请选择安装日期" :readonly="true" v-model="info.installTime"  @click="showDatePicker">
                    <i slot="append"></i>
                  </cube-input> -->
              </a>
            </li>
                 <li >
              <a>
                    <span class="star">该设备每天检查量：</span>
                    <cube-input class="responseTime" placeholder="请填写每天病人数量" v-model="info.deviceCheckNum">
                        <span slot="append">人</span>
                    </cube-input>
                    </a>
            </li>
                 <li >
              <a>
                    <span class="star">响应时间：</span>
                    <cube-input class="responseTime" placeholder="请填写响应时间" v-model="info.responseTime">
                        <span slot="append">小时以内</span>
                    </cube-input>
                    </a>
            </li>
              <li >
                    <a >
                        <span class="star">维保类型：</span>
                        <div class="maintanceType">
                          <span v-for="(item,index) in types" :key="index" :class="currentIdx==index?'active':''" @click="addClass(index)">{{item.name}}</span>
                        </div>
                      </a>
            </li>
            </ul>
        </div>
        <div class="parameter">
            <ul>
                <li @click="jumpMainParams" v-if="!infoText.show">
                    <a>
                        <span>{{infoText.mainParamsText}}</span>
                        <cube-input :placeholder="infoText.paramPlaceholder" :disabled="true" v-model="info.mainParamsName">
                              <i slot="append"></i>
                        </cube-input>
                    </a>
                </li>
                <li @click="jumpPredictTime">
                    <a>
                        <span>{{infoText.loadTimeText}}</span>
                        <cube-input :placeholder="infoText.loadTimePlaceholder" :disabled="true" v-model="info.loadTime">
                              <i slot="append"></i>
                        </cube-input>
                    </a>
                </li>
                <li class="clinic">
                    <group>
                        <x-textarea :title="infoText.introduceText" v-model="info.introduce" :placeholder="infoText.introducePlaceholder" autosize :height="43"></x-textarea>
                    </group>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import basicTitle from "./basicTitle";
import { mapMutations } from "vuex";
import { Toast } from "vant";
import { DatetimePicker } from "vant";
import { Popup } from "vant";
import { _getData } from "../../service/getData";
import { Group, XTextarea, XNumber, CellBox } from "vux";
const types = [
  { id: 0, name: "全保" },
  { id: 1, name: "备件保" },
  { id: 2, name: "人工保" }
];
const infos = [
  {
    code: "SBTG",
    text: {
      typeText: "设备",
      unitText: "台",
      countText: "总预算",
      productSortText: "设备分类:",
      productBrandText: "设备品牌:",
      productModelText: "设备型号:",
      numText: "需求数量:",
      hopePriceText: "期望采购总价:",
      mainParamsText: "重要参数:",
      applicationText: "应用需求:",
      loadTimeText: "预计装机时间:",
      introduceText: "采购需求说明:",
      sortPlaceholder: "请选择分类",
      brandPlaceholder: "请选择品牌",
      modelPlaceholder: "默认为不限",
      hopePricePlaceholder: "请真实填写采购期望价格",
      paramPlaceholder: "请选择或输入重要参数",
      loadTimePlaceholder: "请选择预计装机时间",
      appPlaceholder: "为保证你的采购质量及效率请详细填写设备的临床用途",
      introducePlaceholder: "为了使您的需求清晰准确，请尽量详细说明",
      isShow: true,
      show: false,
      isModel: false
    },
    value: {
      productLineName: "", //显示用
      productLine: "", //上传数据库用
      productLineId: "", //判断用
      productBrandFirstName: "", //首选品牌显示用
      productBrandSecondName: "", //首选品牌显示用
      productBrandThirdName: "", //首选品牌显示用
      brandList: [], //上传数据库用
      brandFirstId: "", //判断用
      brandSecondId: "", //判断用
      brandThirdId: "", //判断用
      aliasBrandFirstId: "",
      aliasBrandSecondId: "",
      aliasBrandThirdId: "",
      modelListFirst: [], //首选型号显示用
      modelListSecond: [], //次选型号显示用
      modelListThird: [], //再选型号显示用
      num: 1, //需求数量
      price: "", //期望价格
      application: "", //应用需求
      mainParamsName: "", //显示参数名
      params: "", //重要参数
      loadTime: "", //预计时间
      introduce: "" //采购需求说明
    }
  },
  {
    code: "HCTG",
    text: {
      typeText: "耗材",
      unitText: "单",
      countText: "总预算",
      productSortText: "耗材分类:",
      productBrandText: "耗材品牌:",
      productModelText: "耗材型号:",
      numText: "需求数量:",
      hopePriceText: "期望采购总价:",
      mainParamsText: "重要规格",
      applicationText: "应用需求:",
      loadTimeText: "预计需求时间:",
      introduceText: "采购需求说明:",
      sortPlaceholder: "请选择分类",
      brandPlaceholder: "请选择品牌",
      modelPlaceholder: "默认为不限",
      hopePricePlaceholder: "请真实填写采购期望价格",
      paramPlaceholder: "请选择或输入重要规格",
      loadTimePlaceholder: "请选择预计需求时间",
      appPlaceholder: "为保证你的采购质量及效率请详细填写耗材的临床用途",
      introducePlaceholder: "为了使您的需求清晰准确，请尽量详细说明",
      isShow: true,
      show: false,
      isModel: false
    },
    value: {
      productLineName: "",
      productLine: "",
      productLineId: "",
      productBrandFirstName: "",
      productBrandSecondName: "",
      productBrandThirdName: "",
      brandFirstId: "",
      brandSecondId: "",
      brandThirdId: "",
      aliasBrandFirstId: "",
      aliasBrandSecondId: "",
      aliasBrandThirdId: "",
      brandList: [],
      modelListFirst: [],
      modelListSecond: [],
      modelListThird: [],
      num: 1, //需求数量
      price: "", //期望价格
      application: "", //应用需求
      mainParamsName: "", //显示参数名
      params: "", //重要参数
      loadTime: "", //预计时间
      introduce: "" //采购需求说明
    }
  },
  {
    code: "SHTG",
    text: {
      typeText: "设备",
      unitText: "台",
      countText: "总维修预算",
      productSortText: "设备分类:",
      productBrandText: "设备品牌:",
      productModelText: "设备型号:",
      numText: "设备台数:",
      hopePriceText: "维修预算总价:",
      installTimeText: "设备安装日期:",
      deviceCheckNumText: "该设备每天检查量:",
      responseTimeText: "响应时间:",
      loadTimeText: "维修时间:",
      maintenanceTypeText: "维保类型:",
      introduceText: "备注信息:",
      sortPlaceholder: "请选择分类",
      brandPlaceholder: "请选择品牌",
      modelPlaceholder: "默认为不限",
      hopePricePlaceholder: "请真实填写维修预算",
      installTimePlaceholder: "请选择安装日期",
      deviceCheckNumPlaceholder: "请填写每天病人数量",
      loadTimePlaceholder: "请选择维修时间",
      responseTimePlaceholder: "请填写响应时间",
      introducePlaceholder: "请在这里填写备注信息",
      isShow: false, //判断多选品牌和品牌
      show: true, //判断installTime、params、application
      isModel: true
    },
    value: {
      productLineName: "", //显示
      productLine: "", //上传数据库
      productLineId: "", //判断用
      brandName: "", //显示
      brand: "", //上传数据库
      brandId: "", //判断用
      modelList: [], //显示、上传
      num: 1, //设备台数
      price: "", //维修预算价格
      installTime: "请选择安装日期", //安装日期
      loadTime: "", //维修时间
      deviceCheckNum: "", //每天检查量
      responseTime: "", //响应时间
      maintenanceType: "", //维保类型
      introduce: "" //备注
    }
  },
  {
    code: "XXHTG",
    text: {
      typeText: "信息化",
      unitText: "单",
      countText: "总预算",
      productSortText: "平台分类:",
      productBrandText: "平台品牌:",
      productModelText: "平台型号:",
      numText: "需求数量:",
      hopePriceText: "期望采购总价:",
      mainParamsText: "重要参数:",
      applicationText: "应用需求:",
      loadTimeText: "预计装机时间:",
      introduceText: "采购需求说明:",
      sortPlaceholder: "请选择分类",
      brandPlaceholder: "请选择品牌",
      modelPlaceholder: "默认为不限",
      hopePricePlaceholder: "请真实填写采购期望价格",
      paramPlaceholder: "请选择或输入重要参数",
      loadTimePlaceholder: "请选择预计装机时间",
      appPlaceholder: "为保证你的采购质量及效率请详细填写信息化应用需求",
      introducePlaceholder: "为了使您的需求清晰准确，请尽量详细说明",
      isShow: false,
      show: false,
      isModel: true
    },
    value: {
      productLineName: "",
      productLine: "",
      productLineId: "",
      brandName: "",
      brand: "",
      brandId: "",
      modelList: [],
      num: 1, //需求数量
      price: "", //期望价格
      application: "", //应用需求
      mainParamsName: "",
      params: "", //重要参数
      loadTime: "", //预计时间
      introduce: "" //采购需求说明
    }
  },
  {
    code: "JRTG",
    text: {
      typeText: "金融",
      unitText: "单",
      countText: "总融资金额",
      productSortText: "金融分类:",
      productBrandText: "金融服务商:",
      hopePriceText: "预计融资金额:",
      mainParamsText: "关键词:",
      applicationText: "应用方向:",
      loadTimeText: "预计融资时间:",
      introduceText: "采购需求说明:",
      sortPlaceholder: "请选择分类",
      brandPlaceholder: "请选择服务商",
      hopePricePlaceholder: "请真实填写融资金额",
      paramPlaceholder: "请选择或输入关键词",
      loadTimePlaceholder: "请选择预计融资时间",
      appPlaceholder: "为保证你的采购质量及效率请详细填写融资应用方向",
      introducePlaceholder: "为了使您的需求清晰准确，请尽量详细说明",
      isShow: false,
      show: false,
      isModel: false
    },
    value: {
      productLineName: "",
      productLine: "",
      productLineId: "",
      brandName: "",
      brand: "",
      price: "", //融资金额
      application: "", //应用方向
      mainParamsName: "",
      params: "", //关键词
      loadTime: "", //预计融资时间
      introduce: "" //采购需求说明
    }
  },
  {
    code: "ZXTG",
    text: {
      typeText: "咨询",
      unitText: "次",
      countText: "总咨询预算",
      productSortText: "咨询服务分类:",
      productBrandText: "咨询服务商:",
      numText: "需求数量:",
      hopePriceText: "期望采购总价:",
      mainParamsText: "关键词:",
      applicationText: "应用方向:",
      loadTimeText: "预计咨询时间:",
      introduceText: "采购需求说明:",
      sortPlaceholder: "请选择分类",
      brandPlaceholder: "请选择服务商",
      hopePricePlaceholder: "请真实填写采购期望价格",
      paramPlaceholder: "请选择或输入关键词",
      loadTimePlaceholder: "请选择预计咨询时间",
      appPlaceholder: "为保证你的采购质量及效率请详细填写咨询应用方向",
      introducePlaceholder: "为了使您的需求清晰准确，请尽量详细说明",
      isShow: false,
      show: false,
      isModel: false
    },
    value: {
      productLineName: "",
      productLineId: "",
      productLine: "",
      brandName: "",
      brand: "",
      num: 1, //需求数量
      price: "", //采购总价
      application: "", //应用方向
      mainParamsName: "",
      params: "", //关键词
      loadTime: "", //预计咨询时间
      introduce: "" //采购需求说明
    }
  }
];
export default {
  data() {
    return {
      infos,
      types,
      show: false,
      value: "",
      currentDate: new Date(),
      currentIdx: null,
      infoText: infos[0].text,
      info: infos[0].value,
      demandNum: "",
      histroyTotalDemandNum: "",
      totalPrice: "",
      loadTimeObj: {}
    };
  },
  methods: {
    ...mapMutations([
      "setTransition",
      "SBTGProductBrandFirst",
      "SBTGProductBrandSecond",
      "SBTGProductBrandThird",
      "HCTGProductBrandFirst",
      "HCTGProductBrandSecond",
      "HCTGProductBrandThird",
      "SHTGProductBrand",
      "xxHTGProductBrand",
      "JRTGProductBrand",
      "ZXTGProductBrand",
      "SBTGProductModelFirst",
      "SBTGProductModelSecond",
      "SBTGProductModelThird",
      "HCTGProductModelFirst",
      "HCTGProductModelSecond",
      "HCTGProductModelThird",
      "SHTGProductModel",
      "xxHTGProductModel",
      "JRTGProductModel",
      "ZXTGProductModel"
    ]),
    // confirmHandle(value, index) {
    //   console.log(value);
    //   console.log(index);
    // },
    // cancelHandle() {
    //   this.show = false;
    // },
    // changeHandle(picker, values) {
    //   console.log(picker.getValues());
    // },
    showDatePicker() {
      if (!this.datePicker) {
        this.datePicker = this.$createDatePicker({
          min: new Date(2016, 0, 1),
          max: new Date(2025, 11, 31),
          value: new Date(),
          onSelect: this.selectHandle,
          onCancel: this.cancelHandle
        });
      }
      this.datePicker.show();
    },
    selectHandle(date, selectedVal, selectedText) {
      console.log(selectedVal);
      this.info.installTime = selectedVal.join("-");
    },
    cancelHandle() {
      // this.info.installTime = selectedVal.join("-");
    },
    addClass(index) {
      this.currentIdx = index;
      this.info.maintenanceType = this.types[index].id;
    },
    //选择产品线
    jumpProductCateGory() {
      if (this.groupPurchaseId) {
        if (this.groupPurchaseTypeId) {
          this.setTransition("turn-on");
          this.$router.push({
            path: "productCategory",
            query: {
              groupPurchaseTypeId: this.groupType.id,
              groupTypeCode: this.groupType.code,
              page: "submitGroupDemand",
              vuexSelectValue: this.$store.state.page.submitGroupDemand[
                this.groupType.code
              ].productSort
            }
          });
        } else {
          Toast("请先选择需求类型");
          return;
        }
      } else {
        Toast("请先选择团购大会");
        return;
      }
    },
    //清空
    clear(index) {
      console.log(index);
      var initialValue = [
        {
          aliasId: "",
          aliasName: "",
          brandId: "",
          brandLabel: "",
          brandName: ""
        }
      ];
      if (index == 0) {
        if (this.groupType.code == "SBTG") {
          this.SBTGProductBrandFirst(initialValue);
          this.SBTGProductModelFirst([]);
        } else if (this.groupType.code == "HCTG") {
          this.HCTGProductBrandFirst(initialValue);
          this.HCTGProductModelFirst([]);
        }
        this.info.productBrandFirstName = "";
        this.info.brandFirstId = "";
        this.info.modelListFirst = [];
      } else if (index == 1) {
        if (this.groupType.code == "SBTG") {
          this.SBTGProductBrandSecond(initialValue);
          this.SBTGProductModelSecond([]);
        } else if (this.groupType.code == "HCTG") {
          this.HCTGProductBrandSecond(initialValue);
          this.HCTGProductModelSecond([]);
        }
        this.info.productBrandSecondName = "";
        this.info.brandSecondId = "";
        this.info.modelListSecond = [];
      } else {
        if (this.groupType.code == "SBTG") {
          this.SBTGProductBrandThird(initialValue);
          this.SBTGProductModelThird([]);
        } else if (this.groupType.code == "HCTG") {
          this.HCTGProductBrandThird(initialValue);
          this.HCTGProductModelThird([]);
        }
        this.info.productBrandThirdName = "";
        this.info.brandThirdId = "";
        this.info.modelListThird = [];
      }
    },
    //设备和耗材专用（选择品牌）
    jumpToBrand(index) {
      console.log(index);
      if (index == 0) {
        var productBrand = "productBrandFirst";
      } else if (index == 1) {
        var productBrand = "productBrandSecond";
      } else {
        var productBrand = "productBrandThird";
      }
      if (this.info.productLineId) {
        this.setTransition("turn-on");
        this.$router.push({
          path: "selectBrand",
          query: {
            productLineId: this.info.productLineId,
            groupTypeCode: this.groupType.code,
            page: "submitGroupDemand",
            type: index,
            vuexSelectValue: this.$store.state.page.submitGroupDemand[
              this.groupType.code
            ][productBrand]
          }
        });
      } else {
        Toast({ message: "请先选择分类", duration: 1000 });
        return;
      }
    },
    //设备和耗材专用（选择型号）
    jumpToModel(index) {
      if (index == 0) {
        var productModel = "productModelFirst";
        var brandId = this.info.brandFirstId;
      } else if (index == 1) {
        var productModel = "productModelSecond";
        var brandId = this.info.brandSecondId;
      } else {
        var productModel = "productModelThird";
        var brandId = this.info.brandThirdId;
      }
      if (brandId) {
        this.setTransition("turn-on");
        this.$router.push({
          path: "selectModel",
          query: {
            productLineId: this.info.productLineId,
            brandId: brandId,
            groupTypeCode: this.groupType.code,
            page: "submitGroupDemand",
            type: index,
            isMultiple: true,
            vuexSelectValue: this.$store.state.page.submitGroupDemand[
              this.groupType.code
            ][productModel]
          }
        });
      } else {
        Toast({ message: "请先选择品牌", duration: 1000 });
        return;
      }
    },
    jumpSelectBrand() {
      if (this.info.productLineId) {
        this.setTransition("turn-on");
        this.$router.push({
          path: "selectBrand",
          query: {
            productLineId: this.info.productLineId,
            groupTypeCode: this.groupType.code,
            page: "submitGroupDemand",
            vuexSelectValue: this.$store.state.page.submitGroupDemand[
              this.groupType.code
            ].productBrand
          }
        });
      } else {
        Toast("请先选择分类");
        return;
      }
    },
    jumpSelectModel() {
      if (this.info.brandId) {
        this.setTransition("turn-on");
        this.$router.push({
          path: "selectModel",
          query: {
            brandId: this.info.brandId,
            productLineId: this.info.productLineId,
            groupTypeCode: this.groupType.code,
            page: "submitGroupDemand",
            isMultiple: true,
            vuexSelectValue: this.$store.state.page.submitGroupDemand[
              this.groupType.code
            ].productModel
          }
        });
      } else {
        Toast("请先选择品牌");
        return;
      }
    },
    jumpMainParams() {
      if (this.groupPurchaseTypeId) {
        this.setTransition("turn-on");
        this.$router.push({
          path: "mainParams",
          query: {
            groupTypeCode: this.groupType.code,
            page: "submitGroupDemand",
            vuexSelectValue: this.$store.state.page.submitGroupDemand[
              this.groupType.code
            ].mainParams
          }
        });
      } else {
        Toast("请先选择团购需求类型");
        return;
      }
    },
    jumpPredictTime() {
      if (this.groupPurchaseTypeId) {
        this.setTransition("turn-on");
        this.$router.push({
          path: "perdictTime",
          query: {
            groupTypeCode: this.groupType.code,
            page: "submitGroupDemand"
          }
        });
      } else {
        Toast("请先选择团购需求类型");
        return;
      }
    },
    jumpInstallTime() {}
  },
  components: {
    basicTitle,
    Group,
    XTextarea,
    XNumber,
    CellBox
  },
  props: ["groupType", "groupPurchaseId", "groupPurchaseTypeId"],
  watch: {
    groupType() {
      console.log("选择的团购类型：", this.groupType);
      for (var i = 0; i < this.infos.length; i++) {
        if (this.infos[i].code == this.groupType.code) {
          this.infoText = this.infos[i].text;
          this.info = this.infos[i].value;
        }
      }
    },
    groupPurchaseId() {}
  },
  activated() {
    if (this.groupType.code) {
      this.info.productLineName = _.join(
        _.map(
          this.$store.state.page.submitGroupDemand[this.groupType.code]
            .productSort,
          this.$store.state.page.submitGroupDemand[this.groupType.code]
            .productSort[0].aliasName
            ? "aliasName"
            : "productLineName"
        ),
        ","
      );
      this.info.productLineId = _.join(
        _.map(
          this.$store.state.page.submitGroupDemand[this.groupType.code]
            .productSort,
          "productLineId"
        ),
        ","
      );
      this.info.productLine = this.$store.state.page.submitGroupDemand[
        this.groupType.code
      ].productSort;
      if (this.groupType.code == "SBTG" || this.groupType.code == "HCTG") {
        this.info.productBrandFirstName = _.join(
          _.map(
            this.$store.state.page.submitGroupDemand[this.groupType.code]
              .productBrandFirst,
            this.$store.state.page.submitGroupDemand[this.groupType.code]
              .productBrandFirst[0].aliasName
              ? "aliasName"
              : "brandName"
          ),
          ","
        );
        this.info.productBrandSecondName = _.join(
          _.map(
            this.$store.state.page.submitGroupDemand[this.groupType.code]
              .productBrandSecond,
            this.$store.state.page.submitGroupDemand[this.groupType.code]
              .productBrandSecond[0].aliasName
              ? "aliasName"
              : "brandName"
          ),
          ","
        );
        this.info.productBrandThirdName = _.join(
          _.map(
            this.$store.state.page.submitGroupDemand[this.groupType.code]
              .productBrandThird,
            this.$store.state.page.submitGroupDemand[this.groupType.code]
              .productBrandThird[0].aliasName
              ? "aliasName"
              : "brandName"
          ),
          ","
        );
        this.info.brandFirstId = _.join(
          _.map(
            this.$store.state.page.submitGroupDemand[this.groupType.code]
              .productBrandFirst,
            "brandId"
          ),
          ","
        );
        this.info.brandSecondId = _.join(
          _.map(
            this.$store.state.page.submitGroupDemand[this.groupType.code]
              .productBrandSecond,
            "brandId"
          ),
          ","
        );
        this.info.brandThirdId = _.join(
          _.map(
            this.$store.state.page.submitGroupDemand[this.groupType.code]
              .productBrandThird,
            "aliasId"
          ),
          ","
        );
        this.info.aliasBrandFirstId = _.join(
          _.map(
            this.$store.state.page.submitGroupDemand[this.groupType.code]
              .productBrandFirst,
            "aliasId"
          ),
          ","
        );
        this.info.aliasBrandSecondId = _.join(
          _.map(
            this.$store.state.page.submitGroupDemand[this.groupType.code]
              .productBrandSecond,
            "aliasId"
          ),
          ","
        );
        this.info.aliasBrandThirdId = _.join(
          _.map(
            this.$store.state.page.submitGroupDemand[this.groupType.code]
              .productBrandThird,
            "aliasId"
          ),
          ","
        );
        this.info.modelListFirst = this.$store.state.page.submitGroupDemand[
          this.groupType.code
        ].productModelFirst;
        this.info.modelListSecond = this.$store.state.page.submitGroupDemand[
          this.groupType.code
        ].productModelSecond;
        this.info.modelListThird = this.$store.state.page.submitGroupDemand[
          this.groupType.code
        ].productModelThird;
      } else {
        this.info.brandName = _.join(
          _.map(
            this.$store.state.page.submitGroupDemand[this.groupType.code]
              .productBrand,
            this.$store.state.page.submitGroupDemand[this.groupType.code]
              .productBrand[0].aliasName
              ? "aliasName"
              : "brandName"
          ),
          ","
        );
        this.info.brandId = _.join(
          _.map(
            this.$store.state.page.submitGroupDemand[this.groupType.code]
              .productBrand,
            "brandId"
          ),
          ","
        );
        this.info.brand = this.$store.state.page.submitGroupDemand[
          this.groupType.code
        ].productBrand;
        this.info.modelList = this.$store.state.page.submitGroupDemand[
          this.groupType.code
        ].productModel;
      }
      if (this.groupType.code != "SHTG") {
        this.info.mainParamsName = _.join(
          _.map(
            this.$store.state.page.submitGroupDemand[this.groupType.code]
              .mainParams,
            "name"
          ),
          ","
        );
        this.info.params = JSON.stringify(
          this.$store.state.page.submitGroupDemand[this.groupType.code]
            .mainParams
        );
      }

      this.info.loadTime = this.$store.state.page.submitGroupDemand[
        this.groupType.code
      ].predictTime.year
        ? this.$store.state.page.submitGroupDemand[this.groupType.code]
            .predictTime.year +
          "年" +
          this.$store.state.page.submitGroupDemand[this.groupType.code]
            .predictTime.quarter
        : "";
    }
    _getData(
      "/server_pro/groupPurchaseHospital!request.action",
      {
        method: "getGroupPurchaseHospitalCountInfo",
        params: {
          groupPurchaseId: this.groupPurchaseId,
          groupPurchaseTypeId: this.groupType.id,
          productLineId: this.info.productLineId,
          productLineAliasId: this.info.aliasProductLineId
        }
      },
      data => {
        this.demandNum = data.demandNum;
        this.histroyTotalDemandNum = data.histroyTotalDemandNum;
        this.totalPrice = data.totalPrice;
      }
    );
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../../static/scss/_commonScss";
.groupDemandWriteInfo {
  background-color: #f6f6f6;
  ul {
    background-color: #fff;
    padding-left: 13px;
    margin-bottom: 10px;
    li {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      min-height: 47px;
      border-bottom: 0.5px solid #f6f6f6;
      a {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        text-decoration: none;
        width: 100%;
        span {
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #333333;
          float: left;
          width: auto;
        }
        /deep/ .cube-btn {
          flex: 1;
          background-color: #fff;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #cccccc;
          text-align: right;
          margin-right: 13px;
          background: url("/static/images/grayarrow.png") no-repeat center right;
          background-size: 8px 14px;
          &.valueStyle {
            color: #999;
          }
        }
        > div {
          display: flex;
          justify-content: flex-end;
          padding-right: 13px;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #999999;
          i {
            display: flex;
            height: 14px;
            width: 8px;
            background: url("/static/images/grayarrow.png") no-repeat center;
            background-size: 100% 100%;
            margin-left: 3px;
          }
          &.maintanceType {
            justify-content: flex-start;
            align-items: center;
            span {
              height: 29px;
              line-height: 29px;
              padding: 0 16px;
              font-family: PingFangSC-Regular;
              font-size: 14px;
              color: #333333;
              margin-right: 10px;
              background: rgba(142, 142, 142, 0.05);
              border-radius: 2px;
              &.active {
                background: rgba(1, 157, 221, 0.14);
                font-family: PingFangSC-Medium;
                color: #019ddd;
              }
            }
          }
        }
      }
      > span {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #333333;
      }
      > div {
        display: flex;
        justify-content: flex-end;
        padding-right: 13px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #999999;
        i {
          display: flex;
          height: 14px;
          width: 8px;
          background: url("/static/images/grayarrow.png") no-repeat center;
          background-size: 100% 100%;
          margin-left: 3px;
        }
      }
      /deep/ .cube-input {
        &.showStyle {
          input {
            flex: 0;
          }
        }
        .showModel {
          flex: 1;
          span {
            background: rgba(142, 142, 142, 0.05);
            border-radius: 2px;
            padding: 0 10px;
            text-align: center;
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #666666;
            margin-right: 5px;
            width: 68px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            &:last-child {
              margin-right: 0;
            }
          }
        }
        flex: 1;
        &:after {
          border: none;
        }
        input {
          color: #999999;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          padding-left: 0;
          text-align: right;
        }
      }
      &.price {
        /deep/ .cube-input {
          padding: 0;
          input {
            padding-right: 0;
          }
        }
        .unit {
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #333333;
          margin-left: 4px;
        }
      }
      &.clinic {
        height: auto;
        // border-bottom: none;
        > div {
          width: 100%;
        }
        /deep/ .weui-cells {
          margin-top: 0;
          width: 100%;
          &:before {
            border-top: 0;
          }
          &:after {
            border-bottom: 0;
          }
          .weui-cell {
            display: flex;
            flex-direction: column;
            padding: 0;
            .weui-cell__hd {
              height: 43px;
              font-family: PingFangSC-Regular;
              font-size: 14px;
              color: #333333;
              display: flex;
              align-items: center;
            }
            .weui-cell__bd {
              width: 100%;
              min-height: 40px;
              textarea::-webkit-input-placeholder {
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #cccccc;
              }
              textarea {
                color: #999;
                font-family: PingFangSC-Regular;
                font-size: 14px;
                margin-bottom: 12px;
              }
            }
          }
        }
      }
    }
    .number,
    .price {
      // height: 77px;
      flex-direction: column;
      position: relative;
      > div {
        align-items: center;
        height: 46px;
        width: 100%;
        span {
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #333333;
        }
        /deep/ .weui-cells {
          margin-top: 0;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;

          &::before {
            border: none;
          }
          &:after {
            border-bottom: none;
          }
          .weui-cell {
            padding: 0;
            width: 100%;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #333333;
            .weui-cell__ft {
              height: 22px;
              font-family: PingFangSC-Regular;
              font-size: 12px;
              color: #666666;
              > div {
                height: 22px;

                border-radius: 2px;
                a {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  height: 100%;
                  padding: 0;
                  width: 22px;
                  margin-right: 0;
                  svg {
                    fill: #019ddd;
                    width: 15px !important;
                  }
                  &.vux-number-disabled {
                    svg {
                      fill: #666666;
                    }
                  }
                }
                input {
                  height: 22px;
                  font-family: PingFangSC-Regular;
                  font-size: 12px;
                  color: #666666;
                }
              }
            }
          }
        }
      }
      > p {
        font-family: PingFangSC-Regular;
        font-size: 11px;
        color: #f4854b;
        line-height: 21px;
        background: rgba(244, 133, 75, 0.1);
        margin-left: -13px;
        margin-right: 13px;
        padding-left: 13px;
        min-width: 336px;
        border-top-right-radius: 21px;
        border-bottom-right-radius: 21px;
        span {
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #fb5665;
          font-style: normal;
          line-height: 16px;
        }
      }
    }
  }
  .selectBrand {
    @include box_shadow_style;
    margin-bottom: 10px;
    padding-bottom: 0.1px;
    /deep/ .basicTitle {
      h2 {
        padding-right: 0;
        border-bottom: none;
        i {
          width: 10px;
          height: 10px;
        }
        > span {
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #999999;
          display: flex;
          height: 22px;
          align-items: center;
          border-radius: 22px;
          padding: 0 13px;
          &:active {
            background: rgba($color: #999, $alpha: 0.3);
          }
        }
      }
    }
    ul {
      background: #ffffff;
      box-shadow: 0.5px 2px 7px 0.5px rgba(0, 0, 0, 0.09);
      margin: 0 13px;
      margin-bottom: 10px;
      li {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 47px;
        border-bottom: 0.5px solid #f6f6f6;
        margin-left: 13px;

        a {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          text-decoration: none;
          width: 100%;
          span {
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #333333;
            float: left;
            //justify-content: flex-start;
            // flex-wrap: nowrap;
            width: auto;
            // word-wrap: normal;
          }
          > div {
            //width: calc(100% - 70px);
            display: flex;
            justify-content: flex-end;
            padding-right: 13px;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #999999;
            i {
              display: flex;
              height: 14px;
              width: 8px;
              background: url("/static/images/grayarrow.png") no-repeat center;
              background-size: 100% 100%;
              margin-left: 3px;
            }
          }
        }
        > span {
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #333333;
        }
        > div {
          display: flex;
          justify-content: flex-end;
          padding-right: 13px;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #999999;
          i {
            display: flex;
            height: 14px;
            width: 8px;
            background: url("/static/images/grayarrow.png") no-repeat center;
            background-size: 100% 100%;
            margin-left: 3px;
          }
        }
        /deep/ .cube-input {
          &.showStyle {
            input {
              flex: 0;
            }
          }
          flex: 1;
          &:after {
            border: none;
          }
          input {
            color: #999999;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            padding-left: 0;
          }
          .showModel {
            flex: 1;
            span {
              background: rgba(142, 142, 142, 0.05);
              border-radius: 2px;
              padding: 0 10px;
              text-align: center;
              font-family: PingFangSC-Regular;
              font-size: 12px;
              color: #666666;
              margin-right: 5px;
              width: 66px;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
              &:last-child {
                margin-right: 0;
              }
            }
          }
        }
      }
    }
  }
  .parameter {
    @include box_shadow_style;
    margin-bottom: 10px;
    ul {
      padding-left: 13px;
      padding-bottom: 1px;
      li {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 47px;
        border-bottom: 0.5px solid #f6f6f6;
        a {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          text-decoration: none;
          width: 100%;
          span {
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #333333;
            float: left;
            width: auto;
          }
          > div {
            //width: calc(100% - 70px);
            display: flex;
            justify-content: flex-end;
            padding-right: 13px;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #999999;
            i {
              display: flex;
              height: 14px;
              width: 8px;
              background: url("/static/images/grayarrow.png") no-repeat center;
              background-size: 100% 100%;
              margin-left: 3px;
            }
          }
        }
        > span {
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #333333;
        }
        > div {
          display: flex;
          justify-content: flex-end;
          padding-right: 13px;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #999999;
          i {
            display: flex;
            height: 14px;
            width: 8px;
            background: url("/static/images/grayarrow.png") no-repeat center;
            background-size: 100% 100%;
            margin-left: 3px;
          }
        }
        /deep/ .cube-input {
          flex: 1;
          &:after {
            border: none;
          }
          input {
            color: #999999;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            padding-left: 0;
          }
        }
        &.clinic {
          height: auto;
          border-bottom: none;
          //margin-bottom: 10px;
          > div {
            width: 100%;
          }
          /deep/ .weui-cells {
            margin-top: 0;
            width: 100%;
            &:before {
              border-top: 0;
            }
            &:after {
              border-bottom: 0;
            }
            .weui-cell {
              display: flex;
              flex-direction: column;
              padding: 0;
              .weui-cell__hd {
                height: 43px;
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #333333;
                display: flex;
                align-items: center;
              }
              .weui-cell__bd {
                width: 100%;
                min-height: 40px;
                textarea::-webkit-input-placeholder {
                  font-family: PingFangSC-Regular;
                  font-size: 14px;
                  color: #cccccc;
                }
                textarea {
                  color: #999;
                  font-family: PingFangSC-Regular;
                  font-size: 14px;
                  margin-bottom: 12px;
                }
              }
            }
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
</style>
