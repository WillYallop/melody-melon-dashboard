<template>
    <div class="pageContainer">
        <div class="horizontalPadding verticalPadding">

            <div class="sidePadding">
                <div class="formContainer">
                    <h1 class="formHeading">Reset Password</h1>
                    <p class="formSubheading">Please choose a new password to use for your account</p>

                    <input class="inputStyle" type="password" placeholder="Password" v-model="password" autocomplete="no">
                    <input class="inputStyle" type="password" placeholder="Repeat Password" v-model="passwordRepeat" autocomplete="no">

                    <div class="passwordStrengthContainer">
                        <fa class="fas" :icon="['fas', 'unlock-alt']" :class="{ 'strongPas' : verifyPassword == 'strong', 'mediumPas' : verifyPassword == 'medium', 'weakPas' : verifyPassword == 'weak', 'noPas' : verifyPassword == false }"/>
                        <p v-if="verifyPassword">{{verifyPassword}}</p>
                        <p v-else>must be larger than 4 characters</p>
                    </div>
                    
                    <p v-if="msg" class="msgP">{{msg}}</p>

                    <button :disabled="!verifyPassword" v-on:click="resetPassword" class="btnStylised"><span class="underlineSpan"></span>RESET</button>
                </div>
            </div> 

        </div>

        <div class="siteBackground"></div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            token: '',
            password: '',
            passwordRepeat: '',

            //erros
            msg: ''
        }
    },
    mounted() {
        this.token = this.$router.currentRoute.hash.split('#')[1]

    },
    computed: {
        verifyPassword() {
            var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
            var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
            if(this.password.length >= 4) {
                if(strongRegex.test(this.password)) {
                return 'strong'
                } else if (mediumRegex.test(this.password)) {
                return 'medium'
                } else {
                return 'weak'
                }
            } else {
                return false
            }
        }
    },
    methods: {
        resetPassword() {
            // If passwords match carry on
            if(this.password === this.passwordRepeat) {
                this.msg = ''
                let config = {
                    headers: {
                        Authorization: this.$auth.getToken('local'),
                    }
                }
                axios.post(process.env.API_URL + '/user/password-reset', {
                    token: this.token,
                    password: this.password
                }, config)
                .then((responce) => {
                    if(responce.data.message === 'Password reset') {
                        this.msg = "Password successfully reset. You can now log in with your new password."
                    }
                })
                .catch((err) => {
                    console.log(err.response.status)
                    if(err.response.data.message === 'failed') {
                        this.msg = "Password reset failed. Restart process."
                    }
                })
            } else {
                this.msg = "Passwords do not match."
            }
        }
    }
}
</script>

<style scoped>
.pageCoLogOut {
    padding-left: 0;
}

.sidePadding {
    z-index: 20;
    position: relative;
}
.formContainer {
    max-width: 500px;
    background-color: #202020;
    border-radius: 10px;
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 20px auto;

    color: #FFF;
}
.formHeading {
    font-size: 20px;
    margin-bottom: 5px;
    width: 100%;
}
.formSubheading {
    margin-bottom: 20px;
    width: 100%;
}
 
.inputStyle {
    width: 100%;
    border: none;
    border-radius: 5px;
    padding: 0 10px;
    background-color: #111111;
    border: 1px solid #111111;
    height: 40px;
    font-size: 16px;
    color: #FFF;
    margin: 5px 0 10px;
}
.btnStylised {
    padding: 10px 60px;
    background-color: #3DA389;
    cursor: pointer;
    border: none;
    border-radius: 20px;
    font-size: 16px;
    color: #FFF;
    margin-top: 20px;
    margin-bottom: 10px;
    transition: 0.3s;
}
.btnStylised:hover {
    background-color: #358D77;
}
.msgP {
    width: 100%;
    text-align: center;
    margin-bottom: 0 !important;
   
    color: #E72B51;
}

.passwordStrengthContainer {
    width: 100%;
    display: flex;
    text-align: start;
}
.passwordStrengthContainer .fas {
    font-size: 14px;
    margin-right: 10px;
}
.passwordStrengthContainer p {
    width: auto;
    font-size: 14px;
    color: #FFF;
    margin: 0;
}
.strongPas {color: #06D67B !important;} 
.mediumPas {color: #FD9D53 !important;} 
.weakPas {color: #FF2273 !important;} 
.noPas {color: #FF2273 !important;} 


/* Site background */
.siteBackground {
    position: fixed;
    top: 0;
    bottom: -56px;
    left: 0;
    right: 0;
    background: linear-gradient(-45deg, #EE7752, #E72B51);
    background-size: 300% 300%;
    animation: gradient 5s ease infinite;
    z-index: 0;
}
@keyframes gradient {
	0% {	background-position: 0% 50%;}
	50% {background-position: 100% 50%;}
	100% {	background-position: 0% 50%;}
}
</style>