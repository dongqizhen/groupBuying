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

            <div class="search_list">
                <div class="search_container">

                    <div class="company common">
                        <h2><i></i>企业产品</h2>
                        <div>
                            <list-item></list-item>
                        </div>
                    </div>

                </div>
                <loading :show="loading" :text="loadIngTxt"></loading>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from "../../components/header/header";
    import listItem from "../../components/common/listItem.vue";
    import submitHospitalReqInfoItem from "../../components/common/submitHospitalReqInfoItem.vue";

    export default {
        data() {
            return {
                value: "",
                loading: false,
                loadIngTxt: "Loading..."
            };
        },
        components: {
            Header,
            listItem,
            submitHospitalReqInfoItem
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
                            background: rgba($color: #000000, $alpha: 0.06);
                        }
                    }
                }
            }
            .search_list {
                padding: 0 13px;
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
                        }
                    }
                }
            }
        }
    }
</style>