<template>
    <div class="trackPlaysGraphCon">
        <div class="graphContainer">
            <no-ssr>
                <apexChart class="apexChart" type="area" height="250" :options="chartOptions" :series="series"/>
            </no-ssr>
        </div>
        <div class="addDataContainer">
            <div class="addDataInner">
                <div class="inputCon">
                    <label >Current Plays</label>
                    <input type="number" class="inputStyle" v-model="plays">

                    <p>Record your tracks current plays.</p>
                    <p class="errorMsgP" v-if="errorMsg">{{errorMsg}}</p>
                </div>
                <button v-on:click="addTrackPlays" class="addPlaysBtn">Add</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            // Chart Data
            categoryData: [],
            seriesData: [],

            // Add data
            plays: null,
            errorMsg: false,
        }
    },
    props: {
        trackPlays: Array,
        trackId: String

    },
    mounted() {
        this.loadTrackData()
    },
    computed: {
        chartOptions() {
            var obj = {
                chart: {
                    toolbar: {
                        show: false,
                        offsetX: -15,
                        tools: {
                            download: true,
                            selection: true,
                            zoom: false,
                            zoomin: true,
                            zoomout: true,
                            pan: false,
                            reset: true, 
                            customIcons: []
                        },
                    },
                    type: 'area',
                    height: 250,
                    background: '#F8F8F8'
                },
                colors:['#E72B51'],
                dataLabels: {
                    enabled: false,
                },
                stroke: {
                    curve: 'smooth',
            
                },
                xaxis: {
                    categories: this.categoryData,
                    labels: {
                        show: false,
                    },
                    tooltip: {  
                        enabled: false
                    },
                    axisBorder: {
                        show: true,
                    },
                },
                yaxis: {
                    opposite: false,
                    labels: {
                        show: false,
                        style: {
                            colors: ['#FFF','#FFF','#FFF','#FFF','#FFF','#FFF','#FFF','#FFF','#FFF','#FFF'],
                            fontSize: '12px',
                            fontFamily: 'lato, Arial, sans-serif',
                            fontWeight: 400,
                            cssClass: 'apexcharts-yaxis-label',
                        },
                        offsetX: 10,
                    },
                    axisBorder: {
                        show: false,
                    },
                },
                legend: {
                    horizontalAlign: 'left'
                },
                markers: {
                    size: 5,
                    colors: ["#fff"],
                    strokeColors: "#E72B51",
                    strokeWidth: 3,
                    hover: {
                        size: 8,
                    }
                },
                grid: {
                    show: true,
                    borderColor: '#E9E9E9',
                    strokeDashArray: 0,
                    position: 'back',
                    xaxis: {
                        lines: {
                            show: true,
                        }
                    },   
                    yaxis: {
                        lines: {
                            show: true,
                        }
                    },  
                    row: {
                        colors: undefined,
                        opacity: 0.03
                    },  
                    column: {
                        colors: undefined,
                        opacity: 0.5
                    },  
                    padding: {
                        top: 0,
                        right: 20,
                        bottom: 0,
                        left: 10
                    },  
                },
                fill: {
                    type: 'gradient',
                    colors: '#E72B51',
                    gradient: {
                        shade: 'light',
                        type: "vertical",
                        shadeIntensity: 1,
                        gradientToColors: ['#E72B51', '#E72B51'], // optional, if not defined - uses the shades of same color in series
                        opacityFrom: 0.6,
                        opacityTo: 0.4,
                    
                        colorStops: []
                    }
                },
                tooltip: {
                    enabled: true,
                    fillSeriesColor: false
                }
            }
            return obj
        },
        series() {
            var array = [{
                name: 'Track Plays',
                data: this.seriesData
            }]
            return array
        }

    },
    methods: {
        loadTrackData() {
            // Post new value to api
            let config = {
                headers: {
                    Authorization: this.$auth.getToken('local')
                }
            }
            axios.get(process.env.API_URL + '/campaigns/track/plays/' + this.trackId, config)
            .then((response) => {
                if(response.data.tracked_dates && response.data.tracked_plays) {
                    this.categoryData = response.data.tracked_dates
                    this.seriesData = response.data.tracked_plays
                }
            })
            .catch((err) => {
                console.log(err)
            })
        },
        addTrackPlays() {
            // Post new value to api
            if(!isNaN(this.plays) && this.plays > 0) {
                let config = {
                    headers: {
                        Authorization: this.$auth.getToken('local')
                    }
                }
                axios.patch(process.env.API_URL + '/campaigns/track/plays', {
                    trackId: this.trackId,
                    trackDate: this.returnDate(new Date()),
                    trackPlays: this.plays

                }, config)
                .then((response) => {
                    // Add data to graph if successfull
                    this.categoryData.push(this.returnDate(new Date()))
                    this.seriesData.push(this.plays)
                })
                .catch((err) => {
                    console.log(err)
                })
            } else {
                this.errorMsg = 'Enter a valid number.'
            }
        },
        returnDate(date) {
            var today = new Date(date);
            var dd = today.getDate();

            var mm = today.getMonth()+1; 
            var yyyy = today.getFullYear();
            if(dd<10) 
            {
                dd='0'+dd;
            } 

            if(mm<10) 
            {
                mm='0'+mm;
            } 

            if(this.$auth.user.country === 'GB') {
                return dd+'/'+mm+'/'+yyyy;
            } else {
                return mm+'/'+dd+'/'+yyyy;
            }
        },
    },
    watch: {

    }
}
</script>

<style scoped>
.trackPlaysGraphCon {
    display: flex;
    flex-wrap: wrap;
    border-radius: 10px;
    overflow: hidden;
}
.graphContainer {
    width: calc(100% - 350px);
    overflow: hidden;
    background-color: #F8F8F8;
}
.addDataContainer {
    width: 350px;
}
.addDataInner {
    height: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-wrap: wrap;
    background-color: #F3F3F3;
}
.addDataInner label {
    color: #7F7F7F;
    margin-bottom: 5px;
}
.inputStyle {
    width: 100%;
    height: 40px;
    background-color: #FDFDFD;
    border: 1px solid #EEEEEE;
    border-radius: 5px;
    margin-bottom: 10px;
    padding: 0 10px;
}
/* Chrome, Safari, Edge, Opera */
.inputStyle::-webkit-outer-spin-button,
.inputStyle::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
.inputStyle[type=number] {
  -moz-appearance: textfield;
}
.addPlaysBtn {
    background-color: #3DA389;
    padding: 10px 40px;
    border-radius: 20px;
    border: none;
    color: #FFF;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 20px;
}
.addPlaysBtn:hover {
    background-color: #358D77;
}
.errorMsgP {
    color: #E72B51;
    margin-top: 10px;
}

@media only screen and (max-width: 850px) {
    .graphContainer {width: 100%;}
    .addDataContainer {width: 100%;}
}
</style>