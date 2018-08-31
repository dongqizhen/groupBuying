<template>
    <div class="container">
        <Header :title="this.$route.name">
            <router-link to="/uploadedProducts" slot="explain">编辑</router-link>
        </Header>
        <div class="content">
            <basic-information></basic-information>
            <div class="Personal_information">
                <basic-title title="团购负责人信息" imgurl="/static/images/Personal_information.png">
                    <span slot="check">收起</span>
                </basic-title>
                <div class="details">
                    <h2>
                        <i></i>
                        团购负责人1
                    </h2>
                    <ul>
                        <li>
                            <span>姓名</span>
                            <div>张经理</div>
                        </li>
                        <li>
                            <span>职务</span>
                            <div>经理</div>
                        </li>
                        <li>
                            <span>移动电话</span>
                            <div>12145451421</div>
                        </li>
                        <li>
                            <span>固定电话</span>
                            <div>44454545</div>
                        </li>
                        <li>
                            <span>微信号</span>
                            <div>4444554564564</div>
                        </li>
                    </ul>
                </div>
                <div class="details">
                    <h2>
                        <i></i>
                        团购负责人2
                    </h2>
                    <ul>
                        <li>
                            <span>姓名</span>
                            <div>张经理</div>
                        </li>
                        <li>
                            <span>职务</span>
                            <div>经理</div>
                        </li>
                        <li>
                            <span>移动电话</span>
                            <div>12145451421</div>
                        </li>
                        <li>
                            <span>固定电话</span>
                            <div>44454545</div>
                        </li>
                        <li>
                            <span>微信号</span>
                            <div>4444554564564</div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="product_list">
                <basic-title title="参加团购产品列表" imgurl="/static/images/product_list.png"></basic-title>
                <type-scroll-nav-bar></type-scroll-nav-bar>
            </div>
            <div class="products">
                <model-scroll-nav-bar></model-scroll-nav-bar>
                <ul>
                    <li>
                        <product-list></product-list>
                    </li>
                    <li>
                        <product-list></product-list>
                    </li>
                    <li>
                        <product-list></product-list>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from '../../components/header/header'
    import basicInformation from '../../components/common/basicInformation'
    import basicTitle from '../../components/common/basicTitle'
    import typeScrollNavBar from '../../components/common/typeScrollNavBar'
    import modelScrollNavBar from '../../components/common/modelScrollNavBar'
    import productList from '../../components/common/productList'
    export default {
        data(){
            return {

            }
        },
        components:{
            Header,basicInformation,basicTitle,typeScrollNavBar,modelScrollNavBar,productList
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../../../static/scss/_commonScss";
    .container{
        height: 100%;
        width:100%;
        position: fixed;
        /deep/ header{
            .search{
                a{
                    font-size: 16px;
                    color: #019DDD;
                    font-family: PingFangSC-Regular;
                }
            }
        }
        .content{
            height: calc(100% - #{$header-height});
            padding:10px 13px;
            background: $base-backgroud;
            overflow: auto;
            /deep/ .basicInformation{
                .content_box{
                    ul{
                        li{
                            padding: 13px 13px;
                            border-bottom: 0.5px solid #F6F6F6;
                            &:first-child{
                                padding-top: 0;
                            };
                            &:last-child{
                                padding-bottom: 0;
                                border: none;
                            }
                        }
                    }
                }
            }
            .Personal_information{
                background: #FFFFFF;
                box-shadow: 0.5px 1px 3px 0.5px rgba(0,0,0,0.10);
                border-radius: 5px;
                margin-top: 10px;
                /deep/ .basicTitle{
                    h2>span{
                        font-size: 13px;
                        color: #333333;
                        font-family: PingFangSC-Regular;
                    }
                }
                .details{
                    h2{
                        font-family: PingFangSC-Medium;
                        font-size: 14px;
                        color: #333333;
                        display: flex;
                        padding-left:13px; 
                        height: 44px;
                        align-items: center;
                        //font-weight: 600;
                        border-bottom: 0.5px solid #F6F6F6;
                        i{
                            width: 3px;
                            height: 15px;
                            background: #4A90E2;
                            border-radius: 2px;
                            margin-right: 7px;
                        }
                    }
                    ul{
                        li{
                            height: 44px;
                            padding:0 13px;
                            display: flex;
                            justify-content: flex-start;
                            align-items: center;
                            border-bottom: 0.5px solid #F6F6F6;
                            span{
                                display: flex;
                                width: 93px;
                                font-family: PingFangSC-Regular;
                                font-size: 14px;
                                color: #999999;
                            }
                            >div{
                                display: flex;
                                width: calc(100% - 93px);
                                font-family: PingFangSC-Regular;
                                font-size: 14px;
                                color: #333333;
                            }
                        }
                    }
                }
            }
            .product_list{
                background: #FFFFFF;
                box-shadow: 0.5px 1px 3px 0.5px rgba(0,0,0,0.10);
                border-radius: 5px;
                margin-top: 10px;
            }
            .products{
                background: #FFFFFF;
                box-shadow: 0.5px 1px 3px 0.5px rgba(0,0,0,0.10);
                border-radius: 5px;
                margin-top: 10px;
                ul{
                    padding: 10px 0;
                    border-top: 0.5px solid #f6f6f6;
                    li{
                        height: 90px;
                        width: 100%;
                        padding: 0 13px;
                        margin-bottom: 13px;
                        /deep/ .productList{
                            height: 100%;
                            .left_box{
                                width: 100px;
                                margin-right: 13px;
                            }
                            .right_box{
                                padding: 16px 0;
                            }
                        }
                        &:last-child{
                            margin-bottom: 0;
                        }
                    }
                }
            }
        }
    }
</style>