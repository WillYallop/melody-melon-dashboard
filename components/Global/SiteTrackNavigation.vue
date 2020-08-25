<template>
    <div class="trackNavigationContainer" :class="{ 'active' : trackNavStatus }">
        <div class="topSquare">

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
    transition: right 0.1s;
}
.trackNavigationContainer.active {
    right: 0;
}
.topSquare {
    height: 60px;
    width: 100%;
    background-color: #E72B51;
}

@media only screen and (max-width: 1100px) {
    .trackNavigationContainer {right: 0; top: 60px; width: 300px;}
    .trackNavigationContainer.active {right: -300px;}
    .topSquare {display: none;}
}
</style>