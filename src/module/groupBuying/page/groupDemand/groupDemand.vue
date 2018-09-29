<template>
    <div class="container groupDemand">
        <Header :title="`${title}需求`"></Header>
        <div class="content">
            <scroll-tab :DATA_MAP="DATA_MAP" :selectedId="selectedId" v-on:selectLabel="selectLabel">
                <div slot="right-panel-container">
                    <h2>
                        <span>按地区</span>
                        <span>台件数</span>
                        <span></span>
                    </h2>
                    <div class="cancelTop">
                      <ul>
                        <li @click="selectItem({provinceName:'全国',demondNum:totalNum})">
                          <span>全国总计</span>
                          <span>{{totalNum}}</span>
                          <span></span>
                        </li>
                        <li v-for="item in provinceList" :key="item.id" @click="selectItem(item)">
                          <span>{{item.provinceName}}</span>
                          <span>{{item.demondNum}}</span>
                          <span @click.stop="cancelTop(item)"><a>取消置顶</a></span>
                        </li>
                      </ul>
                    </div>
                    <cube-index-list :data="wzdProvinceList" >
                        <cube-index-list-group v-for="(group, index) in wzdProvinceList" :key="index" :group="group">
                            <cube-index-list-item v-for="(item, index) in group.items" :key="index" :item="item" @select="selectItem">
                                <div class="custom-item">
                                    <span>{{item.provinceName}}</span>
                                    <span>{{item.demondNum}}</span>
                                    <span @click.stop="sureTop(item)">
                                        <a>置顶</a>
                                    </span>
                                </div>
                            </cube-index-list-item>
                        </cube-index-list-group>
                    </cube-index-list>
                </div>
            </scroll-tab>
        </div>
    </div>
</template>

