<template>
    <div>
        
        <!-- Sign In Form -->
        <div v-if="pageType === 'signin'">
            <button v-on:click="pageType = 'signup'">Sign Up</button><br><br>

            <label for="signInEmail">Email Address</label><br>
            <input id="signInEmail" type="text" v-model="credentials.email"><br>

            <label for="signInPassword">Password</label><br>
            <input id="signInPassword" type="text" v-model="credentials.password"><br>

            <p v-if="errorMessageSignIn">{{errorMessageSignIn}}</p>
            <button v-on:click="signIn">Sign In</button>
        </div>

        <!-- Sign Up Form -->
        <div v-if="pageType === 'signup'">
            <button v-on:click="pageType = 'signin'">Sign In</button><br><br>
            
            <label for="signUpEmail">Email Address</label><br>
            <input id="signUpEmail" type="text" v-model="signUpDetails.email"><br>

            <label for="signUpPassword">Password</label><br>
            <input id="signUpPassword" type="text" v-model="signUpDetails.password"><br>

            <label for="signUpFName">First Name</label><br>
            <input id="signUpFName" type="text" v-model="signUpDetails.fName"><br>

            <label for="signUpLName">Last Name</label><br>
            <input id="signUpLName" type="text" v-model="signUpDetails.lName"><br>

            <label for="signUpRole">Role</label><br>
            <select id="signUpRole" v-model="signUpDetails.role">
                <option>Artist</option>
                <option>Agent</option>
                <option>Label</option>
                <option>Manager</option>
                <option>Publisher</option>
            </select><br>

            <label for="signUpCountry">Country</label><br>
            <select id="signUpCountry" v-model="signUpDetails.country">
                <option>United Kingdom</option>
                <option>United States</option>
            </select><br>

            <p v-if="errorMessageSignUp">{{errorMessageSignUp}}</p>
            <button v-on:click="signUp">Sign Up</button>
        </div>

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
                role: ''
            },
            errorMessageSignUp: false,

        }
    },
    methods: {
        signIn() {
            this.errorMessageSignIn = false
            try {
                this.$auth.loginWith('local', { 
                    data: this.credentials 
                }).then(() => {
                    this.$router.push('/')
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
        signUp() {
            this.errorMessageSignUp = false
            // API call
            axios.post(process.env.apiBaseUrl + '/user/signup', {
                email: this.signUpDetails.email,
                password: this.signUpDetails.password,
                firstName: this.signUpDetails.fName,
                lastName: this.signUpDetails.lName,
                country: this.signUpDetails.country,
                role: this.signUpDetails.role
            })
            .then(() => {
                //Sign In
                this.$auth.loginWith('local', { 
                    data: this.signUpDetails 
                })
                .then(() => {
                    this.$router.push('/')
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
        }
    }
}
</script>

<style scoped>

</style>
