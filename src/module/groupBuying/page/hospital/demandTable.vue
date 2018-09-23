<template>
  <div class="container demandTable">
    <Header title="需求清单">
      <router-link to="/uploadedProducts" slot="explain" @click.native="setTransition('turn-on')">上传</router-link>
    </Header>
    <div class="content">
      <div class="scroll-list-wrap">
        <scroller>
          <cube-swipe>
            <transition-group name="swipe" tag="ul">
              <router-link tag="li" class="swipe-item-wrapper" v-for="(data,index) in swipeData" :key="data.item.id" to="/demandTableDetaile" @click.native="setTransition('turn-on')">
                <a>
                  <cube-swipe-item ref="swipeItem" :btns="btns" :index="index" @btn-click="onBtnClick" @active="onItemActive">
                    <div @click="onItemClick(data.item, index)" class="item-inner">
                      <div class="icon">
                        <img width="42" height="42" src="../../../../../static/images/word.png">
                      </div>
                      <div class="text">
                        <h2 class="item-name" v-html="data.item.name"></h2>

                      </div>
                    </div>
                  </cube-swipe-item>
                </a>
              </router-link>
            </transition-group>
          </cube-swipe>
        </scroller>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from "../../components/header/header";

  import { mapMutations } from "vuex";
  export default {
      data() {
          return {
              swipeData: [
                  {
                      item: {
                          id: "3646653877",
                          name:
                              "2018中国非公立医疗机构第二届团购大会2018中国非公立医疗",
                          desc: "伤感：歌词再狠，也抵不过现实伤人",
                          imgurl:
                              "http://p.qpic.cn/music_cover/MhQ4bJBPt3Yt5icXyBGNhyPJnE9O51CqaN72iaDgvFmDKaia12UFhU5uQ/600?n=1"
                      }
                  },
                  {
                      item: {
                          id: "1789676645",
                          name: "2018中国非公立医疗机构第二届团购大会",
                          desc: "『武侠配乐』快意恩仇江湖情",
                          imgurl:
                              "http://p.qpic.cn/music_cover/8KfvDey9cibtZ5xkWxRic6vhXgdPic3wnB7reibI4pdPQBCP8u57uqcjsQ/600?n=1"
                      }
                  },
                  {
                      item: {
                          id: "3649034125",
                          name: "念葳蕊",
                          desc: "江海迦：热恋后哼一首歌为自己悲悯的歌",
                          imgurl:
                              "http://p.qpic.cn/music_cover/jXFicBvicUcfIWSoCNT1OrbAoHG2fqqnrJVnGV4iaLCapWUpCKqbmAicJg/600?n=1"
                      }
                  },
                  {
                      item: {
                          id: "3649034125",
                          name: "念葳蕊",
                          desc: "江海迦：热恋后哼一首歌为自己悲悯的歌",
                          imgurl:
                              "http://p.qpic.cn/music_cover/jXFicBvicUcfIWSoCNT1OrbAoHG2fqqnrJVnGV4iaLCapWUpCKqbmAicJg/600?n=1"
                      }
                  },
                  {
                      item: {
                          id: "3649034125",
                          name: "念葳蕊",
                          desc: "江海迦：热恋后哼一首歌为自己悲悯的歌",
                          imgurl:
                              "http://p.qpic.cn/music_cover/jXFicBvicUcfIWSoCNT1OrbAoHG2fqqnrJVnGV4iaLCapWUpCKqbmAicJg/600?n=1"
                      }
                  },
                  {
                      item: {
                          id: "3649034125",
                          name: "念葳蕊",
                          desc: "江海迦：热恋后哼一首歌为自己悲悯的歌",
                          imgurl:
                              "http://p.qpic.cn/music_cover/jXFicBvicUcfIWSoCNT1OrbAoHG2fqqnrJVnGV4iaLCapWUpCKqbmAicJg/600?n=1"
                      }
                  },
                  {
                      item: {
                          id: "3649034125",
                          name: "念葳蕊",
                          desc: "江海迦：热恋后哼一首歌为自己悲悯的歌",
                          imgurl:
                              "http://p.qpic.cn/music_cover/jXFicBvicUcfIWSoCNT1OrbAoHG2fqqnrJVnGV4iaLCapWUpCKqbmAicJg/600?n=1"
                      }
                  },
                  {
                      item: {
                          id: "3649034125",
                          name: "念葳蕊",
                          desc: "江海迦：热恋后哼一首歌为自己悲悯的歌",
                          imgurl:
                              "http://p.qpic.cn/music_cover/jXFicBvicUcfIWSoCNT1OrbAoHG2fqqnrJVnGV4iaLCapWUpCKqbmAicJg/600?n=1"
                      }
                  },
                  {
                      item: {
                          id: "3649034125",
                          name: "念葳蕊",
                          desc: "江海迦：热恋后哼一首歌为自己悲悯的歌",
                          imgurl:
                              "http://p.qpic.cn/music_cover/jXFicBvicUcfIWSoCNT1OrbAoHG2fqqnrJVnGV4iaLCapWUpCKqbmAicJg/600?n=1"
                      }
                  },
                  {
                      item: {
                          id: "3649034125",
                          name: "念葳蕊",
                          desc: "江海迦：热恋后哼一首歌为自己悲悯的歌",
                          imgurl:
                              "http://p.qpic.cn/music_cover/jXFicBvicUcfIWSoCNT1OrbAoHG2fqqnrJVnGV4iaLCapWUpCKqbmAicJg/600?n=1"
                      }
                  },
                  {
                      item: {
                          id: "3649034125",
                          name: "念葳蕊",
                          desc: "江海迦：热恋后哼一首歌为自己悲悯的歌",
                          imgurl:
                              "http://p.qpic.cn/music_cover/jXFicBvicUcfIWSoCNT1OrbAoHG2fqqnrJVnGV4iaLCapWUpCKqbmAicJg/600?n=1"
                      }
                  },
                  {
                      item: {
                          id: "3649034125",
                          name: "念葳蕊",
                          desc: "江海迦：热恋后哼一首歌为自己悲悯的歌",
                          imgurl:
                              "http://p.qpic.cn/music_cover/jXFicBvicUcfIWSoCNT1OrbAoHG2fqqnrJVnGV4iaLCapWUpCKqbmAicJg/600?n=1"
                      }
                  },
                  {
                      item: {
                          id: "3649034125",
                          name: "念葳蕊",
                          desc: "江海迦：热恋后哼一首歌为自己悲悯的歌",
                          imgurl:
                              "http://p.qpic.cn/music_cover/jXFicBvicUcfIWSoCNT1OrbAoHG2fqqnrJVnGV4iaLCapWUpCKqbmAicJg/600?n=1"
                      }
                  }
              ],
              btns: [
                  {
                      action: "delete",
                      text: "删除",
                      color: "#FB4354"
                  }
              ]
          };
      },
      components: {
          Header
      },
      created() {
          this.activeIndex = -1;
      },
      deactivated() {
          this.$destroy();
      },
      methods: {
          ...mapMutations(["setTransition"]),
          onItemClick(item) {
              console.log("click item:", item);
          },
          onBtnClick(btn, index) {
              if (btn.action === "delete") {
                  this.$createActionSheet({
                      title: "确认要删除吗",
                      active: 0,
                      data: [{ content: "删除" }],
                      onSelect: () => {
                          this.swipeData.splice(index, 1);
                      }
                  }).show();
              } else {
                  this.$refs.swipeItem[index].shrink();
              }
          },
          onItemActive(index) {
              if (index === this.activeIndex) {
                  return;
              }
              if (this.activeIndex !== -1) {
                  const activeItem = this.$refs.swipeItem[this.activeIndex];
                  activeItem.shrink();
              }
              this.activeIndex = index;
          }
      }
  };
</script>

<style lang="scss"  scoped>
  @import "../../../../../static/scss/_commonScss";
  .container {
      @include basic_container_style;
      .content {
          padding-top: 0;
          .scroll-list-wrap {
              height: 100%;

              /deep/ .cube-scroll-wrapper {
                  height: 100%;
                  padding-bottom: 10px;
                  .cube-scroll-content {
                      min-height: calc(100% + 1px);
                      padding: 10px 13px;
                      padding-bottom: 0;
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
