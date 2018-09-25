<template>
        <ul>
            <li @click="jumpProductCateGory">
                <a>
                    <span class="star">{{infoText.productSortText}}：</span>
                    <cube-input :placeholder="infoText.sortPlaceholder" :disabled="true" v-model="info.productLineName">
                        <i slot="append"></i>
                    </cube-input>
                    </a>
            </li>
            <li @click="jumpSelectBrand">
                <a>
                    <span class="star">{{infoText.productBrandText}}：</span>
                    <cube-input :placeholder="infoText.brandPlaceholder" :disabled="true" v-model="info.brandName">
                        <i slot="append"></i>
                    </cube-input>
                </a>
            </li>
            <li @click="jumpSelectModel" v-if="infoText.show">
                <a>
                    <span>{{infoText.productModelText}}：</span>
                    <cube-input :placeholder="infoText.modelPlaceholder" :disabled="true" v-model="info.modelName">
                      <i slot="append"></i>
                    </cube-input>
                </a>
            </li>
            <li class="price">
                <span>团购价格：</span>
                <cube-input placeholder="请输入团购价格" :disabled="false" type="number" v-model.trim.number="info.price">
                    <span slot="append">万元</span>
                </cube-input>
                <div class="check_box">
                    <cube-checkbox v-model="info.isOpen">
                        对外公开
                    </cube-checkbox>
                </div>
            </li>
            <li @click="jumpMainParams"  v-if="!infoText.isShow">
                <a>
                    <span>{{infoText.mainParamsText}}：</span>
                    <cube-input :placeholder="infoText.paramPlaceholder" :disabled="true" v-model="info.mainParamsName">
                        <i slot="append"></i>
                    </cube-input>
                </a>
            </li>
            <li class="clinic"  v-if="!infoText.isShow">
                <!-- <label for="textarea"></label> -->
                <group>
                    <x-textarea :title="infoText.applicationText" v-model="info.application" :placeholder="infoText.appPlaceholder" autosize></x-textarea>
                </group>
            </li>
            <li v-if="infoText.isShow">
              <a>
                    <span class="star">响应时间：</span>
                    <cube-input class="responseTime" placeholder="请输入响应时间" v-model="info.responseTime">
                        <span slot="append">小时以内</span>
                    </cube-input>
                    </a>
            </li>
              <li v-if="infoText.isShow">
                    <a >
                        <span class="star">维保类型：</span>
                        <div class="maintanceType">
                          <span v-for="(item,index) in types" :key="index" :class="currentIdx==index?'active':''" @click="addClass(index)">{{item.name}}</span>
                        </div>
                      </a>
            </li>
        </ul>
