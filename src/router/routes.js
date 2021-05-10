import store from '../store/index'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout'),
    children: [
      { path: '', name: 'Index', component: () => import('pages/Index') }
    ]
  },
  {
    path: '/teacher',
    component: () => import('layouts/TeacherLayout'),
    children: [
      { path: '', component: () => import('src/pages/teacher/Home') },
      { path: 'profile', component: () => import('src/pages/teacher/PersonalProfilePage') },
      { path: 'courses/attendance', component: () => import('pages/teacher/CourseAttendancePage') },
      { path: 'courses/evaluation', component: () => import('pages/teacher/CourseEvaluationPage') },
      { path: 'advisor/advisee_info', component: () => import('pages/teacher/AdviseeInformationPage') },
      { path: 'advisor/course_registration', component: () => import('pages/teacher/AdviseeCourseRegistrationPage') },
      { path: 'advisor/conversation', component: () => import('pages/teacher/AdviseeConversationPage') },
      { path: 'head/course_registration', component: () => import('pages/teacher/HeadCourseRegistrationPage') },
      { path: 'head/result_evaluation', component: () => import('pages/teacher/HeadResultEvaluationPage') },
      { path: 'examiner', component: () => import('src/pages/teacher/ExaminerPage') },
      { path: 'scrutinizer', component: () => import('src/pages/teacher/ScrutinizerPage') }
    ]
  },
  {
    path: '/admin',
    component: () => import('layouts/AdminLayout'),
    children: [
      {
        path: 'account',
        component: () => import('pages/admin/accounts/Wrapper'),
        children: [
          {
            path: 'create',
            name: 'AdminAccountCreationPage',
            component: () => import('pages/admin/accounts/Creation')
          },
        ]
      },
      {
        path: 'course',
        component: () => import('pages/admin/courses/Wrapper'),
        children: [
          {
            path: 'create',
            name: 'AdminCourseCreationPage',
            component: () => import('pages/admin/courses/Creation')
          },
        ]
      },
    ],
    // beforeEnter(to, from, next) {
    //   if (store.getters.user) {
    //     next()
    //   } else {
    //     next({ name: 'Index' })
    //   }
    // }
  },

  /*
      Always leave this as last one,
      but you can also remove it
  */
  {
    path: '*',
    name: 'ErrorPage',
    component: () => import('pages/Error404')
  }
]

export default routes
