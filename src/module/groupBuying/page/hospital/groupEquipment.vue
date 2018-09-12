<template>
  <div class="container">
    <Header :title="this.$route.name"></Header>
    <div class="content">
      <select-path-nav></select-path-nav>
      <div class="submitNumber">已提交需求的医院共<span>12</span>家</div>
        <submit-hospital-req-info-item></submit-hospital-req-info-item>
    </div>
  </div>
</template>
<script>
import Header from "../../components/header/header";
import selectPathNav from "../../components/common/selectPathNav";
import submitHospitalReqInfoItem from "../../components/common/submitHospitalReqInfoItem";
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
    Header,
    selectPathNav,
    submitHospitalReqInfoItem
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../../static/scss/_commonScss";
.container {
  @include basic_container_style;
  .content {
    .submitNumber {
      font-size: 12px;
      color: #999999;
      margin-bottom: 10px;
      line-height: 17px;
      text-align: center;
      span {
        font-size: 12px;
        color: #151515;
        margin: 0 2px;
      }
    }
  }
}
</style>
