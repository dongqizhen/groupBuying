<template>
    <div class="container">
        <Header :isSearchHide="false" :title="this.$route.name"></Header>
        <div class="content">
            <div class="scroll-list-wrap">
                <scroller>
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
                                <cube-input v-model.trim="submitData.companyName" placeholder="请输入公司全称"></cube-input>
                            </li>
                            <li v-ripple>
                                <router-link to='/typeOfEnterprise'>
                                    <span>企业类型：</span>
                                    <div>
                                      {{companyType.companyTypeName}}
                                        <i></i>
                                    </div>
                                </router-link>
                            </li>
                            <li v-ripple>
                                <router-link to="/mainBusiness">
                                    <span>主营业务：</span>
                                    <cube-input placeholder="请选择主营业务" :disabled="true" v-model="mainBusiness.mainBusinessName">
                                        <i slot="append"></i>
                                    </cube-input>
                                </router-link>

                            </li>
                            <li v-ripple>
                                <span>地址：</span>
                                <cube-input placeholder="请选择地址" :disabled="true">
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
                        <personal-information v-on:nameChange="nameChange" v-for="(item,index) in items" v-on:items-length="handler" :itemsLength="items.length" :personNumber="index" :key="index" :disabled="false" :isShowStar='true' isShowAddBtn></personal-information>

                    </div>
                    <x-button v-if="submitBtnStatus" type="primary" @click.native="submitBtnClick">提交报名表</x-button>
                    <x-button v-else type="primary" show-loading>提交中</x-button>
                </scroller>
            </div>
        </div>
    </div>
</template>

<script>
import Header from "../../components/header/header";
import basicTitle from "../../components/common/basicTitle";
import personalInformation from "../../components/common/personalInformation";
import selectProjectNav from "../../components/common/selectProjectNav";

export default {
  data() {
    return {
      companyType: { companyTypeName: "", companyTypeId: "" },
      mainBusiness: { mainBusinessName: "", mainBusinessNameId: "" },
      items: [0],
      submitBtnStatus: true,
      submitData: {
        id: "",
        companyName: "积水潭医院",
        address: "北京积水潭",
        lat: "",
        lng: "",
        introduce: "",
        groupPurchaseTypeIds: "",
        province: "",
        city: "",
        companyTypeId: "",
        productlineId: "",
        contactId: "",
        contactName: "",
        contactPost: "",
        contactTelphone: "",
        contactPhone: "",
        contactWxcode: ""
      }
    };
  },
  components: {
    Header,
    basicTitle,
    personalInformation,
    selectProjectNav
  },
  methods: {
    submitBtnClick() {
      this.submitBtnStatus = false;
      this.$router.push("registrationSuccess");
    },
    handleClickEvent() {},
    handleSelect(value) {
      console.log(value);
      this.submitData.groupPurchaseTypeIds = value;
    },
    handler(val) {
      if (this.items.length < val) {
        this.items.push(val);
      } else {
        this.items.pop();
      }
    },
    nameChange(val) {
      console.log(val);
    }
  },
  created() {
    console.log("created");
  },
  activated() {
    console.log("active");
    this.companyType = this.$store.state.page.typeOfEnterprise.selectedCompanyType;
    this.mainBusiness = this.$store.state.page.mainBusiness.selectedMainBusiness;
    this.submitData.companyTypeId = this.companyType.companyTypeId;
  },
  deactivated() {
    console.log("disactived");
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
                width: auto;
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
