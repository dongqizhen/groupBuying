<template>
  <div class="container">
    <Header :title="this.$route.name"></Header>
    <div class="content">
      <man-hospital-info></man-hospital-info>
      <div v-if="true" class="intention">
        <budget-count></budget-count>
        <div class="common productSort">
          <span>产品分类</span>
          <span class="value">贞观类</span>
        </div>
        <div class="number">
          <div class="common requireNumber">
            <span>需求数量</span>
            <span class="value">10件</span>
          </div>
          <div class="infoCount">
            本次团购，CT类设备已累计申报98台，历史累计申报共275台。
          </div>
        </div>
        <div class="common hopePrice">
          <span>期望采购价格(总价)</span>
          <span class="value">2000万</span>
        </div>
        <div class="common hopeBrand">
          <ul>
            <li>
              <span>
                <img src="../../../../../static/images/selected-first.png">
                <span>首选</span>
              </span>
              <span class="value">GE</span>
            </li>
            <li>
              <span>
                <img src="../../../../../static/images/selected-second.png">
                <span>次选</span>
              </span>
              <span class="value">飞利浦</span>
            </li>
            <li>
              <span>
                <img src="../../../../../static/images/selected-three.png">
                <span>再选</span>
              </span>
              <span class="value">西门子</span>
            </li>
          </ul>
        </div>
        <div class="common param">
          <span>重要参数</span>
          <span class="paramVal">
            <ul>
              <li v-for="itemParam in params" :key="itemParam.paramName">{{itemParam.paramName}}</li>
            </ul>
          </span>
        </div>
        <div class="common perdictTime">
          <span>预计装机时间</span>
          <span class="value">2018年第三季度</span>
        </div>
        <div class="common demandIntroduce">
          <span>本院采购需求说明</span>
          <span class="value">需要来医院介绍产品特性</span>
        </div>
      </div>
      <div class="box equipmentSortAndBrandAndModel">
        <budget-count></budget-count>
        <div class="number">
          <div class="common requireNumber">
            <span>设备种类</span>
            <span class="value">CT类</span>
          </div>
          <div class="infoCount">
            本次团购，CT类设备已累计申报98台，历史累计申报共275台。
          </div>
        </div>
        <div class="common productSort">
          <span>设备品牌</span>
          <span class="value">GE</span>
        </div>
        <div class="common productSort">
          <span>设备型号</span>
          <span class="value">loga 9</span>
        </div>
      </div>
      <div class="box equipmentBasicInfo">
        <require-detail-item v-for="item in itemLists" :key="item.id" :itemKeys="item.itemKeys" :itemValue="item.itemValue"></require-detail-item>
      </div>
      <div class="box maintenanceSort">
        <require-detail-item v-for="item in maintenanceSorts" :key="item.id" :itemKeys="item.itemKeys" :itemValue="item.itemValue"></require-detail-item>
      </div>
      <comment></comment>
      <submit-comment></submit-comment>
    </div>
  </div>
</template>
<script>
  import Header from "../../components/header/header";
  import submitComment from "../../components/common/submitComment";
  import comment from "../../components/common/comment";
  import manHospitalInfo from "../../components/common/manHospitalInfo";
  import requireDetailItem from "../../components/common/requireDetailItem";
  import budgetCount from "../../components/common/budgetCount";
  export default {
      data() {
          return {
              params: [
                  { paramName: "四排" },
                  { paramName: "六排" },
                  { paramName: "六排八排" },
                  { paramName: "六排六排" },
                  { paramName: "八排" }
              ],
              itemLists: [
                  { id: 1, itemKeys: "设备台数", itemValue: "10台" },
                  { id: 2, itemKeys: "期望采购价格(总价)", itemValue: "2000万" },
                  { id: 3, itemKeys: "维修时间", itemValue: "2018年第三季度" },
                  { id: 4, itemKeys: "设备安装日期", itemValue: "2017-08-15" },
                  { id: 5, itemKeys: "该设备每天检查量", itemValue: "200人" },
                  { id: 6, itemKeys: "响应时间", itemValue: "10小时以内" }
              ],
              maintenanceSorts: [
                  { id: 7, itemKeys: "维保类型", itemValue: "全保" },
                  { id: 8, itemKeys: "备注信息", itemValue: "这里是备注信息" }
              ]
          };
      },
      components: {
          Header,
          submitComment,
          comment,
          manHospitalInfo,
          requireDetailItem,
          budgetCount
      }
  };
</script>
<style lang="scss" scoped>
  @import "../../../../../static/scss/_commonScss";
  .container {
      @include basic_container_style;
      .content {
          padding-bottom: 52px;
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
          }
          .number {
              border-bottom: 1px solid #e9e9e9;
              .requireNumber {
                  border-bottom: none;
                  @extend %value;
              }
              .infoCount {
                  width: 336px;
                  line-height: 21px;
                  background-color: rgba(244, 133, 75, 0.1);
                  font-family: PingFangSC-Regular;
                  font-size: 11px;
                  color: #f4854b;
                  padding: 0 13px;
                  border-top-right-radius: 10.5px;
                  border-bottom-right-radius: 10.5px;
                  margin-bottom: 13px;
              }
          }
          .hopePrice {
              @extend %value;
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
                  .value {
                      margin-left: 20px;
                  }
              }
          }
          .param {
              .paramVal {
                  width: 250px;
                  ul {
                      display: flex;
                      width: 100%;
                      justify-content: flex-start;
                      flex-wrap: wrap;
                      li {
                          padding: 0 16px;
                          background-color: #ebebeb;
                          border-radius: 2px;
                          font-size: 13px;
                          color: #333;
                          height: 19px;
                          line-height: 19px;
                          margin: 5px 0;
                          margin-right: 10px;
                      }
                  }
              }
          }
          .perdictTime {
              @extend %value;
          }
          .demandIntroduce {
              border-bottom: none;
              @extend %value;
          }
          .intention {
              background: #ffffff;
              box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
              border-radius: 5px;
              margin-bottom: 10px;
          }
          .box {
              background-color: #fff;
              margin-bottom: 10px;
          }
      }
  }
</style>
