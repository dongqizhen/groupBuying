<template>
    <div class="modelScrollNavBar">
        <div class="slide_container">
            <cube-scroll-nav-bar :current="current" :labels="labels" @change="changeHandler" />
        </div>
        <div @click="handleClick">
            <touch-ripple :speed="1" :opacity="0.3" color="#999" transition="ease">
                <i :class="arrowIsActive?'active':''"></i>
            </touch-ripple>
        </div>
        <div class="hide_box" v-if="hideBoxIsShow">
            <cube-scroll ref="scroll">
                <ul>
                    <li v-for="(value,index) in labels" :key="index">
                        {{value}}
                    </li>
                </ul>
            </cube-scroll>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                arrowIsActive:false,
                current: '磁共震MRI类(27)',
                hideBoxIsShow:false,
                labels: [
                    '磁共震MRI类(27)',
                    '血管造影机类(27f)',
                    '血管造影机类(27fa)',
                    '血管造影机类(27ad)',
                    '血管造影机类(27ddf)',
                    '血管造影机类(27dasd)',
                    '血管造影机类(27dw)',
                    '血管造影机类(27wd)',
                    '血管造影机类(27cv)',
                    '血管造影机类(27dd)'
                ]
            }
        },
        methods:{
            changeHandler(cur) {
                this.current = cur
            },
            handleClick(){
                this.arrowIsActive = !this.arrowIsActive;
            }
        },
        mounted(){

        }
    }
</script>

<style lang="scss" scoped>
    .modelScrollNavBar{ 
        height: 44px;
        position: relative;
        display: flex;
        justify-content: flex-start;
        .slide_container{
            height: 100%;
            width:calc(100% - 42px);
            /deep/ .cube-scroll-nav-bar{
            height: 100%;
            border-radius: 5px;
                .cube-scroll-nav-bar-items{
                    height: 44px;
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    .cube-scroll-nav-bar-item{
                        padding: 0;
                        margin-left: 16px;
                        font-family: PingFangSC-Medium;
                        font-size: 13px;
                        &:last-child{
                            //margin-right: 16px;
                        }
                        &.cube-scroll-nav-bar-item_active{
                            color: #019DDD;
                        }
                    }
                }
            }
        }
        .v-touch-ripple{
            display: flex;
            width: 42px;
            height: 100%;
            align-items: center;
            justify-content: center;
           i{
               display: flex;
               height: 14px;
               width: 8px;
               background: url("/static/images/grayarrow.png") no-repeat center;
               background-size: 100% 100%;
               transform: rotate(90deg);
               transition: transform 0.3s ease;
               &.active{
                   transform: rotate(630deg);
                   transition: transform 0.3s ease;
               }
           }
        }
        .hide_box{
            position: absolute;
            width: 100%;
            left: 0;
            top:45px;
            background: #fff;
            padding:0 16px;
            z-index: 1000;
            li{
                height: 50px;
                line-height: 50px;
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #333333;
                border-bottom: 0.5px solid #E5E5E5;
                &:last-child{
                    border: 0;
                }
                &.active{
                    color: #019DDD;
                }
            }
        }
         
    }
</style>