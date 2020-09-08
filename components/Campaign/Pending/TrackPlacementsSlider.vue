<template>
    <div>
        <div class="sliderContainer">
            <VueSlider ref="slider" v-model="placementPercentage" v-bind="options" :tooltip="'none'" />
            <div class="sliderText">
                <p>min</p>
                <p>max</p>
            </div>
        </div>
    </div>
</template>

<script>
import VueSlider from 'vue-slider-component/dist-css/vue-slider-component.umd.min.js'
import 'vue-slider-component/dist-css/vue-slider-component.css'
// import theme
import 'vue-slider-component/theme/default.css'

export default {
    data() {
        return {
            placementPercentage: 1, 

            //Slider Options
            options: {
                min: 1,
                max: 100,
                dotSize: 20,
                height: 10,
            }
        }
    },
    props: {
        trackIndex: Number,
        placementPercentageOg: Number,
     
    },
    components: {
        VueSlider
    },
    mounted() {
        this.placementPercentage = this.placementPercentageOg
    },
    methods: {

    },
    watch: {
        placementPercentage() {
            this.$emit('update-placement-percentage', this.placementPercentage, this.trackIndex)
        },
        placementPercentageOg() {
            this.placementPercentage = this.placementPercentageOg
        }
    }
}
</script>

<style scoped>
.sliderContainer {
    width: 100%;
}
.sliderText {
    width: 100%;
    display: flex;
    justify-content: space-between;
}
.sliderText p {
    font-size: 12px;
    color: #9E9E9E;
}
</style>


<style>
.vue-slider-mark-label {
    font-size: 10px;
}
.vue-slider-process {
    background-color: #E72B51;
}
.vue-slider-dot-handle-focus {
    box-shadow: none;
    border: 1px solid #0E1C38;
}
.vue-slider-dot-handle {
    box-shadow: none;
    border: 1px solid #0E1C38;
}
.vue-slider-rail {
    background-color: #F1F1F1;
}
</style>