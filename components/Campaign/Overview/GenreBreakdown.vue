<template>
    <div class="genreContainer">
        <div class="genrePill" :key="genre" v-for="genre in genres">
            <p>{{genre}}</p>
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

    },
    props: {
        genres: Array

    },
    methods: {

    }
}
</script>

<style scoped>
.genreContainer {
    margin-bottom: 15px;
    display: flex;
    flex-wrap: wrap;
}
.genrePill {
    padding: 5px 20px;
    border-radius: 20px;
    background-color: #E72B51;
    margin-right: 5px;
    margin-bottom: 5px;
    cursor: default;
}
.genrePill p {
    font-size: 14px;
    color: #FFF;
    text-transform: capitalize;
}
</style>