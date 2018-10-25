<template>
    <div class="demandList">
        <div class="common productSort">
            <span>{{keyWords()}}分类</span>
            <span class="value">{{data.productLineName}}</span>
            <span class="taiNumber" v-if="slectedTypeKeyWord!='JRTG'">
                <b>{{data.num}}</b>
                <a>台</a>
            </span>
        </div>
        <div class="common hopeBrand" v-if="slectedTypeKeyWord=='SBTG' ||slectedTypeKeyWord=='HCTG'">
            <ul>
                <li v-for="(val,index) in data.brandList" :key="index">
                    <span>
                        <img :src="index==0?'../static/images/selected-first.png':(index==1?'../static/images/selected-second.png':'../static/images/selected-three.png')">
                        <span>{{index==0?"首选":(index==1?'次选':'再选')}}</span>
                    </span>
                    <span class="brandAndModel">
                        <span class="brand">{{val.brandName}}</span>
                        <span class="model" v-for="(item,ind) in val.modelList" :key="ind">{{item.modelName}}</span>
                    </span>
                </li>

            </ul>
        </div>
        <div v-if="slectedTypeKeyWord=='SHTG' || slectedTypeKeyWord=='XXHTG'">
            <div class="common productSort"><span>{{keyWords()}}品牌</span>
                <span class="value">{{data.brandList[0].brandName}}</span></div>
            <div class="common productSort model" v-if="data.brandList[0].modelList.length!=0">
                <span>{{keyWords()}}型号</span>
                <ul>
                    <li v-for="(val,index) in data.brandList[0].modelList" :key="index">{{val.modelName}}</li>
                </ul>
            </div>
        </div>
        <div v-if="slectedTypeKeyWord=='JRTG' || slectedTypeKeyWord=='ZXTG'">
            <div class="common productSort"><span>{{keyWords()}}服务商</span>
                <span class="value">{{data.brandList[0].brandName}}</span>
            </div>

        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  components: {},
  props: ["pageName", "data", "slectedTypeKeyWord"],
  methods: {
    keyWords() {
      switch (this.slectedTypeKeyWord) {
        case "SBTG":
          return "设备";
        case "SHTG":
          return "设备";
        case "ZXTG":
          return "咨询";
        case "JRTG":
          return "金融";
        case "XXHTG":
          return "平台";
        case "HCTG":
          return "耗材";
        default:
          return "产品";
      }
    }
  },
  mounted() {
    console.log(this.data);
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../../static/scss/_commonScss";
.demandList {
  .common {
    width: 100%;
    padding: 0 13px;
    border-bottom: $border_style;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-family: PingFangSC-Regular;
    font-size: 13px;
    color: #999999;
  }
  %value {
    > span {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      &.value {
        // width: 181px;
        color: #333;
      }
      &:first-child {
        margin-right: 10px;
      }
    }
  }
  .productSort {
    @extend %value;
    height: 50px;
    .value {
      display: inline-block;
      height: 100%;
      font-size: 16px;
      // font-weight: 600;
      line-height: 50px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      font-family: PingFangSC-Medium;
      width: 218px;
    }
    .taiNumber {
      font-family: PingFangSC-Regular;
      font-size: 10px;
      color: #999999;
      display: flex;
      align-items: flex-end;

      b {
        font-family: BebasNeue;
        font-size: 24px;
        color: #333333;
      }
      a {
        font-family: PingFangSC-Regular;
        font-size: 10px;
        color: #999999;
        margin-bottom: 2px;
        text-decoration: none;
      }
    }
    &.model {
      ul {
        display: flex;
        justify-content: flex-start;
        flex: 1;
        li {
          background: rgba(142, 142, 142, 0.05);
          border-radius: 2px;
          height: 19px;
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #666666;
          padding: 0 10px;
          line-height: 19px;
          margin-right: 10px;
        }
      }
    }
  }
  .hopeBrand {
    ul {
      width: 100%;
      padding: 13px 0;

      li {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-bottom: 13px;
        height: 19px;
        &:last-child {
          margin-bottom: 0;
        }
        img {
          width: 10px;
          height: 10px;
          vertical-align: middle;
          margin-right: 4px;
        }
        @extend %value;
        > span {
          height: 100%;
        }
        .brandAndModel {
          display: flex;
          flex: 1;
          justify-content: flex-start;
          align-items: center;
          span {
            height: 19px;
            line-height: 19px;
            display: inline-block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .brand {
          width: 56px;
          // margin-left: 10px;
          background: #999999;
          border-radius: 2px;
          font-size: 12px;
          color: #ffffff;
          text-align: center;
          // margin-bottom: -4px;
        }
        .model {
          margin-left: 10px;
          background: rgba(142, 142, 142, 0.05);
          border-radius: 2px;
          text-align: center;
          font-size: 12px;
          color: #666;
          min-width: 49px;
          max-width: 62px;
          //margin-bottom: -4px;
          padding: 0 10px;
        }
      }
    }
  }
}
</style>
