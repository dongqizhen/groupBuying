
<template>
  <div class="search">
    <cube-input :placeholder="placeholder" :disabled="disabled" v-model.trim="value" @input="search" :autocomplete="true">
      <i slot="prepend"></i>
      <span slot="append" v-if="isShowSave&&value!=''" @click="save">保存</span>
    </cube-input>
  </div>
</template>

<script>
import { _getData } from "../../service/getData";
import _ from "lodash";
import { log } from "eruda";
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
    },
    getProductLineSearchData(name) {
      _getData(
        "/server_pro/groupPurchaseCompanyProduct!request.action",
        {
          method: "getProductLineListByGroupPurchaseType",
          params: { name: name, groupPurchaseId: "520" }
        },
        data => {
          console.log(data);
          if (name == "") {
            this.$emit("valueChange", {
              stick_area_arr: data.productLineList,
              general_area_arr: data.wzdProductLineList
            });
          } else {
            if (_.concat(data.productLineList, data.aliasList).length == 0) {
              this.$emit("valueChange", this.value);
            } else {
              this.$emit(
                "valueChange",
                _.concat(data.productLineList, data.aliasList)
              );
            }
          }
        }
      );
    },
    getProductBrandSearchData(name) {
      _getData(
        "/server_pro/groupPurchaseCompanyProduct!request.action",
        {
          method: "getBrandListByGroupPurchaseType",
          params: { name: name, productLineId: "264" }
        },
        data => {
          console.log(data);
          if (data.brandList.length == 0) {
            this.$emit("valueChange", this.value);
          } else {
            this.$emit("valueChange", data.brandList);
          }
        }
      );
    },
    getMainParamsSearchData(name) {
      _getData(
        "/server_pro/productParam!request.action",
        {
          method: "getList",
          params: { name: name }
        },
        data => {
          console.log(data);
        }
      );
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
