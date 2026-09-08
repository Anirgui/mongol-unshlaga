import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Article from '../views/Article.vue'
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
    path: '/article/:id',
    component: Article
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
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to) => {
  const isAdmin =
    localStorage.getItem('adminLoggedIn') === 'true'

  if (
    to.path.startsWith('/admin') &&
    to.path !== '/admin/login' &&
    !isAdmin
  ) {
    return '/admin/login'
  }

  if (
    to.path === '/admin/login' &&
    isAdmin
  ) {
    return '/admin'
  }
})

export default router