<template>
  <div class="comment">
    <h2>会员企业留言区<span>（仅限铂金、钻石会员）</span></h2>
    <div class="commentContainer">
      <ul>
        <li>
          <comment-list-item></comment-list-item>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import commentListItem from "./commentListItem";
  export default {
      data() {
          return {};
      },
      components: {
          commentListItem
      }
  };
</script>
<style lang="scss" scoped>
  @import "../../../../../static/scss/_commonScss";
  .comment {
      background-color: #fff;
      h2 {
          padding: 13px;
          font-family: PingFangSC-Medium;
          font-size: 14px;
          color: #333333;

          border-bottom: $border_style;
          span {
              font-family: PingFangSC-Regular;
              font-size: 14px;
              color: #aaaaaa;
          }
      }
  }
</style>

