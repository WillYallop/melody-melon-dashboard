<template>
    <div>
        <div class="genreContainer">
            <!-- Available Genres -->
            <div class="col">
                <div class="genreOptionsCon">

                    <div class="genreRow" :key="genre.genre" v-for="genre in playlistGenres">
                        <p class="genreNameP">{{genre}}</p>
                        <button class="addGenreBtn" v-on:click="$emit('add-genre', genre)">Add</button>
                    </div>
                    
                </div>
            </div>
            <!-- Selected Genres -->
            <div class="col">
                <div class="genreSelectedCon">

                    <div class="genreRow" :key="genre.genre" v-for="genre in selectedGenres">
                        <p class="genreNameP">{{genre}}</p>
                        <button class="addGenreBtn removeBtn" v-on:click="$emit('remove-genre', genre)">Remove</button>
                    </div>

                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
     
        }
    },
    props: {
        playlistGenres: Array,
        selectedGenres: Array
    },
    methods: {

    }
}
</script>

<style scoped>
.genreContainer {
    display: flex;
    justify-content: space-between;

}
.genreContainer .col {
    width: calc(50% - 5px);
}
.colHeader {
    height: 35px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
}
.colHeader p {
    font-weight: bold;
}
.genreSearchInput {
    width: 100%;
    background-color: #F7F7F7;
    border: 1px solid #EBEBEB;
    border-radius: 5px;
    padding: 0 10px;
    font-size: 16px;
    height: 35px;
}
/* Genre Options */
.genreOptionsCon {
    width: 100%;
    height: 185px;
    overflow-y: scroll;
    background-color: #F7F7F7;
    border: 1px solid #EBEBEB;
    border-radius: 5px;
}
.genreRow {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 20px;
    background-color: #F7F7F7;
} 
.genreRow:nth-child(even) {
    background-color: #F1F1F1;
}
.genreNameP {
    font-size: 14px;
    text-transform: capitalize;
} 
.addGenreBtn {
    padding: 5px 20px;
    background-color: #3DA389;
    border-radius: 20px;
    border: none;
    color: #FFF;
    cursor: pointer;
    transition: 0.3s;
}
.addGenreBtn:hover {
    background-color: #379079;
}
.removeBtn {
    background-color: #E72B51;
}
.removeBtn:hover {
    background-color: #D52448;
}
/* Genre Selected */
.genreSelectedCon {
    width: 100%;
    height: 185px;
    overflow-y: scroll;
    background-color: #F7F7F7;
    border: 1px solid #EBEBEB;
    border-radius: 5px;
}

@media only screen and (max-width: 600px) {
    .genreContainer {flex-wrap: wrap;}
    .genreContainer .col {width: 100%;}
    .genreContainer .col:first-child {margin-bottom: 10px;}
}
</style>