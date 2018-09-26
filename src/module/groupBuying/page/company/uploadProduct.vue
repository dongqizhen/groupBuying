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
                      <list-item v-for="(item,index) in groupUnderWayList" :isActive="current===index?true:false" v-on:changeIdx="getCurrentIndex" :index="index" :key="item.id" :dataValue="item" :disabled="true"></list-item>
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
                  <product-basic-info ref="basicInfo" :groupType="this.groupItemObj"></product-basic-info>
              </div>
              <div class="img_upload">
                  <basic-title title="产品图片" imgurl="../static/images/imgUpload.png">
                     <span slot="select">(至少上传一张)</span>
                  </basic-title>
                  <div class="upload_container">
                      <cube-upload ref="upload"  v-model="action.files" :action="action" :simultaneous-uploads="3" :process-file="processFile" @files-added="addedHandler"  @file-removed="fileRemove"/>
                      <span>点击上传产品图片</span>
                  </div>
              </div>
              <div class="product_introduce">
                  <basic-title title="产品介绍" imgurl="../static/images/Introduction.png"></basic-title>
                  <group>
                      <x-textarea v-model="submitData.introduce" placeholder="请在这里填写产品介绍" autosize></x-textarea>
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
import productBasicInfo from "../../components/common/productBasicInfo";
import { Group, XTextarea } from "vux";
import { _getData } from "../../service/getData";
import _ from "lodash";
import compress from "../../../../../static/js/compressImage";
import { mapMutations } from "vuex";
import { Toast } from "vant";

