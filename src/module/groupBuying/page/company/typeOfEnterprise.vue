<template>
    <div class="container">
        <Header :isSearchHide="false" :title="this.$route.name">
            <span slot="explain" class="enter">确定</span>
        </Header>

        <div class="content">

            <cube-scroll>
                <div class="wrapper_box">
                    <div class="vender common">
                        <h2>厂家</h2>
                        <ul>
                            <li class="active">外资厂家</li>
                            <li>名族厂家</li>
                        </ul>
                    </div>
                    <div class="common">
                        <h2>代理商</h2>
                        <ul>
                            <li>代理商 (经销商)</li>
                            <li>配送商 (平台配送)</li>
                        </ul>
                    </div>
                    <div class="common">
                        <h2>维修</h2>
                        <ul>
                            <li>原厂维修</li>
                            <li>维修代理商</li>
                        </ul>
                    </div>
                    <div class="common">
                        <h2>其他</h2>
                        <ul>
                            <li>第三方维修</li>
                            <li>融资租赁 (金融公司)</li>
                            <li>外贸公司</li>
                            <li>招标公司</li>
                        </ul>
                    </div>
                </div>
            </cube-scroll>

        </div>

    </div>
</template>

<script>
    import Header from "../../components/header/header";
    export default {
      data() {
        return {};
      },
      components: { Header }
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