<template>

  <div class="container">
    <Header :title="this.$route.name">
      <span slot="explain" class="enter" @click="enterClick">确定</span>
    </Header>
    <div class="content">
      <ul>
        <li>
          <div class="year">2018年:</div>
          <div class="time clearfix">
            <span v-for="(time,index) in times" :key="index" :class="[nowDate>=index?'disabledStyle':'',cur===index && nowDate < index?'active':'']" @click="changeCurrent(index)">{{time}}</span>
          </div>
        </li>
        <li>
          <div class="year">2019年:</div>
          <div class="time clearfix">
            <span>第一季度</span>
            <span>第二季度</span>
            <span>第三季度</span>
            <span>第四季度</span>
          </div>
        </li>
      </ul>
    </div>
  </div>

</template>
<script>
import Header from "../../components/header/header";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      cur: -1,
      nowDate: 1,
      times: ["第一季度", "第二季度", "第三季度", "第四季度"]
    };
  },
  components: {
    Header
  },

  methods: {
    ...mapMutations(["setTransition"]),
    changeCurrent(index) {
      this.cur = index;
    },
    enterClick() {
      this.setTransition("turn-off");
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../../static/scss/_commonScss";
.container {
  @include basic_container_style;
  /deep/ header {
    .search {
      .enter {
        padding-right: 13px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #333333;
      }
    }
  }
  .content {
    ul {
      background-color: #fff;
      padding: 13px;
      height: 100%;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      li {
        margin-bottom: 16px;
        .year {
          font-size: 14px;
          color: #666;
          margin-bottom: 8px;
        }
        .time {
          span {
            width: 73px;
            height: 30px;
            line-height: 30px;
            display: block;
            border: 1px solid #999;
            border-radius: 7px;
            margin-right: 10px;
            text-align: center;
            font-size: 13px;
            color: #666;
            float: left;
            &:last-child {
              margin-right: 0;
            }
            &.active {
              background: rgba(1, 157, 221, 0.08);
              border: 1px solid #019ddd;
              border-radius: 7px;
            }
            &.disabledStyle {
              border: 1px solid #cbcbcb;
              border-radius: 7px;
              color: #cbcbcb;
            }
          }
        }
      }
    }
  }
}
</style>
