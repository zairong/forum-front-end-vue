import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index'

Vue.use(VueRouter)

const authorizeIsAdmin = (to, from, next) => {
  const currentUser = store.state.user.currentUser
  if (currentUser && !currentUser.isAdmin) {
    next('/404')
    return
  }

  next()
}

const routes = [
  //首頁
  {
    path: '/',
    name: 'root',
    redirect: '/signin'
  },
  //後臺使用者餐廳頁面
  {
    path: '/admin/restaurants',
    name: 'admin-restaurants',
    component: () => import('@/views/AdminRestaurants'),
    beforeEnter: authorizeIsAdmin
  },
  //後臺使用者頁面
  {
    path: '/admin/users',
    name: 'admin-user',
    component: () => import('@/views/AdminUsers'),
    beforeEnter: authorizeIsAdmin
  },
  //後臺餐廳類別頁面
  {
    path: '/admin/categories',
    name: 'admin-categories',
    component: () => import('@/views/AdminCategories.vue'),
    beforeEnter: authorizeIsAdmin
  },
  //後臺使用者新增餐廳頁面
  {
    path: '/admin/restaurants/create',
    name: 'admin-restaurants-create',
    component: () => import('@/views/AdminRestaurantNew'),
    beforeEnter: authorizeIsAdmin
  },
  //後臺使用者修改餐廳頁面
  {
    path: '/admin/restaurants/:id/edit',
    name: 'admin-restaurant-edit',
    component: () => import('@/views/AdminRestaurantEdit.vue'),
    beforeEnter: authorizeIsAdmin
  },
  //後臺使用者個別餐廳頁面
  {
    path: '/admin/restaurants/:id',
    name: 'admin-restaurants-id',
    component: () => import('@/views/AdminRestaurant'),
    beforeEnter: authorizeIsAdmin
  },
  //登入
  {
    path: '/signin',
    name: 'sign-in',
    component: () => import('@/views/SignIn'),
  },
  //註冊
  {
    path: '/signup',
    name: 'sign-up',
    component: () => import('@/views/SignUp'),
  },
  //所有餐廳
  {
    path: '/restaurants',
    name: 'restaurants',
    component: () => import('@/views/Restaurants'),
  },
  //最新動態
  {
    path: '/restaurants/feeds',
    name: 'restaurants-feeds',
    component: () => import('@/views/RestaurantsFeeds')
  },
  //人氣餐廳
  {
    path: '/restaurants/top',
    name: 'restaurants-tops',
    component: () => import('@/views/RestaurantsTop')
  },
  //餐廳個別詳情
  {
    path: '/restaurants/:id',
    name: 'restaurant',
    component: () => import('@/views/RestaurantShow')
  },
  //個別餐廳資訊
  {
    path: '/restaurants/:id/dashboard',
    name: 'restaurants-dashboard',
    component: () => import('@/views/RestaurantDashboard')
  },
  //美食達人
  {
    path: '/users/top',
    name: 'users-top',
    component: () => import('@/views/UsersTop')
  },
  //個人用戶信息
  {
    path: '/users/:id',
    name: 'users-id',
    component: () => import('@/views/User')
  },
  //修改個人用戶信息
  {
    path: '/users/:id/edit',
    name: 'users-id-edit',
    component: () => import('@/views/UserEdit')
  },
  //not-found
  {
    path: '*',
    name: 'not-found',
    component: () => import('@/views/NotFound'),
  }
]


const router = new VueRouter({
  linkExactActiveClass: 'active',
  routes
})

//跳轉頁面(判斷token是否相同)再向伺服器發請求取得CurrentUser
router.beforeEach(async (to, from, next) => {


  // 從 localStorage 取出 token
  const token = localStorage.getItem('token')
  const tokenInStore = store.state.user.token

  // 預設是尚未驗證
  let isAuthenticated = store.state.user.isAuthenticated

  // 如果有 token 的話才驗證
  if (token && token !== tokenInStore) {
    // 取得驗證成功與否
    isAuthenticated = await store.dispatch('user/fetchCurrentUser')
  }


  // 對於不需要驗證 token 的頁面
  const pathsWithoutAuthentication = ['sign-up', 'sign-in']

  // 如果 token 無效且進入需要驗證的頁面則轉址到登入頁
  if (!isAuthenticated && !pathsWithoutAuthentication.includes(to.name)) {
    next('/signin')
    return
  }


  // 如果 token 有效且進入不需要驗證到頁面則轉址到餐廳首頁
  if (isAuthenticated && pathsWithoutAuthentication.includes(to.name)) {
    next('/restaurants')
    return
  }
  next()
})

export default router
