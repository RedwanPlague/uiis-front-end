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
      { path: '', component: () => import('src/pages/teacher/Home.vue') },
      { path: 'profile', component: () => import('src/pages/teacher/PersonalProfilePage.vue') },
      { path: 'courses', component: () => import('src/pages/teacher/CoursesPage.vue') },
      { path: 'advisor', component: () => import('pages/teacher/AdvisorPage.vue') },
      { path: 'head', component: () => import('pages/teacher/HeadPage.vue') },
      { path: 'examiner', component: () => import('src/pages/teacher/ExaminerPage.vue') },
      { path: 'scrutinizer', component: () => import('src/pages/teacher/ScrutinizerPage.vue') }
    ]
  },

  /* 
      Always leave this as last one,
      but you can also remove it
  */
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
