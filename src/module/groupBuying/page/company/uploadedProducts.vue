<template>
    <div class="container uploadedProducts">
        <Header :isSearchHide="false" :title="this.$route.name">
        </Header>
        <div class="content">
            <div class="type">
                <type-scroll-nav-bar></type-scroll-nav-bar>
                <model-scroll-nav-bar></model-scroll-nav-bar>
            </div>
            <div class="wrapper_container">
                <cube-scroll ref="scroll">
                    <div class="myUploadList">
                        <van-swipe-cell :right-width="240">
                            <product-list></product-list>
                            <span slot="right">
                                <span>编辑</span>
                                <span>删除</span>
                            </span>
                        </van-swipe-cell>
                    </div>
                    <div class="myUploadList">
                        <van-swipe-cell :right-width="240">
                            <span slot="right">
                                <span>编辑</span>
                                <span>删除</span>
                            </span>
                        </van-swipe-cell>
                    </div>
                    <div class="myUploadList">
                        <van-swipe-cell :right-width="240">
                            <span slot="right">
                                <span>编辑</span>
                                <span>删除</span>
                            </span>
                        </van-swipe-cell>
                    </div>
                    <div class="myUploadList">
                        <van-swipe-cell :right-width="240">
                            <span slot="right">
                                <span>编辑</span>
                                <span>删除</span>
                            </span>
                        </van-swipe-cell>
                    </div>
                    <div class="myUploadList">
                        <van-swipe-cell :right-width="240">
                            <span slot="right">
                                <span>编辑</span>
                                <span>删除</span>
                            </span>
                        </van-swipe-cell>
                    </div>
                    <div class="myUploadList">
                        <van-swipe-cell :right-width="240">
                            <span slot="right">
                                <span>编辑</span>
                                <span>删除</span>
                            </span>
                        </van-swipe-cell>
                    </div>
                    <div class="myUploadList">
                        <van-swipe-cell :right-width="240">
                            <span slot="right">
                                <span>编辑</span>
                                <span>删除</span>
                            </span>
                        </van-swipe-cell>
                    </div>
                </cube-scroll>

            </div>

        </div>
    </div>
</template>

<script>
    import Header from '../../components/header/header'
    import typeScrollNavBar from '../../components/common/typeScrollNavBar'
    import modelScrollNavBar from '../../components/common/modelScrollNavBar'
    import productList from '../../components/common/productList'
    export default {
        data(){
            return{

            }
        },
        components:{
            Header,typeScrollNavBar,modelScrollNavBar,productList
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../../../static/scss/_commonScss";
    .container{
        height: 100%;
        width: 100%;
        position: fixed;
        .content{
            height: calc(100% - #{$header-height});
            padding:10px 13px;
            background: $base-backgroud;
            .type{
                box-shadow: 0.5px 1px 3px 0.5px rgba(0,0,0,0.10);
                border-radius: 5px;
                background: #fff;
                margin-bottom: 10px;
            }
            .wrapper_container{
                height: calc(100% - 111px);
            }
            .myUploadList{
                height: 80px;
                background: #FFFFFF;
                box-shadow: 0.5px 1px 3px 0.5px rgba(0,0,0,0.10);
                border-radius: 5px;
                margin-bottom: 10px;
                &:last-child{
                    margin-bottom: 0;
                }
                /deep/ .van-swipe-cell{
                    height: 100%;
                    .van-swipe-cell__wrapper{
                        height: 100%;
                        padding: 13px;
                        display: flex;
                        justify-content: flex-start;
                        
                        .van-swipe-cell__right{
                            width: 240px;
                            >span{
                                width: 100%;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                font-family: PingFangSC-Regular;
                                font-size: 16px;
                                color: #FFFFFF;
                                height: 100%;
                                span{
                                    width: 50%;
                                    background: #FB4354;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    height: 100%;
                                    &:first-child{
                                        background: #CCCCCC;
                                    }
                                    &:last-child{
                                        border-bottom-right-radius:5px; 
                                        border-top-right-radius:5px; 
                                    }
                                }
                                

                            }
                        }
                    }
                }
            }
        }
    }
</style>