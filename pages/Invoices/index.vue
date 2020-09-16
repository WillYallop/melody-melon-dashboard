<template>
    <div class="pageContainer">

        <div v-if="pageLoaded">
            <invoiceHeader
            :invoiceArrayLength="invoiceArray.length"/>
            <div class="horizontalPadding verticalPadding">
                <div class="invoiceRow" :key="invoice._id" v-for="invoice in invoiceArray">
                    <div class="textarea">
                        <p><b>PRICE:</b> £{{invoice.invoice_price / 100}}</p>
                        <p><b>PAID:</b> {{returnDate(invoice.date_paid)}}</p>
                    </div>
                    <button class="campaignBtn" v-on:click="$router.push('/campaign/overview/' + invoice.campaign_id)">Campaign</button>
                </div>
            </div>
        </div>

        <div v-else>
            <skeleton/>
        </div>

    </div>
</template>

<script>
import axios from 'axios'

// Components
// Skeleton
import skeleton from '@/components/Global/Skeleton'
// Main
import invoiceHeader from '@/components/Invoices/InvoiceHeader'

export default {
    middleware: 'auth-logged-in',
    data() {
        return {
            pageLoaded: false,
            invoiceArray: []
        }
    },
    mounted() {
        this.loadInvoices()
    },
    components: {
        skeleton,
        invoiceHeader
    },
    methods: {
        loadInvoices() {
            let config = {
                headers: {
                    Authorization: this.$auth.getToken('local')
                }
            }
            axios.get(process.env.API_URL + '/user/invoice', config)
            .then((res) => {
                this.invoiceArray = res.data.data
                this.pageLoaded = true
            })
            .catch((err) => {
                console.log(err)
            })
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

            if(this.$store.state.auth.user.country === 'GB') {
                return dd+'/'+mm+'/'+yyyy;
            } else {
                return mm+'/'+dd+'/'+yyyy;
            }
        },
    }
}
</script>

<style scoped>
.invoiceRow {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #FFF;
    border: 1px solid #DADADA;
    margin-bottom: 5px;
    padding: 10px 20px;
    border-radius: 10px;
} 
.invoiceRow:last-child {
    margin-bottom: 0;
}
.textarea {
    display: flex;
}
.textarea p {
    margin-right: 20px;
}
.campaignBtn {
    padding: 10px 40px;
    background-color: #3DA389;
    border-radius: 20px;
    border: none;
    cursor: pointer;
    transition: 0.3s;
    color: #FFF;
}
.campaignBtn:hover {
    background-color: #358D77;
}

@media only screen and (max-width: 510px) {
    .textarea {flex-direction: column;}
    .textarea p:first-child {margin-top: 5px;}
}
</style>