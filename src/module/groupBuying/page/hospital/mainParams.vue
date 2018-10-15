<template>
  <div class="container">
    <Header :title="title">
       <span slot="explain" class="enter" @click="clickSure">确定</span>
    </Header>
    <div class="content">
      <div class="selectedParamBox">
          <div class="selectedText">{{selectText}}</div>
          <div class="selectedParams">
             <ul>
               <li v-for="item in itemSelect" :key="item.id" class="clearfix">
                   <span class="paramValue">{{item.name}}</span>
                   <span class="deleteBtn" @click="deleteItem(item)">
                       <img src="../../../../../static/images/del.png" alt="">
                   </span>
               </li>
             </ul>
          </div>
      </div>
      <search :placeholder="placeholder" isShowSave="true" v-on:saveValue="saveParam" v-on:inputValue="getValue"></search>
      <div class="paramBox">
        <div class="pleaseSelected">请选择:<span>{{noteText}}</span></div>
        <div class="params">
          <ul class="clearfix">
            <li v-for="param in params" :key="param.id" @click="selected(param)" :class="activeClass(param.id)">{{param.name}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "../../components/header/header";
import search from "../../components/search/search";
import _ from "lodash";
import { mapMutations } from "vuex";
import { _getData } from "../../service/getData";
import { Toast } from "vant";
export default {
  data() {
    return {
      title: "",
      placeholder: "",
      toastText: "",
      selectText: "",
      noteText: "",
      tempLastSearchValue: "",
      params: [],
      currentIdx: null,
      itemSelect: []
    };
  },
  components: {
    Header,
    search
  },
  methods: {
    ...mapMutations([
      "setTransition",
      "selectSBTGMainParam",
      "selectHCTGMainParam",
      "selectSHTGMainParam",
      "selectXXHTGMainParam",
      "selectJRTGMainParam",
      "selectZXTGMainParam",
      "SBTGMainParam",
      "HCTGMainParam",
      "SHTGMainParam",
      "XXHTGMainParam",
      "JRTGMainParam",
      "ZXTGMainParam"
    ]),
    clickSure() {
      this.setTransition("turn-off");
      console.log(this.itemSelect);
      switch (this.$route.query.groupTypeCode) {
        case "SBTG":
          if (this.$route.query.page == "uploadProduct") {
            this.selectSBTGMainParam(this.itemSelect);
          } else if (this.$route.query.page == "submitGroupDemand") {
            this.SBTGMainParam(this.itemSelect);
          }
          break;
        case "HCTG":
          if (this.$route.query.page == "uploadProduct") {
            this.selectHCTGMainParam(this.itemSelect);
          } else if (this.$route.query.page == "submitGroupDemand") {
            this.HCTGMainParam(this.itemSelect);
          }
          break;
        case "SHTG":
          if (this.$route.query.page == "uploadProduct") {
            this.selectSHTGMainParam(this.itemSelect);
          } else if (this.$route.query.page == "submitGroupDemand") {
            this.SHTGMainParam(this.itemSelect);
          }
          break;
        case "XXHTG":
          if (this.$route.query.page == "uploadProduct") {
            this.selectXXHTGMainParam(this.itemSelect);
          } else if (this.$route.query.page == "submitGroupDemand") {
            this.XXHTGMainParam(this.itemSelect);
          }
          break;
        case "JRTG":
          if (this.$route.query.page == "uploadProduct") {
            this.selectJRTGMainParam(this.itemSelect);
          } else if (this.$route.query.page == "submitGroupDemand") {
            this.JRTGMainParam(this.itemSelect);
          }
          break;
        case "ZXTG":
          if (this.$route.query.page == "uploadProduct") {
            this.selectZXTGMainParam(this.itemSelect);
          } else if (this.$route.query.page == "submitGroupDemand") {
            this.ZXTGMainParam(this.itemSelect);
          }
          break;
      }
      this.$router.go(-1);
    },
    getValue(val) {
      console.log(val);
      this.reqData(val);
    },
    selected(param) {
      let changeParam = _.find(this.itemSelect, function(o) {
        return o.id == param.id;
      });
      if (this.itemSelect.length < 3) {
        if (
          _.without(this.itemSelect, changeParam).length ==
          this.itemSelect.length
        ) {
          this.itemSelect.push(param);
        } else {
          this.itemSelect = _.without(this.itemSelect, changeParam);
        }
      } else if (this.itemSelect.length === 3) {
        this.itemSelect = _.without(this.itemSelect, changeParam);
        if (this.itemSelect.length === 3) {
          Toast(this.toastText);
        }
      }
    },
    deleteItem(item) {
      this.itemSelect = _.without(this.itemSelect, item);
    },
    activeClass(id) {
      if (this.itemSelect) {
        for (const val of this.itemSelect) {
          if (val.id == id) {
            return "active";
          }
        }
      }
    },
    saveParam(name) {
      this.tempLastSearchValue = name;
      console.log(name);
      let paramListCommon, itemSelectCommon;
      itemSelectCommon = _.find(this.itemSelect, function(o) {
        return o.name.toUpperCase() === name.toUpperCase();
      });
      if (this.params.length > 0) {
        paramListCommon = _.find(this.params, function(o) {
          return o.name.toUpperCase() === name.toUpperCase();
        });
      }
      if (this.itemSelect.length === 3) {
        Toast(this.toastText);
      } else {
        if (!itemSelectCommon && !paramListCommon) {
          this.itemSelect.push({ id: "", name: name });
        } else {
          if (!itemSelectCommon && paramListCommon) {
            this.itemSelect.push(paramListCommon);
          } else if (itemSelectCommon) {
            Toast("您已选择该参数，请勿重复选择");
          }
        }
      }
    },
    reqData(name) {
      _getData(
        "/server_pro/productParam!request.action",
        {
          method: "getList",
          params: { name: name }
        },
        data => {
          console.log(data);
          this.params = data.paramList;
        }
      );
    }
  },
  activated() {
    if (this.$route.query.groupTypeCode == "HCTG") {
      this.title = "填写规格";
      this.placeholder = "请输入重要规格";
      this.toastText = "最多选择三个重要规格";
      this.selectText = "已选规格:";
      this.noteText = "(企业提供的重要规格清单)";
    } else if (
      this.$route.query.groupTypeCode == "ZXTG" ||
      this.$route.query.groupTypeCode == "JRTG"
    ) {
      this.title = "关键词";
      this.placeholder = "请输入关键词";
      this.toastText = "最多选择三个关键词";
      this.selectText = "已选关键词:";
      this.noteText = "(企业提供的关键词清单)";
    } else {
      this.title = "填写参数";
      this.placeholder = "请输入重要参数";
      this.toastText = "最多选择三个重要参数";
      this.selectText = "已选参数:";
      this.noteText = "(企业提供的重要参数清单)";
    }
    this.itemSelect = this.$route.query.vuexSelectValue;
    this.reqData();
  },
  watch: {
    itemSelect() {
      if (this.itemSelect.length > 3) {
        Toast(this.toastText);
      }
    }
  },
  deactivated() {
    //this.$destroy();
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
    padding: 13px;
    .selectedParamBox {
      height: 77px;
      background-color: #fff;
      padding: 10px 13px;
      margin-bottom: 10px;
      .selectedText {
        font-size: 14px;
        color: #666;
        margin-bottom: 7px;
        line-height: 20px;
      }
      .selectedParams {
        ul {
          display: flex;
          li {
            width: 104px;
            height: 30px;
            line-height: 30px;
            border: 1px solid #999999;
            border-radius: 7px;
            margin-right: 5px;
            padding-left: 10px;
            span {
              float: left;
              display: block;
              text-align: center;
            }
            .paramValue {
              width: 68px;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
              text-align: center;
              font-size: 13px;
              color: #666;
            }
            .deleteBtn {
              width: 12px;
              //height: 12px;
              margin: 0 5px;
              color: #999;
            }
          }
        }
      }
    }
    .paramBox {
      margin-top: 10px;
      background-color: #fff;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      padding: 10px 13px;
      min-height: 235px;
      .pleaseSelected {
        font-size: 14px;
        color: #666;
        line-height: 20px;
        margin-bottom: 8px;
        span {
          font-size: 12px;
          color: #ccc;
          padding-left: 6px;
        }
      }
      .params {
        ul {
          width: 102%;
          li {
            min-width: 91px;
            float: left;
            text-align: center;
            height: 30px;
            line-height: 30px;
            border: 1px solid #999999;
            border-radius: 7px;
            margin-right: 10px;
            margin-bottom: 13px;
            font-size: 13px;
            padding: 0 10px;
            color: #666666;
            &.active {
              background: rgba(1, 157, 221, 0.08);
              border: 1px solid #019ddd;
              border-radius: 7px;
              color: #019ddd;
            }
          }
        }
      }
    }
  }
}
</style>
