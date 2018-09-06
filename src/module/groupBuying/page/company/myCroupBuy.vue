<template>
    <div class="container">
        <Header :isSearchHide="false" :title="this.$route.name">
            <router-link to="/uploadedProducts" slot="explain" @click.native="setTransition('turn-on')">上传的产品</router-link>
        </Header>
        <div class="content">
            <basic-information isShowArrowBox isShowCheck></basic-information>
            <div class="i_join_in">
                <basic-title title="我参加的团购" imgurl='/static/images/groupBuy.png'></basic-title>
                <list-tab></list-tab>
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
        methods: { ...mapMutations(["setTransition"]) }
    };
</script>

<style lang="scss" scoped>
    @import "../../../../../static/scss/_commonScss";
    .container {
        height: 100%;
        width: 100%;
        position: fixed;
        .content {
            height: calc(100% - #{$header-height});
            padding: 10px 13px;
            background: $base-backgroud;
            overflow: auto;
            .i_join_in {
                background: #fff;
                margin-top: 10px;
                box-shadow: 0.5px 1px 3px 0.5px rgba(0, 0, 0, 0.1);
                border-radius: 5px;
                /deep/ .basicTitle {
                    h2 {
                        border: none;
                    }
                }
            }
        }
    }
</style>