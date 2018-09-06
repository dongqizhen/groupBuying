<template>
    <div class="container">
        <Header :isSearchHide="false" :title="this.$route.name">
            <span slot="explain" class="enter">确定</span>
        </Header>
        <div class="content">
            <search placeholder="请输入主营业务"></search>
            <h2>可多选</h2>
            <div class="wrapper_box">
                <cube-scroll>
                    <ul>
                        <li class="active">CT类</li>
                        <li>核磁共振MRI类</li>
                        <li>血管造影机类</li>
                        <li>普放类</li>
                        <li>超声影像类</li>
                        <li>核医学类</li>
                        <li>放疗类</li>
                        <li>麻醉类</li>
                        <li>软式内窥镜</li>
                        <li>电刀、超声刀等医学刀类</li>
                        <li>血液净化类</li>
                        <li>消毒设备类</li>
                        <li>电刀、超声刀等医学刀类</li>
                    </ul>
                </cube-scroll>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from "../../components/header/header";
    import search from "../../components/search/search";
    export default {
        data() {
            return {};
        },
        components: {
            Header,
            search
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
            overflow: hidden;

            > h2 {
                height: 38px;
                display: flex;
                justify-content: flex-start;
                padding-left: 13px;
                align-items: center;
                font-family: PingFangSC-Regular;
                font-size: 13px;
                color: #666666;
            }
            .wrapper_box {
                background: #ffffff;
                box-shadow: 0.5px 1px 2px 0.5px rgba(0, 0, 0, 0.1);
                border-radius: 5px;
                padding-left: 13px;
                height: calc(100% - 74px);
                ul {
                    li {
                        height: 46px;
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        border-bottom: 0.5px solid #f6f6f6;
                        font-family: PingFangSC-Regular;
                        font-size: 14px;
                        color: #333333;
                        &.active {
                            color: #019ddd;
                        }
                        &:last-child {
                            border-bottom: none;
                        }
                    }
                }
            }
        }
    }
</style>