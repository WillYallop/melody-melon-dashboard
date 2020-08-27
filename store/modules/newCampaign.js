const state = () => ({
    campaignData: {
        // Track URL / URI
        trackURL: '',
        // Track Spotify data
        trackData: {
            image: 'https://static1.squarespace.com/static/5d2e2c5ef24531000113c2a4/5d392a924397f100011fa30e/5d447ee1d4e5d500016bf451/1565199109495/', 
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
        placementPercentage: 20,
        // Note Data
        note: ''
    }

})
  
const mutations = {
    // Track URL
    setTrackURL(state, data) {
        state.campaignData.trackURL = data;
    },
    // Track data
    setTrackData(state, data) {
        state.campaignData.trackData = data;
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

    // Set note data
    setNoteData(state, data) {
        state.campaignData.note = data
    }
}

export default {
    state, 
    mutations
}