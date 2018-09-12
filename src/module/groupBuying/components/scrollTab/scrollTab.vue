<template>
    <div class="scrollTab">
        <!-- <cube-page type="scroll-tab-view" title="ScrollTab"> -->
        <div slot="content">
            <div class="left-panel">
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
        <!--  </cube-page> -->
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      tabs: [],
      selectedLabel: ""
    };
  },
  created() {},
  props: ["DATA_MAP"],
  methods: {
    changeHandler(label) {
      this.$emit("selectLabel", label);
      this.$nextTick(() => {
        this.$refs.scroll.scrollTo(0, 0);
        this.$refs.scroll.refresh();
      });
    }
  },
  components: {},
  mounted() {
    const genTabLabels = Object.keys(this.DATA_MAP).map((label, index) => {
      if (index == 0) {
        this.selectedLabel = label;
      }
      return {
        label
      };
    });
    this.tabs = genTabLabels;
  },
  computed: {},
  watch: {
    selectedLabel(newV) {
      console.log(newV);
    }
  },
  deactivated() {
    this.$destroy();
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
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
}
</style>
