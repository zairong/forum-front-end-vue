<template>
  <div class="card mb-3">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img v-if="profile.image" :src="profile.image" width="300px" height="300px">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">{{ profile.name }}</h5>
          <p class="card-text">
            root@example.com
          </p>
          <ul class="list-unstyled list-inline">
            <li><strong v-if="profile.Comments">{{ profile.Comments.length }}</strong> 已評論餐廳</li>
            <li><strong v-if="profile.FavoritedRestaurants">{{ profile.FavoritedRestaurants.length }}</strong> 收藏的餐廳
            </li>
            <li><strong v-if="profile.Followings">{{ profile.Followings.length }}</strong> followings (追蹤者)</li>
            <li><strong v-if="profile.Followers">{{ profile.Followers.length }}</strong> followers (追隨者)</li>
          </ul>
          <p>
            <router-link :to="{
              name: 'users-id-edit',
              params: { id: profile.id }
            }">
              <button type="submit" class="btn btn-primary" :disabled="currentUser.id !== profile.id">
                edit
              </button>
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'UserProfileCard',
  props: ['profile'],
  computed: {
    ...mapState('user', ['currentUser'])
  },
  methods: {
    
  }
}
</script>