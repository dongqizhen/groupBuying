<template>
  <div class="groupDemandWriteInfo">
    <ul>
      <li @click="jumpProductCateGory">
        <a>
          <span>设备分类:</span>
          <cube-input placeholder="请选择分类" :disabled="true" v-model="info.productLineName">
            <i slot="append"></i>
          </cube-input>
        </a>
      </li>
      <li class="number">
        <group>
          <x-number title="需求数量:" v-model="info.num" :min="1" fillable @on-change="saveNumValue"></x-number>
        </group>
        <p>
          本次团购,{{info.productLineName}}设备已累计申报<span>{{info.demandNum}}</span>台,历史累计申报共<span>{{info.histroyTotalDemandNum}}</span>台
        </p>
      </li>
      <li class="price">
        <div>
          <span>期望采购总价:</span>
          <cube-input placeholder="请真实填写采购期望价格" type="number" :disabled="false" @input="savePriceValue" v-model="info.price">
          </cube-input>
          <div class="unit">万元</div>
        </div>
        <p>
          本次团购,{{info.productLineName}}设备已累计申报<span>{{info.demandNum}}</span>台,总预算为<span>{{info.totalPrice}}</span>万元
        </p>
      </li>
      <li class="clinic">
        <group>
          <x-textarea title="应用需求:" v-model="info.application" @on-change="saveApplicationValue" placeholder="为保证你的采购质量及效率请详细填写设备的临床用途" autosize></x-textarea>
        </group>
      </li>
    </ul>
    <div class="selectBrand">
      <basic-title title='首选' imgurl='../static/images/selected-first.png'>
        <span slot="select">(必填)</span>
        <span slot="check" @click.stop="clear(0)">清空</span>
      </basic-title>
      <ul>
        <li @click="jumpToBrand(0)">
          <a>
            <span>品牌：</span>
            <cube-input placeholder="请选择品牌" :disabled="true" v-model="info.brandFirstName">
              <i slot="append"></i>
            </cube-input>
          </a>
        </li>
        <li @click="jumpToModel(0)">
          <a>
            <span>型号：</span>
            <cube-input placeholder="请选择型号" :class="this.info.modelFirst.length!=0?'showStyle':''" :disabled="true">
              <span slot="prepend" class="showModel">
                <span v-for="(item,index) in info.modelFirst" :key="index">{{item.name}}</span>
              </span>
              <i slot="append"></i>
            </cube-input>
          </a>
        </li>
      </ul>
      <basic-title title='次选' imgurl='../static/images/selected-second.png'>
        <span slot="check" @click.stop="clear(1)">清空</span>
      </basic-title>
      <ul>
        <li @click="jumpToBrand(1)">
          <a>
            <span>品牌：</span>
            <cube-input placeholder="请选择品牌" :disabled="true" v-model="info.brandSecondName">
              <i slot="append"></i>
            </cube-input>
          </a>
        </li>
        <li @click="jumpToModel(1)">
          <a>
            <span>型号：</span>
            <cube-input placeholder="请选择型号" :class="this.info.modelSecond.length!=0?'showStyle':''" :disabled="true">
              <span slot="prepend" class="showModel">
                <span v-for="(item,index) in info.modelSecond" :key="index">{{item.name}}</span>
              </span>
              <i slot="append"></i>
            </cube-input>
          </a>
        </li>
      </ul>
      <basic-title title='再选' imgurl='../static/images/selected-three.png'>
        <span slot="check" @click.stop="clear(2)">清空</span></basic-title>
      <ul>
        <li @click="jumpToBrand(2)">
          <a>
            <span>品牌：</span>
            <cube-input placeholder="请选择品牌" :disabled="true" v-model="info.brandThirdName">
              <i slot="append"></i>
            </cube-input>
          </a>
        </li>
        <li @click="jumpToModel(2)">
          <a>
            <span>型号：</span>
            <cube-input placeholder="请选择型号" :class="this.info.modelThird.length!=0?'showStyle':''" :disabled="true">
              <span slot="prepend" class="showModel">
                <span v-for="(item,index) in info.modelThird" :key="index">{{item.name}}</span>
              </span>
              <i slot="append"></i>
            </cube-input>
          </a>
        </li>
      </ul>
    </div>
    <div class="parameter">
      <ul>
        <li @click="jumpMainParams">
          <a>
            <span>重要参数:</span>
            <cube-input placeholder="请选择或输入重要参数" :disabled="true" v-model="info.mainParamsName">
              <i slot="append"></i>
            </cube-input>
          </a>
        </li>
        <li @click="jumpPredictTime">
          <a>
            <span>预计装机时间:</span>
            <cube-input placeholder="请选择预计装机时间" :disabled="true" v-model="info.showLoadTime">
              <i slot="append"></i>
            </cube-input>
          </a>
        </li>
        <li class="clinic">
          <group>
            <x-textarea title="采购需求说明:" v-model="info.introduce" @on-change="saveIntroduceValue" placeholder="为了使您的需求清晰准确，请尽量详细说明" autosize :height="43"></x-textarea>
          </group>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import basicTitle from "../../../components/common/basicTitle";
