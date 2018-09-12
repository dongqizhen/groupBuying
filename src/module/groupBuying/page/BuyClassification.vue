<template>
    <div class="container">
        <Header :title="this.$route.name"></Header>
        <div class="content">
            <scroll-tab :DATA_MAP="DATA_MAP" v-on:selectLabel="selectLabel">
                <ul slot="right-panel-container">
                    <li v-for="(val, index) in scrollData" :key="index">
                        <span>{{val.brand}}</span>
                        <span>{{val.num}}</span>
                        <span v-if="val.rate?true:false">{{val.rate}}</span>
                    </li>
                </ul>
            </scroll-tab>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import Header from "../components/header/header";
    import scrollTab from "../components/scrollTab/scrollTab";
    const DATA_MAP = {
        全部: [
            { brand: "品牌", num: "团购数量(台)", rate: "市场保有率" },
            { brand: "新华", num: "2", rate: "25%" },
            { brand: "威高", num: "6", rate: "15%" }
        ],
        核磁共振MRI类: [
            { brand: "品牌", num: "团购数量(台)" },
            { brand: "托人", num: "8" },
            { brand: "新华", num: "2" },
            { brand: "威高", num: "6" },
            { brand: "托人", num: "8" },
            { brand: "新华", num: "2" },
            { brand: "威高", num: "6" }
        ],
        血管造影机DSA类: [
            { brand: "品牌", num: "团购数量(台)" },
            { brand: "托人", num: "8" },
            { brand: "新华", num: "2" },
            { brand: "威高", num: "6" }
        ],
        辅助: [
            { brand: "品牌", num: "团购数量(台)" },
            { brand: "托人", num: "8" },
            { brand: "新华", num: "2" },
            { brand: "威高", num: "6" }
        ],
        法师: [
            { brand: "托人", num: "8" },
            { brand: "新华", num: "2" },
            { brand: "威高", num: "6" }
        ],
        打野: [
            { brand: "托人", num: "8" },
            { brand: "新华", num: "2" },
            { brand: "威高", num: "6" }
        ],
        坦克: [
            { brand: "托人", num: "8" },
            { brand: "新华", num: "2" },
            { brand: "威高", num: "6" }
        ],
        隐身: [
            { brand: "托人", num: "8" },
            { brand: "新华", num: "2" },
            { brand: "威高", num: "6" }
        ],
        后期: [
            { brand: "托人", num: "8" },
            { brand: "新华", num: "2" },
            { brand: "威高", num: "6" }
        ],
        伏虎: [
            { brand: "托人", num: "8" },
            { brand: "新华", num: "2" },
            { brand: "威高", num: "6" }
        ],
        小气: [
            { brand: "托人", num: "8" },
            { brand: "新华", num: "2" },
            { brand: "威高", num: "6" }
        ]
    };

    export default {
        data() {
            return {
                scrollData: [],
                DATA_MAP,
                selectedLabel: "全部"
            };
        },
        created() {
            this.scrollData = DATA_MAP[this.selectedLabel];
        },
        methods: {
            selectLabel(label) {
                this.scrollData = DATA_MAP[label];
            }
        },
        components: {
            Header,
            scrollTab
        },
        watch: {}
    };
</script>
<style lang="stylus" rel="stylesheet/stylus">
    .container {
        width: 100%;
        height: 100%;
        position: fixed;

        .content {
            height: calc(100% - 44px);
            padding-top: 10px;
            background: #f6f6f6;
            overflow: auto;
        }
    }

    .cube-scroll-list-wrapper {
        .cube-tab-bar {
            flex-wrap: wrap;
            background-color: #fff;

            .cube-tab {
                width: 100px;
                padding: 20px 13px;
                font-size: 14px;
                color: #333;
                line-height: 20px;
                transition: all 0.3s ease-in;
                margin-right: 0;
                margin-bottom: 1px;
                background-color: #f6f6f6;
                flex: none;

                &.cube-tab_active {
                    color: #019DDD;
                    background-color: #fff;
                }
            }
        }
    }

    .left-panel {
        position: absolute;
        top: 54px;
        left: 0;
        bottom: 0;
        width: 100px;
        background-color: #f6f6f6;
    }

    .right-panel {
        position: absolute;
        top: 54px;
        left: 100px;
        right: 0;
        bottom: 0;
        background-color: #fff;

        li {
            height: 40px;
            display: flex;
            align-items: center;
            background-color: #fff;
            justify-content: center;
            font-size: 14px;
            color: #666;

            &:first-child {
                color: #999;
            }

            span {
                flex: 1;
                text-align: center;
            }
        }
    }
</style>
