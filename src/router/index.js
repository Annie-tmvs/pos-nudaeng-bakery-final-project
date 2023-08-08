import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/layouts/HomeView.vue'

Vue.use(VueRouter)

const routes = [
 
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Auth/Login.vue'), 
  },
 
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      requiresAuth: true // this route requires authentication
    }
  },
  {
    path: '/history',
    name: 'history',
    component: () => import('../views/layouts/HistoryView.vue'), 
    meta: {
      requiresAuth: true // this route requires authentication
    }
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('../views/layouts/OrderView.vue'), 
    meta: {
      requiresAuth: true // this route requires authentication
    }
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import('../views/layouts/NotFound.vue'),

  },
  // {
  //   path: '/product-manage',
  //   name: 'produt-manage',
  //   component: () => import('../views/layouts/ProductView.vue'),
  //   meta: {
  //     requiresAuth: true // this route requires authentication
  //   }
  // },
  // {
  //   path: '/ingredient-manage',
  //   name: 'ingredient-manage',
  //   component: () => import('../views/layouts/IngredientView.vue'),
  //   meta: {
  //     requiresAuth: true // this route requires authentication
  //   }
  // },
  // {
    // path: '/test',
    // name: 'test',
    // component: () => import('../views/layouts/testView.vue'),
    // meta: {
    //   requiresAuth: true // this route requires authentication
    // }
  // },
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !token &&  to.path !== '/login') {
    next('/login');
  }
  else {
    next();
  }
});

export default router
