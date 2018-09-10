<template>
    <div class="container">
        <Header :isSearchHide="false" :title="this.$route.name">
            <router-link to="/uploadedProducts" slot="explain" @click.native="setTransition('turn-on')">上传的产品</router-link>
        </Header>
        <div class="content">
            <basic-information isShowArrowBox isShowCheck title="企业基本信息" buttonName="企业介绍" path="/companyProfile"></basic-information>
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
        }
    }
</style>