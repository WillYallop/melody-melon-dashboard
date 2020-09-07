// Sets current date + 2 days
var newDate = new Date(); 
newDate.setDate(newDate.getDate() + 2);

const state = () => ({
    campaign: {
        // Generate a new one for each track the user wants to promote
        tracks: [

        ],
        campaignNotes: '',
        campaignDuration: 2,
        startDate: {
            startDate: newDate,
            endDate: newDate
        }
    }
})
  
const mutations = {
    // Set campaign
    setCampaignEdit(state, data) {
        state.campaign = data
    },
    // Track
    pushNewTrackEdit(state, data) {
        state.campaign.tracks.push(data)
    },
    deleteSpecificTrackEdit(state, index) {
        state.campaign.tracks.splice(index, 1)
    },
    // Save track url & id
    updateSpecificTrackUrlEdit(state, [url, id, index]) {
        state.campaign.tracks[index].trackURL = url
        state.campaign.tracks[index].spotifyTrackId = id
    },
    updateSpecificTrackDataEdit(state, [data, index]) {
        state.campaign.tracks[index].trackData = data
    },
    // Genre mutations for specific track
    pushPlaylistGenresEdit(state, [data, index]) {
        state.campaign.tracks[index].genres.push(data)
    },
    splicePlaylistGenresEdit(state, [genre, index]) {
        state.campaign.tracks[index].genres = state.campaign.tracks[index].genres.filter(a => a !== genre)
    },
    // Selected Genres mutations for specific tracj
    pushSelectedGenresEdit(state, [data, index]) {
        state.campaign.tracks[index].selectedGenres.push(data)
    },
    spliceSelectedGenresEdit(state, [genre, index]) {
        state.campaign.tracks[index].selectedGenres = state.campaign.tracks[index].selectedGenres.filter(a => a !== genre)
    },
    // set placement percentage
    setPlacementPercentageEdit(state, [data, index]) {
        state.campaign.tracks[index].placementPercentage = data
    },
    // Set selected playlists
    setSelectedPlaylistsEdit(state, [data, index]) {
        state.campaign.tracks[index].selectedPlaylists = data
    },
    // Set selected playlists after slider
    updatePlaylistsSelectedAfterSliderEdit(state, [data, index]) {
        state.campaign.tracks[index].playlistsSelectedAfterSlider = data
    },
    // Set note data
    setNoteDataEdit(state, data) {
        state.campaign.campaignNotes = data
    },
    // Set campaign duration
    setCampaignDurationEdit(state, data) {
        state.campaign.campaignDuration = data
    },
    // Set campaign start date
    setCampaignStartDateEdit(state, data) {
        state.campaign.startDate = data
    },
    // Reset
    resetNewCampaignDataEdit(state) {
        state.campaign = {
            tracks: [],
            campaignNotes: '',
            campaignDuration: 2,
            startDate: {
                startDate: newDate,
                endDate: newDate
            }
        }
    }
}

export default {
    state, 
    mutations
}