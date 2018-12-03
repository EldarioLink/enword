<template>
  <v-app>
    <appheader></appheader>
  
    <v-content>
      <router-view/>
    </v-content>
    <appfooter></appfooter>
  </v-app>
</template>

<script>
  import appheader from './components/AppHeader.vue'
  import Appfooter from './components/AppFooter.vue'
  
  
  export default {
    components: {
      appheader,
      Appfooter
    }
  }
</script>

<style>
  
</style>
