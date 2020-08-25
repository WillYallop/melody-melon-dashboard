<template>
    <header class="headerContainer" :class="{ 'active' : trackNavStatus }">
        <div class="headerWrapper horizontalPadding">

            <button class="headerBtn toggleNavBtn" v-on:click="$store.commit('toggleNavigation'); $store.commit('specificTrackNavigationStatus', true)">+</button>
            <button class="headerBtn toggleTrackNavBtn" v-on:click="$store.commit('toggleTrackNavigation'); $store.commit('specificNavigationStatus', false)">+</button>
        </div>
    </header>
</template>

<script>
export default {
    data() {
        return {

        }
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
    background-color: #FFF;
    transition: 0.1s;
}
.headerContainer.active {
    right: 400px;
}

.headerWrapper {
    display: flex;
    justify-content: flex-end;
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