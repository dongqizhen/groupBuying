<template>
    <div class="container">
        <Header :isSearchHide="false" :title="this.$route.name">
            <span slot="explain" class="enter" @click="clickSure">确定</span>
        </Header>
        <div class="content">
            <search placeholder="请输入主营业务" v-on:valueChange="getValue"></search>
            <h2>可多选</h2>
            <div class="wrapper_box">
                <cube-scroll>
                    <ul>
                      <li v-for="item in mainBusinessList" :key="item.id"  @click="select(item)" :class="activeClass(item.id)">{{item.name}}</li>
                    </ul>
                </cube-scroll>
            </div>
        </div>
    </div>
</template>

<script>
import Header from "../../components/header/header";
import search from "../../components/search/search";
import { _getData } from "../../service/getData";
import { mapMutations } from "vuex";
import _ from "lodash";
export default {
  data() {
    return {
      searchValue: "",
      tempMainBusiness: { tempMainBusinessName: "", tempMainBusinessId: "" },
      mainBusiness: { mainBusinessName: "", mainBusinessId: "" },
      selectMainBusinessArr: [],
      mainBusinessList: [
        { name: "CT类", id: 286, productLineId: 264 },
        { name: "医用激光类", id: 287, productLineId: 265 },
        { name: "灯床塔等手术室设备类", id: 288, productLineId: 266 },
        {
          name: "检验室设备类（生化/免疫/临检类）",
          id: 289,
          productLineId: 267
        },
        { name: "普放类(DR/CR/数字胃肠机)", id: 285, productLineId: 268 }
      ]
    };
  },
  components: {
    Header,
    search
  },
  methods: {
    ...mapMutations(["setTransition", "selectMainBusiness"]),
    clickSure() {
      this.setTransition("turn-on");
      this.$router.go(-1);
      if (this.selectMainBusinessArr) {
        for (const val of this.selectMainBusinessArr) {
          this.tempMainBusiness.tempMainBusinessId += val.id + ",";
          this.tempMainBusiness.tempMainBusinessName += val.name + ",";
        }
      }
      if (this.searchValue) {
        this.mainBusiness.mainBusinessName =
          this.tempMainBusiness.tempMainBusinessName + this.searchValue;
        this.mainBusiness.mainBusinessId =
          this.tempMainBusiness.tempMainBusinessId + this.searchValue;
      } else {
        this.mainBusiness.mainBusinessName = this.tempMainBusiness.tempMainBusinessName.slice(
          0,
          this.tempMainBusiness.tempMainBusinessName.length - 1
        );
        this.mainBusiness.mainBusinessId = this.tempMainBusiness.tempMainBusinessId.slice(
          0,
          this.tempMainBusiness.tempMainBusinessId.length - 1
        );
      }
      this.selectMainBusiness(this.mainBusiness);
    },
    getValue(val) {
      console.log(val);
      this.searchValue = val;
    },
    select(item) {
      if (
        _.without(this.selectMainBusinessArr, item).length ==
        this.selectMainBusinessArr.length
      ) {
        this.selectMainBusinessArr.push(item);
      } else {
        this.selectMainBusinessArr = _.without(
          this.selectMainBusinessArr,
          item
        );
      }
    },
    activeClass(id) {
      if (this.selectMainBusinessArr) {
        for (const val of this.selectMainBusinessArr) {
          if (val.id == id) {
            return "active";
          }
        }
      }
    }
  },
  mounted() {
    _getData(
      "/server_pro/company!request.action",
      {
        method: "getProductLineList",
        params: {}
      },
      data => {
        console.log(data);
      }
    );
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
    padding: 13px;
    overflow: hidden;

    > h2 {
      height: 38px;
      display: flex;
      justify-content: flex-start;
      padding-left: 13px;
      align-items: center;
      font-family: PingFangSC-Regular;
      font-size: 13px;
      color: #666666;
    }
    .wrapper_box {
      background: #ffffff;
      box-shadow: 0.5px 1px 2px 0.5px rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      padding-left: 13px;
      height: calc(100% - 74px);
      ul {
        li {
          height: 46px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          border-bottom: 0.5px solid #f6f6f6;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #333333;
          &.active {
            color: #019ddd;
          }
          &:last-child {
            border-bottom: none;
          }
        }
      }
    }
  }
}
</style>
