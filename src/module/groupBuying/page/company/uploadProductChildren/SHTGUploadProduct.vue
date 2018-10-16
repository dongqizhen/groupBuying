<template>
  <ul>
    <li @click="jumpProductCateGory">
      <a>
        <span class="star">售后分类：</span>
        <cube-input placeholder="请选择分类" :disabled="true" v-model="info.productLineName">
          <i slot="append"></i>
        </cube-input>
      </a>
    </li>
    <li @click="jumpSelectBrand">
      <a>
        <span class="star">售后品牌：</span>
        <cube-input placeholder="请选择品牌" :disabled="true" v-model="info.brandName">
          <i slot="append"></i>
        </cube-input>
      </a>
    </li>
    <li @click="jumpSelectModel">
      <a>
        <span>售后型号：</span>
        <cube-input placeholder="默认为不限" :disabled="true" v-model="info.modelName">
          <i slot="append"></i>
        </cube-input>
      </a>
    </li>
    <li class="price">
      <span>团购价格：</span>
      <cube-input placeholder="请输入团购价格" :disabled="false" type="number" v-model.trim.number="info.price" @input="savePriceValue">
        <span slot="append">万元</span>
      </cube-input>
      <div class="check_box" @click="saveIsOpenValue">
        <cube-checkbox v-model="info.isOpen">
          对外公开
        </cube-checkbox>
      </div>
    </li>
    <li>
      <a>
        <span class="star">响应时间：</span>
        <cube-input class="responseTime" type="number" placeholder="请输入响应时间" @input="saveResponseTimeValue" v-model="info.responseTime">
          <span slot="append">小时以内</span>
        </cube-input>
      </a>
    </li>
    <li>
      <a>
        <span class="star">维保类型：</span>
        <div class="maintanceType">
          <span v-for="(item,index) in types" :key="index" :class="currentIdx===index?'active':''" @click="addClass(index)">{{item.name}}</span>
        </div>
      </a>
    </li>
  </ul>
