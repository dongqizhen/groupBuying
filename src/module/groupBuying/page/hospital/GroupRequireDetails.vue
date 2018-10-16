<template>
    <div class="container">
        <Header :title="`${$route.query.title?$route.query.title:'团购'}需求详情`"></Header>
        <div class="content">
            <div class="scroll-list-wrap">
                <cube-scroll ref="scroll" :options="options" @pulling-up="pullUpLoad" :refreshDelay="3" @before-scroll-start="scrollStart">
                    <man-hospital-info class="hospitalAttention" :result="resultData"></man-hospital-info>

                    <!-- <budget-count></budget-count> -->
                    <!-- 设备团购 -->
                    <div v-if="type=='SBTG'" class="intention">

                        <div class="common productSort">
                            <span>设备分类</span>
                            <span class="value">{{resultData.productLineName}}</span>
                        </div>
                        <div class="common  number">
                            <div class="requireNumber">
                                <span>需求数量</span>
                                <span class="value">{{resultData.num}}台</span>
                            </div>
                            <div class="infoCount">
                                本次团购,CT类设备已累计申报<span>{{resultData.demandNum}}</span>台,历史累计申报共<span>{{resultData.histroyTotalDemandNum}}</span>台。
                            </div>
                        </div>
                        <div class="common hopePrice">
                            <div>
                                <span>期望采购总价</span>
                                <span class="value">{{resultData.price}}万</span>
                            </div>

                            <div class="infoCount">
                                本次团购，CT类设备已累计申报<span>{{resultData.demandNum}}</span>台，总预算为<span>{{resultData.totalPrice}}</span>万元。
                            </div>
                        </div>
                        <div class="common hopeBrand">
                            <ul>
                                <li v-for="(val,index) in resultData.brandList" :key="index">
                                    <span>
                                        <img :src="index==0?'../static/images/selected-first.png':(index==1?'../static/images/selected-second.png':'../static/images/selected-three.png')">
                                        <span>{{index==0?"首选":(index==1?'次选':'再选')}}</span>
                                    </span>
                                    <span class="value">
                                        <span class="brand">{{val.brandName}}</span>
                                        <span class="model" v-for="(item,ind) in val.modelList" :key="ind">{{item.modelName}}</span>
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <div class="common param">
                            <span>重要参数</span>
                            <span class="paramVal">
                                <ul>
                                    <li v-for="itemParam in resultData.paramList" :key="itemParam.paramName">{{itemParam.paramName}}</li>
                                </ul>
                            </span>
                        </div>
                        <div class="common perdictTime">
                            <span>预计装机时间</span>
                            <span class="value">{{resultData.showLoadTime}}</span>
                        </div>
                        <div class="common demandIntroduce">
                            <span>本院采购需求说明</span>
                            <span class="value">{{resultData.introduce}}</span>
                        </div>
                    </div>

                    <!--耗材团购-->
                    <div v-if="type=='HCTG'" class="intention">

                        <div class="common productSort">
                            <span>产品分类</span>
                            <span class="value">{{resultData.productLineName}}</span>
                        </div>
                        <div class="common  number">
                            <div class="requireNumber">
                                <span>需求数量</span>
                                <span class="value">{{resultData.num}}单</span>
                            </div>
                            <div class="infoCount">
                                本次团购,CT类设备已累计申报<span>{{resultData.demandNum}}</span>单,历史累计申报共<span>{{resultData.histroyTotalDemandNum}}</span>单。
                            </div>
                        </div>
                        <div class="common hopePrice">
                            <div>
                                <span>期望采购总价</span>
                                <span class="value">{{resultData.price}}万</span>
                            </div>

                            <div class="infoCount">
                                本次团购，CT类设备已累计申报<span>{{resultData.demandNum}}</span>单，总预算为<span>{{resultData.totalPrice}}</span>万元。
                            </div>
                        </div>
                        <div class="common hopeBrand">
                            <ul>
                                <li v-for="(val,index) in resultData.brandList" :key="index">
                                    <span>
                                        <img :src="index==0?'../static/images/selected-first.png':(index==1?'../static/images/selected-second.png':'../static/images/selected-three.png')">
                                        <span>{{index==0?"首选":(index==1?'次选':'再选')}}</span>
                                    </span>
                                    <span class="value">
                                        <span class="brand">{{val.brandName}}</span>
                                        <span class="model" v-for="(item,ind) in val.modelList" :key="ind">{{item.modelName}}</span>
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <div class="common param">
                            <span>重要规格</span>
                            <span class="paramVal">
                                <ul>
                                    <li v-for="itemParam in resultData.paramList" :key="itemParam.paramName">{{itemParam.paramName}}</li>
                                </ul>
                            </span>
                        </div>
                        <div class="common perdictTime">
                            <span>预计需求时间</span>
                            <span class="value">{{resultData.showLoadTime}}</span>
                        </div>
                        <div class="common demandIntroduce">
                            <span>本院采购需求说明</span>
                            <span class="value">{{resultData.introduce}}</span>
                        </div>
                    </div>

                    <!--售后团购-->
                    <div class="afterSever" v-if="type=='SHTG'">
                        <div class="box equipmentSortAndBrandAndModel">
                            <!-- <budget-count></budget-count> -->
                            <div class="common productSort">
                                <span>设备分类</span>
                                <span class="value">{{resultData.productLineName}}</span>
                            </div>
                            <div class="common productSort">
                                <span>设备品牌</span>
                                <span class="value">{{resultData.brandName}}</span>
                            </div>
                            <div class="common productSort">
                                <span>设备型号</span>
                                <span class="value">{{model()}}</span>
                            </div>
                        </div>
                        <div class="box equipmentBasicInfo">
                            <div class="common hopePrice">
                                <div>
                                    <span>设备台数</span>
                                    <span class="value">{{resultData.num}}台</span>
                                </div>

                                <div class="infoCount">
                                    本次团购,CT类设备已累计申报<span>{{resultData.demandNum}}</span>台,历史累计申报共<span>{{resultData.histroyTotalDemandNum}}</span>台。
                                </div>
                            </div>
                            <div class="common hopePrice">
                                <div>
                                    <span>维修预算(总价)</span>
                                    <span class="value">{{resultData.price}}万</span>
                                </div>

                                <div class="infoCount">
                                    本次团购，CT类设备已累计申报<span>{{resultData.demandNum}}</span>台，总维修预算为<span>{{resultData.totalPrice}}</span>万元
                                </div>
                            </div>
                            <div class="common">
                                <span>维修时间</span>
                                <span class="value">{{resultData.showLoadTime}}</span>
                            </div>
                            <div class="common">
                                <span>设备安装日期</span>
                                <span class="value">{{resultData.installTime}}</span>
                            </div>
                            <div class="common">
                                <span>该设备每天检查量</span>
                                <span class="value">{{resultData.deviceCheckNum}}人</span>
                            </div>
                            <div class="common">
                                <span>响应时间</span>
                                <span class="value">{{resultData.responseTime}}</span>
                            </div>
                        </div>
                        <div class="box maintenanceSort">
                            <div class="common">
                                <span>维保类型</span>
                                <span class="value">{{resultData.maintenanceType==0?'全保':(resultData.maintenanceType==1?'备件保':'人工保')}}</span>
                            </div>
                            <div class="common">
                                <span>备注信息</span>
                                <span class="value">{{resultData.introduce}}</span>
                            </div>
                        </div>
                    </div>

                    <!-- 金融团购-->
                    <div class="counsel" v-if="type=='JRTG'">
                        <div class="common hopePrice">
                            <div>
                                <span>金融分类</span>
                                <span class="value">{{resultData.productLineName}}</span>
                            </div>

                            <div class="infoCount">
                                本次团购,CT类设备已累计申报<span>{{resultData.demandNum}}</span>单,历史累计申报共<span>{{resultData.histroyTotalDemandNum}}</span>单。
                            </div>
                        </div>
                        <div class="common productSort">
                            <span>应用方向</span>
                            <span class="value">{{resultData.application}}</span>
                        </div>
                        <div class="common hopePrice">
                            <div>
                                <span>期望融资金额</span>
                                <span class="value">{{resultData.price}}万</span>
                            </div>

                            <div class="infoCount">
                                本次团购,CT类设备已累计申报<span>{{resultData.demandNum}}</span>单,历史累计申报共<span>{{resultData.totalPrice}}</span>万元。
                            </div>
                        </div>
                        <div class="common productSort">
                            <span>金融服务商</span>
                            <span class="value">{{resultData.brandName}}</span>
                        </div>
                        <div class="common param">
                            <span>关键词</span>
                            <span class="paramVal">
                                <ul>
                                    <li v-for="itemParam in resultData.paramList" :key="itemParam.paramName">{{itemParam.paramName}}</li>
                                </ul>
                            </span>
                        </div>
                        <div class="common productSort">
                            <span>预计装机时间</span>
                            <span class="value">{{resultData.showLoadTime}}</span>
                        </div>
                        <div class="common productSort">
                            <span>本院采购需求说明</span>
                            <span class="value">{{resultData.introduce}}</span>
                        </div>
                    </div>

                    <!-- 咨询团购-->
                    <div class="counsel" v-if="type=='ZXTG'">
                        <div class="common hopePrice">
                            <div>
                                <span>咨询分类</span>
                                <span class="value">{{resultData.productLineName}}</span>
                            </div>

                            <div class="infoCount">
                                本次团购,CT类设备已累计申报<span>{{resultData.demandNum}}</span>次,历史累计申报共<span>{{resultData.histroyTotalDemandNum}}</span>次。
                            </div>
                        </div>
                        <div class="common productSort">
                            <span>应用方向</span>
                            <span class="value">{{resultData.application}}</span>
                        </div>
                        <div class="common hopePrice">
                            <div>
                                <span>期望采购总价</span>
                                <span class="value">{{resultData.price}}万</span>
                            </div>

                            <div class="infoCount">
                                本次团购,CT类设备已累计申报<span>{{resultData.demandNum}}</span>次,历史累计申报共<span>{{resultData.totalPrice}}</span>万元。
                            </div>
                        </div>
                        <div class="common productSort">
                            <span>咨询服务商</span>
                            <span class="value">{{resultData.brandName}}</span>
                        </div>
                        <div class="common param">
                            <span>关键词</span>
                            <span class="paramVal">
                                <ul>
                                    <li v-for="itemParam in resultData.paramList" :key="itemParam.paramName">{{itemParam.paramName}}</li>
                                </ul>
                            </span>
                        </div>
                        <div class="common productSort">
                            <span>预计咨询时间</span>
                            <span class="value">{{resultData.showLoadTime}}</span>
                        </div>
                        <div class="common productSort">
                            <span>本院采购需求说明</span>
                            <span class="value">{{resultData.introduce}}</span>
                        </div>
                    </div>

                    <!-- 信息化团购 -->
                    <div class="counsel" v-if="type=='XXHTG'">
                        <div class="common productSort">
                            <span>平台分类</span>
                            <span class="value">{{resultData.productLineName}}</span>
                        </div>
                        <div class="common hopePrice">
                            <div>
                                <span>需求数量</span>
                                <span class="value">{{resultData.num}}台</span>
                            </div>

                            <div class="infoCount">
                                本次团购,CT类设备已累计申报<span>{{resultData.demandNum}}</span>台,历史累计申报共<span>{{resultData.histroyTotalDemandNum}}</span>台。
                            </div>
                        </div>

                        <div class="common hopePrice">
                            <div>
                                <span>期望采购总价</span>
                                <span class="value">{{resultData.price}}万</span>
                            </div>

                            <div class="infoCount">
                                本次团购,CT类设备已累计申报<span>{{resultData.demandNum}}</span>台,历史累计申报共<span>{{resultData.totalPrice}}</span>万元。
                            </div>
                        </div>
                        <div class="common productSort">
                            <span>信息化品牌</span>
                            <span class="value">{{resultData.brandName}}</span>
                        </div>
                        <div class="common productSort">
                            <span>信息化应用需求</span>
                            <span class="value">{{resultData.application}}</span>
                        </div>
                        <div class="common productSort">
                            <span>信息化型号</span>
                            <span class="value">{{model()}}</span>
                        </div>
                        <div class="common param">
                            <span>重要参数</span>
                            <span class="paramVal">
                                <ul>
                                    <li v-for="itemParam in resultData.paramList" :key="itemParam.paramName">{{itemParam.paramName}}</li>
                                </ul>
                            </span>
                        </div>
                        <div class="common productSort">
                            <span>预计装机时间</span>
                            <span class="value">{{resultData.showLoadTime}}</span>
                        </div>
                        <div class="common productSort">
                            <span>本院采购需求说明</span>
                            <span class="value">{{resultData.introduce}}</span>
                        </div>
                    </div>
                    <div class="comment">
                        <h2>会员企业留言区<span>（仅限铂金、钻石会员）</span></h2>
                        <div class="commentContainer">
                            <ul v-if="commentList.length">
                                <li v-for="(val,index) in commentList" :key="index">
                                    <comment-list-item :commentData='val' :index="index" v-on:delete_commit="delete_commit(val.id,index)"></comment-list-item>
                                </li>
                            </ul>
                            <div v-else class="noComment">
                                <img src="../../../../../static/images/sofa.png" alt="">
                                <span>还没有企业发表留言，快来抢沙发~</span>
                            </div>
                        </div>
                    </div>
                    <!--  <comment :commentList='commentList'></comment> -->

                </cube-scroll>

            </div>
            <submit-comment :id="resultData.id" v-on:comment_success="comment_success"></submit-comment>
        </div>
    </div>
