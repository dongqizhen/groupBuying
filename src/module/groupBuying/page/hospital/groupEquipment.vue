<template>
    <div class="container">
        <Header :title="this.$route.query.title"></Header>
        <div class="content">
            <select-path-nav :productLineName="this.$route.query.productLineName" :unit="this.unit" :provinceName="this.$route.query.provinceName" :totalNum="this.$route.query.totalNum" :brandName="this.$route.query.aliasName?this.$route.query.aliasName:this.$route.query.brandName"></select-path-nav>
            <div class="scroll-list-wrap" v-if="!loading">
                <cube-scroll ref="scroll" @pulling-up="pullUpLoad" :options='options'>
                    <div class="submitNumber">已提交需求的医院共<span>{{result.hospitalNum}}</span>家</div>
                    <submit-hospital-req-info-item :result="val" v-for="(val,index) in lists" :key="index" :type='type'></submit-hospital-req-info-item>
                </cube-scroll>
            </div>
            <loading :show="loading" :text="loadIngTxt"></loading>
        </div>
    </div>
</template>
<script>
import Header from "../../components/header/header";
import selectPathNav from "../../components/common/selectPathNav";
import submitHospitalReqInfoItem from "../../components/common/submitHospitalReqInfoItem";
import { _getData } from "../../service/getData";
import noData from "../../components/noData/noData.vue";

export default {
  data() {
    return {
      lists: [],
      unit: "",
      loading: true,
      loadIngTxt: "Loading...",
      currentPage: 1,
      pageCount: 1,
      options: {
        pullUpLoad: {
          threshold: 0,
          txt: {
            more: "上拉加载更多",
            noMore: "全部数据加载完毕"
          }
        }
      }
    };
  },
  components: {
    Header,
    selectPathNav,
    submitHospitalReqInfoItem
  },
  props: ["type"],
  created() {
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
  methods: {
    pullUpLoad() {
      this.currentPage += 1;
      if (this.currentPage > this.pageCount) {
        this.$refs.scroll.forceUpdate();
        this.$nextTick(() => {
          this.$refs.scroll.refresh();
        });
        return;
      }
      setTimeout(() => {
        this.reqData().then(() => {
          this.$refs.scroll.forceUpdate();
          this.$refs.scroll.resetPullUpTxt();
        });
      }, 500);
    },
    async reqData() {
      await _getData(
        "/server_pro/groupPurchaseHospital!request.action",
        {
          method: "getDemandPageList",
          params: {
            groupPurchaseTypeId: this.$route.query.groupPurchaseTypeId,
            groupPurchaseId: this.$route.query.groupPurchaseId,
            productLineId: this.$route.query.productLineId,
            brandId: this.$route.query.brandId,
            aliasId: this.$route.query.aliasId,
            provinceId: this.$route.query.provinceId,
            currentPage: "1",
            countPerPage: 4
          }
        },
        data => {
          console.log(data);
          this.result = data;
          if (this.currentPage == 1) {
            this.lists = data.list;
          } else {
            this.lists = [...this.lists, ...data.list];
          }

          this.pageCount = data.pageCount;
        },
        err => {
          this.loadIngTxt = "网络错误，请稍后...";
          setTimeout(() => {
            this.loading = false;
          }, 1000);
        }
      ).then(() => {
        this.loading = false;

        this.$nextTick(() => {
          this.$refs.scroll.refresh();
        });
      });
    }
  },
  activated() {
    if (this.lists.length == 0) {
      this.reqData();
    }
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    console.log(to);
    console.log(from);
    if (to.name == "团购需求类型") {
      this.lists = [];
      this.currentPage = 1;
      this.pageCount = 1;
    }
    next();
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../../static/scss/_commonScss";
.container {
  @include basic_container_style;
  .content {
    /deep/ .selectedSort {
      margin: 10px 13px 0;
    }
    .scroll-list-wrap {
      height: calc(100% - 48px);
      /deep/ .cube-scroll-content {
        padding-bottom: 0 !important;
      }
    }
    .submitNumber {
      font-size: 12px;
      color: #999999;
      margin-bottom: 10px;
      line-height: 17px;
      text-align: center;
      font-family: PingFangSC-Medium;
      span {
        font-size: 12px;
        color: #151515;
        margin: 0 2px;
      }
    }
  }
}
</style>
