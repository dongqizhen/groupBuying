<template>
  <div class="modelScrollNavBar">
    <div class="slide_container">
      <cube-scroll-nav-bar :current="selectModelVal" :labels="labels" @change="changeHandler" v-if="hackReset" />
    </div>
    <div @click="handleClick" class="touch_btn">
      <!-- <touch-ripple :speed="1" :opacity="0.3" color="#999" transition="ease"> -->
      <i :class="arrowIsActive?'active':''"></i>
      <!-- </touch-ripple> -->
    </div>
    <transition name="showBox">
      <div class="side-container-vertical" v-if="hideBoxIsShow">
        <cube-scroll-nav-bar direction="vertical" :current="current" :labels="labels" @change="changeHandler" v-if="hackReset">
          <i slot-scope="props">{{props.txt}}</i>
        </cube-scroll-nav-bar>
      </div>
    </transition>
    <!-- <div class="hide_box" v-if="hideBoxIsShow">
            <cube-scroll ref="scroll">
                <ul>
                    <li v-for="(value,index) in labels" :key="index">
                        {{value}}
                    </li>
                </ul>
            </cube-scroll>
        </div> -->
  </div>
</template>

<script>
  export default {
      data() {
          return {
              arrowIsActive: false,
              current: "", //说明文档详见 https://didi.github.io/cube-ui/#/zh-CN/docs/scroll-nav-bar
              hideBoxIsShow: false,
              labels: [],
              hackReset: false,
              height: ""
          };
      },
      methods: {
          changeHandler(cur) {
              console.log(cur);
              console.log(this.$el);
              this.arrowIsActive = false;
              this.current = cur;
              this.$emit("modelNavChange", cur);
              this.hideBoxIsShow = false;
          },
          handleClick() {
              this.arrowIsActive = !this.arrowIsActive;
              this.hideBoxIsShow = !this.hideBoxIsShow;
          }
      },
      props: {
          modelData: {
              type: Array
          },
          selectModelVal: {
              type: String
          }
      },
      mounted() {},
      watch: {
          modelData(newVal, oldVal) {
              // console.log(newVal, oldVal, newVal == oldVal);
              // console.log(this.selectModelVal);
              this.labels = [...newVal];
              this.current = this.selectModelVal;
              this.$nextTick(() => {
                  this.hackReset = true;
              });
              this.hackReset = false;
          }
      }
  };
</script>

<style lang="scss" scoped>
  .showBox-leave-active,
  .showBox-enter-active {
      transition: all 0.3s ease;
  }
  .showBox-leave-to,
  .showBox-enter {
      // transform: translate3d(0, 100%, 0);
      opacity: 0;
  }
  .showBox-leave,
  .showBox-enter-to {
      // transform: translate3d(0, 0, 0);
      opacity: 1;
  }

    .modelScrollNavBar {
      height: 44px;
      position: relative;
      display: flex;
      justify-content: flex-start;
      .slide_container {
          height: 100%;
          width: calc(100% - 42px);
          /deep/ .cube-scroll-nav-bar {
              height: 100%;
              border-radius: 5px;
              .cube-scroll-content {
                  padding: 0 !important;
              }
              .cube-scroll-nav-bar-items {
                  height: 44px;
                  display: flex;
                  align-items: center;
                  justify-content: flex-start;
                  .cube-scroll-nav-bar-item {
                      padding: 0;
                      margin-left: 16px;
                      font-family: PingFangSC-Regular;
                      font-size: 13px;
                      &:last-child {
                          //margin-right: 16px;
                      }
                      &.cube-scroll-nav-bar-item_active {
                          color: #019ddd;
                          font-family: PingFangSC-Medium;
                      }
                  }
              }
          }
          /deep/ .cube-scroll-wrapper {
              .cube-scroll-content {
                  min-width: 100%;
              }
          }
      }
      .side-container-vertical {
          display: flex;
          flex: 1;
          width: 100%;
          height: auto;
          position: absolute;
          top: 45px;
          left: 0;
          z-index: 100;
          //border-top: 0.5px solid #e9e9e9;
          padding-left: 13px;
          background: #fff;
          border-radius: 5px;
          /deep/ .cube-scroll-nav-bar {
              width: 100%;
              border-radius: 5px;
              .cube-scroll-wrapper {
                  width: 100%;
                  border-radius: 5px;
                  .cube-scroll-content {
                      min-height: calc(100% + 1px);
                      .cube-scroll-nav-bar-item {
                          font-family: PingFangSC-Regular;
                          font-size: 14px;
                          color: #333333;
                          padding: 16px 0;
                          border-bottom: 0.5px solid #e9e9e9;
                          border-radius: 5px;
                          text-align: left;
                          &.cube-scroll-nav-bar-item_active {
                              color: #019ddd;
                          }
                          i {
                              font-style: normal;
                          }
                          &:last-child {
                              border: 0;
                          }
                      }
                  }
              }
          }
      }
      .touch_btn {
          display: flex;
          width: 42px;
          height: 100%;
          align-items: center;
          justify-content: center;
          i {
              display: flex;
              height: 14px;
              width: 8px;
              background: url("../../../../../static/images/grayarrow.png")
                  no-repeat center;
              background-size: 100% 100%;
              transform: rotate(90deg);
              transition: transform 0.3s ease;
              &.active {
                  transform: rotate(630deg);
                  transition: transform 0.3s ease;
              }
          }
          &:active {
              background: rgba($color: #000000, $alpha: 0.04);
          }
      }
      .hide_box {
          position: absolute;
          width: 100%;
          left: 0;
          top: 45px;
          background: #fff;
          padding: 0 16px;
          z-index: 1000;
          li {
              height: 50px;
              line-height: 50px;
              font-family: PingFangSC-Regular;
              font-size: 14px;
              color: #333333;
              border-bottom: 0.5px solid #e5e5e5;
              &:last-child {
                  border: 0;
              }
              &.active {
                  color: #019ddd;
              }
          }
      }
  }
</style>