</template>
<script>
    import Header from "../../components/header/header";
    import submitComment from "../../components/common/submitComment";
    import comment from "../../components/common/comment";
    import manHospitalInfo from "../../components/common/manHospitalInfo";
    import requireDetailItem from "../../components/common/requireDetailItem";
    import budgetCount from "../../components/common/budgetCount";
    import { _getData } from "../../service/getData";
    import commentListItem from "../../components/common/commentListItem";
    import _ from "lodash";

    export default {
        data() {
            return {
                resultData: {},
                commentList: [],
                options: {
                    pullUpLoad: false
                },
                currentPage: 1,
                pageCount: 1,
                pullUpFlag: true
            };
        },
        components: {
            Header,
            submitComment,
            comment,
            manHospitalInfo,
            requireDetailItem,
            budgetCount,
            commentListItem
        },
        props: ["type"],
        methods: {
            keyWords() {
                switch (this.$router.query.title) {
                    case "团购设备":
                        return {
                            key: "设备"
                        };
                }
            },
            async getCommentList(currentPage) {
                await _getData(
                    "/server_pro/groupPurchaseHospital!request.action",
                    {
                        method: "getDemandCommentList",

                        params: {
                            id: this.$route.query.id,
                            currentPage: currentPage || this.currentPage,
                            countPerPage: 6
                        }
                    },
                    data => {
                        console.log(data);
                        if (this.currentPage == 1) {
                            this.commentList = data.list;
                        } else {
                            this.commentList = [...this.commentList, ...data.list];
                        }

                        if (this.commentList.length == 0) {
                            this.options.pullUpLoad = false;
                        } else {
                            this.options.pullUpLoad = {
                                threshold: 0,
                                txt: {
                                    noMore: "全部数据加载完毕"
                                }
                            };
                        }

                        this.$nextTick(() => {
                            this.$refs.scroll.refresh();
                        });
                        this.pageCount = data.pageCount;
                    }
                );
            },
            model() {
                return _.join(this.resultData.modelList, ",");
            },
            comment_success() {
                this.currentPage = 1;
                this.$refs.scroll.scrollToElement(".comment", 0, 0, 0);
                this.getCommentList(1);
            },
            pullUpLoad() {
                this.currentPage += 1;
                //this.$refs.scroll.forceUpdate();
                if (this.currentPage > this.pageCount) {
                    this.$refs.scroll.forceUpdate();
                    this.$nextTick(() => {
                        this.$refs.scroll.refresh();
                    });
                    return;
                }
                setTimeout(() => {
                    this.getCommentList().then(() => {
                        this.$refs.scroll.forceUpdate();
                    });
                }, 500);
            },
            delete_commit(id, index) {
                console.log(id);
                this.commentList.splice(index, 1);
                if (this.commentList.length == 0) {
                    this.options.pullUpLoad = false;
                }
                _getData(
                    "/server_pro/videoComment!request.action",
                    {
                        method: "deleteCommentById",

                        params: {
                            objId: id, // id
                            type: 21 //表示聊一聊
                        }
                    },
                    data => {
                        console.log(data);
                    }
                );
            },
            scrollStart() {}
        },
        mounted() {
            //注册原生调用删除评论方法
            window.WebViewJavascriptBridge.registerHandler(
                "deleteCommont",
                (data, responseCallback) => {
                    this.commentList.splice(data.index, 1);
                }
            );
        },
        activated() {
            console.log(this.$USER_INFO);
            _getData(
                "/server_pro/groupPurchaseHospital!request.action",
                {
                    method: "getGroupPurchaseHospitalDemandInfo",
                    params: { id: this.$route.query.id }
                },
                data => {
                    console.log(data);
                    this.resultData = data;
                }
            );
            // this.currentPage = 1;
            this.getCommentList();
        },
        deactivated() {
            this.$destroy();
        }
    };
