const mutations = {
  setName (state, name) {
    state.count = name
  },
  setTransition(state, states) {
    console.log(state)
    state.states = states;
  }
}

export default mutations
