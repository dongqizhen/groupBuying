<template>
<div class="container">
    <Header :title="title"></Header>
    <div class="content">
      <list-filter v-on:getSortType="getIndex"></list-filter>
      <div class="proList">
          <ul>
            <router-link tag="li" :to="{ path: 'productDetails', query: { id: listItem.id }}" v-for="(listItem,index) in lists" :key="index" @click.native="setTransition('turn-on')">
                <a>
                  <product-list class="itemPro" :listData="listItem"></product-list>
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
import { _getData } from "../../service/getData";
export default {
  data() {
    return {
      title: "",
      lists: []
    };
  },
  components: {
    Header,
    listFilter,
    productList
  },
  methods: {
    ...mapMutations(["setTransition"]),
    getIndex(obj) {
      console.log(obj);
      switch (obj.index) {
        case 0:
          this.reqData("createdOn");
          break;
        case 1:
          this.reqData("countNum");
          break;
        case 2:
          this.reqData("favoriteNum");
          break;
        case 3:
          obj.num % 2 ? this.reqData("price", 1) : this.reqData("price", 0);
          break;
      }
    },
    reqData(sortName, sortType) {
      _getData(
        "/server_pro/groupPurchaseCompanyProduct!request.action",
        {
          method: "getPageListByGroupPurchaseTypeId",
          params: {
            groupPurchaseTypeId: this.$route.query.groupPurchaseTypeId,
            groupPurchaseId: this.$route.query.groupPurchaseId,
            productLineId: this.$route.query.productLineId,
            brandId: this.$route.query.brandId,
            sortName: sortName,
            sortType: sortType,
            currentPage: "1",
            countPerPage: "20"
          }
        },
        data => {
          console.log(data);
          this.title = data.title;
          this.lists = data.list;
        }
      );
    }
  },
  mounted() {
    this.reqData();
  },
  deactivated() {
    this.$destroy();
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
