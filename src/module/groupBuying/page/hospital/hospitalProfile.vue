<template>
  <div class="container">
    <Header title="医院介绍">
      <router-link :to="{path:'hospitalSeal',query:{id:$route.query.id}}" slot="explain" @click.native="setTransition('turn-on')">编辑</router-link>
    </Header>
    <div class="content">
      <div class="scroll-list-wrap">
        <cube-scroll ref="scroll">
          <basic-information type="hospital" :detailData="detailData" title="医院基本信息" isShowCheck></basic-information>
          <div class="Personal_information">
            <basic-title title="团购负责人信息" imgurl="../static/images/Personal_information.png">
              <span slot="check" @click="packUp" v-if="isShowBtn">{{btnText!=0?'展开':'收起'}}</span>
            </basic-title>

            <personal-information :read="true" :disabled="true" :data="detailData.contactList" ref="Personal_information"></personal-information>

          </div>
          <div class="hospitalDetails">
            <basic-title title="医院详细介绍" imgurl="../static/images/hospitalDetails.png"></basic-title>
            <div class="main_content">
              {{detailData.introduce}}
            </div>
          </div>
          <div class="product_list" v-if="this.list.length!=0">
            <div class="list_container">
              <basic-title title="团购需求列表" imgurl="../static/images/product_list.png"></basic-title>
              <type-scroll-nav-bar :typeData="typeData" :slectedTypeKeyWord="slectedTypeKeyWord" v-on:typeNavChange="TypeNavChange"></type-scroll-nav-bar>
            </div>

            <div v-for="(val,index) in demandListData" :key="index" class="demandList-container" @click="handleClick(val.id)">
              <budget-count :demandListData="val" :slectedTypeKeyWord="slectedTypeKeyWord"></budget-count>
              <demand-list pageName="hospitalProfile" :data="val" :slectedTypeKeyWord="keyWords"></demand-list>
            </div>

          </div>
        </cube-scroll>
      </div>

    </div>
  </div>
</template>

