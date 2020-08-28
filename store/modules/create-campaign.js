const state = () => ({

    campaign: {
        // Generate a new one for each track the user wants to promote
        tracks: [

        ],
        campaignNotes: ''
    }

})
  
const mutations = {
    pushNewTrack(state, data) {
        state.campaign.tracks.push(data)
    },
    deleteSpecificTrack(state, index) {
        state.campaign.tracks.splice(index, 1)
    },
    // Save track url & id
    updateSpecificTrackUrl(state, [url, id, index]) {
        state.campaign.tracks[index].trackURL = url
        state.campaign.tracks[index].spotifyTrackId = id
    },
    updateSpecificTrackData(state, [data, index]) {
        state.campaign.tracks[index].trackData = data
    },
    // Genre mutations for specific tracj
    pushPlaylistGenres(state, [data, index]) {
        state.campaign.tracks[index].genres.push(data)
    },
    splicePlaylistGenres(state, [genreIndex, index]) {
        state.campaign.tracks[index].genres.splice(genreIndex, 1)
    },
    // Selected Genres mutations for specific tracj
    pushSelectedGenres(state, [data, index]) {
        state.campaign.tracks[index].selectedGenres.push(data)
    },
    spliceSelectedGenres(state, [genreIndex, index]) {
        state.campaign.tracks[index].selectedGenres.splice(genreIndex, 1)
    },
    // set placement percentage
    setPlacementPercentage(state, [data, index]) {
        state.campaign.tracks[index].placementPercentage = data
    },
    // Set selected playlists
    setSelectedPlaylists(state, [data, index]) {
        state.campaign.tracks[index].selectedPlaylists = data
    },
    // Set selected playlists after slider
    updatePlaylistsSelectedAfterSlider(state, [data, index]) {
        state.campaign.tracks[index].playlistsSelectedAfterSlider = data
    },
    // Set note data
    setNoteData(state, data) {
        state.campaign.campaignNotes = data
    },

    // Reset
    resetNewCampaignData(state) {
        state.campaign = {
            tracks: [],
            campaignNotes: ''
        }
    }
}

export default {
    state, 
    mutations
}