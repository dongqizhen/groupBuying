<template>
    <div class="container">
        <Header title="团购分类"></Header>
        <div class="content">
            <scroll-tab :DATA_MAP="DATA_MAP" v-on:selectLabel="selectLabel">
                <h2 slot="title" class="title">
                    <span>品牌</span>
                    <span>团购数量(台)</span>
                    <span>市场保有率</span>
                </h2>
                <ul slot="right-panel-container">
                    <router-link tag="li" :to="{ path: 'groupInventory', query: { groupInventoryID: val.id }}" v-for="(val, index) in scrollData" :key="index" @click.native="setTransition('turn-on')">
                        <span>{{val.name}}</span>
                        <span>{{val.num}}</span>
                        <span>{{val.markRate}}</span>
                    </router-link>
                </ul>
                <h2 slot="count" class="title countNum">
                    <span>总计</span>
                    <span>22</span>
                    <span></span>
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
const DATA_MAP = {};
export default {
  data() {
    return {
      scrollData: [],
      DATA_MAP,
      selectedLabel: "",
      selectedId: ""
    };
  },
  created() {
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
        this.selectedLabel = data.list[0].name;
        // this.selectedId = data.list[0].id;
      }
    );
  },
  methods: {
    ...mapMutations(["setTransition"]),
    selectLabel(label) {
      this.scrollData = _.find(this.DATA_MAP, o => {
        return o.name === label;
      }).brandList;
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
    }
  },
  activated() {},
  deactivated() {}
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
          height: calc(100% - 42px);
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
