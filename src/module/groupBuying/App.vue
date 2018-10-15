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

<style lang="scss">
    #app {
        height: 100%;
        // position: relative;
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
        z-index: 9999;
    }
    .cube-dialog {
        .cube-popup-container {
            .cube-dialog-main {
                width: 280px;
                min-height: 115px;
                border-radius: 5px;
                .cube-dialog-confirm {
                    min-height: 115px;
                    display: flex;
                    flex-direction: column;
                    .cube-dialog-btns {
                        height: 44px;
                        a {
                            text-decoration: none;
                            padding: 0;
                            display: flex;
                            height: 100%;
                            justify-content: center;
                            align-items: center;
                            font-family: PingFangSC-Medium;
                            font-size: 14px;
                            color: #666666;
                            &.cube-dialog-btn_highlight {
                                color: #019ddd;
                            }
                        }
                    }
                    .cube-dialog-content {
                        flex: 1;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        .cube-dialog-content-def {
                            font-family: PingFangSC-Regular;
                            font-size: 18px;
                            color: #030303;
                        }
                    }
                }
            }
        }
    }
    .vux-loading {
        .weui-mask_transparent {
            // background: rgba($color: #000000, $alpha: 0.2);
        }
        .weui-toast {
            top: 50%;
            margin-top: -3.8em;
        }
    }
    .cube-scroll-content {
        .cube-pullup-wrapper {
            .before-trigger {
                font-size: 13px;
                color: #999999;
                font-family: PingFangSC-Regular;
                padding: 15px 0;
            }
            .after-trigger {
                padding: 12.5px 0;
                .cube-loading {
                    font-size: 18px;
                }
            }
        }
    }
</style>
