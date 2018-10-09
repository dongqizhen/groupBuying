<template>
  <div class="container">
    <Header :title="`${$route.query.title?$route.query.title:'团购'}需求详情`"></Header>
    <div class="content">
      <div class="scroll-list-wrap">
        <cube-scroll ref="scroll">
          <man-hospital-info class="hospitalAttention" :result="result"></man-hospital-info>

          <!-- <budget-count></budget-count> -->
          <!--设备团购、耗材团购-->
          <div v-if="true" class="intention">

            <div class="common productSort">
              <span>产品分类</span>
              <span class="value">贞观类</span>
            </div>
            <div class="common  number">
              <div class="requireNumber">
                <span>需求数量</span>
                <span class="value">10件</span>
              </div>
              <div class="infoCount">
                本次团购,CT类设备已累计申报<span>98</span>台,历史累计申报共<span>275</span>台。
              </div>
            </div>
            <div class="common hopePrice">
              <div>
                <span>期望采购总价</span>
                <span class="value">2000万</span>
              </div>

              <div class="infoCount">
                本次团购，CT类设备已累计申报<span>98</span>台，总预算为<span>1200</span>万元。
              </div>
            </div>
            <div class="common hopeBrand">
              <ul>
                <li>
                  <span>
                    <img src="../../../../../static/images/selected-first.png">
                    <span>首选</span>
                  </span>
                  <span class="value">
                    <span class="brand">GE</span>
                  </span>
                </li>
                <li>
                  <span>
                    <img src="../../../../../static/images/selected-second.png">
                    <span>次选</span>
                  </span>
                  <span class="value"><span class="brand">飞利浦</span></span>
                </li>
                <li>
                  <span>
                    <img src="../../../../../static/images/selected-three.png">
                    <span>再选</span>
                  </span>
                  <span class="value"><span class="brand">西门子</span><span class="model">midid</span><span class="model">midid</span></span>
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

          <!--售后团购-->
          <div class="afterSever">
            <div class="box equipmentSortAndBrandAndModel">
              <!-- <budget-count></budget-count> -->
              <div class="common productSort">
                <span>设备种类</span>
                <span class="value">CT类</span>
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
              <div class="common hopePrice">
                <div>
                  <span>设备台数</span>
                  <span class="value">10台</span>
                </div>

                <div class="infoCount">
                  本次团购,CT类设备已累计申报<span>98</span>台,历史累计申报共<span>275</span>台。
                </div>
              </div>
              <div class="common hopePrice">
                <div>
                  <span>维修预算(总价)</span>
                  <span class="value">2000万</span>
                </div>

                <div class="infoCount">
                  本次团购，CT类设备已累计申报<span>98</span>台，总维修预算为<span>1200</span>万元
                </div>
              </div>
              <div class="common">
                <span>维修时间</span>
                <span class="value">2018年第三季度</span>
              </div>
              <div class="common">
                <span>设备安装日期</span>
                <span class="value">2017-08-15</span>
              </div>
              <div class="common">
                <span>该设备每天检查量</span>
                <span class="value">200人</span>
              </div>
              <div class="common">
                <span>响应时间</span>
                <span class="value">10小时以内</span>
              </div>
            </div>
            <div class="box maintenanceSort">
              <div class="common">
                <span>维保类型</span>
                <span class="value">全保</span>
              </div>
              <div class="common">
                <span>备注信息</span>
                <span class="value">这里是备注信息，10小时以内</span>
              </div>
            </div>
          </div>

          <!-- 咨询团购、金融团购-->
          <div class="counsel">
            <div class="common hopePrice">
              <div>
                <span>咨询分类</span>
                <span class="value">CT类</span>
              </div>

              <div class="infoCount">
                本次团购,CT类设备已累计申报<span>98</span>台,历史累计申报共<span>275</span>台。
              </div>
            </div>
            <div class="common productSort">
              <span>应用方向</span>
              <span class="value">这里显示咨询应用方向内容</span>
            </div>
            <div class="common hopePrice">
              <div>
                <span>期望采购总价</span>
                <span class="value">2000万</span>
              </div>

              <div class="infoCount">
                本次团购,CT类设备已累计申报<span>98</span>次,历史累计申报共<span>1200</span>万元。
              </div>
            </div>
            <div class="common productSort">
              <span>咨询服务商</span>
              <span class="value">GE</span>
            </div>
            <div class="common param">
              <span>关键词</span>
              <span class="paramVal">
                <ul>
                  <li v-for="itemParam in params" :key="itemParam.paramName">{{itemParam.paramName}}</li>
                </ul>
              </span>
            </div>
            <div class="common productSort">
              <span>预计咨询时间</span>
              <span class="value">GE</span>
            </div>
            <div class="common productSort">
              <span>本院采购需求说明</span>
              <span class="value">需要来医院介绍产品特性</span>
            </div>
          </div>

          <!-- 信息化团购 -->
          <div class="counsel">
            <div class="common productSort">
              <span>平台分类</span>
              <span class="value">CT类</span>
            </div>
            <div class="common hopePrice">
              <div>
                <span>需求数量</span>
                <span class="value">10台</span>
              </div>

              <div class="infoCount">
                本次团购,CT类设备已累计申报<span>98</span>台,历史累计申报共<span>275</span>台。
              </div>
            </div>

            <div class="common hopePrice">
              <div>
                <span>期望采购总价</span>
                <span class="value">2000万</span>
              </div>

              <div class="infoCount">
                本次团购,CT类设备已累计申报<span>98</span>次,历史累计申报共<span>1200</span>万元。
              </div>
            </div>
            <div class="common productSort">
              <span>信息化品牌</span>
              <span class="value">GE</span>
            </div>
            <div class="common productSort">
              <span>信息化应用需求</span>
              <span class="value">这里显示信息化应用需求</span>
            </div>
            <div class="common productSort">
              <span>信息化型号</span>
              <span class="value">LOGIQ C9, LOGIQ e, LoGIQ 8</span>
            </div>
            <div class="common param">
              <span>重要参数</span>
              <span class="paramVal">
                <ul>
                  <li v-for="itemParam in params" :key="itemParam.paramName">{{itemParam.paramName}}</li>
                </ul>
              </span>
            </div>
            <div class="common productSort">
              <span>预计咨询时间</span>
              <span class="value">GE</span>
            </div>
            <div class="common productSort">
              <span>本院采购需求说明</span>
              <span class="value">需要来医院介绍产品特性</span>
            </div>
          </div>
          <comment></comment>

        </cube-scroll>

      </div>
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
                  { paramName: "六排八排" }
                  /* { paramName: "六排六排" },
                                                                                                                                                                                                                                                { paramName: "八排" } */
              ],
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
          submitComment,
          comment,
          manHospitalInfo,
          requireDetailItem,
          budgetCount
      },
      methods: {
          keyWords() {
              switch (this.$router.query.title) {
                  case "团购设备":
                      return {
                          key: "设备"
                      };
              }
          }
      }
  };