</template>
<script>
import { mapMutations } from "vuex";
import { Group, XTextarea } from "vux";
import { Toast } from "vant";
const types = [
  { id: 0, name: "全保" },
  { id: 1, name: "备件保" },
  { id: 2, name: "人工保" }
];
const infos = [
  {
    code: "SBTG",
    text: {
      productSortText: "设备分类",
      productBrandText: "设备品牌",
      productModelText: "设备型号",
      mainParamsText: "重要参数",
      applicationText: "临床应用:",
      sortPlaceholder: "请选择分类",
      brandPlaceholder: "请选择品牌",
      modelPlaceholder: "默认为不限",
      paramPlaceholder: "请选择或输入重要参数",
      appPlaceholder: "为保证医院的采购质量与效率，请详细填写设备的临床用途。",
      isShow: false,
      show: true
    },
    value: {
      productLineName: "",
      productLineId: "",
      aliasProductLineId: "",
      brandName: "",
      brandId: "",
      aliasBrandId: "",
      modelName: "",
      modelId: "",
      price: "",
      isOpen: true,
      mainParamsName: "",
      params: "",
      application: "",
      responseTime: "",
      maintanceTypeId: ""
    }
  },
  {
    code: "HCTG",
    text: {
      productSortText: "耗材分类",
      productBrandText: "耗材品牌",
      productModelText: "耗材型号",
      mainParamsText: "重要规格",
      applicationText: "临床应用:",
      sortPlaceholder: "请选择分类",
      brandPlaceholder: "请选择品牌",
      modelPlaceholder: "默认为不限",
      paramPlaceholder: "请选择或输入重要规格",
      appPlaceholder: "为保证医院的采购质量与效率，请详细填写耗材的临床用途。",
      isShow: false,
      show: true
    },
    value: {
      productLineName: "",
      productLineId: "",
      aliasProductLineId: "",
      brandName: "",
      brandId: "",
      aliasBrandId: "",
      modelName: "",
      modelId: "",
      price: "",
      isOpen: true,
      mainParamsName: "",
      params: "",
      application: "",
      responseTime: "",
      maintanceTypeId: ""
    }
  },
  {
    code: "SHTG",
    text: {
      productSortText: "售后分类",
      productBrandText: "售后品牌",
      productModelText: "售后型号",
      mainParamsText: "重要参数",
      applicationText: "临床应用:",
      sortPlaceholder: "请选择分类",
      brandPlaceholder: "请选择品牌",
      modelPlaceholder: "默认为不限",
      paramPlaceholder: "请输入响应时间",
      appPlaceholder: "为保证医院的采购质量与效率，请详细填写设备的临床用途。",
      isShow: true,
      show: true
    },
    value: {
      productLineName: "",
      productLineId: "",
      aliasProductLineId: "",
      brandName: "",
      brandId: "",
      aliasBrandId: "",
      modelName: "",
      modelId: "",
      price: "",
      isOpen: true,
      mainParamsName: "",
      params: "",
      application: "",
      responseTime: "",
      maintanceTypeId: ""
    }
  },
  {
    code: "XXHTG",
    text: {
      productSortText: "平台分类",
      productBrandText: "平台品牌",
      productModelText: "平台型号",
      mainParamsText: "重要参数",
      applicationText: "应用需求:",
      sortPlaceholder: "请选择分类",
      brandPlaceholder: "请选择品牌",
      modelPlaceholder: "默认为不限",
      paramPlaceholder: "请选择或输入重要参数",
      appPlaceholder:
        "为保证医院的采购质量与效率，请详细填写信息化的临床用途。",
      isShow: false,
      show: true
    },
    value: {
      productLineName: "",
      productLineId: "",
      aliasProductLineId: "",
      brandName: "",
      brandId: "",
      aliasBrandId: "",
      modelName: "",
      modelId: "",
      price: "",
      isOpen: true,
      mainParamsName: "",
      params: "",
      application: "",
      responseTime: "",
      maintanceTypeId: ""
    }
  },
  {
    code: "JRTG",
    text: {
      productSortText: "金融服务分类",
      productBrandText: "金融服务商",
      mainParamsText: "关键词",
      applicationText: "应用方向:",
      sortPlaceholder: "请选择分类",
      brandPlaceholder: "请选择服务商",
      paramPlaceholder: "请选择或输入关键词",
      appPlaceholder: "为保证医院的采购质量与效率，请详细填写融资应用方向。",
      isShow: false,
      show: false
    },
    value: {
      productLineName: "",
      productLineId: "",
      aliasProductLineId: "",
      brandName: "",
      brandId: "",
      aliasBrandId: "",
      modelName: "",
      modelId: "",
      price: "",
      isOpen: true,
      mainParamsName: "",
      params: "",
      application: "",
      responseTime: "",
      maintanceTypeId: ""
    }
  },
  {
    code: "ZXTG",
    text: {
      productSortText: "咨询服务分类",
      productBrandText: "咨询服务商",
      mainParamsText: "关键词",
      applicationText: "应用方向:",
      sortPlaceholder: "请选择分类",
      brandPlaceholder: "请选择服务商",
      paramPlaceholder: "请选择或输入关键词",
      appPlaceholder: "为保证医院的采购质量与效率，请详细填写咨询应用方向。",
      isShow: false,
      show: false
    },
    value: {
      productLineName: "",
      productLineId: "",
      aliasProductLineId: "",
      brandName: "",
      brandId: "",
      aliasBrandId: "",
      modelName: "",
      modelId: "",
      price: "",
      isOpen: true,
      mainParamsName: "",
      params: "",
      application: "",
      responseTime: "",
      maintanceTypeId: ""
    }
  }
];
export default {
  data() {
    return {
      infos,
      types,
      value: "",
      currentIdx: null,
      infoText: infos[0].text,
      info: infos[0].value
    };
  },
  props: ["groupType"],
  components: {
    Group,
    XTextarea
  },
  methods: {
    ...mapMutations(["setTransition"]),
    addClass(i) {
      this.currentIdx = i;
      this.info.maintanceTypeId = this.types[i].id;
    },
    jumpProductCateGory() {
      if (this.groupType.code) {
        this.setTransition("turn-on");
        this.$router.push({
          path: "productCategory",
          query: {
            groupPurchaseTypeId: this.groupType.id,
            groupTypeCode: this.groupType.code
          }
        });
      } else {
        Toast("请先选择团购产品类型");
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
            groupTypeCode: this.groupType.code
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
            groupTypeCode: this.groupType.code
          }
        });
      } else {
        Toast("请先选择品牌");
        return;
      }
    },
    jumpMainParams() {
      if (this.groupType.code) {
        this.setTransition("turn-on");
        this.$router.push({
          path: "mainParams",
          query: {
            groupTypeCode: this.groupType.code
          }
        });
      } else {
        Toast("请先选择团购产品类型");
        return;
      }
    }
  },
  activated() {
    switch (this.groupType.code) {
      case "SBTG":
        this.info.productLineName = _.join(
          _.map(this.$store.state.page.uploadProduct.SBTG.productSort, "name"),
          ","
        );
        this.info.productLineId = _.join(
          _.map(
            this.$store.state.page.uploadProduct.SBTG.productSort,
            "productLineId"
          ),
          ","
        );
        this.info.aliasProductLineId = _.join(
          _.map(
            this.$store.state.page.uploadProduct.SBTG.productSort,
            "aliasId"
          ),
          ","
        );
        this.info.brandName = _.join(
          _.map(this.$store.state.page.uploadProduct.SBTG.productBrand, "name"),
          ","
        );
        this.info.brandId = _.join(
          _.map(
            this.$store.state.page.uploadProduct.SBTG.productBrand,
            "brandId"
          ),
          ","
        );
        this.info.aliasBrandId = _.join(
          _.map(
            this.$store.state.page.uploadProduct.SBTG.productBrand,
            "alisaBrandId"
          ),
          ","
        );
        this.info.modelName = _.join(
          _.map(this.$store.state.page.uploadProduct.SBTG.productModel, "name"),
          ","
        );
        this.info.modelId = _.join(
          _.map(this.$store.state.page.uploadProduct.SBTG.productModel, "id"),
          ","
        );
        this.info.mainParamsName = _.join(
          _.map(this.$store.state.page.uploadProduct.SBTG.mainParams, "name"),
          ","
        );
        this.info.params = this.$store.state.page.uploadProduct.SBTG.mainParams;
        break;
      case "HCTG":
        this.info.productLineName = _.join(
          _.map(this.$store.state.page.uploadProduct.HCTG.productSort, "name"),
          ","
        );
        this.info.productLineId = _.join(
          _.map(
            this.$store.state.page.uploadProduct.HCTG.productSort,
            "productLineId"
          ),
          ","
        );
        this.info.aliasProductLineId = _.join(
          _.map(
            this.$store.state.page.uploadProduct.HCTG.productSort,
            "aliasId"
          ),
          ","
        );
        this.info.brandName = _.join(
          _.map(this.$store.state.page.uploadProduct.HCTG.productBrand, "name"),
          ","
        );
        this.info.brandId = _.join(
          _.map(
            this.$store.state.page.uploadProduct.HCTG.productBrand,
            "brandId"
          ),
          ","
        );
        this.info.aliasBrandId = _.join(
          _.map(
            this.$store.state.page.uploadProduct.HCTG.productBrand,
            "alisaBrandId"
          ),
          ","
        );
        this.info.modelName = _.join(
          _.map(this.$store.state.page.uploadProduct.HCTG.productModel, "name"),
          ","
        );
        this.info.modelId = _.join(
          _.map(this.$store.state.page.uploadProduct.HCTG.productModel, "id"),
          ","
        );
        this.info.mainParamsName = _.join(
          _.map(this.$store.state.page.uploadProduct.HCTG.mainParams, "name"),
          ","
        );
        this.info.params = this.$store.state.page.uploadProduct.HCTG.mainParams;
        break;
      case "SHTG":
        this.info.productLineName = _.join(
          _.map(this.$store.state.page.uploadProduct.SHTG.productSort, "name"),
          ","
        );
        this.info.productLineId = _.join(
          _.map(
            this.$store.state.page.uploadProduct.SHTG.productSort,
            "productLineId"
          ),
          ","
        );
        this.info.aliasProductLineId = _.join(
          _.map(
            this.$store.state.page.uploadProduct.SHTG.productSort,
            "aliasId"
          ),
          ","
        );
        this.info.brandName = _.join(
          _.map(this.$store.state.page.uploadProduct.SHTG.productBrand, "name"),
          ","
        );
        this.info.brandId = _.join(
          _.map(
            this.$store.state.page.uploadProduct.SHTG.productBrand,
            "brandId"
          ),
          ","
        );
        this.info.aliasBrandId = _.join(
          _.map(
            this.$store.state.page.uploadProduct.SHTG.productBrand,
            "alisaBrandId"
          ),
          ","
        );
        this.info.modelName = _.join(
          _.map(this.$store.state.page.uploadProduct.SHTG.productModel, "name"),
          ","
        );
        this.info.modelId = _.join(
          _.map(this.$store.state.page.uploadProduct.SHTG.productModel, "id"),
          ","
        );
        this.info.mainParamsName = _.join(
          _.map(this.$store.state.page.uploadProduct.SHTG.mainParams, "name"),
          ","
        );
        this.info.params = this.$store.state.page.uploadProduct.SHTG.mainParams;
        break;
      case "XXHTG":
        this.info.productLineName = _.join(
          _.map(this.$store.state.page.uploadProduct.XXHTG.productSort, "name"),
          ","
        );
        this.info.productLineId = _.join(
          _.map(
            this.$store.state.page.uploadProduct.XXHTG.productSort,
            "productLineId"
          ),
          ","
        );
        this.info.aliasProductLineId = _.join(
          _.map(
            this.$store.state.page.uploadProduct.XXHTG.productSort,
            "aliasId"
          ),
          ","
        );
        this.info.brandName = _.join(
          _.map(
            this.$store.state.page.uploadProduct.XXHTG.productBrand,
            "name"
          ),
          ","
        );
        this.info.brandId = _.join(
          _.map(
            this.$store.state.page.uploadProduct.XXHTG.productBrand,
            "brandId"
          ),
          ","
        );
        this.info.aliasBrandId = _.join(
          _.map(
            this.$store.state.page.uploadProduct.XXHTG.productBrand,
            "alisaBrandId"
          ),
          ","
        );
        this.info.modelName = _.join(
          _.map(
            this.$store.state.page.uploadProduct.XXHTG.productModel,
            "name"
          ),
          ","
        );
        this.info.modelId = _.join(
          _.map(this.$store.state.page.uploadProduct.XXHTG.productModel, "id"),
          ","
        );
        this.info.mainParamsName = _.join(
          _.map(this.$store.state.page.uploadProduct.XXHTG.mainParams, "name"),
          ","
        );
        this.info.params = this.$store.state.page.uploadProduct.XXHTG.mainParams;
        break;
      case "JRTG":
        this.info.productLineName = _.join(
          _.map(this.$store.state.page.uploadProduct.JRTG.productSort, "name"),
          ","
        );
        this.info.productLineId = _.join(
          _.map(
            this.$store.state.page.uploadProduct.JRTG.productSort,
            "productLineId"
          ),
          ","
        );
        this.info.aliasProductLineId = _.join(
          _.map(
            this.$store.state.page.uploadProduct.JRTG.productSort,
            "aliasId"
          ),
          ","
        );
        this.info.brandName = _.join(
          _.map(this.$store.state.page.uploadProduct.JRTG.productBrand, "name"),
          ","
        );
        this.info.brandId = _.join(
          _.map(
            this.$store.state.page.uploadProduct.JRTG.productBrand,
            "brandId"
          ),
          ","
        );
        this.info.aliasBrandId = _.join(
          _.map(
            this.$store.state.page.uploadProduct.JRTG.productBrand,
            "alisaBrandId"
          ),
          ","
        );
        this.info.modelName = _.join(
          _.map(this.$store.state.page.uploadProduct.JRTG.productModel, "name"),
          ","
        );
        this.info.modelId = _.join(
          _.map(this.$store.state.page.uploadProduct.JRTG.productModel, "id"),
          ","
        );
        this.info.mainParamsName = _.join(
          _.map(this.$store.state.page.uploadProduct.JRTG.mainParams, "name"),
          ","
        );
        this.info.params = this.$store.state.page.uploadProduct.JRTG.mainParams;
        break;
      case "ZXTG":
        this.info.productLineName = _.join(
          _.map(this.$store.state.page.uploadProduct.ZXTG.productSort, "name"),
          ","
        );
        this.info.productLineId = _.join(
          _.map(
            this.$store.state.page.uploadProduct.ZXTG.productSort,
            "productLineId"
          ),
          ","
        );
        this.info.aliasProductLineId = _.join(
          _.map(
            this.$store.state.page.uploadProduct.ZXTG.productSort,
            "aliasId"
          ),
          ","
        );
        this.info.brandName = _.join(
          _.map(this.$store.state.page.uploadProduct.ZXTG.productBrand, "name"),
          ","
        );
        this.info.brandId = _.join(
          _.map(
            this.$store.state.page.uploadProduct.ZXTG.productBrand,
            "brandId"
          ),
          ","
        );
        this.info.aliasBrandId = _.join(
          _.map(
            this.$store.state.page.uploadProduct.ZXTG.productBrand,
            "alisaBrandId"
          ),
          ","
        );
        this.info.modelName = _.join(
          _.map(this.$store.state.page.uploadProduct.ZXTG.productModel, "name"),
          ","
        );
        this.info.modelId = _.join(
          _.map(this.$store.state.page.uploadProduct.ZXTG.productModel, "id"),
          ","
        );
        this.info.mainParamsName = _.join(
          _.map(this.$store.state.page.uploadProduct.ZXTG.mainParams, "name"),
          ","
        );
        this.info.params = this.$store.state.page.uploadProduct.ZXTG.mainParams;
        break;
    }
  },
  watch: {
    groupType() {
      console.log(this.groupType);
      for (var i = 0; i < this.infos.length; i++) {
        if (this.infos[i].code == this.groupType.code) {
          this.infoText = this.infos[i].text;
          this.info = this.infos[i].value;
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
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
        &.star {
          padding-left: 7px;
          background: url("../../../../../static/images/star.png") no-repeat
            left center;
          background-size: 7px;
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
          background: url("../../../../../static/images/grayarrow.png")
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
    /deep/ .cube-input {
      flex: 1;
      &:after {
        border: none;
      }
      &.responseTime {
        .cube-input-field {
          text-align: left;
        }
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
      .check_box {
        height: 100%;
      }
      /deep/ .cube-input {
        padding-right: 16px;
        > .cube-input-append {
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #333333;
        }
      }
      /deep/ .cube-checkbox {
        // padding-right: 0;
        display: flex;
        align-items: center;
        padding-left: 0px;
        height: 100%;
        &:active {
          // background: rgba($color: #999, $alpha: 0.3);
        }
        .cube-checkbox-wrap {
          display: flex;
          align-items: center;
          padding: 0;
          padding-left: 16px;
          border-left: 0.5px solid rgba(153, 153, 153, 0.31);
          height: 16px;
          .cube-checkbox-ui {
            height: 14px;
            width: 14px;
            margin-right: 4px;
            margin-top: 3px;
            &:before {
              display: initial;
            }
            .cubeic-right {
              i {
                color: #019ddd;
              }
            }
          }
          .cube-checkbox-label {
            font-family: PingFangSC-Medium;
            font-size: 14px;
            color: #666666;
          }
        }
        &.cube-checkbox_checked {
          .cube-checkbox-ui {
            height: 14px;
            width: 14px;
            margin-right: 4px;
            margin-top: 3px;
            &:before {
              display: initial;
            }
            .cubeic-right {
              height: 14px;
              width: 14px;
              color: #019ddd;
            }
          }
        }
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
            background: url("../../../../../static/images/star.png") no-repeat
              left center;
            background-size: 7px;
            .weui-label {
              margin-left: 7px;
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
              // height: 45px !important;
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
</style>
