<template>
  <div class="common">
      <span>{{itemKeys}}</span>
      <span class="value">{{itemValue}}</span>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: ["itemKeys", "itemValue"]
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
  span.value {
    width: 181px;
    color: #333;
  }
}
</style>

