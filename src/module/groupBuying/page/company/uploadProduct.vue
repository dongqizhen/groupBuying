<template>
    <div class="container uploadProduct">
        <Header :title="this.$route.name"></Header>
        <div class="content">
            <div class="selectGroupMeeting">
                <basic-title title="选择团购大会" imgurl="/static/images/groupBuy.png">
                    <span slot="select">(必选项)</span>
                </basic-title>
                <div class="list_box">
                    <list-item v-for="(item,index) in groupUnderWayList" :isActive="current===index?true:false" v-on:changeIdx="idx" :index="index" :key="item.id" :dataValue="item" :disabled="true"></list-item>
                </div>

            </div>
            <div class="groupType">
                <basic-title title="团购产品类型" imgurl="/static/images/selectproject.png">
                    <span slot="select">(必选项)</span>
                </basic-title>
                <select-project-nav v-on:select-value="handleSelect"></select-project-nav>
            </div>
            <div class="productBasicInfromation">
                <basic-title title="产品基本信息" imgurl="/static/images/basicInformation.png">
                    <span slot="select">建议:通过PC端批量上传</span>
                    <a slot="check" class="server">
                        <i></i>
                        客服
                    </a>
                </basic-title>
                <ul>
                    <li v-ripple @click="setTransition('turn-on')">
                        <router-link to="/productCategory">
                            <span>产品分类：</span>
                            <cube-input placeholder="请选择产品分类" :disabled="true" v-model="productSort.name">
                                <i slot="append"></i>
                            </cube-input>
                        </router-link>

                    </li>
                    <li v-ripple @click="setTransition('turn-on')">
                        <router-link to="/selectBrand">
                            <span>品牌：</span>
                            <cube-input placeholder="请选择品牌" :disabled="true" v-model="productBrand.name">
                                <i slot="append"></i>
                            </cube-input>
                        </router-link>

                    </li>
                    <li v-ripple @click="setTransition('turn-on')">
                        <router-link to='/selectModel'>
                            <span>型号：</span>
                            <cube-input placeholder="请选择型号" :disabled="true">

                            </cube-input>
                            <div>默认为全线产品
                                <i></i>
                            </div>
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
                    <li v-ripple @click="setTransition('turn-on')">
                        <router-link to="/mainParams">
                            <span>重要参数：</span>
                            <cube-input placeholder="请选择重要参数" :disabled="true">
                                <i slot="append"></i>
                            </cube-input>
                        </router-link>

                    </li>
                    <li class="clinic">
                        <!-- <label for="textarea"></label> -->
                        <group>
                            <x-textarea title="临床应用：" v-model="value" placeholder="为保证医院的采购质量与效率，请详细填写设备的临床用途。" autosize></x-textarea>
                        </group>
                    </li>
                </ul>
            </div>
            <div class="img_upload">
                <basic-title title="产品图片" imgurl="/static/images/imgUpload.png">

                </basic-title>
                <div class="upload_container">
                    <cube-upload ref="upload" :action="action" :simultaneous-uploads="1" :process-file="processFile" @file-submitted="fileSubmitted" />
                    <span>点击上传产品图片</span>
                </div>

            </div>
            <div class="product_introduce">
                <basic-title title="产品介绍" imgurl="/static/images/Introduction.png"></basic-title>
                <group>
                    <x-textarea v-model="introduce" placeholder="请在这里填写产品介绍" autosize></x-textarea>
                </group>
            </div>
            <x-button v-if="submitBtnStatus" type="primary" @click.native="submitBtnClick">提交团购产品</x-button>
            <x-button v-else type="primary" show-loading>提交中</x-button>
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
import compress from "../../../../../static/js/compressImage";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      groupPrice: "",
      current: -1,
      checked: true,
      value: "",
      introduce: "",
      submitBtnStatus: true,
      action: {
        target: "//jsonplaceholder.typicode.com/photos/",
        prop: "base64Value"
      },
      productSort: { name: "", productLineId: "" },
      productBrand: { name: "", id: "" },
      groupUnderWayList: [],
      submitData: {
        id: "",
        groupPurchaseTypeId: ""
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
  methods: {
    handleSelect(value) {
      console.log(value);
      //this.submitData.groupPurchaseTypeIds = value;
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
    fileSubmitted(file) {
      file.base64Value = file.file.base64;
    },
    submitBtnClick() {
      this.submitBtnStatus = false;
    },
    ...mapMutations(["setTransition"])
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
    // console.log(3);
    this.productSort = this.$store.state.page.uploadProduct.productSort;
    this.productBrand = this.$store.state.page.uploadProduct.productBrand;
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
    padding: 13px;
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
