import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/dashboard',
      component: () => import('../views/DashboardView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/NotFoundView.vue')
    }
  ]
})

router.beforeEach((to: any, from: any, next: any) => {
  const isLoggedIn = sessionStorage.getItem('session_token');

  if (to.path === '/' && isLoggedIn) {
    next('/dashboard');
  } else if (to.path !== '/' && !isLoggedIn) {
    next('/');
  } else {
    next();
  }
})

export default router
