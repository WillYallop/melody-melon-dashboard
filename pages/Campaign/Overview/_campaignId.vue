<template>
    <div class="pageContainer">
        
        <div v-if="pageLoaded">
            <!-- Header -->
            <overviewHeader
            :title="'Campaign Overview ' + '(' + '#' + campaignData.campaign_id + ')'"
            :tracks="campaignData.campaign_tracks.length"
            :status="campaignData.campaign_status"
            :campaignStarts="returnDate(campaignData.start_date)"
            :campaignEnds="returnDate(campaignData.end_date)"
            :pageFilter="pageFilter"
            @filter-updated="filterUpdated"/>
            <!-- Campaign Body -->
            <div class="horizontalPadding verticalPadding">

                <!-- Info Section -->
                <div class="sectionContainer" v-if="pageFilter === 'info'">
                    <!-- Info Header -->
                    <div class="sectionHeader">
                        <h2 class="sectionHeaderP">CAMPAIGN INFO</h2>
                        <div class="line"></div>
                    </div>

                    {{campaignData}}
                </div>
                
                <!-- Track Section -->
                <div class="sectionContainer" v-if="pageFilter === 'tracks'">
                    <!-- Track Header -->
                    <div class="sectionHeader">
                        <h2 class="sectionHeaderP">CAMPAIGN TRACKS</h2>
                        <div class="line"></div>
                    </div>

                    {{campaignData}}
                </div>
            
            </div>
            <!-- campaign not started -->
            <div v-if="notStarted" class="notStartedOverlay">
                <div class="infoContainer">
                    <p>Your promotion campaign has not started yet.</p>
                    <p>Start Date: <b>{{returnDate(campaignData.start_date)}}</b></p>
                    <button class="backBtn" v-on:click="$router.go(-1)">Back</button>
                </div>
            </div>
        </div>

        <div v-else>
            <skeleton/>
        </div>
        
    </div>
</template>

<script>
// Libs
import axios from 'axios'

// Components
// Skeleton
import skeleton from '@/components/Global/Skeleton'
// Campaign Components
import overviewHeader from '@/components/Campaign/Overview/OverviewHeader'

export default {
    middleware: 'auth-logged-in',
    data() {
        return {
            pageLoaded: false,
            pageFilter: 'info',
            campaignData: [],
            notStarted: false,
        }
    },
    components: {
        skeleton,
        overviewHeader

    },
    mounted() {
        this.loadCampaignData()
        
    },
    computed: {

    },
    methods: {
        // mounted
        loadCampaignData() {
            let config = {
                headers: {
                    Authorization: this.$auth.getToken('local')
                }
            }
            axios.get(process.env.API_URL + '/campaigns/'+ this.$route.params.campaignId, config)
            .then((responce) => {
                // If campaign is paid
                if(responce.data.campaign_paid) {
                    this.campaignData = responce.data
                    this.checkData()
                } else {
                    this.$router.push('/')
                }
            })
            .catch((err) => {
                console.log(err)
            })
        },
        checkData() {
            // If promotion hasnt started yet show grey overlay box
            var currentDate = new Date().getTime()
            var campaignStart = new Date(this.campaignData.start_date)
            if(currentDate < campaignStart) {
                this.notStarted = true
            }
            this.pageLoaded = true
        },
        returnDate(date) {
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

            var country = ''

            axios.get("https://ipinfo.io")
            .then((response) => {
                country = response.data.country
            })
            .catch((err) => {
                console.log(err)
            })

            if(country === 'GB') {
                return dd+'/'+mm+'/'+yyyy;
            } else {
                return mm+'/'+dd+'/'+yyyy;
            }
        },
        filterUpdated(value) {
            this.pageFilter = value
        }
    }
}
</script>

<style scoped>
/* Section Header */
.sectionHeader {
    width: 100%;
    position: relative;
    margin: 0 0 20px;
    display: flex;
    justify-content: center;
    text-align: center;
} 
.sectionHeaderP {
    background-color: #F8F8F8;
    z-index: 20;
    position: relative;
    padding: 0 20px;
    font-size: 22px;
} 
.line {
    width: 100%;
    height: 1px;
    background-color: #DADADA;
    position: absolute;
    top: 14px;
    z-index: 10;
}

/* Section */
.sectionContainer {
    width: 100%;
    margin-bottom: 40px;
}
.sectionContainer:last-child {
    margin-bottom: 0;
}

/* Not started overlay */
.notStartedOverlay {
    position: fixed;
    bottom: -56px;
    padding: 0 20px;
    padding-bottom: 56px;
    left: 60px;
    right: 0;
    top: 60px;
    background-color: rgba(75, 75, 75, 0.5);
    transition: 0.2s;
    display: flex;
    align-items: center;
    z-index: 100;
}
.infoContainer {
    background-color: #FFF;
    padding: 20px;
    border-radius: 10px;
    margin: 0 auto;
}
.backBtn {
    background-color: #3DA389;
    border-radius: 20px;
    border: none;
    color: #FFF;
    font-size: 16px;
    transition: 0.3s;
    cursor: pointer;
    padding: 10px 40px;
    margin-top: 20px;
}
.backBtn:hover {
    background-color: #379079;
}

@media only screen and (min-width: 1100.1px) {
    .active .notStartedOverlay {right: 400px;}
}
@media only screen and (max-width: 768px) {
    .notStartedOverlay {left: 0;}
}
</style>