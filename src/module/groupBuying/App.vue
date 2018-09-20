<template>
    <div id="app">
        <transition :name="$store.state.states">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </transition>
        <!-- <transition :name="$store.state.states">
            <router-view v-if="!$route.meta.keepAlive" key="no-keep-alive"></router-view>
        </transition> -->
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
            window.WebViewJavascriptBridge.registerHandler(
                "androidPhysicalBack",
                (data, responseCallback) => {
                    if (this.$router.currentRoute.path == "/") {
                        responseCallback(JSON.stringify({ isNativeBack: "true" }));
                    } else {
                        this.$store.commit("setTransition", "turn-off");
                        this.$router.back();
                    }
                }
            );
        }
    };
</script>

<style lang="scss" scoped>
    #app {
        height: 100%;
        position: relative;
    }

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
