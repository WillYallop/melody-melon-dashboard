<template>
    <div class="campaignListContainer">
        <!-- Filter -->
        <div class="navigationBarContainer">
            <div class="col" v-on:click="filter = 'all'; selectedPos[0] = '0'; loadCampaigns()" :class="{ 'activeCol' : filter === 'all' }">
                <div class="textarea">
                    <fa class="fas" :icon="['fas', 'list-ul']" />
                    <p>All</p>
                </div>
            </div>
            <div class="col" v-on:click="filter = 'pending'; selectedPos[0] = '20%'; loadCampaigns()" :class="{ 'activeCol' : filter === 'pending' }">
                <div class="textarea">
                    <fa class="fas" :icon="['fas', 'question-circle']" /> 
                    <p>Pending</p>             
                </div>
            </div>
            <div class="col" v-on:click="filter = 'active'; selectedPos[0] = '40%'; loadCampaigns()" :class="{ 'activeCol' : filter === 'active' }">
                <div class="textarea">
                    <fa class="fas" :icon="['fas', 'play']" />
                    <p>Active</p>            
                </div>
            </div>
            <div class="col" v-on:click="filter = 'complete'; selectedPos[0] = '60%'; loadCampaigns()" :class="{ 'activeCol' : filter === 'complete' }">
                <div class="textarea">
                    <fa class="fas" :icon="['fas', 'check-circle']" />
                    <p>Complete</p>
                </div>
            </div>
            <div class="col" v-on:click="filter = 'cancelled'; selectedPos[0] = '80%'; loadCampaigns()" :class="{ 'activeCol' : filter === 'cancelled' }">
                <div class="textarea">
                    <fa class="fas" :icon="['fas', 'trash']" />
                    <p>Cancelled</p>
                </div>
            </div>
            <div class="selectedOverlay" :style="{ 'left' : selectedPos[0] }"></div>
        </div>
        <!-- Results -->
        <div class="campaignResultsContainer" v-if="campaignsArray.length > 0">
            <div class="campaignRow" :key="campaign._id" v-for="campaign in campaignsArray">
                <img class="campaignRowImg" :src="campaign.track_image" alt="Track Image">
                <div class="dataContainer">
                    <div class="col"><p>{{campaign.track_name}}</p></div>
                    <div class="col"><p>{{campaign.track_artists[0].name}}</p></div>
                    <div class="col"><p>Not set yet</p></div>
                    <div class="col"><p>Not set yet</p></div>
                    <div class="col">
                        <p v-if="campaign.campaign_status === 'pending' && !campaign.campaign_approved">Being reviewed</p>
                        <p v-if="campaign.campaign_status === 'pending' && campaign.campaign_approved">Approved</p>
                        <p v-if="campaign.campaign_status === 'active'">Active</p>
                        <p v-if="campaign.campaign_status === 'complete'">Complete</p>
                        <p v-if="campaign.campaign_status === 'cancelled'">Cancelled</p>
                    </div>
                </div>
                <div class="btnContainer">
                    <!-- If not approved -->
                    <div class="btnInner" v-if="!campaign.campaign_approved" v-on:click="navigateCampaign('edit')">
                        <p>Edit</p>
                    </div>
                    <!-- If approved but still pending -->
                    <div class="btnInner" v-if="campaign.campaign_approved && campaign.campaign_status === 'pending'" v-on:click="navigateCampaign('start')">
                        <p>Start</p>
                    </div>
                    <!-- If is active or complete -->
                    <div class="btnInner" v-if="campaign.campaign_status === 'active' || campaign.campaign_status === 'complete' || campaign.campaign_status === 'cancelled'" v-on:click="navigateCampaign('overview')">
                        <p>Overview</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            filter: 'all',
            selectedPos: ['0','0'],

            skip: 0,
            limit: 10,

            campaignsArray: []
        }
    },
    mounted() {
        this.loadCampaigns()
    },
    methods: {
        loadCampaigns() {
            // Header
            let config = {
                headers: {
                    Authorization: this.$auth.getToken('local')
                }
            }
            axios.post(process.env.API_URL + '/campaigns/list', {
                filter: this.filter,
                skip: this.skip,
                limit: this.limit
            }, config)
            .then((results) => {
                this.campaignsArray = results.data
            })
            .catch((err) => {
                console.log(err)
            })
        },
        navigateCampaign(action) {
            this.$router.push('/campaign/'+action)
        }
    }
}
</script>

<style scoped>
/* Page */
.campaignListContainer {
    margin-top: 30px;
}

/* Filter */
.navigationBarContainer {
    width: 100%;
    height: 40px;
    display: flex;
    background-color: #FFF;
    border: 1px solid #EEF1FC;
    border-radius: 10px;
    position: relative;
    overflow: hidden;
}
.navigationBarContainer .col {
    width: 25%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
.navigationBarContainer .col .textarea {
    display: flex;
    align-items: center;
    z-index: 20;
    position: relative;
}

.navigationBarContainer .col .textarea .fas {
    font-size: 12px;
    color: #E72B51;
    margin-right: 5px;
    transition: 0.3s;
}
.navigationBarContainer .col .textarea p {
    font-size: 14px;
    transition: 0.3s;
}
/* Active style */
.navigationBarContainer .col.activeCol .textarea .fas {
    color: #FFF;
}
.navigationBarContainer .col.activeCol .textarea p {
    color: #FFF;
}
.selectedOverlay {
    width: 20%;
    position: absolute;
    top: 0;
    bottom: 0;
    background-color: #E72B51;
    transition: left 0.3s;
    z-index: 10;
    pointer-events: none;
    border-radius: 10px;
}

/* Results */
.campaignResultsContainer {
    margin-top: 10px;
    background-color: #FFF;
    border: 1px solid #EEF1FC;
    border-radius: 10px;
    overflow: hidden;
}
.campaignRow {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    background-color: #FFF;
    transition: background-color 0.3s;
    cursor: pointer;
}
.campaignRow:nth-child(even) {
    background-color: #FCFCFC;
}
.campaignRow:hover {
    background-color: #F3F3F3;
}
.campaignRowImg {
    width: 40px;
    height: 40px;
    min-width: 40px;
    margin-right: 20px;
    border-radius: 5px;
}
.dataContainer {
    display: flex;
    height: 100%;
    width: calc(100% - 200px);
}
.dataContainer .col {
    width: 20%;
    height: 40px;
    padding: 0 10px;
    display: flex;
    align-items: center;
}
.dataContainer .col p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
}
.btnContainer {
    width: 120px;
    margin-left: 20px;
    background-color: #3DA389;
    border-radius: 20px;
    cursor: pointer;
    transition: 0.3s;
}
.btnContainer:hover {
    background-color: #379079;
}
.btnInner {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.btnInner p {
    color: #FFF;
    font-size: 14px;
}
</style>