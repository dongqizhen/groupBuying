<template>
  <div class="container">
    <Header title="团购详情" :isSearchHide="true" :saveId="saveId" v-on:changeSaveId="changeSaveId"></Header>
    <div class="content">
      <div class="scroll-list-wrap">

        <cube-scroll ref="scroll">
          <div class="wrapper">
            <div class="basic_information">
              <basic-title title="团购基本信息" imgurl="../static/images/groupBuy.png"></basic-title>
              <list-item :dataValue="this.$store.state.page.detailsPageData"></list-item>
            </div>
            <div class="hospitalNeeds">
              <h2><span></span>团购大会列表<span></span></h2>
              <span>企业用户查看</span>
              <ul>
                <li v-for="(val,index) in hospitalGroupList" :key="index" @click="jumpToGroupDemand(val)">
                  <a>
                    <i><img :src="val.imageUrl"></i>
                    {{val.name}}
                    <span>已有
                      <a>{{val.hospitalNum}}</a>家医院提交团购需求
                    </span>
                  </a>
                </li>
              </ul>
            </div>
            <div class="Enterprise_Product">
              <h2><span></span>企业产品<span></span></h2>
              <span>医院用户查看</span>
              <ul class="nav">
                <li v-for="group in groupList" :key="group.id" :class="currentGroupId===group.id?'active':''" @click="selectGroup(group)">{{group.name}}({{group.totalNum}})</li>
              </ul>
              <div class="subscription">
                <h3>
                  <p>{{groupPurchaseTypeName}}产品清单</p>
                  <a @click="jumpToGroupClassification">
                    <span>查看全部 ({{totalNum}}款)
                      <i></i>
                    </span>
                  </a>
                </h3>
                <ul class="type">
                  <li v-for="(inventoryItem,index) in groupInventoryList" :key="index" @click="jumpToGroupInventory(inventoryItem)">
                    <a>
                      {{inventoryItem.name}}
                      <span>{{inventoryItem.num}}款</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div class="brand">
                <h2>{{groupPurchaseTypeName}}入围企业</h2>
                <ul v-if="enterBrandList.length>0">
                  <li>
                    <span>企业</span>
                    <!-- <span>团购占有率</span> -->
                    <span>市场保有率</span>
                    <span>售后排名</span>
                  </li>
                  <li v-for="(item,index) in enterBrandList" :key="index" @click="jumpToCompany(item.companyId,item.companyUserId)">
                    <span><!-- <img :src="item.imageUrl"> -->{{item.companyName}}</span>
                    <!-- <span>{{item.proportion}}</span> -->
                    <span>{{item.marketRate}}</span>
                    <span>{{item.saleRank}}</span>
                  </li>
                </ul>
                <no-data v-else mainTitle="暂无入围企业" :isShowSecondTitle="false"></no-data>
              </div>
            </div>
          </div>
        </cube-scroll>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/header/header";
import ListItem from "../components/common/listItem";
import basicTitle from "../components/common/basicTitle";
import { _getData } from "../service/getData";
import { mapMutations } from "vuex";
import { Toast } from "vant";
import _ from "lodash";
import noData from "../components/noData/noData.vue";

