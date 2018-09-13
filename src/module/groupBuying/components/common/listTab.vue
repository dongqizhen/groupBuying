<template>
    <div class="scrollWrapper">
        <div class="listTab">
            <cube-tab-bar v-model="ScrollListSelectedLabel" showSlider ref="tabNav">
                <cube-tab v-for="(item, index) in listTabs" :label="item.label" :key="item.label">
                </cube-tab>
            </cube-tab-bar>
        </div>
        <div class="tab-slide-container">
            <cube-slide ref="slide" :loop="false" :initial-index="initialIndex" :auto-play="false" :show-dots="false" :options="slideOptions" @scroll="scroll" @change="changePage">
                <cube-slide-item>
                    <list-item></list-item>
                    <list-item></list-item>
                </cube-slide-item>
                <cube-slide-item>
                    <list-item></list-item>
                    <list-item></list-item>
                </cube-slide-item>
            </cube-slide>
        </div>
    </div>
</template>

<script>
    import ListItem from "./listItem";
    export default {
        data() {
            return {
                loop: false,
                ScrollListSelectedLabel: "2018(3场)",
                listTabs: [
                    {
                        label: "2018(3场)"
                    },
                    {
                        label: "2019(8场)"
                    }
                ],
                slideOptions: {
                    listenScroll: true,
                    probeType: 3,
                    /* lock y-direction when scrolling horizontally and  vertically at the same time */
                    directionLockThreshold: 0
                }
            };
        },
        components: {
            ListItem
        },
        props: ["meetingListData"],
        methods: {
            scroll(pos) {
                const x = Math.abs(pos.x);
                const tabItemWidth = this.$refs.tabNav.$el.clientWidth;
                const slideScrollerWidth = this.$refs.slide.slide.scrollerWidth;
                const deltaX = x / slideScrollerWidth * tabItemWidth;
                this.$refs.tabNav.setSliderTransform(deltaX);
            },
            changePage(current) {
                this.ScrollListSelectedLabel = this.listTabs[current].label;
                console.log(current);
            },
            findIndex(ary, fn) {
                if (ary.findIndex) {
                    return ary.findIndex(fn);
                }
                /* istanbul ignore next */
                let index = -1;
                /* istanbul ignore next */
                ary.some((item, i, ary) => {
                    const ret = fn.call(this, item, i, ary);
                    if (ret) {
                        index = i;
                        return ret;
                    }
                });
                /* istanbul ignore next */
                return index;
            }
        },
        computed: {
            initialIndex() {
                let index = 0;
                index = this.findIndex(
                    this.listTabs,
                    item => item.label === this.ScrollListSelectedLabel
                );
                return index;
            }
        }
    };
</script>

<style lang="scss" scoped>
    .scrollWrapper {
        .listTab {
            height: 40px;
            border-bottom: 1px solid #e9e9e9;
            box-sizing: border-box;
            /deep/ .cube-tab-bar {
                height: 100%;

                .cube-tab {
                    margin: 0;
                    &.cube-tab_active {
                        color: #019ddd;
                    }
                }
                .cube-tab-bar-slider {
                    background: #019ddd;
                }
            }
        }
        .tab-slide-container {
            padding: 10px 10px 0;
        }
    }
</style>