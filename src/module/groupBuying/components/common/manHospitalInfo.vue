<template>
   <div class="manHospitalInfo">
        <hos-man-attention :result="result"></hos-man-attention>
         <div class="bottomBox">
             <div class="left hospitalAndAddress">
                <div class="hospital">
                  <img src="../../../../../static/images/hospital.png" alt="">
                  <span class="hospitalName">{{result.hospital}}</span>
                  </div>
                <div class="address">
                   <img src="../../../../../static/images/site.png" alt="">
                  <span>{{result.address}}</span>
                  </div>
             </div>
             <router-link to="/hospitalProfile" @click.native="clickLink">
                 <div class="right hospitalIntroduce">
                  <span>医院介绍</span>
                  <img src="../../../../../static/images/rightArrow.png" alt="">
                </div>
             </router-link>
         </div>
      </div>
</template>
<script>
import hosManAttention from "./hosManAttention";
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
    hosManAttention
  },
  methods: {
    clickLink() {
      this.$store.commit("setTransition", "turn-on");
    }
  }
};
</script>
<style lang="scss" scoped>
.manHospitalInfo {
  width: 100%;
  height: 150px;
  background-color: #fff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  margin-bottom: 10px;
  .bottomBox {
    padding: 0 13px;
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
    .hospitalIntroduce {
      margin-top: 56px;
      span {
        font-family: PingFangSC-Medium;
        font-size: 13px;
        color: #666;
      }
      img {
        width: 6.2px;
        height: 11.4px;
        vertical-align: middle;
      }
    }
  }
}
</style>

