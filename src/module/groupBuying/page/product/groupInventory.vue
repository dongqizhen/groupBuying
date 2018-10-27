<template>
    <div class="container">
        <Header :title="title"></Header>
        <div class="content">
            <list-filter v-on:getSortType="getIndex" ref="fliter"></list-filter>
            <div class="scroll-list-wrap">
                <cube-scroll ref="scroll" v-if="!isLoading" @pulling-up="pullUpLoad" :options='options'>
                    <div class="proList">
                        <ul>
                            <li v-for="(listItem,index) in lists" :key="index" @click="OnItemClick(listItem.id)">
                                <product-list class="itemPro" :listData="listItem"></product-list>
                            </li>
                        </ul>
                    </div>
                </cube-scroll>
                <loading v-else :show="isLoading" text="Loading..."></loading>
            </div>
        </div>
    </div>
</template>
<script>
    import Header from "../../components/header/header";
    import listFilter from "../../components/common/listFilter";
    import productList from "../../components/common/productList";
    import { mapMutations } from "vuex";
    import { _getData } from "../../service/getData";
    import { Loading } from "vux";
    export default {
        data() {
            return {
                title: "",
                lists: [],
                sortName: "",
                sortType: "",
                isLoading: true,
                currentPage: 1,
                pageCount: 1,
                options: {
                    pullUpLoad: {
                        threshold: 0,
                        txt: {
                            more: "上拉加载更多",
                            noMore: "全部数据加载完毕"
                        }
                    }
                }
            };
        },
        components: {
            Header,
            listFilter,
            productList,
            Loading
        },
        methods: {
            ...mapMutations(["setTransition"]),
            OnItemClick(id) {
                console.log(`/productDetails/${id}`);
                this.setTransition("turn-on");
                this.$router.push(`/productDetails/${id}`);
            },
            getIndex(obj) {
                this.currentPage = 1;
                this.$refs.scroll.resetPullUpTxt();
                switch (obj.index) {
                    case 0:
                        this.sortName = "createdOn";
                        this.reqData("createdOn");
                        break;
                    case 1:
                        this.sortName = "countNum";
                        this.reqData("countNum");
                        break;
                    case 2:
                        this.sortName = "favoriteNum";
                        this.reqData("favoriteNum");
                        break;
                    case 3:
                        this.sortName = "price";
                        this.sortType = obj.num % 2 ? 1 : 0;
                        obj.num % 2
                            ? this.reqData("price", 1)
                            : this.reqData("price", 0);
                        break;
                }
            },
            async reqData(
                sortName = "",
                sortType = "",
                currentPage = this.currentPage
            ) {
                if (sortName == "") {
                    this.isLoading = true;
                } else {
                    this.isLoading = false;
                }

                await _getData(
                    "/server_pro/groupPurchaseCompanyProduct!request.action",
                    {
                        method: "getPageListByGroupPurchaseTypeId",
                        params: {
                            groupPurchaseTypeId: this.$route.query
                                .groupPurchaseTypeId,
                            groupPurchaseId: this.$route.query.groupPurchaseId,
                            productLineId: this.$route.query.productLineId,
                            brandId: this.$route.query.brandId,
                            sortName: sortName,
                            sortType: sortType,
                            currentPage: currentPage,
                            countPerPage: "2"
                        }
                    },
                    data => {
                        console.log(data);
                        this.title = data.title;
                        if (this.currentPage == 1) {
                            this.lists = data.list;
                        } else {
                            this.lists = [...this.lists, ...data.list];
                        }

                        this.pageCount = data.pageCount;
                    }
                ).then(() => {
                    this.isLoading = false;
                });
            },
            pullUpLoad() {
                this.currentPage += 1;
                if (this.currentPage > this.pageCount) {
                    this.$refs.scroll.forceUpdate();
                    this.$nextTick(() => {
                        this.$refs.scroll.refresh();
                    });
                    return;
                }
                setTimeout(() => {
                    this.reqData(
                        this.sortName == "" ? "createdOn" : this.sortName,
                        this.sortType
                    ).then(() => {
                        this.$refs.scroll.forceUpdate();
                        this.$refs.scroll.resetPullUpTxt();
                    });
                }, 500);
            }
        },
        activated() {
            //this.reqData();
        },
        deactivated() {},
        beforeRouteEnter(to, from, next) {
            console.log(from);

            next(vm => {
                // 通过 `vm` 访问组件实例
                if (from.name != "产品详情") {
                    vm.currentPage = 1;
                    vm.$refs.fliter.cur = 0;
                    vm.$refs.fliter.num = -1;
                    vm.reqData();
                }
            });
        }
    };
</script>

<style lang="scss" scoped>
    @import "../../../../../static/scss/_commonScss";
    .container {
        width: 100%;
        height: 100%;
        position: fixed;
        .content {
            width: 100%;
            height: calc(100% - #{$header-height});
            background-color: $base-backgroud;
            overflow: auto;
            .scroll-list-wrap {
                height: calc(100% - 46px);
                /deep/ .cube-scroll-wrapper {
                    height: 100%;
                    .cube-scroll-content {
                        min-height: calc(100% + 1px);
                        .cube-scroll-list-wrapper {
                            min-height: auto !important;
                        }
                    }
                }
            }
            .proList {
                width: 100%;
                padding-top: 7px;
                ul {
                    width: 120%;
                    li {
                        float: left;
                        margin-right: 7px;
                        margin-bottom: 10px;
                    }
                }
                /deep/ .itemPro {
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    width: 184px;
                    height: 253px;
                    .left_box {
                        width: 100%;
                        height: 189px;
                        margin-right: 0;
                    }
                    .right_box {
                        padding: 5px 13px;
                        height: 64px;
                        background-color: #fff;
                        display: flex;
                        flex-direction: column;
                        justify-content: flex-start;
                        p span.groupbuy {
                            display: none;
                        }
                        > span {
                            margin-top: 5px;
                            font-weight: 600;
                        }
                    }
                }
            }
        }
    }
</style>
