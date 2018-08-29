<template>
    <div class="container">
        <Header :title="this.$route.name" :isSearchHide="true"></Header>
        <div class="content">
            <cube-scroll ref="scroll">
                <div class="wrapper">
                    <div class="basic_information">
                        <h2>团购基本信息</h2>
                        <list-item></list-item>
                    </div>
                    <div class="hospitalNeeds">
                        <h2>
                            <span></span>
                            团购大会列表
                            <span></span>
                        </h2>
                        <span>企业用户查看</span>
                        <ul>
                            <li>
                                <i></i>
                                设备团购 (600台)
                                <span>已有
                                    <a>12</a>家医院提交团购需求
                                </span>
                            </li>
                            <li>
                                <i></i>
                                设备团购 (600台)
                                <span>已有
                                    <a>12</a>家医院提交团购需求
                                </span>
                            </li>
                            <li>
                                <i></i>
                                设备团购 (600台)
                                <span>已有
                                    <a>12</a>家医院提交团购需求
                                </span>
                            </li>
                            <li>
                                <i></i>
                                设备团购 (600台)
                                <span>已有
                                    <a>12</a>家医院提交团购需求
                                </span>
                            </li>
                            <li>
                                <i></i>
                                设备团购 (600台)
                                <span>已有
                                    <a>12</a>家医院提交团购需求
                                </span>
                            </li>
                            <li>
                                <i></i>
                                设备团购 (600台)
                                <span>
                                    已有
                                    <em>12</em>家医院提交团购需求
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div class="Enterprise_Product">
                        <h2>
                            <span></span>
                            企业产品
                            <span></span>
                        </h2>
                        <span>医院用户查看</span>
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
                        <div class="subscription">
                            <h3>
                                <p>设备团购产品清单</p>
                                <span>查看全部 (150款)
                                    <i></i>
                                </span>
                            </h3>
                            <ul class="type">
                                <li>CT类
                                    <span>22款</span>
                                </li>
                                <li>核磁共振MRI类
                                    <span>22款</span>
                                </li>
                                <li>血管造影机类
                                    <span>22款</span>
                                </li>
                                <li>CT类
                                    <span>22款</span>
                                </li>
                                <li>CT类
                                    <span>22款</span>
                                </li>
                                <li>CT类
                                    <span>22款</span>
                                </li>

                            </ul>
                        </div>
                        <div class="brand">
                            <h2>设备团购入围品牌</h2>
                            <ul>
                                <li>
                                    <span>品牌</span>
                                    <span>团购占有率</span>
                                    <span>市场保有率</span>
                                    <span>售后排名</span>
                                </li>
                                <li>
                                    <span>GE</span>
                                    <span>35%</span>
                                    <span>35%</span>
                                    <span>35%</span>
                                </li>
                                <li>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </li>
                                <li>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </li>
                                <li>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </li>
                                <li>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </cube-scroll>
        </div>

    </div>
</template>

