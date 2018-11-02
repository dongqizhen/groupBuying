<template>
  <div class="container">
    <Header :isSearchHide="false" title="
        医院团购报名"></Header>
    <div class="content">
      <div class="scroll-list-wrap">
        <cube-scroll ref="scroll">
          <div class="Select_project">
            <basic-title title="请选择团购项目" imgurl="../static/images/selectproject.png">
              <span slot="select">(必选项，多选)</span>
            </basic-title>
            <select-project-nav :editSelectValue="editSelectId" :come="editSelectId?'1':''" v-on:select-value="handleSelect" MultipleSelection></select-project-nav>
          </div>
          <div class="company_basic_information">
            <basic-title title="医院基本信息" imgurl="../static/images/basicInformation.png">
              <span slot="select">(必填题)</span>
            </basic-title>
            <ul>
              <li>
                <span>医院名称：</span>
                <cube-input v-model.trim="submitData.hospitalName" placeholder="请输入医院名称"></cube-input>
              </li>
              <li @click="openNative">
                <span>地址：</span>
                <cube-input placeholder="请选择地址" :disabled="true" v-model="responseData">
                  <i slot="append"></i>
                </cube-input>
              </li>
            </ul>
          </div>
          <div class="personal_informatin">
            <basic-title title="团购负责人信息" imgurl='../static/images/blueBasicInformation.png'>
              <span slot="select">(
                <i>*</i>为必填项)</span>
            </basic-title>
            <personal-information ref="person" :data="contact" :disabled="false" :isShowStar='true' isShowAddBtn></personal-information>
          </div>
          <div class="hospitalIntroduce">
            <basic-title title="医院详情介绍" imgurl='../static/images/hospitalDetails.png'></basic-title>
            <group>
              <x-textarea v-model="submitData.introduce" placeholder="请输入医院介绍" autosize></x-textarea>
            </group>
          </div>
          <x-button v-if="submitBtnStatus" type="primary" @click.native="submitBtnClick">提交报名表</x-button>
          <x-button v-else type="primary" show-loading>提交中</x-button>
        </cube-scroll>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from "../../components/header/header";
  import basicTitle from "../../components/common/basicTitle";
  import personalInformation from "../../components/common/personalInformation";
  import selectProjectNav from "../../components/common/selectProjectNav";
  import { Group, XTextarea } from "vux";
  import { _getData } from "../../service/getData";
  import { openNativeNav } from "../../components/mixin/mixin";
  import { Toast } from "vant";
  export default {
      data() {
          return {
              editSelectId: "",
              contact: [
                  {
                      id: "",
                      name: "",
                      post: "",
                      phone: "",
                      telphone: "",
                      wxCode: ""
                  }
              ],
              submitBtnStatus: true,
              submitData: {
                  id: "",
                  hospitalName: "",
                  address: "",
                  lat: "", //纬度
                  lng: "", //经度
                  province: "",
                  city: "",
                  introduce: "",
                  groupPurchaseTypeId: "",
                  contact: ""
              },
              responseData: ""
          };
      },
      mixins: [openNativeNav],
      components: {
          Header,
          basicTitle,
          personalInformation,
          selectProjectNav,
          Group,
          XTextarea
      },
      methods: {
          submitBtnClick() {
              console.log(this.$refs.person.persons);
              this.submitBtnStatus = false;
              if (!this.submitData.groupPurchaseTypeId) {
                  Toast({ message: "请选择团购项目", duration: 1000 });
                  this.submitBtnStatus = true;
                  return;
              }
              if (!this.submitData.hospitalName) {
                  Toast({ message: "请输入医院名称", duration: 1000 });
                  this.submitBtnStatus = true;
                  return;
              }
              var flag = true;
              _.each(this.$refs.person.persons, (value, key) => {
                  if (value.name == "") {
                      flag = false;
                      Toast({
                          message: "请输入负责人" + (key + 1) + "的姓名",
                          duration: 1000
                      });
                      this.submitBtnStatus = true;
                      return false;
                  }
                  if (value.post == "") {
                      flag = false;
                      Toast({
                          message: "请输入负责人" + (key + 1) + "的职务",
                          duration: 1000
                      });
                      this.submitBtnStatus = true;
                      return false;
                  }
                  if (value.phone == "") {
                      flag = false;
                      Toast({
                          message: "请输入负责人" + (key + 1) + "的移动电话",
                          duration: 1000
                      });
                      this.submitBtnStatus = true;
                      return false;
                  } else if (!this.$util.isphone(value.phone)) {
                      flag = false;
                      Toast({
                          message:
                              "请输入负责人" + (key + 1) + "的正确的移动电话",
                          duration: 1000
                      });
                      this.submitBtnStatus = true;
                      return false;
                  }
              });
              if (flag) {
                  this.submitData.contact = JSON.stringify(
                      this.$refs.person.persons
                  );
                  // this.submitData.lat = this.responseDataObj.latitude;
                  // this.submitData.lng = this.responseDataObj.longitude;
                  // this.submitData.province = this.responseDataObj.provinceName;
                  // this.submitData.city = this.responseDataObj.cityName;
                  // this.submitData.address = this.responseDataObj.address;
                  console.log(this.submitData);
                  this.submit();
                  this.submitBtnStatus = true;
              }
          },
          submit() {
              _getData(
                  "/server_pro/groupPurchaseHospital!request.action",
                  {
                      method: "addOrUpdateGroupPurchaseHospital",
                      params: this.submitData
                  },
                  data => {
                      console.log(data);
                      this.$router.replace({
                          path: "registrationSuccess",
                          query: {
                              hospitalNum: data.hospitalNum
                          }
                      });
                  }
              );
          },
          handleSelect(value) {
              console.log(value);
              this.submitData.groupPurchaseTypeId = value;
          }
      },
      activated() {
          if (this.$route.query.id) {
              _getData(
                  "/server_pro/groupPurchaseHospital!request.action",
                  {
                      method: "getAppGroupPurchaseHospitalInfo",
                      params: {
                          id: this.$route.query.id
                      }
                  },
                  data => {
                      console.log("获取的报名详情", data);
                      this.submitData.id = data.id;
                      this.contact = data.contactList;
                      this.submitData.hospitalName = data.hospitalName;
                      this.responseData = data.addr;
                      this.submitData.introduce = data.introduce;
                      this.editSelectId = data.groupPurchaseTypeId;
                  }
              );
          }
      },
      deactivated() {}
  };
