<template>
 <div class="submitComment">

          <div class="footer">
             <group>
                  <x-textarea v-model="Textareavalue" placeholder="发表评论" height="34" class="ipt-box" autosize></x-textarea>
             </group>
               <!-- <textarea-autosize
  placeholder="发表评论"
  ref="someName"
  v-model="someValue"
  :min-height="16"
  :max-height="64" class="ipt-box"
></textarea-autosize> -->
          </div>
          <span>发送</span>
      </div>
</template>
<script>
import VueTextareaAutosize from "vue-textarea-autosize";
import { Group, XTextarea, XNumber, CellBox } from "vux";
export default {
  data() {
    return {
      Textareavalue: ""
    };
  },
  components: {
    VueTextareaAutosize,
    Group,
    XTextarea,
    XNumber,
    CellBox
  }
};
</script>
<style lang="scss" scoped>
.submitComment {
  width: 349px;
  line-height: 32px;
  position: absolute;
  bottom: 0;
  border-top: 1px solid #e9e9e9;
  background: #fff;
  z-index: 1111;
  padding: 9px 13px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  // .footer {
  //   width: 280px;
  //   border: 1px solid #e9e9e9;
  //   border-radius: 20px;
  //   padding: 0px 13px;
  //   background: #f5f5f5;
  //   display: flex;
  //   align-items: center;
  // }
  .footer {
    width: 280px;
    height: auto;
    border-bottom: none;
    > div {
      width: 100%;
    }
    /deep/ .weui-cells {
      margin-top: 0;
      width: 100%;
      &:before {
        border-top: 0;
      }
      &:after {
        border-bottom: 0;
      }
      .weui-cell {
        display: flex;
        flex-direction: column;
        padding: 0;
        .weui-cell__hd {
          display: none;
        }
        .weui-cell__bd {
          width: 100%;
          background-color: #f5f5f5;
          textarea::-webkit-input-placeholder {
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #cccccc;
          }
          textarea {
            color: #999;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            max-height: 64px;
          }
        }
      }
    }
  }
  // .ipt-box {
  //   background: #f5f5f5;
  //   -webkit-appearance: none;
  //   font-size: 14px;
  //   color: #999;
  //   line-height: 12px;
  // }
  span {
    font-size: 14px;
    color: #666666;
  }
}
</style>
