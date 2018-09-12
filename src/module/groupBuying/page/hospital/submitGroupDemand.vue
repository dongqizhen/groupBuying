<template>
    <div class="container submitGroupDemand">
        <Header title="提交团购需求 (医院)"></Header>
        <div class="content">
            <div class="selectGroupMeeting">
                <basic-title title="选择团购大会" imgurl="/static/images/groupBuy.png">
                    <span slot="select">(必选项)</span>
                </basic-title>
                <div class="list_box">
                    <list-item></list-item>
                    <list-item></list-item>
                </div>

            </div>
            <div class="groupType">
                <basic-title title="团购需求类型" imgurl="/static/images/selectproject.png">
                    <span slot="select">(必选项)</span>
                </basic-title>
                <select-project-nav></select-project-nav>
            </div>
            <div class="productBasicInfromation">
                <basic-title title="团购需求类型" imgurl="/static/images/basicInformation.png">
                    <span slot="select">(必填项)</span>
                </basic-title>
                <ul>
                    <li v-ripple @click="setTransition('turn-on')">
                        <router-link to="/productCategory">
                            <span>设备种类：</span>
                            <cube-input placeholder="" :disabled="true">

                            </cube-input>
                            <div>CT类
                                <i></i>
                            </div>
                        </router-link>

                    </li>
                    <li class="number">
                        <group>
                            <x-number title="需求数量：" v-model="numberValue" :min="1" fillable></x-number>
                        </group>
                        <p>
                            本次团购，CT类设备已累计申报
                            <span>98</span>台，历史累计申报共
                            <span>275</span>台
                        </p>
                    </li>
                    <!-- <li v-ripple @click="setTransition('turn-on')">
                        <router-link to='/selectModel'>
                            <span>型号：</span>
                            <cube-input placeholder="请选择型号" :disabled="true">

                            </cube-input>
                            <div>默认为全线产品
                                <i></i>
                            </div>
                        </router-link>
                    </li> -->
                    <!-- <li class="price">

                        <span>团购价格：</span>
                        <cube-input placeholder="请输入团购价格" :disabled="false">
                            <span slot="append">万元</span>
                        </cube-input>
                        <div class="check_box">
                            <cube-checkbox v-model="checked">
                                对外公开
                            </cube-checkbox>
                        </div>

                    </li> -->
                    <li class="price">

                        <span>采购期望价格(总价)：</span>
                        <cube-input placeholder="请真实填写采购期望价格" :disabled="false">

                        </cube-input>
                        <div class="unit">万元</div>
                    </li>
                    <li class="clinic">
                        <!-- <label for="textarea"></label> -->
                        <group>
                            <x-textarea title="设备临床应用需求：" v-model="Textareavalue" placeholder="为保证医院的采购质量与效率，请详细填写设备的临床用途。" autosize></x-textarea>
                        </group>

                    </li>
                </ul>
            </div>
            <div class="selectBrand">
                <basic-title title='首选品牌' imgurl='../../../../../static/images/selected-first.png'>
                    <span slot="select">(必填)</span>
                    <span slot="check">重新选择</span>
                </basic-title>
                <ul>
                    <li v-ripple @click="setTransition('turn-on')">
                        <router-link to="/productCategory">
                            <span>设备种类：</span>
                            <cube-input placeholder="" :disabled="true">

                            </cube-input>
                            <div>CT类
                                <i></i>
                            </div>
                        </router-link>

                    </li>
                    <li v-ripple @click="setTransition('turn-on')">
                        <router-link to="/productCategory">
                            <span>设备种类：</span>
                            <cube-input placeholder="" :disabled="true">

                            </cube-input>
                            <div>CT类
                                <i></i>
                            </div>
                        </router-link>

                    </li>
                </ul>
                <basic-title title='次选品牌' imgurl='../../../../../static/images/selected-second.png'>

                    <span slot="check">重新选择</span>
                </basic-title>
                <ul>
                    <li v-ripple @click="setTransition('turn-on')">
                        <router-link to="/productCategory">
                            <span>设备种类：</span>
                            <cube-input placeholder="" :disabled="true">

                            </cube-input>
                            <div>CT类
                                <i></i>
                            </div>
                        </router-link>

                    </li>
                    <li v-ripple @click="setTransition('turn-on')">
                        <router-link to="/productCategory">
                            <span>设备种类：</span>
                            <cube-input placeholder="" :disabled="true">

                            </cube-input>
                            <div>CT类
                                <i></i>
                            </div>
                        </router-link>

                    </li>
                </ul>
                <basic-title title='再选品牌' imgurl='../../../../../static/images/selected-three.png'>

                </basic-title>
                <ul>
                    <li v-ripple @click="setTransition('turn-on')">
                        <router-link to="/productCategory">
                            <span>设备种类：</span>
                            <cube-input placeholder="" :disabled="true">

                            </cube-input>
                            <div>
                                <i></i>
                            </div>
                        </router-link>

                    </li>
                    <li v-ripple @click="setTransition('turn-on')">
                        <router-link to="/productCategory">
                            <span>设备种类：</span>
                            <cube-input placeholder="" :disabled="true">

                            </cube-input>
                            <div>
                                <i></i>
                            </div>
                        </router-link>

                    </li>
                </ul>
            </div>
            <div class="parameter">
                <ul>
                    <li v-ripple @click="setTransition('turn-on')">
                        <router-link to="/productCategory">
                            <span>重要参数：</span>
                            <cube-input placeholder="请选择或输入重要参数" :disabled="true">

                            </cube-input>
                            <div>
                                <i></i>
                            </div>
                        </router-link>

                    </li>
                    <li v-ripple @click="setTransition('turn-on')">
                        <router-link to="/productCategory">
                            <span>预计装机时间：</span>
                            <cube-input placeholder="请选择预计装机时间" :disabled="true">

                            </cube-input>
                            <div>
                                <i></i>
                            </div>
                        </router-link>

                    </li>
                    <li class="clinic">
                        <!-- <label for="textarea"></label> -->
                        <group>
                            <x-textarea title="采购需求说明：" v-model="Textareavalue" placeholder="为了使您的需求清晰准确，请尽量详细说明" autosize :height="43"></x-textarea>
                        </group>

                    </li>
                </ul>
            </div>
            <x-button v-if="submitBtnStatus" type="primary" @click.native="submitBtnClick">提交团购需求表</x-button>
            <x-button v-else type="primary" show-loading>提交中</x-button>
        </div>

    </div>
