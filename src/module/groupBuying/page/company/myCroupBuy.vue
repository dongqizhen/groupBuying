<template>
  <div class="container myCompanyGroupBuy">
    <Header :isSearchHide="false" title="我的团购（企业）">
      <router-link to="/uploadedProducts" slot="explain" @click.native="setTransition('turn-on')">产品清单</router-link>
    </Header>
    <div class="content">
      <div class="scroll-list-wrap">
        <scroller>
          <basic-information :detailData="detailData" isShowArrowBox isShowCheck title="企业基本信息" buttonName="企业介绍" path="/companyProfile"></basic-information>
          <div class="i_join_in">
            <basic-title title="我参加的团购" imgurl='../static/images/groupBuy.png'></basic-title>
            <list-tab v-if="Object.keys(meetingListData).length" :meetingListData="meetingListData"></list-tab>
            <no-data v-else></no-data>
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
  import noData from "../../components/noData/noData.vue";
  export default {
      data() {
          return {
              detailData: {},
              meetingListData: {},
              hasData: true
          };
      },
      components: {
          Header,
          basicInformation,
          listTab,
          basicTitle,
          noData
      },
      methods: { ...mapMutations(["setTransition"]) },
      created() {
          _getData(
              "/server_pro/groupPurchaseCompany!request.action",
              {
                  method: "getGroupPurchaseCompanyDetail",
                  params: { id: this.$route.query.id }
              },
              data => {
                  console.log(data);
                  this.detailData = data;
                  console.log(this.detailData);
              }
          );
          _getData(
              "/server_pro/groupPurchaseCompany!request.action",
              {
                  method: "getMyGroupPurchaseCompany",
                  params: { companyId: this.$route.query.id }
              },
              data => {
                  console.log(data);
                  this.meetingListData = _.keyBy(data.list, val => {
                      return `${val.year}(${val.num}场)`;
                  });
                  console.log(this.meetingListData);
                  this.hasData = !_.isEmpty(this.meetingListData);
                  console.log(this.hasData);
              }
          );
      }
  };
</script>

<style lang="scss" scoped>
  @import "../../../../../static/scss/_commonScss";
  .container {
      @include basic_container_style;
      /deep/ ._v-content {
          min-height: 100%;
          display: flex;
          flex-direction: column;
      }
      .content {
          .i_join_in {
              @include box_shadow_style;
              margin-top: 10px;
              display: flex;
              flex-direction: column;
              flex: 1;
              /deep/ .basicTitle {
                  h2 {
                      border: none;
                  }
              }
          }
      }
  }
</style>
