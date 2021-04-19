
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/teacher',
    component: () => import('layouts/TeacherLayout.vue'),
    children: [
      { path: '', component: () => import('pages/teacher/Index.vue') },
      { path: 'classes', component: () => import('pages/teacher/ClassPage.vue') },
      { path: 'examine', component: () => import('pages/teacher/ExaminePage.vue') },
      { path: 'scrutinize', component: () => import('pages/teacher/ScrutinizePage.vue') },
      { path: 'advisor', component: () => import('pages/teacher/AdvisorPage.vue') },
      { path: 'head', component: () => import('pages/teacher/HeadPage.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
