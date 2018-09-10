<template>
    <div class="container demandTableDetaile">
        <Header title="团购需求表详情">
            <!-- <router-link to="/uploadedProducts" slot="explain" @click.native="setTransition('turn-on')">pc端上传</router-link> -->
        </Header>
        <div class="content">
            <div class="detaile">
                这里显示团购需求表的详情这里显示团购需求表的详情这里显示团购需求表的详 这里显示团购需求表的详情这里显示团购需求表的详情这里显示团购需求表的详 这里显示团购需求表的详情这里显示团购需求表的详情这里显示团购需求表的详 这里显示团购需求表的详情这里显示团购需求表的详情这里显示团购需求表的详 这里显示团购需求表的详情这里显示团购需求表的详情这里显示团购需求表的详

            </div>
        </div>
    </div>
</template>

<script>
    import Header from "../../components/header/header";

    import { mapMutations } from "vuex";
    export default {
        data() {
            return {};
        },
        components: {
            Header
        },
        created() {},
        deactivated() {
            this.$destroy();
        },
        methods: {
            ...mapMutations(["setTransition"])
        }
    };
</script>

<style lang="scss"  scoped>
    @import "../../../../../static/scss/_commonScss";
    .container {
        @include basic_container_style;
        .content {
            .detaile {
                @include box_shadow_style;
                min-height: 225px;
                padding: 13px;
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #333333;
                line-height: 18px;
                word-break: break-all;
            }
        }
    }
</style>