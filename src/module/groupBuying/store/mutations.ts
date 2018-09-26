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
  },
  SBTGProductSort(state, productSortValue) {
    state.page.submitGroupDemand.SBTG.productSort = productSortValue;
  },
  HCTGProductSort(state, productSortValue) {
    state.page.submitGroupDemand.HCTG.productSort = productSortValue;
  },
  SHTGProductSort(state, productSortValue) {
    state.page.submitGroupDemand.SHTG.productSort = productSortValue;
  },
  XXHTGProductSort(state, productSortValue) {
    state.page.submitGroupDemand.XXHTG.productSort = productSortValue;
  },
  JRTGProductSort(state, productSortValue) {
    state.page.submitGroupDemand.JRTG.productSort = productSortValue;
  },
  ZXTGProductSort(state, productSortValue) {
    state.page.submitGroupDemand.ZXTG.productSort = productSortValue;
  },
  SBTGProductBrand(state, productBrandValue) {
    state.page.submitGroupDemand.SBTG.productBrand = productBrandValue;
  },
  HCTGProductBrand(state, productBrandValue) {
    state.page.submitGroupDemand.HCTG.productBrand = productBrandValue;
  },
  SHTGProductBrand(state, productBrandValue) {
    state.page.submitGroupDemand.SHTG.productBrand = productBrandValue;
  },
  XXHTGProductBrand(state, productBrandValue) {
    state.page.submitGroupDemand.XXHTG.productBrand = productBrandValue;
  },
  JRTGProductBrand(state, productBrandValue) {
    state.page.submitGroupDemand.JRTG.productBrand = productBrandValue;
  },
  ZXTGProductBrand(state, productBrandValue) {
    state.page.submitGroupDemand.ZXTG.productBrand = productBrandValue;
  },
  SBTGProductModel(state, productModelValue) {
    state.page.submitGroupDemand.SBTG.productModel = productModelValue;
  },
  HCTGProductModel(state, productModelValue) {
    state.page.submitGroupDemand.HCTG.productModel = productModelValue;
  },
  SHTGProductModel(state, productModelValue) {
    state.page.submitGroupDemand.SHTG.productModel = productModelValue;
  },
  XXHTGProductModel(state, productModelValue) {
    state.page.submitGroupDemand.XXHTG.productModel = productModelValue;
  },
  JRTGProductModel(state, productModelValue) {
    state.page.submitGroupDemand.JRTG.productModel = productModelValue;
  },
  ZXTGProductModel(state, productModelValue) {
    state.page.submitGroupDemand.ZXTG.productModel = productModelValue;
  },
  SBTGMainParam(state, mainParamValue) {
    state.page.submitGroupDemand.SBTG.mainParams = mainParamValue;
  },
  HCTGMainParam(state, mainParamValue) {
    state.page.submitGroupDemand.HCTG.mainParams = mainParamValue;
  },
  SHTGMainParam(state, mainParamValue) {
    state.page.submitGroupDemand.SHTG.mainParams = mainParamValue;
  },
  XXHTGMainParam(state, mainParamValue) {
    state.page.submitGroupDemand.XXHTG.mainParams = mainParamValue;
  },
  JRTGMainParam(state, mainParamValue) {
    state.page.submitGroupDemand.JRTG.mainParams = mainParamValue;
  },
  ZXTGMainParam(state, mainParamValue) {
    state.page.submitGroupDemand.ZXTG.mainParams = mainParamValue;
  }
}

export default mutations