</template>
<script>
  import { mapMutations } from "vuex";
  import { Group, XTextarea } from "vux";
  import { Toast } from "vant";
  const types = [
      { id: 0, name: "全保" },
      { id: 1, name: "备件保" },
      { id: 2, name: "人工保" }
  ];
  export default {
      data() {
          return { types, currentIdx: null };
      },
      computed: {
          info() {
              this.currentIdx = this.$store.state.page.uploadProduct.SHTG.maintenanceType;
              return this.$store.state.page.uploadProduct.SHTG;
          }
      },
      watch: {
          info() {
              console.log(
                  "变化数据：",
                  this.$store.state.page.uploadProduct.SHTG
              );
          }
      },
      components: {
          Group,
          XTextarea
      },
      methods: {
          ...mapMutations([
              "setTransition",
              "uploadProductSHTGPriceSave",
              "uploadProductSHTGPriceIsOpenSave",
              "uploadProductSHTGResponseTimeSave",
              "uploadProductSHTGMaintenanceTypeSave"
          ]),
          savePriceValue() {
              this.uploadProductSHTGPriceSave(this.info.price);
          },
          saveResponseTimeValue() {
              this.uploadProductSHTGResponseTimeSave(this.info.responseTime);
          },
          saveIsOpenValue() {
              this.uploadProductSHTGPriceIsOpenSave(!this.info.isOpen);
          },
          addClass(i) {
              this.currentIdx = i;
              this.info.maintenanceType = this.types[i].id;
              this.uploadProductSHTGMaintenanceTypeSave(
                  this.info.maintenanceType
              );
          },
          jumpProductCateGory() {
              if (this.$route.query.groupTypeCode) {
                  this.setTransition("turn-on");
                  this.$router.push({
                      path: "/productCategory",
                      query: {
                          groupPurchaseTypeId: this.$route.query
                              .groupPurchaseTypeId,
                          groupTypeCode: this.$route.query.groupTypeCode,
                          page: "uploadProduct",
                          vuexSelectValue: this.$store.state.page.uploadProduct
                              .SHTG.productLine
                      }
                  });
              } else {
                  Toast("请先选择团购产品类型");
                  return;
              }
          },
          jumpSelectBrand() {
              if (this.info.productLineId) {
                  this.setTransition("turn-on");
                  this.$router.push({
                      path: "/selectBrand",
                      query: {
                          productLineId: this.info.productLineId,
                          groupTypeCode: this.$route.query.groupTypeCode,
                          page: "uploadProduct",
                          vuexSelectValue: this.$store.state.page.uploadProduct
                              .SHTG.brand
                      }
                  });
              } else {
                  Toast("请先选择分类");
                  return;
              }
          },
          jumpSelectModel() {
              if (this.info.brandId) {
                  this.setTransition("turn-on");
                  this.$router.push({
                      path: "/selectModel",
                      query: {
                          brandId: this.info.brandId,
                          productLineId: this.info.productLineId,
                          groupTypeCode: this.$route.query.groupTypeCode,
                          page: "uploadProduct",
                          vuexSelectValue: this.$store.state.page.uploadProduct
                              .SHTG.model
                      }
                  });
              } else {
                  Toast("请先选择品牌");
                  return;
              }
          }
      },
      activated() {
          this.info.productLineName = _.join(
              _.map(
                  this.$store.state.page.uploadProduct.SHTG.productLine,
                  this.$store.state.page.uploadProduct.SHTG.productLine[0]
                      .aliasName
                      ? "aliasName"
                      : "productLineName"
              ),
              ","
          );
          this.info.productLineId = _.join(
              _.map(
                  this.$store.state.page.uploadProduct.SHTG.productLine,
                  "productLineId"
              ),
              ","
          );
          this.info.brandName = _.join(
              _.map(
                  this.$store.state.page.uploadProduct.SHTG.brand,
                  this.$store.state.page.uploadProduct.SHTG.brand[0].aliasName
                      ? "aliasName"
                      : "brandName"
              ),
              ","
          );
          this.info.brandId = _.join(
              _.map(this.$store.state.page.uploadProduct.SHTG.brand, "brandId"),
              ","
          );
          this.info.modelName = _.join(
              _.map(this.$store.state.page.uploadProduct.SHTG.model, "name"),
              ","
          );
      }
  };
</script>
<style lang="scss" scoped>
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
                  width: auto;
                  &.star {
                      padding-left: 7px;
                      background: url("../../../../../../static/images/star.png")
                          no-repeat left center;
                      background-size: 7px;
                  }
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
                      background: url("../../../../../../static/images/grayarrow.png")
                          no-repeat center;
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
          /deep/ .cube-input {
              flex: 1;
              &:after {
                  border: none;
              }
              &.responseTime {
                  .cube-input-field {
                      //text-align: left;
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
              span {
                  font-family: PingFangSC-Regular;
                  font-size: 14px;
                  color: #333333;
              }
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
                  // padding-right: 0;
                  display: flex;
                  align-items: center;
                  padding-left: 0px;
                  height: 100%;
                  padding-right: 13px;
                  &.cube-checkbox_checked {
                      .cubeic-right {
                          color: #019ddd;
                      }
                  }
                  .cube-checkbox-wrap {
                      padding: 0;
                      font-family: PingFangSC-Medium;
                      font-size: 14px;
                      color: #666666;
                      display: flex;
                      align-items: center;
                      height: 14px;
                      padding-left: 16px;
                      border-left: 0.5px solid rgba(153, 153, 153, 0.31);
                      .cube-checkbox-ui {
                          height: 14px;
                          width: 14px;
                          margin-right: 4px;
                          margin-top: 2px;
                      }
                      .cube-checkbox-label {
                          display: flex;
                          height: 14px;
                          align-items: center;
                      }
                      .cube-checkbox-input {
                          height: 14px;
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
                      padding-right: 13px;
                      .weui-cell__hd {
                          height: 43px;
                          font-family: PingFangSC-Regular;
                          font-size: 14px;
                          color: #333333;
                          display: flex;
                          align-items: center;
                          background: url("../../../../../../static/images/star.png")
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
</style>