</script>

<style lang="scss" scoped>
  @import "../../../../../static/scss/_commonScss";
  input::-webkit-input-placeholder {
      //color: #333 !important;
      opacity: 1;
      font-family: PingFangSC-Regular;
      font-size: 14px !important;
  }
  .container {
      @include basic_container_style;
      .content {
          /deep/ .basicTitle {
              p {
                  span {
                      font-family: PingFangSC-Regular;
                      font-size: 15px;
                      color: #aaaaaa;
                      letter-spacing: 0;
                      margin-left: 5px;
                      display: flex;
                      align-items: center;
                      justify-content: flex-start;
                      i {
                          font-size: 16px;
                          //width: 10px;
                          color: #f11f1f;
                          display: flex;
                          justify-content: center;
                          margin-right: 4px;
                          align-items: center;
                          font-family: PingFangSC-Regular;
                      }
                  }
              }
          }
          .Select_project {
              background: #ffffff;
              box-shadow: 0.5px 1px 3px 0.5px rgba(0, 0, 0, 0.1);
              border-radius: 5px;
              margin-bottom: 10px;
          }
          .company_basic_information {
              background: #ffffff;
              box-shadow: 0.5px 1px 3px 0.5px rgba(0, 0, 0, 0.1);
              border-radius: 5px;
              margin-bottom: 10px;
              ul {
                  padding-left: 13px;
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
                          }
                          > div {
                              display: flex;
                              justify-content: flex-end;
                              padding-right: 13px;
                              font-family: PingFangSC-Regular;
                              font-size: 14px;
                              color: #999999;
                              flex: 1;
                              i {
                                  display: flex;
                                  height: 14px;
                                  width: 8px;
                                  background: url("../../../../../static/images/grayarrow.png")
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
                          flex: 1;
                          i {
                              display: flex;
                              height: 14px;
                              width: 8px;
                              background: url("../../../../../static/images/grayarrow.png")
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
                  }
              }
          }
          .personal_informatin {
              background: #ffffff;
              box-shadow: 0.5px 1px 3px 0.5px rgba(0, 0, 0, 0.1);
              border-radius: 5px;
              margin-bottom: 10px;
              /deep/ .personalInformation {
                  .details {
                      ul {
                          li {
                              span {
                                  width: auto;
                              }
                              > div {
                                  //width: auto;
                                  input {
                                      color: #999999;
                                  }
                                  input::-webkit-input-placeholder {
                                      color: #ccc !important;
                                      opacity: 1;
                                      font-family: PingFangSC-Regular;
                                      font-size: 14px !important;
                                  }
                              }
                          }
                      }
                  }
              }
          }
          .hospitalIntroduce {
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
