<template>
    <div class="container selectBrand">
        <Header :title="this.$route.name">
            <span slot="explain" class="enter" @click="clickLink">确定</span>
        </Header>
        <div class="content">
            <search placeholder="请输入品牌" v-on:inputValue="selectBrand"></search>
            <cube-index-list :data="brandListData" v-if="this.brandListData.length!=0">
              <cube-index-list-group v-for="(group, index) in brandListData" :key="index" :group="group">
                <cube-index-list-item v-for="(item, index) in group.items" :key="index" :item="item" @select="selectItem(item.brandId, item)">
                  <div :class="['custom-item',activeClass(item.brandId)]">{{item.name}} <span v-if="item.brandLabel">{{item.brandLabel}}</span></div>
                </cube-index-list-item>
              </cube-index-list-group>
            </cube-index-list>
           <ul class="search_area">
              <li v-for="(item,index) in search_area_arr" :key='index' :class="addClass(item.alisaBrandId)" @click="searchCheckedHandle(item.alisaBrandId,item)"><span>{{item.name}}</span><span class="label" v-if="item.brandLabel">{{item.brandLabel}}</span></li>
          </ul>
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
      searchItemSelect: [],
      itemSelect: []
    };
  },
  components: {
    Header,
    search
  },
  methods: {
    ...mapMutations(["setTransition", "selectProductBrand"]),
    clickLink() {
      this.setTransition("turn-off");
      console.log(this.tempLastSearchValue);
      if (this.tempLastSearchValue == "") {
        if (this.itemSelect.length == 0) {
          Toast("请选择或输入品牌");
          return;
        } else {
          this.selectProductBrand(this.itemSelect[0]);
        }
      } else {
        if (this.searchItemSelect.length == 0) {
          //将搜索框的值传给后台
        } else {
          this.selectProductBrand(this.searchItemSelect[0]);
        }
      }
      this.$router.go(-1);
    },
    selectItem(brandId, item) {
      if (this.itemSelect.length < 1) {
        this.itemSelect.push(item);
      } else {
        if (
          _.find(this.itemSelect, function(o) {
            return o.brandId == brandId;
          }) == item
        ) {
          this.itemSelect.splice(0, 1);
        } else {
          this.itemSelect.splice(0, 1, item);
        }
      }
    },
    activeClass(brandId) {
      if (this.itemSelect) {
        for (const val of this.itemSelect) {
          if (val.brandId == brandId) {
            return "active";
          }
        }
      }
    },
    searchCheckedHandle(alisaBrandId, item) {
      if (this.searchItemSelect.length < 1) {
        this.searchItemSelect.push(item);
      } else {
        if (
          _.find(this.searchItemSelect, function(o) {
            return o.alisaBrandId == alisaBrandId;
          }) == item
        ) {
          this.searchItemSelect.splice(0, 1);
        } else {
          this.searchItemSelect.splice(0, 1, item);
        }
      }
    },
    addClass(alisaBrandId) {
      if (this.searchItemSelect.length != 0) {
        for (const val of this.searchItemSelect) {
          if (val.alisaBrandId == alisaBrandId) {
            return "active";
          }
        }
      }
    },
    selectBrand(val) {
      this.reqData(val);
      this.tempLastSearchValue = val;
    },
    reqData(name) {
      _getData(
        "/server_pro/groupPurchaseCompanyProduct!request.action",
        {
          method: "getBrandListByGroupPurchaseType",
          params: { name: name, productLineId: "264" }
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
    this.reqData();
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
    .search_area {
      margin-top: 10px;
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
