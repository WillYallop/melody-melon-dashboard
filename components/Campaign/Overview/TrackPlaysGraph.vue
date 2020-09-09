<template>
    <div class="trackPlaysGraphCon">
        <div class="graphContainer">
            
        </div>
        <div class="addDataContainer">
            <div class="addDataInner">
                <label for="currentPlays">Current Plays</label>
                <input id="currentPlays" type="text" class="inputStyle">
                <label for="currentDate">Current Date</label>
                <input id="currentDate" type="text" class="inputStyle">
                <button>Add</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    }
}
</script>

<style scoped>
.trackPlaysGraphCon {
    display: flex;
}
.graphContainer {
    width: calc(100% - 350px)
}
.addDataContainer {
    width: 350px;
}
.addDataInner {
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
}
.inputStyle {
    width: 100%;
}
</style>