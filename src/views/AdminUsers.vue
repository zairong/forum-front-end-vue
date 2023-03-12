<template>
  <div class="container py-5">
    <!-- AdminNav Component -->

    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">
            #
          </th>
          <th scope="col">
            Email
          </th>
          <th scope="col">
            Role
          </th>
          <th scope="col" width="140">
            Action
          </th>
        </tr>
      </thead>
      <tbody v-for="user in users" :key="user.id">
        <tr>
          <th scope="row">
            1
          </th>
          <td>{{ user.email }}</td>
          <td v-if="user.isAdmin">admin</td>
          <td v-else>user</td>
          <td>
            <button v-show="user.isAdmin && user.id !== 1" type="button" class="btn btn-link"
              @click="changeAdmin(user.id)">
              set as user
            </button>
            <button v-show="!user.isAdmin" type="button" class="btn btn-link" @click="changeAdmin(user.id)">
              set as admin
            </button>
          </td>
        </tr>

      </tbody>
    </table>
  </div>
</template>

<script>
const dummyUser = {
  "users": [
    {
      "id": 1,
      "name": "root",
      "email": "root@example.com",
      "password": "$2a$10$87zU8JEI6uZkeDWYm5lSP.S5MQXjfURTfaAyYOIyp3iEil1zmjZnW",
      "isAdmin": true,
      "image": null,
      "createdAt": "2023-01-24T03:49:55.000Z",
      "updatedAt": "2023-01-24T03:49:55.000Z"
    },
    {
      "id": 2,
      "name": "user1",
      "email": "user1@example.com",
      "password": "$2a$10$WEZwkcCs1vO7d5ukLuLce.q.PWjEV3Eq9VP3mF660gPC3u./gY7wS",
      "isAdmin": false,
      "image": null,
      "createdAt": "2023-01-24T03:49:56.000Z",
      "updatedAt": "2023-01-24T03:49:56.000Z"
    },
    {
      "id": 3,
      "name": "user2",
      "email": "user2@example.com",
      "password": "$2a$10$ByhoFSC9godguwZFohK72.4M9WDnvD.ETDAZqjk1q7RvpV9H1P.iW",
      "isAdmin": false,
      "image": null,
      "createdAt": "2023-01-24T03:49:56.000Z",
      "updatedAt": "2023-01-24T03:49:56.000Z"
    }
  ]
}
export default {
  name: 'AdminUsers',
  data() {
    return {
      users: []
    }
  },
  created() {
    this.fetchUsers()
  },
  methods: {
    fetchUsers() {
      this.users = dummyUser.users
    },
    changeAdmin(id) {
      this.users = this.users.map(user => {
        if (user.id === id) {
          user.isAdmin = !user.isAdmin
        }
        return user
      })
    }

  },


}
</script>