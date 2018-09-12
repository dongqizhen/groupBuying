<template>
    <div class="container">
        <Header :title="this.$route.name">
            <router-link to="/enterpriseSeal" slot="explain" @click.native="setTransition('turn-on')">编辑</router-link>
        </Header>
        <div class="content">
            <basic-information title="企业基本信息"></basic-information>
            <div class="Personal_information">
                <basic-title title="团购负责人信息" imgurl="../images/Personal_information.png">
                    <span slot="check">收起</span>
                </basic-title>
                <personal-information :read="true" :disabled="true" v-for="(val,index) in data" :key="index" :data="val"></personal-information>
            </div>
            <div class="product_list">
                <basic-title title="参加团购产品列表" imgurl="../static/images/product_list.png"></basic-title>
                <type-scroll-nav-bar></type-scroll-nav-bar>
            </div>
            <div class="products">
                <model-scroll-nav-bar></model-scroll-nav-bar>
                <ul>
                    <li>
                        <product-list></product-list>
                    </li>
                    <li>
                        <product-list></product-list>
                    </li>
                    <li>
                        <product-list></product-list>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from "../../components/header/header";
    import basicInformation from "../../components/common/basicInformation";
    import basicTitle from "../../components/common/basicTitle";
    import typeScrollNavBar from "../../components/common/typeScrollNavBar";
    import modelScrollNavBar from "../../components/common/modelScrollNavBar";
    import productList from "../../components/common/productList";
    import personalInformation from "../../components/common/personalInformation";
    import { mapMutations } from "vuex";
    export default {
        data() {
            return {
                disabled: true,
                data: [
                    {
                        name: "张经理",
                        job: "经理",
                        phone: 12321564645,
                        tel: 32213,
                        weixin: 124568754
                    },
                    {
                        name: "李经理",
                        job: "经理",
                        phone: 12321564645,
                        tel: 32213,
                        weixin: 124568754
                    }
                ]
            };
        },
        components: {
            Header,
            basicInformation,
            basicTitle,
            typeScrollNavBar,
            modelScrollNavBar,
            productList,
            personalInformation
        },
        methods: { ...mapMutations(["setTransition"]) }
    };
</script>

<style lang="scss" scoped>
    @import "../../../../../static/scss/_commonScss";
    .container {
        height: 100%;
        width: 100%;
        position: fixed;
        /deep/ header {
            .search {
                a {
                    font-size: 16px;
                    color: #019ddd;
                    font-family: PingFangSC-Regular;
                }
            }
        }
        .content {
            height: calc(100% - #{$header-height});
            padding: 10px 13px;
            background: $base-backgroud;
            overflow: auto;
            /deep/ .basicInformation {
                .content_box {
                    ul {
                        padding-left: 13px;
                        li {
                            padding: 13px 13px 13px 0;
                            border-bottom: 0.5px solid #f6f6f6;
                            &:first-child {
                                padding-top: 0;
                            }
                            &:last-child {
                                padding-bottom: 3px;
                                border: none;
                            }
                        }
                    }
                }
            }
            .Personal_information {
                background: #ffffff;
                box-shadow: 0.5px 1px 3px 0.5px rgba(0, 0, 0, 0.1);
                border-radius: 5px;
                margin-top: 10px;
                /deep/ .basicTitle {
                    h2 {
                        span {
                            font-size: 13px;
                            color: #333333;
                            font-family: PingFangSC-Regular;
                        }
                    }
                }
            }
            .product_list {
                background: #ffffff;
                box-shadow: 0.5px 1px 3px 0.5px rgba(0, 0, 0, 0.1);
                border-radius: 5px;
                margin-top: 10px;
            }
            .products {
                background: #ffffff;
                box-shadow: 0.5px 1px 3px 0.5px rgba(0, 0, 0, 0.1);
                border-radius: 5px;
                margin-top: 10px;
                ul {
                    padding: 10px 0;
                    border-top: 0.5px solid #f6f6f6;
                    li {
                        height: 90px;
                        width: 100%;
                        padding: 0 13px;
                        margin-bottom: 13px;
                        /deep/ .productList {
                            height: 100%;
                            .left_box {
                                width: 100px;
                                margin-right: 13px;
                            }
                            .right_box {
                                padding: 16px 0;
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
</style>
