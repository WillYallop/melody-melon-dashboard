<template>
    <header class="headerContainer">
        <div class="headerWrapper horizontalPadding">
            <div class="logoSearchContainer">
                <img v-on:click="$router.push('/')" class="siteLogo" src="../../assets/images/logo(light).svg" alt="Melody Melon Logo">
                
            </div>

            <div class="buttonContainer">
                <button class="headerBtn toggleNavBtn" v-on:click="$store.commit('toggleNavigation')"><fa class="fas" :icon="['fas', 'bars']" /></button>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    components: {
       
    },
    computed: {

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
    cursor: pointer;
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