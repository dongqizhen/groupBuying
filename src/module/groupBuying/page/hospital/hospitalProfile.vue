<template>
  <div class="container">
    <Header title="医院介绍">
      <router-link to="/enterpriseSeal" slot="explain" @click.native="setTransition('turn-on')">编辑</router-link>
    </Header>
    <div class="content">
      <div class="scroll-list-wrap">
        <cube-scroll>
          <basic-information type="hospital" :detailData="detailData" title="医院基本信息"></basic-information>
          <div class="Personal_information">
            <basic-title title="团购负责人信息" imgurl="../static/images/Personal_information.png">
              <span slot="check">收起</span>
            </basic-title>
            <personal-information :read="true" :disabled="true" :data="detailData.contactList"></personal-information>
          </div>
          <div class="hospitalDetails">
            <basic-title title="医院详细介绍" imgurl="../static/images/hospitalDetails.png"></basic-title>
            <div class="main_content">
              2007年聚通达诞生于北京中关村，是国家和中关村高新技术企业。2016年7月挂牌新三板，证券代码837883。聚通达现有员工300余人，50%以上为专业研发团队。
            </div>
          </div>
          <div class="product_list">
            <basic-title title="团购需求列表" imgurl="../static/images/product_list.png"></basic-title>
            <type-scroll-nav-bar></type-scroll-nav-bar>
            <budget-count></budget-count>
            <demand-list></demand-list>
          </div>
        </cube-scroll>
      </div>

    </div>
  </div>
</template>

<script>
  import Header from "../../components/header/header";
  import basicInformation from "../../components/common/basicInformation";
  import basicTitle from "../../components/common/basicTitle";
  import typeScrollNavBar from "../../components/common/typeScrollNavBar";
  import modelScrollNavBar from "../../components/common/modelScrollNavBar";
  import productList from "../../components/common/productList";
  import personalInformation from "../../components/common/personalInformation";
  import { mapMutations } from "vuex";
  import { _getData } from "../../service/getData";
  import budgetCount from "../../components/common/budgetCount";
  import demandList from "../../components/common/demandList";
  export default {
      data() {
          return {
              detailData: {},
              disabled: true
          };
      },
      components: {
          Header,
          basicInformation,
          basicTitle,
          typeScrollNavBar,
          modelScrollNavBar,
          productList,
          personalInformation,
          budgetCount,
          demandList
      },
      methods: { ...mapMutations(["setTransition"]) },
      created() {
          _getData(
              "/server_pro/groupPurchaseHospital!request.action",
              {
                  method: "getAppGroupPurchaseHospitalInfo",
                  params: { id: "1" }
              },
              data => {
                  console.log(data);
                  this.detailData = data;
                  console.log(this.detailData);
              }
          );
      }
  };
</script>

<style lang="scss" scoped>
  @import "../../../../../static/scss/_commonScss";
  .container {
      @include basic_container_style;
      /deep/ header {
          .search {
              a {
                  font-size: 16px;
                  color: #019ddd;
                  font-family: PingFangSC-Regular;
              }
          }
      }
      .content {
          /deep/ .basicInformation {
              .content_box {
                  ul {
                      padding-left: 13px;
                      li {
                          padding: 13px 13px 13px 0;
                          border-bottom: 0.5px solid #f6f6f6;
                          &:first-child {
                              padding-top: 0;
                          }
                          &:last-child {
                              padding-bottom: 3px;
                              border: none;
                          }
                      }
                  }
              }
          }
          .Personal_information {
              @include box_shadow_style;
              margin-top: 10px;
              /deep/ .basicTitle {
                  h2 {
                      span {
                          font-size: 13px;
                          color: #333333;
                          font-family: PingFangSC-Regular;
                      }
                  }
              }
          }
          .hospitalDetails {
              @include box_shadow_style;
              margin-top: 10px;
              .main_content {
                  font-family: PingFangSC-Regular;
                  font-size: 14px;
                  color: #666666;
                  line-height: 21px;
                  padding: 10px 13px;
              }
          }
          .product_list {
              @include box_shadow_style;
              margin-top: 10px;
          }
      }
  }
</style>