<script>
    import Header from '../components/header/header'
    import ListItem from '../components/common/listItem'
    export default {
        data(){
            return {

            }
        },
        components:{
            Header,ListItem
        },
        methods:{
            handleClickEvent(){
                alert()
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../../../static/scss/_commonScss.scss';
    .container{
        height:100%;
        .content{
            background:$base-backgroud;
            height:calc(100% - #{$header-height});
            
            overflow: auto;
            -webkit-overflow-scrolling: touch;
            .wrapper{
                padding:10px 13px;
               
            }
            .basic_information{
                height: 219px;
                background: #FFFFFF;
                box-shadow: 0 1px 3px 0 rgba(0,0,0,0.10);
                border-radius: 5px;
                padding:0 10px;
                margin-bottom: 10px;
                >h2{
                    height: 47px;
                    font-family: PingFangSC-Medium;
                    font-size: 15px;
                    color: #333333;
                    display: flex;
                    align-items: center;
                }
            }
            %h2{
                // height: 57px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 15px;
                    text-align: center;
                    color: #666666;
                    font-family: PingFangSC-Medium;
                    //border-bottom:1px solid #E9E9E9;
                    margin-bottom: 5px;
                    span{
                    display:block;
                    border-top:1px solid  #CCCCCC;
                    width: 20px;
                    margin:0 18px;
                    }
            }
            .hospitalNeeds{
                min-height: 436px;
                background: #FFFFFF;
                box-shadow: 0 1px 3px 0 rgba(0,0,0,0.10);
                border-radius: 5px;
                padding-top: 16px;
                margin-bottom: 10px;
                >h2{
                    @extend %h2 ;
                }
                >span{
                    font-family: PingFangSC-Regular;
                    font-size: 12px;
                    color: #999999;
                    display: flex;
                    justify-content: center;
                    margin-bottom: 20px;
                }
                >ul{
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    padding:0 18px;
                    li{
                        height: 100px;
                        width: 148px;
                        background: #FFFFFF;
                        border: 0 solid rgba(1,157,221,0.12);
                        box-shadow: 1px 2px 4px 1px rgba(1,157,221,0.09);
                        border-radius: 5px;
                        margin-bottom: 16px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        font-family: PingFangSC-Medium;
                        font-size: 12px;
                        color: #333333;
                        letter-spacing: 0;
                        i{
                           height: 25px; 
                           width: 25px;
                           background: #03ccbb;
                           margin: 15px 0 13px;
                           
                        }
                        span{
                            font-size: 10px;
                            margin-top: 6px;
                            color: #999999;
                            display: flex;
                            a{
                                color:#019DDD;
                            }
                        }
                    }
                }
            }
            .Enterprise_Product{
                background: #FFFFFF;
                padding-top: 16px;
                box-shadow: 0 1px 3px 0 rgba(0,0,0,0.10);
                border-radius: 5px;
                >h2{
                    @extend %h2 ;
                }
                >span{
                    font-family: PingFangSC-Regular;
                    font-size: 12px;
                    color: #999999;
                    display: flex;
                    justify-content: center;
                    margin-bottom: 20px;
                }
                >ul.nav{
                    display: flex;
                    padding: 0 13px;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    li{
                        width: 100px;
                        height: 31px;
                        border:1px solid #019DDD;
                        
                        border-radius: 31px;
                        display: flex;
                        border: 1px solid #999999;
                        align-items: center;
                        justify-content: center;
                        font-family: PingFangSC-Regular;
                        font-size: 12px;
                        color: #666666;
                        margin-bottom: 15px;
                        &.active{
                            background: rgba(1,157,221,0.08);
                            color: #019DDD;
                            border:1px solid #019DDD;
                            box-shadow: 0 2px 2px 0 rgba(1,157,221,0.15);
                        }
                    }
                }
                .subscription{
                    >h3{
                        display: flex;
                        justify-content: space-between;
                        font-family: PingFangSC-Medium;
                        font-size: 14px;
                        color: #333333;
                        height: 50px;
                        padding: 0 13px;
                        align-items: center;
                        span{
                            font-family: PingFangSC-Regular;
                            font-size: 12px;
                            color: #666666;
                            line-height: 50px;
                        }
                    }
                    >ul.type{
                        display: flex;
                        flex-wrap: wrap;
                        padding: 0 13px;
                        justify-content: space-between;
                        li{
                            height: 50px;
                            width: 103px;
                            background: #FFFFFF;
                            border: 0 solid rgba(1,157,221,0.12);
                            box-shadow: 1px 2px 4px 1px rgba(1,157,221,0.09);
                            border-radius: 5px;
                            margin-bottom: 15px;
                            display: flex;
                            flex-direction: column;
                            font-family: PingFangSC-Medium;
                            font-size: 12px;
                            color: #019DDD;
                            letter-spacing: 0;
                            text-align: center;
                            align-items: center;
                            padding-top: 10px;
                            span{
                                font-family: PingFangSC-Regular;
                                font-size: 10px;
                                color: #999999;
                                letter-spacing: 0;
                                margin-top: 5px;
                            }
                        }
                    }
                }
                .brand{
                    h2{
                        height: 40px;
                        margin-bottom: 5px;
                        padding: 0 13px;
                        display: flex;
                        align-items: center;
                        justify-content: flex-start;
                        font-family: PingFangSC-Medium;
                        font-size: 14px;
                        color: #333333;
                    }
                    >ul{
                        li{
                            display: flex;
                            height: 52px;
                            align-items: center;
                            border-bottom: 1px solid #E9E9E9;
                           // justify-content: space-between;
                            &:first-child{
                                
                                height: 36px;
                                border-top: 1px solid #E9E9E9;
                                span{
                                    font-family: PingFangSC-Regular;
                                    font-size: 12px;
                                    color: #999999;
                                }
                            }
                            &:last-child{
                                border-bottom: none;
                            }
                            span{
                                display: flex;
                                justify-content: center;
                                font-family: PingFangSC-Medium;
                                font-size: 14px;
                                color: #333333;
                                &:first-child{
                                    width: 123px;
                                }
                                &:nth-child(2){
                                    width: 60px;
                                    margin-right: 23px;
                                }
                                &:nth-child(3){
                                    width: 60px;
                                }
                                &:last-child{
                                    width: 83px;
                                }
                            }
                        }
                    }
                }
            }
        }   
    }
</style>    