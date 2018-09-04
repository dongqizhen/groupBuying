
<template>
        <div class="footerMenu">
            <ul>
              <li v-for="item in arrays" :key="item.name"><div v-if="item.img"><img :src="item.img" alt=""></div><div class="itemName">{{item.name}}</div></li>
            </ul>
        </div>
</template>

<script>
    export default {
        data(){
            return {
              arrays:[
                {id:1,name:"查看商家",img:"../../../../../static/images/shop.png"},
                {id:2,name:"私信商家",img:"../../../../../static/images/email.png"},
                {id:3,name:"收藏",img:"../../../../../static/images/store.png"},
                {id:4,name:"加入我的团购需求表",img:""}
              ]
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
        color: #fff;
        font-size: 14px;
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
