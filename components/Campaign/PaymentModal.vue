<template>
    <div class="modalBackground">

        <div class="modalContainer">
            <div class="paymentContainer">
                <div class="paymentHeader">
                    <div class="imageContainer">
                        <img src="../../assets/images/circleLogo.png"/>
                    </div>
                    <button v-on:click="$emit('close-modal')" class="closeModalBtn"><fa class="fas" :icon="['fas', 'times']" /></button>
                    <h4>Melody Melon</h4>
                    <p>Start Campaign</p>
                </div>
                <div class="paymentBody">
                    <form @submit="purchase">
                        <!-- Inputs -->
                        <label>Email</label>
                        <input class="inputStyle" type="text" v-model="email"> 
                        <!-- Stripe -->
                        <label>Card Details</label>
                        <div ref="cardElement"></div>
                        <!-- Message -->
                        <p class="msgP" v-if="paymentMessage">{{paymentMessage}}</p>
                        <!-- Button -->
                        <button class="paymentBtn" :disabled="!pageLoaded" type="submit">Pay <span v-if="createIntentResponce">{{formatPrice(createIntentResponce.campaignData.generated_price)}}</span></button>
                    </form>
                    
                    <div class="paymentLoadingOverlay" v-if="!pageLoaded"></div>
                </div>
            </div>

            <div class="closeModalContainer" v-on:click="$emit('close-modal')"></div>
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
            email: '',
        }
    },
    mounted() {
        this.mountCard()
        this.getCampaign()

    },
    methods: {
        getCampaign() {
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
                this.createIntentResponce = res.data
            })
            .catch((err) => {
                console.log(err)
            })
        },
        mountCard() {
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
        },
        verifyEmail() {
            if(this.email.length > 0) {
                var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                if(regex.test(this.email)) {
                    return true
                } else {
                    return false
                }
            } else {
                return false
            }
        },
        purchase(event) {
            event.preventDefault()
            if(this.verifyEmail()) {
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
                    } else if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
                        // The payment succeeded!
                        this.orderComplete(result.paymentIntent.id);
                    }
                });
            } else {
                this.showError('Make sure to enter a valid Email!')
            }
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
            this.paymentMessage = 'Payment successful! You will be redirected in 3s.'
            setTimeout(() => {
                this.$router.push('/')
            }, 3000)
        },
        formatPrice(price) {
            return '£' + price / 100
        }
    }
}
</script>

<style scoped>
.modalBackground {
    position: fixed;
    top: 60px;
    left: 60px;
    right: 0;
    bottom: -56px;
    padding-bottom: 56px;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 600;
    display: flex;
    justify-content: center;
}
.closeModalContainer {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 10;
    cursor: pointer;
}
.modalContainer {
    width: 100%;
    padding: 70px 20px 20px;
    overflow-y: scroll;
}
/* Hide scrollbar for Chrome, Safari and Opera */
.modalContainer::-webkit-scrollbar {
  display: none;
}
/* Hide scrollbar for IE, Edge and Firefox */
.modalContainer {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
.paymentContainer {
    width: 100%;
    max-width: 350px;
    background-color: #FFF;
    margin: auto;
    border-radius: 10px;
    pointer-events: all;
    z-index: 20;
    position: relative;
}
.paymentHeader {
    background-color: #F3F3F3;
    padding: 60px 20px 10px;
    text-align: center;
    position: relative;
    border-radius: 10px 10px 0 0;
}
.paymentHeader h4 {
    font-size: 18px;
    font-weight: bold;
}
.imageContainer {
    position: absolute;
    height: 80px;
    width: 100%;
    left: 0;
    right: 0;
    top: -30px;
}
.imageContainer img {
    height: 80px;
    width: 80px;
    object-fit: cover;
}
.closeModalBtn {
    position: absolute;
    left: 10px;
    top: 10px;
    height: 30px;
    width: 30px;
    background-color: #C0C0C0;
    border: none;
    border-radius: 50%;
    cursor: pointer;
}
.closeModalBtn .fas {
    color: #FFF;
}

.paymentBody {
    padding: 20px;
    display: flex;
    flex-direction: column;
    position: relative;
} 
.msgP {
    margin-top: 10px;
}
.paymentBody label {
    color: #9B9B9B;
}
.inputStyle {
    width: 100%;
    margin-bottom: 10px;
    height: 40px;
    border-radius: 5px;
    background-color: #FFFFFF;
    border: 1px solid #EEEEEE;
    padding: 0 10px;
    margin-top: 5px;
    font-size: 16px;
} 

.paymentBtn {
    margin-top: 20px;
    width: 100%;
    padding: 10px 40px;
    background-color: #E72B51;
    border: none;
    cursor: pointer;
    color: #FFF;
    border-radius: 20px;
    font-size: 16px;
}

.StripeElement {
    margin-top: 5px;
    width: 100%;
    border-radius: 5px;
    border: 1px solid #EEEEEE;
    padding: 10px 0 10px 10px;
    background-color: #FFF;
    width: 100%;
}
.paymentLoadingOverlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.2);
}

/* Media Queries */
@media only screen and (max-width: 768px) {
    .modalBackground {left: 0;}
}
</style>