<template>
  <div class="container registrationSuccess">
    <Header :title="title"></Header>
    <div class="content">
      <success :companyNum="this.$route.query.companyNum" :hospitalNum="this.$route.query.hospitalNum"></success>
      <div class="advertising">
        <img src="" alt="">
        <span>广告</span>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../../components/header/header";
import success from "../../components/common/success";
export default {
  data() {
    return {
      title: "报名成功(企业)"
    };
  },
  components: {
    Header,
    success
  },
  created: function() {},
  mounted: function() {
    console.log(2);
  },
  activated: function() {
    console.log(3);
    if (this.$route.query.companyNum) {
      this.title = "报名成功(企业)";
    } else {
      this.title = "报名成功(医院)";
    }
  },
  deactivated() {
    console.log(4);
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../../static/scss/_commonScss";
.container {
  @include basic_container_style;
  .content {
    padding: 10px 13px;
    position: relative;
    .advertising {
      height: 134px;
      background: #03cc03;
      position: absolute;
      bottom: 28px;
      // width: 100%;
      width: calc(100% - 26px);
      span {
        display: flex;
        height: 16px;
        width: 41px;
        background: rgba(102, 102, 102, 0.28);
        position: absolute;
        left: 0;
        top: 0;
        font-family: PingFangSC-Regular;
        font-size: 10px;
        color: #333333;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>
