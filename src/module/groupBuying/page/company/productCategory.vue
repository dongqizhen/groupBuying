<template>
    <div class="container productCategory">
        <Header :title="this.$route.name">
            <span slot="explain" class="enter">确定</span>
        </Header>
        <div class="content">
            <search placeholder="请输入品牌" v-on:valueChange="prentValueChange"></search>
            <div class="Stick_container">
                <ul class="stick_area">
                    <li v-for="(item,index) in stick_area_arr" :key='index' :class="item.id == checkedId?'active':''" @click="checkedHandle(item.id)">
                        <span>{{item.name}}</span>
                        <span @click.stop="cancelStick(item)">取消置顶</span>
                    </li>
                </ul>
                <ul class="general_area">
                    <li v-for="(item,index) in general_area_arr" :key='index' :class="item.id == checkedId?'active':''" @click="checkedHandle(item.id)">
                        <span>{{item.name}}</span>
                        <span @click.stop="Stick(item)">置顶</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import _ from "lodash";
    let stick_area_arr = [
            { name: "CT类", id: 1, num: 20 },
            { name: "核磁共振MRI类", id: 2, num: 3 },
            { name: "血管造影机类", id: 3, num: 4 }
        ],
        general_area_arr = [
            { name: "普放类", id: 4, num: 12 },
            { name: "超声影像类", id: 5, num: 7 },
            { name: "核医学类", id: 6, num: 10 },
            { name: "放疗类", id: 7, num: 11 }
        ];
    import Header from "../../components/header/header";
    import search from "../../components/search/search";
    export default {
        data() {
            return {
                stick_area_arr,
                general_area_arr,
                value: "",
                checkedId: null
            };
        },
        components: {
            Header,
            search
        },
        methods: {
            cancelStick(item) {
                this.stick_area_arr = _.without(this.stick_area_arr, item);
                this.general_area_arr.push(item);
                this.general_area_arr = _.orderBy(
                    this.general_area_arr,
                    ["num"],
                    "desc"
                );
            },
            Stick(item) {
                this.general_area_arr = _.without(this.general_area_arr, item);
                this.stick_area_arr.unshift(item);
            },
            prentValueChange(value) {
                console.log(value);
            },
            checkedHandle(id) {
                this.checkedId = id;
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "../../../../../static/scss/_commonScss";
    .container {
        @include basic_container_style;

        /deep/ header {
            .search {
                .enter {
                    padding-right: 13px;
                    font-family: PingFangSC-Regular;
                    font-size: 14px;
                    color: #333333;
                }
            }
        }
        .content {
            .Stick_container {
                @include box_shadow_style;
                margin-top: 10px;
                height: calc(100% - 46px);
                .stick_area,
                .general_area {
                    background: #fff;
                    border-radius: 5px;
                    li {
                        height: 46px;
                        display: flex;
                        align-items: center;
                        margin-left: 13px;
                        padding-right: 8px;
                        border-bottom: 0.5px solid #f6f6f6;
                        font-family: PingFangSC-Regular;
                        font-size: 14px;
                        color: #333333;
                        display: flex;
                        justify-content: space-between;
                        &.active {
                            > span:first-child {
                                color: #019ddd;
                            }
                        }
                        &:active {
                            background: rgba($color: #999, $alpha: 0.3);
                        }
                    }
                }
                .stick_area {
                    background: rgba(126, 211, 33, 0.04);
                    li > span:last-child {
                        font-family: PingFangSC-Regular;
                        font-size: 12px;
                        color: #999999;
                        display: flex;
                        height: 30px;
                        align-items: center;
                        border-radius: 7px;
                        padding: 0 5px;
                        /*  &:active {
                                                                                                                                                                                                                                                                    background: rgba($color: #999, $alpha: 0.3);
                                                                                                                                                                                                                                                                } */
                    }
                }
                .general_area {
                    li > span:last-child {
                        font-family: PingFangSC-Regular;
                        font-size: 12px;
                        color: #019ddd;
                        display: flex;
                        height: 30px;
                        align-items: center;
                        border-radius: 7px;
                        padding: 0 5px;
                        /* &:active {
                                                                                                                                                                                                                                                                    background: rgba($color: #999, $alpha: 0.3);
                                                                                                                                                                                                                                                                } */
                    }
                }
            }
        }
    }
</style>