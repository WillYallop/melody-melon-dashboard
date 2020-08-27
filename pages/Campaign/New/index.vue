<template>
  <div class="pageContainer">
    <div class="horizontalPadding verticalPadding">

        <div class="flexContainer">
            <div class="col1">
                <div class="row">
                    <h4 class="rowTitleP">Add Track</h4>
                    <p class="rowBodyP">Add the track URL that you wish to promote.</p>
                    <trackSelector
                    :trackURLOg="trackURL"
                    @track-url="setTrackURL"
                    @track-data="setTrackDate"/>
                </div>
                <div class="row">
                    <h4 class="rowTitleP">Target Genres</h4>
                    <p class="rowBodyP">Select the genres you wish to target.</p>
                    <targetGenre
                    @add-genre="addGenre"
                    @remove-genre="removeGenre"
                    :playlistGenres="playlistGenres"
                    :selectedGenres="selectedGenres"/>
                </div>
                <div class="row">
                    <h4 class="rowTitleP">Playlist Placements</h4>
                    <p class="rowBodyP">Slide to the point that represents your playlist placement exposure requirements for this campaign.</p>
                    <playlistPlacementsSlider
                    :placementPercentageOg="placementPercentage"
                    @update-placement-percentage="updatePlacementPercentage"/>
                </div>
                <div class="col">
                    <h4 class="rowTitleP">Playlist Reach</h4>
                    <p class="rowBodyP">Total playlist reach.</p>
                    <playlistReach
                    :playlistsSelectedAfter="playlistsSelectedAfter"/>
                </div>
                <div class="col">
                    <h4 class="rowTitleP">Campaign Costs</h4>
                    <p class="rowBodyP">Campaign price will be calculated once approved.</p>
                    
                    <p class="costP">Not yet calculated</p>
                </div>
            </div>
            <div class="col2">
                <div class="row">
                    <trackBreakdown
                    :trackURL="trackURL"
                    :trackData="trackData"/>
                </div>
                <div class="row">
                    <h4 class="rowTitleP">Campaign Notes</h4>
                    <p class="rowBodyP">Add any campaign notes you might have.</p>
                    <campaignNotes
                    :noteDataOg="noteData"
                    @save-note="saveNoteData"/>
                </div>
            </div>
            <!-- Submit row -->
            <div class="col1">
                <div class="row">
                    <h4 class="rowTitleP">Submit Campaign</h4>
                    <p class="rowBodyP">Once you submit your campaign our team will review the track and get back to you within 1 to 2 days.</p>
                    
                    <button class="sendReviewBtn" v-on:click="saveCampaign">Send for review</button>
                    <p class="campaignErrorP" v-if="campaignError">{{campaignError}}</p>
                </div>
            </div>
        </div>

    </div>
  </div>
</template>

<script>
// 
import axios from 'axios'

// Components
import trackSelector from '@/components/Campaign/New/TrackSelector'
import trackBreakdown from '@/components/Campaign/New/TrackBreakdown'
import targetGenre from '@/components/Campaign/New/TargetGenre'
import playlistPlacementsSlider from '@/components/Campaign/New/PlaylistPlacementsSlider'
import playlistReach from '@/components/Campaign/New/PlaylistReach'
import campaignNotes from '@/components/Campaign/New/CampaignNotes'

