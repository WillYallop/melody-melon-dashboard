<template>
    <div>
        <div class="inputRow">
            <div class="inputContainer">
                <input class="inputStyle" type="text" placeholder="Track URL" v-model="trackUrl">
                <fa class="fas" :icon="['fab', 'spotify']" />
            </div>
            <button class="submitTrackBtn" v-on:click="getTrackData">Add</button>
        </div>
        <p class="messageP" v-if="getTrackDataError">{{getTrackDataError}}</p>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            // Track data
            trackUrl: '',
            spotifyClientAuth: '',
            trackId: '',
            getTrackDataRetyAttempt: 0,
            getTrackDataError: false,
        }
    },
    props: {
        trackIndex: Number,
        trackUrlOg: String

    },
    mounted() {
        this.trackUrl = this.trackUrlOg
    },
    methods: {
        checkTrackURL() {
            var rexeg = /^(spotify:|https:\/\/[a-z]+\.spotify\.com\/)/
            if(rexeg.test(this.trackUrl)) {
                return true
            } else {
                return false
            }
        },
        getTrackId() {
            // For Spotify track URI
            var trackURI = /^(spotify:)/
            // For Spotify track URL
            var trackURL = /^(https:\/\/[a-z]+\.spotify\.com\/)/
            // Set data
            if(trackURI.test(this.trackUrl)) {
                this.trackId = this.trackUrl.split('spotify:track:')[1]
                // Set track URL
                this.$emit('track-url', this.trackUrl, this.trackId, this.trackIndex)
            } else if (trackURL.test(this.trackUrl)) {
                this.trackId = this.trackUrl.split('https://open.spotify.com/track/')[1].split('?')[0]
                // Set track URL
                this.$emit('track-url', this.trackUrl, this.trackId, this.trackIndex)
            }
        },
        getTrackData() {
            if(this.checkTrackURL()) {
                //Reset errors
                this.getTrackDataError = false
                // Get track id
                this.getTrackId()
                // Get latest spotify client auth key
                axios.get(process.env.API_URL + '/site-settings/spotify-client-auth')
                .then((responce) => {
                    // Set current auth variable
                    this.spotifyClientAuth = responce.data.access_token

                    // Header
                    let spotifyAuthHeader = {
                        headers: {
                            Authorization: 'Bearer '+this.spotifyClientAuth
                        }
                    }
                    // Get track data
                    axios.get('https://api.spotify.com/v1/tracks/'+this.trackId, spotifyAuthHeader)
                    .then((res) => {
                        // Set track data
                        this.$emit('track-data', res.data, this.trackIndex)
                        this.getTrackDataError = 'Song added'
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
            } else {
                this.getTrackDataError = 'Make sure you enter a valid Spotify track URL.'
            }
        }
    }
}
</script>

<style scoped>
.inputRow {
    width: 100%;
    display: flex;
} 
.inputContainer {
    width: calc(100% - 170px);
    position: relative;
}
.inputStyle {
    padding: 0 10px;
    padding-left: 40px;
    height: 35px;
    background-color: #F7F7F7;
    border: 1px solid #EBEBEB;
    width: 100%;
    border-radius: 5px;
    font-size: 16px;
}
.inputContainer .fas {
    position: absolute;
    left: 15px;
    top: 10px;
    color: #1DB954;
}
.submitTrackBtn {
    width: 150px;
    margin-left: 20px;
    background-color: #3DA389;
    border-radius: 20px;
    border: none;
    color: #FFF;
    font-size: 16px;
    cursor: pointer;
    transition: 0.3s;
}
.submitTrackBtn:hover {
    background-color: #379079;
}
.messageP {
    margin-top: 10px;
}

@media only screen and (max-width: 600px) {
    .inputRow {flex-wrap: wrap;}
    .inputContainer {width: 100%;}
    .submitTrackBtn {margin-left: 0; margin-top: 10px; padding: 10px 40px; width: 100%;}
}
</style>