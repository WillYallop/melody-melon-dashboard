<template>
  <div class="pageContainer">
    <div class="horizontalPadding verticalPadding">

        <div class="flexContainer">
            <div class="col1">
                <div class="row">
                    <h4 class="rowTitleP">Add Track</h4>
                    <p class="rowBodyP">Add the track URL that you wish to promote.</p>
                    <trackSelector
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
                    <p class="rowBodyP">Slide to the point that represents your playlist placement requirements for this campaign.</p>
                    <playlistPlacementsSlider/>
                    <p>{{selectedPlaylists}}</p>
                </div>
                <div class="col">
                    <h4 class="rowTitleP">Playlist Reach</h4>
                    <p class="rowBodyP">Total playlist reach.</p>

                </div>
                <div class="col">
                    <h4 class="rowTitleP">Campaign Costs</h4>
                    <p class="rowBodyP">Campaign price will be calculated once approved.</p>

                </div>
                <div class="row">
                    <h4 class="rowTitleP">Submit Campaign</h4>
                    <p class="rowBodyP">Once you submit your campaign our team will review the track and get back to you within 1 to 2 days.</p>
                    
                </div>
            </div>
            <div class="col2">
                <div class="row">
                    <trackBreakdown
                    :trackURL="trackURL"
                    :trackData="trackData"/>
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

export default {
    data() {
        return {
            trackURL: '',
            trackData: {},
            playlistData: [],

            playlistGenres: [],
            selectedGenres: [],

            selectedPlaylists: []
            
        }
    },
    components: {
        trackSelector,
        trackBreakdown,
        targetGenre,
        playlistPlacementsSlider
    },
    mounted() {
        this.getPlaylistData()
        this.getGenreData()
    },
    methods: {
        // mounted
        getPlaylistData() {
            // Header
            let header = {
                headers: {
                    Authorization: this.$auth.getToken('local')
                }
            }
            // call
            axios.get(process.env.API_URL + '/playlists/campaign', header)
            .then((responce) => {
                this.playlistData = responce.data
            })
            .catch((err) => {
                console.log(err)
            })
        },
        getGenreData() {
            // Header
            let header = {
                headers: {
                    Authorization: this.$auth.getToken('local')
                }
            }
            // call
            axios.get(process.env.API_URL + '/playlists/genres', header)
            .then((responce) => {
                this.playlistGenres = responce.data
            })
            .catch((err) => {
                console.log(err)
            })
        },

        // Emit functions from track selector
        setTrackURL(data) {
            this.trackURL = data
        },
        setTrackDate(data) {
            this.trackData = data
        },

        // Emit functions from target genre
        addGenre(data) {
            // Remove object from playlist genres and add it to selected genre
            // remove
            var indexOfData = this.playlistGenres.indexOf(data)
            this.playlistGenres.splice(indexOfData, 1)
            // add
            this.selectedGenres.push(data)

            // Load all playlists that match selected genres
            this.loadSelectedPlaylists()
        },
        removeGenre(data) {
            // Remove object from selected genres and add it to all genre
            // remove
            var indexOfData = this.selectedGenres.indexOf(data)
            this.selectedGenres.splice(indexOfData, 1)
            // add
            this.playlistGenres.push(data)

            // Load all playlists that match selected genres
            this.loadSelectedPlaylists()
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
                genresSelected: this.selectedGenres
            }, header)
            .then((responce) => {
                this.selectedPlaylists = responce.data
            })
            .catch((err) => {
                console.log(err)
            })
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
</style>