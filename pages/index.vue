<template>
  <div class="pageContainer">

    <!-- Header -->
    <dashboardHeader
    :filter="filter"
    @filter-updated="filterUpdated"/>
    <!-- Body Content -->
    <div class="horizontalPadding verticalPadding">
      <!-- Campaign Lists -->
      <campaignList
      :filter="filter"/>
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

    }
  },
  components: {
    dashboardHeader,
    campaignList

  },
  methods: {
    filterUpdated(value) {
      this.filter = value
    }
  }
}
</script>

<style scoped>

</style>
