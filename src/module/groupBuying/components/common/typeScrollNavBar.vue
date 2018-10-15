import { type } from 'eruda';
<template>
  <div class="typeScrollNavBar">

    <cube-scroll-nav-bar :current="current" :labels="labels" @change="changeHandler" />
  </div>
</template>

<script>
  export default {
      data() {
          return {
              current: "",
              labels: [],
              hackReset: false
          };
      },
      props: {
          typeData: {
              type: Array,
              default: []
          },
          slectedTypeKeyWord: {
              type: String
          }
      },
      methods: {
          changeHandler(cur) {
              this.current = cur;
              this.$emit("typeNavChange", cur);
          }
      },
      updated() {},
      created() {
          console.log(this.slectedTypeKeyWord);
          this.current = this.slectedTypeKeyWord;

          this.labels = this.typeData;
      },
      watch: {
          typeData(newVal, oldVal) {
              console.log(this.slectedTypeKeyWord);
              this.current = this.slectedTypeKeyWord;

              this.labels = this.typeData;
              /*this.current = this.typeData[0]; */
              this.$nextTick(() => {
                  this.hackReset = true;
              });
              this.hackReset = false;
          }
      }
  };
</script>

<style lang="scss" scoped>
  .typeScrollNavBar {
      height: 57px;
      border-bottom: 1px solid #f6f6f6;
      font-size: 12px;
      color: #666666;
      font-family: PingFangSC-Regular;
      border-radius: 5px;
      /deep/ .cube-scroll-nav-bar {
          height: 100%;
          border-radius: 5px;
          .cube-scroll-wrapper {
              border-top-left-radius: 5px;
              border-top-right-radius: 5px;
              justify-content: flex-start;
              .cube-scroll-content {
                  min-width: 100%;
                  padding: 0 !important;
              }
              .cube-scroll-nav-bar-items {
                  border-radius: 5px;
                  height: 100%;
                  display: flex;
                  justify-content: flex-start;
                  .cube-scroll-nav-bar-item {
                      height: 56px;
                      padding: 0;
                      display: flex;
                      align-items: center;
                      flex-direction: row;
                      margin-left: 12px;
                      border-radius: 5px;
                      span {
                          height: 30px;
                          width: 100px;
                          display: flex;
                          align-items: center;
                          justify-content: center;
                          border: 0.5px solid #999999;
                          border-radius: 30px;
                          font-family: PingFangSC-Regular;
                          font-size: 12px;
                          color: #666666;
                      }
                      &:last-child {
                          margin-right: 12px;
                      }
                      &.cube-scroll-nav-bar-item_active {
                          span {
                              background: rgba(1, 157, 221, 0.08);
                              border: 0.5px solid #019ddd;
                              box-shadow: 0.5px 2px 2px 0.5px
                                  rgba(1, 157, 221, 0.15);
                              color: #019ddd;
                              font-family: PingFangSC-Medium;
                          }
                      }
                  }
              }
          }
      }
  }
</style>
