<template>
  <div class="container myGroupBuyHospital">
    <Header title="我的团购 (医院)">
      <router-link :to="{path:'demandTable',query:{id:detailData.id}}" slot="explain" @click.native="setTransition('turn-on')">需求清单</router-link>
    </Header>
    <div class="content">
      <div class="scroll-list-wrap">
        <scroller>
          <basic-information type="hospital" :detailData="detailData" isShowArrowBox isShowCheck title="医院基本信息" buttonName="医院介绍" path='/hospitalProfile'>

          </basic-information>
          <div class="i_join_in">
            <basic-title title="我参加的团购" imgurl='../static/images/groupBuy.png'></basic-title>
            <list-tab v-if="Object.keys(meetingListData).length" :meetingListData="meetingListData"></list-tab>
          </div>

        </scroller>
      </div>
      <div class="btn_container">
        <x-button type="primary" @click.native="submitBtnClick" :disabled="isDisabled">提交我的团购需求</x-button>
      </div>

    </div>
  </div>
</template>

<script>
import Header from "../../components/header/header";
import basicInformation from "../../components/common/basicInformation";
import listTab from "../../components/common/listTab";
import basicTitle from "../../components/common/basicTitle";
import { mapMutations } from "vuex";
import { _getData } from "../../service/getData";
import { setTimeout } from "timers";
import _ from "lodash";
export default {
  data() {
    return {
      detailData: {},
      isDisabled: false,
      meetingListData: {}
    };
  },
  components: {
    Header,
    basicInformation,
    listTab,
    basicTitle
  },
  methods: {
    ...mapMutations(["setTransition"]),
    submitBtnClick() {
      this.isDisabled = true;
      this.setTransition("turn-on");
      this.$router.push("/submitGroupDemand");
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.isDisabled = false;
    });
  },
  activated() {
    _getData(
      "/server_pro/groupPurchaseHospital!request.action",
      {
        method: "getAppGroupPurchaseHospitalInfo",
        params: { id: this.$store.state.userCompanyIdOrHospitalId }
      },
      data => {
        this.detailData = data;
        // this.isDisabled = data.review == 1 ? false : true;
        console.log(this.detailData);
      }
    );
    _getData(
      "/server_pro/groupPurchaseHospital!request.action",
      {
        method: "getMyGroupPurchaseHospital",

        params: {
          groupPurchaseHospitalId: this.$store.state.userCompanyIdOrHospitalId
        }
      },
      data => {
        console.log(data);
        this.meetingListData = _.keyBy(data.list, val => {
          return `${val.year}(${val.num}场)`;
        });
      }
    );
  }
};
</script>

<style lang="scss"  scoped>
@import "../../../../../static/scss/_commonScss";
.container {
  @include basic_container_style;
  .content {
    /deep/ .scroll-list-wrap {
      height: calc(100% - 60px);
    }
    .i_join_in {
      @include box_shadow_style;
      margin-top: 10px;
      /deep/ .basicTitle {
        h2 {
          border: none;
        }
      }
    }
    .btn_container {
      background: #fff;
      height: 60px;
      padding: 0 13px;
      display: flex;
      align-items: center;
      /deep/ .weui-btn {
        background: #019ddd;
        font-family: PingFangSC-Regular;
        font-size: 16px;
        //margin-top: 10px;
        height: 50px;
        border-radius: 6px;
        color: #fff;
        &.end {
          background: #cccccc;
          &:after {
            border: none;
          }
        }
      }
    }
    .btn_container_disabled {
      background: #fff;
      height: 60px;
      padding: 0 13px;
      display: flex;
      align-items: center;
      /deep/ .weui-btn {
        background: #ccc;
        font-family: PingFangSC-Regular;
        font-size: 16px;
        //margin-top: 10px;
        height: 50px;
        border-radius: 6px;
        color: #fff;
        &.end {
          background: #cccccc;
          &:after {
            border: none;
          }
        }
      }
    }
  }
}
</style>
