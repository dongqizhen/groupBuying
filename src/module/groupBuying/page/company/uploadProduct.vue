<template>
    <div class="container uploadProduct">
        <Header title="上传团购产品（企业）"></Header>
        <div class="content">
          <div class="scroll-list-wrap">
            <cube-scroll ref="scroll">
              <div class="selectGroupMeeting">
                  <basic-title title="选择团购大会" imgurl="../static/images/groupBuy.png">
                      <span slot="select">(必选项)</span>
                  </basic-title>
                  <div class="list_box">
                      <list-item v-for="(item,index) in groupUnderWayList" :isActive="current===index?true:false" v-on:changeIdx="idx" :index="index" :key="item.id" :dataValue="item" :disabled="true"></list-item>
                  </div>
              </div>
              <div class="groupType">
                  <basic-title title="团购产品类型" imgurl="../static/images/selectproject.png">
                      <span slot="select">(必选项)</span>
                  </basic-title>
                  <select-project-nav v-on:selectObj="getItemObj" v-on:select-value="selectGroupId"></select-project-nav>
              </div>
              <div class="productBasicInfromation">
                  <basic-title title="产品基本信息" imgurl="../static/images/basicInformation.png">
                      <span slot="select">建议:通过PC端批量上传</span>
                      <a slot="check" class="server" @click="service">
                          <i></i>
                          客服
                      </a>
                  </basic-title>
                    <ul>
                        <li @click="jumpProductCateGory">
                            <a>
                                <span class="star">{{text.productSortText}}：</span>
                                <cube-input :placeholder="text.sortPlaceholder" :disabled="true" v-model="submitData.productLineName">
                                    <i slot="append"></i>
                                </cube-input>
                                </a>
                        </li>
                        <li @click="jumpSelectBrand">
                            <!-- <router-link to="/selectBrand"> -->
                            <a>
                                <span class="star">{{text.productBrandText}}：</span>
                                <cube-input :placeholder="text.brandPlaceholder" :disabled="true" v-model="productBrand.name">
                                    <i slot="append"></i>
                                </cube-input></a>
                        </li>
                        <li @click="jumpSelectModel" v-if="text.show">
                            <router-link to='/selectModel'>
                                <span>{{text.productModelText}}：</span>
                                <cube-input :placeholder="text.modelPlaceholder" :disabled="true" v-model="submitData.productModel">
                                 <i slot="append"></i>
                                </cube-input>
                            </router-link>
                        </li>
                        <li class="price">
                            <span>团购价格：</span>
                            <cube-input placeholder="请输入团购价格" :disabled="false" type="number" v-model.trim.number="groupPrice">
                                <span slot="append">万元</span>
                            </cube-input>
                            <div class="check_box">
                                <cube-checkbox v-model="checked">
                                    对外公开
                                </cube-checkbox>
                            </div>
                        </li>
                        <li @click="jumpMainParams"  v-if="!text.isShow">
                            <router-link to="/mainParams">
                                <span>{{text.mainParamsText}}：</span>
                                <cube-input :placeholder="text.paramPlaceholder" :disabled="true" v-model="mainParams">
                                    <i slot="append"></i>
                                </cube-input>
                            </router-link>
                        </li>
                        <li class="clinic"  v-if="!text.isShow">
                            <!-- <label for="textarea"></label> -->
                            <group>
                                <x-textarea :title="text.applicationText" v-model="value" :placeholder="text.appPlaceholder" autosize></x-textarea>
                            </group>
                        </li>
                        <li v-if="text.isShow">
                          <a>
                                <span class="star">响应时间：</span>
                                <cube-input class="responseTime" placeholder="请输入响应时间" v-model="responseTime">
                                    <span slot="append">小时以内</span>
                                </cube-input></a>
                        </li>
                          <li v-if="text.isShow">
                                <a >
                                    <span class="star">维保类型：</span>
                                    <div class="maintanceType">
                                      <span v-for="(item,index) in types" :key="index" :class="currentIdx==index?'active':''" @click="addClass(index)">{{item.name}}</span>
                                    </div>
                                 </a>
                        </li>
                    </ul>
              </div>
              <div class="img_upload">
                  <basic-title title="产品图片" imgurl="../static/images/imgUpload.png">
                     <span slot="select">(至少上传一张)</span>
                  </basic-title>
                  <div class="upload_container">
                      <cube-upload ref="upload"  v-model="action.files" :action="action" :simultaneous-uploads="1" :process-file="processFile" @files-added="addedHandler" @file-submitted="fileSubmitted" @file-success="fileSuccess" @file-error="fileError" @file-removed="fileRemove"/>
                      <span>点击上传产品图片</span>
                  </div>
              </div>
              <div class="product_introduce">
                  <basic-title title="产品介绍" imgurl="../static/images/Introduction.png"></basic-title>
                  <group>
                      <x-textarea v-model="introduce" placeholder="请在这里填写产品介绍" autosize></x-textarea>
                  </group>
              </div>
              <x-button v-if="submitBtnStatus" type="primary" @click.native="submitBtnClick">提交团购产品</x-button>
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
import { Group, XTextarea } from "vux";
import { _getData } from "../../service/getData";
import _ from "lodash";
import compress from "../../../../../static/js/compressImage";
import { mapMutations } from "vuex";
import { Toast } from "vant";
const text = {
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
};

