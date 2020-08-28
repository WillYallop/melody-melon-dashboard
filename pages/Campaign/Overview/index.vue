<template>
    <div class="pageContainer">
        <div class="horizontalPadding verticalPadding">
            <div class="headerTextareaContainer">
                <h1 class="headerP">Campaign Overview</h1>
                <p class="subheaderP">Create a new Spotify track promotion campaign.</p>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    middleware: 'auth-logged-in',
    data() {
        return {

        }
    },
    components: {

    },
    mounted() {

    },
    computed: {

    },
    methods: {

    }
}
</script>

<style scoped>
/* Header */
.headerTextareaContainer {
    margin-bottom: 30px;
}
.headerP {
    font-size: 24px;
}
.subheaderP {
    font-size: 16px;
}

</style>