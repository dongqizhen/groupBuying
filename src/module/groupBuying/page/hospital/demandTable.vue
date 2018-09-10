<template>
    <div class="container myGroupBuyHospital">
        <Header title="团购需求表">
            <router-link to="/uploadedProducts" slot="explain" @click.native="setTransition('turn-on')">pc端上传</router-link>
        </Header>
        <div class="content">

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
        }
    };
</script>

<style lang="scss"  scoped>
    @import "../../../../../static/scss/_commonScss";
    .container {
        @include basic_container_style;
        .content {
        }
    }
</style>