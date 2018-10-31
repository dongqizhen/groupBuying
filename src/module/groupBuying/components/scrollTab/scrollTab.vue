<template>
    <div class="scrollTab">
        <div class="left-panel">
            <span>团购产品分类</span>
            <cube-scroll>
                <cube-tab-bar v-model="selectedLabel" :data="tabs" @change="changeHandler"></cube-tab-bar>
            </cube-scroll>
        </div>
        <div class="right-panel">
            <slot name="title"></slot>
            <cube-scroll ref="scroll">
                <slot name="right-panel-container"></slot>
            </cube-scroll>
            <slot name="count"></slot>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      tabs: [],
      selectedLabel: ""
    };
  },
  props: ["DATA_MAP", "selectedId"],
  methods: {
    changeHandler(label) {
      this.$emit("selectLabel", label);
      this.$nextTick(() => {
        this.$refs.scroll.scrollTo(0, 0);
        this.$refs.scroll.refresh();
      });
    }
  },
  watch: {
    selectedLabel(newV) {},
    DATA_MAP() {
      const genTabLabels = Object.values(this.DATA_MAP).map((label, index) => {
        if (this.selectedId == label.id) {
          this.selectedLabel = label.name;
        }
        return {
          label: label.name
        };
      });
      this.tabs = genTabLabels;
    }
  }
};
</script>
<style lang="scss" scoped>
.scrollTab {
  height: calc(100% - 10px);
  margin-top: 10px;
  display: flex;
  justify-content: flex-start;
  overflow: hidden;
  .left-panel {
    height: 100%;
    width: 100px;
    background-color: #f6f6f6;
    > span {
      font-family: PingFangSC-Regular;
      font-size: 14px;
      height: 42px;
      line-height: 42px;
      width: 100%;
      display: block;
      color: #999999;
      letter-spacing: 0;
      text-align: center;
      border-bottom: 1px solid #e9e9e9;
      background-color: #fff;
    }
    /deep/ .cube-scroll-wrapper {
      height: 100%;

      .cube-scroll-content {
        min-height: calc(100% + 2px);
        .cube-scroll-list-wrapper {
          .cube-tab-bar {
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            background-color: #fff;
            font-family: PingFangSC-Regular;

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
                color: #019ddd;
                background-color: #fff;
                font-family: PingFangSC-Medium;
              }
            }
          }
        }
      }
    }
  }

  .right-panel {
    flex: 1;
    background-color: #fff;
    > .cube-scroll-wrapper {
      height: 100%;
      > .cube-scroll-content {
        height: 100%;
        overflow: hidden;
      }
    }
  }
}
</style>
