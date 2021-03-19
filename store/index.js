export const state = () => ({
  menuIsActive: false,
  showOverlay: false,
  email: "",
  setupIntent: {},
})

export const mutations = {
  toggleMenuState(state) {
    state.menuIsActive = !state.menuIsActive
  },

  toggleOverlay(state) {
    state.showOverlay = !state.showOverlay
  },

  updateEmail(state, payload) {
    state.email = payload
  },

  updateSetupIntent(state, payload) {
    state.setupIntent = payload
  },
}
