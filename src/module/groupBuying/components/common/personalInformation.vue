<template>
    <div class="personalInformation">
        <div class="details" v-for="(itemPerson,index) in persons" :key="index">
            <h2>
                <p>
                    <i></i>
                    团购负责人{{index+1}}
                </p>
                <span v-if="isShowAddBtn != undefined" :class="index==0?'':'delete'" @click="addOrdelete(index)"></span>
            </h2>
            <ul>
                <li>
                    <span v-if="read">
                        <i v-if="isShowStar">*</i>姓名
                    </span>
                    <span v-else>
                        <i v-if="isShowStar">*</i>姓名：
                    </span>
                    <cube-input class="ipt_box" required  v-model.trim="itemPerson.name" placeholder="请输入姓名" :disabled='disabled'></cube-input>
                </li>
                <li>
                    <span v-if="read">
                        <i v-if="isShowStar">*</i>职务</span>
                    <span v-else>
                        <i v-if="isShowStar">*</i>职务：</span>
                    <cube-input class="ipt_box" v-model.trim="itemPerson.job" placeholder="请输入职务" :disabled='disabled'></cube-input>
                </li>
                <li>
                    <span v-if="read">
                        <i v-if="isShowStar">*</i>移动电话</span>
                    <span v-else>
                        <i v-if="isShowStar">*</i>移动电话：</span>
                    <cube-input class="ipt_box" v-model.number.trim="itemPerson.phone" placeholder="请输入手机号码" :disabled='disabled' :maxlength="11"></cube-input>
                </li>
                <li>
                    <span v-if="read">固定电话</span>
                    <span v-else>固定电话：</span>
                    <cube-input class="ipt_box" v-model.trim="itemPerson.tel" placeholder="请输入固定电话" :disabled='disabled'></cube-input>
                </li>
                <li>
                    <span v-if="read">微信号</span>
                    <span v-else>微信号：</span>
                    <cube-input class="ipt_box" v-model.trim="itemPerson.weixin" placeholder="请输入微信号" :disabled='disabled'></cube-input>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      persons: this.data
        ? this.data
        : [
            {
              name: "",
              job: "",
              phone: "",
              tel: "",
              weixin: ""
            }
          ]
    };
  },
  props: [
    "disabled",
    "read",
    "isShowStar",
    "data",
    "isShowAddBtn",
    "personNumber",
    "itemsLength"
  ],
  mounted() {},
  computed: {},
  methods: {
    addOrdelete(i) {
      console.log(i);
      if (i == 0) {
        this.persons.push({
          name: "",
          job: "",
          phone: "",
          tel: "",
          weixin: ""
        });
      } else {
        this.persons.splice(i, 1);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.details {
  h2 {
    font-family: PingFangSC-Medium;
    font-size: 14px;
    color: #333333;
    display: flex;
    margin-left: 13px;
    height: 44px;
    align-items: center;
    //font-weight: 600;
    border-bottom: 0.5px solid #f6f6f6;
    justify-content: space-between;
    padding-right: 13px;
    p {
      display: flex;
      align-items: center;
    }
    i {
      width: 3px;
      height: 15px;
      background: #4a90e2;
      border-radius: 2px;
      margin-right: 7px;
    }
    span {
      display: flex;
      height: 22px;
      width: 22px;
      background: url("/static/images/add.png") no-repeat center;
      background-size: 100% 100%;
      &.delete {
        background: url("/static/images/delete.png") no-repeat center;
        background-size: 100% 100%;
      }
    }
  }
  ul {
    li {
      height: 44px;
      padding-right: 13px;
      margin-left: 13px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      border-bottom: 0.5px solid #f6f6f6;
      span {
        display: flex;
        width: 93px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #999999;
        i {
          font-size: 16px;
          //width: 10px;
          color: #f11f1f;
          display: flex;
          justify-content: center;
          margin-right: 4px;
          align-items: center;
          font-family: PingFangSC-Regular;
        }
      }
      /deep/ .ipt_box {
        display: flex;
        width: calc(100% - 93px);
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #333333;

        &:after {
          border: none;
        }
        input {
          border: none;
          padding-left: 0;
          color: #333;
          font-family: PingFangSC-Regular;
        }
        input::-webkit-input-placeholder {
          color: #333 !important;
          opacity: 1;
          font-family: PingFangSC-Regular;
          font-size: 14px !important;
        }
      }
    }
  }
}
</style>
