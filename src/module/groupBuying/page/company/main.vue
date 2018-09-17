<template>
    <div class="container selectModel">
        <Header :title="this.$route.name">
            <span slot="explain" class="enter" @click="enterClcik">确定</span>
        </Header>
        <div class="content">
            <div class="selected">
                <h2>已选型号:</h2>
                <ul>
                    <li v-for="item in itemSelect" :key="item.id" :class="checked?'disabled':''">
                        <span>{{item.name}}</span>
                        <i @click="deleteItem(item)"></i>
                    </li>
                </ul>
            </div>
            <search placeholder="请输入主营业务"></search>
            <div class="Model_container">
                <h2>可多选</h2>
                <cube-index-list :data="cityData">
                    <cube-index-list-group v-for="(group, index) in cityData" :key="index" :group="group">
                        <cube-index-list-item v-for="(item, index) in group.items" :key="index" :item="item" @select="selectItem" :class="checked?'disabled':''">
                            <div class="custom-item" :class="addClass(item.id)">{{item.name}}</div>
                        </cube-index-list-item>
                    </cube-index-list-group>
                </cube-index-list>
            </div>
        </div>
    </div>

</template>

<script>
import Header from "../../components/header/header";
import search from "../../components/search/search";
import _ from "lodash";
import { mapMutations } from "vuex";
const cityData = [
  {
    name: "★Hot City",
    items: [
      {
        name: "BEIJING",
        value: 1,
        id: 1
      },
      {
        name: "SHANGHAI",
        value: 2,
        id: 2
      }
    ]
  },
  {
    name: "A",
    items: [
      {
        name: "ANSHAN",
        value: 3,
        id: 3
      },
      {
        name: "ANQING",
        value: 4,
        id: 4
      }
    ]
  },
  {
    name: "B",
    items: [
      {
        name: "BNSHAN",
        value: 3,
        id: 5
      },
      {
        name: "BNQING",
        value: 4,
        id: 6
      }
    ]
  },
  {
    name: "C",
    items: [
      {
        name: "CNSHAN",
        value: 3,
        id: 7
      },
      {
        name: "CNQING",
        value: 4,
        id: 8
      }
    ]
  },
  {
    name: "D",
    items: [
      {
        name: "DNSHAN",
        value: 3,
        id: 9
      },
      {
        name: "DNQING",
        value: 4,
        id: 10
      }
    ]
  },
  {
    name: "E",
    items: [
      {
        name: "ENSHAN",
        value: 3,
        id: 11
      },
      {
        name: "ENQING",
        value: 4,
        id: 12
      }
    ]
  },
  {
    name: "F",
    items: [
      {
        name: "FNSHAN",
        value: 3,
        id: 13
      },
      {
        name: "FNQING",
        value: 4,
        id: 14
      },
      {
        name: "FNSHAN",
        value: 3,
        id: 15
      },
      {
        name: "FNQING",
        value: 4,
        id: 16
      },
      {
        name: "FNSHAN",
        value: 3,
        id: 17
      },
      {
        name: "FNQING",
        value: 4,
        id: 18
      }
    ]
  }
];
export default {
  data() {
    return {
      checked: false,
      cityData,
      itemSelect: []
    };
  },
  components: {
    Header,
    search
  },
  methods: {
    ...mapMutations(["setTransition"]),
    selectItem(item) {
      if (this.itemSelect.length < 3) {
        if (_.without(this.itemSelect, item).length == this.itemSelect.length) {
          this.itemSelect.push(item);
        } else {
          this.itemSelect = _.without(this.itemSelect, item);
        }
      } else if (this.itemSelect.length == 3) {
        this.itemSelect = _.without(this.itemSelect, item);
        if (this.itemSelect.length == 3) {
          this.showToastTime();
        }
      }
    },
    addClass: function(id) {
      if (this.itemSelect) {
        for (const val of this.itemSelect) {
          if (val.id == id) {
            return "active";
          }
        }
      }
    },
    deleteItem(item) {
      this.itemSelect = _.without(this.itemSelect, item);
    },
    showToastTime() {
      const toast = this.$createToast({
        time: 1000,
        txt: "最多选择三个型号"
      });
      toast.show();
    },
    enterClcik() {
      this.setTransition("turn-off");
      this.$router.go(-1);
    }
  },
  computed: {},
  created() {
    //console.log("shua");
  },
  activated() {
    // console.log("1");
  },
  deactivated() {
    this.$destroy();
  }
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
    .selected {
      //@include box_shadow_style;
      height: 77px;
      background: #ffffff;
      border-radius: 5px;
      h2 {
        height: 36px;
        padding-left: 13px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #666666;
        display: flex;
        align-items: center;
      }
      ul {
        display: flex;
        justify-content: flex-start;
        padding: 0 13px;
        li {
          height: 30px;
          border: 0.5px solid #999999;
          border-radius: 7px;
          display: flex;
          align-items: center;
          font-family: PingFangSC-Regular;
          font-size: 13px;
          color: #666666;
          width: 104px;
          padding-left: 10px;
          margin-right: 5px;
          &.disabled {
            color: #cccccc;
            border-color: #ccc;
            > i {
              pointer-events: none;
            }
          }
          > span {
            //display: flex;
            width: 72px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          i {
            display: flex;
            width: 22px;
            height: 22px;
            border-radius: 22px;
            background: url("/static/images/del.png") no-repeat center center;
            background-size: 12px 12px;
            //padding-left: 14.5px;
            justify-content: center;
            &:active {
              background-color: rgba($color: #999, $alpha: 0.3);
            }
          }
        }
      }
    }
    /deep/ .cube-checkbox {
      height: 46px;
      padding: 0 13px;
      //@include box_shadow_style;
      background: #ffffff;
      border-radius: 5px;
      margin: 10px 0;
      &.cube-checkbox_checked {
        .cube-checkbox-ui {
          i {
            color: #019ddd;
          }
        }
      }

      .cube-checkbox-label {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #666666;
      }
    }
    .Model_container {
      margin-top: 10px;
      @include box_shadow_style;
      height: calc(100% - 87px - 56px - 46px);
      padding-top: 0.1px;
      > h2 {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #cccccc;
        height: 40px;
        display: flex;
        align-items: center;
        padding-left: 13px;
        border-bottom: 0.5px solid #f6f6f6;
        justify-content: flex-start;
        span {
          font-size: 12px;
          display: flex;
          justify-content: flex-start;
        }
      }
      /deep/ .cube-index-list {
        height: calc(100% - 40px);
        border-radius: 5px;
        .cube-index-list-fixed {
          display: none;
        }
        .cube-index-list-content {
          > ul {
            .cube-index-list-group {
              h2 {
                display: none;
              }
              > ul {
                li {
                  height: 46px;
                  border-bottom: 0.5px solid #f6f6f6;
                  padding-left: 0;
                  margin-left: 13px;
                  display: flex;
                  align-items: center;
                  > div {
                    padding-left: 0;
                    font-family: PingFangSC-Regular;
                    font-size: 14px;
                    color: #333333;
                    &.active {
                      color: #019ddd;
                    }
                  }
                  &.disabled {
                    pointer-events: none;
                    > div {
                      color: #cccccc;
                    }
                  }
                }
              }
            }
          }
        }
        .cube-index-list-nav {
          ul {
            li {
              font-family: PingFangSC-Medium;
              font-size: 11px;
              color: #999999;
              padding-right: 4px;
              &.active {
                color: #019ddd;
              }
            }
          }
        }
      }
    }
  }
}
</style>
