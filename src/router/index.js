import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/layouts/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true }, 
  },
  {
    path: '/history',
    name: 'history',
    component: () => import('../views/layouts/HistoryView.vue'), 
    meta: { requiresAuth: true }, 
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('../views/layouts/OrderView.vue'), 
    meta: { requiresAuth: true }, 
  },
  {
    path: '/type-product',
    name: 'type-product',
    component: () => import('../views/layouts/ProductTypeView.vue'),
    meta: { requiresAuth: true }, 
  },
  {
    path: '/product-manage',
    name: 'produt-manage',
    component: () => import('../views/layouts/ProductView.vue')
    ,  meta: { requiresAuth: true }, 
  },
  {
    path: '/ingredient-manage',
    name: 'ingredient-manage',
    component: () => import('../views/layouts/IngredientView.vue'),
    meta: { requiresAuth: true }, 
  },

  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Auth/Login.vue'),
   
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
