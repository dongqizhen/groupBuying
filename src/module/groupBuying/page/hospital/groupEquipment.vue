<template>
    <div class="container">
        <Header :title="this.$route.query.title"></Header>
        <div class="content">
            <div class="scroll-list-wrap">

                <cube-scroll ref="scroll">
                    <select-path-nav :productLineName="this.$route.query.productLineName" :unit="this.unit" :provinceName="this.$route.query.provinceName" :totalNum="this.$route.query.totalNum" :brandName="this.$route.query.brandName"></select-path-nav>
                    <div class="submitNumber">已提交需求的医院共<span>12</span>家</div>
                    <submit-hospital-req-info-item :result="result"></submit-hospital-req-info-item>
                </cube-scroll>
            </div>

        </div>
    </div>
</template>
<script>
    import Header from "../../components/header/header";
    import selectPathNav from "../../components/common/selectPathNav";
    import submitHospitalReqInfoItem from "../../components/common/submitHospitalReqInfoItem";
    export default {
        data() {
            return {
                result: {
                    imgUrl: "../../../../../static/images/add.png",
                    name: "张工",
                    hospital: "山东省立医院",
                    address: "山东省济南市",
                    introduce: "这是一所山东省立医院，归属山东省政府管理规划"
                },
                unit: ""
            };
        },
        components: {
            Header,
            selectPathNav,
            submitHospitalReqInfoItem
        },
        created() {
            switch (this.$route.query.title) {
                case "设备团购":
                    this.unit = "台";
                    break;
                case "耗材团购":
                    this.unit = "单";
                    break;
                case "售后团购":
                    this.unit = "台";
                    break;
                case "信息化团购":
                    this.unit = "台";
                    break;
                case "金融团购":
                    this.unit = "台";
                    break;
                case "咨询团购":
                    this.unit = "单";
                    break;
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import "../../../../../static/scss/_commonScss";
    .container {
        @include basic_container_style;
        .content {
            .submitNumber {
                font-size: 12px;
                color: #999999;
                margin-bottom: 10px;
                line-height: 17px;
                text-align: center;
                font-family: PingFangSC-Medium;
                span {
                    font-size: 12px;
                    color: #151515;
                    margin: 0 2px;
                }
            }
        }
    }
</style>
