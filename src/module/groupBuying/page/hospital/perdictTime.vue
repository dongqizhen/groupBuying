<template>

  <div class="container">
    <Header :title="this.$route.name">
      <span slot="explain" class="enter" @click="enterClick">确定</span>
    </Header>
    <div class="content">
      <div class="scroll-list-wrap">
          <cube-scroll ref="scroll">
            <ul>
              <li v-for="(item,index) in items" :key="index">
              <div class="year">{{index}}年:</div>
              <div class="time clearfix">
                  <span v-for="itemObj in item" :key="itemObj.flag" :class="[itemObj.outTime==0?'disabledStyle':'',current===itemObj.flag && itemObj.outTime==1?'active':'']" @click="changeCurrent(itemObj)">{{itemObj.quarter}}</span>
              </div>
              </li>
            </ul>
          </cube-scroll>
      </div>
    </div>
  </div>

</template>
<script>
import Header from "../../components/header/header";
import { _getData } from "../../service/getData";
import { mapMutations } from "vuex";
import { Toast } from "vant";
export default {
  data() {
    return {
      current: null,
      selectValue: "",
      items: []
    };
  },
  components: {
    Header
  },
  methods: {
    ...mapMutations([
      "setTransition",
      "SBTGPredictTime",
      "HCTGPredictTime",
      "SHTGPredictTime",
      "XXHTGPredictTime",
      "JRTGPredictTime",
      "ZXTGPredictTime"
    ]),
    changeCurrent(obj) {
      console.log(obj);
      if (obj.outTime == 1) {
        this.current = obj.flag;
        this.selectValue = obj;
      }
    },
    enterClick() {
      console.log(this.selectValue);
      if (this.selectValue) {
        switch (this.$route.query.groupTypeCode) {
          case "SBTG":
            if (this.$route.query.page == "submitGroupDemand") {
              this.SBTGPredictTime(this.selectValue);
            }
            break;
          case "HCTG":
            if (this.$route.query.page == "submitGroupDemand") {
              this.HCTGPredictTime(this.selectValue);
            }
            break;
          case "SHTG":
            if (this.$route.query.page == "submitGroupDemand") {
              this.SHTGPredictTime(this.selectValue);
            }
            break;
          case "XXHTG":
            if (this.$route.query.page == "submitGroupDemand") {
              this.XXHTGPredictTime(this.selectValue);
            }
            break;
          case "JRTG":
            if (this.$route.query.page == "submitGroupDemand") {
              this.JRTGPredictTime(this.selectValue);
            }
            break;
          case "ZXTG":
            if (this.$route.query.page == "submitGroupDemand") {
              this.ZXTGPredictTime(this.selectValue);
            }
            break;
        }
        this.setTransition("turn-off");
        this.$router.go(-1);
      } else {
        Toast("请选择装机时间");
        return;
      }
    }
  },
  activated() {
    _getData(
      "/server_pro/groupPurchaseCompanyProduct!request.action",
      {
        method: "getPreloadingTimeList",
        params: { id: this.$route.query.groupPurchaseId }
      },
      data => {
        console.log(data);
        this.items = data;
        this.selectValue = this.$route.query.vuexSelectValue;
        this.current = this.selectValue.flag;
      }
    );
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
  /deep/ header {
    .search {
      .enter {
        padding-right: 13px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #333333;
      }
    }
  }
  .content {
    ul {
      background-color: #fff;
      padding: 13px;
      height: 100%;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      li {
        margin-bottom: 16px;
        .year {
          font-size: 14px;
          color: #666;
          margin-bottom: 8px;
        }
        .time {
          span {
            width: 73px;
            height: 30px;
            line-height: 30px;
            display: block;
            border: 1px solid #999;
            border-radius: 7px;
            margin-right: 10px;
            text-align: center;
            font-size: 13px;
            color: #666;
            float: left;
            &:last-child {
              margin-right: 0;
            }
            &.active {
              background: rgba(1, 157, 221, 0.08);
              border: 1px solid #019ddd;
              border-radius: 7px;
              color: #019ddd;
            }
            &.disabledStyle {
              border: 1px solid #cbcbcb;
              border-radius: 7px;
              color: #cbcbcb;
            }
          }
        }
      }
    }
  }
}
</style>