<script>
import Header from "../../components/header/header";
import scrollTab from "../../components/scrollTab/scrollTab";
import { mapMutations } from "vuex";
import { _getData } from "../../service/getData";
import _ from "lodash";
export default {
  data() {
    return {
      DATA_MAP: [],
      selectedId: "",
      selectedLabel: "",
      totalNum: "",
      title: "",
      wzdProvinceList: [],
      provinceList: []
    };
  },
  components: {
    Header,
    scrollTab
  },
  methods: {
    ...mapMutations(["setTransition"]),
    selectItem(item) {
      //console.log(item);
      this.$router.push({
        path: "groupDemandDetails",
        query: {
          productLineId: this.selectedId,
          productLineName: this.selectedLabel.substring(
            0,
            this.selectedLabel.indexOf("(")
          ),
          provinceId: item.provinceId,
          provinceName: item.provinceName,
          totalNum: item.demondNum,
          title: this.title,
          groupPurchaseTypeId: this.$route.query.groupPurchaseTypeId,
          groupPurchaseId: this.$route.query.groupPurchaseId
        }
      });
      this.setTransition("turn-on");
    },
    cancelTop(val) {
      this.setTopFun(val.id, 0);
    },
    sureTop(val) {
      this.setTopFun(val.id, 1);
    },
    selectLabel(val) {
      var selectValue = _.find(this.DATA_MAP, o => {
        return o.name === val;
      });
      this.selectedLabel = val;
      this.selectedId = selectValue.id;
      this.provinceList = selectValue.provinceList;
      this.wzdProvinceList = selectValue.wzdProvinceList;
      this.totalNum = selectValue.totalNum;
    },
    reqData() {
      _getData(
        "/server_pro/groupPurchaseHospital!request.action",
        {
          method: "getDemondNumByGroupPurchaseType",
          params: {
            groupPurchaseTypeId: this.$route.query.groupPurchaseTypeId,
            groupPurchaseId: this.$route.query.groupPurchaseId
          }
        },
        data => {
          console.log("团购需求数据:", data);
          this.DATA_MAP = data.list;
          this.title = data.title;
          if (this.selectedId) {
            var selectTabArr = _.find(data.list, o => {
              return o.id == this.selectedId;
            });
            this.selectedLabel = selectTabArr.name;
            this.selectedId = selectTabArr.id;
            this.totalNum = selectTabArr.totalNum;
            this.provinceList = selectTabArr.provinceList;
            this.wzdProvinceList = selectTabArr.wzdProvinceList;
          } else {
            this.selectedLabel = data.list[0].name;
            this.selectedId = data.list[0].id;
            this.selectedLabel = data.list[0].name;
            this.selectedId = data.list[0].id;
            this.totalNum = data.list[0].totalNum;
            this.provinceList = data.list[0].provinceList;
            this.wzdProvinceList = data.list[0].wzdProvinceList;
          }
        }
      );
    },
    setTopFun(id, flag) {
      _getData(
        "/server_pro/groupPurchaseHospital!request.action",
        {
          method: "setTop",
          params: {
            id: id,
            flag: flag
          }
        },
        data => {
          this.reqData();
        }
      );
    }
  },
  created() {
    this.reqData();
  },
  watch: {
    selectedLabel() {},
    DATA_MAP() {
      this.wzdProvinceList = _.find(this.DATA_MAP, o => {
        return o.name === this.selectedLabel;
      }).wzdProvinceList;
      this.provinceList = _.find(this.DATA_MAP, o => {
        return o.name === this.selectedLabel;
      }).provinceList;
    },
    totalNum() {},
    title() {}
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
  .content {
    /deep/ .right-panel {
      > .cube-scroll-wrapper {
        > .cube-scroll-content {
          height: 100%;
          .cube-scroll-list-wrapper {
            height: 100%;
            .cancelTop {
              background-color: rgba(126, 211, 33, 0.04);
              ul {
                li {
                  height: 46px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  border-bottom: #f6f6f6 0.5px solid;
                  &:first-child {
                    background-color: #fff;
                    span {
                      font-family: PingFangSC-Medium;
                      font-size: 14px;
                      color: #333333;
                    }
                  }
                  span {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-family: PingFangSC-Regular;
                    font-size: 14px;
                    color: #333333;
                    height: 100%;
                    &:first-child {
                      flex: 1;
                      justify-content: flex-start;
                      padding-left: 13px;
                    }
                    &:nth-child(2) {
                      flex: 0.5;
                    }
                    &:last-child {
                      flex: 0.7;
                      justify-content: flex-end;
                      a {
                        text-decoration: none;
                        font-size: 12px;
                        padding-right: 15px;
                        color: #999999;
                      }
                    }
                  }
                }
              }
            }
            > div {
              height: 100%;
              > h2 {
                height: 42px;
                border-bottom: 0.5px solid #f6f6f6;
                display: flex;
                > span {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-family: PingFangSC-Regular;
                  font-size: 14px;
                  color: #999999;
                  &:first-child {
                    flex: 1;
                    padding-left: 13px;
                    justify-content: flex-start;
                  }
                  &:nth-child(2) {
                    flex: 0.5;
                  }
                  &:last-child {
                    flex: 0.7;
                  }
                }
              }
              > .cube-index-list {
                height: calc(100% - 42px);
                > .cube-index-list-nav {
                  display: none;
                }
                > .cube-scroll-wrapper {
                  .cube-index-list-group {
                    > h2 {
                      padding: 0;
                      height: 30px;
                      padding-left: 13px;
                      font-family: PingFangSC-Regular;
                      font-size: 16px;
                      color: #019ddd;
                      background: rgba(1, 157, 221, 0.03);
                      display: flex;
                      align-items: center;
                    }
                    > ul {
                      > li {
                        height: 46px;
                        border-bottom: #f6f6f6 0.5px solid;
                        &:last-child {
                          border-bottom: 0;
                        }
                        .custom-item {
                          height: 100%;
                          display: flex;
                          span {
                            align-items: center;
                            justify-content: center;
                            display: flex;
                            font-family: PingFangSC-Regular;
                            font-size: 14px;
                            color: #333333;
                            &:first-child {
                              justify-content: flex-start;
                              padding-left: 13px;
                              flex: 1;
                            }
                            &:nth-child(2) {
                              color: #999999;
                              flex: 0.5;
                            }
                            &:last-child {
                              font-family: PingFangSC-Regular;
                              font-size: 12px;
                              color: #019ddd;
                              justify-content: flex-end;
                              // padding-right: 15px;
                              flex: 0.7;
                              a {
                                text-decoration: none;
                                padding: 3px 15px;
                                color: #019ddd;
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
                > .cube-index-list-fixed {
                  padding: 0;
                  height: 30px;
                  padding-left: 13px;
                  font-family: PingFangSC-Regular;
                  font-size: 16px;
                  color: #019ddd;
                  background: rgba(1, 157, 221, 0.03);
                  display: flex;
                  align-items: center;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
