import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/layouts/HomeView.vue'
import { from } from 'core-js/core/array'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Auth/Login.vue'),
      meta: { isAuth: false}
     
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { isAuth: true}

    },
    {
      path: '/history',
      name: 'history',
      component: () => import('../views/layouts/HistoryView.vue'), 
     
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('../views/layouts/OrderView.vue'), 
     
    },
    {
      path: '/type-product',
      name: 'type-product',
      component: () => import('../views/layouts/ProductTypeView.vue'),
    },
    {
      path: '/product-manage',
      name: 'produt-manage',
      component: () => import('../views/layouts/ProductView.vue')
    },
    {
      path: '/ingredient-manage',
      name: 'ingredient-manage',
      component: () => import('../views/layouts/IngredientView.vue'),
    },
  ]
  
})

router.beforeEach((to,from,next)=>{
  if(to.matched.some(record => record.meta.isAuth)){
      let token = JSON.parse(localStorage.getItem('token'))
      if(!token){
          next('/login')
      }
  }
  next()
})
export default router
