<template>
    <div class="navigationContainer" :class="{ 'active' : navStatus }">
        <div class="topSquare">
            <fa class="fas" :icon="['fas', 'moon']" />
        </div>
        <nav class="navBtnContainer">
            <nuxt-link to="/" class="navBtn"><fa class="fas" :icon="['fas', 'ad']" /></nuxt-link>
            <nuxt-link to="/invoices" class="navBtn"><fa class="fas" :icon="['fas', 'file-invoice-dollar']" /></nuxt-link>
            <nuxt-link to="/songs" class="navBtn"><fa class="fas" :icon="['fas', 'headphones']" /></nuxt-link>
            <nuxt-link to="/settings" class="navBtn"><fa class="fas" :icon="['fas', 'cog']" /></nuxt-link>
        </nav>
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
    transition: 0.2s;
    border-right: 1px solid #EEF1FC;
    z-index: 1000;
}
.topSquare {
    height: 60px;
    width: 100%;
    background-color: #E72B51;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
.topSquare .fas {
    color: #FFF;
    font-size: 18px;
}
.navBtnContainer {
    padding: 40px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.navBtn {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    background-color: #F1F1F1;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
}
.navBtn:last-child {
    margin-bottom: 0;
}
.navBtn:hover .fas {
    color: #E72B51;
}
.navBtn .fas {
    color: #929292;
    transition: 0.3s;
}
/* Active btn */
.nuxt-link-exact-active {
    background-color: #E72B51;
}
.nuxt-link-exact-active .fas {
    color: #FFF;
}
.nuxt-link-exact-active:hover .fas {
    color: #FFF;
}

@media only screen and (max-width: 768px) {
    .navigationContainer {width: 300px; left: -300px; top: 60px;}
    .navigationContainer.active {left: 0;}
    .topSquare {display: none;}
}
</style>