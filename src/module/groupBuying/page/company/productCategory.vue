<template>
    <div class="container productCategory">
        <Header :title="this.$route.name">
            <span slot="explain" class="enter" @click="clickLink">确定</span>
        </Header>
        <div class="content">
            <search placeholder="请输入产品分类" v-on:valueChange="prentValueChange"></search>
            <div class="Stick_container">
                <ul class="stick_area">
                    <li v-for="(item,index) in stick_area_arr" :key='index' :class="item.id == checkedId?'active':''" @click="checkedHandle(item.id,item)">
                        <span>{{item.name}}</span>
                        <span @click.stop="cancelStick(item)">取消置顶</span>
                    </li>
                </ul>
                <ul class="general_area">
                    <li v-for="(item,index) in general_area_arr" :key='index' :class="item.id == checkedId?'active':''" @click="checkedHandle(item.id,item)">
                        <span>{{item.name}}</span>
                        <span @click.stop="Stick(item)">置顶</span>
                    </li>
                </ul>
                <ul class="search_area">
                    <li v-for="(item,index) in search_area_arr" :key='index' :class="index == checkedId?'active':''" @click="checkedHandle(index,item)"><span>{{item.name}}</span></li>
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
export default {
  data() {
    return {
      tempSelectedProductSort: {},
      selectedProductSort: {},
      stick_area_arr: [],
      general_area_arr: [],
      search_area_arr: [],
      value: "",
      checkedId: null
    };
  },
  components: {
    Header,
    search
  },
  methods: {
    ...mapMutations(["setTransition", "selectProductSort"]),
    clickLink() {
      this.setTransition("turn-off");
      this.$router.go(-1);
      this.selectedProductSort = this.tempSelectedProductSort;
      this.selectProductSort(this.selectedProductSort);
    },
    cancelStick(item) {
      this.stick_area_arr = _.without(this.stick_area_arr, item);
      this.general_area_arr.push(item);
      this.general_area_arr = _.orderBy(this.general_area_arr, ["num"], "desc");
    },
    Stick(item) {
      this.general_area_arr = _.without(this.general_area_arr, item);
      this.stick_area_arr.unshift(item);
    },
    prentValueChange(value) {
      if (typeof value == "string") {
        this.general_area_arr = [];
        this.stick_area_arr = [];
        this.tempSelectedProductSort = { name: value, productLineId: value };
      } else {
        if (Array.isArray(value)) {
          this.general_area_arr = [];
          this.stick_area_arr = [];
          this.search_area_arr = value;
        } else {
          console.log(Array.isArray(value));
          this.general_area_arr = value.general_area_arr;
          this.stick_area_arr = value.stick_area_arr;
          this.search_area_arr = [];
        }
      }
    },
    checkedHandle(id, item) {
      this.checkedId = id;
      this.tempSelectedProductSort = item;
    }
  },
  created() {
    _getData(
      "/server_pro/groupPurchaseCompanyProduct!request.action",
      {
        method: "getProductLineListByGroupPurchaseType",
        params: { name: "", groupPurchaseId: "520" }
      },
      data => {
        console.log(data);
        this.stick_area_arr = data.productLineList;
        this.general_area_arr = data.wzdProductLineList;
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
      .enter {
        padding-right: 13px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #333333;
      }
    }
  }
  .content {
    padding: 13px;
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
