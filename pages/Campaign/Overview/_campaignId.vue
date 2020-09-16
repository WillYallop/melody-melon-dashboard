<template>
    <div class="pageContainer">
        
        <div v-if="pageLoaded">
            <!-- Header -->
            <overviewHeader
            :title="'Campaign Overview ' + '(' + '#' + campaignData.campaign_id + ')'"
            :tracks="campaignData.campaign_tracks.length"
            :status="campaignData.campaign_status"
            :pageFilter="pageFilter"
            @filter-updated="filterUpdated"/>
            <!-- Campaign Body -->
            <div class="horizontalPadding verticalPadding">

                <!-- Info Section -->
                <div class="sectionContainer" v-show="pageFilter === 'info'">
                    <!-- Info Header -->
                    <div class="sectionHeader">
                        <h2 class="sectionHeaderP">CAMPAIGN INFO</h2>
                        <div class="line"></div>
                    </div>
                    <!-- Campaign Data -->
                    <div class="sectionRow sectionContentStyle">
                        <p class="campaignOverP">Campaign ID: <span>{{campaignData.campaign_id}}</span></p>
                        <p class="campaignOverP">Status: <span>{{campaignData.campaign_status}}</span></p>
                        <p class="campaignOverP">Start Date: <span>{{returnDate(campaignData.start_date)}}</span></p>
                        <p class="campaignOverP">End Date: <span>{{returnDate(campaignData.end_date)}}</span></p>
                        <p class="campaignOverP">Total Tracks: <span>{{campaignData.campaign_tracks.length}}</span></p>
                    </div>
                    <!-- Campaign Playlist Reach -->
                    <div class="sectionCol sectionContentStyle">
                        <h4 class="rowSecTitleP">Playlist Reach</h4>
                        <p class="rowSecBodyP">Your total combined track playlist reach.</p>
                        <playlistReach
                        :tracks="campaignData.campaign_tracks"/>
                    </div>
                    <!-- Campaign Cost -->
                    <div class="sectionCol sectionContentStyle">
                        <h4 class="rowSecTitleP">Campaign Cost</h4>
                        <p class="rowSecBodyP">The cost of your {{campaignData.campaign_duration}} week campaign.</p>
                        <p class="campaignCostP">£{{campaignData.generated_price / 100}}</p>
                    </div>
                    <!-- Campaign Playlist Breakdown -->
                    <div class="sectionRow sectionContentStyle lastRowS1">
                        <h4 class="rowSecTitleP">Playlist Breakdown</h4>
                        <p class="rowSecBodyP">All the unique playlists your tracks are featured in.</p>
                        <playlistBreakdown
                        :playlists="combinedPlaylists"/>
                    </div>
                </div>
                
                <!-- Track Section -->
                <div class="sectionContainer" v-show="pageFilter === 'tracks'">
                    <!-- Track Header -->
                    <div class="sectionHeader">
                        <h2 class="sectionHeaderP">CAMPAIGN TRACKS</h2>
                        <div class="line"></div>
                    </div>
                    <!-- Tracks -->
                    <div class="sectionRow sectionContentStyle" :key="track.campaignTrackNum" v-for="track in campaignData.campaign_tracks">
                        <!-- Track Spotify Data -->
                        <div class="trackRow">
                            <spotifyData
                            :trackData="track.trackData"/>
                        </div>
                        <!-- Track Plays Graph -->
                        <div class="trackRow">
                            <h4 class="rowSecTitleP">Track Plays</h4>
                            <p class="rowSecBodyP">An overview on <b>{{track.trackData.trackName}}</b>('s) performance.</p>
                            <trackPlaysGraph
                            :trackId="track.spotifyTrackId"/>
                        </div>
                        <!-- Track Playlist Breakdown -->
                        <div class="trackRow">
                            <h4 class="rowSecTitleP">Playlist Breakdown</h4>
                            <p class="rowSecBodyP">A breakdown of the targeted genres and playlist placements.</p>
                            <genreBreakdown
                            :genres="track.selectedGenres"/>
                            <playlistBreakdown
                            :playlists="track.playlistsSelectedAfterSlider"/>
                        </div>
                        <!-- Track Plays Graph -->
                        <div class="trackRow">
                            <h4 class="rowSecTitleP">Track Reach</h4>
                            <p class="rowSecBodyP">Total playlist reach.</p>
                            <playlistIndividualReach
                            :playlists="track.playlistsSelectedAfterSlider"/>
                        </div>
                    </div>
                </div>
            
            </div>
            <!-- campaign not started -->
            <div v-if="notStarted" class="notStartedOverlay">
                <div class="infoContainer">
                    <p>Your promotion campaign has not started yet.</p>
                    <p>Start Date: <b>{{returnDate(campaignData.start_date)}}</b></p>
                    <button class="backBtn" v-on:click="$router.go(-1)">Back</button>
                </div>
            </div>
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
// Campaign Components
import overviewHeader from '@/components/Campaign/Overview/OverviewHeader'
import playlistReach from '@/components/Campaign/Overview/PlaylistReach'
import playlistBreakdown from '@/components/Campaign/Overview/PlaylistBreakdown'
import spotifyData from '@/components/Campaign/Pending/SpotifyData'
import trackPlaysGraph from '@/components/Campaign/Overview/TrackPlaysGraph'
import playlistIndividualReach from '@/components/Campaign/Overview/PlaylistIndividualReach'
import genreBreakdown from '@/components/Campaign/Overview/GenreBreakdown'

export default {
    middleware: 'auth-logged-in',
    data() {
        return {
            pageLoaded: false,
            pageFilter: 'info',
            campaignData: [],
            notStarted: false


        }
    },
    components: {
        skeleton,
        overviewHeader,
        playlistReach,
        playlistBreakdown,
        spotifyData,
        trackPlaysGraph,
        playlistIndividualReach,
        genreBreakdown

    },
    mounted() {
        this.loadCampaignData()
        
    },
    computed: {
        combinedPlaylists() {
            var array = []
            // Iterate over tracks
            for(var i = 0; i < this.campaignData.campaign_tracks.length; i++) {
                // Iterate over selected playlist
                for(var l = 0; l < this.campaignData.campaign_tracks[i].playlistsSelectedAfterSlider.length; l++) {
                    array.push(this.campaignData.campaign_tracks[i].playlistsSelectedAfterSlider[l])
                }   
            }
            return array.filter((v,i,a)=>a.findIndex(t=>(t._id === v._id))===i)
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
                // If campaign is paid
                if(responce.data.campaign_paid) {
                    this.campaignData = responce.data
                    this.checkData()
                } else {
                    this.$router.push('/')
                }
            })
            .catch((err) => {
                console.log(err)
            })
        },
        checkData() {
            // If promotion hasnt started yet show grey overlay box
            var currentDate = new Date().getTime()
            var campaignStart = new Date(this.campaignData.start_date)
            if(currentDate < campaignStart) {
                this.notStarted = true
            }
            this.pageLoaded = true
        },
        returnDate(date) {
            var today = new Date(date);
            var dd = today.getDate();

            var mm = today.getMonth()+1; 
            var yyyy = today.getFullYear();
            if(dd<10) 
            {
                dd='0'+dd;
            } 

            if(mm<10) 
            {
                mm='0'+mm;
            } 

            if(this.$auth.user.country === 'GB') {
                return dd+'/'+mm+'/'+yyyy;
            } else {
                return mm+'/'+dd+'/'+yyyy;
            }
        },
        filterUpdated(value) {
            this.pageFilter = value
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
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.sectionContentStyle {
    padding: 20px;
    border-radius: 10px;
    border: 1px solid #DADADA;
    background-color: #FFF;
    margin-bottom: 5px;
}
.sectionContentStyle:last-child {
    margin-bottom: 0;
}
.lastRowS1 {
    margin-bottom: 0;
}
.sectionRow {
    width: 100%;
}
.sectionCol {
    width: calc(50% - 2.5px);
}

.campaignOverP {
    font-weight: bold;
}
.campaignOverP span {
    font-weight: normal;
    margin-left: 5px;
    color: #686868;
}
.campaignCostP {
    color: #E72B51;
    font-size: 20px;
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

.terminateCampaignBtn {
    padding: 10px 40px;
    background-color: #E72B51;
    color: #FFF;
    border-radius: 20px;
    border: none;
    transition: 0.3s;
    cursor: pointer;
}
.terminateCampaignBtn:hover {
    background-color: #D52448;
}

/* Track section */
.trackRow {
    padding-bottom: 15px;
    margin-bottom: 15px;
    border-bottom: 1px solid #EFEFEF;
}
.trackRow:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: 0;
}

/* Not started overlay */
.notStartedOverlay {
    position: fixed;
    bottom: -56px;
    padding: 0 20px;
    padding-bottom: 56px;
    left: 60px;
    right: 0;
    top: 60px;
    background-color: rgba(75, 75, 75, 0.5);
    transition: 0.2s;
    display: flex;
    align-items: center;
    z-index: 100;
}
.infoContainer {
    background-color: #FFF;
    padding: 20px;
    border-radius: 10px;
    margin: 0 auto;
}
.backBtn {
    background-color: #3DA389;
    border-radius: 20px;
    border: none;
    color: #FFF;
    font-size: 16px;
    transition: 0.3s;
    cursor: pointer;
    padding: 10px 40px;
    margin-top: 20px;
}
.backBtn:hover {
    background-color: #379079;
}

@media only screen and (min-width: 1100.1px) {
    .active .notStartedOverlay {right: 400px;}
}
@media only screen and (max-width: 768px) {
    .notStartedOverlay {left: 0;}
}
@media only screen and (max-width: 600px) {
    .sectionCol {width: 100%;}
}
</style>