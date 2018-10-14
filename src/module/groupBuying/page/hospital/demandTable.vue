<template>
    <div class="container demandTable">
        <Header title="需求清单">
            <!--  <router-link to="/submitGroupDemand" slot="explain" @click.native="setTransition('turn-on')">上传</router-link> -->
        </Header>
        <div class="content">
            <div v-if="hasNet">
                <type-scroll-nav-bar :typeData="typeData" :slectedTypeKeyWord="slectedTypeKeyWord" v-on:typeNavChange="TypeNavChange"></type-scroll-nav-bar>
                <div class="scroll-list-wrap">
                    <cube-scroll v-if="hasData">
                        <div v-for="(val,index) in demandListData" :key="index" class="demandList-container" @click="handleClick(val.id,slectedTypeKeyWord)">
                            <budget-count :demandListData="val" :slectedTypeKeyWord="slectedTypeKeyWord"></budget-count>
                            <demand-list pageName="hospitalProfile" :data="val" :slectedTypeKeyWord="slectedTypeKeyWord"></demand-list>
                        </div>
                    </cube-scroll>

                    <no-data v-else></no-data>
                </div>
            </div>

            <no-net v-else v-on:refresh="getData"></no-net>
        </div>
    </div>
</template>

<script>
import Header from "../../components/header/header";
import { _getData } from "../../service/getData";
import { mapMutations } from "vuex";
import noData from "../../components/noData/noData";
import noNet from "../../components/noNet/noNet.vue";
import typeScrollNavBar from "../../components/common/typeScrollNavBar.vue";
import budgetCount from "../../components/common/budgetCount";
import demandList from "../../components/common/demandList";
import _ from "lodash";
export default {
  data() {
    return {
      hasData: true,
      hasNet: true,
      typeData: [],
      slectedTypeKeyWord: "",
      demandListData: {},
      list: []
    };
  },
  components: {
    Header,
    noData,
    noNet,
    typeScrollNavBar,
    budgetCount,
    demandList
  },

  deactivated() {
    //this.$destroy();
  },
  activated() {
    this.getData();
  },
  methods: {
    ...mapMutations(["setTransition"]),
    getData() {
      _getData(
        "/server_pro/groupPurchaseHospital!request.action",
        {
          method: "getDemandListByHospitalId",

          params: { hospitalId: this.$route.query.id }
        },
        data => {
          this.hasNet = true;
          this.list = data.list;
          this.hasData = data.list.length > 0;
          if (this.list.length != 0) {
            if (_.isEmpty(this.demandListData)) {
              this.demandListData = data.list[0].demandList;
              this.typeData = _.map(data.list, "name");
              this.slectedTypeKeyWord =
                this.slectedTypeKeyWord == ""
                  ? this.typeData[0]
                  : this.slectedTypeKeyWord;
              console.log(this.typeData);
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
        },
        err => {
          this.hasNet = false;
        }
      );
    },
    TypeNavChange(val) {
      console.log(val, this.list);
      this.slectedTypeKeyWord = val;
      this.demandListData = _.find(this.list, { name: val }).demandList;
      console.log(this.demandListData);
    },
    handleClick(id, key) {
      this.setTransition("turn-on");
      this.$router.push({
        path: "submitGroupDemand",
        query: { id: id }
      });
    }
  }
};
</script>

<style lang="scss"  scoped>
@import "../../../../../static/scss/_commonScss";
.container {
  @include basic_container_style;
  .content {
    > div {
      display: flex;
      height: 100%;
      flex-direction: column;
    }
    padding-top: 0;
    .scroll-list-wrap {
      height: calc(100% - 57px);
      /deep/ ._v-content {
        .demandList-container {
          background: #ffffff;
          @include box_shadow_style;
          margin-bottom: 10px;
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
      /deep/ .cube-scroll-wrapper {
        /*  height: 100%;*/
        //padding-bottom: 10px;
        .cube-scroll-content {
          min-height: calc(100% + 1px);
          padding: 10px 13px;
          padding-bottom: 0;
          .demandList-container {
            background: #ffffff;
            @include box_shadow_style;
            margin-bottom: 10px;
          }
        }
      }
      /deep/ .cube-swipe {
        > ul {
          > li {
            height: 68px;

            background: #fff;
            margin-bottom: 10px;
            @include box_shadow_style;
            > a {
              display: flex;
              padding: 13px 0;
              width: 100%;
              text-decoration: none;
            }
            .cube-swipe-item {
              height: 100%;
              display: flex;
              justify-content: flex-start;
              width: 100%;
              .item-inner {
                height: 100%;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                width: 100%;
                padding: 0 13px;
                .icon {
                  display: flex;
                  justify-content: flex-start;
                  align-items: center;
                  img {
                    width: 42px;
                    height: 42px;
                  }
                }
                .text {
                  font-family: PingFangSC-Regular;
                  font-size: 14px;
                  color: #333333;
                  margin-left: 16px;
                  line-height: 18px;
                }
              }
              .cube-swipe-btns {
                li {
                  height: 68px;
                  //left: calc(100% + 13px);
                  padding: 0;
                  top: -13px;
                  width: 120px;
                  span {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-family: PingFangSC-Regular;
                    font-size: 16px;
                    color: #ffffff;
                    letter-spacing: 0;
                    text-align: right;
                  }
                }
              }
            }
            &:last-child {
              margin-bottom: 0;
            }
          }
        }
      }
    }
  }
}
</style>
