<template>
    <div class="pageContainer">
        
        <div v-if="pageLoaded">
            <!-- Page Header -->
            <campaignHeader
            :title="'Start Your Campaign ' + '(' + '#' + campaignId + ')'"
            :tracks="tracks"
            :campaignStatus="campaignStatus"
            :campaignApproved="campaignApproved"/>
            <!-- Campaign Body -->
            <div class="horizontalPadding verticalPadding">
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
                            </div>
                            <!-- Row Body -->
                            <div class="rowBodyContainer">
                                <!-- Display Spotify Data -->
                                <div class="rowSection">
                                    <spotifyData
                                    :trackData="track.trackData"/>
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
                </div>

                <!-- Finalise Campaign Header -->
                <div class="sectionHeader">
                    <h2 class="sectionHeaderP">FINALISE CAMPAIGN</h2>
                    <div class="line"></div>
                </div>
                <!-- Finalise Campaign Section -->
                <div class="sectionContainer">
                    <div class="col">
                        <h4 class="rowSecTitleP">Campaign Start Date</h4>
                        <p class="rowSecBodyP">Select the date you wish to start your campaign.</p>

                        <p class="settingTitleP">Start Date</p>
                        <dateRangePicker class="dateRange"
                            :opens="'right'"
                            :minDate="minDateRange" :maxDate="maxDateRange"
                            :singleDatePicker="true"
                            :autoApply="false"
                            :ranges="false"
                            v-model="dateRange"/>
                        <p class="settingTitleP secondSetTitP">Duration</p>
                        <input type="radio" id="2weeks" class="radioInput" :value="2" v-model="campaignDuration">
                        <label for="2weeks" class="radioInputLabel">2 Weeks</label>
                        <input type="radio" id="4weeks" class="radioInput radioInputTwo" :value="4" v-model="campaignDuration">
                        <label for="4weeks" class="radioInputLabel">4 Weeks</label>

                    </div>
                    <div class="col">
                        <h4 class="rowSecTitleP">Campaign Notes</h4>
                        <p class="rowSecBodyP">If you have any notes add them here.</p>
                        <campaignNotes
                        :noteDataOg="campaignNotes"
                        @save-note="saveNoteData"/>
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
                        <p><span class="highlightedP">£{{generatePrice}}</span> total</p>
                    </div>
                    <div class="row">
                        <div class="rowBodyContainer">
                            <h4 class="rowSecTitleP">Start Campaign</h4>
                            <p class="rowSecBodyP">Once you pay for your campaign in will start at the selected selected date.</p>

                            <button class="sendReviewBtn" v-on:click="saveCampaign">Start</button>
                            <p class="campaignErrorP" v-if="campaignError">{{campaignError}}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Payment Modal -->
            <paymentModal v-if="showPaymentModal"
            @close-modal="showPaymentModal = !showPaymentModal"/>
        </div>

        <div v-else>
            <skeleton/>
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
import campaignHeader from '@/components/Campaign/Pending/CampaignHeader'
import addTrackUrl from '@/components/Campaign/Pending/AddTrackUrl'
import spotifyData from '@/components/Campaign/Pending/SpotifyData'
import targetGenres from '@/components/Campaign/Pending/TargetGenres'
import trackPlacementsSlider from '@/components/Campaign/Pending/TrackPlacementsSlider'
import trackReach from '@/components/Campaign/Pending/TrackReach'
// Campaign Components
import campaignBreakdown from '@/components/Campaign/Pending/CampaignBreakdown'
import campaignNotes from '@/components/Campaign/Pending/CampaignNotes'
// Payment Model
import paymentModal from '@/components/Campaign/PaymentModal'
// Lib Comp
import dateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'

