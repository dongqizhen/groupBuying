<template>
    <div class="container selectModel">
        <Header :title="this.$route.name">
            <span slot="explain" class="enter" @click="clickSure">确定</span>
        </Header>
        <div class="content">
            <div class="selected" v-if="Multiple">
                <h2>已选型号:</h2>
                <ul>
                    <li v-for="item in itemSelect" :key="item.id" :class="checked?'disabled':''">
                        <span>{{item.name}}</span>
                        <i @click="deleteItem(item)"></i>
                    </li>
                </ul>
            </div>
            <cube-checkbox v-model="checked" v-if="Multiple">
                不了解产品型号，请厂家根据我院临床需求推荐
            </cube-checkbox>
            <search placeholder="请输入型号" v-on:saveValue="saveModel" v-on:inputValue="selectModel" :disabled="checked"></search>
            <div class="Model_container">
                <h2>请选择：<span>(企业提供的型号清单)</span></h2>
                <cube-index-list :data="modelData">
                    <cube-index-list-group v-for="(group, index) in modelData" :key="index" :group="group">
                        <cube-index-list-item v-for="(item, index) in group.items" :key="index" :item="item" @select="selectItem" :class="checked?'disabled':''">
                            <div class="custom-item" :class="addClass(item.id)">{{item.name}}</div>
                        </cube-index-list-item>
                    </cube-index-list-group>
                </cube-index-list>
            </div>
        </div>
    </div>
