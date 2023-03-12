import { apiHelper } from '@/utils/helpers'


//取得所有餐廳類別
export const reqGetCategories = () => {
  return apiHelper.get('/admin/categories', )
}
//新增餐廳類別
export const reqAddCategory = ({ name }) => {
  return apiHelper.post('/admin/categories', { name }, )
}
//刪除餐廳類別
export const reqDeleteCategory = (CategoryId) => {
  return apiHelper.delete(`/admin/categories/${CategoryId}`, )
}
//改變餐廳類別名稱
export const reqEditCategory = ({ CategoryId, name }) => {
  return apiHelper.put(`/admin/categories/${CategoryId}`, { name }, )
}

//新增餐廳
export const reqCreateRestaurants = (formData) => {
  return apiHelper.post('/admin/restaurants', formData, )
}
//取得所有餐廳資訊
export const reqGetRestaurants = () => {
  return apiHelper.get('/admin/restaurants', )
}
//刪除餐廳資訊
export const reqDeleteRestaurants = (restaurantId) => {
  return apiHelper.delete(`/admin/restaurants/${restaurantId}`, )
}
//取得餐廳個別詳情資訊
export const reqGetRestaurantDetail = ({ restaurantId }) => {
  return apiHelper.get(`/admin/restaurants/${restaurantId}`, )
}
//修改餐廳個別詳情資訊
export const reqUpdateRestaurants = ({ restaurantId, formData }) => {
  return apiHelper.put(`/admin/restaurants/${restaurantId}`, formData, )
}