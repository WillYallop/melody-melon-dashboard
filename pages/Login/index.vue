<template>
    <div class="pageContainer">
        <div class="horizontalPadding verticalPadding">
            <div class="logInPageContainer">

                <!-- Page Nav -->
                <div class="formNavigation">
                    <div class="col" v-on:click="pageType = 'signin'" :class="{ 'activeCol' : pageType === 'signin' }">
                        <p>Log In</p>
                    </div>
                    <div class="col" v-on:click="pageType = 'signup'" :class="{ 'activeCol' : pageType === 'signup' }">
                        <p>Register</p>
                    </div>
                </div>

                <!-- Sign In Form -->
                <div class="formContainer" v-if="pageType === 'signin'">
                    <div class="formBody">
                        <label for="signInEmail">Email Address</label>
                        <input class="inputStyle" id="signInEmail" type="text" v-model="credentials.email">

                        <label for="signInPassword">Password</label>
                        <input class="inputStyle" id="signInPassword" type="password" v-model="credentials.password">

                        <p class="signInError" v-if="errorMessageSignIn">{{errorMessageSignIn}}</p>
                        <div>
                            <button class="signInBtn" v-on:click="signIn">Log In</button>
                        </div>
                        
                        <a class="forgotPassP">forgot password</a>
                    </div>
                    <div class="legalLinksContainer">
                        <nuxt-link to="/terms-conditions">Terms & Conditions</nuxt-link>
                    </div>
                </div>

                <!-- Sign Up Form -->
                <div class="formContainer" v-if="pageType === 'signup'">        
                    <div class="formBody">     
                        <h4 class="sectionTitle">User Details</h4>
                        <label for="signUpFName">First Name *</label>
                        <input class="inputStyle" id="signUpFName" type="text" v-model="signUpDetails.fName" :class="{ 'incorrectData' : verifyFirstName === false, 'missingField' : fNameError }">
                        <label for="signUpLName">Last Name *</label>
                        <input class="inputStyle" id="signUpLName" type="text" v-model="signUpDetails.lName" :class="{ 'incorrectData' : verifyLastName === false, 'missingField' : lNameError }">
                        <label for="signUpRole">Role *</label>
                        <select class="inputStyle" id="signUpRole" v-model="signUpDetails.role" :class="{ 'incorrectData' : verifyRole === false, 'missingField' : roleError }">
                            <option>Artist</option>
                            <option>Agent</option>
                            <option>Label</option>
                            <option>Manager</option>
                            <option>Publisher</option>
                        </select>
                        <h4 class="sectionTitle">Account Details</h4>
                        <label for="signUpEmail">Email Address</label>
                        <input class="inputStyle" id="signUpEmail" type="text" autocomplete="off" v-model="signUpDetails.email" :class="{ 'incorrectData' : verifyEmail === false, 'missingField' : emailError }">
                        <label for="signUpPassword">Password</label>
                        <div class="passowrdInputContainer">
                            <input class="inputStyle" id="signUpPassword" type="password" autocomplete="off" v-model="signUpDetails.password" :class="{ 'missingField' : passwordError  }">
                            <div class="inputOverlay">
                                <fa class="fas" :icon="['fas', 'unlock-alt']" :class="{ 'strongPas' : verifyPassword == 'strong', 'mediumPas' : verifyPassword == 'medium', 'weakPas' : verifyPassword == 'weak', 'noPas' : verifyPassword == false }"/>
                            </div>

                            <p>Passowrd must be at least 8 characters long and include an upper case, lower case and number.</p>
                        </div>

                        <p class="errorMsg"  v-if="errorMessageSignUp">{{errorMessageSignUp}}</p>
                    </div>

                    <div class="checkBoxContainer">
                        <p>By clicking the boxes you agree to the following:</p>
                        <label for="termsCheck">
                            <input class="checkboxInputStyle" type="checkbox" id="termsCheck" v-model="signUpDetails.termsConCheck">
                            <p>Terms & Conditions</p>
                        </label>
                        <label for="newsletterCheck">
                            <input class="checkboxInputStyle" type="checkbox" id="newsletterCheck" v-model="signUpDetails.newsletterCheck">
                            <p>Recieve promotional newsletters</p>
                        </label>
                    </div>
                    <button class="registerBtn" v-on:click="signUp">Register</button>
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
            pageType: 'signin',

            // For sign in
            credentials: {
                email: '',
                password: ''
            },
            errorMessageSignIn: false,
            // For sign up
            signUpDetails: {
                email: '',
                password: '',
                fName: '',
                lName: '',
                country: '',
                role: '',
                termsConCheck: false,
                newsletterCheck: false,
                ip: '',
                city: ''
            },
            errorMessageSignUp: false,
            dataComplete: [ false, false, false, false, false ],

            //Missing fields
            fNameError: false,
            lNameError: false,
            roleError: false,
            emailError: false,
            passwordError: false

        }
    },
    mounted() {

    },
    computed: {
        verifyFirstName() {
            if(this.signUpDetails.fName.length > 0) {
                var regex = /^[a-zA-Z]+(?:-[a-zA-Z]+)*$/
                if(regex.test(this.signUpDetails.fName)) {
                    this.dataComplete[0] = true
                    return true
                } else {
                    this.dataComplete[0] = false
                    return false
                }
            } else {
                this.dataComplete[0] = false
                return false
            }
        },
        verifyLastName() {
            if(this.signUpDetails.lName.length > 0) {
                var regex = /^[a-zA-Z]+(?:-[a-zA-Z]+)*$/
                if(regex.test(this.signUpDetails.lName)) {
                    this.dataComplete[1] = true
                    return true
                } else {
                    this.dataComplete[1] = false
                    return false
                }
            } else {
                this.dataComplete[1] = false
                return false
            }
        },
        verifyRole() {
            if(this.signUpDetails.role === 'Artist') {
                this.dataComplete[2] = true
                return true
            } else if (this.signUpDetails.role === 'Agent') {
                this.dataComplete[2] = true
                return true
            } else if (this.signUpDetails.role === 'Label') {
                this.dataComplete[2] = true
                return true
            } else if (this.signUpDetails.role === 'Manager') {
                this.dataComplete[2] = true
                return true
            } else if (this.signUpDetails.role === 'Publisher') {
                this.dataComplete[2] = true
                return true
            } else {
                this.dataComplete[2] = false
                return false
            }
        },
        verifyEmail() {
            if(this.signUpDetails.email.length > 0) {
                var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                if(regex.test(this.signUpDetails.email)) {
                    this.dataComplete[3] = true
                    return true
                } else {
                    this.dataComplete[3] = false
                    return false
                }
            } else {
                this.dataComplete[3] = false
                return false
            }
        },
        verifyPassword() {
            var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
            var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})");
            if(this.signUpDetails.password.length >= 4) {
                if(strongRegex.test(this.signUpDetails.password)) {
                    this.dataComplete[4] = true
                    return 'strong'
                } else if (mediumRegex.test(this.signUpDetails.password)) {
                    this.dataComplete[4] = true
                    return 'medium'
                } else {
                    this.dataComplete[4] = false
                    return 'weak'
                }
            } else {
                this.dataComplete[4] = false
                return false
            }
        }

    },
    methods: {
        signIn() {
            this.errorMessageSignIn = false
            try {
                this.$auth.loginWith('local', { 
                    data: this.credentials 
                }).then(() => {
                    if(this.$router.currentRoute.query.action === 'createcampaign') {
                        this.$router.push('/campaign/create')
                    } else {
                        this.$router.push('/')
                    }
                })
                .catch((err) => {
                if(err.response.status == 401) {
                    this.errorMessageSignIn = 'Sign in attempt failed!'
                }
                if(err.response.status == 500) {
                    this.errorMessageSignIn = 'Sign in attempt failed!'
                }
                })
            } catch(err) {
                console.log(err)
            }
        },
        // Sign up
        verifyData() {
            let checker = arr => arr.every(Boolean);
            if(checker(this.dataComplete)) {
                return true
            } else {
                return false
            }
        },
        signUp() {
            if(this.signUpDetails.termsConCheck) {
                if(this.verifyData()) {
                    //Reset errors
                    this.passwordError = false
                    this.emailError = false
                    this.roleError = false
                    this.lNameError = false
                    this.fNameError = false

                    this.errorMessageSignUp = false
                    // API call
                    axios.post(process.env.API_URL + '/user/signup', {
                        email: this.signUpDetails.email,
                        password: this.signUpDetails.password,
                        firstName: this.signUpDetails.fName,
                        lastName: this.signUpDetails.lName,
                        country: this.signUpDetails.country,
                        ip: this.signUpDetails.ip,
                        city: this.signUpDetails.city,
                        role: this.signUpDetails.role,
                        newsletter: this.signUpDetails.newsletterCheck
                    })
                    .then(() => {
                        //Sign In
                        this.$auth.loginWith('local', { 
                            data: this.signUpDetails 
                        })
                        .then(() => {
                            if(this.$router.currentRoute.query.action === 'createcampaign') {
                                this.$router.push('/campaign/create')
                            } else {
                                this.$router.push('/')
                            }
                        })
                    })
                    .catch((err) => {
                        if(err.response.status == 409) {
                            this.errorMessageSignUp = 'A user with that email already exists'
                        }
                        if(err.response.status == 500) {
                            this.errorMessageSignUp = 'There was an unknown error'
                        }
                    })
                } else {
                    if(this.dataComplete[0] === false) {
                        this.fNameError = true
                    } else {this.fNameError = false}
                    if(this.dataComplete[1] === false) {
                        this.lNameError = true
                    } else {this.lNameError = false}
                    if(this.dataComplete[2] === false) {
                        this.roleError = true
                    } else {this.roleError = false}
                    if(this.dataComplete[3] === false) {
                        this.emailError = true
                    } else {this.emailError = false}
                    if(this.dataComplete[4] === false) {
                        this.passwordError = true
                    } else {this.passwordError = false}
                    this.errorMessageSignUp = 'Make sure to fill in the missing fields';
                }
            } else {
                this.errorMessageSignUp = 'Make sure to accept the terms & conditions.'
            }

        }
    },
    watch: {
        pageType() {
            if(this.pageType === 'signup') {
                axios.get('https://ipinfo.io')
                .then((response) => {
                    this.signUpDetails.ip = response.data.ip
                    this.signUpDetails.country = response.data.country
                    this.signUpDetails.city = response.data.city
                })
                .catch((err) => {
                    console.log(err)
                })
            }
        }
    }
}
</script>

