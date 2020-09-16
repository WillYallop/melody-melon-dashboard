<template>
    <div class="campaignListContainer">

        <!-- Results -->
        <div class="campaignResultsContainer" v-if="campaignsArray.length > 0 && loaded">
            <!-- Campaign Header -->
            <div class="tableHeader"> 
                <div class="imageWidth"></div>
                <div class="dataContainer">
                    <div class="col col1"><p>ID:</p></div>
                    <div class="col col2"><p>Tracks:</p></div>
                    <div class="col col3"><p>Start Date:</p></div>
                    <div class="col col4"><p>End Date:</p></div>
                    <div class="col col5"><p>Status:</p></div>
                </div>
                <div class="btnContainerWidth">
                </div>
            </div>
            <!-- campaign row -->
            <div class="campaignRow" :key="campaign._id" v-for="campaign in campaignsArray">
                <img class="campaignRowImg" :src="campaign.campaign_image" alt="Track Image">
                <div class="dataContainer">
                    <div class="col col1"><p>{{campaign.campaign_id}}</p></div>
                    <div class="col col2"><p>{{campaign.campaign_tracks_total}}</p></div>
                    <div class="col col3"><p v-if="campaign.start_date">{{formatDate(campaign.start_date)}}</p><p v-else>Not set yet</p></div>
                    <div class="col col4"><p v-if="campaign.end_date">{{formatDate(campaign.end_date)}}</p><p v-else>Not set yet</p></div>
                    <div class="col col5">
                        <p v-if="campaign.campaign_status === 'pending' && !campaign.campaign_approved">Being reviewed</p>
                        <p v-if="campaign.campaign_status === 'pending' && campaign.campaign_approved && !campaign.campaign_paid">Approved</p>
                        <p v-if="campaign.campaign_status === 'pending' && campaign.campaign_approved && campaign.campaign_paid">Starts Soon</p>
                        <p v-if="campaign.campaign_status === 'active'">Active</p>
                        <p v-if="campaign.campaign_status === 'complete'">Complete</p>
                        <p v-if="campaign.campaign_status === 'cancelled'">Cancelled</p>
                    </div>
                </div>
                <div class="btnContainer">
                    <!-- If not approved -->
                    <div class="btnInner" v-if="!campaign.campaign_approved" v-on:click="navigateCampaign('edit', campaign._id)">
                        <p class="btnText">Edit</p>
                        <fa class="btnIcon" :icon="['fas', 'pen']" />
                    </div>
                    <!-- If approved but still pending -->
                    <div class="btnInner" v-if="campaign.campaign_approved && campaign.campaign_status === 'pending' && !campaign.campaign_paid" v-on:click="navigateCampaign('start', campaign._id)">
                        <p class="btnText">Start</p>
                        <fa class="btnIcon" :icon="['fas', 'play']" />
                    </div>
                    <!-- If is active or complete -->
                    <div class="btnInner" v-if="campaign.campaign_status === 'active' || campaign.campaign_status === 'complete' || campaign.campaign_status === 'cancelled' || campaign.campaign_paid" v-on:click="navigateCampaign('overview', campaign._id)">
                        <p class="btnText">Overview</p>
                        <fa class="btnIcon" :icon="['fas', 'search']" />
                    </div>
                </div>
            </div>
        </div>

        <!-- No Results -->
        <div v-else-if="campaignsArray.length === 0 && loaded">
            <p>No data</p>
        </div>

        <!-- Loading -->
        <div v-else class="skeletonContainer">
            <div class="skeletonRow">
                <skeletonCustomSize/>
            </div>
            <div class="skeletonRow">
                <skeletonCustomSize/>
            </div>
            <div class="skeletonRow">
                <skeletonCustomSize/>
            </div>
            <div class="skeletonRow">
                <skeletonCustomSize/>
            </div>
            <div class="skeletonRow">
                <skeletonCustomSize/>
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios'

// Components
import skeletonCustomSize from '@/components/Global/SkeletonCustomSize'

export default {
    data() {
        return {
            loaded: false,

            selectedPos: ['0','0'],

            skip: 0,
            limit: 10,

            campaignsArray: [],

            country: ''
        }
    },
    props: {
        filter: String

    },
    components: {
        skeletonCustomSize
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
                this.loaded = true
                this.$emit('campaign-array-length', this.campaignsArray.length)
            })
            .catch((err) => {
                console.log(err)
            })
        },
        navigateCampaign(action, id) {
            this.$router.push('/campaign/'+action+'/'+id)
        },
        formatDate(date) {
            var today = new Date(date);
            var dd = today.getDate();

            var mm = today.getMonth()+1; 
            var yyyy = today.getFullYear();
            if(dd<10) 
            {
                dd='0'+dd;
            } 

            if(mm<10) 
            {
                mm='0'+mm;
            } 

            if(this.$auth.user.country === 'GB') {
                return dd+'/'+mm+'/'+yyyy;
            } else {
                return mm+'/'+dd+'/'+yyyy;
            }
        }
    },
    watch: {
        filter() {
            this.loaded = false
            this.loadCampaigns()
        }
    }
}
</script>

<style scoped>
/* Results */
.campaignResultsContainer {
    background-color: #FFF;
    border: 1px solid #DADADA;
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
    border-bottom: 1px solid #EFEFEF;
}
.campaignRow:last-child {
  border-bottom: none;
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
    transition: background-color 0.3s;
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
.btnText {
    color: #FFF;
    font-size: 14px;
}
.btnIcon {
    display: none;
    color: #FFF;
    font-size: 10px;
}

/* Table header */
.tableHeader {
    width: 100%;
    display: flex;
    padding: 0 10px;
    border-bottom: 1px solid #EFEFEF;
} 
.tableHeader p {
    font-weight: bold;
}
.imageWidth {
    width: 60px;
    min-width: 60px;
}
.btnContainerWidth {
    width: 140px;
    min-width: 140px;
}

/* Skeleton */
.skeletonContainer {
    width: 100%;

} 
.skeletonRow {
    width: 100%;
    height: 60px;
    margin-bottom: 10px;
    border-radius: 10px;
    overflow: hidden;
}

.col1 {min-width: 48px;}
.col2 {min-width: 65px;}
.col3 {min-width: 87px;}
.col4 {min-width: 86px;}
.col5 {min-width: 106px;}

/* Media Queries */
@media only screen and (max-width: 870px) {
    .dataContainer .col {width: 25%;}
    .col2 {display: none !important;}
}
@media only screen and (max-width: 715px) {
    .dataContainer .col {width: 33.33%;}
    .col4 {display: none !important;}
}
@media only screen and (max-width: 595px) {
    .dataContainer {width: calc(100% - 120px);}
    .btnContainer {width: 40px;}
    .btnContainerWidth {width: 40px; min-width: 40px;}
    .dataContainer .col {padding: 0;}
    .btnText {display: none;}
    .btnIcon {display: flex;}
}
@media only screen and (max-width: 460px) {
    .dataContainer .col {width: auto;}
}
@media only screen and (max-width: 404px) {
    .col3 {display: none !important;}
}
</style>