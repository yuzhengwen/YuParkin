import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useUserStore } from '@/lib/stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/home' },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/car-groups',
      name: 'car-groups',
      component: () => import('../views/CarGroupsView.vue'),
    },
    {
      path: '/accept-invite',
      name: 'accept-invite',
      component: () => import('../views/AcceptInviteView.vue'),
    },
    {
      path: '/password-reset',
      name: 'password-reset',
      component: () => import('../views/PasswordResetView.vue'),
    },
  ],
})
router.beforeEach(async (to) => {
  const user = useUserStore()

  // Ensure user data is loaded before checking auth
  if (user.current === null) {
    await user.updateUser() // try to load user data
  }
  console.log(`User is ${user.current ? 'logged in' : 'not logged in'}`)

  // if user is accepting an invite but not logged in
  if (to.name === 'accept-invite' && user.current === null) {
    console.log('User is not logged in and accepting invite')
    return {
      name: 'login',
      query: { redirect: to.fullPath }, // ✅ Store redirect path in query
    }
  } else if (to.name === 'password-reset' && user.current === null) {
    console.log('User is not logged in and resetting password')
  } else if (to.name !== 'login' && user.current === null) {
    console.log('Redirecting to login')
    return { name: 'login' }
  }
  if (user.current && to.name === 'login') {
    return { name: 'home' }
  }
})

export default router
