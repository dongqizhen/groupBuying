<template>
  <div class="container">
    <Header title="团购详情" :isSearchHide="true"></Header>
    <div class="content">
      <cube-scroll ref="scroll">
        <div class="wrapper">
          <div class="basic_information">
            <basic-title title="团购基本信息" imgurl="../static/images/groupBuy.png"></basic-title>
            <list-item></list-item>
          </div>
          <div class="hospitalNeeds">
            <h2>
              <span></span>
              团购大会列表
              <span></span>
            </h2>
            <span>企业用户查看</span>
            <ul>
              <router-link tag="li" :to="{ path: 'groupDemand', query: { groupID: val.id }}" v-for="(val,index) in GroupList" :key="index" @click.native="setTransition('turn-on')">
                <a>
                  <i><img :src="val.imgurl" alt=""></i>
                  {{val.name}}
                  <span>已有
                    <a>{{val.num}}</a>家医院提交团购需求
                  </span>
                </a>
              </router-link>

            </ul>
          </div>
          <div class="Enterprise_Product">
            <h2>
              <span></span>
              企业产品
              <span></span>
            </h2>
            <span>医院用户查看</span>
            <ul class="nav">
              <touch-ripple :speed="1" :opacity="0.3" color="#ccc" transition="ease">
                <li class="active">设备团购</li>
              </touch-ripple>
              <touch-ripple :speed="1" :opacity="0.3" color="#ccc" transition="ease">
                <li @click="handleClickEvent">设备团购</li>
              </touch-ripple>
              <li>设备团购</li>
              <li>设备团购</li>
              <li>设备团购</li>
              <li>设备团购</li>
            </ul>
            <div class="subscription">
              <h3>
                <p>设备团购产品清单</p>
                <router-link to="/groupClassification" @click.native="clickLink">
                  <span>查看全部 (150款)
                    <i></i>
                  </span>
                </router-link>
              </h3>
              <ul class="type">
                <router-link tag="li" :to="{ path: 'groupInventory', query: { groupInventoryID: inventoryItem.id }}" v-for="(inventoryItem,index) in groupInventoryList" :key="index" @click.native="setTransition('turn-on')">
                  <a>
                    {{inventoryItem.name}}
                    <span>{{inventoryItem.num}}款</span>
                  </a>
                </router-link>
              </ul>
            </div>
            <div class="brand">
              <h2>设备团购入围品牌</h2>
              <ul>
                <li>
                  <span>品牌</span>
                  <span>团购占有率</span>
                  <span>市场保有率</span>
                  <span>售后排名</span>
                </li>
                <li>
                  <span>GE</span>
                  <span>35%</span>
                  <span>35%</span>
                  <span>35%</span>
                </li>
                <li>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </li>
                <li>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </li>
                <li>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </li>
                <li>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </cube-scroll>
    </div>

  </div>
</template>

<script>
  import Header from "../components/header/header";
  import ListItem from "../components/common/listItem";
  import basicTitle from "../components/common/basicTitle";
  import { mapMutations } from "vuex";
  const GroupList = [
      {
          imgurl: "../static/images/equipment.png",
          name: "设备团购 (600台)",
          num: 12,
          id: 1
      },
      {
          imgurl: "../static/images/consumable.png",
          name: "耗材团购 (389单)",
          num: 12,
          id: 2
      },
      {
          imgurl: "../static/images/afterSale.png",
          name: "售后团购 (167台)",
          num: 12,
          id: 3
      },
      {
          imgurl: "../static/images/informatization.png",
          name: "信息化团购 (398单)",
          num: 12,
          id: 4
      },
      {
          imgurl: "../static/images/finance.png",
          name: "金融团购 (183单)",
          num: 12,
          id: 5
      },
      {
          imgurl: "../static/images/counsel.png",
          name: "咨询团购 (45家)",
          num: 12,
          id: 6
      }
  ];
  const groupInventoryList = [
      {
          name: "CT类",
          num: 12,
          id: 1
      },
      {
          name: "核磁共振MRI类",
          num: 99,
          id: 2
      },
      {
          name: "血管造影机",
          num: 99,
          id: 3
      }
  ];
  export default {
      data() {
          return { GroupList, groupInventoryList };
      },
      components: {
          Header,
          ListItem,
          basicTitle
      },
      methods: {
          ...mapMutations(["setTransition"]),
          handleClickEvent() {
              alert();
          },
          clickLink() {
              this.$store.commit("setTransition", "turn-on");
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
              padding: 10px 13px;
          }
          .basic_information {
              height: 219px;
              background: #ffffff;
              box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
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
                  padding: 0 18px;
                  li {
                      height: 100px;
                      width: 148px;
                      background: #ffffff;
                      border: 0.5px solid rgba(1, 157, 221, 0.12);
                      box-shadow: 0.5px 2px 4px 0.5px rgba(1, 157, 221, 0.09);
                      border-radius: 5px;
                      margin-bottom: 16px;
                      display: flex;

                      font-family: PingFangSC-Medium;
                      font-size: 12px;
                      color: #333333;
                      letter-spacing: 0;
                      > a {
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
                              font-size: 10px;
                              margin-top: 6px;
                              color: #999999;
                              display: flex;
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
                      padding: 0 13px;
                      justify-content: space-between;
                      li {
                          height: 50px;
                          width: 103px;
                          background: #ffffff;
                          border: 0.5px solid rgba(1, 157, 221, 0.12);
                          box-shadow: 0.5px 2px 4px 0.5px rgba(1, 157, 221, 0.09);
                          border-radius: 5px;
                          margin-bottom: 15px;
                          display: flex;

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
                          height: 52px;
                          align-items: center;
                          border-bottom: 1px solid #e9e9e9;
                          // justify-content: space-between;
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
                              font-family: PingFangSC-Medium;
                              font-size: 14px;
                              color: #333333;
                              &:first-child {
                                  width: 123px;
                              }
                              &:nth-child(2) {
                                  width: 60px;
                                  margin-right: 23px;
                              }
                              &:nth-child(3) {
                                  width: 60px;
                              }
                              &:last-child {
                                  width: 83px;
                              }
                          }
                      }
                  }
              }
          }
      }
  }
</style>
