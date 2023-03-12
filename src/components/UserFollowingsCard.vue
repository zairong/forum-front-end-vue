<template>
  <div class="card">
    <div class="card-header">
      <strong v-if="profile.Followings">{{ Followings.length }}</strong> followings (追蹤者)
    </div>
    <div class="card-body">
      <router-link v-for="following in profile.Followings" :key="following.id"
        :to="{ name: 'user', params: { id: following.id } }">
        <img :src="following.image | emptyImage" width="60" height="60" class="mr-1">
      </router-link>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from '@/utils/mixins'

export default {
  name: 'UserFollowingsCard'
  ,
  props: ['profile']
  ,
  mixins: [emptyImageFilter]
  ,
  computed: {
    Followings(){
      const {Followings} =this.profile
      return Followings
    }
  }
  ,


}
</script>