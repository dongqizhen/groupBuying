<template>
  <div class="common">
    <div class="subTitle">{{slectedTypeKeyWord}}意向</div>
    <div class="budget">
      <img src="../../../../../static/images/budget.png" alt="">
      <span v-if="slectedTypeKeyWord!='金融团购'">{{demandListData.num}}台</span>预算总计
      <span class="moneyCount">{{demandListData.price}}万元</span>
    </div>
  </div>
</template>
<script>
  export default {
      data() {
          return {};
      },
      props: ["demandListData", "slectedTypeKeyWord"],
      watch: {
          slectedTypeKeyWord() {}
      }
  };
</script>
<style lang="scss" scoped>
  @import "../../../../../static/scss/_commonScss";
  .common {
      width: 100%;
      padding: 0 13px;
      height: 38px;
      border-bottom: $border-style;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-family: PingFangSC-Regular;
      font-size: 13px;
      color: #999;
      .subTitle {
          font-family: PingFangSC-Medium;
          color: #333333;
          //font-weight: 600;
      }
      .budget {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          img {
              width: 14px;
              height: 14px;
              vertical-align: middle;
              margin-bottom: 1px;
              margin-right: 3px;
          }
          span {
              font-size: 13px;
              font-family: PingFangSC-Regular;
              color: #999999;
              &.moneyCount {
                  font-family: PingFangSC-Medium;
                  font-size: 13px;
                  color: #333333;
                  //font-weight: 600;
                  margin-left: 10px;
              }
          }
      }
  }
</style>
