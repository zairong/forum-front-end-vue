<template>
  <div id="restaurant-forum">
    <NavBar />
    <main role="main" class="mt-5">
      <router-view />
    </main>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/'
import NavBar from '@/components/NavBar'
export default {
  name: 'App',
  components: {
    NavBar,
  }
}
</script>
<style scoped>
  main {
    margin-top: 65px !important;
  }
</style>