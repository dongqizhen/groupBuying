<template>
    <div class="container productCategory">
        <Header :title="this.$route.name">
            <span slot="explain" class="enter">确定</span>
        </Header>
        <div class="content">
            <search placeholder="请输入品牌"></search>
            <div class="Stick_container">
                <ul class="stick_area">
                    <li v-for="(item,index) in stick_area_arr" :key='index'>
                        <span>{{item}}</span>
                        <span>取消置顶</span>
                    </li>
                </ul>
                <ul class="general_area">
                    <li v-for="(item,index) in general_area_arr" :key='index'>
                        <span>{{item}}</span>
                        <span>置顶</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    let stick_area_arr = ["CT类", "核磁共振MRI类", "血管造影机类"],
        general_area_arr = ["普放类", "超声影像类", "核医学类", "放疗类"];
    import Header from "../../components/header/header";
    import search from "../../components/search/search";
    export default {
        data() {
            return {
                stick_area_arr,
                general_area_arr
            };
        },
        components: {
            Header,
            search
        },
        methods: {}
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
                        padding-right: 13px;
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
                    }
                }
                .general_area {
                    li > span:last-child {
                        font-family: PingFangSC-Regular;
                        font-size: 12px;
                        color: #019ddd;
                    }
                }
            }
        }
    }
</style>