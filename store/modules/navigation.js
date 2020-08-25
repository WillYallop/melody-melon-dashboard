const state = () => ({
    status: false,
})
  
const mutations = {
    // toggle slider open and close
    toggleNavigation(state) {
        state.status = !state.status;
    },
    specificNavigationStatus(state, bool) {
        state.status = bool
    } 

}

export default {
    state, 
    mutations
}