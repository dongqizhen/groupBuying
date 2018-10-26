<template>
  <div class="container">
    <Header style="position: absolute;" :isSearchHide="false"></Header>
    <div class="content">
      <scroller :class="this.$route.query.come==1?'height':''">
        <cube-slide ref="slide" :data="Banneritems" class="banner">
          <cube-slide-item v-for="(item, index) in Banneritems" :key="index">
            <a>
              <img :src="item.url">
            </a>
          </cube-slide-item>
        </cube-slide>
        <div class="proBaseInfo">
          <div class="tagTypeBox">
            <span class="tagType">团购</span>
          </div>
          <div class="prolineAndBrandAndModel">{{data.productLineName}}/{{data.brandName}}{{data.modelName?"/":""}}{{data.modelName}}</div>
          <div class="proPrice">
            <span class="currency" v-if="data.isOpen ||$USER_INFO.userid==data.companyUserId">￥</span>
            <span :class="data.isOpen || $USER_INFO.userid==data.companyUserId?'price':'textStyle'">{{data.isOpen || $USER_INFO.userid==data.companyUserId ?data.price.split(".")[0]:"团购办现场宣布价格"}}</span>
            <span :class="data.isOpen ||$USER_INFO.userid==data.companyUserId?'point':'textStyle'">{{data.isOpen || $USER_INFO.userid==data.companyUserId?'.'+data.price.split(".")[1]:""}}</span>
            <span class="priceUnit" v-if="data.isOpen || $USER_INFO.userid==data.companyUserId">万元</span>
          </div>
        </div>
        <div class="proParam">
          <div class="common clinicalApplication">
            <div class="commonLeft">临床应用</div>
            <div class="commonRight clinicalDescription">{{data.application}}</div>
          </div>
          <div class="common param" v-if="params.length!=0">
            <div class="commonLeft">参数</div>
            <div class="commonRight paramVal">
              <ul>
                <li v-for="itemParam in params" :key="itemParam.paramName">{{itemParam.name}}</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="proDetail">
          <h2>产品详情</h2>
          <div class="proInfo">{{data.introduce}}</div>
        </div>
      </scroller>
      <footer-menu :data="data" :isStore="isStore" v-on:selectedLabel="selectLabel" v-if="this.$route.query.come==1?false:true"></footer-menu>
    </div>
  </div>
</template>

<script>
  import Header from "../../components/header/header";
  import footerMenu from "../../components/common/footerMenu";
  import { _getData } from "../../service/getData";
  import { mapMutations } from "vuex";

  export default {
      data() {
          return {
              Banneritems: [],
              params: [],
              data: {},
              isStore: "",
              companyId: ""
          };
      },
      components: {
          Header,
          footerMenu
      },
      props: ["id"],
      methods: {
          ...mapMutations["setTranstion"],
          selectLabel(obj) {
              console.log(obj);
              switch (obj.label) {
                  case "查看商家":
                      break;
                  case "私信商家":
                      break;
                  case "收藏":
                      _getData(
                          "/server_pro/dianzan!request.action",
                          {
                              method: "addOrDeleteFavorite_v27",
                              params: {
                                  id: this.id,
                                  type: 20,
                                  controlflag: obj.num % 2, //1表示取消，0表示添加（传的是现在的状态）
                                  smallType: "" //未知
                              }
                          },
                          data => {
                              console.log(data);
                          }
                      );
                      break;
                  case "加入我的团购需求表":
                      break;
              }
          }
      },
      activated() {
          _getData(
              "/server_pro/groupPurchaseCompanyProduct!request.action",
              {
                  method: "getGroupPurchaseCompanyProductDetail",

                  params: { id: this.id }
              },
              data => {
                  console.log(data);
                  this.data = data;
                  this.params = data.params;
                  this.Banneritems = JSON.parse(data.imageUrl);
                  this.isStore = data.isFavorite ? true : false;
              }
          );
      }
  };
</script>

