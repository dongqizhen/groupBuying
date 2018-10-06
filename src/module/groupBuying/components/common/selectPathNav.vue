<template>
  <div class="selectedSort">
    <span>已选：</span>
    <span class="selectedBox">
      <span class="commonStyle">{{productLineName}}</span>
      <img src="../../../../../static/images/grayarrow.png">
      <span class="commonStyle">{{provinceName}}</span>
      <div v-if="brandName">
        <img src="../../../../../static/images/grayarrow.png">
        <span class="commonStyle selectedBrand">{{brandName}}</span>
      </div>
      <span class="brandNumber">({{totalNum}}{{unit}})</span>
    </span>
  </div>
</template>
<script>
  export default {
      data() {
          return {};
      },
      props: ["productLineName", "provinceName", "brandName", "totalNum", "unit"]
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
          height: 100%;
          > div {
              display: flex;
              align-items: center;
              img {
              }
          }
      }
      .commonStyle {
          height: 100%;
          display: inline-block;
          font-family: PingFangSC-Medium;
          font-size: 13px;
          color: #019ddd;
          text-align: center;
          width: 42px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          // margin-bottom: -6px;
          //font-weight: 600;
          line-height: 38px;
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
          margin: 0 13.5px;
      }
  }
</style>
