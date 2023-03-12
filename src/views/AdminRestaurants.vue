<template>
  <main role="main">
    <div class="album py-5 bg-light">
      <div class="container">
        <AdminNav/>
        <br>
        <br>
        <router-link to="/admin/restaurants/create">
          <button type="button" class="btn btn-primary">New Restaurant</button>
        </router-link>
        <br>
        <br>
        <AdminRestaurantsTable/>
      </div>
    </div>
  </main>
</template>

<script>
import AdminNav from '@/components/AdminNav'
import AdminRestaurantsTable from '@/components/AdminRestaurantsTable'
export default {
  name: 'AdminRestaurants',
  components: {
    AdminNav,
    AdminRestaurantsTable
  }
}
</script>