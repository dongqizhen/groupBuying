<template>

    <div class="container">
        <Header :isSearchHide="true">
            <tab slot="mainTitle" :line-width="2" custom-bar-width="20px" active-color="#019DDD" default-color="#666">
                <tab-item v-for="(item, index) in tabs" @on-item-click="handler" :key="index" :selected="index==2?true:false">{{item.label}}</tab-item>
            </tab>
            <!-- <cube-tab-bar v-model="selectedLabel" showSlider slot="mainTitle" @change="tabBarChange">
                <cube-tab v-for="(item, index) in tabs" :label="item.label" :key="index">
                </cube-tab>
            </cube-tab-bar> -->
        </Header>
        <div class="content">
            <div class="scroll-list-wrap">
                <scroller>
                    <cube-slide ref="slide" :data="Banneritems" class="banner">
                        <cube-slide-item v-for="(item, index) in Banneritems" :key="index">
                            <a :href="item.url">
                                <img :src="item.img">
                            </a>
                        </cube-slide-item>
                    </cube-slide>

                    <grid :show-lr-borders="false" :show-vertical-dividers="false" class="icons_box">
                        <grid-item :link="{ path: item.path}" v-for="item in routerLinkArr" :key="item.name" @click.native="setTransition('turn-on')">
                            <img slot="icon" :src="item.imgurl">
                            <span slot="label">{{item.name}}</span>
                            <badge :text="`已报名${item.num}家`" v-if="item.num"></badge>
                        </grid-item>

                    </grid>
                    <!-- <ul class="icons_box">
                        <router-link tag="li" v-for="item in routerLinkArr" :key="item.name" :to="item.path" @click.native="setTransition('turn-on')">
                            <a><img :src="item.imgurl" alt=""></a>
                            <span>{{item.name}}</span>
                        </router-link>
                    </ul> -->
                    <div class="meeting_list">
                        <h2>
                            <span></span>
                            团购大会列表
                            <span></span>
                        </h2>
                        <list-tab :meetingListData="meetingList"></list-tab>
                    </div>
                </scroller>
            </div>

        </div>
    </div>
</template>

<script>
    import Header from "../components/header/header";
    import ListTab from "../components/common/listTab";
    import { mapMutations } from "vuex";
    import { _getData } from "../service/getData";
    import { Grid, GridItem, Badge, Tab, TabItem } from "vux";
    import _ from "lodash";
    const routerLinkArr = [
        {
            path: "/myHospitalGroupBuy",
            name: "医院团购报名",
            imgurl: "../static/images/hospitalApply.png",
            num: 50
        },
        {
            path: "/enterpriseSeal",
            name: "企业团购报名",
            imgurl: "../static/images/companyApply.png",
            num: 50
        },
        {
            path: "/myComponyGroupBuy",
            name: "我的团购",
            imgurl: "../static/images/myApply.png"
        }
    ];

    export default {
        name: "index",
        data() {
            return {
                routerLinkArr,
                selectedLabel: "团购",
                tabs: [
                    {
                        label: "产品"
                    },
                    {
                        label: "商家"
                    },
                    {
                        label: "团购"
                    }
                ],
                Banneritems: [],
                meetingList: {}
            };
        },
        components: {
            Header,
            ListTab,
            Grid,
            GridItem,
            Badge,
            Tab,
            TabItem
        },
        methods: {
            handleClick() {
                this.setTransition("turn-on");
            },
            ...mapMutations(["setTransition"]),
            handler() {}
        },
        mounted() {
            _getData(
                //获取轮播图
                "/server/banner!request.action",
                {
                    method: "getAppBannerList",
                    userid: "7544",
                    params: { type: 15 },
                    token: "09a52ead-ef25-411d-8ac2-e3384fceed68"
                },
                data => {
                    this.Banneritems = data.bannerList;
                }
            );
            _getData(
                "/server_pro/groupPurchase!request.action",
                {
                    method: "getPageList",
                    userid: "7544",
                    token: "09a52ead-ef25-411d-8ac2-e3384fceed68",
                    params: {}
                },
                data => {
                    this.meetingList = _.keyBy(data.list, val => {
                        return `${val.year}(${val.num}场)`;
                    });
                    console.log(this.meetingList);
                }
            );
        },
        activated() {}
    };
</script>

<style lang="scss" scoped>
    @import "../../../../static/scss/_commonScss";
    .container {
        @include basic_container_style;
        /deep/ header {
            .vux-tab-wrap {
                height: 100%;
                width: 204px;
                .vux-tab {
                    .vux-tab-item {
                        font-family: PingFangSC-Regular;
                        font-size: 15px;
                        color: #666666;
                    }
                }
            }
        }
        .content {
            .cube-slide.banner {
                height: 145px;
                .cube-slide-item {
                    a {
                        img {
                            width: 100%;
                        }
                    }
                }
            }
            .icons_box {
                display: flex;
                flex-wrap: nowrap;
                justify-content: center;
                height: 110px;
                background: #fff;
                margin: 10px 0;
                box-shadow: $base-box-shadow;
                border-radius: 5px;
                &::before {
                    border: none;
                }

                > a {
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    justify-content: flex-start;
                    text-decoration: none;
                    padding: 0;
                    position: relative;
                    // overflow: auto;
                    &::after {
                        border: none;
                    }
                    /deep/ .weui-grid__icon {
                        margin-bottom: 5px;
                        width: 46px;
                        height: 46px;
                        margin-top: 20px;
                        img {
                            width: 46px;
                            height: 46px;
                        }
                    }
                    .weui-grid__label {
                        span {
                            color: #666666;
                            font-size: 13px;
                        }
                    }
                    > span {
                        position: absolute;
                        background: #fb4354;
                        height: 15px;
                        font-family: PingFangSC-Medium;
                        font-size: 10px;
                        color: #ffffff;
                        display: flex;
                        justify-content: center;
                        flex-wrap: nowrap;
                        align-items: center;
                        top: 15px;
                        left: 50%;
                        min-width: 77px;
                        width: auto;
                        z-index: 10;
                    }
                    &:active {
                        background: rgba($color: #999, $alpha: 0.3);
                    }
                }
            }
            .meeting_list {
                background: #fff;
                box-shadow: $base-box-shadow;
                border-radius: 5px;
                width: 100%;
                > h2 {
                    height: 57px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 15px;
                    text-align: center;
                    color: #666666;
                    font-family: PingFangSC-Medium;
                    border-bottom: 1px solid #e9e9e9;
                    span {
                        display: block;
                        border-top: 1px solid #cccccc;
                        width: 20px;
                        margin: 0 18px;
                    }
                }
            }
        }
    }
</style>
