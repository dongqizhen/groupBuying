<template>
    <div class="noData">
        <img src="../../../../../static/images/noData.png" alt="">
        <span>{{mainTitle}}</span>
        <span>{{secondTitle}}</span>
    </div>
</template>

<script>
    export default {
        data() {
            return {};
        },
        props: {
            mainTitle: {
                type: String,
                default: "暂无参加的团购"
            },
            secondTitle: {
                type: String,
                default: "赶快去参加团购吧"
            }
        }
    };
</script>

<style lang="scss" scoped>
    .noData {
        display: flex;
        height: 100%;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        img {
            height: 154px;
            width: 142px;
            margin-bottom: 10px;
        }
        span {
            font-family: PingFangSC-Regular;
            font-size: 15px;
            color: #666666;
            &:last-child {
                font-size: 12px;
                color: #999999;
                margin-top: 10px;
            }
        }
    }
</style>