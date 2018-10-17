<template>
    <div class="container">
        <Header :title="title"></Header>
        <div class="content">
            <scroll-tab :DATA_MAP="DATA_MAP" :selectedId="selectedId" v-on:selectLabel="selectLabel">
                <h2 slot="title" class="title">
                    <span>品牌</span>
                    <span>团购数量({{numberUnit}})</span>
                    <span v-if="isRate">市场保有率</span>
                </h2>
                <ul slot="right-panel-container">
                    <router-link tag="li" :to="{ path: 'groupInventory', query: { groupPurchaseId:groupPurchaseId,groupPurchaseTypeId:groupPurchaseTypeId,productLineId:selectedId,brandId:val.id}}" v-for="(val, index) in scrollData" :key="index" @click.native="setTransition('turn-on')">
                        <span>{{val.name}}</span>
                        <span>{{val.num}}</span>
                        <span v-if="isRate">{{val.markRate}}</span>
                    </router-link>
                </ul>
                <h2 slot="count" class="title countNum">
                    <span>总计</span>
                    <span>{{totalNum}}</span>
                    <span v-if="isRate"></span>
                </h2>
            </scroll-tab>
        </div>
    </div>
</template>

<script>
import Header from "../../components/header/header";
import scrollTab from "../../components/scrollTab/scrollTab";
import { mapMutations } from "vuex";
import { _getData } from "../../service/getData";
import _ from "lodash";
export default {
  data() {
    return {
      scrollData: [],
      DATA_MAP: [],
      selectedLabel: "",
      selectedId: "",
      totalNum: "",
      title: "",
      groupPurchaseId: "",
      groupPurchaseTypeId: "",
      numberUnit: "台",
      isRate: ""
    };
  },
  activated() {
    this.title = this.$route.query.groupPurchaseTypeName + "分类";
    this.groupPurchaseTypeId = this.$route.query.groupPurchaseTypeId;
    this.groupPurchaseId = this.$route.query.groupPurchaseId;
    if (
      this.$route.query.groupPurchaseTypeName == "设备团购" ||
      this.$route.query.groupPurchaseTypeName == "售后团购"
    ) {
      this.numberUnit = "台";
      this.isRate = true;
    } else {
      this.numberUnit = "单";
      this.isRate = false;
    }
    _getData(
      "/server_pro/groupPurchaseCompanyProduct!request.action",
      {
        method: "getProductNumByGroupPurchaseType",
        params: {
          groupPurchaseTypeId: this.$route.query.groupPurchaseTypeId,
          groupPurchaseId: this.$route.query.groupPurchaseId
        }
      },
      data => {
        console.log(data);
        this.DATA_MAP = data.list;
        if (this.$route.query.productLineId) {
          var selectTabArr = _.find(data.list, o => {
            return o.id == this.$route.query.productLineId;
          });
          this.selectedLabel = selectTabArr.name;
          this.selectedId = selectTabArr.id;
          this.totalNum = selectTabArr.totalNum;
        } else {
          this.selectedLabel = data.list[0].name;
          this.selectedId = data.list[0].id;
          this.totalNum = data.list[0].totalNum;
        }
      }
    );
  },
  methods: {
    ...mapMutations(["setTransition"]),
    selectLabel(label) {
      var selectValue = _.find(this.DATA_MAP, o => {
        return o.name === label;
      });
      console.log(selectValue);
      this.$router.replace({
        path: this.$route.path,
        query: {
          groupPurchaseTypeId: this.$route.query.groupPurchaseTypeId,
          groupPurchaseId: this.$route.query.groupPurchaseId,
          productLineId: selectValue.id,
          groupPurchaseTypeName: this.$route.query.groupPurchaseTypeName
        }
      });
      this.selectedId = selectValue.id;
      this.scrollData = selectValue.brandList;
      this.totalNum = selectValue.totalNum;
      console.log(this.selectedId);
    }
  },
  components: {
    Header,
    scrollTab
  },
  watch: {
    selectedLabel() {},
    DATA_MAP() {
      console.log(this.DATA_MAP);
      console.log(this.selectedLabel);
      this.scrollData = _.find(this.DATA_MAP, o => {
        return o.name === this.selectedLabel;
      }).brandList;
    },
    totalNum() {}
  },
  deactivated() {
    // this.$destroy();
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../../static/scss/_commonScss";
.container {
  @include basic_container_style;
  .content {
    /deep/ .scrollTab {
      .right-panel {
        height: 100%;
        flex: 1;
        .title {
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: $border_style;

          &.countNum {
            border-bottom: none;
            border-top: $border_style;
            span {
              font-family: PingFangSC-Medium;
              font-size: 14px;
              color: #666666;
            }
          }

          span {
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #999;
            flex: 1;
            text-align: center;
          }
        }
        .cube-scroll-wrapper {
          height: auto;
          max-height: calc(100% - 42px);
          .cube-scroll-content {
            min-height: calc(100% +1px);
          }
        }
        li {
          height: 40px;
          display: flex;
          align-items: center;
          background-color: #fff;
          justify-content: center;
          font-size: 14px;
          color: #666;
          border-bottom: $border_style;

          &:last-child {
            border-bottom: none;
          }
          span {
            flex: 1;
            text-align: center;
          }
          &:active {
            background: rgba($color: #999, $alpha: 0.3);
          }
        }
      }
    }
  }
}
</style>
