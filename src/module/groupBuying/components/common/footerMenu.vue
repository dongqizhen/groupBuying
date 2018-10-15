

<template>
  <div class="footerMenu">
    <cube-tab-bar v-model="selectedLabelDefault" @click="clickHandler" @change="changeHandler">
      <cube-tab v-for="(item, index) in tabs" :label="item.label" :key="item.label" :class="index==2&&num%2==0?'active':''">
        <!-- name为icon的插槽 -->
        <i slot="icon" :class="item.icon"></i>
        <!-- 默认插槽 -->
        {{item.label}}
      </cube-tab>
    </cube-tab-bar>
    <!-- <ul>
      <router-link tag="li" :to="{ path: 'productDetails', query: { shopID: 1 }}" @click.native="clickLink">
        <div><img src="../../../../../static/images/shop.png"></div>
        <div class="itemName">查看商家</div>
      </router-link>
      <li>
        <div><img src="../../../../../static/images/email.png"></div>
        <div class="itemName">私信商家</div>
      </li>
      <li @click="store">
        <div><img src="../../../../../static/images/store.png"></div>
        <div class="itemName">收藏</div>
      </li>
      <router-link tag="li" :to="{ path: 'submitGroupDemand', query: { hospitalID: 1 }}" @click.native="clickLink">
        <div class="itemName">加入我的团购需求表</div>
      </router-link>
    </ul> -->
  </div>
</template>

<script>
  import { directMessages } from "../mixin/mixin";
  export default {
      data() {
          return {
              selectedLabelDefault: "",
              tabs: [
                  {
                      label: "查看商家",
                      icon: "scanShop"
                  },
                  {
                      label: "私信商家",
                      icon: "emailShop"
                  },
                  {
                      label: "收藏",
                      icon: "store"
                  },
                  {
                      label: "加入我的团购需求表",
                      icon: "demandTable"
                  }
              ],
              lists: [
                  {
                      id: 1,
                      path: "productDetails",
                      imgUrl: "../../../../../static/images/shop.png",
                      name: "查看商家"
                  },
                  {
                      id: 2,
                      path: "",
                      imgUrl: "../../../../../static/images/email.png",
                      name: "私信商家"
                  },
                  {
                      id: 3,
                      path: "",
                      imgUrl: "../../../../../static/images/store.png",
                      name: "收藏"
                  },
                  {
                      id: 4,
                      path: "submitGroupDemand",
                      imgUrl: "",
                      name: "加入我的团购需求表"
                  }
              ],
              hospitalID: 1,
              shopID: 1,
              num: null
          };
      },
      props: ["isStore"],
      mixins: [directMessages],
      created() {
          console.log(this.isStore);
          if (this.isStore) {
              this.num = 0;
          } else {
              this.num = 1;
          }
      },
      methods: {
          clickHandler(label) {
              // if you clicked home tab, then print 'Home'
              console.log(label);
              if (label == "收藏") {
                  if (!this.num) {
                      this.num = 0;
                  } else {
                      this.num = this.num + 1;
                  }
                  this.$emit("selectedLabel", { label: label, num: this.num });
              } else if (label == "私信商家") {
                  this.directMessages("lxb", 10533);
              }
          },
          changeHandler(label) {
              // if you clicked different tab, this methods can be emitted
          }
      }
  };
</script>

<style lang="scss" scoped>
  @import "../../../../../static/scss/_commonScss";
  .footerMenu {
      width: 100%;
      height: 48px;
      background-color: #fff;
      position: absolute;
      bottom: 0;
      border-top: $border_style;
      /deep/ .cube-tab-bar {
          height: 100%;
          .cube-tab {
              display: flex;
              height: 100%;
              border-right: $border_style;
              justify-content: center;
              align-items: center;
              flex-direction: column;
              font-family: PingFangSC-Regular;
              font-size: 10px;
              color: #333333;
              &.active {
                  color: #019ddd;
                  .store {
                      background: url("../../../../../static/images/store.png")
                          no-repeat;
                      background-size: 16px;
                  }
              }
              &:last-child {
                  background-color: $theme-color;
                  flex: 2;
                  i {
                      display: none;
                  }
                  font-family: PingFangSC-Regular;
                  font-size: 14px;
                  color: #ffffff;
              }
              i {
                  width: 16px;
                  height: 16px;
                  margin-bottom: 4px;
              }
              .scanShop {
                  background: url("../../../../../static/images/shop.png")
                      no-repeat;
                  background-size: 16px;
              }
              .emailShop {
                  background: url("../../../../../static/images/email.png")
                      no-repeat;
                  background-size: 16px;
              }
              .store {
                  background: url("../../../../../static/images/store.png")
                      no-repeat;
                  background-size: 16px;
              }
          }
      }
  }
</style>
