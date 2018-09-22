<template>
    <div class="container">
        <Header title="团购分类"></Header>
        <div class="content">
            <scroll-tab :DATA_MAP="DATA_MAP" v-on:selectLabel="selectLabel">
                <h2 slot="title" class="title">
                    <span>品牌</span>
                    <span>团购数量(台)</span>
                    <span>市场保有率</span>
                </h2>
                <ul slot="right-panel-container">
                    <router-link tag="li" :to="{ path: 'groupInventory', query: { groupInventoryID: val.id }}" v-for="(val, index) in scrollData" :key="index" @click.native="setTransition('turn-on')">
                        <span>{{val.brand}}</span>
                        <span>{{val.num}}</span>
                        <span>{{val.rate}}</span>
                    </router-link>
                </ul>
                <h2 slot="count" class="title countNum">
                    <span>总计</span>
                    <span>22</span>
                    <span></span>
                </h2>
            </scroll-tab>
        </div>
    </div>
</template>

<script>
    import Header from "../../components/header/header";
    import scrollTab from "../../components/scrollTab/scrollTab";
    import { mapMutations } from "vuex";
    const DATA_MAP = {
        CT类: {
            id: 1,
            count: 22,
            dataList: [
                { id: 1, brand: "托人", num: "8", rate: "35%" },
                { id: 2, brand: "新华", num: "2", rate: "25%" },
                { id: 3, brand: "威高", num: "6", rate: "15%" },
                { id: 1, brand: "托人", num: "8", rate: "35%" },
                { id: 2, brand: "新华", num: "2", rate: "25%" },
                { id: 3, brand: "威高", num: "6", rate: "15%" },
                { id: 1, brand: "托人", num: "8", rate: "35%" },
                { id: 2, brand: "新华", num: "2", rate: "25%" },
                { id: 3, brand: "威高", num: "6", rate: "15%" },
                { id: 1, brand: "托人", num: "8", rate: "35%" },
                { id: 2, brand: "新华", num: "2", rate: "25%" },
                { id: 3, brand: "威高", num: "6", rate: "15%" },
                { id: 1, brand: "托人", num: "8", rate: "35%" },
                { id: 2, brand: "新华", num: "2", rate: "25%" },
                { id: 3, brand: "威高", num: "6", rate: "15%" }
            ]
        },
        核磁共振MRI类: {
            id: 2,
            count: 22,
            dataList: [
                { id: 4, brand: "托人", num: "8", rate: "35%" },
                { id: 5, brand: "新华", num: "2", rate: "25%" },
                { id: 6, brand: "威高", num: "6", rate: "15%" },
                { id: 7, brand: "托人", num: "8", rate: "35%" },
                { id: 8, brand: "新华", num: "2", rate: "25%" },
                { id: 9, brand: "威高", num: "6", rate: "15%" }
            ]
        },
        血管造影机DSA类: {
            id: 3,
            count: 22,
            dataList: [
                { id: 10, brand: "托人", num: "8", rate: "35%" },
                { id: 11, brand: "新华", num: "2", rate: "25%" },
                { id: 12, brand: "威高", num: "6", rate: "15%" },
                { id: 13, brand: "托人", num: "8", rate: "35%" },
                { id: 14, brand: "新华", num: "2", rate: "25%" },
                { id: 15, brand: "威高", num: "6", rate: "15%" }
            ]
        },
        辅助: {
            id: 4,
            count: 22,
            dataList: [
                { id: 16, brand: "托人", num: "8", rate: "35%" },
                { id: 17, brand: "新华", num: "2", rate: "25%" },
                { id: 18, brand: "威高", num: "6", rate: "15%" },
                { id: 19, brand: "托人", num: "8", rate: "35%" },
                { id: 20, brand: "新华", num: "2", rate: "25%" },
                { id: 21, brand: "威高", num: "6", rate: "15%" }
            ]
        },
        aa: {
            id: 4,
            count: 22,
            dataList: [
                { id: 16, brand: "托人", num: "8", rate: "35%" },
                { id: 17, brand: "新华", num: "2", rate: "25%" },
                { id: 18, brand: "威高", num: "6", rate: "15%" },
                { id: 19, brand: "托人", num: "8", rate: "35%" },
                { id: 20, brand: "新华", num: "2", rate: "25%" },
                { id: 21, brand: "威高", num: "6", rate: "15%" }
            ]
        },
        dd: {
            id: 4,
            count: 22,
            dataList: [
                { id: 16, brand: "托人", num: "8", rate: "35%" },
                { id: 17, brand: "新华", num: "2", rate: "25%" },
                { id: 18, brand: "威高", num: "6", rate: "15%" },
                { id: 19, brand: "托人", num: "8", rate: "35%" },
                { id: 20, brand: "新华", num: "2", rate: "25%" },
                { id: 21, brand: "威高", num: "6", rate: "15%" }
            ]
        },
        cc: {
            id: 4,
            count: 22,
            dataList: [
                { id: 16, brand: "托人", num: "8", rate: "35%" },
                { id: 17, brand: "新华", num: "2", rate: "25%" },
                { id: 18, brand: "威高", num: "6", rate: "15%" },
                { id: 19, brand: "托人", num: "8", rate: "35%" },
                { id: 20, brand: "新华", num: "2", rate: "25%" },
                { id: 21, brand: "威高", num: "6", rate: "15%" }
            ]
        },
        ff: {
            id: 4,
            count: 22,
            dataList: [
                { id: 16, brand: "托人", num: "8", rate: "35%" },
                { id: 17, brand: "新华", num: "2", rate: "25%" },
                { id: 18, brand: "威高", num: "6", rate: "15%" },
                { id: 19, brand: "托人", num: "8", rate: "35%" },
                { id: 20, brand: "新华", num: "2", rate: "25%" },
                { id: 21, brand: "威高", num: "6", rate: "15%" }
            ]
        },
        ww: {
            id: 4,
            count: 22,
            dataList: [
                { id: 16, brand: "托人", num: "8", rate: "35%" },
                { id: 17, brand: "新华", num: "2", rate: "25%" },
                { id: 18, brand: "威高", num: "6", rate: "15%" },
                { id: 19, brand: "托人", num: "8", rate: "35%" },
                { id: 20, brand: "新华", num: "2", rate: "25%" },
                { id: 21, brand: "威高", num: "6", rate: "15%" }
            ]
        },
        sss: {
            id: 4,
            count: 22,
            dataList: [
                { id: 16, brand: "托人", num: "8", rate: "35%" },
                { id: 17, brand: "新华", num: "2", rate: "25%" },
                { id: 18, brand: "威高", num: "6", rate: "15%" },
                { id: 19, brand: "托人", num: "8", rate: "35%" },
                { id: 20, brand: "新华", num: "2", rate: "25%" },
                { id: 21, brand: "威高", num: "6", rate: "15%" }
            ]
        },
        gfg: {
            id: 4,
            count: 22,
            dataList: [
                { id: 16, brand: "托人", num: "8", rate: "35%" },
                { id: 17, brand: "新华", num: "2", rate: "25%" },
                { id: 18, brand: "威高", num: "6", rate: "15%" },
                { id: 19, brand: "托人", num: "8", rate: "35%" },
                { id: 20, brand: "新华", num: "2", rate: "25%" },
                { id: 21, brand: "威高", num: "6", rate: "15%" }
            ]
        },
        dda: {
            id: 4,
            count: 22,
            dataList: [
                { id: 16, brand: "托人", num: "8", rate: "35%" },
                { id: 17, brand: "新华", num: "2", rate: "25%" },
                { id: 18, brand: "威高", num: "6", rate: "15%" },
                { id: 19, brand: "托人", num: "8", rate: "35%" },
                { id: 20, brand: "新华", num: "2", rate: "25%" },
                { id: 21, brand: "威高", num: "6", rate: "15%" }
            ]
        }
    };

    export default {
        data() {
            return {
                scrollData: [],
                DATA_MAP,
                selectedLabel: "CT类"
            };
        },
        created() {
            this.scrollData = DATA_MAP[this.selectedLabel].dataList;
        },
        methods: {
            ...mapMutations(["setTransition"]),
            selectLabel(label) {
                this.scrollData = DATA_MAP[label].dataList;
            }
        },
        components: {
            Header,
            scrollTab
        },
        watch: {},
        activated() {},
        deactivated() {}
    };
