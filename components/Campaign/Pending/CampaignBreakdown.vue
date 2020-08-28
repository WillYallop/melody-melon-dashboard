<template>
    <div class="campaignBreakdownCon">
        <div class="col">
            <p><span class="highlightedP">{{tracks.length}}</span> Total Songs</p>
        </div>
        <div class="col">
            <p><span class="highlightedP">{{totalPlaylistPlacements}}</span> Total Placements</p>
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
        tracks: Array

    },
    computed: {
        totalPlaylistPlacements() {
            var output = 0
            for(var i = 0; i < this.tracks.length; i++) {
                output = output + this.tracks[i].playlistsSelectedAfterSlider.length
            }
            return output
        }
    }
}
</script>

<style scoped>
.campaignBreakdownCon {
    display: flex;
}
.campaignBreakdownCon .col:first-child {
    padding-right: 10px;
    border-right: 1px solid #E1E1E1;
}
.campaignBreakdownCon .col:last-child {
    padding-left: 10px;
}
.campaignBreakdownCon .col p {
    font-size: 16px;
}
.highlightedP {
    font-size: 20px;
    color: #E72B51;
}
</style>