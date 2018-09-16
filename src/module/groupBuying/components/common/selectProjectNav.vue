<template>
    <div class="selectProjectNav">
        <ul class="nav">
            <li v-for="item in items" :key="item.id" @click="select(item.id)" :class="activeClass(item.id)">{{item.name}}</li>
            <!-- <touch-ripple :speed="1" :opacity="0.3" color="#ccc" transition="ease">
                <li class="active">设备团购</li>
            </touch-ripple>
            <touch-ripple :speed="1" :opacity="0.3" color="#ccc" transition="ease">
                <li @click="handleClickEvent">设备团购</li>
            </touch-ripple> -->
        </ul>
    </div>
</template>

<script>
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
    handleClickEvent() {},
    select(item) {
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
      console.log(this.itemSelect);
      this.$emit("select-value", this.itemSelect);
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
    console.log(this.MultipleSelection);
    _getData(
      "/server/basedata!request.action",
      {
        method: "getGroupPurchaseTypeList",
        userid: "7544",
        token: "09a52ead-ef25-411d-8ac2-e3384fceed68",
        params: { code: "TGDHLX" }
      },
      data => {
        console.log(data);
        this.items = data;
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
        background: rgba(1, 157, 221, 0.08);
        color: #019ddd;
        border: 1px solid #019ddd;
        box-shadow: 0 2px 2px 0 rgba(1, 157, 221, 0.15);
      }
    }
  }
}
</style>