</script>
<style lang="scss" scoped>
    @import "../../../../../static/scss/_commonScss";
    .container {
        @include basic_container_style;
        .content {
            /deep/ .scrollTab {
                .right-panel {
                    height: 100%;
                    flex: 1;
                    .title {
                        height: 42px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-bottom: $border_style;

                        &.countNum {
                            border-bottom: none;

                            span {
                                font-family: PingFangSC-Medium;
                                font-size: 14px;
                                color: #666666;
                            }
                        }

                        span {
                            font-family: PingFangSC-Regular;
                            font-size: 14px;
                            color: #999;
                            flex: 1;
                            text-align: center;
                        }
                    }
                    .cube-scroll-wrapper {
                        height: calc(100% - 42px);
                        .cube-scroll-content {
                            min-height: calc(100% +1px);
                        }
                    }
                    li {
                        height: 40px;
                        display: flex;
                        align-items: center;
                        background-color: #fff;
                        justify-content: center;
                        font-size: 14px;
                        color: #666;
                        border-bottom: $border_style;

                        &:last-child {
                            border-bottom: none;
                        }
                        span {
                            flex: 1;
                            text-align: center;
                        }
                        &:active {
                            background: rgba($color: #999, $alpha: 0.3);
                        }
                    }
                }
            }
        }
    }
</style>
