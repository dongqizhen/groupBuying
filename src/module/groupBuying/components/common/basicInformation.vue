<template>
    <div class="basicInformation">
        <h2>
            <p>
                <i></i>
                企业基本信息
            </p>
            <p>
                <i></i>
                审核中
            </p>
        </h2>
        <div class="content_box">
            <div class="left">
                <span>公司名称：</span>
                <span>企业类型：</span>
                <span>主营业务：</span>
                <span>地址：</span>
            </div>
            <ul>
                <li>济南博物远航生物科技有限公司</li>
                <li>外资企业</li>
                <li>厂家放射性产品</li>
                <li>山东省济南市</li>
            </ul>
            <span>企业介绍
                <i></i>
            </span>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {

            }
        }
    }
</script>

<style lang="scss" scoped>
    .basicInformation{
        background: #fff;
        box-shadow: .5px 1px 3px .5px rgba(0,0,0,0.10);
        border-radius: 5px;
        h2{
            height: 47px;
            padding:0 13px;
            display: flex;
            align-items: center;
            justify-content: space-between; 
            border: 0.5px solid #F6F6F6;
            p{
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
                    background: url("/static/images/basicInformation.png") no-repeat center;
                    background-size: 100% 100%;
                }
                &:last-child{
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
                }
            }
        }   
        .content_box{
            display: flex;
            padding: 10px 13px 0px;
            position: relative;
            .left{
                width: 65px;
                font-family: PingFangSC-Regular;
                font-size: 13px;
                color: #999999;
                span{
                    display: flex;
                    margin-bottom: 13px;
                }
            }
            ul{
                font-family: PingFangSC-Medium;
                font-size: 13px;
                color: #333333;
                li{
                    margin-bottom: 13px;
                }
            }
            >span{
                font-family: PingFangSC-Medium;
                font-size: 13px;
                color: #019DDD;
                position: absolute;
                bottom: 13px;
                right: 13px;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                i{
                    display: flex;
                    background: url("/static/images/rightArrow.png") no-repeat center;
                    height: 12px;
                    width: 7px;
                    background-size: 100% 100%;
                    margin-left: 9px;
                    margin-top: 1px;
                }
            }
        }
    }
</style>