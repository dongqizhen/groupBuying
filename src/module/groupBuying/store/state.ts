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
        mainParams: [],
        predictTime: {}
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
        mainParams: [],
        predictTime: {}
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
        mainParams: [],
        predictTime: {}
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
        mainParams: [],
        predictTime: {}
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
        mainParams: [],
        predictTime: {}
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
        mainParams: [],
        predictTime: {}
      }
    }
  }
};
export default state
