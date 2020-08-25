<template>
  <div>
    <siteHeader/>
    <siteNavigation/>
    <siteTrackNavigation :trackNavigation="trackNavigation"/>
    <Nuxt :class="{ 'active' : trackNavStatus }"/>
  </div>
</template>

<script>
// Components
import siteHeader from '@/components/Global/SiteHeader'
import siteNavigation from '@/components/Global/SiteNavigation'
import siteTrackNavigation from '@/components/Global/SiteTrackNavigation'

export default {
  data() {
    return {
      trackNavigation: true
    }
  },
  components: {
    siteHeader,
    siteNavigation,
    siteTrackNavigation
  },
  computed: {
    trackNavStatus() {
      return this.$store.state.trackNavigation.status
    }
  },
  methods: {

  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;700&display=swap');

html {
  font-family: 'Source Sans Pro', sans-serif;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  background-color: #F6F8FF;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

/* Global */
.pageContainer {
  padding: 60px 0 0 60px;
  width: 100%;
  transition: 0.1s;
}
.pageContainer.active {
  padding: 60px 400px 0 60px;
}
.horizontalPadding {
  padding-left: 40px;
  padding-right: 40px;
}
.verticalPadding {
  padding-top: 40px;
  padding-bottom: 40px;
}

@media only screen and (max-width: 1100px) {
  .pageContainer.active {padding: 60px 0 0 60px;}
  .horizontalPadding {padding-left: 20px; padding-right: 20px;}
  .verticalPadding {padding-top: 20px; padding-bottom: 20px;}
}
@media only screen and (max-width: 768px) {
  .pageContainer {padding: 60px 0 0;}
  .pageContainer.active {padding: 60px 0 0;}
}

</style>
