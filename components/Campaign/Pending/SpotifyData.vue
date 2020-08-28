<template>
    <div class="trackBreakdownContainer">
        <img v-if="trackData.imageSmall" class="trackImg" :src="trackData.imageSmall" alt="Spotify Track Image">
        <img v-else class="trackImg" src="https://static1.squarespace.com/static/5d2e2c5ef24531000113c2a4/5d392a924397f100011fa30e/5d447ee1d4e5d500016bf451/1565199109495/" alt="Spotify Track Image">
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
.trackBreakdownContainer {
    display: flex;
    align-items: center;
}
.trackImg {
    border-radius: 5px;
    width: 50px;
    height: 50px;
}
.textarea {
    width: calc(100% - 50px);
    position: relative;
    padding-left: 10px;
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