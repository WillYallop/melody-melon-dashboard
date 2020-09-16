<template>
    <div class="navigationContainer" :class="{ 'active' : navStatus }">
        <div class="topSquare">
            
        </div>
        <nav class="navBtnContainer">
            <div class="navSection">
                <div class="navBtnWrapper">
                    <nuxt-link to="/" class="navBtn" @click.native="$store.commit('specificNavigationStatus', false)"><fa class="fas" :icon="['fas', 'ad']"/><p class="mobileText">Campaigns</p></nuxt-link>
                </div>
                <div class="navBtnWrapper">
                    <nuxt-link to="/campaign/create" class="navBtn" @click.native="$store.commit('specificNavigationStatus', false)"><fa class="fas" :icon="['fas', 'plus']"/><p class="mobileText">New Campaign</p></nuxt-link>
                </div>
                <div class="navBtnWrapper">
                    <nuxt-link to="/invoices" class="navBtn" @click.native="$store.commit('specificNavigationStatus', false)"><fa class="fas" :icon="['fas', 'file-invoice-dollar']"/><p class="mobileText">Invoices</p></nuxt-link>
                </div>
            </div>
            <div class="navSection" v-if="this.$store.state.auth.loggedIn">
                <div class="navBtnWrapper logOutBtn">
                    <div class="navBtn" v-on:click="signOut(); $store.commit('specificNavigationStatus', false)"><fa class="fas" :icon="['fas', 'sign-out-alt']"/><p class="mobileText">Log Out</p></div>
                </div>
            </div>
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
        signOut() {
            this.$auth.logout().then(() => {
                this.$router.go()
            })
        }
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
    background-color: #202020;
    transition: 0.2s;
    border-right: 1px solid #101010;
    z-index: 1000;
}
.topSquare {
    height: 60px;
    width: 100%;
    background-color: #E72B51;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #202020;
}
.topSquare .fas {
    color: #FFF;
    font-size: 18px;
}
.navBtnContainer {
    height: calc(100% - 60px);
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}
.navSection {
    width: auto;
}
.navBtnWrapper {
    margin-top: 10px;
}
.navBtnWrapper:first-child {
    margin-top: 0;
}
.logOutBtn {
    cursor: pointer;
    margin-top: 10px !important;
}
.navBtn {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    background-color: #111111;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    text-decoration: none;
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

.mobileText {
    display: none;
    margin-left: 20px;
    color: #929292;
}
.navBtn:hover .mobileText {
    color: #FFF;
}
.nuxt-link-exact-active .mobileText {
    color: #FFF;
}
.nuxt-link-exact-active:hover .mobileText {
    color: #FFF;
}

@media only screen and (max-width: 768px) {
    .navigationContainer {width: 300px; left: -300px; top: 60px;}
    .navigationContainer.active {left: 0;}
    .topSquare {display: none;}
    .navBtnContainer {height: 100%;}
    .navBtnWrapper {width: 100%;padding: 0 20px;}
    .navBtn {width: 100%;border-radius: 10px;display: flex;justify-content: flex-start;align-items: center;padding: 0 20px;}
    .mobileText {display: flex;}
    .navSection {width: 100%;}
}
</style>