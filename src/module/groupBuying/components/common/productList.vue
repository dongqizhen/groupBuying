<template>
    <div class="productList" @click="OnItemClick(listData)">
        <div class="left_box">
           <img :src="listData.imageUrl" alt="">
        </div>
        <div class="right_box">
            <p>
                <span>￥</span>
                {{listData.price}}.00
                <span class="groupbuy">团购价</span>
            </p>
            <span>{{listData.productLineName}}/{{listData.brandName}}/{{listData.modelName}}</span>
        </div>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  props: ["listData"],
  methods: {
    ...mapMutations(["setTransition"]),
    OnItemClick(item) {
      console.log(item);
      this.setTransition("turn-on");
      this.$router.push({
        path: "productDetails",
        query: { id: item.id }
      });
    }
  }
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
    img {
      width: 100%;
      height: 100%;
    }
  }
  .right_box {
    p {
      font-family: PingFangSC-Medium;
      font-size: 18px;
      color: #fb4354;
      display: flex;
      justify-content: flex-start;
      align-items: flex-end;
      height: 22px;
      span {
        font-family: PingFangSC-Regular;
        font-size: 13px;
        margin-bottom: 1px;
        //margin-right: 2px;
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
          line-height: 15px;
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