<style lang="scss" scoped>
  @import "../../../../../static/scss/_commonScss.scss";
  .container {
      @include basic_container_style;
      background: #fff;
      /deep/ #header {
          border: none;
      }
      .content {
          background: #fff;
          /deep/ ._v-container {
              background: #f6f6f6;
              height: calc(100% - 48px) !important;
          }
          /deep/ ._v-container.height {
              height: 100% !important;
          }
          .cube-slide.banner {
              height: 353px;
              @include box_shadow_style;
              .cube-slide-item {
                  a {
                      img {
                          width: 100%;
                      }
                  }
              }
          }
          .proBaseInfo {
              background-color: #fff;
              height: 92px;
              padding: 10px 13px 10px 7px;
              margin-bottom: 10px;
              .tagTypeBox {
                  height: 100%;
                  float: left;
              }
              .tagType {
                  display: block;
                  background: #f56a23;
                  border-radius: 1px;
                  color: #fff;
                  font-family: PingFangSC-Regular;
                  width: 40px;
                  height: 18px;
                  line-height: 18px;
                  font-size: 14px;
                  text-align: center;
                  margin-right: 7px;
                  margin-top: 2px;
              }
              .prolineAndBrandAndModel {
                  font-size: 18px;
                  color: #333;
                  min-height: 54px;
                  font-family: PingFangSC-Medium;
                  line-height: 24px;
              }
              .proPrice {
                  font-size: 20px;
                  color: #fb4354;
                  float: right;
                  font-family: PingFangSC-Medium;

                  .currency {
                      color: #fb4354;
                      font-size: 13px;
                      font-family: PingFangSC-Medium;
                      margin-right: 2px;
                  }
                  .price {
                      margin-right: -5px;
                      margin-left: -5px;
                  }
                  .textStyle {
                      font-family: PingFangSC-Medium;
                      font-size: 14px;
                      color: #fb4354;
                  }
                  .point {
                      font-family: PingFangSC-Medium;
                      font-size: 13px;
                      color: #fb4354;
                  }
                  .priceUnit {
                      font-size: 12px;
                      color: #999;
                      font-family: PingFangSC-Medium;
                  }
              }
          }
          .proParam {
              width: 100%;
              margin-bottom: 10px;
              background-color: #fff;
              .common {
                  display: flex;
                  padding: 0 13px;
                  align-items: center;
                  justify-content: space-between;
                  min-height: 46px;
                  .commonLeft {
                      flex-basis: 89px;
                      font-size: 14px;
                      color: #999;
                      font-family: PingFangSC-Regular;
                  }
                  .commonRight {
                      flex-basis: 260px;
                  }
              }
              .clinicalApplication {
                  border-bottom: $border_style;
                  min-height: 46px;
                  .clinicalDescription {
                      font-size: 14px;
                      color: #333;
                      line-height: 18px;
                      font-family: PingFangSC-Regular;
                  }
              }
              .paramVal {
                  ul {
                      display: flex;
                      width: 100%;
                      justify-content: flex-start;
                      flex-wrap: wrap;
                      li {
                          padding: 0 16px;
                          background-color: #ebebeb;
                          border-radius: 2px;
                          font-size: 13px;
                          color: #333;
                          height: 19px;
                          line-height: 19px;
                          margin: 5px 0;
                          margin-right: 10px;
                          font-family: PingFangSC-Regular;
                      }
                  }
              }
          }
          .proDetail {
              width: 100%;
              background-color: #fff;
              margin-bottom: 56px;
              h2 {
                  height: 46px;
                  line-height: 46px;
                  padding: 0 13px;
                  font-size: 14px;
                  color: #333;
                  border-bottom: $border_style;
                  font-family: PingFangSC-Medium;
              }
              .proInfo {
                  font-family: PingFangSC-Regular;
                  padding: 13px;
                  line-height: 18px;
                  font-size: 14px;
                  color: #333333;
                  box-shadow: 0.5px 1px 2px 0.5px rgba(0, 0, 0, 0.1);
              }
          }
      }
  }
</style>
