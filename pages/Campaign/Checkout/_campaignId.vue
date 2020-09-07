<template>
    <div class="pageContainer" >
        <div class="horizontalPadding verticalPadding">
            <!-- Page Loaded -->
            <div v-if="pageLoaded" class="checkoutContainer">
                {{$route.params.campaignId}}

                <form @submit="purchase">
                    <!-- Inputs -->
                    <input class="StripeElement" type="text" placeholder="Email Address" v-model="email"> 
                    <!-- Stripe -->
                    <div ref="cardElement"></div>
                    <!-- Message -->
                    <p v-if="paymentMessage">{{paymentMessage}}</p>
                    <!-- Button -->
                    <button type="submit">Pay</button>
                </form>
            </div>

            <div v-else class="pageLoadingContainer">
                <p>Loading...</p>
            </div>

        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            // Page Loaded
            pageLoaded: false,
            // Stripe
            stripe: null,
            card: null,
            //Payment Message 
            paymentMessage: false,
            // Responce
            createIntentResponce: null,
            // V-models
            email: null,

        }
    },
    mounted() {
        this.mountCardInput()
    },
    computed: {

    },
    methods: {
        mountCardInput() {
            // axios
            let config = {
                headers: {
                    Authorization: this.$auth.getToken('local')
                }
            }
            axios.post(process.env.API_URL + '/payment/create-payment-intent', {
                campaignId: this.$route.params.campaignId
            }, config)
            .then((res) => {
                
                this.createIntentResponce = this.res.data

                //Assign div stripe checkout input
                this.stripe = Stripe(process.env.stripePublishableApiKey);
                const elements = this.stripe.elements();
                
                this.card = elements.create('card', {
                    style: {
                        base: {
                            iconColor: '#0E1C38',
                            color: '#0F0F0F',
                            fontWeight: 500,
                            fontFamily: 'Lato',
                            fontSize: '16px',
                            fontSmoothing: 'antialiased',
                            ':-webkit-autofill': {
                                color: '#878787',
                            },
                            '::placeholder': {
                                color: '#0F0F0F',
                            },
                        },
                        invalid: {
                            iconColor: '#CA1E1E',
                            color: '#CA1E1E',
                        },
                    },
                });
                this.card.mount(this.$refs.cardElement);

                this.pageLoaded = true
            })
            .catch((err) => {
                console.log(err)
            })


        },
        purchase(event) {
            event.preventDefault()
            this.$nuxt.$loading.start() // Start loading

            // complete
            this.stripe.confirmCardPayment(this.createIntentResponce.clientSecret, {
                receipt_email: this.email,
                payment_method: {
                    card: this.card
                }
            })
            .then((result) => {
                if (result.error) {
                    // Show error to your customer
                    this.showError(result.error.message);
                } else {
                    // The payment succeeded!
                    this.orderComplete(result.paymentIntent.id);
                }
            });
        },
        // Handle error
        showError(errorMessage) {
            this.$nuxt.$loading.finish() // Finish loading

            this.paymentMessage = errorMessage
            setTimeout(() => {
                this.paymentMessage = false
            }, 4000)
        },
        // Handle Success
        orderComplete(paymentIntentId) {
            this.$nuxt.$loading.finish() // Finish loading

            this.paymentMessage = paymentIntentId
        },
    }
}
</script>

<style scoped>
.StripeElement {
    width: 100%;
    border-radius: 5px;
    border: 1px solid #CAD9F6;
    padding: 10px 0 10px 10px;
    background-color: #FFF;
    width: 400px;
}
</style>