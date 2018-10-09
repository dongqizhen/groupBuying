<template>
  <div class="manHospitalInfo">
    <hos-man-attention :result="result"></hos-man-attention>
    <div class="bottomBox clearfix">
      <div class="hospitalAndAddress">
        <basic-title :title="result.hospital" imgurl="../static/images/hospital.png"></basic-title>

        <div class="address">
          <img src="../../../../../static/images/site.png" alt="">
          <span>{{result.address}}</span>
        </div>
      </div>
      <router-link to="/hospitalProfile" @click.native="clickLink">
        <div class="hospitalIntroduce">
          <span>医院介绍</span>
          <img src="../../../../../static/images/rightArrow.png" alt="">
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
  import hosManAttention from "./hosManAttention";
  import basicTitle from "../../components/common/basicTitle";
  export default {
      data() {
          return {
              // result: {
              //   imgUrl: "../../../../../static/images/add.png",
              //   name: "张工",
              //   hospital: "山东省立医院",
              //   address: "山东省济南市",
              //   introduce: "这是一所山东省立医院，归属山东省政府管理规划"
              // }
          };
      },
      props: ["result"],
      components: {
          hosManAttention,
          basicTitle
      },
      methods: {
          clickLink() {
              this.$store.commit("setTransition", "turn-on");
          }
      }
  };
</script>
<style lang="scss" scoped>
  @import "../../../../../static/scss/_commonScss";
  .manHospitalInfo {
      width: 100%;
      height: 150px;
      @include box_shadow_style;

      margin-bottom: 10px;
      .bottomBox {
          // padding: 0 13px;
          position: relative;
          .hospitalAndAddress {
              /deep/ .basicTitle {
                  margin: 5px 0;
                  h2 {
                      border-bottom: 0;
                  }
              }
          }

          .hospital {
              margin-bottom: 18px;
              margin-top: 18px;
              img {
                  width: 16px;
                  height: 16px;
                  margin-right: 8px;
              }
              .hospitalName {
                  font-family: PingFangSC-Medium;
                  font-size: 16px;
                  color: #333;
                  font-weight: 600;
              }
          }
          .address {
              padding-left: 13px;
              display: flex;
              justify-content: flex-start;
              img {
                  width: 11px;
                  height: 14px;
                  margin-right: 13px;
              }
              span {
                  font-family: PingFangSC-Medium;
                  font-size: 13px;
                  color: #666666;
              }
          }
          > a {
              display: flex;
              position: absolute;
              right: 13px;
              top: 50%;
              text-decoration: none;
              //margin-top: -6.5px;
              .hospitalIntroduce {
                  display: flex;
                  justify-content: flex-start;
                  align-items: center;
                  span {
                      font-family: PingFangSC-Medium;
                      font-size: 13px;
                      color: #019ddd;
                      margin-right: 9px;
                  }
                  img {
                      width: 7px;
                      height: 12px;
                      vertical-align: middle;
                  }
              }
          }
      }
  }
</style>

