const mutations = {
  setName (state, name) {
    state.count = name
  },
  setTransition(state, states) {
    state.states = states;
  }
}

export default mutations
