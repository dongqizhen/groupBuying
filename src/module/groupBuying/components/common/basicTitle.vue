<template>
    <div class="basicTitle">
        <h2>
            <p>
                <i v-if="imgurl"><img :src='imgurl' alt=""></i>{{title}}
                <slot name="select"></slot>
            </p>
            <slot name="check"></slot>
        </h2>
    </div>
</template>

<script>
    export default {
        data(){
            return{

            }
        },
        props:['title','imgurl']
    }
</script>

<style lang="scss" scoped>
    .basicTitle{
        h2{
            height: 47px;
            padding:0 13px;
            display: flex;
            align-items: center;
            justify-content: space-between; 
            border: 0.5px solid #F6F6F6;
            >p{
                font-family: PingFangSC-Medium;
                font-size: 15px;
                color: #333333;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                i{
                    display: flex;
                    height: 15px;
                    width: 15px;
                    margin-right: 7px;
                    /* background: url("/static/images/basicInformation.png") no-repeat center;
                    background-size: 100% 100%; */
                    img{
                        height: 100%;
                        width: 100%;
                    }
                }
                /* &:last-child{
                    font-family: PingFangSC-Regular;
                    font-size: 14px;
                    color: #666666;
                    i{
                        display: flex;
                        height: 8px;
                        width: 8px;
                        background: #F5A623;
                        border-radius: 100%;
                        margin-top: 2px;
                        margin-right: 6px;
                    }
                } */
            }
        } 
    }
</style>