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
      { path: '', component: () => import('src/pages/teacher/Home.vue') },

      { path: 'profile', component: () => import('src/pages/teacher/PersonalProfilePage.vue') },

      { path: 'courses', component: () => import('pages/teacher/CourseListPage.vue') },

      { path: 'advisor/advisee_info', name: 'adviseeInfo', component: () => import('pages/teacher/AdviseeInformationPage.vue') },
      { path: 'advisor/advisee_info/advisee_semester_selection/:studentID', name: 'adviseeSemesterSelection', component: () => import('pages/teacher/AdviseeSemesterSelectionPage.vue') },
      { path: 'advisor/advisee_info/advisee_semester_selection/:studentID/advisee_grades/:semesterID', name: 'adviseeGrades', component: () => import('pages/teacher/AdviseeGradesPage') },
      { path: 'advisor/course_registration', name: 'adviseeCourseRegistration', component: () => import('pages/teacher/AdviseeCourseRegistrationPage') },
      { path: 'advisor/conversation', name: 'adviseeConversation', component: () => import('pages/teacher/AdviseeConversationPage.vue') },

      { path: 'head/course_registration', component: () => import('pages/teacher/HeadCourseRegistrationPage.vue') },
      { path: 'head/result_evaluation', component: () => import('pages/teacher/HeadResultEvaluationPage.vue') },

      { path: 'examiner', component: () => import('src/pages/teacher/ExaminerPage.vue') },
      { path: 'scrutinizer', component: () => import('src/pages/teacher/ScrutinizerPage.vue') },
      { path: 'course/:courseSession/:courseID/', name: 'course_page', component: () => import('src/pages/teacher/CourseEvaluationPage.vue') }
    ]
  },

  {
    path: '/admin',
    component: () => import('layouts/AdminLayout'),
    children: [
      { path: 'create-account', name: 'AccountCreationPage', component: () => import('pages/admin/AccountCreation') },
    ]
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
