<template>
    <div class="submitComment">

        <div class="footer">
            <div class="textBox"><textarea id="txt" placeholder="发表评论" v-model.trim="value" rows='1'></textarea></div>

            <!-- <textarea-autosize
  placeholder="发表评论"
  ref="someName"
  v-model="someValue"
  :min-height="16"
  :max-height="64" class="ipt-box"
></textarea-autosize> -->
        </div>
        <span @click="sendComment()">发送</span>
    </div>
</template>
<script>
    import VueTextareaAutosize from "vue-textarea-autosize";
    import { Group, XTextarea, XNumber, CellBox } from "vux";
    import autosize from "autosize";
    import { _getData } from "../../service/getData";
    import { goldCoinAnimation } from "../mixin/mixin";

    export default {
        data() {
            return {
                Textareavalue: "",
                value: ""
            };
        },
        components: {
            VueTextareaAutosize,
            Group,
            XTextarea,
            XNumber,
            CellBox
        },
        props: ["id"],
        mixins: [goldCoinAnimation],
        mounted() {
            autosize(document.querySelector("textarea"));
        },
        methods: {
            sendComment() {
                _getData(
                    "/server_pro/videoComment!request.action",
                    {
                        method: "addModelComments",
                        params: {
                            id: this.id, //视频id
                            type: 21, //表示聊一聊
                            content: window.encodeURI(this.value), //评论内容，编码
                            parentId: "", //被回复顶层评论id
                            commentId: "" //被回复记录id
                        }
                    },
                    data => {
                        console.log(data);

                        if (data.admin_pay) {
                            this.goldCoinAnimation(data.admin_pay);
                        }

                        this.value = "";
                        document.querySelector("textarea").value = "";
                        autosize.update(document.querySelector("textarea"));
                        this.$emit("comment_success");
                    },
                    err => {
                        /* Toast({
                                            message: data.message,
                                            duration: 1000
                                        }); */
                    }
                );
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import "../../../../../static/scss/_commonScss";
    .submitComment {
        width: 349px;
        line-height: 32px;
        position: absolute;
        bottom: 0;
        left: 13px;
        border-top: $border_style;
        background: #fff;
        z-index: 1111;
        //padding: 9px 13px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0 auto;
        min-height: 52px;

        .footer {
            // width: 280px;
            height: auto;
            border-bottom: none;
            padding: 10px 13px;
            padding-right: 0;
            > div {
                width: 100%;
            }
            .textBox {
                min-height: 34px;
                padding: 4px 0;
                background: #f5f5f5;
                border-radius: 34px;
                width: 281px;
                display: flex;
                justify-content: center;
                align-items: center;

                textarea::-webkit-input-placeholder {
                    font-family: PingFangSC-Regular;
                    font-size: 14px;
                    color: #cccccc;
                }
                > textarea {
                    width: 241px;
                    height: 18px;
                    background: #f5f5f5;
                    line-height: 18px;
                    color: #999;
                    //  margin-top: 11px;
                    max-height: 72px;
                }
            }

            /deep/ .weui-cells {
                margin-top: 0;
                width: 100%;
                &:before {
                    border-top: 0;
                }
                &:after {
                    border-bottom: 0;
                }
                .weui-cell {
                    display: flex;
                    flex-direction: column;
                    padding: 0;
                    .weui-cell__hd {
                        display: none;
                    }
                    .weui-cell__bd {
                        width: 100%;
                        background-color: #f5f5f5;
                        textarea::-webkit-input-placeholder {
                            font-family: PingFangSC-Regular;
                            font-size: 14px;
                            color: #cccccc;
                        }
                        textarea {
                            color: #999;
                            font-family: PingFangSC-Regular;
                            font-size: 14px;
                            max-height: 64px;
                            background-color: #f5f5f5;
                            width: 281px;
                        }
                    }
                }
            }
        }
        // .ipt-box {
        //   background: #f5f5f5;
        //   -webkit-appearance: none;
        //   font-size: 14px;
        //   color: #999;
        //   line-height: 12px;
        // }
        span {
            display: flex;
            align-items: center;
            flex: 1;
            font-size: 14px;
            color: #666666;
            font-family: PingFangSC-Regular;
            justify-content: center;
            border-radius: 5px;
            &:active {
                background: rgba(0, 0, 0, 0.04);
            }
        }
    }
</style>
