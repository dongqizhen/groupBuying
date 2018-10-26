<template>
    <div class="container searchIndex">
        <Header>
            <cube-input v-model.trim="value" slot="mainTitle" :clearable="true" placeholder="请输入关键词">
                <span slot="prepend">
                    <img src="../../../../../static/images/smallSearch.png" alt="">
                </span>
            </cube-input>
            <span slot="explain" @click.stop="search">搜索</span>
        </Header>
        <div class="content">
            <div class="box">
                <div class="scroll-list-wrap">

                    <cube-scroll v-if="hasData" @pulling-up="onPullingUp" ref='scroll' :options="options">
                        <div class="search_list">
                            <div class="search_container" v-if="!loading">

                                <div class="company common" v-if="type==13">
                                    <h2><i></i>企业产品</h2>
                                    <div v-if="!loading">
                                        <product-list v-for="(val,index) in listData" :listData='val' :key="index"></product-list>
                                    </div>
                                </div>
                                <div class="hospital common" v-else-if="type==14">
                                    <h2><i></i>医院需求</h2>

                                    <submit-hospital-req-info-item v-for="(val,index) in listData" :result='val' :key="index" v-if="!loading" :type='val.code'></submit-hospital-req-info-item>

                                </div>
                            </div>

                        </div>
                    </cube-scroll>
                    <no-data v-else></no-data>
                </div>

            </div>
            <loading :show="loading" :text="loadIngTxt"></loading>
        </div>
    </div>
</template>

<script>
import Header from "../../components/header/header";
import productList from "../../components/common/productList.vue";
import submitHospitalReqInfoItem from "../../components/common/submitHospitalReqInfoItem.vue";
import { _getData } from "../../service/getData";
import noData from "../../components/noData/noData.vue";

