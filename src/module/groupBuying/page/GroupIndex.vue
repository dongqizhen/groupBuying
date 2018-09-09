<template>

    <div class="container">
        <Header :isSearchHide="true">
            <cube-tab-bar v-model="selectedLabel" showSlider slot="mainTitle">
                <cube-tab v-for="(item, index) in tabs" :label="item.label" :key="index">
                </cube-tab>
            </cube-tab-bar>
        </Header>
        <div class="content">
            <cube-slide class="banner" :data="Banneritems" />
            <ul class="icons_box">
                <router-link tag="li" v-for="item in routerLinkArr" :key="item.name" :to="item.path" @click.native="setTransition('turn-on')">
                    <a><img :src="item.imgurl" alt=""></a>
                    <span>{{item.name}}</span>
                </router-link>
            </ul>
            <div class="meeting_list">
                <h2>
                    <span></span>
                    团购大会列表
                    <span></span>
                </h2>
                <list-tab :meetingListData="meetingList"></list-tab>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from "../components/header/header";
    import ListTab from "../components/common/listTab";
    import { mapMutations } from "vuex";
    import { _getData } from "../service/getData";
    const routerLinkArr = [
        {
            path: "/",
            name: "医院团购报名",
            imgurl: "/static/images/hospitalApply.png"
        },
        {
            path: "/",
            name: "企业团购报名",
            imgurl: "/static/images/companyApply.png"
        },
        {
            path: "/myComponyGroupBuy",
            name: "我的团购",
            imgurl: "/static/images/myApply.png"
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
                Banneritems: [
                    {
                        url: "http://www.didichuxing.com/",
                        image:
                            "//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide01.png"
                    },
                    {
                        url: "http://www.didichuxing.com/",
                        image:
                            "//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide02.png"
                    },
                    {
                        url: "http://www.didichuxing.com/",
                        image:
                            "//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide03.png"
                    }
                ],
                meetingList: {}
            };
        },
        components: {
            Header,
            ListTab
        },
        methods: {
            handleClick() {
                this.setTransition("turn-on");
            },
            ...mapMutations(["setTransition"])
        },
        activated() {
            _getData(
                //获取轮播图
                "/server/banner!request.action",
                {
                    method: "getAppBannerList",
                    userid: "7544",
                    params: { type: 15 },
                    token: "09a52ead-ef25-411d-8ac2-e3384fceed68"
                },
                function(data) {
                    console.log(data);
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
                    console.log(data);
                    this.meetingList = data.data.result;
                }
            );
        }
    };
</script>

<style lang="scss" scoped>
    @import "../../../../static/scss/_commonScss";
    .container {
        height: 100%;
        width: 100%;
        position: fixed;
        .content {
            height: calc(100% - #{$header-height});
            padding: 10px 13px;
            background: $base-backgroud;
            overflow: auto;
            //-webkit-overflow-scrolling: touch;
            .cube-slide.banner {
                height: 145px;
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
                li {
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    justify-content: center;
                    width: (100% / 3);
                    a {
                        margin-bottom: 5px;
                        img {
                            width: 46px;
                        }
                    }
                    span {
                        color: #666666;
                        font-size: 13px;
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
