import {
  createRouter,
  createWebHistory
} from 'vue-router'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Admin from '../views/Admin.vue'
import NewArticle from '../views/NewArticle.vue'
import EditArticle from '../views/EditArticle.vue'

const routes = [
  {
    path: '/',
    component: Home
  },

  {
    path: '/admin/login',
    component: Login
  },

  {
    path: '/admin',
    component: Admin
  },

  {
    path: '/admin/new',
    component: NewArticle
  },

  {
    path: '/admin/edit/:id',
    component: EditArticle
  },

  {
    path: '/article/:id',
    component: () => import('../views/Article.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  const isAdmin =
    localStorage.getItem('adminLoggedIn') === 'true'

  // Admin хэсэг рүү нэвтрээгүй хүн орох гэж байвал
  if (
    to.path.startsWith('/admin') &&
    to.path !== '/admin/login' &&
    !isAdmin
  ) {
    return '/admin/login'
  }

  // Нэвтэрчихсэн хүн login руу дахин орох гэвэл
  if (
    to.path === '/admin/login' &&
    isAdmin
  ) {
    return '/admin'
  }
})

export default router