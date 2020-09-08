<template>
    <div class="pageContainer">
        <div class="horizontalPadding verticalPadding">
            
            <div v-if="pageLoaded">
                <!-- Track Header -->
                <div class="sectionHeader">
                    <h2 class="sectionHeaderP">CAMPAIGN TRACKS</h2>
                    <div class="line"></div>
                </div>
                <!-- Track Section -->
                <div class="sectionContainer">
                    <!-- Track v-for -->
                    <div class="trackContainer" :key="tracks.indexOf(track)" v-for="track in tracks">
                        <!-- Track Row -->
                        <div class="row">
                            <!-- Track Header -->
                            <div class="trackHeaderCon">
                                <h2 class="trackHeaderTitle">Track {{tracks.indexOf(track) + 1}}</h2>
                                <div class="buttonContainer">
                                    <button class="deleteTrack" v-if="tracks.indexOf(track) != 0" v-on:click="deleteTrackFromCampaign(tracks.indexOf(track))"><fa class="fas" :icon="['fas', 'trash']" /></button>
                                </div>
                            </div>
                            <!-- Row Body -->
                            <div class="rowBodyContainer">
                                <!-- Get spotify data -->
                                <div class="rowSection">
                                    <h4 class="rowSecTitleP">Add Track URL/URI.</h4>
                                    <p class="rowSecBodyP">Add the URL to the track you want to add to the campaign.</p>
                                    <addTrackUrl
                                    @track-data="saveTrackData"
                                    @track-url="saveTrackUrl"
                                    :trackIndex="tracks.indexOf(track)"
                                    :trackUrlOg="track.trackURL"/>
                                </div>
                                <!-- Display Spotify Data -->
                                <div class="rowSection">
                                    <spotifyData
                                    :trackData="track.trackData"/>
                                </div>
                                <!-- Set Genres -->
                                <div class="rowSection">
                                    <h4 class="rowSecTitleP">Target Genres</h4>
                                    <p class="rowSecBodyP">Select the genres you wish to target.</p>
                                    <targetGenres
                                    @add-genre="addGenre"
                                    @remove-genre="removeGenre"
                                    :trackIndex="tracks.indexOf(track)"
                                    :playlistGenres="track.genres"
                                    :selectedGenres="track.selectedGenres"/>
                                </div>
                                <!-- Track Placement Slider -->
                                <div class="rowSection">
                                    <h4 class="rowSecTitleP">Track Placements</h4>
                                    <p class="rowSecBodyP">Slide to the point that represents your playlist placement requirements for this track.</p>
                                    <trackPlacementsSlider
                                    :trackIndex="tracks.indexOf(track)"
                                    :placementPercentageOg="track.placementPercentage"
                                    @update-placement-percentage="updatePlacementPercentage"/>
                                </div>
                                <!-- Track Placement Slider -->
                                <div class="rowSection">
                                    <h4 class="rowSecTitleP">Track Reach</h4>
                                    <p class="rowSecBodyP">Total playlist reach.</p>
                                    <trackReach
                                    :playlistsSelectedAfterSlider="track.playlistsSelectedAfterSlider"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Add Track -->
                    <div class="addTrackRow" v-on:click="addTrackToCampaign">
                        <p>Add New Track To Campaign</p>
                    </div>
                </div>

                <!-- Finalise Campaign Header -->
                <div class="sectionHeader">
                    <h2 class="sectionHeaderP">FINALISE CAMPAIGN</h2>
                    <div class="line"></div>
                </div>
                <!-- Finalise Campaign Section -->
                <div class="sectionContainer">
                    <div class="row">
                        <div class="rowBodyContainer">
                            <h4 class="rowSecTitleP">Campaign Notes</h4>
                            <p class="rowSecBodyP">If you have any notes add them here.</p>
                            <campaignNotes
                            :noteDataOg="campaignNotes"
                            @save-note="saveNoteData"/>
                        </div>
                    </div>
                    <div class="col">
                        <h4 class="rowSecTitleP">Campaign Breakdown</h4>
                        <p class="rowSecBodyP">An overview of your campaign.</p>
                        <campaignBreakdown
                        :tracks="tracks"/>
                    </div>
                    <div class="col">
                        <h4 class="rowSecTitleP">Campaign Costs</h4>
                        <p class="rowSecBodyP">Campaign price will be calculated once approved.</p>
                        <p class="costP">Not yet calculated</p>
                    </div>
                    <div class="row">
                        <div class="rowBodyContainer">
                            <h4 class="rowSecTitleP">Submit Campaign</h4>
                            <p class="rowSecBodyP">Once you submit your campaign our team will review the track and get back to you within 1 to 2 days.</p>

                            <button class="sendReviewBtn" v-on:click="saveCampaign">Send for review</button>
                            <p class="campaignErrorP" v-if="campaignError">{{campaignError}}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div v-else>
                <skeleton/>
            </div>

        </div>
    </div>
