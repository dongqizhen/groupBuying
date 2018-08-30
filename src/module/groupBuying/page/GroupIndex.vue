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
        <router-link tag="li" to="/">
          <a><img src="/static/images/hospitalApply.png" alt=""></a>
          <span>医院团购报名</span>
        </router-link>
        <router-link tag="li" to="/">
          <a><img src="/static/images/companyApply.png" alt=""></a>
          <span>企业团购报名</span>
        </router-link>
        <router-link tag="li" to="/myComponyGroupBuy" @click="$store.commit('turn-on')">
          <a><img src="/static/images/myApply.png" alt=""></a>
          <span>我的团购</span>
        </router-link>
      </ul>
      <div class="meeting_list">
        <h2>
          <span></span>
          团购大会列表
          <span></span>
        </h2>
        <list-tab></list-tab>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/header/header'
import ListTab from '../components/common/listTab'
import { mapMutations } from 'vuex'
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
      ]
    }
  },
  components:{
    Header,ListTab
  },
  methods:{
    ...mapMutations([
      'setTransition'
    ])
  }
}
</script>

<style lang="scss" scoped>
   @import "../../../../static/scss/_commonScss";
   .container{
     height: 100%;
     width:100%;
     position: fixed;
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
        }
      }
   }
   
    
</style>
