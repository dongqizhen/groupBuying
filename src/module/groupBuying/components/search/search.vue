<template>
    <div class="search">
        <cube-input :placeholder="placeholder">
            <i slot="prepend"></i>
        </cube-input>
    </div>
</template>

<script>
    export default {
        data() {
            return {};
        },
        props: ["placeholder"]
    };
</script>

<style lang="scss" scoped>
    .search {
        background: #ffffff;
        border-radius: 5px;
        height: 36px;
        /deep/ .cube-input {
            padding-left: 13px;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            display: flex;
            justify-content: flex-start;
            border-radius: 5px;
            input::-webkit-input-placeholder {
                color: #999;
                font-family: PingFangSC-Regular;
                font-size: 14px;
            }
            input {
                padding: 8.5px 8px;
                //padding-left: 8px;
            }
            .cube-input-prepend {
                height: 14px;
                width: 14px;
                //display: flex;
                margin-right: 4px;
                i {
                    display: flex;
                    height: 14px;
                    width: 14px;
                    background: url("/static/images/write.png") no-repeat center;
                    background-size: 100% 100%;
                }
            }
            border: none;
            &:after {
                border: none;
            }
        }
    }
</style>