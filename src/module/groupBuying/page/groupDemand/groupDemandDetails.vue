<template>
    <div class="container groupDemandDetails">
        <Header :title='this.$route.query.title'></Header>
        <div class="content">
            <div class="scroll-list-wrap">
                <cube-scroll ref="scroll">
                    <select-path-nav :productLineName="this.$route.query.productLineName" :unit="this.unit" :provinceName="this.$route.query.provinceName" :totalNum="this.$route.query.totalNum"></select-path-nav>
                    <div class="table_container">
                        <h2>
                            <span>品牌</span>
                            <span @click="clickEvent('total')">总数<i :class="totalNum%2<0?'':(totalNum%2==1?'low':'high')"></i></span>
                            <span @click="clickEvent('first')" v-if="flag">首选<i :class="firstNum%2<0?'':(firstNum%2==1?'low':'high')"></i></span>
                            <span @click="clickEvent('second')" v-if="flag">次选<i :class="secondNum%2<0?'':(secondNum%2==1?'low':'high')"></i></span>
                            <span @click="clickEvent('third')" v-if="flag">再选<i :class="thirdNum%2<0?'':(thirdNum%2==1?'low':'high')"></i></span>
                        </h2>
                        <ul>
                            <router-link :to="{ path: 'groupEquipment', query: {
                                    brandId: item.brandId ,
                                    title:$route.query.title,
                                    productLineName:$route.query.productLineName ,
                                    unit:unit,provinceName:$route.query.provinceName, totalNum:item.total,
                                    brandName:item.brandName,
                                    groupPurchaseId:$route.query.groupPurchaseId,
                                    groupPurchaseTypeId:$route.query.groupPurchaseTypeId,
                                    productLineId:$route.query.productLineId,
                                    provinceId:$route.query.provinceId
                                }}" tag="li" v-for="(item,index) in list" :key="index" @click.native="setTransition('turn-on')">
                                <a>
                                    <span>{{item.brandName?item.brandName:item.aliasName}}</span>
                                    <span>{{item.total}}</span>
                                    <span v-if="flag">{{item.first}}</span>
                                    <span v-if="flag">{{item.second}}</span>
                                    <span v-if="flag">{{item.third}}</span>
                                </a>
                            </router-link>
                        </ul>
                    </div>
                </cube-scroll>
            </div>
        </div>
    </div>
</template>

<script>
import Header from "../../components/header/header";
import selectPathNav from "../../components/common/selectPathNav";
import { mapMutations } from "vuex";
import { _getData } from "../../service/getData";
export default {
  data() {
    return {
      list: [],
      totalNum: 0,
      firstNum: -1,
      secondNum: -1,
      thirdNum: -1,
      unit: "",
      flag: ""
    };
  },
  components: {
    Header,
    selectPathNav
  },
  methods: {
    ...mapMutations(["setTransition"]),
    clickEvent(param) {
      switch (param) {
        case "total":
          this.firstNum = -1;
          this.secondNum = -1;
          this.thirdNum = -1;
          this.totalNum = this.totalNum + 1;
          if (this.totalNum % 2 == 0) {
            this.reqData("total", 0);
          } else {
            this.reqData("total", 1);
          }
          break;
        case "first":
          this.totalNum = -1;
          this.secondNum = -1;
          this.thirdNum = -1;
          this.firstNum = this.firstNum + 1;
          if (this.firstNum % 2 == 0) {
            this.reqData("first", 0);
          } else {
            this.reqData("first", 1);
          }
          break;
        case "second":
          this.firstNum = -1;
          this.totalNum = -1;
          this.thirdNum = -1;
          this.secondNum = this.secondNum + 1;
          if (this.secondNum % 2 == 0) {
            this.reqData("second", 0);
          } else {
            this.reqData("second", 1);
          }
          break;
        case "third":
          this.firstNum = -1;
          this.secondNum = -1;
          this.totalNum = -1;
          this.thirdNum = this.thirdNum + 1;
          if (this.thirdNum % 2 == 0) {
            this.reqData("third", 0);
          } else {
            this.reqData("third", 1);
          }
          break;
      }
    },
    reqData(sortName, sortType) {
      _getData(
        "/server_pro/groupPurchaseHospital!request.action",
        {
          method: "getBrandListByProvince",
          params: {
            groupPurchaseTypeId: this.$route.query.groupPurchaseTypeId,
            groupPurchaseId: this.$route.query.groupPurchaseId,
            productLineId: this.$route.query.productLineId,
            provinceId: this.$route.query.provinceId,
            sortName: sortName,
            sortType: sortType
          }
        },
        data => {
          console.log(data);
          this.list = data.list;
          this.flag = data.flag;
        }
      );
    }
  },
  created() {
    this.reqData();
    switch (this.$route.query.title) {
      case "设备团购":
        this.unit = "台";
        break;
      case "耗材团购":
        this.unit = "单";
        break;
      case "售后团购":
        this.unit = "台";
        break;
      case "信息化团购":
        this.unit = "台";
        break;
      case "金融团购":
        this.unit = "台";
        break;
      case "咨询团购":
        this.unit = "单";
        break;
    }
  },
  deactivated() {
    this.$destroy();
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../../static/scss/_commonScss";
.container {
  @include basic_container_style;
  .content {
    .table_container {
      @include box_shadow_style;
      h2 {
        height: 42px;
        display: flex;
        align-content: center;
        justify-content: flex-start;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #999999;
        border-bottom: $border_style;
        span {
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1;
          i {
            width: 10px;
            height: 12px;
            margin-left: 2px;
            background: url("../../../../../static/images/sort.png") no-repeat;
            background-size: 10px 12px;
            &.high {
              background: url("../../../../../static/images/sort-high.png")
                no-repeat;
              background-size: 10px 12px;
            }
            &.low {
              background: url("../../../../../static/images/sort-low.png")
                no-repeat;
              background-size: 10px 12px;
            }
          }
        }
      }
      ul {
        li {
          height: 42px;
          display: flex;
          align-content: center;
          justify-content: flex-start;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #999999;
          border-bottom: $border_style;
          &:last-child {
            border-bottom: 0;
          }
          a {
            text-decoration: none;
            display: flex;
            height: 100%;
            flex: 1;
            > span {
              display: flex;
              align-items: center;
              justify-content: center;
              flex-wrap: wrap;
              word-break: break-all;
              padding: 0 5px;
              line-height: 18px;
              flex: 1;
              &:first-child {
                color: #999999;
              }
              &:nth-child(2) {
                color: #333333;
              }
              &:nth-child(3) {
                color: #fb4354;
              }
              &:nth-child(4) {
                color: #f5a623;
              }
              &:nth-child(5) {
                color: #7ed321;
              }
            }
          }
        }
      }
    }
  }
}
</style>
