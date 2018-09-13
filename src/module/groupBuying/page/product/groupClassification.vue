<template>
  <div class="container">
    <Header :title="this.$route.name"></Header>
    <div class="content">
      <scroll-tab :DATA_MAP="DATA_MAP" v-on:selectLabel="selectLabel">
        <h2 slot="title" class="title">
          <span>品牌</span>
          <span>团购数量(台)</span>
          <span>市场保有率</span>
        </h2>
        <ul slot="right-panel-container">
          <router-link tag="li" :to="{ path: 'groupInventory', query: { groupInventoryID: val.id }}" v-for="(val, index) in scrollData" :key="index">
            <span>{{val.brand}}</span>
            <span>{{val.num}}</span>
            <span>{{val.rate}}</span>
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

<script type="text/ecmascript-6">
  import Header from "../../components/header/header";
  import scrollTab from "../../components/scrollTab/scrollTab";
  const DATA_MAP = {
      CT类: {
          id: 1,
          count: 22,
          dataList: [
              { id: 1, brand: "托人", num: "8", rate: "35%" },
              { id: 2, brand: "新华", num: "2", rate: "25%" },
              { id: 3, brand: "威高", num: "6", rate: "15%" }
          ]
      },
      核磁共振MRI类: {
          id: 2,
          count: 22,
          dataList: [
              { id: 4, brand: "托人", num: "8", rate: "35%" },
              { id: 5, brand: "新华", num: "2", rate: "25%" },
              { id: 6, brand: "威高", num: "6", rate: "15%" },
              { id: 7, brand: "托人", num: "8", rate: "35%" },
              { id: 8, brand: "新华", num: "2", rate: "25%" },
              { id: 9, brand: "威高", num: "6", rate: "15%" }
          ]
      },
      血管造影机DSA类: {
          id: 3,
          count: 22,
          dataList: [
              { id: 10, brand: "托人", num: "8", rate: "35%" },
              { id: 11, brand: "新华", num: "2", rate: "25%" },
              { id: 12, brand: "威高", num: "6", rate: "15%" },
              { id: 13, brand: "托人", num: "8", rate: "35%" },
              { id: 14, brand: "新华", num: "2", rate: "25%" },
              { id: 15, brand: "威高", num: "6", rate: "15%" }
          ]
      },
      辅助: {
          id: 4,
          count: 22,
          dataList: [
              { id: 16, brand: "托人", num: "8", rate: "35%" },
              { id: 17, brand: "新华", num: "2", rate: "25%" },
              { id: 18, brand: "威高", num: "6", rate: "15%" },
              { id: 19, brand: "托人", num: "8", rate: "35%" },
              { id: 20, brand: "新华", num: "2", rate: "25%" },
              { id: 21, brand: "威高", num: "6", rate: "15%" }
          ]
      }
  };

  export default {
      data() {
          return {
              scrollData: [],
              DATA_MAP,
              selectedLabel: "CT类"
          };
      },
      created() {
          this.scrollData = DATA_MAP[this.selectedLabel].dataList;
      },
      methods: {
          selectLabel(label) {
              this.scrollData = DATA_MAP[label].dataList;
          }
      },
      components: {
          Header,
          scrollTab
      },
      watch: {}
  };
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .container {
    width: 100%;
    height: 100%;
    position: fixed;

    .content {
      height: calc(100% - 44px);
      padding-top: 10px;
      background: #f6f6f6;
      overflow: auto;
    }

    /deep/ .cube-scroll-wrapper {
      height: auto;
    }
  }

  .cube-scroll-list-wrapper {
    .cube-tab-bar {
      flex-wrap: wrap;
      background-color: #fff;

      .cube-tab {
        width: 100px;
        padding: 20px 13px;
        font-size: 14px;
        color: #333;
        line-height: 20px;
        transition: all 0.3s ease-in;
        margin-right: 0;
        margin-bottom: 1px;
        background-color: #f6f6f6;
        flex: none;

        &.cube-tab_active {
          color: #019DDD;
          background-color: #fff;
        }
      }
    }
  }

  .left-panel {
    position: absolute;
    top: 54px;
    left: 0;
    bottom: 0;
    width: 100px;
    background-color: #f6f6f6;
  }

  .right-panel {
    position: absolute;
    top: 54px;
    left: 100px;
    right: 0;
    bottom: 0;
    background-color: #fff;

    .title {
      height: 42px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: 1px solid #e9e9e9;

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

    li {
      height: 40px;
      display: flex;
      align-items: center;
      background-color: #fff;
      justify-content: center;
      font-size: 14px;
      color: #666;
      border-bottom: 1px solid #e9e9e9;

      // &:last-child {
      // border-bottom: none;
      // }
      span {
        flex: 1;
        text-align: center;
      }
    }
  }
</style>
