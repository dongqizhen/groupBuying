<template>
  <div class="container uploadedProducts">
    <Header :isSearchHide="false" title="上传的产品">
    </Header>
    <div class="content">
      <div v-if="!isLoading">
        <div v-if="groupPurchaseTypeList.length">
          <div class="type">
            <type-scroll-nav-bar :typeData="typeData" :slectedTypeKeyWord="curTypeVal" v-on:typeNavChange="TypeNavChange"></type-scroll-nav-bar>
            <model-scroll-nav-bar :modelData="modelData" :selectModelVal="selectModelVal" v-on:modelNavChange="ModelNavChange"></model-scroll-nav-bar>
          </div>
          <div class="wrapper_container">
            <scroller>
              <cube-swipe>
                <transition-group name="swipe" tag="ul" class="Swipe_box">
                  <li class="swipe-item-wrapper myUploadList" v-for="(data,index) in swipeData" :key="index">
                    <cube-swipe-item ref="swipeItem" :btns="btns" :index="index" @btn-click="onBtnClick" @active="onItemActive" @item-click="onItemClick">
                      <product-list :listData="data"></product-list>
                    </cube-swipe-item>
                  </li>
                </transition-group>
              </cube-swipe>
            </scroller>
          </div>
        </div>
        <no-data v-else></no-data>
      </div>
      <loading v-else :show="isLoading" text="Loading..."></loading>
    </div>
  </div>
</template>

<script>
  import Header from "../../components/header/header";
  import typeScrollNavBar from "../../components/common/typeScrollNavBar";
  import modelScrollNavBar from "../../components/common/modelScrollNavBar";
  import productList from "../../components/common/productList";
  import { _getData } from "../../service/getData";
  import { mapMutations } from "vuex";
  import _ from "lodash";
  import { getProductList } from "../../components/mixin/mixin";
  import noData from "../../components/noData/noData.vue";
  import noNet from "../../components/noNet/noNet.vue";
  import { Loading } from "vux";
  export default {
      data() {
          return {
              btns: [
                  {
                      action: "rewrite",
                      text: "编辑",
                      color: "#ccc"
                  },
                  {
                      action: "delete",
                      text: "删除",
                      color: " #FB4354"
                  }
              ]
          };
      },
      mixins: [getProductList],
      components: {
          Header,
          typeScrollNavBar,
          modelScrollNavBar,
          productList,
          noData,
          noNet,
          Loading
      },
      created() {
          console.log(this.swipeData);
      },
      methods: {
          ...mapMutations(["setTransition"]),
          onItemClick(item) {
              console.log("click item:", item);
          },
          onBtnClick(btn, index) {
              console.log(index);
              console.log(this.swipeData[index].id);

              if (btn.action === "delete") {
                  /* this.$createActionSheet({
                title: "确认要删除吗",
                active: 0,
                data: [{ content: "删除" }],
                onSelect: (item, val) => {
                    alert();
                    this.swipeData.splice(index, 1);
                }
            }).show(); */
                  this.$createDialog({
                      type: "confirm",
                      icon: "",
                      title: "",
                      content: "确定要删除吗？",
                      confirmBtn: {
                          text: "确认",
                          active: true,
                          disabled: false,
                          href: "javascript:;"
                      },
                      cancelBtn: {
                          text: "取消",
                          active: false,
                          disabled: false,
                          href: "javascript:;"
                      },
                      onConfirm: () => {
                          _getData(
                              "/server_pro/groupPurchaseCompanyProduct!request.action",
                              {
                                  method: "deletedProduct",
                                  params: { id: this.swipeData[index].id }
                              },
                              data => {}
                          ).then(() => {
                              this.swipeData.splice(index, 1);
                              this.$refs.swipeItem[this.activeIndex].shrink();
                              // if (this.swipeData.length == 0) {
                              this.getData();
                              // }
                          });
                      },
                      onCancel: () => {}
                  }).show();
              } else {
                  this.setTransition("turn-on");
                  this.$refs.swipeItem[index].shrink();
                  this.$router.push({
                      path: "uploadProduct",
                      query: { id: this.swipeData[index].id }
                  });
              }
          },
          onItemActive(index) {
              console.log(index);
              if (index === this.activeIndex) {
                  return;
              }
              if (this.activeIndex !== -1) {
                  const activeItem = this.$refs.swipeItem[this.activeIndex];
                  activeItem.shrink();
              }
              this.activeIndex = index;
          }
      },
      activated() {}
  };
</script>

<style lang="scss" scoped>
  @import "../../../../../static/scss/_commonScss";
  .container {
      @include basic_container_style;
      .content {
          padding: 10px 13px;
          overflow: hidden;
          //padding-bottom: 0;
          > div {
              height: 100%;
              display: flex;
              flex-direction: column;
              > div {
                  height: 100%;
                  display: flex;
                  flex-direction: column;
              }
          }
          .type {
              box-shadow: 0.5px 1px 3px 0.5px rgba(0, 0, 0, 0.1);
              border-radius: 5px;
              background: #fff;
              margin-bottom: 10px;
          }
          .wrapper_container {
              height: calc(100%);
              position: relative;
              /deep/ ._v-container {
                  height: 100%;
                  /*  ._v-content {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              padding-top: 10px;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          } */
              }
          }
          /deep/ ul.Swipe_box {
              height: 100%;
              > li {
                  height: 80px;
                  background: #ffffff;
                  box-shadow: 0.5px 1px 3px 0.5px rgba(0, 0, 0, 0.1);
                  border-radius: 5px;
                  margin-bottom: 10px;
                  &:last-child {
                      margin-bottom: 0;
                  }
                  .cube-swipe-item {
                      height: 100%;
                      padding: 13px;
                      display: flex;
                      justify-content: flex-start;

                      .cube-swipe-btns {
                          li {
                              width: 120px;
                              font-family: PingFangSC-Regular;
                              font-size: 16px;
                              color: #ffffff;
                              span {
                                  width: 100%;
                                  display: flex;
                                  align-items: center;
                                  justify-content: center;
                              }
                          }
                      }
                  }
              }
          }
      }
  }
</style>
