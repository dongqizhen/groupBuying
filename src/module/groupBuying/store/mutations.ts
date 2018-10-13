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
  setUserCompanyIdOrHospitalId(state, companyIdOrHospitalId) {
    state.userCompanyIdOrHospitalId = companyIdOrHospitalId;
  },
  setDetailsPageData(state, val) {
    state.page.detailsPageData = val;
  },
  selectCompanyType(state, companyValue) {
    state.page.typeOfEnterprise = companyValue;
  },
  selectMainBusiness(state, businessValue) {
    state.page.mainBusiness = businessValue;
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
  SBTG(state, SBTGValue) {
    state.page.submitGroupDemand.SBTG = SBTGValue;
  },
  HCTG(state, HCTGValue) {
    state.page.submitGroupDemand.HCTG = HCTGValue;
  },
  SHTG(state, SHTGValue) {
    state.page.submitGroupDemand.SHTG = SHTGValue;
  },
  XXHTG(state, SHTGValue) {
    state.page.submitGroupDemand.XXHTG = SHTGValue;
  },
  SBTGProductSort(state, productSortValue) {
    state.page.submitGroupDemand.SBTG.productLine = productSortValue;
  },
  HCTGProductSort(state, productSortValue) {
    state.page.submitGroupDemand.HCTG.productLine = productSortValue;
  },
  SHTGProductSort(state, productSortValue) {
    state.page.submitGroupDemand.SHTG.productLine = productSortValue;
  },
  XXHTGProductSort(state, productSortValue) {
    state.page.submitGroupDemand.XXHTG.productLine = productSortValue;
  },
  JRTGProductSort(state, productSortValue) {
    state.page.submitGroupDemand.JRTG.productLine = productSortValue;
  },
  ZXTGProductSort(state, productSortValue) {
    state.page.submitGroupDemand.ZXTG.productLine = productSortValue;
  },
  SBTGProductBrandFirst(state, productBrandValue) {
    state.page.submitGroupDemand.SBTG.brandFirst = productBrandValue;
  },
  SBTGProductBrandSecond(state, productBrandValue) {
    state.page.submitGroupDemand.SBTG.brandSecond = productBrandValue;
  },
  SBTGProductBrandThird(state, productBrandValue) {
    state.page.submitGroupDemand.SBTG.brandThird = productBrandValue;
  },
  HCTGProductBrandFirst(state, productBrandValue) {
    state.page.submitGroupDemand.HCTG.brandFirst = productBrandValue;
  },
  HCTGProductBrandSecond(state, productBrandValue) {
    state.page.submitGroupDemand.HCTG.brandSecond = productBrandValue;
  },
  HCTGProductBrandThird(state, productBrandValue) {
    state.page.submitGroupDemand.HCTG.brandThird = productBrandValue;
  },
  SHTGProductBrand(state, brandValue) {
    state.page.submitGroupDemand.SHTG.brand = brandValue;
  },
  XXHTGProductBrand(state, productBrandValue) {
    state.page.submitGroupDemand.XXHTG.brand = productBrandValue;
  },
  JRTGProductBrand(state, productBrandValue) {
    state.page.submitGroupDemand.JRTG.brand = productBrandValue;
  },
  ZXTGProductBrand(state, productBrandValue) {
    state.page.submitGroupDemand.ZXTG.brand = productBrandValue;
  },
  SBTGProductModelFirst(state, productModelValue) {
    state.page.submitGroupDemand.SBTG.modelFirst = productModelValue;
  },
  SBTGProductModelSecond(state, productModelValue) {
    state.page.submitGroupDemand.SBTG.modelSecond = productModelValue;
  },
  SBTGProductModelThird(state, productModelValue) {
    state.page.submitGroupDemand.SBTG.modelThird = productModelValue;
  },
  HCTGProductModelFirst(state, productModelValue) {
    state.page.submitGroupDemand.HCTG.modelFirst = productModelValue;
  },
  HCTGProductModelSecond(state, productModelValue) {
    state.page.submitGroupDemand.HCTG.modelSecond = productModelValue;
  },
  HCTGProductModelThird(state, productModelValue) {
    state.page.submitGroupDemand.HCTG.modelThird = productModelValue;
  },
  SHTGProductModel(state, modelValue) {
    state.page.submitGroupDemand.SHTG.model = modelValue;
  },
  XXHTGProductModel(state, modelValue) {
    state.page.submitGroupDemand.XXHTG.model = modelValue;
  },
  SBTGMainParam(state, mainParamValue) {
    state.page.submitGroupDemand.SBTG.params = mainParamValue;
  },
  HCTGMainParam(state, mainParamValue) {
    state.page.submitGroupDemand.HCTG.params = mainParamValue;
  },
  XXHTGMainParam(state, mainParamValue) {
    state.page.submitGroupDemand.XXHTG.params = mainParamValue;
  },
  JRTGMainParam(state, mainParamValue) {
    state.page.submitGroupDemand.JRTG.params = mainParamValue;
  },
  ZXTGMainParam(state, mainParamValue) {
    state.page.submitGroupDemand.ZXTG.params = mainParamValue;
  },
  SBTGPredictTime(state, predictTimeValue) {
    state.page.submitGroupDemand.SBTG.loadTime = predictTimeValue;
  },
  HCTGPredictTime(state, predictTimeValue) {
    state.page.submitGroupDemand.HCTG.loadTime = predictTimeValue;
  },
  SHTGPredictTime(state, predictTimeValue) {
    state.page.submitGroupDemand.SHTG.loadTime = predictTimeValue;
  },
  XXHTGPredictTime(state, predictTimeValue) {
    state.page.submitGroupDemand.XXHTG.loadTime = predictTimeValue;
  },
  JRTGPredictTime(state, predictTimeValue) {
    state.page.submitGroupDemand.JRTG.loadTime = predictTimeValue;
  },
  ZXTGPredictTime(state, predictTimeValue) {
    state.page.submitGroupDemand.ZXTG.loadTime = predictTimeValue;
  },
  SBTGNumSave(state, val) {
    state.page.submitGroupDemand.SBTG.num = val;
  },
  SBTGPriceSave(state, val) {
    state.page.submitGroupDemand.SBTG.price = val;
  },
  SBTGApplicationSave(state, val) {
    state.page.submitGroupDemand.SBTG.application = val;
  },
  SBTGIntroduceSave(state, val) {
    state.page.submitGroupDemand.SBTG.introduce = val;
  },
  HCTGNumSave(state, val) {
    state.page.submitGroupDemand.HCTG.num = val;
  },
  HCTGPriceSave(state, val) {
    state.page.submitGroupDemand.HCTG.price = val;
  },
  HCTGApplicationSave(state, val) {
    state.page.submitGroupDemand.HCTG.application = val;
  },
  HCTGIntroduceSave(state, val) {
    state.page.submitGroupDemand.HCTG.introduce = val;
  },
  SHTGNumSave(state, val) {
    state.page.submitGroupDemand.HCTG.num = val;
  },
  SHTGPriceSave(state, val) {
    state.page.submitGroupDemand.HCTG.price = val;
  },
  SHTGInstallTimeSave(state, val) {
    state.page.submitGroupDemand.HCTG.installTime = val;
  },
  SHTGDeviceCheckNumSave(state, val) {
    state.page.submitGroupDemand.HCTG.deviceCheckNum = val;
  },
  SHTGResponseTimeSave(state, val) {
    state.page.submitGroupDemand.HCTG.responseTime = val;
  },
  SHTGMaintenanceTypeSave(state, val) {
    state.page.submitGroupDemand.HCTG.maintenanceType = val;
  },
  SHTGIntroduceSave(state, val) {
    state.page.submitGroupDemand.HCTG.introduce = val;
  },
  XXHTGNumSave(state, val) {
    state.page.submitGroupDemand.XXHTG.num = val;
  },
  XXHTGPriceSave(state, val) {
    state.page.submitGroupDemand.XXHTG.price = val;
  },
  XXHTGApplicationSave(state, val) {
    state.page.submitGroupDemand.XXHTG.application = val;
  },
  XXHTGIntroduceSave(state, val) {
    state.page.submitGroupDemand.XXHTG.introduce = val;
  }
}

export default mutations
