<template>
    <div class="basicInformation">

        <basic-title :title="title" imgurl='../static/images/basicInformation.png'>
            <p slot='check' class="ckeck" v-if="isShowCheck != undefined">
                <i :class="`status_${detailData.review}`"></i>
                {{status}}
            </p>
        </basic-title>
        <div class="content_box">
            <ul>
                <li>
                    <span>{{title == '企业基本信息'?'公司名称：':'医院名称：'}}</span>
                    <div>{{type=="hospital"?detailData.hospitalName:detailData.companyName}}</div>
                </li>
                <li :class="title == '企业基本信息'?'':'hide'">
                    <span>企业类型：</span>
                    <div>{{detailData.companyType?detailData.companyType.name:""}}</div>
                </li>
                <li :class="title == '企业基本信息'?'':'hide'">
                    <span>主营业务：</span>
                    <div>{{mainBusinessName}}</div>
                </li>
                <li>
                    <span>地址：</span>
                    <div @click.stop="toNativeMapPage(detailData)">{{detailData.address}}
                        <span></span>
                    </div>
                </li>
            </ul>
            <router-link :to="{path:path,query:{id:detailData.id}}" tag="span" v-if="isShowArrowBox != undefined" @click.native="setTransition('turn-on')">
                <a>{{buttonName}}
                    <i></i>
                </a>
            </router-link>
        </div>

    </div>
</template>

<script>
import basicTitle from "./basicTitle";
import { mapMutations } from "vuex";
import { ToNativeMap } from "../mixin/mixin";
import _ from "lodash";
export default {
  data() {
    return {
      status: "",
      mainBusinessName: ""
    };
  },
  mixins: [ToNativeMap],
  components: {
    basicTitle
  },
  props: [
    "isShowArrowBox",
    "isShowCheck",
    "title",
    "buttonName",
    "path",
    "detailData",
    "type"
  ],
  watch: {
    detailData(newVal) {
      console.log(this.detailData);
      switch (newVal.review) {
        case 0:
          this.status = "审核中";
          break;
        case 1:
          this.status = "审核通过";
          break;
        case 2:
          this.status = "审核未通过";
          break;
      }
      if (this.$store.state.userType == "company") {
        if (this.detailData.bussinessList.length != 0) {
          this.mainBusinessName = _.join(
            _.map(this.detailData.bussinessList, "name"),
            ","
          );
        }
      }
    }
  },
  created() {
    console.log(this.isShowArrowBox);
  },
  methods: {
    ...mapMutations(["setTransition"])
  }
};
</script>

<style lang="scss" scoped>
.basicInformation {
  background: #fff;
  box-shadow: 0.5px 1px 3px 0.5px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  h2 {
    p {
      &:last-child {
        height: 14px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #666666;
        display: flex;
        align-items: center;
        i {
          display: flex;
          height: 10px;
          width: 10px;

          border-radius: 100%;
          // margin-top: 2px;
          margin-right: 6px;
          background: url("../../../../assets/images/selected-first.png");
          background-size: 100% 100%;
          &.status_1 {
            background: url("../../../../assets/images/selected-three.png");
            background-size: 100% 100%;
          }
          &.status_2 {
            background: url("../../../../assets/images/selected-second.png");
            background-size: 100% 100%;
          }
        }
      }
    }
  }
  .content_box {
    display: flex;
    padding: 10px 0px;
    position: relative;
    flex-direction: column;
    ul {
      padding-left: 13px;
      li {
        padding: 13px 13px 13px 0;
        border-bottom: 0.5px solid #f6f6f6;
        &:first-child {
          padding-top: 0;
        }
        &:last-child {
          padding-bottom: 3px;
          border: none;

          > div {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            span {
              display: flex;
              height: 13px;
              width: 10px;
              margin-left: 3px;
              background: url("../../../../../static/images/site.png") no-repeat
                center;
              background-size: 100% 100%;
              // display: none;
            }
          }
        }
        &.hide {
          display: none;
        }
      }
    }
    li {
      display: flex;
      justify-content: flex-start;
      padding: 0 13px 13px;
      line-height: 18px;
      > span {
        width: 70px;
        font-family: PingFangSC-Regular;
        font-size: 13px;
        color: #999999;
        display: flex;
      }
      > div {
        font-family: PingFangSC-Medium;
        font-size: 13px;
        color: #333333;
        width: calc(100% - 65px);
      }
      &:last-child {
        padding-bottom: 0;
      }
    }
    > span {
      font-family: PingFangSC-Medium;
      font-size: 13px;
      line-height: 18px;
      position: absolute;
      bottom: 13px;
      right: 13px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      a {
        text-decoration: none;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        color: #019ddd;
        i {
          display: flex;
          background: url("../../../../../static/images/rightArrow.png")
            no-repeat center;
          height: 12px;
          width: 7px;
          background-size: 100% 100%;
          margin-left: 9px;
          margin-top: 1px;
        }
      }
    }
  }
}
</style>
