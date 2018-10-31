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
                                <span class="value">{{resultData.num}}{{resultData.unit}}</span>
                            </div>
                            <p class="infoCount">
                                本次团购,{{resultData.productLineName}}设备已累计申报<span>{{resultData.demandNum}}</span>{{resultData.unit}},历史累计申报共<span>{{resultData.histroyTotalDemandNum}}</span>{{resultData.unit}}。
                            </p>
                        </div>
                        <div class="common hopePrice">
                            <div>
                                <span>期望采购总价</span>
                                <span class="value">{{resultData.price}}万元</span>
                            </div>

                            <p class="infoCount">
                                本次团购，{{resultData.productLineName}}设备已累计申报<span>{{resultData.demandNum}}</span>{{resultData.unit}}，总预算为<span>{{resultData.totalPrice}}</span>万元。
                            </p>
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
                                        <span class="model" v-for="(item,ind) in val.model" :key="ind">{{item.name}}</span>
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <div class="common param">
                            <span>重要参数</span>
                            <span class="paramVal">
                                <ul>
                                    <li v-for="itemParam in resultData.params" :key="itemParam.name">{{itemParam.name}}</li>
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
                            <p class="infoCount">
                                本次团购,{{resultData.productLineName}}设备已累计申报<span>{{resultData.demandNum}}</span>{{resultData.unit}},历史累计申报共<span>{{resultData.histroyTotalDemandNum}}</span>{{resultData.unit}}。
                            </p>
                        </div>
                        <div class="common hopePrice">
                            <div>
                                <span>期望采购总价</span>
                                <span class="value">{{resultData.price}}万元</span>
                            </div>

                            <p class="infoCount">
                                本次团购，{{resultData.productLineName}}设备已累计申报<span>{{resultData.demandNum}}</span>{{resultData.unit}}，总预算为<span>{{resultData.totalPrice}}</span>万元。
                            </p>
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
                                        <span class="model" v-for="(item,ind) in val.model" :key="ind">{{item.name}}</span>
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <div class="common param">
                            <span>重要规格</span>
                            <span class="paramVal">
                                <ul>
                                    <li v-for="itemParam in resultData.params" :key="itemParam.name">{{itemParam.name}}</li>
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
                                <span class="value">{{resultData.brandList?resultData.brandList[0].brandName:""}}</span>
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

                                <p class="infoCount">
                                    本次团购,{{resultData.productLineName}}设备已累计申报<span>{{resultData.demandNum}}</span>{{resultData.unit}},历史累计申报共<span>{{resultData.histroyTotalDemandNum}}</span>{{resultData.unit}}。
                                </p>
                            </div>
                            <div class="common hopePrice">
                                <div>
                                    <span>维修预算(总价)</span>
                                    <span class="value">{{resultData.price}}万元</span>
                                </div>

                                <p class="infoCount">
                                    本次团购，{{resultData.productLineName}}设备已累计申报<span>{{resultData.demandNum}}</span>{{resultData.unit}}，总维修预算为<span>{{resultData.totalPrice}}</span>万元
                                </p>
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

                            <p class="infoCount">
                                本次团购,{{resultData.productLineName}}设备已累计申报<span>{{resultData.demandNum}}</span>{{resultData.unit}},历史累计申报共<span>{{resultData.histroyTotalDemandNum}}</span>{{resultData.unit}}。
                            </p>
                        </div>
                        <div class="common productSort">
                            <span>应用方向</span>
                            <span class="value">{{resultData.application}}</span>
                        </div>
                        <div class="common hopePrice">
                            <div>
                                <span>期望融资金额</span>
                                <span class="value">{{resultData.price}}万元</span>
                            </div>

                            <p class="infoCount">
                                本次团购,{{resultData.productLineName}}设备已累计申报<span>{{resultData.demandNum}}</span>{{resultData.unit}},历史累计申报共<span>{{resultData.totalPrice}}</span>万元。
                            </p>
                        </div>
                        <div class="common productSort">
                            <span>金融服务商</span>
                            <span class="value">{{resultData.brandList?resultData.brandList[0].brandName:""}}</span>
                        </div>
                        <div class="common param">
                            <span>关键词</span>
                            <span class="paramVal">
                                <ul>
                                    <li v-for="itemParam in resultData.params" :key="itemParam.name">{{itemParam.name}}</li>
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

                            <p class="infoCount">
                                本次团购,{{resultData.productLineName}}设备已累计申报<span>{{resultData.demandNum}}</span>{{resultData.unit}},历史累计申报共<span>{{resultData.histroyTotalDemandNum}}</span>{{resultData.unit}}。
                            </p>
                        </div>
                        <div class="common productSort">
                            <span>应用方向</span>
                            <span class="value">{{resultData.application}}</span>
                        </div>
                        <div class="common hopePrice">
                            <div>
                                <span>期望采购总价</span>
                                <span class="value">{{resultData.price}}万元</span>
                            </div>

                            <p class="infoCount">
                                本次团购,{{resultData.productLineName}}设备已累计申报<span>{{resultData.demandNum}}</span>{{resultData.unit}},历史累计申报共<span>{{resultData.totalPrice}}</span>万元。
                            </p>
                        </div>
                        <div class="common productSort">
                            <span>咨询服务商</span>
                            <span class="value">{{resultData.brandList?resultData.brandList[0].brandName:""}}</span>
                        </div>
                        <div class="common param">
                            <span>关键词</span>
                            <span class="paramVal">
                                <ul>
                                    <li v-for="itemParam in resultData.params" :key="itemParam.name">{{itemParam.name}}</li>
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
                                <span class="value">{{resultData.num}}{{resultData.unit}}</span>
                            </div>

                            <p class="infoCount">
                                本次团购,{{resultData.productLineName}}设备已累计申报<span>{{resultData.demandNum}}</span>{{resultData.unit}},历史累计申报共<span>{{resultData.histroyTotalDemandNum}}</span>{{resultData.unit}}。
                            </p>
                        </div>

                        <div class="common hopePrice">
                            <div>
                                <span>期望采购总价</span>
                                <span class="value">{{resultData.price}}万元</span>
                            </div>

                            <p class="infoCount">
                                本次团购,{{resultData.productLineName}}设备已累计申报<span>{{resultData.demandNum}}</span>{{resultData.unit}},历史累计申报共<span>{{resultData.totalPrice}}</span>万元。
                            </p>
                        </div>
                        <div class="common productSort">
                            <span>信息化品牌</span>
                            <span class="value">{{resultData.brandList?resultData.brandList[0].brandName:""}}</span>
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
                                    <li v-for="itemParam in resultData.params" :key="itemParam.name">{{itemParam.name}}</li>
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
                        <h2>会员企业留言区（{{amount}}）<span>仅限铂金、钻石会员</span></h2>
                        <div class="commentContainer">
                            <ul v-if="commentList.length">
                                <li v-for="(val,index) in commentList" :key="index">
                                    <comment-list-item :commentData='val' :index="index" v-on:delete_commit="delete_commit(val.id,index)" v-on:delete_child_comment='delete_child_comment'></comment-list-item>
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
                pullUpFlag: true,
                isShow: false,
                amount: ""
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
                        this.amount = data.amount;
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
                return this.resultData.brandList
                    ? _.join(_.map(this.resultData.brandList[0].model, "name"), ",")
                    : "";
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
                if (id != "") {
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
                }
            },
            delete_child_comment(id, index) {
                const obj = this.commentList[index];
                _.remove(obj.replyList, n => n.id == id);

                this.$set(this.commentList, index, { ...obj });
            },
            scrollStart() {}
        },
        mounted() {
            //注册原生调用删除评论方法
            window.WebViewJavascriptBridge.registerHandler(
                "deleteCommont",
                (data, responseCallback) => {
                    alert(data.index);
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
        },
        watch: {
            commentList(newVal, oldVal) {
                console.log(newVal, oldVal, newVal == oldVal);

                /* this.$nextTick(() => {
                                                                    this.isShow = false;
                                                                });
                                                                this.isShow = true; */
            }
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
            &:last-child {
                flex: 1;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                .brand {
                    width: 56px;
                    text-align: center;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    margin-right: 10px;
                    font-family: PingFangSC-Medium;
                    font-size: 12px;
                    color: #333333;
                }
                .model {
                    background: rgba(142, 142, 142, 0.05);
                    border-radius: 2px;
                    margin-right: 5px;
                    font-family: PingFangSC-Regular;
                    font-size: 12px;
                    color: #666666;
                    width: 60px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    text-align: center;
                }
            }
        }
    }
</style>
