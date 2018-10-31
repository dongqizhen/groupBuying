<template>
    <div class="container selectBrand">
        <Header :title="this.$route.query.groupTypeCode=='ZXTG'||this.$route.query.groupTypeCode=='JRTG'?'选择服务商':'选择品牌'">
            <span slot="explain" class="enter" @click="clickSure">确定</span>
        </Header>
        <div class="content">
            <search :placeholder="this.$route.query.groupTypeCode=='ZXTG'||this.$route.query.groupTypeCode=='JRTG'?'请输入服务商':'请输入品牌'" v-on:inputValue="selectBrand"></search>
            <cube-index-list :data="brandListData" v-if="this.brandListData.length!=0">
              <cube-index-list-group v-for="(group, index) in brandListData" :key="index" :group="group">
                <cube-index-list-item v-for="(item, index) in group.items" :key="index" :item="item" @select="selectItem(item.aliasId, item)">
                  <div :class="['custom-item',activeClass(item.aliasId)]">{{item.brandName}} <span v-if="item.brandLabel">{{item.brandLabel}}</span></div>
                </cube-index-list-item>
              </cube-index-list-group>
            </cube-index-list>
            <div class="scroll-list-wrap">
              <cube-scroll ref="scroll" :data="search_area_arr">
                <ul class="search_area">
                  <li v-for="(item,index) in search_area_arr" :key='index' :class="activeClass(item.aliasId)" @click="selectItem(item.aliasId,item)"><span>{{item.brandName}}</span><span class="label" v-if="item.brandLabel">{{item.brandLabel}}</span></li>
                </ul>
              </cube-scroll>
            </div>
        </div>
    </div>
</template>

