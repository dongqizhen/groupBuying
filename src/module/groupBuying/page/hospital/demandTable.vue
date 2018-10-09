<template>
    <div class="container demandTable">
        <Header title="需求清单">
            <router-link to="/submitGroupDemand" slot="explain" @click.native="setTransition('turn-on')">上传</router-link>
        </Header>
        <div class="content">
            <div class="scroll-list-wrap" v-if="hasNet">
                <scroller v-if="hasData">
                    <cube-swipe>
                        <transition-group name="swipe" tag="ul">
                            <router-link tag="li" class="swipe-item-wrapper" v-for="(data,index) in swipeData" :key="data.id" to="/demandTableDetaile" @click.native="setTransition('turn-on')">
                                <a>
                                    <cube-swipe-item ref="swipeItem" :btns="btns" :index="index" @btn-click="onBtnClick" @active="onItemActive">
                                        <div @click="onItemClick(data, index)" class="item-inner">
                                            <div class="icon">
                                                <img width="42" height="42" src="../../../../../static/images/word.png">
                                            </div>
                                            <div class="text">
                                                <h2 class="item-name" v-html="data.fileName"></h2>

                                            </div>
                                        </div>
                                    </cube-swipe-item>
                                </a>
                            </router-link>
                        </transition-group>
                    </cube-swipe>
                </scroller>
                <no-data v-else></no-data>
            </div>
            <no-net v-else v-on:refresh="getData"></no-net>
        </div>
    </div>
</template>

<script>
    import Header from "../../components/header/header";
    import { _getData } from "../../service/getData";
    import { mapMutations } from "vuex";
    import noData from "../../components/noData/noData";
    import noNet from "../../components/noNet/noNet.vue";

    export default {
        data() {
            return {
                swipeData: [],
                btns: [
                    {
                        action: "delete",
                        text: "删除",
                        color: "#FB4354"
                    }
                ],
                hasData: true,
                hasNet: true
            };
        },
        components: {
            Header,
            noData,
            noNet
        },
        created() {
            this.activeIndex = -1;
        },
        deactivated() {
            this.$destroy();
        },
        activated() {
            this.getData();
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
                            console.log(index);
                            this.deleteHospitalPurchaseFile(
                                this.swipeData[index].id
                            );
                            this.swipeData.splice(index, 1);
                            if (this.swipeData.length <= 0) {
                                this.hasData = false;
                            }
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
            },
            deleteHospitalPurchaseFile(id) {
                console.log(id);
                _getData(
                    "/server_pro/hospitalPurchaseFile!request.action",
                    {
                        method: "deleteHospitalPurchaseFile",

                        params: { id: id }
                    },
                    data => {}
                );
            },
            getData() {
                _getData(
                    "/server_pro/hospitalPurchaseFile!request.action",
                    {
                        method: "getPageList",

                        params: {
                            groupPurchaseHospitalId: this.$route.query.id,
                            currentPage: 1,
                            countPerPage: ""
                        }
                    },
                    data => {
                        console.log(data);
                        this.hasNet = true;
                        this.swipeData = data.list;
                        this.hasData = data.list.length > 0;
                        console.log(this.hasData);
                    },
                    err => {
                        this.hasNet = false;
                    }
                );
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
