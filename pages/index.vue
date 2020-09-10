<template>
  <div class="pageContainer">

    <!-- Header -->
    <dashboardHeader
    :campaignLength="campaignLength"
    :filter="filter"
    @filter-updated="filterUpdated"/>
    <!-- Body Content -->
    <div class="horizontalPadding verticalPadding">
      <!-- Campaign Lists -->
      <campaignList
      :filter="filter"
      @campaign-array-length="campaignArrayLength"/>
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
      filter: 'all',
      campaignLength: 0
    }
  },
  components: {
    dashboardHeader,
    campaignList

  },
  methods: {
    filterUpdated(value) {
      this.filter = value
    },
    campaignArrayLength(value) {
      this.campaignLength = value
    }
  }
}
</script>

<style scoped>

</style>
