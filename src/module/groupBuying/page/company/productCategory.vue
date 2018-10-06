<template>
    <div class="container productCategory">
        <Header title="选择分类">
            <span slot="explain" class="enter" @click="clickSure">确定</span>
        </Header>
        <div class="content">
            <search placeholder="请输入分类" v-on:inputValue="getValue"></search>
            <div class="stick_box">
              <div class="box">
              <div class="Stick_container">
                <ul class="stick_area">
                    <li v-for="(item,index) in stick_area_arr" :key='index' :class="activeClass(item.aliasId)" @click="checkedHandle(item.aliasId,item)">
                        <span>{{item.productLineName}}</span>
                        <span @click.stop="cancelStick(item)">取消置顶</span>
                    </li>
                </ul>
                <ul class="general_area">
                    <li v-for="(item,index) in general_area_arr" :key='index' :class="activeClass(item.aliasId)"  @click="checkedHandle(item.aliasId,item)">
                        <span>{{item.productLineName}}</span>
                        <span @click.stop="Stick(item)">置顶</span>
                    </li>
                </ul>
                <ul class="search_area">
                    <li v-for="(item,index) in search_area_arr" :key='index' :class="activeClass(item.aliasId)" @click="checkedHandle(item.aliasId,item)">
                        <span>{{item.productLineName}}</span>
                    </li>
                </ul>
              </div>
            </div>
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
      var flag = true;
      console.log(this.itemSelect);
      if (this.tempLastSearchValue == "") {
        if (this.itemSelect.length == 0) {
          Toast("请选择或输入分类");
          return;
        } else {
          if (this.itemSelect[0].aliasId == "") {
            Toast("请选择或输入分类");
            return;
          }
        }
      } else {
        if (this.itemSelect.length == 0) {
          flag = false;
          _getData(
            "/server/productLine!request.action",
            {
              method: "getProductLineByName",
              params: {
                name: this.tempLastSearchValue,
                type: "6",
                flag: "0"
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
            this.$store.state.page[this.page][this.groupTypeCode].productSort,
            "aliasId"
          ),
          ","
        ) != _.join(_.map(this.itemSelect, "aliasId"), ",")
      ) {
        this.$store.state.page[this.page][this.groupTypeCode].productBrand = [
          {
            aliasId: "",
            aliasName: "",
            brandId: "",
            brandLabel: "",
            brandName: ""
          }
        ];
        this.$store.state.page[this.page][this.groupTypeCode].productModel = [];
      }
      switch (this.groupTypeCode) {
        case "SBTG":
          if (this.page == "uploadProduct") {
            this.selectSBTGProductSort(this.itemSelect);
          } else if (this.page == "submitGroupDemand") {
            this.SBTGProductSort(this.itemSelect);
          }
          break;
        case "HCTG":
          if (this.page == "uploadProduct") {
            this.selectHCTGProductSort(this.itemSelect);
          } else if (this.page == "submitGroupDemand") {
            this.HCTGProductSort(this.itemSelect);
          }
          break;
        case "SHTG":
          if (this.page == "uploadProduct") {
            this.selectSHTGProductSort(this.itemSelect);
          } else if (this.page == "submitGroupDemand") {
            this.SHTGProductSort(this.itemSelect);
          }
          break;
        case "XXHTG":
          if (this.page == "uploadProduct") {
            this.selectXXHTGProductSort(this.itemSelect);
          } else if (this.page == "submitGroupDemand") {
            this.XXHTGProductSort(this.itemSelect);
          }
          break;
        case "JRTG":
          if (this.page == "uploadProduct") {
            this.selectJRTGProductSort(this.itemSelect);
          } else if (this.page == "submitGroupDemand") {
            this.JRTGProductSort(this.itemSelect);
          }
          break;
        case "ZXTG":
          if (this.page == "uploadProduct") {
            this.selectZXTGProductSort(this.itemSelect);
          } else if (this.page == "submitGroupDemand") {
            this.ZXTGProductSort(this.itemSelect);
          }
          break;
      }
      if (flag) {
        this.$router.go(-1);
      }
    },
    cancelStick(item) {
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
          if (val.aliasId == aliasId) {
            return "active";
          }
        }
      }
    },
    getValue(value) {
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
    this.groupTypeCode = this.$route.query.groupTypeCode;
    this.page = this.$route.query.page;
    this.reqData();
    if (this.page == "uploadProduct") {
      this.itemSelect = this.$route.query.vuexSelectValue;
    }
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
    .stick_box {
      @include box_shadow_style;
      margin-top: 10px;
      height: calc(100% - 46px);
      overflow: hidden;
      .box {
        height: 100%;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
      }
    }
    .Stick_container {
      min-height: calc(100%+1px);
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
