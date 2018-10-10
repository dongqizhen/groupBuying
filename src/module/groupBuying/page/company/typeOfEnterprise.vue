<template>
  <div class="container">
    <Header :isSearchHide="false" :title="this.$route.name">
      <span slot="explain" class="enter" @click="clickSure">确定</span>
    </Header>
    <div class="content">
      <cube-scroll>
        <div class="wrapper_box">
          <div class="common" v-for="(item,index) in companyTypeList" :key="index">
            <div v-for="(value,key) in item" :key="key">
              <h2>{{key}}</h2>
              <ul>
                <li v-for="itemValue in value" :key="itemValue.id" :class="activeClass(itemValue.id)" @click="activeSelect(itemValue,itemValue.id)">{{itemValue.name}}</li>
              </ul>
            </div>
          </div>
        </div>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
import Header from "../../components/header/header";
import { _getData } from "../../service/getData";
import { mapMutations } from "vuex";
import _ from "lodash";
import { Toast } from "vant";
export default {
  data() {
    return {
      companyTypeList: [],
      itemSelect: []
    };
  },
  components: { Header },
  methods: {
    ...mapMutations(["setTransition", "selectCompanyType"]),
    clickSure() {
      if (this.itemSelect.length == 0) {
        Toast({ message: "请选择企业类型", duration: 1000 });
        return;
      } else {
        this.selectCompanyType(this.itemSelect[0]);
        this.setTransition("turn-off");
        this.$router.go(-1);
      }
    },
    activeSelect(item, id) {
      if (this.itemSelect.length < 1) {
        this.itemSelect.push(item);
      } else {
        if (
          _.find(this.itemSelect, function(o) {
            return o.id == id;
          })
        ) {
          this.itemSelect.splice(0, 1);
        } else {
          this.itemSelect.splice(0, 1, item);
        }
      }
    },
    activeClass(id) {
      if (this.itemSelect) {
        for (const val of this.itemSelect) {
          if (val.id == id) {
            return "active";
          }
        }
      }
    }
  },
  activated() {
    this.itemSelect.push(this.$route.query.vuexValue);
    _getData(
      "/server_pro/groupPurchaseCompany!request.action",
      {
        method: "getGroupCompanyType",
        params: {}
      },
      data => {
        console.log(data);
        this.companyTypeList = data.companyTypeList;
      }
    );
  },
  deactivated() {}
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
    padding: 0;
    .wrapper_box {
      padding: 10px 13px;
    }
    .common {
      @include box_shadow_style;
      margin-bottom: 10px;
      &:last-child {
        margin-bottom: 0;
      }
      h2 {
        height: 40px;
        border-bottom: 0.5px solid #f6f6f6;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #999999;
        padding-left: 13px;
        display: flex;
        align-items: center;
      }
      ul {
        li {
          height: 46px;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #333333;
          display: flex;
          align-items: center;
          margin-left: 13px;
          border-bottom: 0.5px solid #f6f6f6;
          &:last-child {
            border-bottom: none;
          }
          &:active {
            background: rgba($color: #999, $alpha: 0.3);
          }
          &.active {
            color: #019ddd;
          }
        }
      }
    }
  }
}
</style>