</template>

<script>
// Libs
import axios from 'axios'

// Components
// Skeleton
import skeleton from '@/components/Global/Skeleton'
// Track Components
import addTrackUrl from '@/components/Campaign/Pending/AddTrackUrl'
import spotifyData from '@/components/Campaign/Pending/SpotifyData'
import targetGenres from '@/components/Campaign/Pending/TargetGenres'
import trackPlacementsSlider from '@/components/Campaign/Pending/TrackPlacementsSlider'
import trackReach from '@/components/Campaign/Pending/TrackReach'
// Campaign Components
import campaignBreakdown from '@/components/Campaign/Pending/CampaignBreakdown'
import campaignNotes from '@/components/Campaign/Pending/CampaignNotes'

export default {
    data() {
        return {
            pageLoaded: false,

            genreList: [], // Dont edit this just copy data
            // Error
            campaignError: false,

        }
    },
    components: {
        skeleton,
        addTrackUrl,
        spotifyData,
        targetGenres,
        trackPlacementsSlider,
        trackReach,
        campaignBreakdown,
        campaignNotes

    },
    mounted() {
        this.getGenreList()

    },
    computed: {
        campaign() {
            return this.$store.state.createCampaign.campaign
        },
        tracks() {
            return this.$store.state.createCampaign.campaign.tracks
        },
        campaignNotes() {
            return this.$store.state.createCampaign.campaign.campaignNotes
        }

    },
    methods: {
        // mounted
        getGenreList() {
            // Header
            let header = {
                headers: {
                    Authorization: this.$auth.getToken('local')
                }
            }
            // call
            axios.get(process.env.API_URL + '/playlists/genres', header)
            .then((responce) => {
                this.genreList = responce.data
                this.setFirstTrack()
            })
            .catch((err) => {
                console.log(err)
            })  
        },
        setFirstTrack() {
            if(this.$store.state.createCampaign.campaign.tracks.length === 0) {
                this.addTrackToCampaign()
            }
            this.pageLoaded = true
        },

        // Creation and deletion of tracks
        addTrackToCampaign() {
            // Empty t
            var emptyTrackObj = {
                campaignTrackNum: this.$store.state.createCampaign.campaign.tracks.length + 1,
                spotifyTrackId: '',
                trackURL: '',
                trackData: {
                    imageMedium: '', 
                    imageSmall: '',
                    artists: [

                    ],
                    trackName: '',
                    trackDurationMs: 0
                },
                genres: this.genreList,
                selectedGenres: [

                ],
                placementPercentage: 20,
                selectedPlaylists: [

                ],
                playlistsSelectedAfterSlider: [

                ],
            }
            this.$store.commit('pushNewTrack', emptyTrackObj)
            this.pageLoaded = true
        },
        deleteTrackFromCampaign(index) {
            this.$store.commit('deleteSpecificTrack', index)
        },

        // Add Track URL component emits
        saveTrackUrl(url, id, index) {
            this.$store.commit('updateSpecificTrackUrl', [url, id, index])
        },
        saveTrackData(data, index) {
            var slimmedData = {
                imageMedium: data.album.images[1].url,
                imageSmall: data.album.images[2].url,
                artists: data.artists,
                trackName: data.name,
                trackDurationMs: data.duration_ms
            }
            this.$store.commit('updateSpecificTrackData', [slimmedData, index])
        },

        // Add Genre Component emits
        addGenre(data, index) {
            // Remove object from playlist genres and add it to selected genre
            // remove
            this.$store.commit('splicePlaylistGenres', [data, index])
            // add
            this.$store.commit('pushSelectedGenres', [data, index])

            // Load all playlists that match selected genres
            this.loadSelectedPlaylists(index)
        },
        removeGenre(data, index) {
            // Remove object from selected genres and add it to all genre
            // remove
            this.$store.commit('spliceSelectedGenres', [data, index])
            // add
            this.$store.commit('pushPlaylistGenres', [data, index])

            // Load all playlists that match selected genres
            this.loadSelectedPlaylists(index)
        },

        // Emit functions from playlist placement slider
        updatePlacementPercentage(data, index) {
            this.$store.commit('setPlacementPercentage', [data, index])
            // Playlist selected after "playlist placement slider exposure"
            this.generatePlaylistsSelectedAfter(index)
        },

        // Load all playlists that match selected genres
        loadSelectedPlaylists(index) {
            // Header
            let header = {
                headers: {
                    Authorization: this.$auth.getToken('local')
                }
            }
            // call
            axios.post(process.env.API_URL + '/playlists/selected-genres', {
                genresSelected: this.$store.state.createCampaign.campaign.tracks[index].selectedGenres
                
            }, header)
            .then((responce) => {
                this.$store.commit('setSelectedPlaylists', [responce.data, index])
                // Playlist selected after "playlist placement slider exposure"
                this.generatePlaylistsSelectedAfter(index)
            })
            .catch((err) => {
                console.log(err)
            })
        },

        // Playlist selected after "playlist placement slider exposure" - updated on change on slider
        generatePlaylistsSelectedAfter(index) {
            var playlistTotal = this.$store.state.createCampaign.campaign.tracks[index].selectedPlaylists.length
            var percentageAsDecimal =  (this.$store.state.createCampaign.campaign.tracks[index].placementPercentage / 100)
            var percent = percentageAsDecimal * playlistTotal
            // Total playlists they want to be in after dragging slider
            var result = Math.round(percent)

            if(result != playlistTotal) {
                var playlistToRemove = (playlistTotal - result) - 1 // for index
            } else {
                var playlistToRemove = 0
            }

            var data = this.$store.state.createCampaign.campaign.tracks[index].selectedPlaylists.slice(playlistToRemove, )
            
            // update store value for selected playlists after slider
            this.$store.commit('updatePlaylistsSelectedAfterSlider', [data, index])
        },

        // Notes
        saveNoteData(data) {
            this.$store.commit('setNoteData', data)
        },


        // Completion checks
        checkTrackURL() {
            var status = []
            // For each track check if genres have been selected, if they have the push true, else push false
            for(var i = 0; i < this.$store.state.createCampaign.campaign.tracks.length; i++) {
                if(this.$store.state.createCampaign.campaign.tracks[i].spotifyTrackId.length >= 1) {
                    status.push(true)
                } else {
                    status.push(false)
                }
            }
            // If array only contains true, return true, else return false
            let checker = arr => arr.every(Boolean)
            if(checker(status)) {
                return true
            } else {
                return false
            }
        },
        checkSelectedGenres() {
            var status = []
            // For each track check if genres have been selected, if they have the push true, else push false
            for(var i = 0; i < this.$store.state.createCampaign.campaign.tracks.length; i++) {
                if(this.$store.state.createCampaign.campaign.tracks[i].selectedGenres.length >= 1) {
                    status.push(true)
                } else {
                    status.push(false)
                }
            }
            // If array only contains true, return true, else return false
            let checker = arr => arr.every(Boolean)
            if(checker(status)) {
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
                    // Header
                    let config = {
                        headers: {
                            Authorization: this.$auth.getToken('local')
                        }
                    }
                    axios.post(process.env.API_URL + '/campaigns/create', {
                        tracks: this.$store.state.createCampaign.campaign.tracks,
                        orderNotes: this.$store.state.createCampaign.campaign.campaignNotes
                        
                    }, config)
                    .then((responce) => {
                        if(responce.data.message === 'success') {
                            this.$store.commit('resetNewCampaignData')
                            this.$router.push('/')
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                } else {
                    // If not logged in, redirect to login?action=savecampaign
                    this.$router.push('/login?action=createcampaign')
                }
            } else {
                this.campaignError = 'Make sure you have filled in all the required sections.'
            }
        }

    }
}
</script>

<style scoped>
/* Section Header */
.sectionHeader {
    width: 100%;
    position: relative;
    margin: 0 0 20px;
    display: flex;
    justify-content: center;
    text-align: center;
} 
.sectionHeaderP {
    background-color: #F8F8F8;
    z-index: 20;
    position: relative;
    padding: 0 20px;
    font-size: 22px;
} 
.line {
    width: 100%;
    height: 1px;
    background-color: #DADADA;
    position: absolute;
    top: 14px;
    z-index: 10;
}

/* Section */
.sectionContainer {
    width: 100%;
    margin-bottom: 40px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.sectionContainer:last-child {
    margin-bottom: 0;
}
.sectionTitle {
    width: 100%;
    font-size: 18px;
    margin-bottom: 20px;
}
.sectionContainer .row {
    width: 100%;
    background-color: #FFF;
    border-radius: 10px;
    margin-bottom: 5px;
    overflow: hidden;
    border: 1px solid #DADADA;
}
.sectionContainer .row:last-child {
    margin-bottom: 0;
}
.rowBodyContainer {
    padding: 20px;
}
.sectionContainer .col {
    width: calc(50% - 2.5px);
    padding: 20px;
    background-color: #FFF;
    border-radius: 10px;
    margin-bottom: 5px;
    border: 1px solid #DADADA;
}
/* Track */
.trackContainer {
    width: 100%;
    margin-bottom: 10px;
}
.trackContainer:last-child {
    margin-bottom: 0;
}
.trackHeaderCon {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    background-color: #FFF;
    padding: 0 20px;
    border-bottom: 1px solid #EFEFEF;
}
.trackHeaderTitle {
    font-size: 18px;
} 
.buttonContainer {
    display: flex;
}
.deleteTrack {
    height: 30px;
    width: 30px;
    border-radius: 50%;
    border: none;
    background-color: #E72B51;
    cursor: pointer;
    transition: 0.3s;
}
.deleteTrack .fas {
    color: #FFF;
    font-size: 10px;
}
.deleteTrack:hover {
    background-color: #C02141;
}
/* Row Inner section */
.rowSection {
    border-bottom: 1px solid #EFEFEF;
    padding-bottom: 15px;
    margin-bottom: 15px;
}
.rowSection:last-child {
    border-bottom: none;
    padding-bottom: 0;
    margin-bottom: 0;
}
.rowSecTitleP {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 2px;
} 
.rowSecBodyP {
    font-size: 16px;
    font-weight: normal;
    margin-bottom: 10px;
}

/* Add new track */
.addTrackRow {
    width: 100%;
    padding: 20px;
    background-color: #E72B51;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    text-align: center;
    cursor: pointer;
    transition: 0.3s;
}
.addTrackRow:hover {
    background-color: #C02141;
}
.addTrackRow p {
    color: #FFF;
    font-size: 16px;
    font-weight: bold;
}

.costP {
    color: #E72B51;
}

/* Sign off */
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

@media only screen and (max-width: 600px) {
    .sectionContainer .col {width: 100%;}
}
</style>