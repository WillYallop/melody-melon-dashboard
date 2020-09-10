<template>
  <div>
    <!-- Logged in headers and nav -->
    <siteHeader/>
    <siteNavigation/>

    <Nuxt :class="{ 'active' : trackNavStatus }"/>

    <div class="pageOverlay"></div>
  </div>
</template>

<script>
// Components
import siteHeader from '@/components/Global/SiteHeader'
import siteNavigation from '@/components/Global/SiteNavigation'

export default {
  data() {
    return {
      trackNavigation: true
    }
  },
  components: {
    siteHeader,
    siteNavigation

  },
  computed: {
    navStatus() {
      return this.$store.state.navigation.status
    }
  },
  methods: {

  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;700&display=swap');

html {
  -webkit-tap-highlight-color: rgba(0,0,0,0) !important;
  -webkit-tap-highlight-color: transparent !important;
  height: 100%;
}
body {
  font-family: 'Source Sans Pro', sans-serif;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100%;
  background-color: #F8F8F8;
}

#app {
  height: auto;
  min-height: 100%;
}
button {font-family: 'Source Sans Pro', sans-serif;}
button:focus {outline: none;}
input {font-family: 'Source Sans Pro', sans-serif;}
select {font-family: 'Source Sans Pro', sans-serif;}
textarea {font-family: 'Source Sans Pro', sans-serif;}
input:focus {outline: none;}
textarea:focus {outline: none;}
::selection {background-color: #3DA389; color: #FFF;}
img{text-indent:-9999px}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

/* page overlay */
.pageOverlay {
  display: none;
  position: fixed;
  top: 60px;
  bottom: -56px;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 900;
  opacity: 0;
  transition: 0.2s;
  pointer-events: none;
}
.pageOverlay.active {
  opacity: 1;
  pointer-events: all;
}

/* Global */
.pageContainer {
  padding: 60px 0 0 60px;
  width: 100%;
  transition: 0.2s;
}
.pageContainer.active {
  padding: 60px 400px 0 60px;
}
.horizontalPadding {
  padding-left: 20px;
  padding-right: 20px;
}
.verticalPadding {
  padding-top: 20px;
  padding-bottom: 20px;
}

@media only screen and (max-width: 1100px) {
  .pageContainer.active {padding: 60px 0 0 60px;}
  .pageOverlay {display: flex;}
}
@media only screen and (max-width: 768px) {
  .pageContainer {padding: 60px 0 0;}
  .pageContainer.active {padding: 60px 0 0;}
}

</style>