<style scoped>
.logInPageContainer {
    width: 100%;
    z-index: 10;
    position: relative;
    display: flex;
    flex-direction: column;
}
/* Nav */
.formNavigation {
    width: 100%;
    max-width: 500px;
    display: flex;
    border-radius: 10px;
    overflow: hidden;
    margin: 0 auto 10px;
}
.formNavigation .col {
    width: 50%;
    background-color: #333333;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
.formNavigation .col p {
    color: #888888;
}
.formNavigation .col.activeCol {
    background-color: #202020;
}
.formNavigation .col.activeCol p {
    color: #FFF;
}
/* Form */
.formContainer {
    width: 100%;
    max-width: 500px;
    background-color: #202020;
    border-radius: 10px;
    overflow: hidden;
    margin: 0 auto;
}
.formBody {
    padding: 30px;
    display: flex;
    align-items: center;
    flex-direction: column;
}
.formBody label {
    width: 100%;
    color: #9B9B9B;
    font-size: 14px;
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
.missingField {
    border: 1px solid #E72B51;
}
.incorrectData:focus {
    border: 1px solid #E72B51;
}
/* Password Input */
.passowrdInputContainer {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
}
.passowrdInputContainer p {
    color: #FFF;
}
.passowrdInputContainer .inputStyle {
    width: calc(100% - 40px);
    border-radius: 5px 0 0 5px;
}
.inputOverlay {
    margin-top: 5px;
    height: 40px;
    width: 40px;
    background-color: #090909;
    border-radius: 0 5px 5px 0;
    display: flex;
    justify-content: center;
    align-items: center;
}
.strongPas {color: #06D67B !important;} 
.mediumPas {color: #FD9D53 !important;} 
.weakPas {color: #FD535D !important;} 
.noPas {color: #FD535D !important;} 

.signInError {
    margin-top: 10px;
    color: #E72B51;
}
.signInBtn {
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
.signInBtn:hover {
    background-color: #358D77;
}
.forgotPassP {
    font-size: 14px;
    color: #969696;
    cursor: pointer;
}
.forgotPassP:hover {
    color: #E72B51;
}
/* Legal Links */
.legalLinksContainer {
    background-color: #111111;
    padding: 10px 20px;
    width: 100%;
    display: flex;
    justify-content: center;
}
.legalLinksContainer a {
    color: #969696;
    text-align: center;
    font-size: 14px;
    text-decoration: none;
}
.legalLinksContainer a:hover {
    color: #E72B51;
}
/* Sign up */
.sectionTitle {
    width: 100%;
    font-size: 16px;
    font-weight: bold;
    color: #FFF;
    margin-bottom: 15px;
    margin-top: 5px;
    padding-top: 15px;
    border-top: 1px solid #313131;
}
.sectionTitle:first-child {
    border-top: none;
    margin-top: 0;
    padding-top: 0;
}
.errorMsg {
    width: 100%;
    color: #E72B51;
    margin-top: 20px;
}
.registerBtn {
    width: 100%;
    padding: 10px 60px;
    background-color: #3DA389;
    cursor: pointer;
    border: none;
    font-size: 16px;
    color: #FFF;
    transition: 0.3s;
}
.registerBtn:hover {
    background-color: #358D77;
}

/* Checkboxes */
.checkBoxContainer {
    width: 100%;
    background-color: #111111;
    padding: 20px 30px;
    display: flex;
    flex-direction: column;
}
.checkBoxContainer p {
    color: #FFF;
    margin-bottom: 10px;
}
.checkBoxContainer label {
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    cursor: pointer;
}
.checkBoxContainer label:last-child {
    margin-bottom: 0;
}
.checkBoxContainer label p {
    color: #9B9B9B;
    font-size: 16px;
    margin: 0;
    margin-left: 5px;
}
.checkboxInputStyle {

}

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
