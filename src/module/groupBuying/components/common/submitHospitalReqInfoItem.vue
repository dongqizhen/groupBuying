
<template>
  <div class="submitHospitalInfo">
    <hos-man-attention :result="result">
      <span slot="hospitalName" class="hospital">{{result.hospitalName}}</span>
    </hos-man-attention>
    <demand-list :data="result"></demand-list>
    <div class="common addressAndBudget">
      <div class="address">
        <img src="../../../../../static/images/site.png">
        <span>地址</span>
        <span>{{result.addr}}</span>
      </div>
      <div class="budget" :style="{display:this.$route.query.title=='金融团购'?'none':''}">
        <img src="../../../../../static/images/budget.png">
        <span>{{result.num}}台预算总计</span>
        <span class="moneyCount">{{result.price}}万</span>
      </div>
    </div>
    <router-link :to="{path:'hospitalProfile',query:{id:result.id}}" @click.native="clickLink">
      <div class="otherRequire">
        <span>该院其他团购需求</span>
        <img src="../../../../../static/images/rightArrow.png">
      </div>
    </router-link>
  </div>
</template>
<script>
  import hosManAttention from "./hosManAttention";
  import demandList from "./demandList";
  export default {
      data() {
          return {};
      },
      methods: {
          clickLink() {
              this.$store.commit("setTransition", "turn-on");
          }
      },
      props: ["result"],
      components: {
          hosManAttention,
          demandList
      },
      computed: {
          getUserInfo() {}
      }
  };
</script>
<style lang="scss" scoped>
  .submitHospitalInfo {
      background-color: #fff;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      margin-bottom: 10px;
      /deep/ .topBox {
          border-bottom: 1px solid #e9e9e9;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #fff;
          .leftBox {
              display: flex;
              padding: 15px 0 15px 13px;
              img {
                  width: 46px;
                  height: 46px;
                  vertical-align: middle;
                  border-radius: 50%;
                  margin-right: 11px;
              }
              .nameAndHospital {
                  display: flex;
                  flex-direction: column;
                  justify-content: space-around;
                  .hospital {
                      font-size: 13px;
                      color: #666;
                  }
              }
          }
          .rightBox {
              margin-right: 23px;
          }
      }
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
      }
      .taiNumber {
          margin-right: 22px;
          b {
              font-family: BebasNeue;
              font-size: 24px;
              color: #333;
          }
      }
      %value {
          span {
              &.value {
                  width: 181px;
                  color: #333;
              }
          }
      }
      .productSort {
          @extend %value;
          .value {
              font-size: 16px;
              font-weight: 600;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
          }
      }
      .hopeBrand {
          li {
              margin-bottom: 13px;
              &:last-child {
                  margin-bottom: 0;
              }
              img {
                  width: 8px;
                  height: 8px;
                  vertical-align: middle;
              }
              @extend %value;
              .brandAndModel {
                  span {
                      height: 19px;
                      line-height: 19px;
                      display: inline-block;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                  }
              }
              .brand {
                  width: 56px;
                  margin-left: 10px;
                  background: #999999;
                  border-radius: 2px;
                  font-size: 12px;
                  color: #ffffff;
                  text-align: center;
                  margin-bottom: -4px;
              }
              .model {
                  margin-left: 10px;
                  background: rgba(142, 142, 142, 0.05);
                  border-radius: 2px;
                  text-align: center;
                  font-size: 12px;
                  color: #666;
                  min-width: 49px;
                  max-width: 98px;
                  margin-bottom: -4px;
                  padding: 0 5px;
              }
          }
      }
      .addressAndBudget {
          border-bottom: 0.5px solid #e9e9e9;
          padding: 12px 13px;
          display: flex;
          justify-content: flex-start;
          .address {
              width: 176px;
              /* display: flex;
                                justify-content: flex-start; */
              img {
                  width: 10.8px;
                  height: 14px;
                  vertical-align: middle;
              }
              span {
                  font-size: 13px;
                  color: #999;
                  font-family: PingFangSC-Regular;
                  // display: flex;
                  &:last-child {
                      font-family: PingFangSC-Medium;
                      color: #333;
                      width: 121px;
                      display: inline-block;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                      margin-left: 8px;
                  }
              }
          }
          .budget {
              width: 147px;
              img {
                  width: 14px;
                  height: 14px;
                  vertical-align: middle;
              }
              span {
                  font-size: 13px;
                  font-family: PingFangSC-Regular;
                  color: #999999;
                  // display: flex;
                  &.moneyCount {
                      font-family: PingFangSC-Medium;
                      font-size: 15px;
                      color: #333333;

                      margin-left: 10px;
                  }
              }
          }
      }
      .otherRequire {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 42px;
          span {
              font-size: 13px;
              color: #019ddd;
              margin-right: 6px;
              font-family: PingFangSC-Regular;
          }
          img {
              width: 6.2px;
              height: 11px;
              vertical-align: middle;
              margin-left: 2px;
          }
      }
  }
</style>
