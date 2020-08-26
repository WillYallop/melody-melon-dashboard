<template>
    <div class="trackNavigationContainer" :class="{ 'active' : trackNavStatus }">
        <div class="topSquare">
            <h2>Track Navigation</h2>
        </div>
        <div v-if="authStatus">
            <p>You are logged in</p>
        </div>
        <div v-else>
            <p>You must login to see your spotify tracks.</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    computed: {
        authStatus() {
            return this.$store.state.auth.loggedIn
        },
        trackNavStatus() {
            return this.$store.state.trackNavigation.status
        }
    },
    methods: {

    }
}
</script>

<style scoped>
.trackNavigationContainer {
    width: 400px;
    position: fixed;
    top: 0;
    bottom: 0;
    right: -400px;
    background-color: #FFF;
    transition: right 0.2s;
    border-left: 1px solid #EEF1FC;
    z-index: 1000;
}
.trackNavigationContainer.active {
    right: 0;
}
.topSquare {
    height: 60px;
    width: 100%;
    background-color: #E72B51;
    display: flex;
    justify-content: center;
    align-items: center;
}
.topSquare h2 {
    color: #FFF;
    font-size: 18px;
    font-weight: bold;
}

@media only screen and (max-width: 1100px) {
    .trackNavigationContainer {right: 0; top: 60px; width: 300px;}
    .trackNavigationContainer.active {right: -300px;}
}
</style>