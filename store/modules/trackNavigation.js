const state = () => ({
    status: true,
})
  
const mutations = {
    // toggle slider open and close
    toggleTrackNavigation(state) {
        state.status = !state.status;
    },
    specificTrackNavigationStatus(state, bool) {
        state.status = bool
    } 

}

export default {
    state, 
    mutations
}