</template>

<script>
    import Header from "../../components/header/header";
    import listItem from "../../components/common/listItem";
    import basicTitle from "../../components/common/basicTitle";
    import selectProjectNav from "../../components/common/selectProjectNav";
    import { Group, XTextarea, XNumber, CellBox } from "vux";
    import compress from "../../../../../static/js/compressImage";
    import { mapMutations } from "vuex";
    export default {
        data() {
            return {
                checked: true,
                Textareavalue: "",
                numberValue: 1,
                introduce: "",
                submitBtnStatus: true,
                action: {
                    target: "//jsonplaceholder.typicode.com/photos/",
                    prop: "base64Value"
                }
            };
        },
        components: {
            Header,
            listItem,
            basicTitle,
            selectProjectNav,
            Group,
            XTextarea,
            XNumber,
            CellBox
        },
        methods: {
            processFile(file, next) {
                compress(
                    file,
                    {
                        compress: {
                            width: 1600,
                            height: 1600,
                            quality: 0.5
                        }
                    },
                    next
                );
            },
            fileSubmitted(file) {
                file.base64Value = file.file.base64;
            },
            submitBtnClick() {
                this.submitBtnStatus = false;
            },
            ...mapMutations(["setTransition"])
        },
        created: function() {
            // console.log(1);
        },
        mounted: function() {
            // console.log(2);
        },
        activated: function() {
            // console.log(3);
        },
        deactivated: function() {
            // console.log(4);
        }
    };
