<template>
    <div class="container">
        <Header :isSearchHide="false" :title="this.$route.name"></Header>
        <div class="content">
            <div class="scroll-list-wrap">
                <cube-scroll ref="scroll">
                    <div class="Select_project">
                        <basic-title title="请选择团购项目" imgurl="../static/images/selectproject.png">
                            <span slot="select">(必选项，多选)</span>
                        </basic-title>
                        <select-project-nav v-on:select-value="handleSelect" MultipleSelection></select-project-nav>
                    </div>
                    <div class="company_basic_information">
                        <basic-title title="医院基本信息" imgurl="../static/images/basicInformation.png">
                            <span slot="select">(必填题)</span>
                        </basic-title>
                        <ul>
                            <li v-ripple>
                                <span>医院名称：</span>
                                <cube-input v-model.trim="submitData.hospitalName" placeholder="请输入医院名称"></cube-input>
                            </li>
                            <li v-ripple @click="openNative">
                                <span>地址：</span>
                                <cube-input :placeholder="responseData" :disabled="true">
                                    <i slot="append"></i>
                                </cube-input>
                            </li>
                        </ul>
                    </div>
                    <div class="personal_informatin">
                        <basic-title title="团购负责人信息" imgurl='../static/images/blueBasicInformation.png'>
                            <span slot="select">(
                                <i>*</i>为必填项)</span>
                        </basic-title>
                        <personal-information ref="person" :disabled="false" :isShowStar='true' isShowAddBtn></personal-information>
                    </div>
                    <div class="hospitalIntroduce">
                        <basic-title title="医院详情介绍" imgurl='../static/images/hospitalDetails.png'></basic-title>
                        <group>
                            <x-textarea v-model="introduce" placeholder="请输入医院介绍" autosize></x-textarea>
                        </group>
                    </div>
                    <x-button v-if="submitBtnStatus" type="primary" @click.native="submitBtnClick">提交报名表</x-button>
                    <x-button v-else type="primary" show-loading>提交中</x-button>
                </cube-scroll>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from "../../components/header/header";
    import basicTitle from "../../components/common/basicTitle";
    import personalInformation from "../../components/common/personalInformation";
    import selectProjectNav from "../../components/common/selectProjectNav";
    import { Group, XTextarea } from "vux";
    import { _getData } from "../../service/getData";
    import { openNativeNav } from "../../components/mixin/mixin";
    export default {
        data() {
            return {
                introduce: "",
                submitBtnStatus: true,
                submitData: {
                    id: "",
                    hospitalName: "积水潭医院",
                    address: "北京积水潭",
                    lat: "",
                    lng: "",
                    introduce: "",
                    groupPurchaseTypeIds: "",
                    province: "",
                    city: "",
                    productlineId: "",
                    contact: ""
                },
                responseData: "请选择地址"
            };
        },
        mixins: [openNativeNav],
        components: {
            Header,
            basicTitle,
            personalInformation,
            selectProjectNav,
            Group,
            XTextarea
        },
        methods: {
            submitBtnClick() {
                this.submitBtnStatus = false;
                console.log(this.$refs.person.persons);
                this.submitData.contact = JSON.stringify(this.$refs.person.persons);
                this.submit();
                this.submitBtnStatus = true;
            },
            submit() {
                _getData(
                    "/server_pro/groupPurchaseHospital!request.action",
                    {
                        method: "addOrUpdateGroupPurchaseHospital",
                        params: this.submitData
                    },
                    data => {
                        console.log(data);
                        this.$router.push({
                            path: "registrationSuccess",
                            query: {
                                hospitalNum: data.hospitalNum
                            }
                        });
                    }
                );
            },
            handleClickEvent() {},
            handleSelect(value) {
                console.log(value);
                this.submitData.groupPurchaseTypeIds = value;
            },
            openNative() {
                JsCallNativeMethods(
                    "navNativePage",
                    {
                        actionName: "selectAddressPage",
                        isForResult: true
                    },
                    data => {
                        if (data.provinceName == data.cityName) {
                            this.responseData = data.cityName;
                        } else {
                            this.responseData = `${data.provinceName}·${
                                data.cityName
                            }`;
                        }
                    }
                );
            }
        },
        created() {
            console.log("created");
        },
        activated() {
            console.log("active");
        },
        deactivated() {
            console.log("disactived");
        }
    };
</script>

<style lang="scss" scoped>
    @import "../../../../../static/scss/_commonScss";
    input::-webkit-input-placeholder {
        //color: #333 !important;
        opacity: 1;
        font-family: PingFangSC-Regular;
        font-size: 14px !important;
    }
    .container {
        @include basic_container_style;
        .content {
            /deep/ .basicTitle {
                p {
                    span {
                        font-family: PingFangSC-Regular;
                        font-size: 15px;
                        color: #aaaaaa;
                        letter-spacing: 0;
                        margin-left: 5px;
                        display: flex;
                        align-items: center;
                        justify-content: flex-start;
                        i {
                            font-size: 16px;
                            //width: 10px;
                            color: #f11f1f;
                            display: flex;
                            justify-content: center;
                            margin-right: 4px;
                            align-items: center;
                            font-family: PingFangSC-Regular;
                        }
                    }
                }
            }
            .Select_project {
                background: #ffffff;
                box-shadow: 0.5px 1px 3px 0.5px rgba(0, 0, 0, 0.1);
                border-radius: 5px;
                margin-bottom: 10px;
            }
            .company_basic_information {
                background: #ffffff;
                box-shadow: 0.5px 1px 3px 0.5px rgba(0, 0, 0, 0.1);
                border-radius: 5px;
                margin-bottom: 10px;
                ul {
                    padding-left: 13px;
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
                            }
                            > div {
                                display: flex;
                                justify-content: flex-end;
                                padding-right: 13px;
                                font-family: PingFangSC-Regular;
                                font-size: 14px;
                                color: #999999;
                                flex: 1;
                                i {
                                    display: flex;
                                    height: 14px;
                                    width: 8px;
                                    background: url("../../../../../static/images/grayarrow.png")
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
                            flex: 1;
                            i {
                                display: flex;
                                height: 14px;
                                width: 8px;
                                background: url("../../../../../static/images/grayarrow.png")
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
            .personal_informatin {
                background: #ffffff;
                box-shadow: 0.5px 1px 3px 0.5px rgba(0, 0, 0, 0.1);
                border-radius: 5px;
                margin-bottom: 10px;
                /deep/ .personalInformation {
                    .details {
                        ul {
                            li {
                                span {
                                    width: auto;
                                }
                                > div {
                                    //width: auto;
                                    input {
                                        color: #999999;
                                    }
                                    input::-webkit-input-placeholder {
                                        color: #ccc !important;
                                        opacity: 1;
                                        font-family: PingFangSC-Regular;
                                        font-size: 14px !important;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            .hospitalIntroduce {
                @include box_shadow_style;
                margin-bottom: 10px;
                /deep/ .weui-cells {
                    margin-top: 0;
                    border-radius: 5px;
                    &::before {
                        border: 0;
                    }
                    &:after {
                        border: 0;
                    }
                    .weui-cell {
                        min-height: 106px;
                        padding: 13px;
                    }
                    textarea::-webkit-input-placeholder {
                        font-family: PingFangSC-Regular;
                        font-size: 14px;
                        color: #cccccc;
                    }
                    textarea {
                        font-family: PingFangSC-Regular;
                        font-size: 14px;
                        color: #999;
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
