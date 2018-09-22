const mutations = {
  setName(state, name) {
    state.count = name
  },
  setTransition(state, states) {
    state.states = states;
  },
  setDetailsPageData(state, val) {
    state.page.detailsPageData = val;
  },
  selectCompanyType(state, companyValue) {
    state.page.typeOfEnterprise.selectedCompanyType = companyValue;
  },
  selectMainBusiness(state, businessValue) {
    state.page.mainBusiness.selectedMainBusiness = businessValue;
  },
  selectProductSort(state, productSortValue) {
    state.page.uploadProduct.productSort = productSortValue;
  },
  selectProductBrand(state, productBrandValue) {
    console.log(productBrandValue)
    state.page.uploadProduct.productBrand = productBrandValue;
  },
  selectProductModel(state, productModelValue) {
    state.page.uploadProduct.productModel = productModelValue;
  },
  selectMainParam(state, mainParamValue) {
    state.page.uploadProduct.mainParams = mainParamValue;
  }
}

export default mutations
