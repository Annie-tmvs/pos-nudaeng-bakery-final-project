import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/layouts/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/history',
    name: 'history',
    component: () => import('../views/layouts/HistoryView.vue')
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('../views/layouts/OrderView.vue')
  },
  {
    path: '/type-product',
    name: 'type-product',
    component: () => import('../views/layouts/ProductTypeView.vue')
  },
  {
    path: '/product-manage',
    name: 'produt-manage',
    component: () => import('../views/layouts/ProductView.vue')
  },
  {
    path: '/ingredient-manage',
    name: 'ingredient-manage',
    component: () => import('../views/layouts/IngredientView.vue')
  },

  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Auth/Login.vue'),
    meta: {
      hideNavbar: true,
     }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
