<template>
<div class="selectedSort">
        <span>已选:</span>
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
  }
};
</script>
<style lang="scss" scoped>
.selectedSort {
  background-color: #fff;
  margin-bottom: 10px;
  padding: 9px 13px;
  font-size: 15px;
  color: #333333;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  .selectedBox {
    margin-left: 8px;
  }
  .commonStyle {
    display: inline-block;
    font-size: 13px;
    color: #019ddd;
    line-height: 21px;
    width: 42px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    margin-bottom: -6px;
    font-weight: 600;
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
    width: 5.2px;
    height: 9.5px;
    vertical-align: middle;
    margin: 0 4px;
  }
}
</style>
