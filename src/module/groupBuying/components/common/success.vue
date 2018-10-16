<template>
  <div class="success">
    <i></i>
    <span>感谢您的加盟</span>
    <p>已有
      <span>{{hospitalNum}}</span>家医院
      <i v-if="companyNum">、<span>{{companyNum}}</span>家企业</i>参加本次团购</p>
    <x-button type="primary" @click.native="toUploadProduct">{{companyNum?"上传产品":"填写团购需求表"}}</x-button>
  </div>
</template>

<script>
  export default {
      data() {
          return {};
      },
      methods: {
          toUploadProduct() {
              this.$store.commit("setTransition", "turn-on");
              if (this.companyNum) {
                  this.$router.push("/uploadProduct");
              } else {
                  this.$router.push("/submitGroupDemand");
              }
          }
      },
      props: ["companyNum", "hospitalNum"]
  };
</script>

<style lang="scss" scoped>
  @import "../../../../../static/scss/_commonScss";
  .success {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      height: 211px;
      @include box_shadow_style;
      > i {
          height: 40px;
          width: 40px;
          display: flex;
          background: url("../../../../../static/images/success.png") no-repeat
              center;
          background-size: 100% 100%;
          margin-top: 22px;
          margin-bottom: 20px;
      }
      > span {
          font-family: PingFangSC-Regular;
          font-size: 16px;
          color: #333333;
          line-height: 22px;
      }
      p {
          font-family: PingFangSC-Regular;
          font-size: 16px;
          color: #333333;
          line-height: 22px;
          display: flex;
          margin-bottom: 20px;
          span {
              font-family: PingFangSC-Regular;
              font-size: 16px;
              color: #f5a623;
              display: inline-block;
          }
          i {
              font-style: normal;
          }
      }
      /deep/ .weui-btn {
          width: 250px;
          height: 40px;
          border-radius: 40px;
          background-image: linear-gradient(44deg, #02ccf0 0%, #019ddd 100%);
          box-shadow: 0 4px 7px 2px rgba(1, 157, 221, 0.18);
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #ffffff;
      }
  }
</style>
