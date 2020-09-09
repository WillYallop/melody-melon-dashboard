<template>
    <div class="playlistContainer">
        <div class="playlistCol" :key="playlist._id" v-for="playlist in playlists">
            <div class="leftCon">
                <img class="playlistImage" src="" alt="Playlist Image">
                <div class="playlistBody">
                    <p><b>{{playlist.name}}</b></p>
                    <p>{{playlist.followers}} Followers</p>
                </div>
            </div>
            <a class="visitPlaylistBtn" target="_blank" :href="'https://open.spotify.com/playlist/' + playlist.playlist_id"><fa class="fas" :icon="['fas', 'chevron-right']" /></a>
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
        playlists: Array

    },
}
</script>

<style scoped>
.playlistContainer {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}
.playlistCol {
    width: calc(50% - 5px);
    background-color: #F8F8F8;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    border-radius: 10px;
}
.leftCon {
    display: flex;
    width: calc(100% - 30px);
}
.playlistImage {
    height: 40px;
    width: 40px;
    min-width: 40px;
    min-height: 40px;
    background-color: #E72B51;
    border-radius: 5px;
    object-fit: cover;
}
.playlistBody {
    padding: 0 20px;
    width: calc(100% - 40px);
}
.playlistBody p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.visitPlaylistBtn {
    display: block;
    height: 30px;
    width: 30px;
    min-width: 30px;
    background-color: #3DA389;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.3s;
}
.visitPlaylistBtn:hover {
    background-color: #358D77;
}
.visitPlaylistBtn .fas {
    font-size: 12px;
    color: #FFF;
}

@media only screen and (max-width: 650px) {
    .playlistCol {width: 100%;}
}
</style>