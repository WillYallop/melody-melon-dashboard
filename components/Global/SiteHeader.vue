<template>
    <header class="headerContainer" :class="{ 'active' : trackNavStatus }">
        <div class="headerWrapper horizontalPadding">
            <div class="logoSearchContainer">
                <img v-on:click="$router.push('/')" class="siteLogo" src="../../assets/images/logo(light).svg" alt="Melody Melon Logo">
                <trackSearch/>
            </div>

            <div class="buttonContainer">
                <button class="headerBtn toggleNavBtn" v-on:click="$store.commit('toggleNavigation'); $store.commit('specificTrackNavigationStatus', true)"><fa class="fas" :icon="['fas', 'bars']" /></button>
                <button class="headerBtn toggleTrackNavBtn" v-on:click="$store.commit('toggleTrackNavigation'); $store.commit('specificNavigationStatus', false)"><fa class="fas" :icon="['fas', 'music']" /></button>
            </div>
        </div>
    </header>
</template>

<script>
// Components
import trackSearch from '@/components/Global/HeaderTrackSearch'

export default {
    data() {
        return {

        }
    },
    components: {
        trackSearch
    },
    computed: {
        trackNavStatus() {
            return this.$store.state.trackNavigation.status
        }
    },
    methods: {
        toggleTrackNav() {
            
        }
    }
}
</script>

<style scoped>
.headerContainer {
    height: 60px;
    position: fixed;
    top: 0;
    left: 60px;
    right: 0;
    background-color: #202020;
    transition: 0.2s;
    border-bottom: 1px solid #101010;
    z-index: 1000;
}
.headerContainer.active {
    right: 400px;
}

.headerWrapper {
    height: 100%;
    display: flex;
    align-items: center;
}

.logoSearchContainer {
    width: 100%;
    display: flex;
    align-items: center;
}
.siteLogo {
    height: 40px;
}


.buttonContainer {
    display: flex;
}
.headerBtn {
    height: 40px;
    width: 40px;
    min-width: 40px;
    border-radius: 50%;
    background-color: #111111;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}
.headerBtn:first-child {
    margin-right: 10px;
}
.headerBtn:hover .fas {
    color: #E72B51;
}
.headerBtn .fas {
    color: #929292;
    transition: 0.3s;
}
.toggleNavBtn {
    display: none;
}


@media only screen and (max-width: 1100px) {
    .headerContainer.active {right: 0;}
}
@media only screen and (max-width: 768px) {
    .headerContainer {left: 0;}
    .toggleNavBtn {display: flex;}
}
</style>