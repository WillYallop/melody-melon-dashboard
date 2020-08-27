<template>
    <div class="trackBreakdownContainer">
        <img class="trackImg" :src="trackData.image" alt="Spotify Track Image">
        <div class="textarea" v-if="trackData.trackName.length > 0">
            <p class="trackNameP" v-if="trackData.trackName.length > 0">{{trackData.trackName}}</p>
            <p class="artistNameP" v-if="trackData.artists.length > 0"><span :key="artist.id" v-for="artist in trackData.artists">{{artist.name}}<span v-if="trackData.artists.indexOf(artist) != trackData.artists.length - 1">, </span></span></p>
            <p class="trackDurationP" v-if="trackData.trackDurationMs > 0">{{millisToMinutesAndSeconds(trackData.trackDurationMs)}}</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    props: {
        trackURL: String,
        trackData: Object

    },
    computed: {

    },
    methods: {
        millisToMinutesAndSeconds(millis) {
            var minutes = Math.floor(millis / 60000);
            var seconds = ((millis % 60000) / 1000).toFixed(0);
            return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
        }
    }
}
</script>

<style scoped>
.trackImg {
    border-radius: 5px;
    width: 100%;
}
.textarea {
    margin-top: 20px;
    width: 100%;
    position: relative;
}
.trackNameP {
    width: 80%;
    font-size: 18px;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.artistNameP {
    width: 90%;
    font-size: 16px;
    font-weight: normal;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.trackDurationP {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 14px;
    color: #707070;
}

/* placeholder */
.imagePlacehold {
    width: 100%;
    background-color: #E72B51;
    border-radius: 5px;
}
.imagePlacehold::after {
    content: '';
    display: block;
    padding-bottom: 100%;
}
</style>