<script>
import Header from "../../components/header/header";
import basicInformation from "../../components/common/basicInformation";
import basicTitle from "../../components/common/basicTitle";
import typeScrollNavBar from "../../components/common/typeScrollNavBar";
import modelScrollNavBar from "../../components/common/modelScrollNavBar";
import productList from "../../components/common/productList";
import personalInformation from "../../components/common/personalInformation";
import { mapMutations } from "vuex";
import { _getData } from "../../service/getData";
import budgetCount from "../../components/common/budgetCount";
import demandList from "../../components/common/demandList";
import _ from "lodash";
export default {
  data() {
    return {
      list: [],
      demandListData: {},
      detailData: {},
      disabled: true,
      isRequested: false,
      isShowBtn: false,
      btnText: 0,
      parentHeight: "",
      typeData: [],
      slectedTypeKeyWord: ""
    };
  },
  components: {
    Header,
    basicInformation,
    basicTitle,
    typeScrollNavBar,
    modelScrollNavBar,
    productList,
    personalInformation,
    budgetCount,
    demandList
  },
  methods: {
    ...mapMutations(["setTransition"]),
    packUp() {
      console.log(this.parentHeight);
      const childHeight = this.$refs.Personal_information.$el.childNodes[0]
        .clientHeight; //第一个子元素的高度

      if (this.btnText == 0) {
        this.btnText = 1;

        this.$refs.Personal_information.$el.style.height = childHeight + "px";
      } else {
        this.btnText = 0;
        this.$refs.Personal_information.$el.style.height =
          this.parentHeight + "px";
      }
      // console.log(this.$refs.scroll);

      setTimeout(() => {
        this.$refs.scroll.refresh();
      }, 300);
    },
    TypeNavChange(val) {
      console.log(val, this.list);
      this.slectedTypeKeyWord = val;
      this.demandListData = _.find(this.list, { name: val }).demandList;
      console.log(this.demandListData);
    },
    handleClick(id) {
      this.setTransition("turn-on");
      this.$router.push({
        path: `/GroupRequireDetails/${this.keyWords}`,
        query: { id: id }
      });
    }
  },
  // activated() {},
  computed: {
    keyWords() {
      switch (this.slectedTypeKeyWord) {
        case "设备团购":
          return "SBTG";
        case "售后团购":
          return "SHTG";
        case "咨询团购":
          return "ZXTG";
        case "金融团购":
          return "JRTG";
        case "信息化团购":
          return "XXHTG";
        case "耗材团购":
          return "HCTG";
        default:
          return;
      }
    }
  },
  activated() {
    _getData(
      "/server_pro/groupPurchaseHospital!request.action",
      {
        method: "getAppGroupPurchaseHospitalInfo",
        params: { id: this.$route.query.id }
      },
      data => {
        this.isRequested = true;
        console.log(data);
        this.detailData = data;
        console.log(this.detailData);
        if (data.contactList.length > 1) {
          this.isShowBtn = true;
        }
      }
    );
    _getData(
      "/server_pro/groupPurchaseHospital!request.action",
      {
        method: "getDemandListByHospitalId",

        params: { hospitalId: this.$route.query.id }
      },
      data => {
        console.log(data);
        this.list = data.list;
        if (this.list.length != 0) {
          // this.demandListData = data.list[0].demandList;
          // this.typeData = _.map(data.list, "name");
          // this.slectedTypeKeyWord = this.typeData[0];
          // console.log(this.typeData);
          if (_.isEmpty(this.demandListData)) {
            this.demandListData = data.list[0].demandList;
            this.typeData = _.map(data.list, "name");
            this.slectedTypeKeyWord =
              this.slectedTypeKeyWord == ""
                ? this.typeData[0]
                : this.slectedTypeKeyWord;
            console.log(this.typeData);
            console.log(this.slectedTypeKeyWord);
          } else {
            this.typeData = _.map(data.list, "name");
            this.demandListData = _.isEmpty(
              _.filter(data.list, {
                name: this.slectedTypeKeyWord
              })
            )
              ? _.filter(data.list, {
                  name: this.typeData[0]
                })[0].demandList
              : _.filter(data.list, {
                  name: this.slectedTypeKeyWord
                })[0].demandList;

            this.slectedTypeKeyWord = _.isEmpty(
              _.filter(data.list, {
                name: this.slectedTypeKeyWord
              })
            )
              ? this.typeData[0]
              : this.slectedTypeKeyWord;
            console.log(this.demandListData);
            console.log(this.slectedTypeKeyWord);
          }
        }
      }
    ).then(() => {
      this.$nextTick(() => {
        this.$refs.scroll.refresh();
      });
    });

    setTimeout(() => {
      if (this.parentHeight == "") {
        this.parentHeight = this.$refs.Personal_information.$el.clientHeight;
        this.$refs.Personal_information.$el.style.height =
          this.parentHeight + "px";
      }
    }, 500);
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../../static/scss/_commonScss";
.container {
  @include basic_container_style;
  /deep/ header {
    .search {
      a {
        font-size: 16px;
        color: #019ddd;
        font-family: PingFangSC-Regular;
      }
    }
  }
  .content {
    /deep/ .basicInformation {
      .content_box {
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
            }
          }
        }
      }
    }
    .Personal_information {
      @include box_shadow_style;
      margin-top: 10px;
      overflow: hidden;
      height: auto;
      /deep/ .basicTitle {
        h2 {
          span {
            font-size: 13px;
            color: #333333;
            font-family: PingFangSC-Regular;
          }
        }
      }
      /deep/ .personalInformation {
        height: auto;
        transition: height 0.3s;
      }
    }
    .hospitalDetails {
      @include box_shadow_style;
      margin-top: 10px;
      .main_content {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #666666;
        line-height: 21px;
        padding: 10px 13px;
      }
    }
    .product_list {
      @include box_shadow_style;
      background: #f6f6f6;
      margin-top: 10px;
      .list_container {
        @include box_shadow_style;
      }
      .demandList-container {
        @include box_shadow_style;
        margin-top: 10px;
      }
    }
  }
}
</style>
