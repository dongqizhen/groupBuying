<template>
    <div class="container registrationSuccess">
        <Header :title="title"></Header>
        <div class="content">
            <success :companyNum="companyNum" :hospitalNum="hospitalNum"></success>
            <div class="advertising">
                <img src="" alt="">
                <span>广告</span>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from "../../components/header/header";
    import success from "../../components/common/success";
    import { mapMutations } from "vuex";
    import { _getData } from "../../service/getData";
    export default {
        data() {
            return {
                title: "报名成功(企业)"
            };
        },
        components: {
            Header,
            success
        },
        props: ["companyNum", "hospitalNum"],
        created: function() {},
        mounted: function() {
            console.log(2);
        },
        methods: {
            ...mapMutations([
                "setTransition",
                "setUserType",
                "setUserCompanyIdOrHospitalId"
            ])
        },
        activated: function() {
            console.log(3);
            if (this.companyNum) {
                this.title = "报名成功(企业)";
            } else {
                this.title = "报名成功(医院)";
            }
            _getData(
                //获取用户类型(企业或医院)
                "/server_pro/groupPurchase!request.action",
                {
                    method: "getIsRegGroupPuchase",
                    params: {}
                },
                data => {
                    console.log("获取的用户类型：", data);

                    this.setUserType(data.type);
                    this.setUserCompanyIdOrHospitalId(data.id);
                }
            ).then(data => {
                console.log(data);
            });
        },
        deactivated() {
            console.log(4);
        }
    };
</script>

<style lang="scss" scoped>
    @import "../../../../../static/scss/_commonScss";
    .container {
        @include basic_container_style;
        .content {
            padding: 10px 13px;
            position: relative;
            .advertising {
                height: 134px;
                background: #03cc03;
                position: absolute;
                bottom: 28px;
                // width: 100%;
                width: calc(100% - 26px);
                display: none;
                span {
                    display: flex;
                    height: 16px;
                    width: 41px;
                    background: rgba(102, 102, 102, 0.28);
                    position: absolute;
                    left: 0;
                    top: 0;
                    font-family: PingFangSC-Regular;
                    font-size: 10px;
                    color: #333333;
                    align-items: center;
                    justify-content: center;
                }
            }
        }
    }
</style>
