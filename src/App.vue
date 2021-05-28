<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'App',
  methods: {
    ...mapActions([
      'userTryAutoLogIn'
    ])
  },
  created() {
    this.userTryAutoLogIn().then().catch(() => {
      // if (this.$route.name !== 'Index') {
      //   this.$router.replace({name: 'Index'})
      // }
    })
  }
}
</script>

<style>
  /*@import './assets/css/global.css';*/
  /*@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,400;0,600;1,500&display=swap');*/
  /** {*/
    /*font-family: Arial, Helvetica, sans-serif;*/
    /*font-family: 'Montserrat', sans-serif;*/
    /*font-family: Avenir, Helvetica, Arial, sans-serif;*/
  /*}*/
</style>