export default {
  data() {
    return {
      groupItemObj: {},
      current: null,
      submitBtnStatus: true,
      action: {
        target: "http://60.195.252.86:8080/server/imageupload",
        files: []
      },
      groupUnderWayList: [],
      productLineId: "",
      submitData: {
        id: "",
        companyId: "1",
        groupPurchaseId: "",
        groupPurchaseTypeId: "",
        productLineName: "dddd",
        brandName: "dffa",
        modelName: "",
        productLineId: "",
        brandId: "",
        modelId: "",
        price: "123",
        paramsId: "",
        imageUrl: "",
        introduce: "",
        application: "",
        isOpen: ""
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
    productBasicInfo
  },
  methods: {
    ...mapMutations(["setTransition"]),
    submitBtnClick() {
      console.log(this.$refs.basicInfo.info);
      // this.submitBtnStatus = false;
      this.setTransition("turn-on");
      // if (!this.submitData.groupPurchaseId) {
      //   Toast("请选择团购大会");
      //   return;
      // }
      // if (!this.submitData.groupPurchaseTypeId) {
      //   Toast("请选择团购类型");
      //   return;
      // }
      // if (!this.submitData.productLineId) {
      //   Toast("请选择分类");
      //   return;
      // }
      // if (!this.submitData.brandId) {
      //   Toast("请选择品牌");
      //   return;
      // }
      // if (!this.submitData.application) {
      //   Toast("请填写临床应用");
      //   return;
      // }
      // if (this.action.files.length == 0) {
      //   Toast("至少上传一张图片");
      //   return;
      // }
      // this.submitData.imageUrl = _.join(
      //   _.map(
      //     _.map(this.action.files, function(o) {
      //       return o.response.result.imageList[0];
      //     }),
      //     function(item) {
      //       return item.imageurl;
      //     }
      //   ),
      //   ","
      // );
      this.submitData = { ...this.submitData, ...this.$refs.basicInfo.info };
      console.log(this.submitData);
      _getData(
        "/server_pro/groupPurchaseCompanyProduct!request.action",
        {
          method: "addOrUpdateCompanyProduct",
          params: this.submitData
        },
        data => {
          console.log(data);
        }
      );
      this.$router.push("/myComponyGroupBuy");
    },
    selectGroupId(value) {
      this.submitData.groupPurchaseTypeId = value;
    },
    getItemObj(itemObj) {
      this.groupItemObj = itemObj;
    },
    service() {
      callPhone("18735342261");
    },
    getCurrentIndex(v) {
      this.current = v;
      this.submitData.groupPurchaseId = this.groupUnderWayList[v].id;
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
      //图片上传需要判断是否重复
    },
    fileRemove(file) {
      console.log(this.action.files);
    }
  },
  created: function() {},
  mounted: function() {
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
  activated: function() {},
  deactivated: function() {},
  watch: {
    groupItemObj() {}
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
      // ul {
      //   padding-left: 13px;
      //   padding-bottom: 1px;
      //   li {
      //     display: flex;
      //     justify-content: flex-start;
      //     align-items: center;
      //     height: 47px;
      //     border-bottom: 0.5px solid #f6f6f6;
      //     a {
      //       display: flex;
      //       justify-content: flex-start;
      //       align-items: center;
      //       text-decoration: none;
      //       width: 100%;
      //       span {
      //         font-family: PingFangSC-Regular;
      //         font-size: 14px;
      //         color: #333333;
      //         float: left;
      //         width: auto;
      //         &.star {
      //           padding-left: 7px;
      //           background: url("../../../../../static/images/star.png")
      //             no-repeat left center;
      //           background-size: 7px;
      //         }
      //       }
      //       > div {
      //         display: flex;
      //         justify-content: flex-end;
      //         padding-right: 13px;
      //         font-family: PingFangSC-Regular;
      //         font-size: 14px;
      //         color: #999999;
      //         i {
      //           display: flex;
      //           height: 14px;
      //           width: 8px;
      //           background: url("../../../../../static/images/grayarrow.png")
      //             no-repeat center;
      //           background-size: 100% 100%;
      //           margin-left: 3px;
      //         }
      //         &.maintanceType {
      //           justify-content: flex-start;
      //           align-items: center;
      //           span {
      //             height: 29px;
      //             line-height: 29px;
      //             padding: 0 16px;
      //             font-family: PingFangSC-Regular;
      //             font-size: 14px;
      //             color: #333333;
      //             margin-right: 10px;
      //             background: rgba(142, 142, 142, 0.05);
      //             border-radius: 2px;
      //             &.active {
      //               background: rgba(1, 157, 221, 0.14);
      //               font-family: PingFangSC-Medium;
      //               color: #019ddd;
      //             }
      //           }
      //         }
      //       }
      //     }
      //     /deep/ .cube-input {
      //       flex: 1;
      //       &:after {
      //         border: none;
      //       }
      //       &.responseTime {
      //         .cube-input-field {
      //           text-align: left;
      //         }
      //       }
      //       input {
      //         color: #999999;
      //         font-family: PingFangSC-Regular;
      //         font-size: 14px;
      //         padding-left: 0;
      //         text-align: right;
      //       }
      //     }
      //     &.price {
      //       .check_box {
      //         height: 100%;
      //       }
      //       /deep/ .cube-input {
      //         padding-right: 16px;
      //         > .cube-input-append {
      //           font-family: PingFangSC-Regular;
      //           font-size: 14px;
      //           color: #333333;
      //         }
      //       }
      //       /deep/ .cube-checkbox {
      //         padding-right: 0;
      //         display: flex;
      //         align-items: center;
      //         padding-left: 0px;
      //         height: 100%;
      //         &:active {
      //           // background: rgba($color: #999, $alpha: 0.3);
      //         }
      //         .cube-checkbox-wrap {
      //           display: flex;
      //           align-items: center;
      //           padding: 0;
      //           padding-left: 16px;
      //           border-left: 0.5px solid rgba(153, 153, 153, 0.31);
      //           height: 16px;
      //           .cube-checkbox-ui {
      //             height: 14px;
      //             width: 14px;
      //             margin-right: 4px;
      //             margin-top: 3px;
      //             &:before {
      //               display: initial;
      //             }
      //             .cubeic-right {
      //               i {
      //                 color: #019ddd;
      //               }
      //             }
      //           }
      //           .cube-checkbox-label {
      //             font-family: PingFangSC-Medium;
      //             font-size: 14px;
      //             color: #666666;
      //           }
      //         }
      //         &.cube-checkbox_checked {
      //           .cube-checkbox-ui {
      //             height: 14px;
      //             width: 14px;
      //             margin-right: 4px;
      //             margin-top: 3px;
      //             &:before {
      //               display: initial;
      //             }
      //             .cubeic-right {
      //               height: 14px;
      //               width: 14px;
      //               color: #019ddd;
      //             }
      //           }
      //         }
      //       }
      //     }
      //     &.clinic {
      //       height: auto;
      //       border-bottom: none;
      //       //margin-bottom: 10px;
      //       > div {
      //         width: 100%;
      //       }
      //       /deep/ .weui-cells {
      //         margin-top: 0;
      //         width: 100%;
      //         &:before {
      //           border-top: 0;
      //         }
      //         &:after {
      //           border-bottom: 0;
      //         }
      //         .weui-cell {
      //           display: flex;
      //           flex-direction: column;
      //           padding: 0;
      //           .weui-cell__hd {
      //             height: 43px;
      //             font-family: PingFangSC-Regular;
      //             font-size: 14px;
      //             color: #333333;
      //             display: flex;
      //             align-items: center;
      //             background: url("../../../../../static/images/star.png")
      //               no-repeat left center;
      //             background-size: 7px;
      //             .weui-label {
      //               margin-left: 7px;
      //             }
      //           }
      //           .weui-cell__bd {
      //             width: 100%;
      //             min-height: 40px;
      //             textarea::-webkit-input-placeholder {
      //               font-family: PingFangSC-Regular;
      //               font-size: 14px;
      //               color: #cccccc;
      //             }
      //             textarea {
      //               // height: 45px !important;
      //               color: #999;
      //               font-family: PingFangSC-Regular;
      //               font-size: 14px;
      //               margin-bottom: 12px;
      //             }
      //           }
      //         }
      //       }
      //     }
      //   }
      // }
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
