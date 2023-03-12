import { apiHelper } from '@/utils/helpers'

//
export const reqGetRestaurants = () => {
  return apiHelper({
    url: `/restaurants?`,
    method: 'get',
    
  })
}
//向伺服器請求所有餐廳信息
export const getRestaurants = ({ page = "", categoryId = "" }) => {
  const searchParams = new URLSearchParams({ page, categoryId }).toString()
  return apiHelper({
    url: `/restaurants?${searchParams}`,
    method: 'get',
    
  })
}
//向伺服器請求餐廳最新動態信息
export const reqGetRestaurantsFeeds = () => {
  return apiHelper({
    url: `/restaurants/feeds`,
    method: 'get',
    
  })
}
//向伺服器請求人氣餐廳信息
export const reqgetRestaurantsTop = () => {
  return apiHelper({
    url: `/restaurants/top`,
    method: 'get',
    
  })
}
//向伺服器請求個別餐廳信息
export const reqGetRestaurant = ({ restaurantId }) => {
  return apiHelper.get(`/restaurants/${restaurantId}`, )
}
