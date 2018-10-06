<template>
    <div class="selectProjectNav">
        <ul class="nav">
            <li v-for="item in items" :key="item.id" @click="select(item.id,item)" :class="activeClass(item.id)">{{item.name}}</li>
        </ul>
    </div>
</template>

<script>
import _ from "lodash";
import { _getData } from "../../service/getData";
export default {
  data() {
    return {
      items: [],
      itemSelect: []
    };
  },
  props: ["MultipleSelection"],
  methods: {
    select(item, itemObj) {
      if (this.MultipleSelection != undefined) {
        if (_.without(this.itemSelect, item).length == this.itemSelect.length) {
          this.itemSelect.push(item);
        } else {
          this.itemSelect = _.without(this.itemSelect, item);
        }
      } else {
        if (this.itemSelect.length < 1) {
          this.itemSelect.push(item);
        } else {
          if (_.without(this.itemSelect, item) != item) {
            this.itemSelect.splice(0, 1, item);
          }
        }
      }
      this.$emit("select-value", this.itemSelect.join(","));
      this.$emit("selectObj", itemObj);
    },
    activeClass(id) {
      if (this.itemSelect) {
        for (const val of this.itemSelect) {
          if (val == id) {
            return "active";
          }
        }
      }
    }
  },
  created() {
    _getData(
      "/server/basedata!request.action",
      {
        method: "getGroupPurchaseTypeList",
        params: { code: "TGDHLX" }
      },
      data => {
        console.log("团购类型:", data);
        this.items = data;
        this.itemSelect.push(data[0].id);
        this.$emit("select-value", this.itemSelect.join(","));
        this.$emit("selectObj", this.items[0]);
      }
    );
  }
};
</script>

<style lang="scss" scoped>
.selectProjectNav {
  > ul.nav {
    display: flex;
    padding: 0 13px;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-top: 13px;
    li {
      width: 100px;
      height: 31px;
      border-radius: 31px;
      display: flex;
      border: 1px solid rgb(153, 153, 153);
      align-items: center;
      justify-content: center;
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #666666;
      margin-bottom: 15px;
      &.active {
        font-family: PingFangSC-Medium;
        background: rgba(1, 157, 221, 0.08);
        color: #019ddd;
        border: 1px solid #019ddd;
        box-shadow: 0 2px 2px 0 rgba(1, 157, 221, 0.15);
      }
    }
  }
}
</style>
