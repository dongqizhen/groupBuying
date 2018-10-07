<template>
    <div class="demandList">
        <div class="common productSort">
            <span>{{keyWords()}}分类</span>
            <span class="value">{{data.productLineName}}</span>
            <span class="taiNumber">
                <b>{{data.num}}</b>
                <a>台</a>
            </span>
        </div>
        <div class="common hopeBrand" v-if="this.$route.query.title=='设备团购' ||this.$route.query.title=='耗材团购' || pageName=='hospitalProfile'">
            <ul>
                <li>
                    <span>
                        <img src="../../../../../static/images/selected-first.png">
                        <span>首选</span>
                    </span>
                    <span class="brandAndModel">
                        <span class="brand">{{data.brandList[0].brandName}}</span>
                        <span class="model" v-for="(val,index) in data.brandList[0].modelList" :key="index">{{val.modelName}}</span>

                    </span>
                </li>
                <li>
                    <span>
                        <img src="../../../../../static/images/selected-second.png">
                        <span>次选</span>
                    </span>
                    <span class="brandAndModel">
                        <span class="brand">{{data.brandList[1].brandName}}</span>
                        <span class="model" v-for="(val,index) in data.brandList[1].modelList" :key="index">{{val.modelName}}</span>

                    </span>
                </li>
                <li>
                    <span>
                        <img src="../../../../../static/images/selected-three.png">
                        <span>再选</span>
                    </span>
                    <span class="brandAndModel">
                        <span class="brand">{{data.brandList[2].brandName}}</span>
                        <span class="model" v-for="(val,index) in data.brandList[2].modelList" :key="index">{{val.modelName}}</span>
                    </span>
                </li>
            </ul>
        </div>
        <div v-if="this.$route.query.title=='售后团购'">
            <div class="common productSort"><span>设备品牌</span>
                <span class="value">GE</span></div>
            <div class="common productSort model">
                <span>设备型号</span>
                <ul>
                    <li>ATS5000</li>
                    <li>IC697BEM731</li>
                </ul>
            </div>
        </div>
        <div v-if="this.$route.query.title=='金融团购'">
            <div class="common productSort"><span>金融服务商</span>
                <span class="value">GE</span>
            </div>

        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {};
        },
        components: {},
        props: ["pageName", "data"],
        methods: {
            keyWords() {
                switch (this.$route.query.title) {
                    case "设备团购":
                        return "设备";
                    case "售后团购":
                        return "设备";
                    case "咨询团购":
                        return "咨询";
                    case "金融团购":
                        return "金融";
                    case "信息化团购":
                        return "平台";
                    case "耗材团购":
                        return "耗材";
                    default:
                        return "产品";
                }
            }
        },
        mounted() {
            console.log(this.data);
        }
    };
</script>
<style lang="scss" scoped>
    @import "../../../../../static/scss/_commonScss";
    .demandList {
        .common {
            width: 100%;
            padding: 0 13px;
            border-bottom: $border_style;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            font-family: PingFangSC-Regular;
            font-size: 13px;
            color: #999999;
        }
        %value {
            > span {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                &.value {
                    // width: 181px;
                    color: #333;
                }
                &:first-child {
                    margin-right: 10px;
                }
            }
        }
        .productSort {
            @extend %value;
            height: 50px;
            .value {
                font-size: 16px;
                // font-weight: 600;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                font-family: PingFangSC-Medium;
                width: 218px;
            }
            .taiNumber {
                font-family: PingFangSC-Regular;
                font-size: 10px;
                color: #999999;
                display: flex;
                align-items: flex-end;

                b {
                    font-family: BebasNeue;
                    font-size: 24px;
                    color: #333333;
                }
                a {
                    font-family: PingFangSC-Regular;
                    font-size: 10px;
                    color: #999999;
                    margin-bottom: 2px;
                    text-decoration: none;
                }
            }
            &.model {
                ul {
                    display: flex;
                    justify-content: flex-start;
                    flex: 1;
                    li {
                        background: rgba(142, 142, 142, 0.05);
                        border-radius: 2px;
                        height: 19px;
                        font-family: PingFangSC-Regular;
                        font-size: 12px;
                        color: #666666;
                        padding: 0 10px;
                        line-height: 19px;
                        margin-right: 10px;
                    }
                }
            }
        }
        .hopeBrand {
            ul {
                width: 100%;
                padding: 13px 0;

                li {
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    margin-bottom: 13px;
                    height: 19px;
                    &:last-child {
                        margin-bottom: 0;
                    }
                    img {
                        width: 10px;
                        height: 10px;
                        vertical-align: middle;
                        margin-right: 4px;
                    }
                    @extend %value;
                    > span {
                        height: 100%;
                    }
                    .brandAndModel {
                        display: flex;
                        flex: 1;
                        justify-content: flex-start;
                        align-items: center;
                        span {
                            height: 19px;
                            line-height: 19px;
                            display: inline-block;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                    }
                    .brand {
                        width: 56px;
                        // margin-left: 10px;
                        background: #999999;
                        border-radius: 2px;
                        font-size: 12px;
                        color: #ffffff;
                        text-align: center;
                        // margin-bottom: -4px;
                    }
                    .model {
                        margin-left: 10px;
                        background: rgba(142, 142, 142, 0.05);
                        border-radius: 2px;
                        text-align: center;
                        font-size: 12px;
                        color: #666;
                        min-width: 49px;
                        max-width: 98px;
                        //margin-bottom: -4px;
                        padding: 0 10px;
                    }
                }
            }
        }
    }
</style>
