<template>
    <div class="container myCompanyGroupBuy">
        <Header :isSearchHide="false" title="我的团购（企业）">
            <router-link to="/uploadedProducts" slot="explain" @click.native="setTransition('turn-on')">产品清单</router-link>
        </Header>
        <div class="content">
            <div class="scroll-list-wrap">
                <scroller>
                    <basic-information  :detailData="detailData" isShowArrowBox isShowCheck title="企业基本信息" buttonName="企业介绍" path="/companyProfile"></basic-information>
                    <div class="i_join_in">
                        <basic-title title="我参加的团购" imgurl='../static/images/groupBuy.png'></basic-title>
                        <list-tab></list-tab>
                    </div>
                </scroller>
            </div>
        </div>
    </div>
</template>

<script>
import Header from "../../components/header/header";
import basicInformation from "../../components/common/basicInformation";
import listTab from "../../components/common/listTab";
import basicTitle from "../../components/common/basicTitle";
import { mapMutations } from "vuex";
import { _getData } from "../../service/getData";
export default {
  data() {
    return {
      detailData: {}
    };
  },
  components: {
    Header,
    basicInformation,
    listTab,
    basicTitle
  },
  methods: { ...mapMutations(["setTransition"]) },
  created() {
    _getData(
      "/server_pro/groupPurchaseCompany!request.action",
      {
        method: "getGroupPurchaseCompanyDetail",
        params: { id: "1" }
      },
      data => {
        console.log(data);
        this.detailData = data;
        console.log(this.detailData);
      }
    );
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../../static/scss/_commonScss";
.container {
  @include basic_container_style;
  .content {
    .i_join_in {
      @include box_shadow_style;
      margin-top: 10px;
      /deep/ .basicTitle {
        h2 {
          border: none;
        }
      }
    }
  }
}
</style>
