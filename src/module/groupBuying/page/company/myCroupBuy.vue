<template>
    <div class="container">
        <Header :isSearchHide="false" :title="this.$route.name">
            <router-link to="/uploadedProducts" slot="explain">上传的产品</router-link>
        </Header>
        <div class="content">
            <basic-information></basic-information>
            <div class="i_join_in">
                <h2>
                    <i></i>我参加的团购
                </h2>
                <list-tab></list-tab>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from '../../components/header/header'
    import basicInformation from '../../components/common/basicInformation'
    import listTab from '../../components/common/listTab'
    export default {
        data(){
            return {

            }
        },
        components:{
            Header,basicInformation,listTab
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../../../static/scss/_commonScss";
    .container{
        height: 100%;
        width:100%;
        position: fixed;
        .content{
            height: calc(100% - #{$header-height});
            padding:10px 13px;
            background: $base-backgroud;
            overflow: auto;
            .i_join_in{
                background: #fff;
                margin-top: 10px;
                box-shadow: 0.5px 1px 3px 0.5px rgba(0,0,0,0.10);
                border-radius: 5px;
                h2{
                    height: 47px;
                    display: flex;
                    align-items: center;
                    padding:0 13px;
                    font-family: PingFangSC-Medium;
                    font-size: 15px;
                    color: #333333;
                    i{
                        display: flex;
                        height: 15px;
                        width: 15px;
                        background: url('/static/images/groupBuy.png') no-repeat center;
                        background-size: 100% 100%;
                        margin-right: 7px;
                    }
                }
            }
        }
    }
</style>