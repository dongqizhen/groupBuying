<template>
    <div class="container selectBrand">
        <Header :title="this.$route.name">
            <span slot="explain" class="enter">确定</span>
        </Header>
        <div class="content">
            <search placeholder="请输入品牌"></search>
            <cube-index-list :data="cityData" @select="selectItem" @title-click="clickTitle" secondTitle="最热进口品牌">
            </cube-index-list>
        </div>
    </div>
</template>

<script>
    import Header from "../../components/header/header";
    import search from "../../components/search/search";
    const cityData = [
        {
            name: "★Hot City",
            items: [
                {
                    name: "BEIJING",
                    value: 1,
                    hot: true
                },
                {
                    name: "SHANGHAI",
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
                    name: "北京",
                    value: 5
                }
            ]
        },
        {
            name: "S",
            items: [
                {
                    name: "上海",
                    value: 6
                }
            ]
        },
        {
            name: "C",
            items: [
                {
                    name: "上海",
                    value: 6
                }
            ]
        },
        {
            name: "H",
            items: [
                {
                    name: "上海",
                    value: 6
                }
            ]
        },
        {
            name: "L",
            items: [
                {
                    name: "上海",
                    value: 6
                },
                {
                    name: "上海",
                    value: 6
                },
                {
                    name: "上海",
                    value: 6
                },
                {
                    name: "上海",
                    value: 6
                }
            ]
        },
        {
            name: "M",
            items: [
                {
                    name: "上海",
                    value: 6
                },
                {
                    name: "上海",
                    value: 6
                },
                {
                    name: "上海",
                    value: 6
                },
                {
                    name: "上海",
                    value: 6
                }
            ]
        },
        {
            name: "N",
            items: [
                {
                    name: "上海",
                    value: 6
                },
                {
                    name: "上海",
                    value: 6
                },
                {
                    name: "上海",
                    value: 6
                },
                {
                    name: "上海",
                    value: 6
                }
            ]
        }
    ];
    export default {
        data() {
            return {
                title: "Current City: BEIJING",
                cityData: cityData
            };
        },
        components: {
            Header,
            search
        },
        methods: {
            selectItem(item) {
                console.log(item.name);
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
            /deep/ .cube-index-list {
                height: calc(100% - 46px);
                margin-top: 10px;
                @include box_shadow_style;
                .cube-scroll-wrapper {
                    .cube-scroll-content {
                        min-height: calc(100% + 1px);
                        .cube-index-list-content {
                            > ul {
                                > li {
                                    > h2 {
                                        height: 25px;
                                        background: rgba(1, 157, 221, 0.03);
                                        padding: 0;
                                        display: flex;
                                        align-items: center;
                                        padding-left: 13px;
                                        font-family: PingFangSC-Regular;
                                        font-size: 13px;
                                        color: #019ddd;
                                    }
                                    > ul {
                                        > li {
                                            height: 46px;

                                            > .cube-index-list-item-def {
                                                height: 100%;
                                                padding: 0;
                                                margin-left: 13px;
                                                border-bottom: 0.5px solid #f6f6f6;
                                                display: flex;
                                                justify-content: flex-start;
                                                align-items: center;
                                                span {
                                                    font-family: PingFangSC-Regular;
                                                    font-size: 11px;
                                                    color: #fb4354;
                                                    display: flex;
                                                    height: 16px;
                                                    padding: 0 3px;
                                                    //width: 72px;
                                                    align-items: center;
                                                    background: rgba(
                                                        251,
                                                        67,
                                                        84,
                                                        0.1
                                                    );
                                                    border-radius: 2px;
                                                    margin-left: 18px;
                                                }
                                            }
                                            &:last-child {
                                                > .cube-index-list-item-def {
                                                    border: none;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                .cube-index-list-fixed {
                    height: 25px;
                    background: rgba(1, 157, 221, 0.03);
                    padding: 0;
                    display: flex;
                    align-items: center;
                    padding-left: 13px;
                    font-family: PingFangSC-Regular;
                    font-size: 13px;
                    color: #019ddd;
                    // display: none;
                }
                .cube-index-list-nav {
                    > ul {
                        > li {
                            font-family: PingFangSC-Medium;
                            font-size: 11px;
                            color: #666666;
                            padding-right: 7px;
                            &.active {
                                color: #019ddd;
                            }
                        }
                    }
                }
            }
        }
    }
</style>