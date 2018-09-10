<template>
    <div class="demandList">
        <div class="common productSort">
            <span>产品分类</span>
            <span class="value">CT类</span>
            <span class="taiNumber">
                <b>5</b>台</span>
        </div>
        <div class="common hopeBrand">
            <ul>
                <li>
                    <span>
                        <img src="../../../../../static/images/selected-first.png">
                        <span>首选</span>
                    </span>
                    <span class="brandAndModel">
                        <span class="brand">GE</span>
                        <span class="model">ATS5000</span>
                        <span class="model">1C697BEM731</span>
                    </span>
                </li>
                <li>
                    <span>
                        <img src="../../../../../static/images/selected-second.png">
                        <span>次选</span>
                    </span>
                    <span class="brandAndModel">
                        <span class="brand">飞利浦</span>
                        <span class="model">飞895645</span>
                        <span class="model">飞利浦14526</span>
                    </span>
                </li>
                <li>
                    <span>
                        <img src="../../../../../static/images/selected-three.png">
                        <span>再选</span>
                    </span>
                    <span class="brandAndModel">
                        <span class="brand">西门子</span>
                        <span class="model">edge</span>
                    </span>
                </li>
            </ul>
        </div>

    </div>
</template>
<script>
    export default {
        data() {
            return {};
        },
        components: {}
    };
</script>
<style lang="scss" scoped>
    @import "../../../../../static/scss/_commonScss";
    .demandList {
        .common {
            width: 100%;
            padding: 0 13px;
            border-bottom: 0.5px solid #f6f6f6;
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
                b {
                    font-family: BebasNeue;
                    font-size: 24px;
                    color: #333333;
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
