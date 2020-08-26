<template>
    <div class="pageHeaderCon">
        <div class="textarea">
            <h1 class="headerP">Campaigns</h1>
            <p class="subheaderP">Your campaigns</p>
        </div>
        <div class="rightSide">
            <button class="addCampaignBtn" v-on:click="$router.push('/campaign/new')">New Campaign<span class="buttonIcon"><fa class="fas" :icon="['fas', 'plus']" /></span></button>
            <button class="addCampaignBtnMobile" v-on:click="$router.push('/campaign/new')"><fa class="fas" :icon="['fas', 'plus']" /></button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    }
}
</script>

<style scoped>
.pageHeaderCon {
    display: flex;
    justify-content: space-between;
}
/* textarea */
.headerP {
    font-size: 24px;
}
.subheaderP {
    font-size: 16px;
}
/* Right side */
.rightSide {

}
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


@media only screen and (max-width: 768px) {
    .addCampaignBtn {display: none;}
    .addCampaignBtnMobile {display: flex;}
}
</style>