<template>
    <div class="selectProjectNav">
        <ul class="nav">
            <touch-ripple :speed="1" :opacity="0.3" color="#ccc" transition="ease">
                <li class="active">设备团购</li>
            </touch-ripple>
            <touch-ripple :speed="1" :opacity="0.3" color="#ccc" transition="ease">
                <li @click="handleClickEvent">设备团购</li>
            </touch-ripple>
            <li>设备团购</li>
            <li>设备团购</li>
            <li>设备团购</li>
            <li>设备团购</li>
        </ul>
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
    .selectProjectNav {
        > ul.nav {
            display: flex;
            padding: 0 13px;
            flex-wrap: wrap;
            justify-content: space-between;
            padding-top: 13px;
            li {
                width: 100px;
                height: 31px;
                border-radius: 31px;
                display: flex;
                border: 1px solid rgb(153, 153, 153);
                align-items: center;
                justify-content: center;
                font-family: PingFangSC-Regular;
                font-size: 12px;
                color: #666666;
                margin-bottom: 15px;
                &.active {
                    background: rgba(1, 157, 221, 0.08);
                    color: #019ddd;
                    border: 1px solid #019ddd;
                    box-shadow: 0 2px 2px 0 rgba(1, 157, 221, 0.15);
                }
            }
        }
    }
</style>