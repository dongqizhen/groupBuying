interface StateType {
  count : Number,
  states : String,
  API_HOST : Object
  page : Object
}

console.log();
// 下面是在state中定义的数据，尽量使用变量声明

let state : StateType = {
  count: 1,
  states: "turn-on", //控制路由返回
  API_HOST: process.env.API_HOST,
  page: {
    detailsPageData: {},
    typeOfEnterprise: {
      selectedCompanyType: {
        companyTypeName: "",
        companyTypeId: ""
      }
    },
    mainBusiness: {
      selectedMainBusiness: {
        mainBusinessName: "",
        mainBusinessId: ""
      }
    },
    uploadProduct: {
      productSort: {},
      productBrand: {},
      productModel: {}
    },
    mainParams: {}
  }
};
export default state
