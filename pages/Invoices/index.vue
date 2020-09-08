<template>
    <div class="pageContainer">
        <div class="horizontalPadding verticalPadding">
            {{invoiceArray}}
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    middleware: 'auth-logged-in',
    data() {
        return {
            invoiceArray: []
        }
    },
    mounted() {
        let config = {
            headers: {
                Authorization: this.$auth.getToken('local')
            }
        }
        axios.get(process.env.API_URL + '/user/invoice', config)
        .then((res) => {
            this.invoiceArray = res.data.data
        })
        .catch((err) => {
            console.log(err)
        })
    }
}
</script>

<style scoped>

</style>