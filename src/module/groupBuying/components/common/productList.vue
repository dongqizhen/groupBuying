<template>
  <div class="productList">
    <div class="left_box">
      <img v-lazy="listData.imageUrl?listData.imageUrl.split(',')[0]:''">
    </div>
    <div class="right_box">
      <p>
        <span v-if="listData.isOpen">￥</span>
        <span :class="listData.isOpen?'price':'textStyle'">{{listData.isOpen?listData.price:listData.price}}</span>
        <span v-if="listData.isOpen" class="priceUnit">万元</span>
        <span class="groupbuy">团购价</span>
      </p>
      <span>{{listData.name}}</span>
      <!-- <span>{{listData.productLineName}}/{{listData.brandName}}/{{listData.modelName}}</span> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["listData"]
};
</script>

<style lang="scss" scoped>
.productList {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  .left_box {
    width: 75px;
    //background: #03cc03;
    height: 100%;
    margin-right: 20px;
    > div {
      width: 100%;
      height: 100%;
    }
    img[lazy="loading"] {
      /*your style here*/
      background: #f6f6f6;
    }
    img[lazy="error"] {
      /*your style here*/
      background: #f6f6f6;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
  .right_box {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    p {
      font-family: PingFangSC-Medium;
      font-size: 18px;
      color: #fb4354;
      display: flex;
      justify-content: flex-start;
      align-items: flex-end;
      //height: 22px;
      span {
        font-family: PingFangSC-Regular;
        font-size: 13px;
        margin-bottom: 1px;
        //margin-right: 2px;
        &.price {
          font-size: 18px;
        }
        &.priceUnit {
          font-size: 14px;
        }
        &.textStyle {
          font-family: PingFangSC-Medium;
          font-size: 14px;
          color: #fb4354;
        }
        &.groupbuy {
          width: 37px;
          height: 15px;
          background: #f56a23;
          border-radius: 2px;
          font-family: PingFangSC-Medium;
          font-size: 10px;
          color: #feffff;
          align-items: center;
          justify-content: center;
          display: flex;
          margin-left: 11px;
          text-align: center;
        }
      }
    }
    > span {
      font-family: PingFangSC-Medium;
      font-size: 13px;
      color: #333333;
      margin-top: 12px;
      display: flex;
    }
  }
}
</style>
