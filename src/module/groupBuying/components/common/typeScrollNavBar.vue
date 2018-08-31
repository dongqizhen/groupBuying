<template>
    <div class="typeScrollNavBar">
        <cube-scroll-nav-bar :current="current" :labels="labels" @change="changeHandler" />
    </div>
</template>

<script>
    export default {
        data(){
            return {
                current: '设备团购(66)',
                labels: [
                    '设备团购(66)',
                    '设备团购(65)',
                    '设备团购(665)',
                    '设备团购(65r6)',
                    '设备团购(656)',
                    '设备团购(66h)',
                    '设备团购(662)',
                    '设备团购(664)',
                    '设备团购(665)',
                    '设备团购(663)'
                ]
            }
        },
        methods:{
            changeHandler(cur) {
                this.current = cur
            }
        }
    }
</script>

<style lang="scss" scoped>
    .typeScrollNavBar{
        height: 57px;
        border-bottom: 1px solid #F6F6F6;
        font-size: 12px;
        color: #666666;
        font-family: PingFangSC-Regular;
        border-radius: 5px;
        /deep/ .cube-scroll-nav-bar{
            height: 100%;
            border-radius: 5px;
            .cube-scroll-wrapper{
                border-top-left-radius: 5px;
                border-top-right-radius: 5px;
                .cube-scroll-nav-bar-items{
                    border-radius: 5px;
                    height: 100%;
                    display: flex;
                    justify-content: flex-start;
                    .cube-scroll-nav-bar-item{
                        height: 56px;
                        padding: 0;
                        display: flex;
                        align-items: center;
                        flex-direction: row;
                        margin-left: 12px;
                        border-radius: 5px;
                        span{
                            height: 30px;
                            width: 100px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            border: 0.5px solid #999999;
                            border-radius: 30px;
                            font-family: PingFangSC-Regular;
                            font-size: 12px;
                            color: #666666;
                        } 
                        &:last-child{
                            margin-right: 12px;
                        }
                        &.cube-scroll-nav-bar-item_active{
                            span{
                                background: rgba(1,157,221,0.08);
                                border: 0.5px solid #019DDD;
                                box-shadow: 0.5px 2px 2px 0.5px rgba(1,157,221,0.15);
                            }
                            
                        }
                    }
                }
            }
            
             
        }
    }
</style>