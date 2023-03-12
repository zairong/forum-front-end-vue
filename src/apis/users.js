// ./src/apis/users.js
import { apiHelper } from './../utils/helpers'

//向伺服器請求使用者信息
export const reqGetCurrentUser = () => {
  return apiHelper.get(`/get_current_user`)
}
//向伺服器送出user改變isFavorite信息(isFavorite=true)
export const reqAddFavorite = ({ restaurantId }) => {
  return apiHelper.post(`/favorite/${restaurantId}`, null)
}
//向伺服器送出user改變isFavorite信息(isFavorite=false)
export const reqdeleteFavorite = ({ restaurantId }) => {
  return apiHelper.delete(`/favorite/${restaurantId}`)
}
//向伺服器送出user改變isLiked信息(isLiked=true)
export const reqAddLiked = ({ restaurantId }) => {
  return apiHelper.post(`/like/${restaurantId}`, null)
}
//向伺服器送出user改變isLiked信息(isLiked=false)
export const reqdeleteLiked = ({ restaurantId }) => {
  return apiHelper.delete(`/like/${restaurantId}`)
}
//向伺服器請求美食達人數據
export const reqgetTopUsers = () => {
  return apiHelper.get('/users/top')
}
//向伺服器送出user改變isFollowing信息(isFollowing=true)
export const reqaddFollowing = ({ userId }) => {
  return apiHelper.post(`/following/${userId}`, null,)
}
//向伺服器送出user改變isFollowing信息(isFollowing=false)
export const reqdeleteFollowing = ({ userId }) => {
  return apiHelper.delete(`/following/${userId}`)
}
//向伺服器請求各個user的信息
export const reqGetUsersInfo = ({ userId }) => {
  return apiHelper.get(`/users/${userId}`)
}