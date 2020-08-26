<template>
  <div class="pageContainer">
    <div class="horizontalPadding verticalPadding">
      <!-- Header -->
      <dashboardHeader/>

    </div>
  </div>
</template>

<script>
// Components
import dashboardHeader from '@/components/Home/Header'

export default {
  middleware: 'auth-logged-in',
  data() {
    return {

    }
  },
  components: {
    dashboardHeader
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
