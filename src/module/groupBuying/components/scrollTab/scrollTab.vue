<template>
    <div class="scrollTab">
        <!-- <cube-page type="scroll-tab-view" title="ScrollTab"> -->

        <div class="left-panel">
            <cube-scroll>
                <cube-tab-bar v-model="selectedLabel" :data="tabs" @change="changeHandler"></cube-tab-bar>
            </cube-scroll>
        </div>
        <div class="right-panel">
            <slot name="title"></slot>
            <cube-scroll ref="scroll">
                <slot name="right-panel-container"></slot>
            </cube-scroll>
            <slot name="count"></slot>
        </div>

        <!--  </cube-page> -->
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tabs: [],
                selectedLabel: ""
            };
        },
        created() {},
        props: ["DATA_MAP"],
        methods: {
            changeHandler(label) {
                this.$emit("selectLabel", label);
                this.$nextTick(() => {
                    this.$refs.scroll.scrollTo(0, 0);
                    this.$refs.scroll.refresh();
                });
            }
        },
        components: {},
        mounted() {
            const genTabLabels = Object.keys(this.DATA_MAP).map((label, index) => {
                if (index == 0) {
                    this.selectedLabel = label;
                }
                return {
                    label
                };
            });
            this.tabs = genTabLabels;
        },
        computed: {},
        watch: {
            selectedLabel(newV) {
                console.log(newV);
            }
        },
        activated() {},
        deactivated() {
            // this.$destroy();
        }
    };
</script>
<style lang="scss" scoped>
    .scrollTab {
        height: calc(100% - 10px);
        margin-top: 10px;
        display: flex;
        justify-content: flex-start;
        overflow: hidden;
        .left-panel {
            height: 100%;
            width: 100px;
            background-color: #f6f6f6;
            /deep/ .cube-scroll-wrapper {
                height: 100%;

                .cube-scroll-content {
                    min-height: calc(100% + 1px);
                    .cube-scroll-list-wrapper {
                        .cube-tab-bar {
                            display: flex;
                            flex-direction: column;
                            flex-wrap: wrap;
                            background-color: #fff;
                            font-family: PingFangSC-Regular;

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
                                    color: #019ddd;
                                    background-color: #fff;
                                    font-family: PingFangSC-Medium;
                                }
                            }
                        }
                    }
                }
            }
        }

        .right-panel {
            flex: 1;
            background-color: #fff;
        }
    }
</style>
