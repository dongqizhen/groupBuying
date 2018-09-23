<template>
  <div class="container">
    <Header :isSearchHide="false" :title="this.$route.name"></Header>
    <div class="content">
      <div class="scroll-list-wrap">
        <cube-scroll ref="scroll">
          <div class="Select_project">
            <basic-title title="请选择团购项目" imgurl="../static/images/selectproject.png">
              <span slot="select">(必选项，多选)</span>
            </basic-title>
            <select-project-nav v-on:select-value="handleSelect" MultipleSelection></select-project-nav>
          </div>
          <div class="company_basic_information">
            <basic-title title="企业基本信息" imgurl="../static/images/basicInformation.png">
              <span slot="select">(必填题)</span>
            </basic-title>
            <ul>
              <li v-ripple>
                <span>公司名称：</span>
                <cube-input class="name" v-model.trim="submitData.companyName" placeholder="请输入公司全称"></cube-input>
              </li>
              <li v-ripple>
                <router-link to='/typeOfEnterprise' @click.native="setTransition('turn-on')">
                  <span>企业类型：</span>
                  <div>
                    {{companyTypeName}}
                    <i></i>
                  </div>
                </router-link>
              </li>
              <li v-ripple>
                <router-link to="/mainBusiness" @click.native="setTransition('turn-on')">
                  <span>主营业务：</span>
                  <cube-input placeholder="请选择主营业务" :disabled="true" v-model="mainBusinessName">
                    <i slot="append"></i>
                  </cube-input>
                </router-link>

              </li>
              <li v-ripple @click="openNative">
                <span>地址：</span>
                <cube-input :placeholder="responseData" :disabled="true">
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
            <personal-information ref="person" :disabled="false" :isShowStar='true' isShowAddBtn></personal-information>
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
  import { _getData } from "../../service/getData";
  import { mapMutations } from "vuex";
  import _ from "lodash";
  import { Toast } from "vant";

  import { openNativeNav } from "../../components/mixin/mixin";

  export default {
      data() {
          return {
              companyTypeName: "",
              mainBusinessName: "",
              submitBtnStatus: true,
              submitData: {
                  id: "",
                  companyName: "",
                  address: "",
                  lat: "",
                  lng: "",
                  introduce: "",
                  groupPurchaseTypeIds: "",
                  province: "",
                  city: "",
                  companyTypeId: "",
                  businessId: "",
                  contact: ""
              },
              responseData: "请选择地址"
          };
      },
      mixins: [openNativeNav],
      components: {
          Header,
          basicTitle,
          personalInformation,
          selectProjectNav
      },
      methods: {
          ...mapMutations(["setTransition"]),
          submitBtnClick() {
              this.submitBtnStatus = false;
              this.submitData.companyTypeId = this.$store.state.page.typeOfEnterprise.selectedCompanyType.companyTypeId;
              this.submitData.businessId = JSON.stringify(
                  this.$store.state.page.mainBusiness.selectedMainBusiness
              );
              if (this.submitData.groupPurchaseTypeIds == "") {
                  Toast({ message: "请选择团购项目", duration: 1000 });
                  this.submitBtnStatus = true;
                  return;
              }
              if (this.submitData.companyName == "") {
                  Toast({ message: "请输入公司全称", duration: 1000 });
                  this.submitBtnStatus = true;
                  return;
              }
              if (this.submitData.companyTypeId == "") {
                  Toast({ message: "请选择企业类型", duration: 1000 });
                  this.submitBtnStatus = true;
                  return;
              }
              if (
                  this.$store.state.page.mainBusiness.selectedMainBusiness
                      .length == 0
              ) {
                  Toast({ message: "请选择主营业务", duration: 1000 });
                  this.submitBtnStatus = true;
                  return;
              }
              var flag = true;
              var that = this;
              _.each(this.$refs.person.persons, function(value, key) {
                  if (value.name == "") {
                      flag = false;
                      Toast({
                          message: "请输入负责人" + (key + 1) + "姓名",
                          duration: 1000
                      });
                      that.submitBtnStatus = true;
                      return false;
                  }
                  if (value.post == "") {
                      flag = false;
                      Toast({
                          message: "请输入负责人" + (key + 1) + "职务",
                          duration: 1000
                      });
                      that.submitBtnStatus = true;
                      return false;
                  }
                  if (value.phone == "") {
                      flag = false;
                      Toast({
                          message: "请输入负责人" + (key + 1) + "移动电话",
                          duration: 1000
                      });
                      that.submitBtnStatus = true;
                      return false;
                  }
              });
              if (flag) {
                  this.submitData.contact = JSON.stringify(
                      this.$refs.person.persons
                  );
                  this.submit();
                  this.submitBtnStatus = true;
              }
          },
          submit() {
              _getData(
                  "/server_pro/groupPurchaseCompany!request.action",
                  {
                      method: "addOrUpdateGroupPurchaseCompany",
                      params: this.submitData
                  },
                  data => {
                      console.log(data);
                      this.$router.push({
                          path: "registrationSuccess",
                          query: {
                              companyNum: data.companyNum,
                              hospitalNum: data.hospitalNum
                          }
                      });
                  }
              );
          },
          handleSelect(value) {
              console.log(value);
              this.submitData.groupPurchaseTypeIds = value;
          }
      },
      created() {
          console.log("created");
      },
      activated() {
          this.companyTypeName = this.$store.state.page.typeOfEnterprise.selectedCompanyType.companyTypeName;
          this.mainBusinessName = _.join(
              _.map(
                  this.$store.state.page.mainBusiness.selectedMainBusiness,
                  "name"
              ),
              ","
          );
      },
      deactivated() {
          // this.$destroy();
      }
  };
</script>

<style lang="scss" scoped>
  @import "../../../../../static/scss/_commonScss";
  input::-webkit-input-placeholder {
      //color: #333 !important;
      opacity: 1;
      font-family: PingFangSC-Regular;
      font-size: 14px !important;
      text-align: left;
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
                          &.name {
                              input {
                                  text-align: left;
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
