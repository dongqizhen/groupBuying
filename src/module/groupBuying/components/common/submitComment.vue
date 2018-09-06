<template>
 <div class="submitComment">
          <div class="footer">
            <textarea placeholder="发表评论" class="ipt-box"></textarea>
          </div>
          <span>发送</span>
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
.submitComment {
  width: 349px;
  line-height: 32px;
  position: absolute;
  bottom: 0;
  border-top: 1px solid #e9e9e9;
  background: #fff;
  z-index: 1111;
  padding: 9px 13px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .footer {
    width: 280px;
    border: 1px solid #e9e9e9;
    border-radius: 34px;
    padding: 3px 13px;
    height: 34px;
    line-height: 34px;
    background: #f5f5f5;
    display: flex;
    align-items: center;
  }
  .ipt-box {
    background: #f5f5f5;
    -webkit-appearance: none;
    font-size: 14px;
    color: #000;
    width: 100%;
    height: 16px;
    line-height: 16px;
  }
  span {
    font-size: 14px;
    color: #666666;
  }
}
</style>
