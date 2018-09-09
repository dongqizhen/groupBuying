<template>
   <div class="manHospitalInfo">
         <div class="topBox">
           <div class="leftBox">
             <img :src="result.imgUrl" alt="">
             <span class="name">{{result.name}}</span>
           </div>
           <div class="rightBox">
            <attention-btn></attention-btn>
           </div>
         </div>
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
             <div class="right hospitalIntroduce">
               <span>医院介绍</span>
               <img src="../../../../../static/images/rightArrow.png" alt="">
             </div>
         </div>
      </div>
</template>
<script>
import attentionBtn from "./attentionBtn";
export default {
  data() {
    return {
      result: {
        imgUrl: "../../../../../static/images/add.png",
        name: "张工",
        hospital: "山东省立医院",
        address: "山东省济南市",
        introduce: "这是一所山东省立医院，归属山东省政府管理规划"
      }
    };
  },
  components: {
    attentionBtn
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
  .topBox {
    height: 54px;
    line-height: 54px;
    border-bottom: 1px solid #e9e9e9;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .leftBox {
      img {
        width: 36px;
        height: 36px;
        vertical-align: middle;
        border-radius: 50%;
        margin-right: 16px;
        margin-left: 13px;
      }
    }
    .name {
      font-family: PingFangSC-Medium;
      font-size: 14px;
      color: #333;
      font-weight: 600;
    }
    .rightBox {
      margin-right: 23px;
    }
  }
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

