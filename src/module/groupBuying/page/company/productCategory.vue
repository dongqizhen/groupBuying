<template>
    <div class="container productCategory">
        <Header :title="this.$route.name">
            <span slot="explain" class="enter" @click="clickSure">确定</span>
        </Header>
        <div class="content">
            <search placeholder="请输入产品分类" v-on:inputValue="getValue"></search>
            <div class="Stick_container">
                <ul class="stick_area">
                    <li v-for="(item,index) in stick_area_arr" :key='index' :class="activeClass(item.productLineId)" @click="checkedHandle(item.productLineId,item)">
                        <span>{{item.name}}</span>
                        <span @click.stop="cancelStick(item)">取消置顶</span>
                    </li>
                </ul>
                <ul class="general_area">
                    <li v-for="(item,index) in general_area_arr" :key='index' :class="activeClass(item.productLineId)"  @click="checkedHandle(item.productLineId,item)">
                        <span>{{item.name}}</span>
                        <span @click.stop="Stick(item)">置顶</span>
                    </li>
                </ul>
                <ul class="search_area">
                    <li v-for="(item,index) in search_area_arr" :key='index' :class="addClass(item.alisaId)" @click="searchCheckedHandle(item.alisaId,item)"><span>{{item.name}}</span></li>
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
    ...mapMutations(["setTransition", "selectProductSort"]),
    clickSure() {
      this.setTransition("turn-off");
      console.log(this.tempLastSearchValue);
      if (this.tempLastSearchValue == "") {
        if (this.itemSelect.length == 0) {
          Toast("请选择或输入产品分类");
          return;
        } else {
          this.selectProductSort(this.itemSelect);
        }
      } else {
        if (this.searchItemSelect.length == 0) {
          //将搜索框的值传给后台
        } else {
          this.selectProductSort(this.searchItemSelect);
        }
      }
      this.$router.go(-1);
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
    checkedHandle(productLineId, item) {
      if (this.itemSelect.length < 1) {
        this.itemSelect.push(item);
      } else {
        if (
          _.find(this.itemSelect, function(o) {
            return o.productLineId == productLineId;
          }) == item
        ) {
          this.itemSelect.splice(0, 1);
        } else {
          this.itemSelect.splice(0, 1, item);
        }
      }
    },
    searchCheckedHandle(alisaId, item) {
      if (this.searchItemSelect.length < 1) {
        this.searchItemSelect.push(item);
      } else {
        if (
          _.find(this.searchItemSelect, function(o) {
            return o.alisaId == alisaId;
          }) == item
        ) {
          this.searchItemSelect.splice(0, 1);
        } else {
          this.searchItemSelect.splice(0, 1, item);
        }
      }
    },
    activeClass(productLineId) {
      if (this.itemSelect) {
        for (const val of this.itemSelect) {
          if (val.productLineId == productLineId) {
            return "active";
          }
        }
      }
    },
    addClass(alisaId) {
      if (this.searchItemSelect) {
        for (const val of this.searchItemSelect) {
          if (val.alisaId == alisaId) {
            return "active";
          }
        }
      }
    },
    getValue(value) {
      console.log(value);
      this.reqData(value, "520");
      this.searchItemSelect = [];
      this.tempLastSearchValue = value;
    },
    reqData(name, groupId) {
      _getData(
        "/server_pro/groupPurchaseCompanyProduct!request.action",
        {
          method: "getProductLineListByGroupPurchaseType",
          params: { name: name, groupPurchaseId: groupId }
        },
        data => {
          console.log(data);
          if (name == "") {
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
    this.reqData("", "520");
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
