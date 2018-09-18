
<template>
    <div class="search">
        <cube-input :placeholder="placeholder" :disabled="disabled" v-model.trim="value" @input="search" :autocomplete="true">
            <i slot="prepend"></i>
            <span slot="append" v-if="isShowSave" @click="save">保存</span>
        </cube-input>
    </div>
</template>

<script>
import { _getData } from "../../service/getData";
import _ from "lodash";
export default {
  data() {
    return {
      value: "",
      list: []
    };
  },
  props: ["placeholder", "disabled", "type", "isShowSave", "selectValue"],
  mounted() {
    console.log(this.type);
    console.log(this.isShowSave);
    if (this.type == "main") {
      // _getData()
    }
  },
  methods: {
    search() {
      console.log(111);
      //this.$emit("valueChange", this.value);
      this.getSearchData(this.value);
    },
    getSearchData(name) {
      _getData(
        "/server_pro/mainBussiness!request.action",
        {
          method: "getAppPageMainBusinessList",
          params: { name: name }
        },
        data => {
          console.log(data);
          this.list = data.list;
          this.$emit("valueChange", data.list);
        }
      );
    },
    showToastTime() {
      const toast = this.$createToast({
        time: 1000,
        txt: "最多选择三个主营业务"
      });
      toast.show();
    },
    save() {
      if (this.value == "") {
        alert("请输入内容再保存");
      } else {
        if (this.list.length == 0) {
          console.log(this.selectValue);
          if (this.selectValue.length == 0) {
            this.selectValue.push({ id: this.value, name: this.value });
          } else {
            if (this.selectValue.length < 3) {
              if (
                _.findLastIndex(this.selectValue, o => {
                  return o.name == this.value;
                }) == -1
              ) {
                this.selectValue.push({ id: this.value, name: this.value });
              }
            } else {
              this.showToastTime();
            }
          }
          this.$emit("selectMainBusiness", this.selectValue);
        }
      }
    }
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
        background: url("/static/images/write.png") no-repeat center;
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
