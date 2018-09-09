<template>
    <div class="container myGroupBuyHospital">
        <Header title="我的团购 (医院)"></Header>
        <div class="content"></div>
    </div>
</template>

<script>
    import Header from "../../components/header/header";
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