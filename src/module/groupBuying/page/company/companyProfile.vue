<template>
  <div class="container">
    <Header title="企业介绍">
      <router-link :to="{path:'enterpriseSeal',query:{id:$route.query.id}}" slot="explain" @click.native="setTransition('turn-on')">编辑</router-link>
    </Header>
    <div class="content">
      <div class="scroll-list-wrap">
        <cube-scroll ref="scroll">
          <basic-information :detailData="detailData" title="企业基本信息"></basic-information>
          <div class="Personal_information">
            <basic-title title="团购负责人信息" imgurl="../static/images/Personal_information.png">
              <span slot="check" @click="packUp" v-if="isShowBtn">{{btnText!=0?'展开':'收起'}}</span>
            </basic-title>
            <personal-information :read="true" :disabled="true" :data="detailData.contactList" ref="Personal_information"></personal-information>
          </div>
          <div class="list_container">
            <basic-title title="参加团购产品列表" imgurl="../static/images/product_list.png"></basic-title>
            <div class="product_list" v-if="groupPurchaseTypeList.length">

              <type-scroll-nav-bar :typeData="typeData" :slectedTypeKeyWord="curTypeVal" v-on:typeNavChange="TypeNavChange"></type-scroll-nav-bar>
            </div>
            <div class="products" v-if="groupPurchaseTypeList.length">
              <model-scroll-nav-bar :modelData="modelData" :selectModelVal="selectModelVal" v-on:modelNavChange="ModelNavChange"></model-scroll-nav-bar>
              <ul>
                <li v-for="data in swipeData" :key="data.id">
                  <product-list :listData="data"></product-list>
                </li>

              </ul>
            </div>
            <no-data v-else></no-data>
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
  import _ from "lodash";
  import { getProductList } from "../../components/mixin/mixin";
  import noData from "../../components/noData/noData.vue";
  export default {
      data() {
          return {
              detailData: {},
              disabled: true,
              typeData: [],
              isShowBtn: false,
              btnText: 0,
              parentHeight: ""
          };
      },
      mixins: [getProductList],
      components: {
          Header,
          basicInformation,
          basicTitle,
          typeScrollNavBar,
          modelScrollNavBar,
          productList,
          personalInformation,
          noData
      },
      methods: {
          ...mapMutations(["setTransition"]),
          packUp() {
              const childHeight = this.$refs.Personal_information.$el
                  .childNodes[0].clientHeight;

              if (this.btnText == 0) {
                  this.btnText = 1;

                  this.$refs.Personal_information.$el.style.height =
                      childHeight + "px";
              } else {
                  this.btnText = 0;
                  console.log(this.parentHeight + "px");
                  this.$refs.Personal_information.$el.style.height =
                      this.parentHeight + "px";
              }
              // console.log(this.$refs.scroll);

              setTimeout(() => {
                  this.$refs.scroll.refresh();
              }, 300);
          }
      },

      created() {
          _getData(
              "/server_pro/groupPurchaseCompany!request.action",
              {
                  method: "getGroupPurchaseCompanyDetail",
                  params: { id: this.$route.query.id }
              },
              data => {
                  console.log(data);
                  this.detailData = data;
                  console.log(this.detailData);
                  if (data.contactList.length > 1) {
                      this.isShowBtn = true;
                  }
              }
          );
          setTimeout(() => {
              if (this.parentHeight == "") {
                  this.parentHeight = this.$refs.Personal_information.$el.clientHeight;
                  this.$refs.Personal_information.$el.style.height =
                      this.parentHeight + "px";
              }
          }, 500);
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
                          border-bottom: $border_style;
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
          /deep/ .cube-scroll-wrapper {
              .cube-scroll-content {
                  min-height: calc(100% + 1px);
              }
          }
          .Personal_information {
              @include box_shadow_style;
              margin-top: 10px;
              overflow: hidden;
              height: auto;
              /deep/ .basicTitle {
                  h2 {
                      span {
                          font-size: 13px;
                          color: #333333;
                          font-family: PingFangSC-Regular;
                      }
                  }
              }
              /deep/ .personalInformation {
                  height: auto;
                  transition: height 0.3s;
              }
          }
          .list_container {
              margin-top: 10px;
              border-bottom-left-radius: 5px;
              border-bottom-right-radius: 5px;
              // box-shadow: $base-box-shadow;
              /deep/ .basicTitle {
                  background: #ffffff;
                  border-top-left-radius: 5px;
                  border-top-right-radius: 5px;
                  box-shadow: $base-box-shadow;
              }
              .product_list {
                  background: #ffffff;
                  /* box-shadow: 0.5px 1px 3px 0.5px rgba(0, 0, 0, 0.1);
                                                                    border-radius: 5px;
                                                                    margin-top: 10px; */
                  /deep/ .typeScrollNavBar {
                      border-bottom-left-radius: 5px;
                      border-bottom-right-radius: 5px;
                      box-shadow: $base-box-shadow;
                      margin-bottom: 10px;
                  }
              }
              .products {
                  background: #ffffff;
                  box-shadow: $base-box-shadow;
                  border-radius: 5px;

                  ul {
                      padding: 10px 0;
                      border-top: $border_style;
                      li {
                          height: 90px;
                          width: 100%;
                          padding: 0 13px;
                          margin-bottom: 13px;
                          /deep/ .productList {
                              height: 100%;
                              .left_box {
                                  width: 100px;
                                  margin-right: 13px;
                              }
                              .right_box {
                                  padding: 16px 0;
                              }
                          }
                          &:last-child {
                              margin-bottom: 0;
                          }
                      }
                  }
              }
              /deep/ .noData {
                  background: #ffffff;
                  padding: 30px 0;
                  border-bottom-left-radius: 5px;
                  border-bottom-right-radius: 5px;
                  box-shadow: $base-box-shadow;
              }
          }
      }
  }
</style>
