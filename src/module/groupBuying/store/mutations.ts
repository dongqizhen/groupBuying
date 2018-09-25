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
  selectSBTGProductSort(state, productSortValue) {
    state.page.uploadProduct.SBTG.productSort = productSortValue;
  },
  selectHCTGProductSort(state, productSortValue) {
    state.page.uploadProduct.HCTG.productSort = productSortValue;
  },
  selectSHTGProductSort(state, productSortValue) {
    state.page.uploadProduct.SHTG.productSort = productSortValue;
  },
  selectXXHTGProductSort(state, productSortValue) {
    state.page.uploadProduct.XXHTG.productSort = productSortValue;
  },
  selectJRTGProductSort(state, productSortValue) {
    state.page.uploadProduct.JRTG.productSort = productSortValue;
  },
  selectZXTGProductSort(state, productSortValue) {
    state.page.uploadProduct.ZXTG.productSort = productSortValue;
  },
  selectSBTGProductBrand(state, productBrandValue) {
    state.page.uploadProduct.SBTG.productBrand = productBrandValue;
  },
  selectHCTGProductBrand(state, productBrandValue) {
    state.page.uploadProduct.HCTG.productBrand = productBrandValue;
  },
  selectSHTGProductBrand(state, productBrandValue) {
    state.page.uploadProduct.SHTG.productBrand = productBrandValue;
  },
  selectXXHTGProductBrand(state, productBrandValue) {
    state.page.uploadProduct.XXHTG.productBrand = productBrandValue;
  },
  selectJRTGProductBrand(state, productBrandValue) {
    state.page.uploadProduct.JRTG.productBrand = productBrandValue;
  },
  selectZXTGProductBrand(state, productBrandValue) {
    state.page.uploadProduct.ZXTG.productBrand = productBrandValue;
  },
  selectSBTGProductModel(state, productModelValue) {
    state.page.uploadProduct.SBTG.productModel = productModelValue;
  },
  selectHCTGProductModel(state, productModelValue) {
    state.page.uploadProduct.HCTG.productModel = productModelValue;
  },
  selectSHTGProductModel(state, productModelValue) {
    state.page.uploadProduct.SHTG.productModel = productModelValue;
  },
  selectXXHTGProductModel(state, productModelValue) {
    state.page.uploadProduct.XXHTG.productModel = productModelValue;
  },
  selectJRTGProductModel(state, productModelValue) {
    state.page.uploadProduct.JRTG.productModel = productModelValue;
  },
  selectZXTGProductModel(state, productModelValue) {
    state.page.uploadProduct.ZXTG.productModel = productModelValue;
  },
  selectSBTGMainParam(state, mainParamValue) {
    state.page.uploadProduct.SBTG.mainParams = mainParamValue;
  },
  selectHCTGMainParam(state, mainParamValue) {
    state.page.uploadProduct.HCTG.mainParams = mainParamValue;
  },
  selectSHTGMainParam(state, mainParamValue) {
    state.page.uploadProduct.SHTG.mainParams = mainParamValue;
  },
  selectXXHTGMainParam(state, mainParamValue) {
    state.page.uploadProduct.XXHTG.mainParams = mainParamValue;
  },
  selectJRTGMainParam(state, mainParamValue) {
    state.page.uploadProduct.JRTG.mainParams = mainParamValue;
  },
  selectZXTGMainParam(state, mainParamValue) {
    state.page.uploadProduct.ZXTG.mainParams = mainParamValue;
  }
}

export default mutations
