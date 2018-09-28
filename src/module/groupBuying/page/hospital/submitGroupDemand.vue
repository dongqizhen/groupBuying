<template>
    <div class="container submitGroupDemand">
        <Header title="提交团购需求 (医院)"></Header>
        <div class="content">
            <div class="scroll-list-wrap">
            <cube-scroll ref="scroll">
            <div class="selectGroupMeeting">
                <basic-title title="选择团购大会" imgurl="/static/images/groupBuy.png">
                    <span slot="select">(必选项)</span>
                </basic-title>
                <div class="list_box">
                    <list-item v-for="(item,index) in groupUnderWayList" :isActive="current===index?true:false" v-on:changeIdx="idx" :index="index" :key="item.id" :dataValue="item" :disabled="true"></list-item>
                </div>
            </div>
            <div class="groupType">
                <basic-title title="团购需求类型" imgurl="/static/images/selectproject.png">
                    <span slot="select">(必选项)</span>
                </basic-title>
                <select-project-nav v-on:selectObj="getItemObj" v-on:select-value="handleSelect"></select-project-nav>
            </div>
            <div class="productBasicInfromation">
                <basic-title :title="title" imgurl="/static/images/basicInformation.png">
                    <span slot="select">(必填项)</span>
                </basic-title>
                <group-demand-write-info ref="groupDemandWriteInfo" :groupPurchaseId="this.submitData.groupPurchaseId" :groupType="this.groupItemObj" :groupPurchaseTypeId="submitData.groupPurchaseTypeId"></group-demand-write-info>
            </div>
            <x-button v-if="submitBtnStatus" type="primary" @click.native="submitBtnClick">提交团购需求表</x-button>
            <x-button v-else type="primary" show-loading>提交中</x-button>
             </cube-scroll>
           </div>
        </div>
    </div>
</template>

<script>
import Header from "../../components/header/header";
import listItem from "../../components/common/listItem";
import basicTitle from "../../components/common/basicTitle";
import selectProjectNav from "../../components/common/selectProjectNav";
import groupDemandWriteInfo from "../../components/common/groupDemandWriteInfo";
import { Group, XTextarea, XNumber, CellBox } from "vux";
import compress from "../../../../../static/js/compressImage";
import { mapMutations } from "vuex";
import { _getData } from "../../service/getData";
import _ from "lodash";
export default {
  data() {
    return {
      title: "设备团购需求详情",
      groupItemObj: {},
      productSort: {},
      current: null,
      submitBtnStatus: true,
      groupUnderWayList: [],
      submitData: {
        id: "",
        hospitalId: "16",
        groupPurchaseId: "",
        groupPurchaseTypeId: "",
        productLineId: "",
        productLineName: "",
        brandId: "",
        modelId: "",
        num: "",
        application: "请详细填写设备的临床用途",
        loadTime: "2018年第四季度",
        price: "10",
        introduce: "采购需求说明",
        installTime: "2018-09-21",
        deviceCheckNum: "100",
        responseTime: "24",
        maintenanceType: "1",
        params: '[{"id":"1","name":"八排"},{"id":"","name":"自定义"}]',
        productLineAliasId: "产品线别名id",
        otherProductLineName: "手填产品线名称",
        brandAliasId: "品牌别名id",
        otherBrandName: "手填品牌",
        otherModelName: "手填型号",
        brandList: [
          {
            demandId: "8",
            brandId: "2",
            model: "3",
            brandName: "飞利浦",
            type: "0"
          },
          {
            demandId: "8",
            brandId: "2",
            model: "3",
            brandName: "西门子",
            type: "1"
          },
          {
            demandId: "8",
            brandId: "2",
            model: "3",
            brandName: "GE",
            type: "2"
          }
        ]
      }
    };
  },
  components: {
    Header,
    listItem,
    basicTitle,
    selectProjectNav,
    Group,
    XTextarea,
    XNumber,
    CellBox,
    groupDemandWriteInfo
  },
  methods: {
    handleSelect(value) {
      console.log("-------------");
      console.log(value);
      this.submitData.groupPurchaseTypeId = value;
    },
    getItemObj(val) {
      this.groupItemObj = val;
    },
    idx(v) {
      console.log(v);
      this.current = v;
      this.submitData.groupPurchaseId = this.groupUnderWayList[v].id;
    },
    submitBtnClick() {
      console.log(this.$refs.groupDemandWriteInfo.info);
      _getData(
        "/server_pro/groupPurchaseHospital!request.action",
        {
          method: "addOrUpdateGroupPurchaseHospitalDemand",
          params: this.submitData
        },
        data => {
          console.log(data);
        }
      );
      //this.submitBtnStatus = false;
      this.$router.push("myHospitalGroupBuy");
    },
    ...mapMutations(["setTransition"])
  },
  mounted: function() {
    _getData(
      "/server_pro/groupPurchase!request.action",
      {
        method: "getUnderWayGroupPurchaseList",
        params: {}
      },
      data => {
        console.log(data);
        this.groupUnderWayList = data.groupPurchaseList;
      }
    );
  },
  activated: function() {},
  deactivated: function() {},
  watch: {
    groupItemObj() {
      switch (this.groupItemObj.code) {
        case "SBTG":
          this.title = "设备团购需求详情";
          break;
        case "HCTG":
          this.title = "耗材团购需求详情";
          break;
        case "SHTG":
          this.title = "售后团购需求详情";
          break;
        case "XXHTG":
          this.title = "信息化团购需求详情";
          break;
        case "JRTG":
          this.title = "金融团购需求详情";
          break;
        case "ZXTG":
          this.title = "咨询团购需求详情";
          break;
        default:
          this.title = "设备团购需求详情";
          break;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../../static/scss/_commonScss";
.container {
  @include basic_container_style;
  /deep/ .basicTitle {
    h2 {
      p > span {
        font-family: PingFangSC-Regular;
        font-size: 15px;
        color: #aaaaaa;
        margin-left: 5px;
      }
    }
  }
  .content {
    .selectGroupMeeting {
      padding-bottom: 0.5px;
      margin-bottom: 10px;
      @include box_shadow_style;
      .list_box {
        padding: 0 10px;
      }
    }
    .groupType {
      @include box_shadow_style;
      margin-bottom: 10px;
    }
    .productBasicInfromation {
      @include box_shadow_style;
      margin-bottom: 10px;
      /deep/ .basicTitle {
        h2 {
          p > span {
            font-size: 13px;
          }
          .server {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #333333;
            height: 100%;

            i {
              width: 17px;
              height: 14px;
              background: url("/static/images/service.png") no-repeat center;
              background-size: 100% 100%;
              margin-right: 3px;
            }
          }
        }
      }
    }
    /deep/ .weui-btn {
      background: #019ddd;
      font-family: PingFangSC-Regular;
      font-size: 16px;

      height: 50px;
      border-radius: 6px;
    }
  }
}
</style>
