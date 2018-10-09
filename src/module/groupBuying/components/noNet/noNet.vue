<template>
    <div class="noData">
        <img src="../../../../../static/images/noNet.png" alt="">
        <span>网络错误</span>
        <span>点击刷新一下试试</span>
        <cube-button :outline="true" @click="$emit('refresh')">刷新</cube-button>
    </div>
</template>

<script>
    export default {
        data() {
            return {};
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
            margin-bottom: 10px;
            &:nth-child(3) {
                font-size: 12px;
                color: #999999;
            }
        }
        /deep/ .cube-btn {
            width: 100px;
            height: 30px;
            padding: 0;
            border: 1px solid #cccccc;
            border-radius: 2px;
            font-family: PingFangSC-Regular;
            font-size: 13px;
            color: #666666;
            margin-top: 5px;
            display: flex;
            justify-content: center;
            align-items: center;
            &::after {
                border: none;
            }
        }
    }
</style>