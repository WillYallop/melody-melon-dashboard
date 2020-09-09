<template>
    <div class="pageHeaderCon">
        <!-- Title Area Row -->
        <div class="titleRow horizontalPadding">
            <h1 class="headerP">{{title}}</h1>
        </div>
        <!-- Info Area Row -->
        <div class="infoRow horizontalPadding">
            <div class="dataCon">
                <p><span class="infoTitle">STATUS:</span> {{status}}</p>
            </div>
            <div class="dataCon">
                <p><span class="infoTitle">TRACKS:</span> {{tracks}}</p>
            </div>
        </div>
        <!-- Navigation Area Row -->
        <div class="navigationRow horizontalPadding">
            <a class="navBtn" v-on:click="filterOpt = 'info'" :class="{ 'activeNavBtn' : filterOpt === 'info' }">Info</a>
            <a class="navBtn" v-on:click="filterOpt = 'tracks'" :class="{ 'activeNavBtn' : filterOpt === 'tracks' }">Tracks</a>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            filterOpt: 'info'
        }
    },
    props: {
        title: String,
        tracks: Number,
        status: String,
        pageFilter: String
    },
    watch: {
        pageFilter() {
            this.filterOpt = this.pageFilter
        },
        filterOpt() {
            this.$emit('filter-updated', this.filterOpt)
        }
    }
}
</script>

<style scoped>
.pageHeaderCon {
    display: flex;
    flex-wrap: wrap;
    background-color: #FFF;
}

/* Title Row */
.titleRow {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #DADADA;
}
.headerP {
    font-size: 24px;
}
/* Desktop btn */
.addCampaignBtn {
    height: 40px;
    color: #FFF;
    font-size: 14px;
    border-radius: 10px;
    border: none;
    padding: 0 60px 0 20px;
    background-color: #3DA389;
    cursor: pointer;
    overflow: hidden;
    position: relative;
}
.buttonIcon {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 40px;
    background-color: #358D77;
    display: flex;
    justify-content: center;
    align-items: center;
}
.buttonIcon .fas {
    color: #FFF;
}
/* mobile btn */
.addCampaignBtnMobile {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    border: none;
    background-color: #3DA389;
    cursor: pointer;
    display: none;
    justify-content: center;
    align-items: center;
}
.addCampaignBtnMobile .fas {
    color: #FFF;
}

/* Info Row */
.infoRow {
    display: flex;
    width: 100%;
    border-bottom: 1px solid #DADADA;
    padding-top: 10px;
    padding-bottom: 10px;
} 
.dataCon {
    margin-right: 20px;
} 
.dataCon:last-child {
    margin-right: none;
}
.dataCon p {
    font-weight: normal;
    color: #0C0C0C;
    font-size: 14px;
} 
.infoTitle {
    font-weight: bold;
    color: #B3B3B3;
}

/* Navigation Row */
.navigationRow {
    display: flex;
    width: 100%;
    border-bottom: 1px solid #DADADA;
}

.navBtn {
    padding: 10px 0;
    margin: 0 10px;
    display: block;
    position: relative;
    font-size: 14px;
    color: #888888;
    font-weight: bold;
    cursor: pointer;
}
.navBtn:first-child {
    margin-left: 0;
}
.navBtn:last-child {
    margin-right: 0;
}
.activeNavBtn {
    color: #0C0C0C;
}
.activeNavBtn::after {
    content: '';
    display: block;
    position: absolute;
    bottom: 0;
    width: 100%;
    left: 0;
    height: 2px;
    background-color: red;
}

/* Media Queries */
@media only screen and (max-width: 768px) {
    /* Title Row */
    .addCampaignBtn {display: none;}
    .addCampaignBtnMobile {display: flex;}
    /* Info Row */
    .infoRow {flex-direction: column;}
    /* Navigation Row */

}
</style>