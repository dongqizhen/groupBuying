const mutations = {
  setName(state, name) {
    state.count = name
  },
  setTransition(state, states) {
    state.states = states;
  },
  setUserType(state, type) {
    state.userType = type;
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
  SBTGProductBrandFirst(state, productBrandValue) {
    state.page.submitGroupDemand.SBTG.productBrandFirst = productBrandValue;
  },
  SBTGProductBrandSecond(state, productBrandValue) {
    state.page.submitGroupDemand.SBTG.productBrandSecond = productBrandValue;
  },
  SBTGProductBrandThird(state, productBrandValue) {
    state.page.submitGroupDemand.SBTG.productBrandThird = productBrandValue;
  },
  HCTGProductBrandFirst(state, productBrandValue) {
    state.page.submitGroupDemand.HCTG.productBrandFirst = productBrandValue;
  },
  HCTGProductBrandSecond(state, productBrandValue) {
    state.page.submitGroupDemand.HCTG.productBrandSecond = productBrandValue;
  },
  HCTGProductBrandThird(state, productBrandValue) {
    state.page.submitGroupDemand.HCTG.productBrandThird = productBrandValue;
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
  SBTGProductModelFirst(state, productModelValue) {
    state.page.submitGroupDemand.SBTG.productModelFirst = productModelValue;
  },
  SBTGProductModelSecond(state, productModelValue) {
    state.page.submitGroupDemand.SBTG.productModelSecond = productModelValue;
  },
  SBTGProductModelThird(state, productModelValue) {
    state.page.submitGroupDemand.SBTG.productModelThird = productModelValue;
  },
  HCTGProductModelFirst(state, productModelValue) {
    state.page.submitGroupDemand.HCTG.productModelFirst = productModelValue;
  },
  HCTGProductModelSecond(state, productModelValue) {
    state.page.submitGroupDemand.HCTG.productModelSecond = productModelValue;
  },
  HCTGProductModelThird(state, productModelValue) {
    state.page.submitGroupDemand.HCTG.productModelThird = productModelValue;
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
  },
  SBTGPredictTime(state, predictTimeValue) {
    state.page.submitGroupDemand.SBTG.predictTime = predictTimeValue;
  },
  HCTGPredictTime(state, predictTimeValue) {
    state.page.submitGroupDemand.HCTG.predictTime = predictTimeValue;
  },
  SHTGPredictTime(state, predictTimeValue) {
    state.page.submitGroupDemand.SHTG.predictTime = predictTimeValue;
  },
  XXHTGPredictTime(state, predictTimeValue) {
    state.page.submitGroupDemand.XXHTG.predictTime = predictTimeValue;
  },
  JRTGPredictTime(state, predictTimeValue) {
    state.page.submitGroupDemand.JRTG.predictTime = predictTimeValue;
  },
  ZXTGPredictTime(state, predictTimeValue) {
    state.page.submitGroupDemand.ZXTG.predictTime = predictTimeValue;
  }
}

export default mutations