const types = [
  { id: 0, name: "全保" },
  { id: 1, name: "备件保" },
  { id: 2, name: "人工保" }
];
export default {
  data() {
    return {
      text,
      types,
      responseTime: "",
      productSort: [],
      productBrand: [],
      productModel: [],
      mainParams: "",
      groupItemObj: "",
      groupPurchaseId: "",
      groupPrice: "",
      current: null,
      currentIdx: null,
      checked: true,
      value: "",
      introduce: "",
      submitBtnStatus: true,
      action: {
        target: "http://60.195.252.86:8080/server/imageupload",
        files: []
        // prop: "base64Value"
      },
      groupUnderWayList: [],
      productLineId: "",
      submitData: {
        id: "",
        groupPurchaseTypeId: "",
        productLineName: "",
        productModel: ""
      }
    };
  },
  components: {
    Header,
    listItem,
    basicTitle,
    selectProjectNav,
    Group,
    XTextarea
  },
  watch: {
    groupItemObj() {
      // this.groupPurchaseId = this.groupItemObj.id;
      switch (this.groupItemObj.code) {
        case "SBTG":
          this.text = {
            ...{ text },
            ...{
              productSortText: "设备分类",
              productBrandText: "设备品牌",
              productModelText: "设备型号",
              mainParamsText: "重要参数",
              applicationText: "临床应用:",
              sortPlaceholder: "请选择分类",
              brandPlaceholder: "请选择品牌",
              modelPlaceholder: "默认为不限",
              paramPlaceholder: "请选择或输入重要参数",
              appPlaceholder:
                "为保证医院的采购质量与效率，请详细填写设备的临床用途。",
              isShow: false,
              show: true
            }
          };
          break;
        case "HCTG":
          this.text = {
            ...{ text },
            ...{
              productSortText: "耗材分类",
              productBrandText: "耗材品牌",
              productModelText: "耗材型号",
              mainParamsText: "重要规格",
              applicationText: "临床应用:",
              sortPlaceholder: "请选择分类",
              brandPlaceholder: "请选择品牌",
              modelPlaceholder: "默认为不限",
              paramPlaceholder: "请选择或输入重要规格",
              appPlaceholder:
                "为保证医院的采购质量与效率，请详细填写耗材的临床用途。",
              isShow: false,
              show: true
            }
          };
          break;
        case "SHTG":
          this.text = {
            ...{ text },
            ...{
              productSortText: "售后分类",
              productBrandText: "售后品牌",
              productModelText: "售后型号",
              mainParamsText: "重要参数",
              applicationText: "临床应用:",
              sortPlaceholder: "请选择分类",
              brandPlaceholder: "请选择品牌",
              modelPlaceholder: "默认为不限",
              paramPlaceholder: "请输入响应时间",
              appPlaceholder:
                "为保证医院的采购质量与效率，请详细填写设备的临床用途。",
              isShow: true,
              show: true
            }
          };
          break;
        case "XXHTG":
          this.text = {
            ...{ text },
            ...{
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
            }
          };
          break;
        case "JRTG":
          this.text = {
            ...{ text },
            ...{
              productSortText: "金融服务分类",
              productBrandText: "金融服务商",
              mainParamsText: "关键词",
              applicationText: "应用方向:",
              sortPlaceholder: "请选择分类",
              brandPlaceholder: "请选择服务商",
              paramPlaceholder: "请选择或输入关键词",
              appPlaceholder:
                "为保证医院的采购质量与效率，请详细填写融资应用方向。",
              isShow: false,
              show: false
            }
          };
          break;
        case "ZXTG":
          this.text = {
            ...{ text },
            ...{
              productSortText: "咨询服务分类",
              productBrandText: "咨询服务商",
              mainParamsText: "关键词",
              applicationText: "应用方向:",
              sortPlaceholder: "请选择分类",
              brandPlaceholder: "请选择服务商",
              paramPlaceholder: "请选择或输入关键词",
              appPlaceholder:
                "为保证医院的采购质量与效率，请详细填写咨询应用方向。",
              isShow: false,
              show: false
            }
          };
          break;
      }
    }
  },
  methods: {
    ...mapMutations(["setTransition"]),
    submitBtnClick() {
      this.submitBtnStatus = false;
      this.setTransition("turn-on");
      this.$router.push("/myComponyGroupBuy");
    },
    addClass(i) {
      this.currentIdx = i;
    },
    selectGroupId(value) {
      console.log(value);
      this.groupPurchaseId = value;
      //this.submitData.groupPurchaseTypeIds = value;
    },
    jumpProductCateGory() {
      if (this.groupPurchaseId) {
        this.setTransition("turn-on");
        this.$router.push({
          path: "productCategory",
          query: { groupPurchaseId: this.groupPurchaseId }
        });
      } else {
        Toast("请先选择团购产品类型");
        return;
      }
    },
    jumpSelectBrand() {
      if (this.submitData.productLineName) {
        this.setTransition("turn-on");
        this.$router.push({
          path: "selectBrand",
          query: { productLineId: this.productLineId }
        });
      } else {
        Toast("请先选择分类");
        return;
      }
    },
    jumpSelectModel() {},
    jumpMainParams() {},
    getItemObj(itemObj) {
      console.log(itemObj);
      this.groupItemObj = itemObj;
    },
    service() {
      callPhone("18735342261");
    },
    idx(v) {
      console.log(v);
      this.current = v;
      this.submitData.groupPurchaseTypeId = this.groupUnderWayList[v].id;
    },
    processFile(file, next) {
      compress(
        file,
        {
          compress: {
            width: 1600,
            height: 1600,
            quality: 0.5
          }
        },
        next
      );
    },
    addedHandler() {
      console.log(this.action.files);
    },
    fileSubmitted(file) {
      //file.base64Value = file.file.base64;
    },
    fileSuccess(file) {
      console.log(222);
      console.log(file);
    },
    fileRemove(file) {
      console.log(3333);
      console.log(file);
      console.log(this.action.files);
    },
    fileError() {
      console.log(111);
    }
  },
  created: function() {
    // console.log(1);
  },
  mounted: function() {
    // console.log(2);
    _getData(
      "/server_pro/groupPurchase!request.action",
      {
        method: "getUnderWayGroupPurchaseList",
        params: {}
      },
      data => {
        console.log(data);
        this.groupUnderWayList = data.groupPurchaseList;
      }
    );
  },
  activated: function() {
    console.log(3);
    //this.productSort = this.$store.state.page.uploadProduct.productSort;
    this.submitData.productLineName = _.join(
      _.map(this.$store.state.page.uploadProduct.productSort, "name"),
      ","
    );
    this.submitData.productModel = _.join(
      _.map(this.$store.state.page.uploadProduct.productModel, "name"),
      ","
    );
    this.productBrand = this.$store.state.page.uploadProduct.productBrand;
    // this.productModel = this.$store.state.page.uploadProduct.productModel;
    this.mainParams = _.join(
      _.map(this.$store.state.page.uploadProduct.mainParams, "name"),
      ","
    );
  },
  deactivated: function() {
    // console.log(4);
  }
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
              //justify-content: flex-start;
              // flex-wrap: nowrap;
              width: auto;
              // word-wrap: normal;
              &.star {
                padding-left: 7px;
                background: url("../../../../../static/images/star.png")
                  no-repeat left center;
                background-size: 7px;
              }
              // img {
              //   width: 7px;
              //   vertical-align: middle;
              // }
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
              padding-right: 0;
              display: flex;
              align-items: center;
              padding-left: 0px;
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
                  background: url("../../../../../static/images/star.png")
                    no-repeat left center;
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
    }
    .img_upload {
      @include box_shadow_style;
      margin-bottom: 10px;
      .upload_container {
        padding: 13px;
        /deep/ .cube-upload {
          .cube-upload-def {
            width: calc(100% + 13px);
            .cube-upload-file {
              margin-right: 13px;
              margin-bottom: 13px;
              border-radius: 3px;
              .cube-upload-file-state {
                i {
                  color: #019ddd;
                  &:before {
                  }
                }
              }
            }
            .cube-upload-btn {
              margin-right: 0;
              border-radius: 3px;
              .cube-upload-btn-def {
                height: 99px;
                width: 99px;
                background: #e8e8e8;
                border-radius: 3px;
                i {
                  &:before {
                    width: 30px;
                    background: #bdbdbd;
                  }

                  &:after {
                    width: 30px;
                    background: #bdbdbd;
                  }
                }
              }
            }

            .cube-upload-file {
              .cube-upload-file-def {
                height: 99px;
                width: 99px;
                background: #e8e8e8;
                border-radius: 3px;
              }
            }
          }
        }
        > span {
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #999999;
        }
      }
    }
    .product_introduce {
      @include box_shadow_style;
      margin-bottom: 10px;
      /deep/ .weui-cells {
        margin-top: 0;
        border-radius: 5px;
        &::before {
          border: 0;
        }
        &:after {
          border: 0;
        }
        .weui-cell {
          min-height: 106px;
          padding: 13px;
        }
        textarea::-webkit-input-placeholder {
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #cccccc;
        }
        textarea {
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #999;
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
