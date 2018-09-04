<template>
    <div class="filter">
        <ul>
          <li v-for="(tab,index) in tabLists" :key="tab.id" @click="changeShowInfo(index)" :class="cur==index?'active':''">
              <span>{{tab.name}}</span>
              <span v-if="index==3">
                <i class="arrow-up" :class="num%2==0?'active':''"></i>
                <i class="arrow-down" :class="num%2==1?'active':''"></i>
              </span>
          </li>
        </ul>
      </div>
</template>

<script>
    export default {
        data(){
            return {
                cur:0,
               tabLists:[
                 {id:1,name:'最新'},
                 {id:2,name:'最热'},
                 {id:3,name:'好评'},
                 {id:4,name:'价格'}
               ],
               num:-1
            }
        },
        methods:{
          changeShowInfo:function(i){
            console.log(i);
            this.cur = i;
            i != 3?this.num = -1:this.num = this.num + 1;
          }
        }
    }
</script>

<style lang="scss" scoped>
@import '../../../../../static/scss/_commonScss';
.filter{
  width: 100%;
  ul{
      display: flex;
      justify-content: space-around;
      height: 46px;
      align-items: center;
      background-color: #fff;
      border-top: 1px solid #e9e9e9;
      border-bottom: 1px solid #e9e9e9;
      li{
        font-size: 14px;
        color: #333;
        position: relative;
        &.active{
           color: $theme-color;
        }
        .arrow-up{
          position: absolute;
            border:4px solid transparent;
            border-bottom-color: #666;
            top: -4px;
            left: 35px;
            &.active{
              border-bottom-color: $theme-color;
            }
        }
        .arrow-down{
          position: absolute;
          top: 8px;
            left: 35px;
            border:4px solid transparent;
            border-top-color: #666;
            &.active{
              border-top-color: $theme-color;
            }
        }
      }
    }
}
</style>
