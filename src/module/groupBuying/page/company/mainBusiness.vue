<template>
  <div class="container">
    <Header :isSearchHide="false" :title="this.$route.name">
      <span slot="explain" class="enter" @click="clickSure">确定</span>
    </Header>
    <div class="content">
      <div class="selected">
        <h2>已选主营业务:</h2>
        <ul v-if="selectMainBusinessArr.length">
          <li v-for="(item,index) in selectMainBusinessArr" :key="item.id">
            <span>{{item.name}}</span>
            <i @click="deleteItem(index)"></i>
          </li>
        </ul>
      </div>
      <search placeholder="请输入主营业务" v-on:saveValue="saveValue" v-on:inputValue="getValue" isShowSave="true"></search>
      <div class="wrapper_box">
        <cube-index-list :data="mainBusinessList">
          <cube-index-list-group v-for="(group, index) in mainBusinessList" :key="index" :group="group">
            <cube-index-list-item v-for="(item, index) in group.items" :key="index" :item="item" @select="select">
              <div class="custom-item" :class="activeClass(item.id)">{{item.name}}</div>
            </cube-index-list-item>
          </cube-index-list-group>
        </cube-index-list>
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
  import { Toast } from "vant";
  export default {
      data() {
          return {
              selectMainBusinessArr: [],
              mainBusinessList: []
          };
      },
      components: {
          Header,
          search
      },
      methods: {
          ...mapMutations(["setTransition", "selectMainBusiness"]),
          clickSure() {
              this.setTransition("turn-off");
              this.selectMainBusiness(this.selectMainBusinessArr);
              this.$router.go(-1);
          },
          deleteItem(i) {
              console.log(i);
              this.selectMainBusinessArr.splice(i, 1);
          },
          getValue(val) {
              this.reqData(val);
          },
          saveValue(val) {
              console.log(val);
              var mainBusinessSelectCommon = _.find(
                  this.selectMainBusinessArr,
                  function(o) {
                      return o.name.toUpperCase() === val.toUpperCase();
                  }
              );
              let modelListCommon = _.find(this.mainBusinessList, function(o) {
                  return _.find(o.items, function(item) {
                      return item.name.toUpperCase() == val.toUpperCase();
                  });
              });
              console.log(modelListCommon);
              if (this.selectMainBusinessArr.length === 3) {
                  Toast({ message: "最多选择三个主营业务", duration: 1000 });
                  return;
              } else {
                  if (!mainBusinessSelectCommon && !modelListCommon) {
                      this.selectMainBusinessArr.push({ id: "", name: val });
                  } else {
                      if (!mainBusinessSelectCommon && modelListCommon) {
                          this.selectMainBusinessArr.push(modelListCommon);
                      } else if (mainBusinessSelectCommon) {
                          Toast({
                              message: "已选相同主营业务，请勿重复选择",
                              duration: 1000
                          });
                          return;
                      }
                  }
              }
          },
          select(item) {
              let changeItem = _.find(this.selectMainBusinessArr, function(o) {
                  return o.id == item.id;
              });
              if (this.selectMainBusinessArr.length < 3) {
                  if (
                      _.without(this.selectMainBusinessArr, changeItem).length ==
                      this.selectMainBusinessArr.length
                  ) {
                      this.selectMainBusinessArr.push(item);
                  } else {
                      this.selectMainBusinessArr = _.without(
                          this.selectMainBusinessArr,
                          changeItem
                      );
                  }
              } else if (this.selectMainBusinessArr.length == 3) {
                  this.selectMainBusinessArr = _.without(
                      this.selectMainBusinessArr,
                      changeItem
                  );
                  if (this.selectMainBusinessArr.length == 3) {
                      Toast({ message: "最多选择三个主营业务", duration: 1000 });
                      return;
                  }
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
          },
          reqData(name) {
              _getData(
                  "/server_pro/mainBussiness!request.action",
                  {
                      method: "getAppPageMainBusinessList",
                      params: {
                          name: name
                      }
                  },
                  data => {
                      console.log(data);
                      this.mainBusinessList = data.list;
                  }
              );
          }
      },
      activated() {
          console.log(this.$route.query.vuexValue);
          this.selectMainBusinessArr = this.$route.query.vuexValue;
          this.reqData();
      },
      deactivated() {
          // this.$destroy();
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
          padding: 10px 13px;
          overflow: hidden;
          .selected {
              height: 77px;
              background: #ffffff;
              border-radius: 5px;
              margin-bottom: 10px;
              h2 {
                  height: 36px;
                  padding-left: 13px;
                  font-family: PingFangSC-Regular;
                  font-size: 14px;
                  color: #666666;
                  display: flex;
                  align-items: center;
              }
              ul {
                  display: flex;
                  justify-content: flex-start;
                  padding: 0 13px;
                  li {
                      height: 30px;
                      border: 0.5px solid #999999;
                      border-radius: 7px;
                      display: flex;
                      align-items: center;
                      font-family: PingFangSC-Regular;
                      font-size: 13px;
                      color: #666666;
                      width: 103px;
                      padding-left: 10px;
                      margin-right: 5px;
                      &.disabled {
                          color: #cccccc;
                          border-color: #ccc;
                          > i {
                              pointer-events: none;
                          }
                      }
                      > span {
                          //display: flex;
                          width: 70px;
                          height: 100%;
                          display: inline-block;
                          overflow: hidden;
                          white-space: nowrap;
                          text-overflow: ellipsis;
                          line-height: 30px;
                      }
                      i {
                          display: flex;
                          width: 20px;
                          height: 20px;
                          border-radius: 20px;
                          background: url("../../../../assets/images/del.png")
                              no-repeat center center;
                          background-size: 12px 12px;
                          //padding-left: 14.5px;
                          justify-content: center;
                          &:active {
                              background-color: rgba($color: #999, $alpha: 0.3);
                          }
                      }
                  }
              }
          }

          .wrapper_box {
              margin-top: 10px;
              @include box_shadow_style;
              height: calc(100% - 87px - 46px);
              padding-top: 0.1px;
              > h2 {
                  font-family: PingFangSC-Regular;
                  font-size: 14px;
                  color: #cccccc;
                  height: 40px;
                  display: flex;
                  align-items: center;
                  padding-left: 13px;
                  border-bottom: $border_style;
                  justify-content: flex-start;
                  span {
                      font-size: 12px;
                      display: flex;
                      justify-content: flex-start;
                  }
              }
              /deep/ .cube-index-list {
                  // height: calc(100% - 40px);
                  border-radius: 5px;
                  .cube-index-list-fixed {
                      display: none;
                  }
                  .cube-index-list-content {
                      > ul {
                          border-radius: 5px;
                          .cube-index-list-group {
                              h2 {
                                  display: none;
                              }
                              > ul {
                                  li {
                                      height: 46px;
                                      border-bottom: $border_style;
                                      padding-left: 0;
                                      margin-left: 13px;
                                      display: flex;
                                      align-items: center;
                                      > div {
                                          padding-left: 0;
                                          font-family: PingFangSC-Regular;
                                          font-size: 14px;
                                          color: #333333;
                                          &.active {
                                              color: #019ddd;
                                          }
                                      }
                                      &.disabled {
                                          pointer-events: none;
                                          > div {
                                              color: #cccccc;
                                          }
                                      }
                                  }
                              }
                              &:last-child {
                                  ul > li:last-child {
                                      border-bottom: 0;
                                  }
                              }
                          }
                      }
                  }
                  .cube-index-list-nav {
                      ul {
                          li {
                              font-family: PingFangSC-Medium;
                              font-size: 11px;
                              color: #999999;
                              padding-right: 4px;
                              &.active {
                                  color: #019ddd;
                              }
                          }
                      }
                  }
              }
          }
          // .wrapper_box {
          // background: #ffffff;
          // box-shadow: 0.5px 1px 2px 0.5px rgba(0, 0, 0, 0.1);
          // border-radius: 5px;
          // padding-left: 13px;
          // height: calc(100% - 74px);
          // ul {
          //   li {
          //     height: 46px;
          //     display: flex;
          //     justify-content: flex-start;
          //     align-items: center;
          //     border-bottom: 0.5px solid #f6f6f6;
          //     font-family: PingFangSC-Regular;
          //     font-size: 14px;
          //     color: #333333;
          //     &.active {
          //       color: #019ddd;
          //     }
          //     &:last-child {
          //       border-bottom: none;
          //     }
          //   }
          // }
          // }
      }
  }
</style>
