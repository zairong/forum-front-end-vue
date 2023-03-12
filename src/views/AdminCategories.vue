<template>
  <div class="container py-5">
    <!-- 1. 使用先前寫好的 AdminNav -->
    <AdminNav />

    <form class="my-4">
      <div class="form-row">
        <div class="col-auto">
          <input type="text" class="form-control" v-model="newCategory" placeholder="新增餐廳類別...">
        </div>
        <div class="col-auto">
          <button type="button" class="btn btn-primary" @click.stop.prevent="addCategory">
            新增
          </button>
        </div>
      </div>
    </form>
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col" width="60">
            #
          </th>
          <th scope="col">
            Category Name
          </th>
          <th scope="col" width="210">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in categories" :key="category.id">
          <th scope="row">
            {{ category.id }}
          </th>
          <td class="position-relative">
            <div v-if="!category.isEditing" class="category-name">
              {{ category.name }}
            </div>
            <input v-else type="text" v-model="category.name" class="form-control">
            <span v-show="category.isEditing" class="cancel" @click="cancelEdit(category.id)">
              ✕
            </span>
          </td>
          <td class="d-flex justify-content-between">
            <button v-if="!category.isEditing" type="button" class="btn btn-link mr-2" @click="edit(category.id)">
              Edit
            </button>
            <button v-else type="button" class="btn btn-link mr-2"
              @click="editCategory({ category,CategoryId: category.id, name: category.name })">
              Save
            </button>
            <button type="button" class="btn btn-link mr-2" @click="deleteCategory(category.id)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AdminNav from '@/components/AdminNav'
//  2. 定義暫時使用的資料
import { reqGetCategories, reqAddCategory, reqDeleteCategory, reqEditCategory } from '@/apis/admin'
import { Toast } from '@/utils/helpers'


export default {
  components: {
    AdminNav
  },
  // 3. 定義 Vue 中使用的 data 資料
  data() {
    return {
      categories: [],
      newCategory: '',
      tempName: ''
    }
  },
  // 5. 調用 `fetchCategories` 方法
  created() {
    this.fetchCategories()
  },
  methods: {
    //取得所有餐廳類別
    async fetchCategories() {
      try {
        const response = await reqGetCategories()
        // console.log(response.data)
        if (response.status === 'error') {
          throw new Error(response.statusText)
        }
        this.categories = response.data.categories.map(categorie => {
          return {
            ...categorie,
            isEditing: false,
            tempName: ''
          }
        })

      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法取得餐廳類別資訊，請稍後再試'
        })
      }

    },
    //新增餐廳類別
    async addCategory() {
      // TODO: 透過 API 告知伺服器欲新增的餐廳類別...
      try {
        const { data } = await reqAddCategory({ name: this.newCategory })
        // console.log(data)
        this.newCategory = ''
        if (data.status === "error") {
          throw new Error(data.message)
        }
        this.fetchCategories()

      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法新增餐廳類別，請稍後再試'
        })
      }

    },
    //刪除餐廳類別
    async deleteCategory(CategoryId) {
      // TODO: 透過 API 告知伺服器欲刪除的餐廳類別
      try {
        const { data } = await reqDeleteCategory(CategoryId)
        if (data.status === "error") {
          throw new Error(data.message)
        }
        this.fetchCategories()

      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法刪除餐廳類別，請稍後再試'
        })
      }

    },
    //改變編輯狀態
    edit(categoryId) {
      this.categories = this.categories.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            isEditing: !category.isEditing,
            tempName: category.name
          }
        }
        return category
      })
    },
    //儲存並上傳修改類別名稱
    async editCategory({ category,CategoryId, name }) {
      try {
        const { data } = await reqEditCategory({ CategoryId, name })
        // console.log(data)
        if (data.status === "error") {
          throw new Error(data.message)
        }
        category.isEditing = false

      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法修改餐廳類別名稱，請稍後再試'
        })
      }

    },
    //取消編輯並復原原先類別內容
    cancelEdit(id) {
      this.categories = this.categories.map(categorie => {
        if (categorie.id === id) {
          categorie.isEditing = !categorie.isEditing
          categorie.name = categorie.tempName

        }
        return categorie
      })
    }
  }
}
</script>

<style scoped>
.category-name {
  padding: 0.375rem 0.75rem;
  border: 1px solid transparent;
  outline: 0;
  cursor: auto;
}

.btn-link {
  width: 62px;
}

.cancel {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  border: 1px solid #aaaaaa;
  border-radius: 50%;
  user-select: none;
  cursor: pointer;
  font-size: 12px;
}
</style>