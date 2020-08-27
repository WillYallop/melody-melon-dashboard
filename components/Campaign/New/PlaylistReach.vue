<template>
    <div class="playlistReachRow">
        <div class="col">
            <p><span class="highlightedP">{{playlistsSelectedAfter.length}}</span> playlists</p>
        </div>
        <div class="col">
            <p><span class="highlightedP">{{playlistFollowers}}</span> followers</p>
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
        playlistsSelectedAfter: Array

    },
    computed: {
        playlistFollowers() {
            if(this.playlistsSelectedAfter.length > 0) {
                var totalFollowers = 0
                for(var i = 0; i < this.playlistsSelectedAfter.length; i++) {
                    totalFollowers = totalFollowers + this.playlistsSelectedAfter[i].followers
                }
                return totalFollowers
            } else {
                return 0
            }
        }
    },
    methods: {

    }
}
</script>

<style scoped>
.playlistReachRow {
    display: flex;
}
.playlistReachRow .col:first-child {
    padding-right: 10px;
    border-right: 1px solid #E1E1E1;
}
.playlistReachRow .col:last-child {
    padding-left: 10px;
}
.playlistReachRow .col p {
    font-size: 16px;
}
.highlightedP {
    font-size: 20px;
    color: #E72B51;
}
</style>