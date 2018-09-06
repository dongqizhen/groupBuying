<template>
  <div id="app">
    <transition :name="$store.state.states">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
  export default {
      name: "app",
      data() {
          return {};
      },
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
  #app {
      height: 100%;
  }

  /* .v-touch-ripple {
      width: 100%;
      position: fixed;
      top: 70px;
    } */
  /* .page-move-enter,
    .page-move-leave-active {
      -webkit-transform: translate(100%);
      transform: translate(100%);
    }

    .page-move-enter-active,
    .page-move-leave-active {
      -webkit-transition: transform 0.3s, -webkit-transform 0.3s;
      transition: -webkit-transform 0.3s;
      transition: transform 0.3s;
      transition: transform 0.3s, -webkit-transform 0.3s;
      -moz-transition: transform 0.3s, -webkit-transform 0.3s;
      -ms-transition: transform 0.3s, -webkit-transform 0.3s;
      -o-transition: transform 0.3s, -webkit-transform 0.3s;
    }
   */
  .turn-on-enter {
      transform: translate3d(100%, 0, 0);
  }
  .turn-on-leave-to {
      /* transform: translate3d(-20%, 0, 0); */
  }
  .turn-on-enter-active,
  .turn-on-leave-active {
      transition: transform 0.4s ease;
  }
  /* .turn-on-enter-to{
      transform: translate3d(0, 0, 0);
    } */
  .turn-off-enter {
      /* transform: translate3d(-20%, 0, 0); */
  }
  .turn-off-leave-to {
      transform: translate3d(100%, 0, 0);
  }
  .turn-off-enter-active,
  .turn-off-leave-active {
      transition: transform 0.4s ease;
  }
  .turn-off-leave-active,
  .turn-on-enter-active {
      z-index: 2;
  }
</style>
