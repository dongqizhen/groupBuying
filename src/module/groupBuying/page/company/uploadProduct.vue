<template>
  <div class="container uploadProduct">
    <Header title="上传团购产品（企业）" :saveId="saveId" :editSelectId="editSelectId" v-on:changeSaveId="changeSaveId" v-on:changeEditSelectId="changeEditSelectId"></Header>
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
            <select-project-nav :groupPurchaseId="submitData.groupPurchaseId" :editSelectValue="editSelectId" v-on:selectObj="getItemObj" v-on:select-value="selectGroupId"></select-project-nav>
          </div>
          <div class="productBasicInfromation">
            <basic-title title="产品基本信息" imgurl="../static/images/basicInformation.png">
              <span slot="select">建议:通过PC端批量上传</span>
              <a slot="check" class="server" href="javascript:;" v-if="$util.isAndroid()" @click="showDialog">
                <i></i>
                客服
              </a>
              <a slot="check" class="server" v-else href="tel:18810041523">
                <i></i>
                客服
              </a>
            </basic-title>
            <div>
              <router-view></router-view>
            </div>
          </div>
          <div class="img_upload">
            <basic-title title="产品图片" imgurl="../static/images/imgUpload.png">
              <span slot="select">(至少上传一张)</span>
            </basic-title>
            <div class="upload_container">
              <cube-upload ref="upload" v-model="action.files" :action="action" :simultaneous-uploads="3" @files-added="addedHandler" @file-removed="fileRemove" />
              <span>点击上传产品图片</span>
            </div>
          </div>
          <div class="product_introduce">
            <basic-title title="产品介绍" imgurl="../static/images/Introduction.png"></basic-title>
            <group>
              <x-textarea class="needsclick" v-model="submitData.introduce" placeholder="请在这里填写产品介绍" autosize></x-textarea>
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
  import { Group, XTextarea, base64 } from "vux";
  import { _getData } from "../../service/getData";
  import _ from "lodash";
  import compress from "../../../../../static/js/compressImage";
  import { mapMutations, mapState } from "vuex";
  import { Toast } from "vant";

  export default {
      data() {
          return {
              data: {},
              saveId: "",
              editSelectId: "",
              groupItemObj: {},
              current: null,
              toastText: "",
              submitBtnStatus: true,
              action: {
                  target: `${this.$API_URL.WEB_URL}/server/imageupload`,
                  files: []
              },
              groupUnderWayList: [],
              productLineId: "",
              submitData: {
                  id: "",
                  companyId: "",
                  groupPurchaseId: "",
                  groupPurchaseTypeId: "",
                  productLine: "",
                  brand: "",
                  price: "",
                  params: "",
                  imageUrl: "",
                  introduce: "",
                  application: "",
                  isOpen: "",
                  responseTime: "",
                  maintenanceType: ""
              }
          };
      },
      computed: {
          ...mapState(["userCompanyIdOrHospitalId"])
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
          ...mapMutations([
              "setTransition",
              "uploadProductSBTG",
              "uploadProductHCTG",
              "uploadProductSHTG",
              "uploadProductXXHTG",
              "uploadProductJRTG",
              "uploadProductZXTG"
          ]),
          submitBtnClick() {
              console.log(
                  this.$store.state.page.uploadProduct[
                      this.$route.query.groupTypeCode
                  ]
              );
              var getSubmitInfo = this.$store.state.page.uploadProduct[
                  this.$route.query.groupTypeCode
              ];
              this.submitBtnStatus = false;
              this.setTransition("turn-on");
              if (!this.submitData.groupPurchaseId) {
                  Toast({ message: "请选择团购大会", duration: 1000 });
                  this.submitBtnStatus = true;
                  return;
              }
              if (!this.submitData.groupPurchaseTypeId) {
                  Toast({ message: "请选择团购类型", duration: 1000 });
                  this.submitBtnStatus = true;
                  return;
              }
              if (getSubmitInfo.productLineId == "") {
                  Toast({ message: "请选择分类", duration: 1000 });
                  this.submitBtnStatus = true;
                  return;
              } else {
                  this.submitData.productLine = JSON.stringify(
                      getSubmitInfo.productLine
                  );
              }
              if (getSubmitInfo.brandId == "") {
                  Toast({ message: "请选择品牌", duration: 1000 });
                  this.submitBtnStatus = true;
                  return;
              } else {
                  getSubmitInfo.brand[0].model = getSubmitInfo.model;
                  this.submitData.brand = JSON.stringify(getSubmitInfo.brand);
              }
              if (this.$route.query.groupTypeCode != "SHTG") {
                  if (getSubmitInfo.application == "") {
                      Toast({ message: this.toastText, duration: 1000 });
                      this.submitBtnStatus = true;
                      return;
                  } else {
                      this.submitData.application = getSubmitInfo.application;
                  }
              }
              if (this.$route.query.groupTypeCode == "SHTG") {
                  if (getSubmitInfo.responseTime == "") {
                      Toast({ message: "请输入响应时间", duration: 1000 });
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
                      this.submitData.maintenanceType =
                          getSubmitInfo.maintenanceType;
                  }
              }
              if (this.action.files.length == 0) {
                  Toast({ message: "至少上传一张图片", duration: 1000 });
                  this.submitBtnStatus = true;
                  return;
              } else {
                  _.map(this.action.files, o => {
                      return (o.url = o.response
                          ? o.response.result.imageList[0].imageurl
                          : o.url);
                  });
                  this.submitData.imageUrl = _.map(this.action.files, o => {
                      return JSON.stringify(o, ["name", "status", "url"]);
                  });
              }
              this.submitData.price = getSubmitInfo.price;
              this.submitData.isOpen = getSubmitInfo.isOpen;
              this.submitData.params = JSON.stringify(getSubmitInfo.params);
              this.submitData.companyId = this.userCompanyIdOrHospitalId;
              console.log(this.submitData);
              _getData(
                  "/server_pro/groupPurchaseCompanyProduct!request.action",
                  {
                      method: "addOrUpdateCompanyProduct",
                      params: this.submitData
                  },
                  data => {
                      console.log(data);
                      this.saveId = "";
                      this.editSelectId = "";
                      this.current = null;
                      this.submitData.introduce = "";
                      this.action.files = [];
                      this.initialFun();
                      this.$router.go(-1);
                  }
              ).then(() => {
                  setTimeout(() => {
                      this.submitBtnStatus = true;
                  }, 300);
              });
          },
          changeSaveId(val) {
              this.saveId = val;
              this.initialFun();
              this.submitData.introduce = "";
              this.action.files = [];
          },
          changeEditSelectId(val) {
              this.editSelectId = val;
              this.current = null;
              this.initialFun();
              this.submitData.introduce = "";
              this.action.files = [];
          },
          selectGroupId(value) {
              this.submitData.groupPurchaseTypeId = value;
              this.editSelectId = value;
          },
          getItemObj(itemObj) {
              this.groupItemObj = itemObj;
          },
          showDialog() {
              this.$createDialog({
                  type: "confirm",
                  icon: "",
                  title: "",
                  content: "18810041523",
                  confirmBtn: {
                      text: "取消",
                      active: false,
                      disabled: false,
                      href: "javascript:;"
                  },
                  cancelBtn: {
                      text: "呼叫",
                      active: true,
                      disabled: false,
                      href: "tel:18810041523"
                  },
                  onConfirm: () => {},
                  onCancel: () => {}
              }).show();
          },
          getCurrentIndex(v) {
              this.current = v;
              this.submitData.groupPurchaseId = this.groupUnderWayList[v].id;
              this.$router.replace({
                  path: this.$route.path,
                  query: {
                      id: this.$route.query.id,
                      groupPurchaseTypeId: this.submitData.groupPurchaseTypeId,
                      groupPurchaseId: this.submitData.groupPurchaseId,
                      groupTypeCode: this.groupItemObj.code
                  }
              });
          },
          addedHandler(files) {
              //图片上传需要判断是否重复
              console.log("files", files);
              // let hasIgnore = false;
              // if (this.action.files.length != 0) {
              //     for (let k in files) {
              //         const file = files[k];
              //         if (
              //             _.find(this.action.files, o => {
              //                 return o.name == file.name;
              //             })
              //         ) {
              //             file.ignore = true;
              //             hasIgnore = true;
              //         }
              //     }
              //     hasIgnore &&
              //         this.$createToast({
              //             type: "warn",
              //             time: 1000,
              //             txt: "文件已上传,请勿重复上传"
              //         }).show();
              // }
          },
          fileRemove(file) {
              console.log(file);
              console.log(this.action.files);
          },
          initialFun() {
              this.uploadProductSBTG({
                  productLine: [
                      {
                          aliasId: "",
                          aliasName: "",
                          productLineId: "",
                          productLineName: ""
                      }
                  ],
                  productLineId: "",
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
                  modelName: "",
                  params: [],
                  mainParamsName: "",
                  application: "",
                  price: "",
                  isOpen: true
              });
              this.uploadProductHCTG({
                  productLine: [
                      {
                          aliasId: "",
                          aliasName: "",
                          productLineId: "",
                          productLineName: ""
                      }
                  ],
                  productLineId: "",
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
                  modelName: "",
                  params: [],
                  mainParamsName: "",
                  application: "",
                  price: "",
                  isOpen: true
              });
              this.uploadProductSHTG({
                  productLine: [
                      {
                          aliasId: "",
                          aliasName: "",
                          productLineId: "",
                          productLineName: ""
                      }
                  ],
                  productLineId: "",
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
                  modelName: "",
                  params: [],
                  mainParamsName: "",
                  application: "",
                  price: "",
                  isOpen: true,
                  responseTime: "",
                  maintenanceType: ""
              });
              this.uploadProductXXHTG({
                  productLine: [
                      {
                          aliasId: "",
                          aliasName: "",
                          productLineId: "",
                          productLineName: ""
                      }
                  ],
                  productLineId: "",
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
                  modelName: "",
                  params: [],
                  mainParamsName: "",
                  application: "",
                  price: "",
                  isOpen: true
              });
              this.uploadProductJRTG({
                  productLine: [
                      {
                          aliasId: "",
                          aliasName: "",
                          productLineId: "",
                          productLineName: ""
                      }
                  ],
                  productLineId: "",
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
                  modelName: "",
                  params: [],
                  mainParamsName: "",
                  application: "",
                  price: "",
                  isOpen: true
              });
              this.uploadProductZXTG({
                  productLine: [
                      {
                          aliasId: "",
                          aliasName: "",
                          productLineId: "",
                          productLineName: ""
                      }
                  ],
                  productLineId: "",
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
                  modelName: "",
                  params: [],
                  mainParamsName: "",
                  application: "",
                  price: "",
                  isOpen: true
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
                  console.log(data);
                  this.groupUnderWayList = data.groupPurchaseList;
                  if (
                      this.$route.query.id &&
                      this.saveId != this.$route.query.id
                  ) {
                      this.saveId = this.$route.query.id;
                      this.action.files = [];
                      this.submitData.introduce = "";
                      this.initialFun();
                      _getData(
                          "/server_pro/groupPurchaseCompanyProduct!request.action",
                          {
                              method: "getGroupPurchaseCompanyProductDetail",
                              params: { id: this.$route.query.id }
                          },
                          data => {
                              console.log(data);
                              this.submitData.id = data.id;
                              this.submitData.hospitalId = data.hospitalId;
                              this.submitData.groupPurchaseTypeId =
                                  data.groupPurchaseType.id;
                              this.submitData.groupPurchaseId =
                                  data.groupPurchaseId;
                              this.submitData.introduce = data.introduce;
                              this.groupItemObj = data.groupPurchaseType;
                              this.editSelectId = "" + data.groupPurchaseType.id;
                              data.isOpen = data.isOpen ? true : false;
                              data.productLine = [data.productLine];
                              this.$router.replace({
                                  path: `/uploadProduct/${
                                      data.groupPurchaseType.code
                                  }`,
                                  query: {
                                      id: this.$route.query.id,
                                      groupPurchaseTypeId: this.submitData
                                          .groupPurchaseTypeId,
                                      groupPurchaseId: this.submitData
                                          .groupPurchaseId,
                                      groupTypeCode: data.groupPurchaseType.code
                                  }
                              });
                              for (
                                  var i = 0;
                                  i < this.groupUnderWayList.length;
                                  i++
                              ) {
                                  if (
                                      this.groupUnderWayList[i].id ==
                                      data.groupPurchaseId
                                  ) {
                                      this.current = i;
                                      this.submitData.groupPurchaseId =
                                          data.groupPurchaseId;
                                  }
                              }
                              this.action.files = JSON.parse(data.imageUrl);

                              switch (data.groupPurchaseType.code) {
                                  case "SBTG":
                                      this.uploadProductSBTG(data);
                                      break;
                                  case "HCTG":
                                      this.uploadProductHCTG(data);
                                      break;
                                  case "SHTG":
                                      this.uploadProductSHTG(data);
                                      break;
                                  case "XXHTG":
                                      this.uploadProductXXHTG(data);
                                      break;
                                  case "JRTG":
                                      this.uploadProductJRTG(data);
                                      break;
                                  case "ZXTG":
                                      this.uploadProductZXTG(data);
                                      break;
                              }
                          }
                      );
                  } else {
                      this.current = 0;
                      this.submitData.groupPurchaseId =
                          data.groupPurchaseList[0].id;
                      this.$router.replace({
                          path: this.$route.path,
                          query: {
                              id: this.$route.query.id,
                              groupPurchaseTypeId: this.submitData
                                  .groupPurchaseTypeId,
                              groupPurchaseId: this.submitData.groupPurchaseId,
                              groupTypeCode: this.groupItemObj.code
                          }
                      });
                  }
              }
          );
      },
      watch: {
          groupItemObj() {
              switch (this.groupItemObj.code) {
                  case "SBTG":
                      this.toastText = "请填写临床应用";
                      break;
                  case "HCTG":
                      this.toastText = "请填写临床应用";
                      break;
                  case "SHTG":
                      this.toastText = "请填写临床应用";
                      break;
                  case "XXHTG":
                      this.toastText = "请填写应用需求";
                      break;
                  case "JRTG":
                      this.toastText = "请填写应用方向";
                      break;
                  case "ZXTG":
                      this.toastText = "请填写应用方向";
                      break;
              }
          }
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
                              background: url("../../../../../static/images/service.png")
                                  no-repeat center;
                              background-size: 100% 100%;
                              margin-right: 3px;
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
