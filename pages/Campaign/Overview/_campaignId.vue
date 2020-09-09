<template>
    <div class="pageContainer">
        <div class="horizontalPadding verticalPadding">

            <p>{{campaignData}}</p>

            <div v-if="notStarted" class="notStartedOverlay">
                <div class="infoContainer">
                    <p>Your promotion campaign has not started yet.</p>
                    <p>Start Date: <b>{{returnDate(campaignData.start_date)}}</b></p>
                    <button class="backBtn" v-on:click="$router.go(-1)">Back</button>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
// Libs
import axios from 'axios'

export default {
    middleware: 'auth-logged-in',
    data() {
        return {
            campaignData: [],
            notStarted: false,
        }
    },
    components: {

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
        }

    }
}
</script>

<style scoped>
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