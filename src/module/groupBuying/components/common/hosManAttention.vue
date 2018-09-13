<template>
     <div class="topBox">
        <div class="leftBox">
          <img :src="result.imgUrl" alt="">
          <div class="nameAndHospital">
             <span class="name">{{result.name}}</span>
             <slot name="hospitalName"></slot>
          </div>
        </div>
        <div class="rightBox">
          <attention-btn></attention-btn>
        </div>
      </div>
</template>
<script>
import attentionBtn from "./attentionBtn";
export default {
  data() {
    return {};
  },
  props: ["result"],
  components: {
    attentionBtn
  }
};
</script>
<style lang="scss" scoped>
.topBox {
  border-bottom: 1px solid #e9e9e9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .leftBox {
    display: flex;
    padding: 15px 0 15px 13px;
    img {
      width: 36px;
      height: 36px;
      vertical-align: middle;
      border-radius: 50%;
      margin-right: 16px;
    }
    .nameAndHospital {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
  }
  .name {
    font-family: PingFangSC-Medium;
    font-size: 14px;
    color: #333;
    font-weight: 600;
  }
  .rightBox {
    margin-right: 23px;
  }
}
</style>
