<template>
    <div class="container searchIndex">
        <Header>
            <cube-input v-model="value" slot="mainTitle" :clearable="true" placeholder="请输入关键词">
                <span slot="prepend">
                    <img src="../../../../../static/images/smallSearch.png" alt="">
                </span>
            </cube-input>
            <span slot="explain">搜索</span>
        </Header>
        <div class="content">
            <div class="history" v-if="isSearchHistory">
                <h2>历史记录<span></span></h2>
                <ul class="history_container">
                    <li v-for="(val,index) in searchList" :key="index" @click="search(val.name)">{{val.name}}</li>
                </ul>
            </div>
            <div class="search_list" v-else>
                <div class="search_container" v-if="hasData">
                    <p>共<span>{{totalnum}}</span>个结果</p>
                    <div class="company common">
                        <h2><i></i>企业产品</h2>
                        <div>
                            <product-list :listData='listData.productList[0]'></product-list>

                        </div>
                        <div class="bottom" @click.stop="handleClick(13)">查看全部{{listData.productNum}}个结果</div>
                    </div>
                    <div class="hospital common">
                        <h2><i></i>医院需求</h2>
                        <div>
                            <submit-hospital-req-info-item :result='listData.demandList[0]'></submit-hospital-req-info-item>
                        </div>
                        <div class="bottom" @click.stop="handleClick(14)">查看全部{{listData.demandNum}}个结果</div>
                    </div>
                </div>
                <no-data v-else></no-data>
                <loading :show="loading" :text="loadIngTxt"></loading>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from "../../components/header/header";
    import submitHospitalReqInfoItem from "../../components/common/submitHospitalReqInfoItem.vue";
    import { _getData } from "../../service/getData";
    import noData from "../../components/noData/noData.vue";
    import productList from "../../components/common/productList.vue";
    import { mapMutations } from "vuex";
    export default {
        data() {
            return {
                searchList: [],
                value: "",
                loading: false,
                loadIngTxt: "Loading...",
                isSearchHistory: true,
                hasData: true,
                listData: {},
                demandList: [],
                productList: []
            };
        },
        components: {
            Header,
            productList,
            submitHospitalReqInfoItem,
            noData
        },
        methods: {
            ...mapMutations(["setTransition"]),
            search(val) {
                this.value = val;
                this.loading = true;
                _getData(
                    "/server_pro/groupPurchase!request.action",
                    {
                        method: "getSearchList",

                        params: { name: this.value }
                    },
                    data => {
                        console.log(data);
                        if (data.demandNum == 0 && data.productNum == 0) {
                            this.hasData = false;
                        } else {
                            this.hasData = true;
                            this.listData = data;
                        }
                    }
                ).then(() => {
                    this.loading = false;
                    this.isSearchHistory = false;
                });
            },
            handleClick(val) {
                this.setTransition("turn-on");
                this.$router.push({
                    path: `/searchList/${val}`,
                    query: { val: this.value }
                });
            }
        },
        activated() {
            _getData(
                "/server/searchrecord!request.action",
                {
                    method: "getSearchlist_v28",
                    params: { type: 21 }
                },
                data => {
                    console.log(data);
                    this.searchList = data.searchList;
                }
            );
        },
        beforeRouteEnter(to, from, next) {
            console.log(from);
            if (from.name != "搜索列表") {
                next(vm => {
                    console.log(vm);
                    vm.isSearchHistory = true;
                    vm.value = "";
                });
                return;
            }

            next();
        },
        computed: {
            totalnum() {
                return this.listData.demandNum + this.listData.productNum;
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "../../../../../static/scss/_commonScss";
    .container {
        @include basic_container_style;
        /deep/ header {
            h2 {
                .cube-input {
                    width: 276px;
                    border: none;
                    background: #f2f2f2;
                    border-radius: 15px;
                    justify-content: flex-start;
                    margin-right: 12px;
                    &::after {
                        border: none;
                    }
                    input {
                        height: 30px;
                        padding: 0;
                        border-radius: 15px;
                        padding-left: 5px;
                        font-family: PingFangSC-Regular;
                        font-size: 14px;
                        color: #999999;
                    }
                    .cube-input-prepend {
                        span {
                            padding-left: 10px;
                            margin-right: 7px;
                            height: 15px;
                            img {
                                width: 16px;
                                height: 15px;
                            }
                        }
                    }
                    .cube-input-append {
                        .cube-input-clear {
                            color: #ccc;
                            height: 16px;
                            width: 16px;
                            padding: 0;
                            margin-right: 10px;
                            background: url("../../../../../static/images/delet.png")
                                no-repeat;
                            background-size: 100% 100%;
                            .cubeic-wrong {
                                display: none;
                            }
                        }
                    }
                }
            }
            .search {
                padding-right: 13px;
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #333333;
            }
        }
        .content {
            .history {
                width: 100%;
                background: #fff;
                margin-top: 10px;
                height: calc(100% - 10px);

                h2 {
                    font-family: PingFangSC-Medium;
                    font-size: 14px;
                    color: #333333;
                    height: 46px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-left: 13px;
                    span {
                        height: 16px;
                        width: 42px;
                        padding: 0 13px;
                        display: flex;
                        background: url("../../../../../static/images/Trash.png")
                            no-repeat center;
                        background-size: 16px 100%;
                    }
                }
                .history_container {
                    display: flex;
                    justify-content: flex-start;
                    flex-wrap: wrap;
                    padding: 0 13px;
                    li {
                        height: 32px;
                        border-radius: 32px;
                        background: #f5f5f5;
                        font-family: PingFangSC-Regular;
                        font-size: 13px;
                        color: #333333;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        margin-right: 10px;
                        margin-bottom: 10px;
                        padding: 0 13px;
                        &:active {
                            background: rgba($color: #000000, $alpha: 0.08);
                        }
                    }
                }
            }
            .search_list {
                padding: 0 13px;
                height: 100%;
                .search_container {
                    > p {
                        height: 37px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-family: PingFangSC-Medium;
                        font-size: 12px;
                        color: #999999;
                        span {
                            font-family: PingFangSC-Medium;
                            font-size: 12px;
                            color: #151515;
                        }
                    }
                    > div {
                        @include box_shadow_style;
                        h2 {
                            height: 46px;
                            display: flex;
                            justify-content: flex-start;
                            align-items: center;
                            font-family: PingFangSC-Medium;
                            font-size: 14px;
                            color: #333333;
                            border-bottom: $border-style;
                            padding-left: 13px;
                            i {
                                background: $theme-color;
                                display: flex;
                                width: 3px;
                                height: 14px;
                                margin-right: 10px;
                            }
                        }
                        .bottom {
                            height: 46px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            font-family: PingFangSC-Regular;
                            font-size: 14px;
                            color: $theme-color;
                        }
                        &.company {
                            margin-bottom: 10px;
                            /deep/ .productList {
                                padding: 13px;
                                border-bottom: $border-style;
                                .left_box {
                                    height: 90px;
                                    width: 100px;
                                    margin-right: 13px;
                                }
                            }
                        }
                        &.hospital {
                            /deep/ .submitHospitalInfo {
                                box-shadow: none;
                                margin-bottom: 0;
                                a > .otherRequire {
                                    display: none;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>