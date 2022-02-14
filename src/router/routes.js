import Store from '../store/index'
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/en',
    component: () => import('layouts/bareLayout.vue'),
    children: [
      { path: 'Staff_Login', component: () => import('pages/staff/Index.vue'), name: 'Staff_auth' },
      { path: 'Staff_Signup', component: () => import('pages/staff/auth/Signup.vue'), name: 'Staff_signup' }
    ]
  },
  {
    path: '/staffPortal',
    component: () => import('layouts/StaffLayout.vue'),
    beforeEnter: (to, from, next) => {
      const token = Store().state.staff.user.id
      if (token) {
        next()
      } else {
        next({ name: 'Staff_auth' })
      }
    },
    children: [
      { path: 'Dashboard', component: () => import('pages/staff/main/Dashboard.vue'), name: 'Dashboard' },
      { path: 'Profile', component: () => import('pages/staff/main/Profile.vue'), name: 'Profile' },
      { path: 'Upload', component: () => import('pages/staff/main/StaffUpload.vue'), name: 'StaffUpload' }
    ]
  },
  {
    path: '/s',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/admin/index.vue'), name: 'View_Staff' },
      { path: ':id', component: () => import('src/pages/admin/_id/single_staff.vue'), name: 'Single_Staff' }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