import { mapMutations } from "vuex";
import { Toast } from "vant";
import { DatetimePicker } from "vant";
import { Popup } from "vant";
import { _getData } from "../../../service/getData";
import { Group, XTextarea, XNumber, CellBox } from "vux";
export default {
  data() {
    return {
      value: ""
    };
  },
  computed: {
    info() {
      return this.$store.state.page.submitGroupDemand.SBTG;
    }
  },
  watch: {
    info() {
      console.log("变化的数据", this.$store.state.page.submitGroupDemand.SBTG);
    }
  },
  methods: {
    ...mapMutations([
      "setTransition",
      "SBTGProductBrandFirst",
      "SBTGProductBrandSecond",
      "SBTGProductBrandThird",
      "SBTGProductModelFirst",
      "SBTGProductModelSecond",
      "SBTGProductModelThird",
      "SBTGNumSave",
      "SBTGPriceSave",
      "SBTGApplicationSave",
      "SBTGIntroduceSave"
    ]),
    saveNumValue() {
      this.SBTGNumSave(this.info.num);
    },
    savePriceValue() {
      this.SBTGPriceSave(this.info.price);
    },
    saveApplicationValue() {
      this.SBTGApplicationSave(this.info.application);
    },
    saveIntroduceValue() {
      this.SBTGIntroduceSave(this.info.introduce);
    },
    //选择产品线
    jumpProductCateGory() {
      if (this.$route.query.groupPurchaseId) {
        if (this.$route.query.groupPurchaseTypeId) {
          this.setTransition("turn-on");
          this.$router.push({
            path: "/productCategory",
            query: {
              groupPurchaseTypeId: this.$route.query.groupPurchaseTypeId,
              groupTypeCode: "SBTG",
              page: "submitGroupDemand",
              vuexSelectValue: this.$store.state.page.submitGroupDemand.SBTG
                .productLine
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
        this.SBTGProductBrandFirst(initialValue);
        this.SBTGProductModelFirst([]);
        this.info.brandFirstName = "";
        this.info.brandFirstId = "";
        this.info.modelFirst = [];
      } else if (index == 1) {
        this.SBTGProductBrandSecond(initialValue);
        this.SBTGProductModelSecond([]);
        this.info.brandSecondName = "";
        this.info.brandSecondId = "";
        this.info.modelSecond = [];
      } else {
        this.SBTGProductBrandThird(initialValue);
        this.SBTGProductModelThird([]);
        this.info.brandThirdName = "";
        this.info.brandThirdId = "";
        this.info.modelThird = [];
      }
    },
    //设备和耗材专用（选择品牌）
    jumpToBrand(index) {
      console.log(index);
      if (index == 0) {
        var productBrand = "brandFirst";
      } else if (index == 1) {
        var productBrand = "brandSecond";
      } else {
        var productBrand = "brandThird";
      }
      if (this.info.productLineId) {
        this.setTransition("turn-on");
        this.$router.push({
          path: "/selectBrand",
          query: {
            productLineId: this.info.productLineId,
            groupTypeCode: "SBTG",
            page: "submitGroupDemand",
            type: index,
            vuexSelectValue: this.$store.state.page.submitGroupDemand.SBTG[
              productBrand
            ]
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
        var productModel = "modelFirst";
        var brandId = this.info.brandFirstId;
      } else if (index == 1) {
        var productModel = "modelSecond";
        var brandId = this.info.brandSecondId;
      } else {
        var productModel = "modelThird";
        var brandId = this.info.brandThirdId;
      }
      if (brandId) {
        this.setTransition("turn-on");
        this.$router.push({
          path: "/selectModel",
          query: {
            productLineId: this.info.productLineId,
            brandId: brandId,
            groupTypeCode: "SBTG",
            page: "submitGroupDemand",
            type: index,
            isMultiple: true,
            vuexSelectValue: this.$store.state.page.submitGroupDemand.SBTG[
              productModel
            ]
          }
        });
      } else {
        Toast({ message: "请先选择品牌", duration: 1000 });
        return;
      }
    },
    jumpMainParams() {
      if (this.$route.query.groupPurchaseTypeId) {
        this.setTransition("turn-on");
        this.$router.push({
          path: "/mainParams",
          query: {
            groupTypeCode: "SBTG",
            page: "submitGroupDemand",
            vuexSelectValue: this.$store.state.page.submitGroupDemand.SBTG
              .params
          }
        });
      } else {
        Toast("请先选择团购需求类型");
        return;
      }
    },
    jumpPredictTime() {
      if (this.$route.query.groupPurchaseTypeId) {
        this.setTransition("turn-on");
        this.$router.push({
          path: "/perdictTime",
          query: {
            groupTypeCode: "SBTG",
            page: "submitGroupDemand",
            vuexSelectValue: this.$store.state.page.submitGroupDemand.SBTG
              .loadTime
          }
        });
      } else {
        Toast("请先选择团购需求类型");
        return;
      }
    }
  },
  components: {
    basicTitle,
    Group,
    XTextarea,
    XNumber,
    CellBox
  },
  activated() {
    this.info.productLineName = _.join(
      _.map(
        this.$store.state.page.submitGroupDemand.SBTG.productLine,
        this.$store.state.page.submitGroupDemand.SBTG.productLine[0].aliasName
          ? "aliasName"
          : "productLineName"
      ),
      ","
    );
    this.info.productLineId = _.join(
      _.map(
        this.$store.state.page.submitGroupDemand.SBTG.productLine,
        "productLineId"
      ),
      ","
    );
    this.info.aliasProductLineId = _.join(
      _.map(
        this.$store.state.page.submitGroupDemand.SBTG.productLine,
        "aliasId"
      ),
      ","
    );
    this.info.brandFirstName = _.join(
      _.map(
        this.$store.state.page.submitGroupDemand.SBTG.brandFirst,
        this.$store.state.page.submitGroupDemand.SBTG.brandFirst[0].aliasName
          ? "aliasName"
          : "brandName"
      ),
      ","
    );
    this.info.brandSecondName = _.join(
      _.map(
        this.$store.state.page.submitGroupDemand.SBTG.brandSecond,
        this.$store.state.page.submitGroupDemand.SBTG.brandSecond[0].aliasName
          ? "aliasName"
          : "brandName"
      ),
      ","
    );
    this.info.brandThirdName = _.join(
      _.map(
        this.$store.state.page.submitGroupDemand.SBTG.brandThird,
        this.$store.state.page.submitGroupDemand.SBTG.brandThird[0].aliasName
          ? "aliasName"
          : "brandName"
      ),
      ","
    );
    this.info.brandFirstId = _.join(
      _.map(
        this.$store.state.page.submitGroupDemand.SBTG.brandFirst,
        "brandId"
      ),
      ","
    );
    this.info.brandSecondId = _.join(
      _.map(
        this.$store.state.page.submitGroupDemand.SBTG.brandSecond,
        "brandId"
      ),
      ","
    );
    this.info.brandThirdId = _.join(
      _.map(
        this.$store.state.page.submitGroupDemand.SBTG.brandThird,
        "brandId"
      ),
      ","
    );
    this.info.modelFirst = this.$store.state.page.submitGroupDemand.SBTG.modelFirst;
    this.info.modelSecond = this.$store.state.page.submitGroupDemand.SBTG.modelSecond;
    this.info.modelThird = this.$store.state.page.submitGroupDemand.SBTG.modelThird;
    this.info.mainParamsName = _.join(
      _.map(this.$store.state.page.submitGroupDemand.SBTG.params, "name"),
      ","
    );
    this.info.showLoadTime = this.$store.state.page.submitGroupDemand.SBTG
      .loadTime.year
      ? this.$store.state.page.submitGroupDemand.SBTG.loadTime.year +
        "年" +
        this.$store.state.page.submitGroupDemand.SBTG.loadTime.quarter
      : "";
    if (this.info.productLineId) {
      _getData(
        "/server_pro/groupPurchaseHospital!request.action",
        {
          method: "getGroupPurchaseHospitalCountInfo",
          params: {
            groupPurchaseId: this.$route.query.groupPurchaseId,
            groupPurchaseTypeId: this.$route.query.groupPurchaseTypeId,
            productLineId: this.info.productLineId,
            productLineAliasId: this.info.aliasProductLineId
          }
        },
        data => {
          console.log(data);
          this.info.demandNum = data.demandNum;
          this.info.histroyTotalDemandNum = data.histroyTotalDemandNum;
          this.info.totalPrice = data.totalPrice;
        }
      );
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../../../static/scss/_commonScss";
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
          background: url("../../../../../../static/images/grayarrow.png")
            no-repeat center right;
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
            background: url("../../../../../../static/images/grayarrow.png")
              no-repeat center;
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
          background: url("../../../../../../static/images/grayarrow.png")
            no-repeat center;
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
              background: url("../../../../../../static/images/grayarrow.png")
                no-repeat center;
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
            background: url("../../../../../../static/images/grayarrow.png")
              no-repeat center;
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
              background: url("../../../../../../static/images/grayarrow.png")
                no-repeat center;
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
            background: url("../../../../../../static/images/grayarrow.png")
              no-repeat center;
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
