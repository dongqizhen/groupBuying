<template>
    <div class="container">
        <Header style="position: absolute;" :isSearchHide="false"></Header>
        <div class="content">
           <cube-slide class="banner" :data="Banneritems" />
           <div class="proBaseInfo">
             <div class="tagTypeBox"><span class="tagType">团购</span></div>
             <div class="prolineAndBrandAndModel">CT类中国传媒医疗集团/华脉科技GE/中国传媒医疗集团8500</div>
             <div class="proPrice"><span class="currency">￥</span>88.00<span class="priceUnit">万元</span></div>
           </div>
           <div class="proParam">
             <div class="common clinicalApplication">
               <div class="commonLeft">临床应用</div>
               <div class="commonRight clinicalDescription">这里是展示临床应用说明文字的地方，这里是展示临床应用说明文字的地方</div>
             </div>
             <div class="common param">
               <div class="commonLeft">参数</div>
               <div class="commonRight paramVal">
                 <ul>
                   <li v-for="itemParam in params" :key="itemParam.paramName">{{itemParam.paramName}}</li>
                 </ul>
                </div>
             </div>
           </div>
           <item-info></item-info>
           <div class="proDetail">
             <h2>产品详情</h2>
             <div class="proInfo">这里是展示临床应用说明文字的地方，这里是展示临床应用说明文字的地方;这里是展示临床应用说明文字的地方，这里是展示临床应用说明文字的地方</div>
           </div>
           <footer-menu></footer-menu>
        </div>
    </div>
</template>

<script>
    import Header from '../components/header/header'
    import footerMenu from '../components/common/footerMenu'
    import itemInfo from '../components/common/itemInfo'
    export default {
        data(){
            return {
                Banneritems: [
                        {
                          url: 'http://www.didichuxing.com/',
                          image: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide01.png'
                        },
                        {
                          url: 'http://www.didichuxing.com/',
                          image: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide02.png'
                        },
                        {
                          url: 'http://www.didichuxing.com/',
                          image: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide03.png'
                        }
                      ],
                      params:[
                        {paramName:"四排"},
                        {paramName:"六排"},
                        {paramName:"六排八排"},
                        {paramName:"六排六排"},
                        {paramName:"八排"}]
            }
        },
        components:{
            Header,footerMenu,itemInfo
        },
        methods:{
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../../../static/scss/_commonScss.scss';
    .container{
      width: 100%;
      height: 100%;
      position: fixed;
      background-color:$base-backgroud;
      .content{
         height: 100% ;
        overflow: auto;
        .banner{
          width: 100%;
          height: 353px;
          margin-bottom: 10px;
        }
        .proBaseInfo{
          background-color: #fff;
          height: 92px;
           padding: 10px 13px 10px 7px;
           margin-bottom: 10px;
           .tagTypeBox{
             height: 100%;
              float: left;
           }
          .tagType{
              display: block;
              background: #F56A23;
              border-radius: 1px;
              color: #fff;
              width: 40px;
              height: 18px;
              line-height: 18px;
              font-size: 14px;
              text-align: center;
              margin-right: 7px;
          }
          .prolineAndBrandAndModel{
            font-size: 18px;
            color: #333;
            line-height: 25px;
          }
          .proPrice{
            font-size: 20px;
            color: #FB4354;
            float: right;
            .currency{
               color: #FB4354;
               font-size: 13px;
            }
            .priceUnit{
               font-size: 12px;
               color: #999;
               margin-left: 2px;
            }
          }
        }
        .proParam{
          width:100%;
          margin-bottom: 10px;
          background-color: #fff;
          .common{
            display: flex;
            padding: 13px;
            align-items: center;
            justify-content: space-between;
            .commonLeft{
              flex-basis: 89px;
              font-size: 14px;
              color: #999;
            }
            .commonRight{
               flex-basis: 260px;
            }
          }
          .clinicalApplication{
            border-bottom: 1px solid #E9E9E9;
            .clinicalDescription{
              font-size: 14px;
              color: #333;
            }
          }
          .paramVal{
            ul{
               display: flex;
              width: 100%;
              justify-content: flex-start;
              flex-wrap: wrap;
              li{
                padding: 0 16px;
                background-color: #EBEBEB;
                border-radius: 2px;
                font-size: 13px;
                color: #333;
                height: 19px;
                line-height: 19px;
                margin: 5px 0;
                margin-right: 10px;
              }
            }
          }
        }
        .proDetail{
          width: 100%;
          background-color: #fff;
          margin-bottom: 56px;
          h2{
            font-weight: 600;
            height: 46px;
            line-height: 46px;
            padding: 0 13px;
            font-size: 14px;
            color: #333;
            border-bottom: 1px solid #E9E9E9;
          }
          .proInfo{
            padding: 13px;
            box-shadow: 0 1px 2px 0 rgba(0,0,0,0.10);
          }
        }
      }
    }

</style>
