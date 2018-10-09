<template>
  <div class="clearfix commentList">
    <div class="left">
      <img src="../../../../../static/images/add.png" />
    </div>
    <div class="right">
      <div class="nameBox">
        <span class="userName">李幸福</span>
        <span class="commentTime">2018-03-20 15:30</span>
        <div class="approve" :class="isActive?'active':''" @click="triggle()">
          <i></i>
          <span>{{dianzanshu}}</span>
        </div>
      </div>
      <p>挺好的挺好的额，留言相关内容。挺好的挺好的额，留言相关内容挺好的挺好的额，留言相关内容挺好的挺好的额，留言相关内容</p>
      <div class="replyBtn">
        <span>打赏</span>
        <span><a>235</a>回复</span>
        <span class="delete">删除</span>
      </div>
      <ul class="reply">
        <li><span>巩春辉：</span><span>我只是一条评论</span></li>
        <li><span>巩春辉：</span><span>我只是一条评论</span></li>
        <li><span>巩春辉：</span><span>我只是一条评论</span></li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
      data() {
          return {
              isActive: true,
              dianzanshu: 129
          };
      },
      methods: {
          triggle() {
              this.isActive
                  ? (this.dianzanshu = this.dianzanshu - 1)
                  : (this.dianzanshu = this.dianzanshu + 1);
              this.isActive = !this.isActive;
          }
      }
  };
</script>
<style lang="scss" scoped>
  .commentList {
      min-height: 80px;
      padding: 13px;
      border-bottom: 1px solid #f0f0f0;
      .left {
          width: 46px;
          height: 100%;
          img {
              height: 36px;
              width: 36px;
              border-radius: 100%;
          }
      }
      .right {
          width: calc(100% - 46px);
          .nameBox {
              font-size: 12px;
              color: #666;
              position: relative;
              margin-bottom: rem(6);
              > span {
                  display: block;
                  color: #406599;
                  font-size: 14px;
                  line-height: 20px;
                  font-family: PingFangSC-Regular;
                  &:nth-child(2) {
                      font-size: 12px;
                      text-align: left;
                      color: #999999;
                      line-height: 17px;
                      font-family: PingFangSC-Regular;
                  }
              }
              .approve {
                  color: #aaa;
                  position: absolute;
                  right: 0;
                  top: 0;
                  line-height: 24px;
                  height: 24px;
                  display: flex;
                  align-items: center;
                  i {
                      width: 16px;
                      height: 16px;
                      vertical-align: middle;
                      margin-right: 4px;
                      background: url("../../../../../static/images/approve.png")
                          no-repeat left center;
                      background-size: 100% 100%;
                  }
                  span {
                      font-size: 12px;
                      line-height: 24px;
                      float: left;
                  }
                  &.active {
                      color: #fb6441;
                      i {
                          background: url("../../../../../static/images/approve-active.png")
                              no-repeat left center;
                          background-size: 100% 100%;
                      }
                  }
              }
          }
          p {
              width: 100%;
              word-break: break-all;
              font-size: 15px;
              color: #666;
              line-height: 24px;
              margin-top: 6px;
              margin-bottom: 20px;
              font-family: PingFangSC-Regular;
          }
          .replyBtn {
              height: 23px;
              margin-bottom: 20px;
              span {
                  display: flex;
                  float: left;
                  height: 100%;
                  padding: 0 17px;
                  text-align: center;
                  align-items: center;
                  line-height: 23px;
                  font-size: 12px;
                  color: #333333;
                  background: #f5f5f5;
                  border-radius: 23px;
                  margin-right: 8px;
                  &.delete {
                      float: right;
                      background: #fff;
                      padding: 0;
                  }
              }
          }
          .reply {
              padding: 10px 13px;
              background: #f5f5f5;
              margin-bottom: 14px;
              li {
                  font-size: 14px;
                  color: #151515;
                  line-height: 20px;
                  margin-bottom: 7px;
                  word-break: break-all;
                  &:last-child {
                      margin-bottom: 0;
                  }
                  span {
                      &:first-child {
                          color: #406599;
                      }
                  }
              }
          }
      }
  }
</style>
