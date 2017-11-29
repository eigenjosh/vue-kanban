<template>
  <div id="app">
    <form @submit.prevent="login">
      <input type="text" placeholder="Email" v-model="user.email">
      <input type="text" placeholder="Password" v-model="user.password">
      <button type="submit">Login</button>
    </form>

    </form>
    <error></error>
    <router-view></router-view>
  </div>
</template>

<script>
  import Error from './components/Error'
  export default {
    name: 'app',
    data() {
      return {
        user: {}
      }
    },
    
    mounted() {
      //dispatch authenticate
    },

    components: {
      Error
    },

    methods: {
      login() {
        console.log(this.user)
        this.$store.dispatch('login', this.user)
      }

    },

    computed: {

    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>