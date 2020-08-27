const state = () => ({
    trackURL: '',
    trackData: {},

    campaignData: {
        // Track URL / URI
        trackURL: '',
        // Track Spotify data
        trackData: {
            image: '',
            artists: [

            ],
            trackName: '',
            trackDurationMs: 0
        },
        // Non slected genres
        playlistGenres: [

        ],
        // Selected genres
        selectedGenres: [

        ],
        // Playlist placement percentage
        placementPercentage: 20
    }

})
  
const mutations = {
    // Track URL
    setTrackURL(state, data) {
        state.trackURL = data;
    },
    // Track data
    setTrackData(state, data) {
        state.songData = data;
    },
    
    // update campaign data
    setCampaignData(state, [key, data]) {
        // sets track url
        if(key === 'trackURL') {
            state.campaignData.trackURL = data
        }
        // sets track data
        if(key === 'trackData') {
            state.campaignData.trackData = data
        }
    },

    // playlist genres mutations
    setPlaylistGenres(state, data) {
        state.campaignData.playlistGenres = data
    },
    pushPlaylistGenres(state, data) {
        state.campaignData.playlistGenres.push(data)
    },
    splicePlaylistGenres(state, index) {
        state.campaignData.playlistGenres.splice(index, 1)
    },

    // Selected Genres mutations
    pushSelectedGenres(state, data) {
        state.campaignData.selectedGenres.push(data)
    },
    spliceSelectedGenres(state, index) {
        state.campaignData.selectedGenres.splice(index, 1)
    },


    // set placement percentage
    setPlacementPercentage(state, data) {
        state.campaignData.placementPercentage = data
    },
}

export default {
    state, 
    mutations
}