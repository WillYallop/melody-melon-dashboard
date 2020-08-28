<template>
  <div class="pageContainer">
    <div class="horizontalPadding verticalPadding">
      <!-- Header -->
      <dashboardHeader/>
      <campaignList/>
    </div>
  </div>
</template>

<script>
// Components
import dashboardHeader from '@/components/Home/Header'
import campaignList from '@/components/Home/CampaignList'

export default {
  middleware: 'auth-logged-in',
  data() {
    return {

    }
  },
  components: {
    dashboardHeader,
    campaignList

  },
  methods: {

  }
}
</script>

<style scoped>

</style>
