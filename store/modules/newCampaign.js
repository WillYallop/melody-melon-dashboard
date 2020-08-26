const state = () => ({
    trackURL: '',
    trackData: {},
})
  
const mutations = {
    // Track URL
    setTrackURL(state, data) {
        state.trackURL = data;
    },
    // Track data
    setTrackData(state, data) {
        state.songData = data;
    }
    

}

export default {
    state, 
    mutations
}