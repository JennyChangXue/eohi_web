const state = {
  currentActive: ''
};
const mutations = {
  set_current_active: (state, path) => {
    state.currentActive = path;
  }
};
const actions = {
  setCurrentActive ({ commit }, path) {
    commit('set_current_active', path);
  }
};
export default {
  state,
  mutations,
  actions
};
