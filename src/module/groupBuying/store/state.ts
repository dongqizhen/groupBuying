interface StateType {
  count : Number,
  states : String,
  API_HOST : Object,
  page : Object,
  userType : String,
  userCompanyIdOrHospitalId : String
}

// 下面是在state中定义的数据，尽量使用变量声明

let state : StateType = {
  count: 1,
  states: "turn-on", //控制路由返回
  API_HOST: process.env.API_HOST,
  userType: "",
  userCompanyIdOrHospitalId: "",
  page: {
    detailsPageData: {},
    typeOfEnterprise: {},
    mainBusiness: [],
    uploadProduct: {
      SBTG: {
        productSort: [
          {
            aliasId: "",
            aliasName: "",
            productLineId: "",
            productLineName: ""
          }
        ],
        productBrand: [
          {
            aliasId: "",
            aliasName: "",
            brandId: "",
            brandLabel: "",
            brandName: ""
          }
        ],
        productModel: [],
        mainParams: []
      },
      HCTG: {
        productSort: [
          {
            aliasId: "",
            aliasName: "",
            productLineId: "",
            productLineName: ""
          }
        ],
        productBrand: [
          {
            aliasId: "",
            aliasName: "",
            brandId: "",
            brandLabel: "",
            brandName: ""
          }
        ],
        productModel: [],
        mainParams: []
      },
      SHTG: {
        productSort: [
          {
            aliasId: "",
            aliasName: "",
            productLineId: "",
            productLineName: ""
          }
        ],
        productBrand: [
          {
            aliasId: "",
            aliasName: "",
            brandId: "",
            brandLabel: "",
            brandName: ""
          }
        ],
        productModel: [],
        mainParams: []
      },
      XXHTG: {
        productSort: [
          {
            aliasId: "",
            aliasName: "",
            productLineId: "",
            productLineName: ""
          }
        ],
        productBrand: [
          {
            aliasId: "",
            aliasName: "",
            brandId: "",
            brandLabel: "",
            brandName: ""
          }
        ],
        productModel: [],
        mainParams: []
      },
      JRTG: {
        productSort: [
          {
            aliasId: "",
            aliasName: "",
            productLineId: "",
            productLineName: ""
          }
        ],
        productBrand: [
          {
            aliasId: "",
            aliasName: "",
            brandId: "",
            brandLabel: "",
            brandName: ""
          }
        ],
        productModel: [],
        mainParams: []
      },
      ZXTG: {
        productSort: [
          {
            aliasId: "",
            aliasName: "",
            productLineId: "",
            productLineName: ""
          }
        ],
        productBrand: [
          {
            aliasId: "",
            aliasName: "",
            brandId: "",
            brandLabel: "",
            brandName: ""
          }
        ],
        productModel: [],
        mainParams: []
      }
    },
    submitGroupDemand: {
      SBTG: {
        productLine: [
          {
            aliasId: "",
            aliasName: "",
            productLineId: "",
            productLineName: ""
          }
        ],
        productLineName: "",
        productLineId: "",
        brandFirst: [
          {
            aliasId: "",
            aliasName: "",
            brandId: "",
            brandLabel: "",
            brandName: ""
          }
        ],
        brandFirstName: "",
        brandSecond: [
          {
            aliasId: "",
            aliasName: "",
            brandId: "",
            brandLabel: "",
            brandName: ""
          }
        ],
        brandSecondName: "",
        brandThird: [
          {
            aliasId: "",
            aliasName: "",
            brandId: "",
            brandLabel: "",
            brandName: ""
          }
        ],
        brandThirdName: "",
        modelFirst: [],
        modelSecond: [],
        modelThird: [],
        mainParams: [],
        predictTime: {},
        num: 1, //需求数量
        price: "", //采购价格
        application: "", //应用需求
        introduce: "" //采购需求说明
      },
      HCTG: {
        productLine: [
          {
            aliasId: "",
            aliasName: "",
            productLineId: "",
            productLineName: ""
          }
        ],
        brandFirst: [
          {
            aliasId: "",
            aliasName: "",
            brandId: "",
            brandLabel: "",
            brandName: ""
          }
        ],
        brandSecond: [
          {
            aliasId: "",
            aliasName: "",
            brandId: "",
            brandLabel: "",
            brandName: ""
          }
        ],
        brandThird: [
          {
            aliasId: "",
            aliasName: "",
            brandId: "",
            brandLabel: "",
            brandName: ""
          }
        ],
        modelFirst: [],
        modelSecond: [],
        modelThird: [],
        mainParams: [],
        predictTime: {},
        num: 1, //需求数量
        price: "", //采购价格
        application: "", //应用需求
        introduce: "" //采购需求说明
      },
      SHTG: {
        productLine: [
          {
            aliasId: "",
            aliasName: "",
            productLineId: "",
            productLineName: ""
          }
        ],
        brand: [
          {
            aliasId: "",
            aliasName: "",
            brandId: "",
            brandLabel: "",
            brandName: ""
          }
        ],
        model: [],
        mainParams: [],
        predictTime: {}
      },
      XXHTG: {
        productLine: [
          {
            aliasId: "",
            aliasName: "",
            productLineId: "",
            productLineName: ""
          }
        ],
        brand: [
          {
            aliasId: "",
            aliasName: "",
            brandId: "",
            brandLabel: "",
            brandName: ""
          }
        ],
        model: [],
        mainParams: [],
        predictTime: {},
        num: 1, //需求数量
        price: "", //采购价格
        application: "", //应用需求
        introduce: "" //采购需求说明
      },
      JRTG: {
        productLine: [
          {
            aliasId: "",
            aliasName: "",
            productLineId: "",
            productLineName: ""
          }
        ],
        brand: [
          {
            aliasId: "",
            aliasName: "",
            brandId: "",
            brandLabel: "",
            brandName: ""
          }
        ],
        mainParams: [],
        predictTime: {}
      },
      ZXTG: {
        productLine: [
          {
            aliasId: "",
            aliasName: "",
            productLineId: "",
            productLineName: ""
          }
        ],
        brand: [
          {
            aliasId: "",
            aliasName: "",
            brandId: "",
            brandLabel: "",
            brandName: ""
          }
        ],
        mainParams: [],
        predictTime: {}
      }
    }
  }
};
export default state
