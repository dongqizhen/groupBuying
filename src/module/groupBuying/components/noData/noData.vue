<template>
    <div class="noData">
        <img src="../../../../../static/images/noData.png" alt="">
        <span>{{mainTitle}}</span>
        <span><a v-if="isShowSecondTitle">{{secondTitle}}</a></span>
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
            },
            isShowSecondTitle: {
                type: Boolean,
                default: true
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
        flex: 1;
        img {
            height: 154px;
            width: 142px;
            margin-bottom: 10px;
        }
        span {
            font-family: PingFangSC-Regular;
            font-size: 15px;
            color: #666666;
            a {
                font-size: 12px;
                color: #999999;
                margin-top: 10px;
                text-decoration: none;
            }
            &:last-child {
                font-size: 12px;
                color: #999999;
                margin-top: 10px;
            }
        }
    }
</style>