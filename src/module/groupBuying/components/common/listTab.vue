<template>
  <div class="scrollWrapper">
    <div class="listTab">
      <cube-tab-bar v-model="ScrollListSelectedLabel" showSlider ref="tabNav">
        <cube-tab v-for="(item, index) in listTabsData" :label="item.label" :key="index">
        </cube-tab>
      </cube-tab-bar>
    </div>
    <div class="tab-slide-container">
      <cube-slide ref="slide" :loop="false" :initial-index="initialIndex" :auto-play="false" :show-dots="false" :options="slideOptions" @scroll="scroll" @change="changePage">
        <cube-slide-item v-for="(item,key) in meetingListData" :key="key">
          <list-item v-for="(val,index) in item.underwayList" :key="`underwayList_${index}`" :dataValue="val"></list-item>
          <list-item v-for="(val,index) in item.beginList" :key="`beginList_${index}`" :dataValue="val"></list-item>
          <list-item v-for="(val,index) in item.theEndList" :key="`theEndList_${index}`" :dataValue="val"></list-item>
        </cube-slide-item>
      </cube-slide>
    </div>
  </div>
</template>

<script>
  import ListItem from "./listItem";
  import _ from "lodash";
  export default {
      data() {
          return {
              loop: false,
              ScrollListSelectedLabel: "",
              listTabs: this.listTabsData || [],
              slideOptions: {
                  listenScroll: true,
                  probeType: 3,
                  /* lock y-direction when scrolling horizontally and  vertically at the same time */
                  directionLockThreshold: 0
              },
              ListData: this.meetingListData
          };
      },
      components: {
          ListItem
      },
      props: {
          meetingListData: {
              type: Object,
              default: () => {
                  return {};
              }
          }
      },
      methods: {
          scroll(pos) {
              const x = Math.abs(pos.x);
              const tabItemWidth = this.$refs.tabNav.$el.clientWidth;
              const slideScrollerWidth = this.$refs.slide.slide.scrollerWidth;
              const deltaX = (x / slideScrollerWidth) * tabItemWidth;
              this.$refs.tabNav.setSliderTransform(deltaX);
          },
          changePage(current) {
              this.ScrollListSelectedLabel = this.listTabs[current].label;
              //console.log(current);
          },
          findIndex(ary, fn) {
              if (ary.findIndex) {
                  return ary.findIndex(fn);
              }
              /* istanbul ignore next */
              let index = -1;
              /* istanbul ignore next */
              ary.some((item, i, ary) => {
                  const ret = fn.call(this, item, i, ary);
                  if (ret) {
                      index = i;
                      return ret;
                  }
              });
              /* istanbul ignore next */
              return index;
          }
      },
      computed: {
          initialIndex() {
              let index = 0;
              index = this.findIndex(
                  this.listTabs,
                  item => item.label === this.ScrollListSelectedLabel
              );
              return index;
          },
          listTabsData() {
              return _.map(Object.keys(this.meetingListData), val => {
                  return {
                      label: val
                  };
              });
          }
      },
      watch: {
          meetingListData: function(val, oldVal) {
              //console.log(val);
          }
      },
      created() {
          this.listTabs = this.listTabsData;
          this.ScrollListSelectedLabel = this.listTabsData[0].label;
      },
      mounted() {
          //console.log(this.meetingListData);
      }
  };
</script>

<style lang="scss" scoped>
  @import "../../../../../static/scss/_commonScss";
  .scrollWrapper {
      .listTab {
          height: 40px;
          border-bottom: $border_style;
          box-sizing: border-box;
          /deep/ .cube-tab-bar {
              height: 100%;

              .cube-tab {
                  margin: 0;
                  font-family: PingFangSC-Regular;
                  font-size: 13px;
                  color: #999999;
                  &.cube-tab_active {
                      color: #019ddd;
                      font-family: PingFangSC-Medium;
                  }
              }
              .cube-tab-bar-slider {
                  background: #019ddd;
              }
          }
      }
      /deep/ .tab-slide-container {
          padding: 10px 10px 0;
      }
  }
</style>
