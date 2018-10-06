<template>

    <header id="header">
        <slot name="logo"></slot>
        <span @click="goPrev" class="back"><img src="../../../../../static/images/back.png" alt=""></span>
        <h2>
            <slot name="mainTitle"></slot>
            {{title}}
        </h2>
        <div class="search">
            <slot name="explain"></slot>
            <span v-if="isSearchHide"><img src="../../../../../static/images/Search.png" alt=""></span>
        </div>

    </header>
</template>

<script>
import { isBackNativePage } from "../../../../common/js/jsBridge";
export default {
  data() {
    return {};
  },
  props: ["title", "goback", "isSearchHide"],
  methods: {
    goPrev() {
      if (this.$router.currentRoute.path == "/") {
        isBackNativePage();
      } else {
        this.$router.go(-1);
        this.$store.commit("setTransition", "turn-off");
      }
    }
  },
  computed: {},
  mounted() {
    //监听浏览器返回事件
    window.addEventListener(
      "popstate",
      e => {
        this.$store.commit("setTransition", "turn-off");
      },
      false
    );
  }
};
</script>

<style lang="scss" scoped>
#header {
  height: 44px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  background: #fff;
  border-bottom: 0.5px #ddd solid;
  // background: #999;
  > span {
    //padding: 10px;
    position: absolute;
    z-index: 100;
    height: 100%;
    display: block;
    &.back {
      img {
        height: 44px;
      }
      &:active {
        background: rgba($color: #999, $alpha: 0.3);
      }
    }
  }
  h2 {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    /*  .cube-tab-bar{
                                                                                .cube-tab{
                                                                                    font-size: 15px;
                                                                                    color: #666666;
                                                                                    margin-right: 38px;

                                                                                    &.cube-tab_active{
                                                                                    color:#019DDD;
                                                                                    }
                                                                                    &:last-child{
                                                                                    margin-right:0;
                                                                                    }
                                                                                }
                                                                                .cube-tab-bar-slider{
                                                                                    width: 20px;
                                                                                    background-color: #019DDD;
                                                                                }
                                                                            } */
  }
  .search {
    position: absolute;
    right: 0;
    height: 100%;
    padding-left: 13px;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      display: flex;
      height: 100%;
      justify-content: space-around;
      align-items: center;
      img {
        height: 100%;
      }
    }
    &:active {
      background: rgba($color: #999, $alpha: 0.3);
    }
    > a {
      display: flex;
      height: 100%;
      align-items: center;
      padding-right: 13px;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      text-decoration: none;
    }
  }
}
</style>
