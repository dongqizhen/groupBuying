<template>

    <div class="clearfix commentList" @click="toNativeCommentDetails(commentData.id,index)">
        <div class="left" @click.stop="friendInfo(commentData.userId)">

            <img v-lazy="commentData.userImageUrl" alt="">
        </div>
        <div class="right">
            <div class="nameBox">
                <span class="userName">{{commentData.username}}</span>
                <span class="commentTime">{{commentData.createdOn}}</span>
                <div class="approve" :class="isActive?'active':''" @click.stop="triggle(commentData.id)">
                    <i :class="isActive?'animated tada':''"></i>

                    <span>{{dianzanshu}}</span>
                </div>
            </div>
            <p>{{decodeURI(commentData.content)}}</p>
            <div class="replyBtn">
                <span @click.stop="moreOpetationReward(commentData.id)">打赏</span>
                <span><a>{{commentData.commentNum}}</a>回复</span>
                <span class="delete" v-if="$USER_INFO.userid==commentData.userId" @click.stop="delete_commit(commentData.id)">删除</span>
            </div>
            <ul class="reply" v-if="commentData.replyList.length">
                <li v-for="(val,index) in commentData.replyList" :key="index">
                    <div v-if="val.commentId == -1">
                        <span class="name">{{val.username}}：</span>
                        <span>{{decodeURI(val.content)}}</span>
                    </div>
                    <div v-else>
                        <span class="name">{{val.username}}：</span>
                        <span>{{decodeURI(val.content)}}</span>
                        //
                        <span class="name">@{{val.commentName}}：</span>
                        <span>{{decodeURI(val.commentContent)}}</span>
                    </div>
                </li>

            </ul>
        </div>
    </div>
</template>
<script>
    import { _getData } from "../../service/getData";
    import {
        toNativeCommentDetails,
        friendInfo,
        moreOpetationReward
    } from "../mixin/mixin";
    export default {
        data() {
            return {
                isActive: this.commentData.isDianzan,
                dianzanshu: this.commentData.amount
            };
        },
        components: {},
        mixins: [toNativeCommentDetails, friendInfo, moreOpetationReward],
        methods: {
            like(id, flag) {
                _getData(
                    "/server_pro/dianzan!request.action",
                    {
                        method: "addOrDeleteDianzan_v27",

                        params: {
                            id: id,
                            type: 30, //
                            controlflag: flag //1表示取消，0表示添加（传的是现在的状态）
                        }
                    },
                    data => {}
                );
            },
            triggle(id) {
                if (this.isActive) {
                    this.like(id, 1);
                    this.dianzanshu = this.dianzanshu - 1;
                } else {
                    this.like(id, 0);
                    this.dianzanshu = this.dianzanshu + 1;
                }

                this.isActive = !this.isActive;
            },
            delete_commit(id, index) {
                this.$emit("delete_commit", id, this.index);
            },
            NativeCommentDetails() {}
        },
        mounted() {},
        props: {
            commentData: {
                type: Object,
                default: {}
            },
            index: {
                type: Number
            }
        },
        watch: {
            commentData(newVal, oldVal) {
                console.log(newVal, oldVal);
                console.log(this.commentData.isDianzan);
                this.isActive = newVal.isDianzan == 0 ? false : true;
                this.dianzanshu = newVal.amount;
            }
        }
    };
</script>
<style lang="scss" scoped>
    .commentList {
        min-height: 80px;
        padding: 13px;
        border-bottom: 1px solid #f0f0f0;
        .left {
            width: 46px;
            height: 100%;
            img {
                height: 36px;
                width: 36px;
                border-radius: 100%;
            }
        }
        .right {
            width: calc(100% - 46px);
            .nameBox {
                font-size: 12px;
                color: #666;
                position: relative;
                margin-bottom: rem(6);
                > span {
                    display: block;
                    color: #406599;
                    font-size: 14px;
                    line-height: 20px;
                    font-family: PingFangSC-Regular;
                    &:nth-child(2) {
                        font-size: 12px;
                        text-align: left;
                        color: #999999;
                        line-height: 17px;
                        font-family: PingFangSC-Regular;
                    }
                }
                .approve {
                    color: #aaa;
                    position: absolute;
                    right: 0;
                    top: 0;
                    line-height: 24px;
                    height: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    /deep/ .VueStar {
                        height: 16px;
                        width: 16px;
                        left: -20px;
                        .VueStar__ground {
                            width: 100%;
                            height: 100%;
                            .VueStar__icon {
                                width: 100%;
                                height: 100%;
                                img {
                                    width: 100%;
                                    height: 100%;
                                }
                            }
                        }
                        .VueStar__decoration {
                            width: 32px;
                            height: 32px;
                            left: -100px;
                            top: -100px;

                            &.VueStar__decoration--active {
                                background-position: -2500px 0;
                            }
                        }
                    }
                    i {
                        width: 16px;
                        height: 16px;
                        vertical-align: middle;
                        margin-right: 4px;
                        background: url("../../../../../static/images/approve.png")
                            no-repeat left center;
                        background-size: 100% 100%;
                    }
                    span {
                        display: flex;
                        align-items: center;
                        font-size: 12px;

                        font-family: PingFangSC-Regular;
                        float: left;
                    }
                    &.active {
                        color: #fb6441;
                        i {
                            background: url("../../../../../static/images/approve-active.png")
                                no-repeat left center;
                            background-size: 100% 100%;
                        }
                    }
                }
            }
            p {
                width: 100%;
                word-break: break-all;
                font-size: 15px;
                color: #666;
                line-height: 24px;
                margin-top: 6px;
                margin-bottom: 20px;
                font-family: PingFangSC-Regular;
            }
            .replyBtn {
                height: 23px;
                margin-bottom: 20px;
                span {
                    display: flex;
                    float: left;
                    height: 100%;
                    padding: 0 16px;
                    font-family: PingFangSC-Regular;
                    text-align: center;
                    align-items: center;
                    line-height: 23px;
                    font-size: 12px;
                    color: #666;
                    background: #f5f5f5;
                    border-radius: 23px;
                    margin-right: 8px;
                    a {
                        color: #666;
                        text-decoration: none;
                    }
                    &.delete {
                        float: right;
                        background: #fff;
                        padding: 0;
                        //padding: 0 13px;
                        border-radius: 23px;
                        margin-right: 0;
                    }
                    &:active {
                        background: rgba(0, 0, 0, 0.04);
                    }
                }
            }
            .reply {
                padding: 10px 13px;
                background: #f5f5f5;
                margin-bottom: 14px;
                li {
                    font-size: 14px;
                    color: #2a2a2a;
                    line-height: 20px;
                    margin-bottom: 7px;
                    word-break: break-all;
                    font-family: PingFangSC-Regular;
                    &:last-child {
                        margin-bottom: 0;
                    }
                    span {
                        /* display: flex;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    align-items: center; */
                        &.name {
                            color: #406599;
                        }
                    }
                }
            }
        }
    }
    .tada {
        -webkit-animation-name: tada;
        animation-name: tada;
    }
    .animated {
        -webkit-animation-duration: 1s;
        animation-duration: 1s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }

    @keyframes tada {
        from {
            -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
        }

        10%,
        20% {
            -webkit-transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);
            transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);
        }

        30%,
        50%,
        70%,
        90% {
            -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
            transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
        }

        40%,
        60%,
        80% {
            -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
            transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
        }

        to {
            -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
        }
    }
</style>