</script>

<style lang="scss" scoped>
    @import "../../../../../static/scss/_commonScss";
    .container {
        @include basic_container_style;
        /deep/ .basicTitle {
            h2 {
                p > span {
                    font-family: PingFangSC-Regular;
                    font-size: 15px;
                    color: #aaaaaa;
                    margin-left: 5px;
                }
            }
        }
        .content {
            .selectGroupMeeting {
                padding-bottom: 0.5px;
                margin-bottom: 10px;
                @include box_shadow_style;
                .list_box {
                    padding: 0 10px;
                }
            }
            .groupType {
                @include box_shadow_style;
                margin-bottom: 10px;
            }
            .productBasicInfromation {
                @include box_shadow_style;
                margin-bottom: 10px;
                /deep/ .basicTitle {
                    h2 {
                        p > span {
                            font-size: 13px;
                        }
                        .server {
                            display: flex;
                            justify-content: flex-start;
                            align-items: center;
                            font-family: PingFangSC-Regular;
                            font-size: 12px;
                            color: #333333;
                            height: 100%;

                            i {
                                width: 17px;
                                height: 14px;
                                background: url("/static/images/service.png")
                                    no-repeat center;
                                background-size: 100% 100%;
                                margin-right: 3px;
                            }
                        }
                    }
                }
                ul {
                    padding-left: 13px;
                    padding-bottom: 1px;
                    li {
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        height: 47px;
                        border-bottom: 0.5px solid #f6f6f6;
                        a {
                            display: flex;
                            justify-content: flex-start;
                            align-items: center;
                            text-decoration: none;
                            width: 100%;
                            span {
                                font-family: PingFangSC-Regular;
                                font-size: 14px;
                                color: #333333;
                                float: left;
                                //justify-content: flex-start;
                                // flex-wrap: nowrap;
                                width: auto;
                                // word-wrap: normal;
                            }
                            > div {
                                //width: calc(100% - 70px);
                                display: flex;
                                justify-content: flex-end;
                                padding-right: 13px;
                                font-family: PingFangSC-Regular;
                                font-size: 14px;
                                color: #999999;
                                i {
                                    display: flex;
                                    height: 14px;
                                    width: 8px;
                                    background: url("/static/images/grayarrow.png")
                                        no-repeat center;
                                    background-size: 100% 100%;
                                    margin-left: 3px;
                                }
                            }
                        }
                        > span {
                            font-family: PingFangSC-Regular;
                            font-size: 14px;
                            color: #333333;
                        }
                        > div {
                            display: flex;
                            justify-content: flex-end;
                            padding-right: 13px;
                            font-family: PingFangSC-Regular;
                            font-size: 14px;
                            color: #999999;
                            i {
                                display: flex;
                                height: 14px;
                                width: 8px;
                                background: url("/static/images/grayarrow.png")
                                    no-repeat center;
                                background-size: 100% 100%;
                                margin-left: 3px;
                            }
                        }
                        /deep/ .cube-input {
                            flex: 1;
                            &:after {
                                border: none;
                            }
                            input {
                                color: #999999;
                                font-family: PingFangSC-Regular;
                                font-size: 14px;
                                padding-left: 0;
                            }
                        }
                        &.price {
                            /deep/ .cube-input {
                                padding: 0;
                                input {
                                    padding-right: 0;
                                }
                            }
                            .unit {
                                font-family: PingFangSC-Regular;
                                font-size: 14px;
                                color: #333333;
                            }
                        }
                        &.clinic {
                            height: auto;
                            border-bottom: none;
                            //margin-bottom: 10px;
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
                                        height: 43px;
                                        font-family: PingFangSC-Regular;
                                        font-size: 14px;
                                        color: #333333;
                                        display: flex;
                                        align-items: center;
                                    }
                                    .weui-cell__bd {
                                        width: 100%;
                                        min-height: 40px;
                                        textarea::-webkit-input-placeholder {
                                            font-family: PingFangSC-Regular;
                                            font-size: 14px;
                                            color: #cccccc;
                                        }
                                        textarea {
                                            // height: 45px !important;
                                            color: #999;
                                            font-family: PingFangSC-Regular;
                                            font-size: 14px;
                                            margin-bottom: 12px;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    .number {
                        height: 77px;
                        flex-direction: column;
                        position: relative;
                        > div {
                            height: 46px;
                            width: 100%;
                            /deep/ .weui-cells {
                                margin-top: 0;
                                width: 100%;
                                display: flex;
                                justify-content: space-between;
                                align-items: center;

                                &::before {
                                    border: none;
                                }
                                &:after {
                                    border-bottom: none;
                                }
                                .weui-cell {
                                    padding: 0;
                                    width: 100%;
                                    font-family: PingFangSC-Regular;
                                    font-size: 14px;
                                    color: #333333;
                                    .weui-cell__ft {
                                        height: 22px;
                                        font-family: PingFangSC-Regular;
                                        font-size: 12px;
                                        color: #666666;
                                        > div {
                                            height: 22px;

                                            border-radius: 2px;
                                            a {
                                                display: flex;
                                                align-items: center;
                                                justify-content: center;
                                                height: 100%;
                                                padding: 0;
                                                width: 22px;
                                                margin-right: 0;
                                                svg {
                                                    fill: #019ddd;
                                                    width: 15px !important;
                                                }
                                                &.vux-number-disabled {
                                                    svg {
                                                        fill: #666666;
                                                    }
                                                }
                                            }
                                            input {
                                                height: 22px;
                                                font-family: PingFangSC-Regular;
                                                font-size: 12px;
                                                color: #666666;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        > p {
                            font-family: PingFangSC-Regular;
                            font-size: 11px;
                            color: #f4854b;
                            height: 21px;
                            background: rgba(244, 133, 75, 0.1);
                            display: flex;
                            align-items: center;
                            position: absolute;
                            top: 46px;
                            left: -13px;
                            padding-left: 13px;
                            min-width: 336px;
                            border-top-right-radius: 21px;
                            border-bottom-right-radius: 21px;
                            span {
                                font-family: PingFangSC-Regular;
                                font-size: 12px;
                                color: #fb5665;
                            }
                        }
                    }
                }
            }
            .selectBrand {
                @include box_shadow_style;
                margin-bottom: 10px;
                padding-bottom: 0.1px;
                /deep/ .basicTitle {
                    h2 {
                        padding-right: 0;
                        border-bottom: none;
                        i {
                            width: 10px;
                            height: 10px;
                        }
                        > span {
                            font-family: PingFangSC-Regular;
                            font-size: 12px;
                            color: #999999;
                            display: flex;
                            height: 22px;
                            align-items: center;
                            border-radius: 22px;
                            padding: 0 13px;
                            &:active {
                                background: rgba($color: #999, $alpha: 0.3);
                            }
                        }
                    }
                }
                ul {
                    background: #ffffff;
                    box-shadow: 0.5px 2px 7px 0.5px rgba(0, 0, 0, 0.09);
                    margin: 0 13px;
                    margin-bottom: 10px;
                    li {
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        height: 47px;
                        border-bottom: 0.5px solid #f6f6f6;
                        margin-left: 13px;

                        a {
                            display: flex;
                            justify-content: flex-start;
                            align-items: center;
                            text-decoration: none;
                            width: 100%;
                            span {
                                font-family: PingFangSC-Regular;
                                font-size: 14px;
                                color: #333333;
                                float: left;
                                //justify-content: flex-start;
                                // flex-wrap: nowrap;
                                width: auto;
                                // word-wrap: normal;
                            }
                            > div {
                                //width: calc(100% - 70px);
                                display: flex;
                                justify-content: flex-end;
                                padding-right: 13px;
                                font-family: PingFangSC-Regular;
                                font-size: 14px;
                                color: #999999;
                                i {
                                    display: flex;
                                    height: 14px;
                                    width: 8px;
                                    background: url("/static/images/grayarrow.png")
                                        no-repeat center;
                                    background-size: 100% 100%;
                                    margin-left: 3px;
                                }
                            }
                        }
                        > span {
                            font-family: PingFangSC-Regular;
                            font-size: 14px;
                            color: #333333;
                        }
                        > div {
                            display: flex;
                            justify-content: flex-end;
                            padding-right: 13px;
                            font-family: PingFangSC-Regular;
                            font-size: 14px;
                            color: #999999;
                            i {
                                display: flex;
                                height: 14px;
                                width: 8px;
                                background: url("/static/images/grayarrow.png")
                                    no-repeat center;
                                background-size: 100% 100%;
                                margin-left: 3px;
                            }
                        }
                        /deep/ .cube-input {
                            flex: 1;
                            &:after {
                                border: none;
                            }
                            input {
                                color: #999999;
                                font-family: PingFangSC-Regular;
                                font-size: 14px;
                                padding-left: 0;
                            }
                        }
                    }
                }
            }
            .parameter {
                @include box_shadow_style;
                margin-bottom: 10px;
                ul {
                    padding-left: 13px;
                    padding-bottom: 1px;
                    li {
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        height: 47px;
                        border-bottom: 0.5px solid #f6f6f6;
                        a {
                            display: flex;
                            justify-content: flex-start;
                            align-items: center;
                            text-decoration: none;
                            width: 100%;
                            span {
                                font-family: PingFangSC-Regular;
                                font-size: 14px;
                                color: #333333;
                                float: left;
                                //justify-content: flex-start;
                                // flex-wrap: nowrap;
                                width: auto;
                                // word-wrap: normal;
                            }
                            > div {
                                //width: calc(100% - 70px);
                                display: flex;
                                justify-content: flex-end;
                                padding-right: 13px;
                                font-family: PingFangSC-Regular;
                                font-size: 14px;
                                color: #999999;
                                i {
                                    display: flex;
                                    height: 14px;
                                    width: 8px;
                                    background: url("/static/images/grayarrow.png")
                                        no-repeat center;
                                    background-size: 100% 100%;
                                    margin-left: 3px;
                                }
                            }
                        }
                        > span {
                            font-family: PingFangSC-Regular;
                            font-size: 14px;
                            color: #333333;
                        }
                        > div {
                            display: flex;
                            justify-content: flex-end;
                            padding-right: 13px;
                            font-family: PingFangSC-Regular;
                            font-size: 14px;
                            color: #999999;
                            i {
                                display: flex;
                                height: 14px;
                                width: 8px;
                                background: url("/static/images/grayarrow.png")
                                    no-repeat center;
                                background-size: 100% 100%;
                                margin-left: 3px;
                            }
                        }
                        /deep/ .cube-input {
                            flex: 1;
                            &:after {
                                border: none;
                            }
                            input {
                                color: #999999;
                                font-family: PingFangSC-Regular;
                                font-size: 14px;
                                padding-left: 0;
                            }
                        }
                        &.clinic {
                            height: auto;
                            border-bottom: none;
                            //margin-bottom: 10px;
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
                                        height: 43px;
                                        font-family: PingFangSC-Regular;
                                        font-size: 14px;
                                        color: #333333;
                                        display: flex;
                                        align-items: center;
                                    }
                                    .weui-cell__bd {
                                        width: 100%;
                                        min-height: 40px;
                                        textarea::-webkit-input-placeholder {
                                            font-family: PingFangSC-Regular;
                                            font-size: 14px;
                                            color: #cccccc;
                                        }
                                        textarea {
                                            // height: 45px !important;
                                            color: #999;
                                            font-family: PingFangSC-Regular;
                                            font-size: 14px;
                                            margin-bottom: 12px;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            /deep/ .weui-btn {
                background: #019ddd;
                font-family: PingFangSC-Regular;
                font-size: 16px;

                height: 50px;
                border-radius: 6px;
            }
        }
    }
</style>