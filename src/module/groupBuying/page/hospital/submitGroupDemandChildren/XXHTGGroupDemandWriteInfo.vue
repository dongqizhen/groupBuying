<template>
    <div class="groupDemandWriteInfo">
        <ul>
            <li @click="jumpProductCateGory">
                <a>
                    <span>平台分类:</span>
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
                    本次团购,{{info.productLineName}}信息化已累计申报<span>{{info.demandNum}}</span>单,历史累计申报共<span>{{info.histroyTotalDemandNum}}</span>单
                </p>
            </li>
            <li class="price">
                <div>
                    <span>期望采购总价:</span>
                    <cube-input placeholder="请真实填写采购期望价格" type="number" @input="savePriceValue" :disabled="false" v-model="info.price">
                    </cube-input>
                    <div class="unit">万元</div>
                </div>
                <p>
                    本次团购,{{info.productLineName}}信息化已累计申报<span>{{info.demandNum}}</span>单,总预算为<span>{{info.totalPrice}}</span>万元
                </p>
            </li>
            <li class="clinic">
                <group>
                    <x-textarea title="应用需求:" v-model="info.application" @on-change="saveApplicationValue" placeholder="为保证你的采购质量及效率请详细填写信息化应用需求" autosize></x-textarea>
                </group>
            </li>
            <li class="SHTGbrand" @click="jumpSelectBrand">
                <a>
                    <span>平台品牌:</span>
                    <cube-input placeholder="请选择品牌" :disabled="true" v-model="info.brandName">
                        <i slot="append"></i>
                    </cube-input>
                </a>
            </li>
            <li class="SHTGmodel" @click="jumpSelectModel">
                <a>
                    <span>平台型号:</span>
                    <cube-input placeholder="默认为不限" :class="this.info.model.length!=0?'showStyle':''" :disabled="true">
                        <span slot="prepend" class="showModel">
                            <span v-for="(item,index) in info.model" :key="index">{{item.name}}</span>
                        </span>
                        <i slot="append"></i>
                    </cube-input>
                </a>
            </li>
        </ul>
        <div class="parameter">
            <ul>
                <li @click="jumpMainParams">
                    <a>
                        <span><i><img src="../../../../../../static/images/star.png" alt=""></i>重要参数:</span>
                        <cube-input placeholder="请选择或输入重要参数" :disabled="true" v-model="info.mainParamsName">
                            <i slot="append"></i>
                        </cube-input>
                    </a>
                </li>
                <li @click="jumpPredictTime">
                    <a>
                        <span><i><img src="../../../../../../static/images/star.png" alt=""></i>预计装机时间:</span>
                        <cube-input placeholder="请选择预计装机时间" :disabled="true" v-model="info.showLoadTime">
                            <i slot="append"></i>
                        </cube-input>
                    </a>
                </li>
                <li class="clinic">
                    <group>
                        <x-textarea title="<i><img src='../static/images/star.png' alt=''></i>采购需求说明:" @on-change="saveIntroduceValue" v-model="info.introduce" placeholder="为了使您的需求清晰准确，请尽量详细说明" autosize :height="43"></x-textarea>
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
      value: "",
      y: ""
    };
  },
  computed: {
    info() {
      return this.$store.state.page.submitGroupDemand.XXHTG;
    }
  },
  watch: {
    info() {
      console.log("变化的数据", this.$store.state.page.submitGroupDemand.XXHTG);
    }
  },
  methods: {
    ...mapMutations([
      "setTransition",
      "XXHTGNumSave",
      "XXHTGPriceSave",
      "XXHTGApplicationSave",
      "XXHTGIntroduceSave"
    ]),
    saveNumValue() {
      this.XXHTGNumSave(this.info.num);
    },
    savePriceValue() {
      this.XXHTGPriceSave(this.info.price);
    },
    saveApplicationValue() {
      this.XXHTGApplicationSave(this.info.application);
    },
    saveIntroduceValue() {
      this.XXHTGIntroduceSave(this.info.introduce);
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
              groupTypeCode: "XXHTG",
              page: "submitGroupDemand",
              vuexSelectValue: this.$store.state.page.submitGroupDemand.XXHTG
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
    jumpSelectBrand() {
      if (this.info.productLineId) {
        this.setTransition("turn-on");
        this.$router.push({
          path: "/selectBrand",
          query: {
            productLineId: this.info.productLineId,
            groupTypeCode: "XXHTG",
            page: "submitGroupDemand",
            vuexSelectValue: this.$store.state.page.submitGroupDemand.XXHTG
              .brand
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
          path: "/selectModel",
          query: {
            brandId: this.info.brandId,
            productLineId: this.info.productLineId,
            groupTypeCode: "XXHTG",
            page: "submitGroupDemand",
            isMultiple: true,
            vuexSelectValue: this.$store.state.page.submitGroupDemand.XXHTG
              .model
          }
        });
      } else {
        Toast("请先选择品牌");
        return;
      }
    },
    jumpMainParams() {
      if (this.$route.query.groupPurchaseTypeId) {
        this.setTransition("turn-on");
        this.$router.push({
          path: "/mainParams",
          query: {
            groupTypeCode: "XXHTG",
            page: "submitGroupDemand",
            vuexSelectValue: this.$store.state.page.submitGroupDemand.XXHTG
              .params
          }
        });
      } else {
        Toast("请先选择团购需求类型");
        return;
      }
    },
    jumpPredictTime() {
      if (this.$route.query.groupPurchaseId) {
        this.setTransition("turn-on");
        this.$router.push({
          path: "/perdictTime",
          query: {
            groupTypeCode: "XXHTG",
            page: "submitGroupDemand",
            vuexSelectValue: this.$store.state.page.submitGroupDemand.XXHTG
              .loadTime,
            groupPurchaseId: this.$route.query.groupPurchaseId
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
        this.$store.state.page.submitGroupDemand.XXHTG.productLine,
        this.$store.state.page.submitGroupDemand.XXHTG.productLine[0].aliasName
          ? "aliasName"
          : "productLineName"
      ),
      ","
    );
    this.info.productLineId = _.join(
      _.map(
        this.$store.state.page.submitGroupDemand.XXHTG.productLine,
        "productLineId"
      ),
      ","
    );
    this.info.aliasProductLineId = _.join(
      _.map(
        this.$store.state.page.submitGroupDemand.XXHTG.productLine,
        "aliasId"
      ),
      ","
    );
    this.info.productLine = this.$store.state.page.submitGroupDemand.XXHTG.productLine;
    this.info.brandName = _.join(
      _.map(
        this.$store.state.page.submitGroupDemand.XXHTG.brand,
        this.$store.state.page.submitGroupDemand.XXHTG.brand[0].aliasName
          ? "aliasName"
          : "brandName"
      ),
      ","
    );
    this.info.brandId = _.join(
      _.map(this.$store.state.page.submitGroupDemand.XXHTG.brand, "brandId"),
      ","
    );
    this.info.brand = this.$store.state.page.submitGroupDemand.XXHTG.brand;
    this.info.model = this.$store.state.page.submitGroupDemand.XXHTG.model;
    this.info.mainParamsName = _.join(
      _.map(this.$store.state.page.submitGroupDemand.XXHTG.params, "name"),
      ","
    );
    this.info.showLoadTime = this.$store.state.page.submitGroupDemand.XXHTG
      .loadTime.year
      ? this.$store.state.page.submitGroupDemand.XXHTG.loadTime.year +
        "年" +
        this.$store.state.page.submitGroupDemand.XXHTG.loadTime.quarter
      : "";
    this.info.loadTime = this.$store.state.page.submitGroupDemand.XXHTG.loadTime;
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
        this.info.demandNum = data.demandNum;
        this.info.histroyTotalDemandNum = data.histroyTotalDemandNum;
        this.info.totalPrice = data.totalPrice;
      }
    );
    this.$nextTick().then(() => {
      this.$parent.refresh();
      if (this.y != 0) {
        this.$parent.scrollTo(0, this.y);
      }
    });
  },
  deactivated() {},
  beforeRouteLeave(to, from, next) {
    console.log(to);
    if (to.name == "选择型号") {
      this.y = this.$parent.scroll.y;
    }
    console.log(this.y);
    next();
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
          display: flex;
          justify-content: flex-start;
          align-items: center;
          i {
            display: flex;
            height: 7px;
            width: 7px;
            margin-right: 2px;
            img {
              height: 7px;
              width: 7px;
            }
          }
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
            display: inline-block;
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
              label {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                i {
                  display: flex;
                  height: 7px;
                  width: 7px;
                  margin-right: 2px;
                  img {
                    height: 7px;
                    width: 7px;
                  }
                }
              }
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
