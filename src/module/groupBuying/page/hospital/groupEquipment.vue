<template>
  <div class="container">
    <Header :title="this.$route.name"></Header>
    <div class="content">
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
      <div class="submitNumber">已提交需求的医院共
        <span>12</span>家</div>
      <div class="submitHospitalInfo">
        <div class="topBox">
          <div class="leftBox">
            <img src="../../../../../static/images/add.png">
            <div class="nameAndHospital">
              <span class="name">张工</span>
              <span class="hospital">山东省立医院</span>
            </div>
          </div>
          <div class="rightBox">
            <attention-btn></attention-btn>
          </div>
        </div>
        <div class="common productSort">
          <span>产品分类</span>
          <span class="value">CT类</span>
          <span class="taiNumber">
            <b>5</b>台</span>
        </div>
        <div class="common hopeBrand">
          <ul>
            <li>
              <span>
                <img src="../../../../../static/images/selected-first.png">
                <span>首选</span>
              </span>
              <span class="brandAndModel">
                <span class="brand">GE</span>
                <span class="model">ATS5000</span>
                <span class="model">1C697BEM731</span>
              </span>
            </li>
            <li>
              <span>
                <img src="../../../../../static/images/selected-second.png">
                <span>次选</span>
              </span>
              <span class="brandAndModel">
                <span class="brand">飞利浦</span>
                <span class="model">飞895645</span>
                <span class="model">飞利浦14526</span>
              </span>
            </li>
            <li>
              <span>
                <img src="../../../../../static/images/selected-three.png">
                <span>再选</span>
              </span>
              <span class="brandAndModel">
                <span class="brand">西门子</span>
                <span class="model">edge</span>
              </span>
            </li>
          </ul>
        </div>
        <div class="common addressAndBudget">
          <div class="address">
            <img src="../../../../../static/images/site.png">
            <span>地址</span>
            <span>山东省济南市</span>
          </div>
          <div class="budget">
            <img src="../../../../../static/images/budget.png">
            <span>5台预算总计</span>
            <span class="moneyCount">2000万</span>
          </div>
        </div>
        <div class="otherRequire">
          <span>该院其他团购需求</span>
          <img src="../../../../../static/images/rightArrow.png">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Header from "../../components/header/header";
  import attentionBtn from "../../components/common/attentionBtn";
  export default {
      data() {
          return {};
      },
      components: {
          Header,
          attentionBtn
      }
  };
</script>
<style lang="scss" scoped>
  @import "../../../../../static/scss/_commonScss";
  .container {
      @include basic_container_style;
      .content {
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
          .submitNumber {
              font-size: 12px;
              color: #999999;
              margin-bottom: 10px;
              line-height: 17px;
              text-align: center;
              span {
                  font-size: 12px;
                  color: #151515;
              }
          }
          .submitHospitalInfo {
              background-color: #fff;
              box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
              border-radius: 5px;
              margin-bottom: 10px;
              .topBox {
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
                  border-bottom: 1px solid #e9e9e9;
                  .address {
                      img {
                          width: 10.8px;
                          height: 14px;
                          vertical-align: middle;
                      }
                      span {
                          font-size: 13px;
                          color: #999;
                          &:last-child {
                              color: #333;
                              font-weight: 600;
                              margin-left: 8px;
                          }
                      }
                  }
                  .budget {
                      img {
                          width: 16px;
                          height: 16px;
                          vertical-align: middle;
                      }
                      span {
                          font-size: 13px;
                          &.moneyCount {
                              font-family: PingFangSC-Medium;
                              font-size: 15px;
                              color: #333333;
                              font-weight: 600;
                              margin-left: 10px;
                          }
                      }
                  }
              }
              .otherRequire {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 46px;
                  span {
                      font-size: 13px;
                      color: #019ddd;
                      margin-right: 6px;
                  }
                  img {
                      width: 6.2px;
                      height: 11px;
                      vertical-align: middle;
                  }
              }
          }
      }
  }
</style>
