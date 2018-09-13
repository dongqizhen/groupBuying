<template>
    <div class="container myGroupBuyHospital">
        <Header title="我的团购 (医院)">
            <router-link to="/demandTable" slot="explain" @click.native="setTransition('turn-on')">需求汇总表</router-link>
        </Header>
        <div class="content">
            <div class="scroll-list-wrap">
                <scroller>
                    <basic-information isShowArrowBox isShowCheck title="医院基本信息" buttonName="医院介绍" path='/hospitalProfile'>

                    </basic-information>
                    <div class="i_join_in">
                        <basic-title title="我参加的团购" imgurl='../static/images/groupBuy.png'></basic-title>
                        <list-tab></list-tab>
                    </div>
                    <x-button type="primary" @click.native="submitBtnClick" class="">提交我的团购需求</x-button>
                </scroller>
            </div>

        </div>
    </div>
</template>

<script>
    import Header from "../../components/header/header";
    import basicInformation from "../../components/common/basicInformation";
    import listTab from "../../components/common/listTab";
    import basicTitle from "../../components/common/basicTitle";
    import { mapMutations } from "vuex";
    export default {
        data() {
            return {};
        },
        components: {
            Header,
            basicInformation,
            listTab,
            basicTitle
        },
        methods: {
            ...mapMutations(["setTransition"]),
            submitBtnClick() {
                this.$router.push("/submitGroupDemand");
            }
        }
    };
</script>

<style lang="scss"  scoped>
    @import "../../../../../static/scss/_commonScss";
    .container {
        @include basic_container_style;
        .content {
            .i_join_in {
                @include box_shadow_style;
                margin-top: 10px;
                /deep/ .basicTitle {
                    h2 {
                        border: none;
                    }
                }
            }
            /deep/ .weui-btn {
                background: #019ddd;
                font-family: PingFangSC-Regular;
                font-size: 16px;
                margin-top: 10px;
                height: 50px;
                border-radius: 6px;
                color: #fff;
                &.end {
                    background: #cccccc;
                    &:after {
                        border: none;
                    }
                }
            }
        }
    }
</style>