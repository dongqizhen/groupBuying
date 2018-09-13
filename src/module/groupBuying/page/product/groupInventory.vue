<template>
<div class="container">
    <Header :title="this.$route.name"></Header>
    <div class="content">
      <list-filter></list-filter>
      <div class="proList">
          <ul>
            <router-link tag="li" :to="{ path: 'productDetails', query: { productID: listItem.id }}" v-for="(listItem,index) in lists" :key="index" @click.native="setTransition('turn-on')">
                <a>
                  <product-list class="itemPro"></product-list>
                </a>
            </router-link>
          </ul>
      </div>
    </div>
</div>
</template>
<script>
import Header from "../../components/header/header";
import listFilter from "../../components/common/listFilter";
import productList from "../../components/common/productList";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      lists: [{id:1},{id:2},{id:3}]
    };
  },
  components: {
    Header,
    listFilter,
    productList
  },
  methods: {
    ...mapMutations(["setTransition"])
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../../static/scss/_commonScss";
.container {
  width: 100%;
  height: 100%;
  position: fixed;
  .content {
    width: 100%;
    height: calc(100% - #{$header-height});
    background-color: $base-backgroud;
    overflow: auto;
    .proList {
      width: 100%;
      padding-top: 7px;
      ul {
        width: 120%;
        li {
          float: left;
          margin-right: 7px;
          margin-bottom: 20px;
        }
      }
      /deep/ .itemPro {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        width: 184px;
        height: 253px;
        background-color: red;
        .left_box {
          width: 100%;
          height: 189px;
          margin-right: 0;
        }
        .right_box {
          padding: 5px 13px;
          height: 64px;
          background-color: #fff;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          p span.groupbuy {
            display: none;
          }
          > span {
            margin-top: 5px;
            font-weight: 600;
          }
        }
      }
    }
  }
}
</style>