export default {
    middleware: 'auth-logged-in',
    data() {
        return {
            pageLoaded: false,

            campaignStatus: '',
            campaignId: '',
            campaignApproved: '',
            genreList: [], // Dont edit this just copy data
            // Error
            campaignError: false,
            //-data
            minDateRange: '',
            maxDateRange: '',

            showPaymentModal: false
        }
    },
    components: {
        campaignHeader,
        skeleton,
        addTrackUrl,
        spotifyData,
        targetGenres,
        trackPlacementsSlider,
        trackReach,
        campaignBreakdown,
        campaignNotes,
        dateRangePicker,
        paymentModal

    },
    mounted() {
        this.loadCampaignData()
        this.setMaxMinDateRange()

    },
    computed: {
        campaign() {
            return this.$store.state.editCampaign.campaign
        },
        tracks() {
            return this.$store.state.editCampaign.campaign.tracks
        },
        campaignNotes() {
            return this.$store.state.editCampaign.campaign.campaignNotes
        },
        generatePrice() {
            var price = 0
            var totalPlaylistsSelected = 0
            var totalPlaylistFollowers = 0

            for(var i = 0; i < this.tracks.length; i++) {
                totalPlaylistsSelected = totalPlaylistsSelected + this.tracks[i].playlistsSelectedAfterSlider.length
                for(var l = 0; l < this.tracks[i].playlistsSelectedAfterSlider.length; l++) {
                    totalPlaylistFollowers = totalPlaylistFollowers + this.tracks[i].playlistsSelectedAfterSlider[l].followers
                }
            }
            
            // Price per playlist is £20
            // Price per 1000 followers is £1.50
            var playlistCost = totalPlaylistsSelected * 20;
            var followerCost = totalPlaylistFollowers * 0.0015
            
            price = playlistCost + followerCost

            if(this.campaignDuration === 4) {
                price = price * 2
            }

            price = Math.round( price * 100 + Number.EPSILON ) / 100

            return  Math.round(price)
        },
        campaignDuration: {
            get() {
                return this.$store.state.editCampaign.campaign.campaignDuration
            },
            set(value) {
                this.$store.commit('setCampaignDurationEdit', value);
            }
        },
        dateRange: {
            get() {
                return this.$store.state.editCampaign.campaign.startDate
            },
            set(value) {
                this.$store.commit('setCampaignStartDateEdit', value);
            }
        }
    },
    methods: {
        // mounted
        loadCampaignData() {
            let config = {
                headers: {
                    Authorization: this.$auth.getToken('local')
                }
            }
            axios.get(process.env.API_URL + '/campaigns/'+ this.$route.params.campaignId, config)
            .then((responce) => {
                // If campaign is not approved return
                if(responce.data.campaign_approved) {
                    if(responce.data.campaign_status != 'pending') {
                        this.$router.push('/')
                    } else if(responce.data.campaign_paid) {
                        this.$router.push('/')
                    } else {
                        // set date range values
                        if(responce.data.start_date) {
                            var dateRange = {
                                startDate: responce.data.start_date,
                                endDate: responce.data.end_date
                            }
                        } else {
                            var newDate = new Date(); 
                            newDate.setDate(newDate.getDate() + 2);
                            var dateRange = {
                                startDate: newDate,
                                endDate: newDate
                            }
                        }
                        var storeObj = {
                            tracks: responce.data.campaign_tracks,
                            campaignNotes: responce.data.campaign_notes,
                            campaignDuration: responce.data.campaign_duration,
                            startDate: dateRange
                        }
                        this.$store.commit('setCampaignEdit', storeObj)
                        this.getGenreList()
                        this.campaignStatus = responce.data.campaign_status
                        this.campaignId = responce.data.campaign_id
                        this.campaignApproved = responce.data.campaign_approved
                    }
                } else {
                    this.$router.push('/')
                }

            })
            .catch((err) => {

            })
        },
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
                this.pageLoaded = true
            })
            .catch((err) => {
                console.log(err)
            })  
        },
        setFirstTrack() {
            if(this.$store.state.editCampaign.campaign.tracks.length === 0) {
                this.addTrackToCampaign()
            }
        },
        setMaxMinDateRange() {
            var minDate = new Date(); 
            minDate.setDate(minDate.getDate() + 1);
            this.minDateRange = new Date(minDate)

            var maxDate = new Date(); 
            maxDate.setDate(maxDate.getDate() + 29);
            this.maxDateRange = new Date(maxDate)
        },

        // Creation and deletion of tracks
        addTrackToCampaign() {
            // Empty t
            var emptyTrackObj = {
                campaignTrackNum: this.$store.state.editCampaign.campaign.tracks.length + 1,
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
            this.$store.commit('pushNewTrackEdit', emptyTrackObj)
        },
        deleteTrackFromCampaign(index) {
            this.$store.commit('deleteSpecificTrackEdit', index)
        },

        // Add Track URL component emits
        saveTrackUrl(url, id, index) {
            this.$store.commit('updateSpecificTrackUrlEdit', [url, id, index])
        },
        saveTrackData(data, index) {
            var slimmedData = {
                imageMedium: data.album.images[1].url,
                imageSmall: data.album.images[2].url,
                artists: data.artists,
                trackName: data.name,
                trackDurationMs: data.duration_ms
            }
            this.$store.commit('updateSpecificTrackDataEdit', [slimmedData, index])
        },

        // Add Genre Component emits
        addGenre(data, index) {
            // Remove object from playlist genres and add it to selected genre
            // remove
            this.$store.commit('splicePlaylistGenresEdit', [data, index])
            // add
            this.$store.commit('pushSelectedGenresEdit', [data, index])

            // Load all playlists that match selected genres
            this.loadSelectedPlaylists(index)
        },
        removeGenre(data, index) {
            // Remove object from selected genres and add it to all genre
            // remove
            this.$store.commit('spliceSelectedGenresEdit', [data, index])
            // add
            this.$store.commit('pushPlaylistGenresEdit', [data, index])

            // Load all playlists that match selected genres
            this.loadSelectedPlaylists(index)
        },

        // Emit functions from playlist placement slider
        updatePlacementPercentage(data, index) {
            this.$store.commit('setPlacementPercentageEdit', [data, index])
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
                genresSelected: this.$store.state.editCampaign.campaign.tracks[index].selectedGenres
                
            }, header)
            .then((responce) => {
                this.$store.commit('setSelectedPlaylistsEdit', [responce.data, index])
                // Playlist selected after "playlist placement slider exposure"
                this.generatePlaylistsSelectedAfter(index)
            })
            .catch((err) => {
                console.log(err)
            })
        },

        // Playlist selected after "playlist placement slider exposure" - updated on change on slider
        generatePlaylistsSelectedAfter(index) {
            var playlistTotal = this.$store.state.editCampaign.campaign.tracks[index].selectedPlaylists.length
            var percentageAsDecimal =  (this.$store.state.editCampaign.campaign.tracks[index].placementPercentage / 100)
            var percent = percentageAsDecimal * playlistTotal
            // Total playlists they want to be in after dragging slider
            var result = Math.round(percent)

            if(result != playlistTotal) {
                var playlistToRemove = (playlistTotal - result) - 1 // for index
            } else {
                var playlistToRemove = 0
            }

            var data = this.$store.state.editCampaign.campaign.tracks[index].selectedPlaylists.slice(playlistToRemove, )
            
            // update store value for selected playlists after slider
            this.$store.commit('updatePlaylistsSelectedAfterSliderEdit', [data, index])
        },

        // Notes
        saveNoteData(data) {
            this.$store.commit('setNoteDataEdit', data)
        },

        // Completion checks
        checkTrackURL() {
            var status = []
            // For each track check if genres have been selected, if they have the push true, else push false
            for(var i = 0; i < this.$store.state.editCampaign.campaign.tracks.length; i++) {
                if(this.$store.state.editCampaign.campaign.tracks[i].spotifyTrackId.length >= 1) {
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
            for(var i = 0; i < this.$store.state.editCampaign.campaign.tracks.length; i++) {
                if(this.$store.state.editCampaign.campaign.tracks[i].selectedGenres.length >= 1) {
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

                // Header
                let config = {
                    headers: {
                        Authorization: this.$auth.getToken('local')
                    }
                }
                axios.post(process.env.API_URL + '/campaigns/confirm', {
                    _id: this.$route.params.campaignId,
                    tracks: this.$store.state.editCampaign.campaign.tracks,
                    orderNotes: this.$store.state.editCampaign.campaign.campaignNotes,
                    startDate: this.$store.state.editCampaign.campaign.startDate.startDate,
                    campaignDuration: this.$store.state.editCampaign.campaign.campaignDuration
                    
                }, config)
                .then((responce) => {
                    if(responce.data.message === 'success') {
                       // this.$store.commit('resetNewCampaignDataEdit')

                        this.showPaymentModal = true
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
            
            } else {
                this.campaignError = 'Make sure you have filled in all the required sections.'
            }
        }

    },
    beforeDestroy() {
        this.$store.commit('resetNewCampaignDataEdit')
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
    padding-bottom:0;
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
    border: 1px solid #DADADA;
    overflow: hidden;
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
.highlightedP {
    font-size: 20px;
    color: #E72B51;
}

/* Date Range */
.dateRange {
    width: 100%;
}
.settingTitleP {
    margin: 10px 0;
    font-weight: bold;
} 
.radioInput {
    cursor: pointer;
}
.radioInputTwo {
    margin-left: 10px;
}
.radioInputLabel {
    cursor: pointer;
}
input[type='radio'] {
    margin-right: 5px;
}
input[type='radio']:after {
    width: 15px;
    height: 15px;
    border-radius: 15px;
    top: 0px;
    left: 0px;
    position: relative;
    background-color: #FFF;
    content: '';
    display: inline-block;
    visibility: visible;
    border: 2px solid #d1d3d1;
}

input[type='radio']:checked:after {
    width: 15px;
    height: 15px;
    border-radius: 15px;
    top: 0px;
    left: 0px;
    position: relative;
    background-color: #E72B51;
    content: '';
    display: inline-block;
    visibility: visible;
    border: 2px solid #E72B51;
}

/* Media Queries */
@media only screen and (max-width: 600px) {
    .sectionContainer .col {width: 100%;}
}
</style>

<style>
.reportrange-text {
    border-radius: 5px;
    background-color: #FDFDFD !important;
    padding: 9px 10px !important;
    border: 1px solid #EEEEEE !important;
}
.daterangepicker {
    top: 50px;
    left: 0;
}
.cancelBtn {
    display: none;
}
.applyBtn  {
    background-color: #3DA389;
    border: none;
    color: #FFF;
    border-radius: 5px;
    cursor: pointer;
    padding: 5px 10px !important;
}
.daterangepicker td.active, .daterangepicker td.active:hover  {
    background-color: #E72B51;
}
</style>