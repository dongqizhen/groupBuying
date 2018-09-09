<template>
    <div class="container registrationSuccess">
        <Header :title="this.$route.name"></Header>
        <div class="content">
            <success></success>
            <div class="advertising">
                <img src="" alt="">
                <span>广告</span>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from "../../components/header/header";
    import success from "../../components/common/success";
    export default {
        data() {
            return {};
        },
        components: {
            Header,
            success
        },
        created: function() {
            console.log(1);
        },
        mounted: function() {
            console.log(2);
        },
        activated: function() {
            console.log(3);
        },
        deactivated: function() {
            console.log(4);
        }
    };
</script>

<style lang="scss" scoped>
    @import "../../../../../static/scss/_commonScss";
    .container {
        @include basic_container_style;
        .content {
            position: relative;
            .advertising {
                height: 134px;
                background: #03cc03;
                position: absolute;
                bottom: 28px;
                width: calc(100% - 26px);
                span {
                    display: flex;
                    height: 16px;
                    width: 41px;
                    background: rgba(102, 102, 102, 0.28);
                    position: absolute;
                    left: 0;
                    top: 0;
                    font-family: PingFangSC-Regular;
                    font-size: 10px;
                    color: #333333;
                    align-items: center;
                    justify-content: center;
                }
            }
        }
    }
</style>