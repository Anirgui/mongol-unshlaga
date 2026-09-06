import {
    createRouter,
    createWebHistory
} from 'vue-router'

import Home from '../views/Home.vue'
import Admin from '../views/Admin.vue'
import NewArticle from '../views/NewArticle.vue'
import EditArticle from '../views/EditArticle.vue'
const routes = [{
    path: '/',
    component: Home
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
        path: '/article/:id',
        component: () => import('../views/Article.vue')
    },
    {
        path: '/admin/edit/:id',
        component: EditArticle
    }
]

const router = createRouter( {
    history: createWebHistory(),
    routes
})

export default router