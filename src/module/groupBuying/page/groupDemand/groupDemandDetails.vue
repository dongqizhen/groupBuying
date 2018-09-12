<template>
    <div class="container groupDemandDetails">
        <Header :title='title'></Header>
        <div class="content">

        </div>
    </div>
</template>

<script>
    import Header from "../../components/header/header";
    import scrollTab from "../../components/scrollTab/scrollTab";
    export default {
        data() {
            return {
                title: "设备团购需求"
            };
        }
    };
</script>

<style lang="scss" scoped>
    @import "../../../../../static/scss/_commonScss";
    .container {
        @include basic_container_style;
        .content {
        }
    }
</style>