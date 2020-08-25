<template>
    <div class="navigationContainer" :class="{ 'active' : navStatus }">
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
        navStatus() {
            return this.$store.state.navigation.status
        }
    },
    methods: {

    }
}
</script>

<style scoped>
.navigationContainer {
    width: 60px;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    background-color: #FFF;
    transition: 0.1s;
}
.topSquare {
    height: 60px;
    width: 100%;
    background-color: #E72B51;
}

@media only screen and (max-width: 768px) {
    .navigationContainer {width: 300px; left: -300px; top: 60px;}
    .navigationContainer.active {left: 0;}
    .topSquare {display: none;}
}
</style>