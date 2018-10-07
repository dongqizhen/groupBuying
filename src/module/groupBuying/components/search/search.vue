
<template>
  <div class="search">
    <cube-input :placeholder="placeholder" :disabled="disabled" v-model.trim="value" @input="search" :autocomplete="true">
      <i slot="prepend"></i>
      <span slot="append" v-if="isShowSave&&value!==''" @click="save">保存</span>
    </cube-input>
  </div>
</template>

<script>
import { _getData } from "../../service/getData";
import _ from "lodash";
export default {
  data() {
    return {
      value: ""
    };
  },
  props: ["placeholder", "disabled", "type", "isShowSave"],
  methods: {
    search() {
      this.$emit("inputValue", this.value);
    },
    save() {
      this.$emit("saveValue", this.value);
    }
  },
  deactivated() {
    this.value = "";
  }
};
</script>

<style lang="scss" scoped>
.search {
  background: #ffffff;
  border-radius: 5px;
  height: 36px;
  /deep/ .cube-input {
    padding-left: 13px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    display: flex;
    justify-content: flex-start;
    border-radius: 5px;
    input::-webkit-input-placeholder {
      color: #999;
      font-family: PingFangSC-Regular;
      font-size: 14px;
    }
    input {
      padding: 8.5px 8px;
      //padding-left: 8px;
    }
    .cube-input-prepend {
      height: 14px;
      width: 14px;
      //display: flex;
      margin-right: 4px;
      i {
        display: flex;
        height: 14px;
        width: 14px;
        background: url("../../../../assets/images/write.png") no-repeat center;
        background-size: 100% 100%;
      }
    }
    .cube-input-append {
      span {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #019ddd;
        padding: 8px 13px;
      }
    }
    border: none;
    &:after {
      border: none;
    }
  }
}
</style>
