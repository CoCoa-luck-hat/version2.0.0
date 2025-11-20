import { createRouter, createWebHistory } from 'vue-router'
import { useIndexStore } from '@/stores'


import IndexView from '@/view/IndexView/index.vue'
import AdminView from '@/view/AdminView/index.vue'
import UserView from '@/view/UserView/index.vue'

import { IndexRouter } from './indexRouter/index'
import { AdminRouter } from './AdminRouter/index'
import { UserRouter } from './UserRouter/index'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      component: IndexView,
      children: IndexRouter
    },
    {
      path: '/admin',
      component: AdminView,
      children: AdminRouter,
      meta:{reqRole:'Admin'}
    },
    {
      path: '/user/:id',
      component: UserView,
      children: UserRouter,
      meta:{reqRole:'User'}
    }
  ],
})

router.beforeEach(async(to,from,next)=>{
  const reqRole = to.meta?.reqRole
  if(!reqRole){
    return next()
  }

  const IndexStore = useIndexStore()
  const IsProfile = await IndexStore.CheckProfile()

  if(!IsProfile || IndexStore.user.role != reqRole){
    localStorage.removeItem('token')
    IndexStore.user = []
    return next({name:'login'})
  }

  return next()
})

export default router
