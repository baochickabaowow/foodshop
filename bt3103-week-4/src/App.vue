<template>
  <div id='app'>
    <h1> yummy food shop </h1>
    <router-view></router-view>
  </div>

</template>

<script>
export default {
  name: 'app',
  components: {
  },
  data: function() {
    return {
    }
  }
}
</script>

<style>
#app {
  text-align: center;
  color:lightcoral;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}


</style>