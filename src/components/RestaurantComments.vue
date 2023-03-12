<template>
  <div>
    <h2 class="my-4">
      所有評論：
    </h2>

    <div v-for="comment in restaurantComments" :key="comment.id">
      <blockquote class="blockquote mb-0">
        <button v-if="currentUser.isAdmin" type="button" class="btn btn-danger float-right"
          @click.stop.prevent="deleteComment(comment.id)">
          Delete
        </button>
        <h3>
          <router-link :to="{ name: 'users-id', params: { id: comment.User.id } }">
            {{ comment.User.name }}
          </router-link>
        </h3>
        <p>{{ comment.text }}</p>
        <footer class="blockquote-footer">
          {{ comment.createdAt | fromNow }}
        </footer>
      </blockquote>
      <hr>
    </div>
  </div>
</template>

<script>
import { fromNowFilter } from '@/utils/mixins'
import { mapState } from 'vuex'
import { reqDeleteComment } from '@/apis/comment'
import { Toast } from '@/utils/helpers'

export default {
  name: 'RestaurantComments',
  mixins: [fromNowFilter],
  props: {
    restaurantComments: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapState('user', ['currentUser'])
  },
  methods: {
    async deleteComment(id) {
      try {
        const response = await reqDeleteComment(id)
        // console.log(response.data)
        if (response.status === 'error') {
          throw new Error(response.data.message)
        }
        this.$emit('after-delete-comment', id)
        Toast.fire({
          icon: 'success',
          title: '移除評論成功'
        })
      } catch (error) {
        console.error(error.message)
        Toast.fire({
          icon: 'error',
          title: '無法移除評論，請稍後再試'
        })
      }
    }
  }
}
</script>

<style scoped>
h2.my-4 {
  margin-bottom: 1rem !important;
  font-size: 18px;
}

h3 {
  margin-bottom: 3px;
  line-height: 1.3;
}

.blockquote-footer {
  font-size: 12.5px;
}
</style>