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
      { path: 'courses/attendance', component: () => import('pages/teacher/CourseAttendancePage.vue') },
      { path: 'courses/evaluation', component: () => import('pages/teacher/CourseEvaluationPage.vue') },
      { path: 'advisor/advisee_info', component: () => import('pages/teacher/AdviseeInformationPage.vue') },
      { path: 'advisor/advisee_result', component: () => import('pages/teacher/AdviseeResultPage.vue') },
      { path: 'advisor/course_registration', component: () => import('pages/teacher/AdviseeCourseRegistrationPage') },
      { path: 'advisor/conversation', component: () => import('pages/teacher/AdviseeConversationPage.vue') },
      { path: 'head/course_registration', component: () => import('pages/teacher/HeadCourseRegistrationPage.vue') },
      { path: 'head/result_evaluation', component: () => import('pages/teacher/HeadResultEvaluationPage.vue') },
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
