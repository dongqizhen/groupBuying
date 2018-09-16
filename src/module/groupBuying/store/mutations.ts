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
  }
}

export default mutations
