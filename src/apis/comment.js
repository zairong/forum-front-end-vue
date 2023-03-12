import { apiHelper } from '@/utils/helpers'

//向伺服器請求個別餐廳信息
export const reqAddComment = ({ restaurantId, text }) => {
  return apiHelper.post("/comments", { restaurantId, text }, )
}
//刪除評論
export const reqDeleteComment = (id) => {
  return apiHelper.delete(`/comments/${id}`, )
}