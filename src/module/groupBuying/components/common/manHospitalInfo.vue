<template>
    <div class="manHospitalInfo">
        <hos-man-attention :result="newResult"></hos-man-attention>
        <div class="bottomBox clearfix">
            <div class="hospitalAndAddress">
                <basic-title :title="result.hospitalName" imgurl="../static/images/hospital.png"></basic-title>

                <div class="address" @click.stop="toNativeMapPage(result)">
                    <img src="../../../../../static/images/site.png" alt="">
                    <span>{{result.addr}}</span>
                </div>
            </div>
            <router-link :to='{path:"/hospitalProfile",query:{id:result.hospitalId}}' @click.native="clickLink">
                <div class="hospitalIntroduce">
                    <span>医院介绍</span>
                    <img src="../../../../../static/images/rightArrow.png" alt="">
                </div>
            </router-link>
        </div>
    </div>
</template>
<script>
    import hosManAttention from "./hosManAttention";
    import basicTitle from "../../components/common/basicTitle";
    import { ToNativeMap } from "../mixin/mixin";
    export default {
        data() {
            return {
                newResult: {}
            };
        },
        props: ["result"],
        mixins: [ToNativeMap],
        components: {
            hosManAttention,
            basicTitle
        },
        methods: {
            clickLink() {
                this.$store.commit("setTransition", "turn-on");
            }
        },
        watch: {
            result(newResult) {
                console.log(newResult);
                this.newResult = newResult;
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import "../../../../../static/scss/_commonScss";
    .manHospitalInfo {
        width: 100%;
        height: 150px;
        @include box_shadow_style;

        margin-bottom: 10px;
        .bottomBox {
            // padding: 0 13px;
            position: relative;
            .hospitalAndAddress {
                /deep/ .basicTitle {
                    margin: 5px 0;
                    h2 {
                        border-bottom: 0;
                    }
                }
            }

            .hospital {
                margin-bottom: 18px;
                margin-top: 18px;
                img {
                    width: 16px;
                    height: 16px;
                    margin-right: 8px;
                }
                .hospitalName {
                    font-family: PingFangSC-Medium;
                    font-size: 16px;
                    color: #333;
                    font-weight: 600;
                }
            }
            .address {
                padding-left: 13px;
                display: flex;
                justify-content: flex-start;
                img {
                    width: 14px;
                    height: 13px;
                    margin-right: 8px;
                }
                span {
                    font-family: PingFangSC-Medium;
                    font-size: 13px;
                    color: #666666;
                }
            }
            > a {
                display: flex;
                position: absolute;
                right: 13px;
                top: 50%;
                text-decoration: none;
                //margin-top: -6.5px;
                .hospitalIntroduce {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    span {
                        font-family: PingFangSC-Medium;
                        font-size: 13px;
                        color: #019ddd;
                        margin-right: 9px;
                    }
                    img {
                        width: 7px;
                        height: 12px;
                        vertical-align: middle;
                    }
                }
            }
        }
    }
</style>