</script>
<style lang="scss" scoped>
  @import "../../../../../static/scss/_commonScss";

  .container {
      @include basic_container_style;
      .content {
          padding-bottom: 52px;
          .hospitalAttention {
              /deep/ .leftBox {
                  padding: 10px 0 10px 18px;
              }
          }
          .common {
              width: 100%;
              padding: 13px;
              border-bottom: $border-style;
              display: flex;
              align-items: center;
              justify-content: space-between;
              font-family: PingFangSC-Regular;
              font-size: 13px;
              color: #999;

              span.value {
                  width: 189px;
                  color: #333;
                  line-height: 18px;
              }
          }

          .hopePrice,
          .number {
              display: flex;
              flex-direction: column;
              padding: 0;
              align-items: flex-start;

              > div {
                  display: flex;
                  justify-content: space-between;
                  width: 100%;

                  &:first-child {
                      padding: 13px 13px 8px;
                      display: flex;
                      justify-content: space-between;
                      align-items: center;
                      .value {
                          display: flex;
                          width: 189px;
                      }
                  }
              }
              .infoCount {
                  width: 336px;
                  line-height: 21px;
                  background-color: rgba(244, 133, 75, 0.1);
                  font-family: PingFangSC-Regular;
                  font-size: 11px;
                  color: #f4854b;
                  padding-left: 13px;
                  border-top-right-radius: 10.5px;
                  border-bottom-right-radius: 10.5px;
                  margin-bottom: 13px;
                  span {
                      color: #fb5665;
                  }
              }
          }
          .hopeBrand {
              ul {
                  width: 100%;
                  li {
                      margin-bottom: 13px;
                      display: flex;
                      justify-content: flex-start;
                      width: 100%;
                      > span {
                          display: flex;
                          &:first-child {
                              width: 61px;
                              display: flex;
                              align-items: center;
                              justify-content: flex-start;
                              span {
                                  display: inline-block;
                                  height: 100%;
                                  line-height: 18px;
                                  font-family: PingFangSC-Regular;
                                  font-size: 13px;
                              }
                          }
                          &:last-child {
                              flex: 1;
                              display: flex;
                              justify-content: flex-start;
                              align-items: center;
                              .brand {
                                  width: 56px;
                                  display: flex;
                                  justify-content: center;
                                  align-items: center;
                                  overflow: hidden;
                                  text-overflow: ellipsis;
                                  white-space: nowrap;
                                  margin-right: 15px;
                                  font-family: PingFangSC-Medium;
                                  font-size: 12px;
                                  color: #333333;
                              }
                              .model {
                                  padding: 0 10px;
                                  background: rgba(142, 142, 142, 0.05);
                                  border-radius: 2px;
                                  margin-right: 5px;
                                  font-family: PingFangSC-Regular;
                                  font-size: 12px;
                                  color: #666666;
                              }
                          }
                      }

                      &:last-child {
                          margin-bottom: 0;
                      }
                      img {
                          width: 10px;
                          height: 10px;
                          margin-right: 4px;
                      }
                      .value {
                          // margin-left: 20px;
                      }
                  }
              }
          }
          .param {
              min-height: 44px;
              padding: 0;
              padding-left: 13px;
              font-family: PingFangSC-Regular;
              font-size: 13px;
              color: #999999;
              .paramVal {
                  width: 250px;

                  ul {
                      display: flex;
                      width: 100%;
                      justify-content: flex-start;
                      flex-wrap: wrap;
                      li {
                          padding: 0 15px;
                          background-color: #ebebeb;
                          border-radius: 2px;

                          color: #333;
                          height: 19px;
                          line-height: 19px;
                          margin: 5px 0;
                          margin-right: 10px;
                          font-family: PingFangSC-Regular;
                          font-size: 13px;
                      }
                  }
              }
          }
          .demandIntroduce {
              border-bottom: none;
          }
          .intention {
              background: #ffffff;
              box-shadow: 0.5px 1px 3px 0.5px rgba(0, 0, 0, 0.1);
              border-radius: 5px;
              margin-bottom: 10px;
          }
          .box {
              background-color: #fff;
              margin-bottom: 10px;
              @include box_shadow_style;
              .number {
                  border-bottom: $border-style;
              }
          }
          .counsel {
              @include box_shadow_style;
              background-color: #fff;
              margin-bottom: 10px;
          }
      }
  }
</style>