export default {
  data() {
    return {
      hospitalGroupList: [],
      groupInventoryList: [],
      groupList: [],
      currentGroupId: null,
      groupBrandList: [],
      productLineList: [],
      totalNum: "",
      enterBrandList: [],
      groupPurchaseTypeName: "",
      saveId: ""
    };
  },
  components: {
    Header,
    ListItem,
    basicTitle,
    noData
  },
  props: ["id"],
  methods: {
    ...mapMutations(["setTransition"]),
    jumpToGroupDemand(val) {
      console.log(val);
      // if (this.$store.state.userType == "company") {
      if (val.hospitalNum != 0) {
        this.setTransition("turn-on");
        this.$router.push({
          path: "/groupDemand",
          query: {
            groupPurchaseId: this.id,
            groupPurchaseTypeId: val.id,
            groupTypeCode: val.code
          }
        });
      } else {
        Toast({ message: "暂无数据,请稍后查看", duration: 1000 });
        return;
      }
      // } else {
      //   Toast({ message: "只有企业用户才能查看", duration: 1000 });
      //   return;
      // }
    },
    jumpToGroupClassification() {
      // if (this.$store.state.userType == "hospital") {
      if (this.totalNum != 0) {
        this.setTransition("turn-on");
        this.$router.push({
          path: "/groupClassification",
          query: {
            groupPurchaseTypeId: this.currentGroupId,
            groupPurchaseId: this.id,
            groupPurchaseTypeName: this.groupPurchaseTypeName
          }
        });
      } else {
        Toast({ message: "暂无数据,请稍后查看", duration: 1000 });
        return;
      }
      // } else {
      //     Toast({ message: "只有医院用户才能查看", duration: 1000 });
      //     return;
      // }
    },
    jumpToGroupInventory(val) {
      console.log(val);
      // if (this.$store.state.userType == "hospital") {
      this.setTransition("turn-on");
      this.$router.push({
        path: "/groupClassification",
        query: {
          groupPurchaseTypeId: this.currentGroupId,
          groupPurchaseId: this.id,
          productLineId: val.id,
          groupPurchaseTypeName: this.groupPurchaseTypeName
        }
      });
      // } else {
      //   Toast({ message: "只有医院用户才能查看", duration: 1000 });
      //   return;
      // }
    },
    selectGroup(group) {
      console.log(group);
      this.currentGroupId = group.id;
      this.totalNum = group.totalNum;
      this.groupPurchaseTypeName = group.name;
    },
    changeSaveId(val) {
      this.saveId = val;
    },
    jumpToCompany(id, companyUserTd) {
      this.setTransition("turn-on");
      this.$router.push({
        path: "/companyProfile",
        query: { id: id, userId: companyUserTd }
      });
    }
  },
  activated() {
    console.log(this.id);
    _getData(
      "/server_pro/groupPurchase!request.action",
      {
        method: "getGroupPurchaseInfoHospital",
        params: { id: this.id }
      },

      data => {
        console.log(data);
        this.hospitalGroupList = data.list;
      }
    );
    if (this.id != this.saveId) {
      this.saveId = this.id;
      _getData(
        "/server_pro/groupPurchase!request.action",
        {
          method: "getGroupPurchaseInfoCompany",
          params: { id: this.id }
        },
        data => {
          console.log(data);
          this.groupList = data.groupList;
          this.currentGroupId = data.groupList[0].id;
          this.totalNum = data.groupList[0].totalNum;
          this.groupPurchaseTypeName = data.groupList[0].name;
          this.groupBrandList = data.groupPurchaseBrandList;
          this.productLineList = data.productLineList;
          this.groupInventoryList = _.find(this.productLineList, o => {
            return o[this.currentGroupId];
          })[this.currentGroupId];
          this.enterBrandList = _.find(this.groupBrandList, o => {
            return o[this.currentGroupId];
          })[this.currentGroupId];
        }
      );
    }
    this.$nextTick(() => {
      this.$refs.scroll.refresh();
    });
  },
  watch: {
    currentGroupId() {
      this.groupInventoryList = _.find(this.productLineList, o => {
        return o[this.currentGroupId];
      })[this.currentGroupId];
      this.enterBrandList = _.find(this.groupBrandList, o => {
        return o[this.currentGroupId];
      })[this.currentGroupId];
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../static/scss/_commonScss.scss";
.container {
  @include basic_container_style;
  .content {
    padding: 0;
    .wrapper {
      // padding: 10px 13px;
    }
    .basic_information {
      height: 219px;
      background: #ffffff;
      box-shadow: 0.5px 1px 3px 0.5px rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      padding: 0 10px;
      margin-bottom: 10px;
      /deep/ h2 {
        padding: 0;
      }
    }
    %h2 {
      // height: 57px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 15px;
      text-align: center;
      color: #666666;
      font-family: PingFangSC-Medium;
      //border-bottom:1px solid #E9E9E9;
      margin-bottom: 5px;
      span {
        display: block;
        border-top: 1px solid #cccccc;
        width: 20px;
        margin: 0 18px;
      }
    }
    .hospitalNeeds {
      min-height: 436px;
      background: #ffffff;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      padding-top: 16px;
      margin-bottom: 10px;
      > h2 {
        @extend %h2;
      }
      > span {
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #999999;
        display: flex;
        justify-content: center;
        margin-bottom: 20px;
      }
      > ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 0 10px;
        li {
          height: 100px;
          width: 160px;
          background: #ffffff;
          border: 0.5px solid rgba(1, 157, 221, 0.12);
          box-shadow: 0.5px 2px 4px 0.5px rgba(1, 157, 221, 0.09);
          border-radius: 5px;
          margin-bottom: 16px;
          display: flex;
          font-family: PingFangSC-Medium;
          font-size: 14px;
          color: #333333;
          letter-spacing: 0;
          > a {
            color: #333333;
            text-decoration: none;
            display: flex;
            height: 100%;
            width: 100%;
            flex-direction: column;
            align-items: center;
            i {
              height: 25px;
              width: 25px;

              margin: 15px 0 13px;
              img {
                height: 100%;
                width: 100%;
              }
            }
            span {
              font-size: 12px;
              margin-top: 6px;
              color: #999999;
              display: flex;
              font-family: PingFangSC-Regular;
              a {
                color: #019ddd;
              }
            }
          }
        }
      }
    }
    .Enterprise_Product {
      background: #ffffff;
      padding-top: 16px;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      > h2 {
        @extend %h2;
      }
      > span {
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #999999;
        display: flex;
        justify-content: center;
        margin-bottom: 20px;
      }
      > ul.nav {
        display: flex;
        padding: 0 13px;
        flex-wrap: wrap;
        justify-content: space-between;
        li {
          width: 100px;
          height: 31px;
          border-radius: 31px;
          display: flex;
          border: 0.5px solid #999999;
          align-items: center;
          justify-content: center;
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #666666;
          margin-bottom: 15px;
          &.active {
            background: rgba(1, 157, 221, 0.08);
            color: #019ddd;
            border: 1px solid #019ddd;
            box-shadow: 0 2px 2px 0 rgba(1, 157, 221, 0.15);
            font-family: PingFangSC-Medium;
          }
        }
      }
      .subscription {
        > h3 {
          display: flex;
          justify-content: space-between;
          font-family: PingFangSC-Medium;
          font-size: 14px;
          color: #333333;
          height: 50px;
          padding: 0 13px;
          align-items: center;
          a {
            text-decoration: none;
          }
          span {
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #666666;
            line-height: 50px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            i {
              display: flex;
              width: 7px;
              height: 12px;
              background: url("../../../../static/images/grayarrow.png")
                no-repeat center;
              background-size: 100% 100%;
              margin-left: 10px;
            }
          }
        }
        > ul.type {
          display: flex;
          flex-wrap: wrap;
          padding: 0 10px;
          padding-right: 0;
          li {
            height: 50px;
            width: 103px;
            background: #ffffff;
            border: 0.5px solid rgba(1, 157, 221, 0.12);
            box-shadow: 0.5px 2px 4px 0.5px rgba(1, 157, 221, 0.09);
            border-radius: 5px;
            margin-bottom: 15px;
            display: flex;
            margin-right: 10px;
            font-family: PingFangSC-Medium;
            font-size: 12px;

            letter-spacing: 0;
            text-align: center;
            align-items: center;
            padding-top: 10px;
            a {
              display: flex;
              height: 100%;
              flex-direction: column;
              text-decoration: none;
              align-items: center;
              width: 100%;
              color: #019ddd;
              span {
                font-family: PingFangSC-Regular;
                font-size: 10px;
                color: #999999;
                letter-spacing: 0;
                margin-top: 5px;
              }
            }
          }
        }
      }
      .brand {
        h2 {
          height: 40px;
          margin-bottom: 5px;
          padding: 0 13px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          font-family: PingFangSC-Medium;
          font-size: 14px;
          color: #333333;
        }
        > ul {
          li {
            display: flex;
            min-height: 52px;
            align-items: center;
            padding: 2px 0;
            border-bottom: 1px solid #e9e9e9;
            justify-content: space-around;
            &:first-child {
              height: 36px;
              border-top: 1px solid #e9e9e9;
              span {
                font-family: PingFangSC-Regular;
                font-size: 12px;
                color: #999999;
              }
            }
            &:last-child {
              border-bottom: none;
            }
            span {
              display: flex;
              justify-content: center;
              align-items: center;
              font-family: PingFangSC-Medium;
              font-size: 14px;
              color: #333333;
              img {
                width: 32px;
                margin-right: 6px;
                // height: 32px;
              }
              &:first-child {
                width: 123px;
                text-align: center;
              }
              &:nth-child(2) {
                width: 60px;
                // margin-right: 23px;
              }
              &:nth-child(3) {
                width: 60px;
              }
              // &:last-child {
              //   width: 83px;
              // }
            }
          }
        }
        /deep/ .noData {
          padding: 20px 0;
        }
      }
    }
  }
}
</style>
