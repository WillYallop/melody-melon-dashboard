<template>
    <div class="trackSearchContainer">

        <div class="desktopSearchContainer">
            <input type="text" class="searchInput" placeholder="Search track">
        </div>

        <div class="mobileSearchContainer">
            <!-- Mobile Toggle btn -->
            <div  v-on:click="mobileSearchBar = true" class="mobileSearchToggleBtn"><fa class="fas" :icon="['fas', 'search']" /></div>
            <!-- Mobile search header -->
            <div class="mobileSearchHeader horizontalPadding" v-if="mobileSearchBar">
                <input type="text" class="searchInput" placeholder="Search track">
                <button v-on:click="mobileSearchBar = false" class="closeMobileSearch"><fa class="fas" :icon="['fas', 'times']" /></button>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            mobileSearchBar: false,
        }
    },
    methods: {

    }
}
</script>

<style scoped>
.trackSearchContainer {
    width: 100%;
}
/* Desktop */
.desktopSearchContainer {
    width: 100%;
    padding: 0 40px;
}
.searchInput {
    width: 100%;
    height: 35px;
    background-color: #FDFDFD;
    border: 1px solid #EEEEEE;
    border-radius: 5px;
    padding: 0 10px;
    font-size: 16px;
}

/* Mobile */
.mobileSearchContainer {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    pointer-events: none;
    display: none;
}
/* toggle btn */
.mobileSearchToggleBtn {
    position: absolute;
    right: 115px;
    top: 10px;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    background-color: #F7F7F7;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    cursor: pointer;
    pointer-events: all;
}
.mobileSearchToggleBtn:hover .fas {
    color: #E72B51;
}
.mobileSearchToggleBtn .fas {
    color: #929292;
    transition: 0.3s;
}
/* mobile search header */
.mobileSearchHeader {
    width: 100%;
    height: 60px;
    background-color: #FFF;
    position: relative;
    z-index: 20;
    border-bottom: 1px solid #DADADA;
    display: flex;
    align-items: center;
    pointer-events: all;
}
.closeMobileSearch {
    margin-left: 20px;
    height: 40px;
    width: 40px;
    min-width: 40px;
    border-radius: 50%;
    background-color: #F7F7F7;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    cursor: pointer;
}
.closeMobileSearch:hover .fas {
    color: #E72B51;
}
.closeMobileSearch .fas {
    color: #929292;
    transition: 0.3s;
}

@media only screen and (max-width: 768px) {
    .desktopSearchContainer {display: none;}
    .mobileSearchContainer {display: flex;}
}
</style>