interface StateType {
  count : Number,
  states : String,
  API_HOST : Object,
  page : Object,
  userType : String
}

console.log();
// 下面是在state中定义的数据，尽量使用变量声明

let state : StateType = {
  count: 1,
  states: "turn-on", //控制路由返回
  API_HOST: process.env.API_HOST,
  userType: "",
  page: {
    detailsPageData: {},
    typeOfEnterprise: {
      selectedCompanyType: {
        companyTypeName: "",
        companyTypeId: ""
      }
    },
    mainBusiness: {
      selectedMainBusiness: []
    },
    uploadProduct: {
      SBTG: {
        productSort: [],
        productBrand: [],
        productModel: [],
        mainParams: []
      },
      HCTG: {
        productSort: [],
        productBrand: [],
        productModel: [],
        mainParams: []
      },
      SHTG: {
        productSort: [],
        productBrand: [],
        productModel: [],
        mainParams: []
      },
      XXHTG: {
        productSort: [],
        productBrand: [],
        productModel: [],
        mainParams: []
      },
      JRTG: {
        productSort: [],
        productBrand: [],
        productModel: [],
        mainParams: []
      },
      ZXTG: {
        productSort: [],
        productBrand: [],
        productModel: [],
        mainParams: []
      }
    },
    submitGroupDemand: {
      SBTG: {
        productSort: [],
        productBrand: [],
        productModel: [],
        mainParams: [],
        predictTime: {}
      },
      HCTG: {
        productSort: [],
        productBrand: [],
        productModel: [],
        mainParams: [],
        predictTime: {}
      },
      SHTG: {
        productSort: [],
        productBrand: [],
        productModel: [],
        mainParams: [],
        predictTime: {}
      },
      XXHTG: {
        productSort: [],
        productBrand: [],
        productModel: [],
        mainParams: [],
        predictTime: {}
      },
      JRTG: {
        productSort: [],
        productBrand: [],
        productModel: [],
        mainParams: [],
        predictTime: {}
      },
      ZXTG: {
        productSort: [],
        productBrand: [],
        productModel: [],
        mainParams: [],
        predictTime: {}
      }
    }
  }
};
export default state
