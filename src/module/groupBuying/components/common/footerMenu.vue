
<template>
        <div class="footerMenu">
            <ul>
              <router-link tag="li" :to="{ path: 'productDetails', query: { shopID: 1 }}"  @click.native="clickLink">
                  <div><img src="../../../../../static/images/shop.png"></div>
                  <div class="itemName">查看商家</div>
            </router-link>
            <li>
                 <div><img src="../../../../../static/images/email.png"></div>
                  <div class="itemName">私信商家</div>
                  </li>
            <li>
                  <div><img src="../../../../../static/images/store.png"></div>
                  <div class="itemName">收藏</div>
             </li>
            <router-link tag="li" :to="{ path: 'submitGroupDemand', query: { hospitalID: 1 }}"  @click.native="clickLink">
                 <div class="itemName">加入我的团购需求表</div>
            </router-link>
            </ul>
        </div>
</template>

<script>
    export default {
        data(){
            return {
              lists:[
                {id:1,path:'productDetails',imgUrl:'../../../../../static/images/shop.png',name:'查看商家'},
                {id:2,path:'',imgUrl:'../../../../../static/images/email.png',name:'私信商家'},
                {id:3,path:'',imgUrl:'../../../../../static/images/store.png',name:'收藏'},
                {id:4,path:'submitGroupDemand',imgUrl:'',name:'加入我的团购需求表'},
                ],
                hospitalID:1,
                shopID:1
            }
        },
        methods:{
            clickLink() {
                this.$store.commit("setTransition", "turn-on");
            },
        }
    }
</script>

<style lang="scss" scoped>
@import "../../../../../static/scss/_commonScss";
.footerMenu{
  width: 100%;
  height: 46px;
  background-color: #fff;
  position: absolute;
  bottom: 0;
  border-top: 1px solid #E9E9E9;
  ul{
    width: 100%;
    height: 100%;
    li{
      width: 75px;
      height: 100%;
      border-right: 1px solid #E9E9E9;
      float: left;
      text-align: center;
      font-size: 10px;
        color: #333;
      &:last-child{
        width: 150px;
        border-right:none;
        line-height: 46px;
        background-color: $theme-color;
        font-size: 14px;
        .itemName{
          color: #fff;
        }
      }
      img{
        width: 16px;
        height: 16px;
        margin: 7px 0 4px;
      }
    }
  }
}
</style>
