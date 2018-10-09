<template>
    <div class="submitComment">

        <div class="footer">
            <group>
                <x-textarea v-model="Textareavalue" placeholder="发表评论" :height="34" class="ipt-box" autosize></x-textarea>
            </group>
            <!-- <textarea-autosize
  placeholder="发表评论"
  ref="someName"
  v-model="someValue"
  :min-height="16"
  :max-height="64" class="ipt-box"
></textarea-autosize> -->
        </div>
        <span>发送</span>
    </div>
</template>
<script>
    import VueTextareaAutosize from "vue-textarea-autosize";
    import { Group, XTextarea, XNumber, CellBox } from "vux";
    export default {
        data() {
            return {
                Textareavalue: ""
            };
        },
        components: {
            VueTextareaAutosize,
            Group,
            XTextarea,
            XNumber,
            CellBox
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
        /* .footer {
                                                width: 281px;
                                                border: $border_style;
                                                border-radius: 20px;
                                                // padding: 0px 13px;
                                                background: #f5f5f5;
                                                display: flex;
                                                align-items: center;
                                            } */
        .footer {
            // width: 280px;
            height: auto;
            border-bottom: none;
            padding: 10px 13px;
            padding-right: 0;
            > div {
                width: 100%;
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
        }
    }
</style>
