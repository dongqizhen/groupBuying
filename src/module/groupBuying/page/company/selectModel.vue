<template>
    <div class="container selectModel">
        <Header :title="this.$route.name">
            <span slot="explain" class="enter">确定</span>
        </Header>
        <div class="content">
            <search placeholder="请输入型号"></search>
            <div class="Model_container">
                <h2>
                    <i></i>
                    我不了解该产品的型号，请厂家根据我院临床需求推荐
                </h2>
                <div class="selected">
                    <h2>已选择:</h2>
                    <ul>
                        <li v-for="item in selected" :key="item.id">
                            {{item.name}}
                            <i></i>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from "../../components/header/header";
    import search from "../../components/search/search";

    let selected = [
        {
            name: "BF-1T260",
            id: "1"
        },
        {
            name: "CF-H170i",
            id: "2"
        },
        {
            name: "CF-H170i",
            id: "2"
        }
    ];

    export default {
        data() {
            return { selected };
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
            .Model_container {
                margin-top: 10px;
                @include box_shadow_style;
                height: calc(100% - 46px);
                padding-top: 0.1px;
                > h2 {
                    height: 36px;
                    background: rgba(244, 133, 75, 0.1);
                    border-top-right-radius: 36px;
                    border-bottom-right-radius: 36px;
                    width: 330px;
                    font-family: PingFangSC-Regular;
                    font-size: 11px;
                    color: #f4854b;
                    display: flex;
                    align-items: center;
                    padding-left: 13px;
                    margin: 10px 0 10px;
                    i {
                        display: flex;
                        height: 13px;
                        width: 11px;
                        background: url("/static/images/bell.png") no-repeat center;
                        background-size: 100% 100%;
                        margin-right: 5px;
                    }
                }
                .selected {
                    h2 {
                        height: 36px;
                        padding-left: 13px;
                        font-family: PingFangSC-Regular;
                        font-size: 14px;
                        color: #666666;
                        display: flex;
                        align-items: center;
                    }
                    ul {
                        display: flex;
                        justify-content: flex-start;
                        flex-wrap: wrap;
                        padding-left: 13px;
                        li {
                            height: 30px;
                            border: 0.5px solid #999999;
                            border-radius: 7px;
                            margin-right: 19px;
                            display: flex;
                            align-items: center;
                            font-family: PingFangSC-Regular;
                            font-size: 13px;
                            color: #666666;
                            min-width: 110px;
                            padding-left: 14.5px;
                            margin-bottom: 10px;
                            i {
                                display: flex;
                                width: 26.5px;
                                height: 100%;
                                background: url("/static/images/del.png") no-repeat
                                    right center;
                                background-size: 12px 12px;
                                padding-left: 14.5px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>