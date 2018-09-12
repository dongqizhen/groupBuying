<template>
    <div class="container groupDemandDetails">
        <Header :title='title'></Header>
        <div class="content">
            <select-path-nav></select-path-nav>
            <div class="table_container">
                <h2>
                    <span>品牌</span>
                    <span>总数(台)</span>
                    <p>
                        <span>首选
                            <i></i>
                        </span>
                        <span>次选
                            <i></i>
                        </span>
                        <span>再选
                            <i></i>
                        </span>
                    </p>

                </h2>
                <ul>

                    <router-link to="GroupRequireDetails" tag="li" @click.native="setTransition('turn-on')">
                        <a>
                            <span>GE</span>
                            <span>10</span>
                            <p>
                                <span>20</span>
                                <span>30</span>
                                <span>40</span>
                            </p>
                        </a>
                    </router-link>

                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from "../../components/header/header";
    import selectPathNav from "../../components/common/selectPathNav";
    import { mapMutations } from "vuex";
    export default {
        data() {
            return {
                title: "设备团购需求"
            };
        },
        components: {
            Header,
            selectPathNav
        },
        methods: {
            ...mapMutations(["setTransition"])
        }
    };
</script>

<style lang="scss" scoped>
    @import "../../../../../static/scss/_commonScss";
    .container {
        @include basic_container_style;
        .content {
            .table_container {
                @include box_shadow_style;
                h2 {
                    height: 42px;
                    display: flex;
                    align-content: center;
                    justify-content: flex-start;
                    font-family: PingFangSC-Regular;
                    font-size: 14px;
                    color: #999999;
                    border-bottom: $border_style;
                    span {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        &:first-child {
                            width: 90px;
                        }
                        &:nth-child(2) {
                            width: 60px;
                        }
                    }
                    p {
                        flex: 1;
                        display: flex;
                        span {
                            flex: 1;
                        }
                    }
                }
                ul {
                    li {
                        height: 42px;
                        display: flex;
                        align-content: center;
                        justify-content: flex-start;
                        font-family: PingFangSC-Regular;
                        font-size: 14px;
                        color: #999999;
                        border-bottom: $border_style;
                        &:last-child {
                            border-bottom: 0;
                        }
                        a {
                            text-decoration: none;
                            display: flex;
                            height: 100%;
                            flex: 1;
                            > span {
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                flex-wrap: wrap;
                                word-break: break-all;
                                padding: 0 5px;
                                line-height: 18px;
                                &:first-child {
                                    width: 90px;
                                }
                                &:nth-child(2) {
                                    width: 60px;
                                    color: #333333;
                                }
                            }
                            p {
                                flex: 1;
                                display: flex;

                                span {
                                    flex: 1;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    color: #f5a623;
                                    &:first-child {
                                        color: #fb4354;
                                    }
                                    &:last-child {
                                        color: #7ed321;
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