export default {
    data() {
        return {
            // Total matching playlists based on selected genres
            selectedPlaylists: [],
            // Playlist selected after "playlist placement slider exposure"
            playlistsSelectedAfter: [],
            // Error
            campaignError: false,
        }
    },
    components: {
        trackSelector,
        trackBreakdown,
        targetGenre,
        playlistPlacementsSlider,
        playlistReach,
        campaignNotes

    },
    mounted() {
        setTimeout(() => {
            this.getGenreData()
        }, 1)

    },
    computed: {
        campaignData() {
            return this.$store.state.newCampaign.campaignData
        },
        trackURL() {
            return this.$store.state.newCampaign.campaignData.trackURL
        },
        trackData() {
            return this.$store.state.newCampaign.campaignData.trackData
        },
        playlistGenres() {
            return this.$store.state.newCampaign.campaignData.playlistGenres
        },
        selectedGenres() {
            return this.$store.state.newCampaign.campaignData.selectedGenres
        },
        placementPercentage() {
            return this.$store.state.newCampaign.campaignData.placementPercentage
        },
        noteData() {
            return this.$store.state.newCampaign.campaignData.note
        }
    },
    methods: {
        // mounted
        getGenreData() {
            // If the selected genres is empty then redownload the playlist genres
            if(this.$store.state.newCampaign.campaignData.selectedGenres.length < 1) {
                // Header
                let header = {
                    headers: {
                        Authorization: this.$auth.getToken('local')
                    }
                }
                // call
                axios.get(process.env.API_URL + '/playlists/genres', header)
                .then((responce) => {
                    this.$store.commit('setPlaylistGenres', responce.data)
                })
                .catch((err) => {
                    console.log(err)
                })
            } else {
                this.loadSelectedPlaylists()
            }
        },

        // Emit functions from track selector
        setTrackURL(data) {
            this.$store.commit('setTrackURL', data)
        },
        setTrackDate(data) {
            var slimmedData = {
                image: data.album.images[1].url,
                artists: data.artists,
                trackName: data.name,
                trackDurationMs: data.duration_ms
            }
            this.$store.commit('setTrackData', slimmedData)
        },
        saveNoteData(data) {
            this.$store.commit('setNoteData', data)
        },

        // Emit functions from target genre
        addGenre(data) {
            // Remove object from playlist genres and add it to selected genre
            // remove
            var indexOfData = this.playlistGenres.indexOf(data)
            this.$store.commit('splicePlaylistGenres', indexOfData)
            // add
            this.$store.commit('pushSelectedGenres', data)

            // Load all playlists that match selected genres
            this.loadSelectedPlaylists()
        },
        removeGenre(data) {
            // Remove object from selected genres and add it to all genre
            // remove
            var indexOfData = this.selectedGenres.indexOf(data)
            this.$store.commit('spliceSelectedGenres', indexOfData)
            // add
            this.$store.commit('pushPlaylistGenres', data)

            // Load all playlists that match selected genres
            this.loadSelectedPlaylists()
        },

        // Emit functions from playlist placement slider
        updatePlacementPercentage(data) {
            this.$store.commit('setPlacementPercentage', data)
            // Playlist selected after "playlist placement slider exposure"
            this.generatePlaylistsSelectedAfter()
        },

        // Load all playlists that match selected genres
        loadSelectedPlaylists() {
            // Header
            let header = {
                headers: {
                    Authorization: this.$auth.getToken('local')
                }
            }
            // call
            axios.post(process.env.API_URL + '/playlists/selected-genres', {
                genresSelected: this.$store.state.newCampaign.campaignData.selectedGenres
            }, header)
            .then((responce) => {
                this.selectedPlaylists = responce.data
                // Playlist selected after "playlist placement slider exposure"
                this.generatePlaylistsSelectedAfter()
            })
            .catch((err) => {
                console.log(err)
            })
        },

        // Playlist selected after "playlist placement slider exposure" - updated on change on slider
        generatePlaylistsSelectedAfter() {
            var playlistTotal = this.selectedPlaylists.length
            var percentageAsDecimal =  (this.placementPercentage / 100)
            var percent = percentageAsDecimal * playlistTotal
            // Total playlists they want to be in after dragging slider
            var result = Math.round(percent)

            if(result != playlistTotal) {
                var playlistToRemove = (playlistTotal - result) - 1 // for index
            } else {
                var playlistToRemove = 0
            }
            
            this.playlistsSelectedAfter = this.selectedPlaylists.slice(playlistToRemove, )
        },
        
        // Completion checks
        checkTrackURL() {
            var rexeg = /^(spotify:|https:\/\/[a-z]+\.spotify\.com\/)/
            if(rexeg.test(this.$store.state.newCampaign.campaignData.trackURL)) {
                return true
            } else {
                return false
            }
        },
        checkSelectedGenres() {
            if(this.$store.state.newCampaign.campaignData.selectedGenres.length >= 1) {
                return true
            } else {
                return false
            }
        },
        checkCompletionStatus() {
            if(this.checkTrackURL() && this.checkSelectedGenres()) {
                return true
            } else {
                return false
            }
        },
        // Save campaign
        saveCampaign() {
            if(this.checkCompletionStatus()) {
                // Reset error
                this.campaignError = false
                // Check auth status
                if(this.$auth.loggedIn) {
                    // If logged in send data to db then clear the store
                    
                } else {
                    // If not logged in, redirect to login?action=savecampaign
                    this.$router.push('/login?savecampaign')
                }
            } else {
                this.campaignError = 'Make sure you have filled in all the required sections.'
            }
        }

    }

}
</script>

<style scoped>
.flexContainer {
    display: flex;
    flex-wrap: wrap;
}
.col1 {
    width: calc(100% - 350px);
    padding-right: 5px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.col2 {
    width: 350px;
    padding-left: 5px;
}
.row {
    width: 100%;
    background-color: #FFF;
    border: 1px solid #EEF1FC;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 10px;
}
.row:last-child {
    margin-bottom: 0;
}
.rowTitleP {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 2px;
} 
.rowBodyP {
    font-size: 16px;
    font-weight: normal;
    margin-bottom: 10px;
}
.col1 .col {
    width: calc(50% - 5px);
    background-color: #FFF;
    border: 1px solid #EEF1FC;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 10px;
}
.costP {
    color: #E72B51;
}
.sendReviewBtn {
    padding: 10px 40px;
    background-color: #3DA389;
    border-radius: 20px;
    border: none;
    color: #FFF;
    font-size: 16px;
    margin-top: 10px;
    transition: 0.3s;
    cursor: pointer;
}
.sendReviewBtn:hover {
    background-color: #379079;
}


.campaignErrorP {
    margin-top: 10px;
    color: #E72B51;
}

@media only screen and (max-width: 1500px) {
    .active .col1 {width: 100%; padding-right: 0;}
    .active .col2 {width: 100%; padding-left: 0; margin-bottom: 10px;}
}
@media only screen and (max-width: 1100px) {
    .col1 {width: 100%; padding-right: 0;}
    .col2 {width: 100%; padding-left: 0; margin-bottom: 10px;}
}
@media only screen and (max-width: 600px) {
    .col1 .col {width: 100%;}
    .sendReviewBtn {width: 100%;}
}
</style>