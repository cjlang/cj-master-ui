/* ===================================== */
/* ==========公共路由，不需要登陆可直接访问== */
/* ===================================== */
/* ===================================== */
const publicRoutes = [
  {
    path: '/',
    name: 'sys',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  }
]

export default publicRoutes
