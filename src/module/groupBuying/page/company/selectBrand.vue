<template>
    <div class="container selectBrand">
        <Header :title="this.$route.name">
            <span slot="explain" class="enter" @click="clickLink">确定</span>
        </Header>
        <div class="content">
            <search placeholder="请输入品牌" v-on:valueChange="prentValueChange"></search>
            <cube-index-list :data="cityData">
              <cube-index-list-group v-for="(group, index) in cityData" :key="index" :group="group">
                <cube-index-list-item v-for="(item, index) in group.items" :key="index" :item="item" @select="selectItem">
                  <div :class="['custom-item',current==item.id?'active':'']">{{item.name}} <span v-if="item.brandLabel">{{item.brandLabel}}</span></div>
                </cube-index-list-item>
              </cube-index-list-group>
            </cube-index-list>
        </div>
    </div>
</template>

<script>
import Header from "../../components/header/header";
import search from "../../components/search/search";
import { _getData } from "../../service/getData";
import { mapMutations } from "vuex";
const cityData = [];
export default {
  data() {
    return {
      title: "Current City: BEIJING",
      cityData: cityData,
      current: null,
      tempProductBrand: {},
      productBrand: {}
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
      this.$router.go(-1);
      this.productBrand = this.tempProductBrand;
      this.selectProductBrand(this.productBrand);
    },
    selectItem(item) {
      console.log(item.name);
      this.current = item.id;
      this.tempProductBrand = item;
    },
    prentValueChange(val) {
      console.log(val);
      if (typeof val == "string") {
        this.cityData = [];
        this.tempProductBrand = { id: val, name: val };
      } else {
        this.cityData = val;
      }
    }
  },
  mounted() {
    _getData(
      "/server_pro/groupPurchaseCompanyProduct!request.action",
      {
        method: "getBrandListByGroupPurchaseType",
        params: { name: "", productLineId: "264" }
      },
      data => {
        console.log(data);
        this.cityData = data.brandList;
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