</script>
<style lang="scss" scoped>
    @import "../../../../../static/scss/_commonScss";

    .container {
        @include basic_container_style;
        .content {
            padding-bottom: 52px;
            .hospitalAttention {
                /deep/ .leftBox {
                    padding: 10px 0 10px 18px;
                }
            }
            /deep/ .cube-scroll-wrapper {
                .cube-scroll-content {
                    padding-bottom: 0 !important;
                    .cube-pullup-wrapper {
                        .before-trigger {
                            font-size: 13px;
                            color: #999999;
                            font-family: PingFangSC-Regular;
                            padding: 15px 0;
                        }
                        .after-trigger {
                            padding: 12.5px 0;
                            .cube-loading {
                                font-size: 18px;
                            }
                        }
                    }
                }
            }
            .common {
                width: 100%;
                padding: 13px;
                border-bottom: $border-style;
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-family: PingFangSC-Regular;
                font-size: 13px;
                color: #999;

                span.value {
                    width: 189px;
                    color: #333;
                    line-height: 18px;
                }
            }

            .hopePrice,
            .number {
                display: flex;
                flex-direction: column;
                padding: 0;
                align-items: flex-start;

                > div {
                    display: flex;
                    justify-content: space-between;
                    width: 100%;

                    &:first-child {
                        padding: 13px 13px 8px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        .value {
                            display: flex;
                            width: 189px;
                        }
                    }
                }
                .infoCount {
                    width: 336px;
                    line-height: 21px;
                    display: flex;
                    background-color: rgba(244, 133, 75, 0.1);
                    font-family: PingFangSC-Regular;
                    font-size: 11px;
                    color: #f4854b;
                    padding-left: 13px;
                    border-top-right-radius: 10.5px;
                    border-bottom-right-radius: 10.5px;
                    margin-bottom: 13px;
                    justify-content: flex-start;
                    span {
                        color: #fb5665;
                        display: inline-block;
                    }
                }
            }
            .hopeBrand {
                ul {
                    width: 100%;
                    li {
                        margin-bottom: 13px;
                        display: flex;
                        justify-content: flex-start;
                        width: 100%;
                        > span {
                            display: flex;
                            &:first-child {
                                width: 61px;
                                display: flex;
                                align-items: center;
                                justify-content: flex-start;
                                span {
                                    display: inline-block;
                                    height: 100%;
                                    line-height: 18px;
                                    font-family: PingFangSC-Regular;
                                    font-size: 13px;
                                }
                            }
                            &:last-child {
                                flex: 1;
                                display: flex;
                                justify-content: flex-start;
                                align-items: center;
                                .brand {
                                    width: 56px;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    white-space: nowrap;
                                    margin-right: 15px;
                                    font-family: PingFangSC-Medium;
                                    font-size: 12px;
                                    color: #333333;
                                }
                                .model {
                                    padding: 0 10px;
                                    background: rgba(142, 142, 142, 0.05);
                                    border-radius: 2px;
                                    margin-right: 5px;
                                    font-family: PingFangSC-Regular;
                                    font-size: 12px;
                                    color: #666666;
                                }
                            }
                        }

                        &:last-child {
                            margin-bottom: 0;
                        }
                        img {
                            width: 10px;
                            height: 10px;
                            margin-right: 4px;
                        }
                        .value {
                            // margin-left: 20px;
                        }
                    }
                }
            }
            .param {
                min-height: 44px;
                padding: 0;
                padding-left: 13px;
                font-family: PingFangSC-Regular;
                font-size: 13px;
                color: #999999;
                .paramVal {
                    width: 250px;

                    ul {
                        display: flex;
                        width: 100%;
                        justify-content: flex-start;
                        flex-wrap: wrap;
                        li {
                            padding: 0 15px;
                            background-color: #ebebeb;
                            border-radius: 2px;

                            color: #333;
                            height: 19px;
                            line-height: 19px;
                            margin: 5px 0;
                            margin-right: 10px;
                            font-family: PingFangSC-Regular;
                            font-size: 13px;
                        }
                    }
                }
            }
            .demandIntroduce {
                border-bottom: none;
            }
            .intention {
                @include box_shadow_style;
                margin-bottom: 10px;
            }
            .box {
                background-color: #fff;
                margin-bottom: 10px;
                @include box_shadow_style;
                .number {
                    border-bottom: $border-style;
                }
            }
            .counsel {
                @include box_shadow_style;
                background-color: #fff;
                margin-bottom: 10px;
            }
            .comment {
                background-color: #fff;
                h2 {
                    padding: 13px;
                    font-family: PingFangSC-Medium;
                    font-size: 14px;
                    color: #333333;

                    border-bottom: $border_style;
                    span {
                        font-family: PingFangSC-Regular;
                        font-size: 14px;
                        color: #aaaaaa;
                    }
                }
                .noComment {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    height: 240px;
                    img {
                        height: 59px;
                        width: 57px;
                    }
                    span {
                        color: #999;
                        font-size: 12px;
                        margin-top: 20px;
                    }
                }
            }
        }
    }
</style>
