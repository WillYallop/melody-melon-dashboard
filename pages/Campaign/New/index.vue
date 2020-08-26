<template>
  <div class="pageContainer">
    <div class="horizontalPadding verticalPadding">

        <input type="text" v-model="trackUrl">
        <button v-on:click="getTrackData">Submit</button>

        <p v-if="getTrackDataError">{{getTrackDataError}}</p>
        <p>{{trackData}}</p>

    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            trackUrl: '',
            spotifyClientAuth: '',
            trackId: '',
            trackData: '',
            getTrackDataRetyAttempt: 0,
            getTrackDataError: false,
        }
    },
    methods: {
        getTrackData() {
            //Reset errors
            this.getTrackDataError = false
            // Header
            let header = {
                headers: {
                    Authorization: this.$auth.getToken('local')
                }
            }
            // Get latest spotify client auth key
            axios.get('https://api.melodymelon.com/v1/site-settings/spotify-client-auth', header)
            .then((responce) => {
                // Set current auth variable
                this.spotifyClientAuth = responce.data.access_token

                //track id
                this.trackId = this.trackUrl.split('https://open.spotify.com/track/')[1].split('?')[0]
                // Header
                let spotifyAuthHeader = {
                    headers: {
                        Authorization: 'Bearer '+this.spotifyClientAuth
                    }
                }
                // Get track data
                axios.get('https://api.spotify.com/v1/tracks/'+this.trackId, spotifyAuthHeader)
                .then((res) => {
                    this.trackData = res.data
                })
                .catch((err) => {
                    if(err.response.data.error.message === 'The access token expired') {
                        // If token fails retry
                        if(this.getTrackDataRetyAttempt < 1) {
                            this.getTrackData()
                            this.getTrackDataRetyAttempt++
                        } else if (this.getTrackDataRetyAttempt === 1) {
                            // It has been attempted twice and still failed
                            // Show error message
                            this.getTrackDataError = 'There was an issue getting track preview data, however you can still proceed.'
                        }
                    }
                })
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }
}
</script>

<style scoped>

</style>