<script>
import Header from "../../components/header/header";
import search from "../../components/search/search";
import { _getData } from "../../service/getData";
import { Toast } from "vant";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      tempLastSearchValue: "",
      brandListData: [],
      current: null,
      productBrand: {},
      search_area_arr: [],
      itemSelect: [],
      page: "",
      groupTypeCode: ""
    };
  },
  components: {
    Header,
    search
  },
  methods: {
    ...mapMutations([
      "setTransition",
      "selectSBTGProductBrand",
      "selectHCTGProductBrand",
      "selectSHTGProductBrand",
      "selectXXHTGProductBrand",
      "selectJRTGProductBrand",
      "selectZXTGProductBrand",
      "SBTGProductBrandFirst",
      "SBTGProductBrandSecond",
      "SBTGProductBrandThird",
      "HCTGProductBrandFirst",
      "HCTGProductBrandSecond",
      "HCTGProductBrandThird",
      "SHTGProductBrand",
      "XXHTGProductBrand",
      "JRTGProductBrand",
      "ZXTGProductBrand"
    ]),
    clickSure() {
      this.setTransition("turn-off");
      var flag = true;
      if (this.tempLastSearchValue == "") {
        if (this.itemSelect.length == 0) {
          Toast("请选择或输入品牌");
          return;
        } else {
          if (this.itemSelect[0].aliasId == "") {
            Toast("请选择或输入品牌");
            return;
          }
        }
      } else {
        if (this.itemSelect.length == 0) {
          flag = false;
          _getData(
            `${this.$API_URL.WEB_URL}/server/productLine!request.action`,
            {
              method: "getProductLineByName",
              params: {
                name: this.tempLastSearchValue,
                type: "6",
                flag: "1"
              }
            },
            data => {
              console.log(data);
              if (this.itemSelect.length == 0) {
                this.itemSelect.push(data);
              } else {
                this.itemSelect.splice(0, 1, data);
              }
              flag = true;
              if (flag) {
                this.$router.go(-1);
              }
            }
          );
        }
      }
      if (
        _.join(
          _.map(
            this.$store.state.page[this.page][this.groupTypeCode].brand,
            "aliasId"
          ),
          ","
        ) != _.join(_.map(this.itemSelect, "aliasId"), ",")
      ) {
        this.$store.state.page[this.page][this.groupTypeCode].model = [];
      }
      if (this.page == "submitGroupDemand") {
        if (this.groupTypeCode == "SBTG" || this.groupTypeCode == "HCTG") {
          if (this.$route.query.type == 0) {
            if (
              _.join(
                _.map(
                  this.$store.state.page[this.page][this.groupTypeCode]
                    .brandFirst,
                  "aliasId"
                ),
                ","
              ) != _.join(_.map(this.itemSelect, "aliasId"), ",")
            ) {
              this.$store.state.page[this.page][
                this.groupTypeCode
              ].modelFirst = [];
            }
          } else if (this.$route.query.type == 1) {
            if (
              _.join(
                _.map(
                  this.$store.state.page[this.page][this.groupTypeCode]
                    .brandSecond,
                  "aliasId"
                ),
                ","
              ) != _.join(_.map(this.itemSelect, "aliasId"), ",")
            ) {
              this.$store.state.page[this.page][
                this.groupTypeCode
              ].modelSecond = [];
            }
          } else if (this.$route.query.type == 2) {
            if (
              _.join(
                _.map(
                  this.$store.state.page[this.page][this.groupTypeCode]
                    .brandThird,
                  "aliasId"
                ),
                ","
              ) != _.join(_.map(this.itemSelect, "aliasId"), ",")
            ) {
              this.$store.state.page[this.page][
                this.groupTypeCode
              ].modelThird = [];
            }
          }
        }
      }
      switch (this.groupTypeCode) {
        case "SBTG":
          if (this.page == "uploadProduct") {
            this.selectSBTGProductBrand(this.itemSelect);
          } else if (this.page == "submitGroupDemand") {
            if (this.$route.query.type == 0) {
              this.SBTGProductBrandFirst(this.itemSelect);
            } else if (this.$route.query.type == 1) {
              this.SBTGProductBrandSecond(this.itemSelect);
            } else {
              this.SBTGProductBrandThird(this.itemSelect);
            }
          }
          break;
        case "HCTG":
          if (this.page == "uploadProduct") {
            this.selectHCTGProductBrand(this.itemSelect);
          } else if (this.page == "submitGroupDemand") {
            if (this.$route.query.type == 0) {
              this.HCTGProductBrandFirst(this.itemSelect);
            } else if (this.$route.query.type == 1) {
              this.HCTGProductBrandSecond(this.itemSelect);
            } else {
              this.HCTGProductBrandThird(this.itemSelect);
            }
          }
          break;
        case "SHTG":
          if (this.page == "uploadProduct") {
            this.selectSHTGProductBrand(this.itemSelect);
          } else if (this.page == "submitGroupDemand") {
            this.SHTGProductBrand(this.itemSelect);
          }
          break;
        case "XXHTG":
          if (this.page == "uploadProduct") {
            this.selectXXHTGProductBrand(this.itemSelect);
          } else if (this.page == "submitGroupDemand") {
            this.XXHTGProductBrand(this.itemSelect);
          }
          break;
        case "JRTG":
          if (this.page == "uploadProduct") {
            this.selectJRTGProductBrand(this.itemSelect);
          } else if (this.page == "submitGroupDemand") {
            this.JRTGProductBrand(this.itemSelect);
          }
          break;
        case "ZXTG":
          if (this.page == "uploadProduct") {
            this.selectZXTGProductBrand(this.itemSelect);
          } else if (this.page == "submitGroupDemand") {
            this.ZXTGProductBrand(this.itemSelect);
          }
          break;
      }
      if (flag) {
        this.$router.go(-1);
      }
    },
    selectItem(aliasId, item) {
      if (this.itemSelect.length < 1) {
        this.itemSelect.push(item);
      } else {
        if (
          _.find(this.itemSelect, function(o) {
            return o.aliasId == aliasId;
          }) == item
        ) {
          this.itemSelect.splice(0, 1);
        } else {
          this.itemSelect.splice(0, 1, item);
        }
      }
    },
    activeClass(aliasId) {
      if (this.itemSelect) {
        for (const val of this.itemSelect) {
          if (val.aliasId == aliasId) {
            return "active";
          }
        }
      }
    },
    selectBrand(val) {
      this.itemSelect = [];
      this.reqData(val);
      this.tempLastSearchValue = val;
    },
    reqData(name) {
      _getData(
        "/server_pro/groupPurchaseCompanyProduct!request.action",
        {
          method: "getBrandListByGroupPurchaseType",
          params: { name: name, productLineId: this.$route.query.productLineId }
        },
        data => {
          console.log(data);
          if (name) {
            this.brandListData = [];
            this.search_area_arr = data.brandList;
          } else {
            this.brandListData = data.brandList;
          }
        }
      );
    }
  },
  mounted() {
    this.groupTypeCode = this.$route.query.groupTypeCode;
    this.page = this.$route.query.page;
    this.reqData();
    this.itemSelect = this.$route.query.vuexSelectValue;
  },
  deactivated() {
    this.$destroy();
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../../static/scss/_commonScss";
.container {
  @include basic_container_style;
  /deep/ header {
    .search {
      .enter {
        padding-right: 13px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #333333;
      }
    }
  }
  .content {
    padding: 10px 13px;
    overflow: hidden;
    /deep/ .scroll-list-wrap {
      height: calc(100% - 46px);
      margin-top: 10px;
      @include box_shadow_style;
      .cube-scroll-wrapper {
        .cube-scroll-content {
          min-height: calc(100% + 1px);
          padding: 0 0 0 13px;
          .cube-scroll-list-wrapper {
            ul {
              li {
                height: 46px;
                display: flex;
                align-items: center;
                padding-right: 8px;
                border-bottom: 0.5px solid #f6f6f6;
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #333333;
                display: flex;
                &.active {
                  > span:first-child {
                    color: #019ddd;
                  }
                }
                .label {
                  font-family: PingFangSC-Regular;
                  font-size: 11px;
                  color: #fb4354;
                  display: flex;
                  height: 16px;
                  padding: 0 3px;
                  //width: 72px;
                  align-items: center;
                  background: rgba(251, 67, 84, 0.1);
                  border-radius: 2px;
                  margin-left: 18px;
                }
              }
            }
          }
        }
      }
    }
    /deep/ .cube-index-list {
      height: calc(100% - 46px);
      margin-top: 10px;
      @include box_shadow_style;
      .cube-scroll-wrapper {
        .cube-scroll-content {
          min-height: calc(100% + 1px);
          .cube-index-list-content {
            > ul {
              > li {
                > h2 {
                  height: 25px;
                  background: rgba(1, 157, 221, 0.03);
                  padding: 0;
                  display: flex;
                  align-items: center;
                  padding-left: 13px;
                  font-family: PingFangSC-Regular;
                  font-size: 13px;
                  color: #019ddd;
                }
                > ul {
                  > li {
                    height: 46px;
                    > .custom-item {
                      height: 100%;
                      padding: 0;
                      margin-left: 13px;
                      border-bottom: 0.5px solid #f6f6f6;
                      display: flex;
                      justify-content: flex-start;
                      align-items: center;
                      color: #333;
                      font-size: 14px;
                      font-family: PingFangSC-Regular;
                      &.active {
                        color: #019ddd;
                      }
                      span {
                        font-family: PingFangSC-Regular;
                        font-size: 11px;
                        color: #fb4354;
                        display: flex;
                        height: 16px;
                        padding: 0 3px;
                        //width: 72px;
                        align-items: center;
                        background: rgba(251, 67, 84, 0.1);
                        border-radius: 2px;
                        margin-left: 18px;
                      }
                    }
                    &:last-child {
                      > .custom-item {
                        border: none;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      .cube-index-list-fixed {
        height: 25px;
        background: rgba(1, 157, 221, 0.03);
        padding: 0;
        display: flex;
        align-items: center;
        padding-left: 13px;
        font-family: PingFangSC-Regular;
        font-size: 13px;
        color: #019ddd;
        display: none;
      }
      .cube-index-list-nav {
        > ul {
          > li {
            font-family: PingFangSC-Medium;
            font-size: 11px;
            color: #666666;
            padding-right: 7px;
            &.active {
              color: #019ddd;
            }
          }
        }
      }
    }
  }
}
</style>
