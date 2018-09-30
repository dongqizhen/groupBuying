<template>
    <div class="container productCategory">
        <Header title="选择分类">
            <span slot="explain" class="enter" @click="clickSure">确定</span>
        </Header>
        <div class="content">
            <search placeholder="请输入分类" v-on:inputValue="getValue"></search>
            <div class="Stick_container">
                <ul class="stick_area">
                    <li v-for="(item,index) in stick_area_arr" :key='index' :class="activeClass(item.aliasId)" @click="checkedHandle(item.aliasId,item)">
                        <span>{{item.name}}</span>
                        <span @click.stop="cancelStick(item)">取消置顶</span>
                    </li>
                </ul>
                <ul class="general_area">
                    <li v-for="(item,index) in general_area_arr" :key='index' :class="activeClass(item.aliasId)"  @click="checkedHandle(item.aliasId,item)">
                        <span>{{item.name}}</span>
                        <span @click.stop="Stick(item)">置顶</span>
                    </li>
                </ul>
                <ul class="search_area">
                    <li v-for="(item,index) in search_area_arr" :key='index' :class="activeClass(item.alisaId)" @click="checkedHandle(item.alisaId,item)">
                        <span>{{item.name}}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import _ from "lodash";
import { _getData } from "../../service/getData";
import Header from "../../components/header/header";
import search from "../../components/search/search";
import { mapMutations } from "vuex";
import { Toast } from "vant";
export default {
  data() {
    return {
      stick_area_arr: [],
      general_area_arr: [],
      search_area_arr: [],
      value: "",
      tempLastSearchValue: "",
      itemSelect: [],
      searchItemSelect: []
    };
  },
  components: {
    Header,
    search
  },
  methods: {
    ...mapMutations([
      "setTransition",
      "selectSBTGProductSort",
      "selectHCTGProductSort",
      "selectSHTGProductSort",
      "selectXXHTGProductSort",
      "selectJRTGProductSort",
      "selectZXTGProductSort",
      "SBTGProductSort",
      "HCTGProductSort",
      "SHTGProductSort",
      "XXHTGProductSort",
      "JRTGProductSort",
      "ZXTGProductSort"
    ]),
    clickSure() {
      this.setTransition("turn-off");
      console.log(this.tempLastSearchValue);
      // var flag = true;
      // if (this.tempLastSearchValue == "") {
      //   if (this.itemSelect.length == 0) {
      //     Toast("请选择或输入分类");
      //     return;
      //   } else {
      //     switch (this.$route.query.groupTypeCode) {
      //       case "SBTG":
      //         if (
      //           _.join(
      //             _.map(
      //               this.$store.state.page.uploadProduct.SBTG.productSort,
      //               "aliasId"
      //             ),
      //             ","
      //           ) != _.join(_.map(this.itemSelect, "aliasId"), ",")
      //         ) {
      //           this.$store.state.page.uploadProduct.SBTG.productBrand = [];
      //           this.$store.state.page.uploadProduct.SBTG.productModel = [];
      //         }
      //         if (this.$route.query.page == "uploadProduct") {
      //           this.selectSBTGProductSort(this.itemSelect);
      //         } else if (this.$route.query.page == "submitGroupDemand") {
      //           this.SBTGProductSort(this.itemSelect);
      //         }

      //         break;
      //       case "HCTG":
      //         if (
      //           _.join(
      //             _.map(
      //               this.$store.state.page.uploadProduct.HCTG.productSort,
      //               "aliasId"
      //             ),
      //             ","
      //           ) != _.join(_.map(this.itemSelect, "aliasId"), ",")
      //         ) {
      //           this.$store.state.page.uploadProduct.HCTG.productBrand = [];
      //           this.$store.state.page.uploadProduct.HCTG.productModel = [];
      //         }
      //         if (this.$route.query.page == "uploadProduct") {
      //           this.selectHCTGProductSort(this.itemSelect);
      //         } else if (this.$route.query.page == "submitGroupDemand") {
      //           this.HCTGProductSort(this.itemSelect);
      //         }

      //         break;
      //       case "SHTG":
      //         if (
      //           _.join(
      //             _.map(
      //               this.$store.state.page.uploadProduct.SHTG.productSort,
      //               "aliasId"
      //             ),
      //             ","
      //           ) != _.join(_.map(this.itemSelect, "aliasId"), ",")
      //         ) {
      //           this.$store.state.page.uploadProduct.SHTG.productBrand = [];
      //           this.$store.state.page.uploadProduct.SHTG.productModel = [];
      //         }
      //         if (this.$route.query.page == "uploadProduct") {
      //           this.selectSHTGProductSort(this.itemSelect);
      //         } else if (this.$route.query.page == "submitGroupDemand") {
      //           this.SHTGProductSort(this.itemSelect);
      //         }
      //         break;
      //       case "XXHTG":
      //         if (
      //           _.join(
      //             _.map(
      //               this.$store.state.page.uploadProduct.XXHTG.productSort,
      //               "aliasId"
      //             ),
      //             ","
      //           ) != _.join(_.map(this.itemSelect, "aliasId"), ",")
      //         ) {
      //           this.$store.state.page.uploadProduct.XXHTG.productBrand = [];
      //           this.$store.state.page.uploadProduct.XXHTG.productModel = [];
      //         }
      //         if (this.$route.query.page == "uploadProduct") {
      //           this.selectXXHTGProductSort(this.itemSelect);
      //         } else if (this.$route.query.page == "submitGroupDemand") {
      //           this.XXHTGProductSort(this.itemSelect);
      //         }
      //         break;
      //       case "JRTG":
      //         if (
      //           _.join(
      //             _.map(
      //               this.$store.state.page.uploadProduct.JRTG.productSort,
      //               "aliasId"
      //             ),
      //             ","
      //           ) != _.join(_.map(this.itemSelect, "aliasId"), ",")
      //         ) {
      //           this.$store.state.page.uploadProduct.JRTG.productBrand = [];
      //           this.$store.state.page.uploadProduct.JRTG.productModel = [];
      //         }
      //         if (this.$route.query.page == "uploadProduct") {
      //           this.selectJRTGProductSort(this.itemSelect);
      //         } else if (this.$route.query.page == "submitGroupDemand") {
      //           this.JRTGProductSort(this.itemSelect);
      //         }
      //         break;
      //       case "ZXTG":
      //         if (
      //           _.join(
      //             _.map(
      //               this.$store.state.page.uploadProduct.ZXTG.productSort,
      //               "aliasId"
      //             ),
      //             ","
      //           ) != _.join(_.map(this.itemSelect, "aliasId"), ",")
      //         ) {
      //           this.$store.state.page.uploadProduct.ZXTG.productBrand = [];
      //           this.$store.state.page.uploadProduct.ZXTG.productModel = [];
      //         }
      //         if (this.$route.query.page == "uploadProduct") {
      //           this.selectZXTGProductSort(this.itemSelect);
      //         } else if (this.$route.query.page == "submitGroupDemand") {
      //           this.ZXTGProductSort(this.itemSelect);
      //         }
      //         break;
      //     }
      //   }
      // } else {
      //   if (this.searchItemSelect.length == 0) {
      //     //将搜索框的值传给后台
      //     let that = this;
      //     flag = false;
      //     _getData(
      //       "/server/productLine!request.action",
      //       {
      //         method: "getProductLineByName",
      //         params: {
      //           name: this.tempLastSearchValue,
      //           type: "6",
      //           flag: "0"
      //         }
      //       },
      //       data => {
      //         console.log(data);
      //         this.searchItemSelect.push(data);
      //         switch (this.$route.query.groupTypeCode) {
      //           case "SBTG":
      //             if (
      //               _.join(
      //                 _.map(
      //                   this.$store.state.page.uploadProduct.SBTG.productSort,
      //                   "aliasId"
      //                 ),
      //                 ","
      //               ) != _.join(_.map(this.searchItemSelect, "aliasId"), ",")
      //             ) {
      //               that.$store.state.page.uploadProduct.SBTG.productBrand = [];
      //               that.$store.state.page.uploadProduct.SBTG.productModel = [];
      //             }
      //             if (that.$route.query.page == "uploadProduct") {
      //               that.selectSBTGProductSort(that.searchItemSelect);
      //             } else if (that.$route.query.page == "submitGroupDemand") {
      //               that.SBTGProductSort(that.searchItemSelect);
      //             }

      //             break;
      //           case "HCTG":
      //             if (
      //               _.join(
      //                 _.map(
      //                   that.$store.state.page.uploadProduct.HCTG.productSort,
      //                   "aliasId"
      //                 ),
      //                 ","
      //               ) != _.join(_.map(that.searchItemSelect, "aliasId"), ",")
      //             ) {
      //               that.$store.state.page.uploadProduct.HCTG.productBrand = [];
      //               that.$store.state.page.uploadProduct.HCTG.productModel = [];
      //             }
      //             if (that.$route.query.page == "uploadProduct") {
      //               that.selectHCTGProductSort(that.searchItemSelect);
      //             } else if (that.$route.query.page == "submitGroupDemand") {
      //               that.HCTGProductSort(that.searchItemSelect);
      //             }

      //             break;
      //           case "SHTG":
      //             if (
      //               _.join(
      //                 _.map(
      //                   that.$store.state.page.uploadProduct.SHTG.productSort,
      //                   "aliasId"
      //                 ),
      //                 ","
      //               ) != _.join(_.map(that.searchItemSelect, "aliasId"), ",")
      //             ) {
      //               that.$store.state.page.uploadProduct.SHTG.productBrand = [];
      //               that.$store.state.page.uploadProduct.SHTG.productModel = [];
      //             }
      //             if (that.$route.query.page == "uploadProduct") {
      //               this.selectSHTGProductSort(this.itemSelect);
      //             } else if (that.$route.query.page == "submitGroupDemand") {
      //               that.SHTGProductSort(that.searchItemSelect);
      //             }

      //             break;
      //           case "XXHTG":
      //             if (
      //               _.join(
      //                 _.map(
      //                   that.$store.state.page.uploadProduct.XXHTG.productSort,
      //                   "aliasId"
      //                 ),
      //                 ","
      //               ) != _.join(_.map(that.searchItemSelect, "aliasId"), ",")
      //             ) {
      //               that.$store.state.page.uploadProduct.XXHTG.productBrand = [];
      //               that.$store.state.page.uploadProduct.XXHTG.productModel = [];
      //             }
      //             if (that.$route.query.page == "uploadProduct") {
      //               that.selectXXHTGProductSort(that.searchItemSelect);
      //             } else if (that.$route.query.page == "submitGroupDemand") {
      //               that.XXHTGProductSort(that.searchItemSelect);
      //             }

      //             break;
      //           case "JRTG":
      //             if (
      //               _.join(
      //                 _.map(
      //                   that.$store.state.page.uploadProduct.JRTG.productSort,
      //                   "aliasId"
      //                 ),
      //                 ","
      //               ) != _.join(_.map(that.searchItemSelect, "aliasId"), ",")
      //             ) {
      //               that.$store.state.page.uploadProduct.JRTG.productBrand = [];
      //               that.$store.state.page.uploadProduct.JRTG.productModel = [];
      //             }
      //             if (that.$route.query.page == "uploadProduct") {
      //               that.selectJRTGProductSort(that.searchItemSelect);
      //             } else if (that.$route.query.page == "submitGroupDemand") {
      //               that.JRTGProductSort(that.searchItemSelect);
      //             }

      //             break;
      //           case "ZXTG":
      //             if (
      //               _.join(
      //                 _.map(
      //                   that.$store.state.page.uploadProduct.ZXTG.productSort,
      //                   "aliasId"
      //                 ),
      //                 ","
      //               ) != _.join(_.map(that.searchItemSelect, "aliasId"), ",")
      //             ) {
      //               that.$store.state.page.uploadProduct.ZXTG.productBrand = [];
      //               that.$store.state.page.uploadProduct.ZXTG.productModel = [];
      //             }
      //             if (that.$route.query.page == "uploadProduct") {
      //               that.selectZXTGProductSort(that.searchItemSelect);
      //             } else if (that.$route.query.page == "submitGroupDemand") {
      //               that.ZXTGProductSort(that.searchItemSelect);
      //             }

      //             break;
      //         }
      //         flag = true;
      //         if (flag) {
      //           this.$router.go(-1);
      //         }
      //       }
      //     );
      //   } else {
      //     switch (this.$route.query.groupTypeCode) {
      //       case "SBTG":
      //         if (
      //           _.join(
      //             _.map(
      //               this.$store.state.page.uploadProduct.SBTG.productSort,
      //               "aliasId"
      //             ),
      //             ","
      //           ) != _.join(_.map(this.searchItemSelect, "aliasId"), ",")
      //         ) {
      //           this.$store.state.page.uploadProduct.SBTG.productBrand = [];
      //           this.$store.state.page.uploadProduct.SBTG.productModel = [];
      //         }
      //         if (this.$route.query.page == "uploadProduct") {
      //           this.selectSBTGProductSort(this.searchItemSelect);
      //         } else if (this.$route.query.page == "submitGroupDemand") {
      //           this.SBTGProductSort(this.searchItemSelect);
      //         }

      //         break;
      //       case "HCTG":
      //         if (
      //           _.join(
      //             _.map(
      //               this.$store.state.page.uploadProduct.HCTG.productSort,
      //               "aliasId"
      //             ),
      //             ","
      //           ) != _.join(_.map(this.searchItemSelect, "aliasId"), ",")
      //         ) {
      //           this.$store.state.page.uploadProduct.HCTG.productBrand = [];
      //           this.$store.state.page.uploadProduct.HCTG.productModel = [];
      //         }
      //         if (this.$route.query.page == "uploadProduct") {
      //           this.selectHCTGProductSort(this.searchItemSelect);
      //         } else if (this.$route.query.page == "submitGroupDemand") {
      //           this.HCTGProductSort(this.searchItemSelect);
      //         }

      //         break;
      //       case "SHTG":
      //         if (
      //           _.join(
      //             _.map(
      //               this.$store.state.page.uploadProduct.SHTG.productSort,
      //               "aliasId"
      //             ),
      //             ","
      //           ) != _.join(_.map(this.searchItemSelect, "aliasId"), ",")
      //         ) {
      //           this.$store.state.page.uploadProduct.SHTG.productBrand = [];
      //           this.$store.state.page.uploadProduct.SHTG.productModel = [];
      //         }
      //         if (this.$route.query.page == "uploadProduct") {
      //           this.selectSHTGProductSort(this.searchItemSelect);
      //         } else if (this.$route.query.page == "submitGroupDemand") {
      //           this.SHTGProductSort(this.searchItemSelect);
      //         }

      //         break;
      //       case "XXHTG":
      //         if (
      //           _.join(
      //             _.map(
      //               this.$store.state.page.uploadProduct.XXHTG.productSort,
      //               "aliasId"
      //             ),
      //             ","
      //           ) != _.join(_.map(this.searchItemSelect, "aliasId"), ",")
      //         ) {
      //           this.$store.state.page.uploadProduct.XXHTG.productBrand = [];
      //           this.$store.state.page.uploadProduct.XXHTG.productModel = [];
      //         }
      //         if (this.$route.query.page == "uploadProduct") {
      //           this.selectXXHTGProductSort(this.searchItemSelect);
      //         } else if (this.$route.query.page == "submitGroupDemand") {
      //           this.XXHTGProductSort(this.searchItemSelect);
      //         }

      //         break;
      //       case "JRTG":
      //         if (
      //           _.join(
      //             _.map(
      //               this.$store.state.page.uploadProduct.JRTG.productSort,
      //               "aliasId"
      //             ),
      //             ","
      //           ) != _.join(_.map(this.searchItemSelect, "aliasId"), ",")
      //         ) {
      //           this.$store.state.page.uploadProduct.JRTG.productBrand = [];
      //           this.$store.state.page.uploadProduct.JRTG.productModel = [];
      //         }
      //         if (this.$route.query.page == "uploadProduct") {
      //           this.selectJRTGProductSort(this.searchItemSelect);
      //         } else if (this.$route.query.page == "submitGroupDemand") {
      //           this.JRTGProductSort(this.searchItemSelect);
      //         }

      //         break;
      //       case "ZXTG":
      //         if (
      //           _.join(
      //             _.map(
      //               this.$store.state.page.uploadProduct.ZXTG.productSort,
      //               "aliasId"
      //             ),
      //             ","
      //           ) != _.join(_.map(this.searchItemSelect, "aliasId"), ",")
      //         ) {
      //           this.$store.state.page.uploadProduct.ZXTG.productBrand = [];
      //           this.$store.state.page.uploadProduct.ZXTG.productModel = [];
      //         }
      //         if (this.$route.query.page == "uploadProduct") {
      //           this.selectZXTGProductSort(this.searchItemSelect);
      //         } else if (this.$route.query.page == "submitGroupDemand") {
      //           this.ZXTGProductSort(this.searchItemSelect);
      //         }

      //         break;
      //     }
      //   }
      // }
      // if (flag) {
      //   this.$router.go(-1);
      // }
    },
    switchFun(arr) {
      switch (this.$route.query.groupTypeCode) {
        case "SBTG":
          if (
            _.join(
              _.map(
                this.$store.state.page.uploadProduct.SBTG.productSort,
                "aliasId"
              ),
              ","
            ) != _.join(_.map(this.itemSelect, "aliasId"), ",")
          ) {
            this.$store.state.page.uploadProduct.SBTG.productBrand = [];
            this.$store.state.page.uploadProduct.SBTG.productModel = [];
          }
          if (this.$route.query.page == "uploadProduct") {
            this.selectSBTGProductSort(this.itemSelect);
          } else if (this.$route.query.page == "submitGroupDemand") {
            this.SBTGProductSort(this.itemSelect);
          }
          break;
        case "HCTG":
          if (
            _.join(
              _.map(
                this.$store.state.page.uploadProduct.HCTG.productSort,
                "aliasId"
              ),
              ","
            ) != _.join(_.map(this.itemSelect, "aliasId"), ",")
          ) {
            this.$store.state.page.uploadProduct.HCTG.productBrand = [];
            this.$store.state.page.uploadProduct.HCTG.productModel = [];
          }
          if (this.$route.query.page == "uploadProduct") {
            this.selectHCTGProductSort(this.itemSelect);
          } else if (this.$route.query.page == "submitGroupDemand") {
            this.HCTGProductSort(this.itemSelect);
          }

          break;
        case "SHTG":
          if (
            _.join(
              _.map(
                this.$store.state.page.uploadProduct.SHTG.productSort,
                "aliasId"
              ),
              ","
            ) != _.join(_.map(this.itemSelect, "aliasId"), ",")
          ) {
            this.$store.state.page.uploadProduct.SHTG.productBrand = [];
            this.$store.state.page.uploadProduct.SHTG.productModel = [];
          }
          if (this.$route.query.page == "uploadProduct") {
            this.selectSHTGProductSort(this.itemSelect);
          } else if (this.$route.query.page == "submitGroupDemand") {
            this.SHTGProductSort(this.itemSelect);
          }
          break;
        case "XXHTG":
          if (
            _.join(
              _.map(
                this.$store.state.page.uploadProduct.XXHTG.productSort,
                "aliasId"
              ),
              ","
            ) != _.join(_.map(this.itemSelect, "aliasId"), ",")
          ) {
            this.$store.state.page.uploadProduct.XXHTG.productBrand = [];
            this.$store.state.page.uploadProduct.XXHTG.productModel = [];
          }
          if (this.$route.query.page == "uploadProduct") {
            this.selectXXHTGProductSort(this.itemSelect);
          } else if (this.$route.query.page == "submitGroupDemand") {
            this.XXHTGProductSort(this.itemSelect);
          }
          break;
        case "JRTG":
          if (
            _.join(
              _.map(
                this.$store.state.page.uploadProduct.JRTG.productSort,
                "aliasId"
              ),
              ","
            ) != _.join(_.map(this.itemSelect, "aliasId"), ",")
          ) {
            this.$store.state.page.uploadProduct.JRTG.productBrand = [];
            this.$store.state.page.uploadProduct.JRTG.productModel = [];
          }
          if (this.$route.query.page == "uploadProduct") {
            this.selectJRTGProductSort(this.itemSelect);
          } else if (this.$route.query.page == "submitGroupDemand") {
            this.JRTGProductSort(this.itemSelect);
          }
          break;
        case "ZXTG":
          if (
            _.join(
              _.map(
                this.$store.state.page.uploadProduct.ZXTG.productSort,
                "aliasId"
              ),
              ","
            ) != _.join(_.map(this.itemSelect, "aliasId"), ",")
          ) {
            this.$store.state.page.uploadProduct.ZXTG.productBrand = [];
            this.$store.state.page.uploadProduct.ZXTG.productModel = [];
          }
          if (this.$route.query.page == "uploadProduct") {
            this.selectZXTGProductSort(this.itemSelect);
          } else if (this.$route.query.page == "submitGroupDemand") {
            this.ZXTGProductSort(this.itemSelect);
          }
          break;
      }
    },
    cancelStick(item) {
      console.log(item);
      this.stick_area_arr = _.without(this.stick_area_arr, item);
      this.general_area_arr.push(item);
      this.general_area_arr = _.orderBy(this.general_area_arr, ["num"], "desc");
      _getData(
        "/server_info/userProductLine!request.action",
        {
          method: "setTop",
          params: { id: item.id, flag: 0 }
        },
        data => {}
      );
    },
    Stick(item) {
      this.general_area_arr = _.without(this.general_area_arr, item);
      this.stick_area_arr.unshift(item);
      _getData(
        "/server_info/userProductLine!request.action",
        {
          method: "setTop",
          params: { id: item.id, flag: 1 }
        },
        data => {}
      );
    },
    checkedHandle(aliasId, item) {
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
          if (val.alisaId == aliasId) {
            return "active";
          }
        }
      }
    },
    getValue(value) {
      console.log(value);
      this.itemSelect = [];
      this.reqData(value);
      this.tempLastSearchValue = value;
    },
    reqData(name) {
      _getData(
        "/server_pro/groupPurchaseCompanyProduct!request.action",
        {
          method: "getProductLineListByGroupPurchaseType",
          params: {
            name: name,
            groupPurchaseId: this.$route.query.groupPurchaseTypeId
          }
        },
        data => {
          console.log(data);
          if (!name) {
            this.stick_area_arr = data.productLineList;
            this.general_area_arr = data.wzdProductLineList;
          } else {
            this.stick_area_arr = [];
            this.general_area_arr = [];
            this.search_area_arr = _.concat(
              data.productLineList,
              data.aliasList
            );
          }
        }
      );
    }
  },
  mounted() {
    this.reqData();
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
    .Stick_container {
      @include box_shadow_style;
      margin-top: 10px;
      height: calc(100% - 46px);
      .stick_area,
      .general_area,
      .search_area {
        background: #fff;
        border-radius: 5px;
        li {
          height: 46px;
          display: flex;
          align-items: center;
          margin-left: 13px;
          padding-right: 8px;
          border-bottom: 0.5px solid #f6f6f6;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #333333;
          display: flex;
          justify-content: space-between;
          &.active {
            > span:first-child {
              color: #019ddd;
            }
          }
          &:active {
            background: rgba($color: #999, $alpha: 0.3);
          }
        }
      }
      .stick_area {
        background: rgba(126, 211, 33, 0.04);
        li > span:last-child {
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #999999;
          display: flex;
          height: 30px;
          align-items: center;
          border-radius: 7px;
          padding: 0 5px;
          /*  &:active {
                                                                                                                                                                                                                                                                    background: rgba($color: #999, $alpha: 0.3);
                                                                                                                                                                                                                                                                } */
        }
      }
      .general_area {
        li > span:last-child {
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #019ddd;
          display: flex;
          height: 30px;
          align-items: center;
          border-radius: 7px;
          padding: 0 5px;
          /* &:active {
                                                                                                                                                                                                                                                                    background: rgba($color: #999, $alpha: 0.3);
                                                                                                                                                                                                                                                                } */
        }
      }
    }
  }
}
</style>
