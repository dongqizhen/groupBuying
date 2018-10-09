<template>
    <div class="container searchIndex">
        <Header>
            <cube-input v-model="value" slot="mainTitle"></cube-input>
        </Header>
        <div class="content">

        </div>
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

<style lang="scss" scoped>
    @import "../../../../../static/scss/_commonScss";
    .container {
        @include basic_container_style;
        /deep/ header {
            h2 {
                .cube-input {
                    width: 276px;
                    height: 30px;
                    background: #f2f2f2;
                    border-radius: 15px;
                }
            }
        }
    }
</style>