export default {
  data() {
    return {
      value: this.$route.query.val,
      loading: false,
      loadIngTxt: "Loading...",
      listData: [],
      hasData: true,
      options: {
        pullUpLoad: {
          txt: { noMore: "全部数据加载完毕" }
        }
      },
      currentPage: 1,
      pageCount: 1
    };
  },
  props: ["type"],
  components: {
    Header,
    productList,
    submitHospitalReqInfoItem,
    noData
  },
  methods: {
    async getData(currentPage) {
      await _getData(
        "/server_pro/video!request.action",
        {
          method: "getEachListV28",
          params: {
            currentPage: currentPage || this.currentPage,

            countPerPage: 6,
            name: this.value, //搜搜内容
            type: this.type
          }
        },
        data => {
          console.log(data);
          this.pageCount = data.pageCount;
          if (data.eachrList.length > 0) {
            this.hasData = true;
          } else {
            this.hasData = false;
          }

          if (this.currentPage == 1) {
            this.listData = data.eachrList;
          } else {
            this.listData = [...this.listData, ...data.eachrList];
          }
        }
      ).then(() => {
        this.loading = false;
        if (this.hasData) {
          this.$nextTick(() => {
            this.$refs.scroll.refresh();
          });
        }
      });
    },
    search() {
      this.currentPage = 1;
      this.getData();
    },
    onPullingUp() {
      this.currentPage += 1;
      if (this.currentPage > this.pageCount) {
        this.$refs.scroll.forceUpdate();
        this.$nextTick(() => {
          this.$refs.scroll.refresh();
        });
        return;
      }
      setTimeout(() => {
        this.getData().then(() => {
          this.$refs.scroll.forceUpdate();
        });
      }, 500);
    }
  },
  activated() {
    this.value = this.$route.query.val;
    if (this.listData.length == 0) {
      this.loading = true;
      this.getData();
    }
  },
  beforeRouteLeave(to, from, next) {
    console.log(to);
    next();
    if (to.name == "搜索") {
      this.currentPage = 1;
      setTimeout(() => {
        this.listData = [];
      }, 300);
    }
  },
  watch: {
    value(newVal) {
      console.log(newVal);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../../static/scss/_commonScss";
.container {
  @include basic_container_style;
  /deep/ header {
    h2 {
      .cube-input {
        width: 276px;
        border: none;
        background: #f2f2f2;
        border-radius: 15px;
        justify-content: flex-start;
        margin-right: 12px;
        &::after {
          border: none;
        }
        input {
          height: 30px;
          padding: 0;
          border-radius: 15px;
          padding-left: 5px;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #999999;
        }
        .cube-input-prepend {
          span {
            padding-left: 10px;
            margin-right: 7px;
            height: 15px;
            img {
              width: 16px;
              height: 15px;
            }
          }
        }
        .cube-input-append {
          .cube-input-clear {
            color: #ccc;
            height: 16px;
            width: 16px;
            padding: 0;
            margin-right: 10px;
            background: url("../../../../../static/images/delet.png") no-repeat;
            background-size: 100% 100%;
            .cubeic-wrong {
              display: none;
            }
          }
        }
      }
    }
    .search {
      padding-right: 13px;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #333333;
    }
  }
  .content {
    //padding: 10px 13px;
    .box {
      height: 100%;
    }
    overflow: hidden;
    /deep/ .cube-scroll-wrapper {
      .cube-scroll-content {
        padding-bottom: 0 !important;
        min-height: calc(100% + 1px);
        .cube-scroll-list-wrapper {
          min-height: auto !important;
        }
      }
    }
    .history {
      width: 100%;
      background: #fff;
      margin-top: 10px;
      height: calc(100% - 10px);

      h2 {
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #333333;
        height: 46px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 13px;
        span {
          height: 16px;
          width: 42px;
          padding: 0 13px;
          display: flex;
          background: url("../../../../../static/images/Trash.png") no-repeat
            center;
          background-size: 16px 100%;
        }
      }
      .history_container {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        padding: 0 13px;
        li {
          height: 32px;
          border-radius: 32px;
          background: #f5f5f5;
          font-family: PingFangSC-Regular;
          font-size: 13px;
          color: #333333;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 10px;
          margin-bottom: 10px;
          padding: 0 13px;
          &:active {
            background: rgba($color: #000000, $alpha: 0.06);
          }
        }
      }
    }
    .search_list {
      //padding: 0 13px;
      height: 100%;
      .search_container {
        > p {
          height: 37px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: PingFangSC-Medium;
          font-size: 12px;
          color: #999999;
          span {
            font-family: PingFangSC-Medium;
            font-size: 12px;
            color: #151515;
          }
        }
        > div {
          @include box_shadow_style;
          h2 {
            height: 46px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            font-family: PingFangSC-Medium;
            font-size: 14px;
            color: #333333;
            border-bottom: $border-style;
            padding-left: 13px;
            background-color: #fff;
            i {
              background: $theme-color;
              display: flex;
              width: 3px;
              height: 14px;
              margin-right: 10px;
            }
          }
          .bottom {
            height: 46px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: $theme-color;
          }
          &.company {
            // margin-bottom: 10px;
            h2 {
              border-top-left-radius: 5px;
              border-top-right-radius: 5px;
            }
            /deep/ .productList {
              padding: 13px;
              border-bottom: $border-style;
              .left_box {
                height: 90px;
                width: 100px;
                margin-right: 13px;
              }
              &:last-child {
                margin-bottom: 0;
              }
            }
          }
          &.hospital {
            background: #f6f6f6;
            box-shadow: none;
            border-radius: 1.333vw;
            h2 {
              @include box_shadow_style;
              border-bottom-left-radius: 0;
              border-bottom-right-radius: 0;
            }
            > div {
              background: #f6f6f6;
            }
            /deep/ .submitHospitalInfo {
              margin-bottom: 10px;
              background: #fff;
              &:nth-child(2) {
                border-top-left-radius: 0;
                border-top-right-radius: 0;
              }
              a > .otherRequire {
                display: none;
              }
            }
          }
        }
      }
    }
  }
}
</style>
