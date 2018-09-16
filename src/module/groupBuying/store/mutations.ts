const mutations = {
  setName (state, name) {
    state.count = name
  },
  setTransition(state, states) {
    state.states = states;
  },
  setDetailsPageData(state,val){
    state.page.detailsPageData = val;
  }
}

export default mutations