</template>
<script>
import Header from "../../components/header/header";
import search from "../../components/search/search";
import { _getData } from "../../service/getData.js";
import _ from "lodash";
import { mapMutations } from "vuex";
import { Toast } from "vant";
const modelData = [];
export default {
  data() {
    return {
      tempLastSearchValue: "",
      tempProductModel: {},
      productModel: { id: "", name: "" },
      checked: false,
      modelData,
      itemSelect: [],
      groupTypeCode: "",
      page: ""
    };
  },
  components: {
    Header,
    search
  },
  props: ["Multiple"],
  methods: {
    ...mapMutations([
      "setTransition",
      "selectSBTGProductModel",
      "selectHCTGProductModel",
      "selectSHTGProductModel",
      "selectXXHTGProductModel",
      "selectJRTGProductModel",
      "selectZXTGProductModel"
    ]),
    clickSure() {
      this.setTransition("turn-off");
      if (this.itemSelect.length == 0) {
        if (this.tempLastSearchValue != "") {
          this.itemSelect.push({ name: this.tempLastSearchValue });
        }
      }
      switch (this.groupTypeCode) {
        case "SBTG":
          if (this.page == "uploadProduct") {
            this.selectSBTGProductModel(this.itemSelect);
          } else if (this.page == "submitGroupDemand") {
            this.SBTGProductModel(this.itemSelect);
          }
          break;
        case "HCTG":
          if (this.page == "uploadProduct") {
            this.selectHCTGProductModel(this.itemSelect);
          } else if (this.page == "submitGroupDemand") {
            this.HCTGProductModel(this.itemSelect);
          }
          break;
        case "SHTG":
          if (this.page == "uploadProduct") {
            this.selectSHTGProductModel(this.itemSelect);
          } else if (this.page == "submitGroupDemand") {
            this.SHTGProductModel(this.itemSelect);
          }
          break;
        case "XXHTG":
          if (this.page == "uploadProduct") {
            this.selectXXHTGProductModel(this.itemSelect);
          } else if (this.page == "submitGroupDemand") {
            this.XXHTGProductModel(this.itemSelect);
          }
          break;
        case "JRTG":
          if (this.page == "uploadProduct") {
            this.selectJRTGProductModel(this.itemSelect);
          } else if (this.page == "submitGroupDemand") {
            this.JRTGProductModel(this.itemSelect);
          }
          break;
        case "ZXTG":
          if (this.page == "uploadProduct") {
            this.selectZXTGProductModel(this.itemSelect);
          } else if (this.page == "submitGroupDemand") {
            this.ZXTGProductModel(this.itemSelect);
          }
          break;
      }
      this.$router.go(-1);
    },
    selectItem(item) {
      let changeItem = _.find(this.itemSelect, function(o) {
        return o.id == item.id;
      });
      if (this.Multiple) {
        if (this.itemSelect.length < 3) {
          if (
            _.without(this.itemSelect, changeItem).length ==
            this.itemSelect.length
          ) {
            this.itemSelect.push(item);
          } else {
            this.itemSelect = _.without(this.itemSelect, changeItem);
          }
        } else if (this.itemSelect.length == 3) {
          this.itemSelect = _.without(this.itemSelect, changeItem);
          if (this.itemSelect.length == 3) {
            Toast("最多选择三个型号");
          }
        }
      } else {
        if (this.itemSelect.length < 1) {
          this.itemSelect.push(item);
        } else {
          if (changeItem) {
            this.itemSelect = _.without(this.itemSelect, changeItem);
          } else {
            this.itemSelect.splice(0, 1, item);
          }
        }
      }
    },
    addClass(id) {
      if (this.itemSelect) {
        for (const val of this.itemSelect) {
          if (val.id == id) {
            return "active";
          }
        }
      }
    },
    deleteItem(item) {
      this.itemSelect = _.without(this.itemSelect, item);
    },
    selectModel(name) {
      this.itemSelect = [];
      this.reqData(name);
      this.tempLastSearchValue = name;
    },
    saveModel(name) {
      console.log(name);
      let modelListCommon, itemSelectCommon;
      itemSelectCommon = _.find(this.itemSelect, function(o) {
        return o.name.toUpperCase() === name.toUpperCase();
      });
      if (this.modelData.length > 0) {
        modelListCommon = _.find(this.modelData[0].items, function(o) {
          return o.name.toUpperCase() === name.toUpperCase();
        });
      }
      if (this.itemSelect.length === 3) {
        Toast("最多选择三个型号");
      } else {
        if (!itemSelectCommon && !modelListCommon) {
          this.itemSelect.push({ name: name });
        } else {
          if (!itemSelectCommon && modelListCommon) {
            this.itemSelect.push(modelListCommon);
          } else if (itemSelectCommon) {
          }
        }
      }
    },
    reqData(name) {
      _getData(
        "/server_pro/groupPurchaseCompanyProduct!request.action",
        {
          method: "getModelListByGroupPurchaseType",
          params: {
            name: name,
            brandId: this.$route.query.brandId,
            productLineId: this.$route.query.productLineId
          }
        },
        data => {
          console.log(data);
          this.modelData = data.modelList;
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
  },
  watch: {
    itemSelect() {
      if (this.itemSelect.length > 3) {
        Toast("最多选择三个型号");
      }
    }
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
    .selected {
      //@include box_shadow_style;
      height: 77px;
      background: #ffffff;
      border-radius: 5px;
      h2 {
        height: 36px;
        padding-left: 13px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #666666;
        display: flex;
        align-items: center;
      }
      ul {
        display: flex;
        justify-content: flex-start;
        padding: 0 13px;
        li {
          height: 30px;
          border: 0.5px solid #999999;
          border-radius: 7px;
          display: flex;
          align-items: center;
          font-family: PingFangSC-Regular;
          font-size: 13px;
          color: #666666;
          width: 104px;
          padding-left: 10px;
          margin-right: 5px;
          &.disabled {
            color: #cccccc;
            border-color: #ccc;
            > i {
              pointer-events: none;
            }
          }
          > span {
            //display: flex;
            width: 72px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          i {
            display: flex;
            width: 22px;
            height: 22px;
            border-radius: 22px;
            background: url("/static/images/del.png") no-repeat center center;
            background-size: 12px 12px;
            //padding-left: 14.5px;
            justify-content: center;
            &:active {
              background-color: rgba($color: #999, $alpha: 0.3);
            }
          }
        }
      }
    }
    /deep/ .cube-checkbox {
      height: 46px;
      padding: 0 13px;
      //@include box_shadow_style;
      background: #ffffff;
      border-radius: 5px;
      margin: 10px 0;
      &.cube-checkbox_checked {
        .cube-checkbox-ui {
          i {
            color: #019ddd;
          }
        }
      }

      .cube-checkbox-label {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #666666;
      }
    }
    .Model_container {
      margin-top: 10px;
      @include box_shadow_style;
      height: calc(100% - 87px - 56px - 46px);
      padding-top: 0.1px;
      > h2 {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #cccccc;
        height: 40px;
        display: flex;
        align-items: center;
        padding-left: 13px;
        border-bottom: 0.5px solid #f6f6f6;
        justify-content: flex-start;
        span {
          font-size: 12px;
          display: flex;
          justify-content: flex-start;
        }
      }
      /deep/ .cube-index-list {
        height: calc(100% - 40px);
        border-radius: 5px;
        .cube-index-list-fixed {
          display: none;
        }
        .cube-index-list-content {
          > ul {
            .cube-index-list-group {
              h2 {
                display: none;
              }
              > ul {
                li {
                  height: 46px;
                  border-bottom: 0.5px solid #f6f6f6;
                  padding-left: 0;
                  margin-left: 13px;
                  display: flex;
                  align-items: center;
                  > div {
                    padding-left: 0;
                    font-family: PingFangSC-Regular;
                    font-size: 14px;
                    color: #333333;
                    &.active {
                      color: #019ddd;
                    }
                  }
                  &.disabled {
                    pointer-events: none;
                    > div {
                      color: #cccccc;
                    }
                  }
                }
              }
            }
          }
        }
        .cube-index-list-nav {
          ul {
            li {
              font-family: PingFangSC-Medium;
              font-size: 11px;
              color: #999999;
              padding-right: 4px;
              &.active {
                color: #019ddd;
              }
            }
          }
        }
      }
    }
  }
}
</style>
