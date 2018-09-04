<template>
    <div class="container uploadedProducts">
        <Header :isSearchHide="false" :title="this.$route.name">
        </Header>
        <div class="content">
            <div class="type">
                <type-scroll-nav-bar></type-scroll-nav-bar>
                <model-scroll-nav-bar></model-scroll-nav-bar>
            </div>
            <div class="wrapper_container">
                <cube-scroll ref="scroll">
                    <cube-swipe>
                        <transition-group name="swipe" tag="ul" class="Swipe_box">
                            <li class="swipe-item-wrapper myUploadList" v-for="(data,index) in swipeData" :key="data.item.id">
                                <cube-swipe-item ref="swipeItem" :btns="btns" :index="0" @btn-click="onBtnClick" @active="onItemActive">
                                    <product-list></product-list>

                                    <!-- <div @click="onItemClick(data.item, index)" class="item-inner">
                                        <div class="icon">
                                            <img width="60" height="60" :src="data.item.imgurl">
                                        </div>
                                        <div class="text">
                                            <h2 class="item-name" v-html="data.item.name"></h2>
                                            <p class="item-desc" v-html="data.item.desc"></p>
                                        </div>
                                    </div> -->
                                </cube-swipe-item>
                            </li>
                            <li class="swipe-item-wrapper myUploadList" v-for="(data,index) in swipeData" :key="data.item.id">
                                <cube-swipe-item ref="swipeItem" :btns="btns" :index="1" @btn-click="onBtnClick" @active="onItemActive">
                                    <product-list></product-list>
                                </cube-swipe-item>
                            </li>
                        </transition-group>
                    </cube-swipe>
                </cube-scroll>

            </div>

        </div>
    </div>
</template>

<script>
    import Header from "../../components/header/header";
    import typeScrollNavBar from "../../components/common/typeScrollNavBar";
    import modelScrollNavBar from "../../components/common/modelScrollNavBar";
    import productList from "../../components/common/productList";
    export default {
        data() {
            return {
                swipeData: [
                    {
                        item: {
                            id: "3646653877",
                            name: "还不是因为你长得不好看",
                            desc: "伤感：歌词再狠，也抵不过现实伤人",
                            imgurl:
                                "http://p.qpic.cn/music_cover/MhQ4bJBPt3Yt5icXyBGNhyPJnE9O51CqaN72iaDgvFmDKaia12UFhU5uQ/600?n=1"
                        }
                    }
                ],
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
        components: {
            Header,
            typeScrollNavBar,
            modelScrollNavBar,
            productList
        },
        created() {
            this.activeIndex = -1;
        },
        methods: {
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
                            //this.swipeData.splice(index, 1)
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

<style lang="scss" scoped>
    @import "../../../../../static/scss/_commonScss";
    .container {
        height: 100%;
        width: 100%;
        position: fixed;
        .content {
            height: calc(100% - #{$header-height});
            padding: 10px 13px;
            background: $base-backgroud;
            .type {
                box-shadow: 0.5px 1px 3px 0.5px rgba(0, 0, 0, 0.1);
                border-radius: 5px;
                background: #fff;
                margin-bottom: 10px;
            }
            .wrapper_container {
                height: calc(100% - 111px);
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
                                    text-align: center;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>