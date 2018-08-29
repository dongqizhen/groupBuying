<template>

  <div class="container">
    <Header :isSearchHide="true">
      <cube-tab-bar v-model="selectedLabel" showSlider slot="mainTitle">
        <cube-tab v-for="(item, index) in tabs" :label="item.label" :key="item.label">
        </cube-tab>
      </cube-tab-bar>
    </Header>
    <div class="content">
      <cube-slide class="banner" :data="Banneritems" />
      <ul class="icons_box">
        <li>
          <a href="#"><img src="/static/images/hospitalApply.png" alt=""></a>
          <span>医院团购报名</span>
        </li>
        <li>
          <a href="#"><img src="/static/images/companyApply.png" alt=""></a>
          <span>企业团购报名</span>
        </li>
        <li>
          <a href="#"><img src="/static/images/myApply.png" alt=""></a>
          <span>我的团购</span>
        </li>
      </ul>
      <div class="meeting_list">
        <h2>
          <span></span>
          团购大会列表
          <span></span>
        </h2>
        <div class="scrollWrapper">
          <div class="listTab">
            <cube-tab-bar v-model="ScrollListSelectedLabel" showSlider>
              <cube-tab v-for="(item, index) in listTabs" :label="item.label" :key="item.label">
              </cube-tab>
            </cube-tab-bar>
          </div>
          <div class="tab-slide-container">
            <cube-slide ref="slide" :loop="false" :auto-play="false" :show-dots="false" :options="slideOptions" @scroll="scroll" @change="changePage">
              <cube-slide-item>

                <list-item></list-item>
                <list-item></list-item>
              </cube-slide-item>
            </cube-slide>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/header/header'
import ListItem from '../components/common/listItem'
export default {
  name: 'index',
  data(){
    return {
      selectedLabel: '团购',
      tabs: [{
        label: '产品',
      }, {
        label: '商家'
      },{
        label: '团购'
      }],
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
      loop:false,
      ScrollListSelectedLabel:"2018(3场)",
      listTabs:[{
        label:"2018(3场)"
      },{
        label:"2019(8场)"
      }]
    }
  },
  components:{
    Header,ListItem
  }
}
</script>

<style lang="scss" scoped>
   @import "../../../../static/scss/_commonScss";
   .container{
     height: 100%;
     width:100%;
     .content{
        height: calc(100% - #{$header-height});
        padding:10px 13px;
        background: $base-backgroud;
        overflow: auto;
        //-webkit-overflow-scrolling: touch;
        .cube-slide.banner {
            height: 145px;
        }
        .icons_box{
          display: flex;
          flex-wrap: nowrap;
          justify-content: center;
          height: 110px;
          background: #fff;
          margin:10px 0;
          box-shadow: $base-box-shadow;
          border-radius: 5px;
          li{
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
            width:(100% / 3);
            a{
              margin-bottom: 5px;
              img{width: 46px}
            }
            span{
              color: #666666;
              font-size: 13px;
            }
          }
        }
        .meeting_list{
          background: #fff;
          box-shadow:$base-box-shadow;
          border-radius: 5px;
          >h2{
            height: 57px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 15px;
            text-align: center;
            color: #666666;
            font-family: PingFangSC-Medium;
            border-bottom:1px solid #E9E9E9;
            span{
              display:block;
              border-top:1px solid  #CCCCCC;
              width: 20px;
              margin:0 18px;
            }
          }
          .scrollWrapper{
            .listTab{
              height: 40px;
              border-bottom:1px solid #E9E9E9;
              box-sizing: border-box;
              .cube-tab-bar{ 
                height: 100%;
                .cube-tab{
                   margin:0;
                }
              }
            }
            .tab-slide-container{
              padding: 10px 10px 0;
            }
          }
        }
      }
   }
   
    
</style>
