<template>
  <div class="selectedSort">
    <span>已选：</span>
    <span class="selectedBox">
      <span class="commonStyle">CT类核磁共振MRI类</span>
      <img src="../../../../../static/images/grayarrow.png">
      <span class="commonStyle">新疆维吾尔族自治区</span>
      <img src="../../../../../static/images/grayarrow.png">
      <span class="commonStyle selectedBrand">GE</span>
      <span class="brandNumber">(60台)</span>
    </span>
  </div>
</template>
<script>
  export default {
      data() {
          return {};
      },
      props: ["SLECTED_DATA"]
  };
</script>
<style lang="scss" scoped>
  @import "../../../../../static/scss/_commonScss";
  .selectedSort {
      @include box_shadow_style;
      margin-bottom: 10px;
      padding: 0px 13px;
      display: flex;
      align-items: center;
      height: 38px;
      font-family: PingFangSC-Regular;
      justify-content: flex-start;
      font-size: 14px;
      color: #333333;

      .selectedBox {
          //margin-left: 8px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
      }
      .commonStyle {
          display: inline-block;
          font-family: PingFangSC-Medium;
          font-size: 13px;
          color: #019ddd;

          width: 42px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          // margin-bottom: -6px;
          //font-weight: 600;
          &.selectedBrand {
              width: auto;
              max-width: 76px;
          }
      }
      .brandNumber {
          font-size: 13px;
          color: #019ddd;
      }
      img {
          width: 7px;
          height: 10px;
          vertical-align: middle;
          margin: 0 10px;
      }
  }
</style>
