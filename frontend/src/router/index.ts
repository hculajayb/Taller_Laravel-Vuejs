// frontend/src/router/index.ts
import { createRouter, createWebHistory, RouteLocationNormalized } from 'vue-router'
import api from '@/services/api'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/usuarios' },

    { path: '/login', name: 'login', component: () => import('@/views/LoginView.vue') },

    // Usuarios
    { path: '/usuarios', name: 'usuarios', component: () => import('@/views/HomeView.vue'), meta: { requiresAuth: true } },
    { path: '/usuarios/nuevo', name: 'usuarios-nuevo', component: () => import('@/views/UserForm.vue'), meta: { requiresAuth: true } },
    { path: '/usuarios/:id/editar', name: 'usuarios-editar', component: () => import('@/views/UserForm.vue'), props: true, meta: { requiresAuth: true } },

    // Tareas
    { path: '/tareas', name: 'tareas', component: () => import('@/views/TareasList.vue'), meta: { requiresAuth: true } },
    { path: '/tareas/nueva', name: 'tareas-nueva', component: () => import('@/views/TareaForm.vue'), meta: { requiresAuth: true } },

    // Fallback
    { path: '/:pathMatch(.*)*', redirect: '/usuarios' },
  ],
})

/**
 * Valida el token contra el backend UNA VEZ por pestaña:
 * - Si /api/me responde 200 -> cachea "tokenChecked=1" en sessionStorage
 * - Si falla -> elimina token
 */
async function ensureServerAuthOnce(): Promise<boolean> {
  const token = localStorage.getItem('token')
  if (!token) return false

  if (sessionStorage.getItem('tokenChecked') === '1') {
    return true
  }

  try {
    await api.get('/me') // protegido por auth:sanctum (Bearer)
    sessionStorage.setItem('tokenChecked', '1')
    return true
  } catch {
    localStorage.removeItem('token')
    sessionStorage.removeItem('tokenChecked')
    return false
  }
}

router.beforeEach(async (to: RouteLocationNormalized) => {
  const hasToken = !!localStorage.getItem('token')

  // Si hay token pero aún no lo validamos en servidor, haz el ping
  if (hasToken && sessionStorage.getItem('tokenChecked') !== '1') {
    await ensureServerAuthOnce()
  }

  const authenticated = !!localStorage.getItem('token') && sessionStorage.getItem('tokenChecked') === '1'

  if (to.meta?.requiresAuth && !authenticated) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  if (to.name === 'login' && authenticated) {
    return { name: 'usuarios' }
  }

  return true
})

export default router
