<template>
        <div class="common">
             <div class="subTitle">耗材团购意向</div>
             <div class="budget">
               <img src="../../../../../static/images/budget.png" alt="">
               <span>5件预算总计</span>
               <span class="moneyCount">2000万</span>
             </div>
        </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.common {
  width: 100%;
  padding: 13px;
  border-bottom: 1px solid #e9e9e9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #999;
  .subTitle {
    font-family: PingFangSC-Medium;
    color: #333333;
    font-weight: 600;
  }
  .budget {
    img {
      width: 16px;
      height: 16px;
      vertical-align: middle;
    }
    span {
      font-size: 13px;
      &.moneyCount {
        font-family: PingFangSC-Medium;
        font-size: 15px;
        color: #333333;
        font-weight: 600;
        margin-left: 10px;
      }
    }
  }
}
</style>
