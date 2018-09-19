<template>
  <div class="container">
    <Header :isSearchHide="false" :title="this.$route.name">
      <span slot="explain" class="enter" @click="clickSure">确定</span>
    </Header>
    <div class="content">
      <cube-scroll>
        <div class="wrapper_box">
          <div class="common" v-for="(value,key,index) in companyTypeList" :key="index">
            <h2>{{key}}</h2>
            <ul>
              <li v-for="item in value" :key="item.id" :class="current === item.id?'active':''" @click="activeSelect(item)">{{item.name}}</li>
            </ul>
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
  export default {
      data() {
          return {
              current: -1,
              tempCompanyType: { tempCompanyTypeName: "", tempCompanyTypeId: "" },
              companyType: { companyTypeName: "", companyTypeId: "" },
              companyTypeList: {
                  厂家: [
                      { name: "外资厂家", id: 1 },
                      { name: "民族厂家", id: 2 }
                  ],
                  代理商: [{ name: "代理商", id: 3 }, { name: "配送商", id: 4 }],
                  维修: [
                      { name: "原厂维修", id: 5 },
                      { name: "维修代理商", id: 6 }
                  ],
                  其他: [
                      { name: "第三方维修", id: 7 },
                      { name: "外贸公司", id: 8 },
                      { name: "招标公司", id: 9 },
                      { name: "融资租赁", id: 10 }
                  ]
              }
          };
      },
      components: { Header },
      methods: {
          ...mapMutations(["setTransition", "selectCompanyType"]),
          clickSure() {
              this.setTransition("turn-off");
              this.$router.go(-1);
              this.companyType.companyTypeName = this.tempCompanyType.tempCompanyTypeName;
              this.companyType.companyTypeId = this.tempCompanyType.tempCompanyTypeId;
              console.log(this.companyType);
              this.selectCompanyType(this.companyType);
          },
          activeSelect(item) {
              this.current = item.id;
              this.tempCompanyType.tempCompanyTypeId = item.id;
              this.tempCompanyType.tempCompanyTypeName = item.name;
          }
      },
      mounted() {
          _getData(
              "/server_pro/company!request.action",
              {
                  method: "getTopCompanyType",
                  params: {}
              },
              data => {
                  console.log(data);
                  // this.companyTypeList = data.companyTypeList;
              }
          );
      },
      deactivated() {
          this.$destroy();
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
