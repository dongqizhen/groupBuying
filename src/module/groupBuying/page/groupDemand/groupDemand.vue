<template>
    <div class="container groupDemand">
        <Header :title='title'></Header>
        <div class="content">
            <scroll-tab>
                <div slot="right-panel-container">
                    <h2>
                        <span>按地区</span>
                        <span>台件数</span>
                        <span></span>
                    </h2>
                    <cube-index-list :data="cityData">
                        <cube-index-list-group v-for="(group, index) in cityData" :key="index" :group="group">
                            <cube-index-list-item v-for="(item, index) in group.items" :key="index" :item="item" @select="selectItem">
                                <div class="custom-item">
                                    <span>{{item.name}}</span>
                                    <span>20</span>
                                    <span>
                                        <a>置顶</a>
                                    </span>
                                </div>
                            </cube-index-list-item>
                        </cube-index-list-group>
                    </cube-index-list>
                    <!-- <cube-index-list :data="cityData" :title="mainTitle" @select="selectItem" @title-click="clickTitle"></cube-index-list> -->
                </div>

            </scroll-tab>
        </div>
    </div>
</template>

<script>
    import Header from "../../components/header/header";
    import scrollTab from "../../components/scrollTab/scrollTab";
    import { mapMutations } from "vuex";
    const cityData = [
        {
            name: "★Hot City",
            items: [
                {
                    name: "北京",
                    value: 1
                },
                {
                    name: "上海",
                    value: 2
                }
            ]
        },
        {
            name: "A",
            items: [
                {
                    name: "ANSHAN",
                    value: 3
                },
                {
                    name: "ANQING",
                    value: 4
                }
            ]
        },
        {
            name: "B",
            items: [
                {
                    name: "ANSHAN",
                    value: 3
                },
                {
                    name: "ANQING",
                    value: 4
                }
            ]
        },
        {
            name: "C",
            items: [
                {
                    name: "ANSHAN",
                    value: 3
                },
                {
                    name: "ANQING",
                    value: 4
                }
            ]
        },
        {
            name: "D",
            items: [
                {
                    name: "ANSHAN",
                    value: 3
                },
                {
                    name: "ANQING",
                    value: 4
                }
            ]
        },
        {
            name: "E",
            items: [
                {
                    name: "ANSHAN",
                    value: 3
                },
                {
                    name: "ANQING",
                    value: 4
                }
            ]
        }
    ];
    const demamdData = {
        耗材1: [],
        耗材2: [],
        耗材3: []
    };

    export default {
        data() {
            return {
                title: "团购需求",
                mainTitle: "Current City: BEIJING",
                cityData: cityData
            };
        },
        components: {
            Header,
            scrollTab
        },
        methods: {
            ...mapMutations(["setTransition"]),
            selectItem(item) {
                this.$router.push({
                    path: "groupDemandDetails",
                    query: { id: item.value }
                });
                this.setTransition("turn-on");
            },
            clickTitle(title) {
                console.log(title);
            }
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
                            > div {
                                height: 100%;
                                > h2 {
                                    height: 42px;
                                    border-bottom: 0.5px solid #f6f6f6;
                                    display: flex;
                                    > span {
                                        flex: 1;
                                        display: flex;
                                        align-items: center;
                                        justify-content: center;
                                        font-family: PingFangSC-Regular;
                                        font-size: 14px;
                                        color: #999999;
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
                                                padding-left: 16px;
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
                                                    border-bottom: #f6f6f6 0.5px
                                                        solid;
                                                    &:last-child {
                                                        border-bottom: 0;
                                                    }
                                                    .custom-item {
                                                        height: 100%;
                                                        display: flex;
                                                        span {
                                                            flex: 1;
                                                            align-items: center;
                                                            justify-content: center;
                                                            display: flex;
                                                            font-family: PingFangSC-Regular;
                                                            font-size: 14px;
                                                            color: #333333;
                                                            &:nth-child(2) {
                                                                color: #999999;
                                                            }
                                                            &:last-child {
                                                                font-family: PingFangSC-Regular;
                                                                font-size: 12px;
                                                                color: #019ddd;
                                                                justify-content: flex-end;
                                                                // padding-right: 15px;
                                                                a {
                                                                    text-decoration: none;
                                                                    padding: 3px
                                                                        15px;
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
                                        padding-left: 16px;
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