<template>
    <div class="campaignBreakdownCon">
        <div class="col">
            <p><span class="highlightedP">{{totalPlaylists}}</span> Playlists</p>
        </div>
        <div class="col">
            <p><span class="highlightedP">{{totalFollowers}}</span> Followers</p>
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
    computed: {
        totalPlaylists() {          
            return this.playlists.length
        },
        totalFollowers() {
            var output = 0

            // Iterate over tracks selected playlist to add up the total followers
            for(var i = 0; i < this.playlists.length; i++) {
                output = output + this.playlists[i].followers
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