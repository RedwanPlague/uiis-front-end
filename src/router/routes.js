const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout'),
    children: [
      { path: '', name: 'Index', component: () => import('pages/Index') }
    ]
  },

  {
    path: '/student',
    component: () => import('layouts/StudentLayout.vue'),
    children: [
      {
        path: '',
        name: 'studentHome',
        component: () => import('src/pages/student/Home.vue')
      },
      {
        path: 'profile',
        name: 'studentProfile',
        component: () => import('src/pages/student/PersonalProfilePage.vue')
      },
      {
        path: 'course_registration',
        name: 'courseRegistration',
        component: () => import('pages/student/CourseRegistrationPage.vue')
      },
      {
        path: 'semester_selection',
        name: 'semesterSelection',
        component: () => import('src/pages/student/SemesterSelectionPage.vue')
      },
      {
        path: 'semester_selection/grades',
        name: 'studentGrades',
        component: () => import('src/pages/student/GradesPage.vue')
      }
    ]
  },

  {
    path: '/teacher',
    component: () => import('layouts/TeacherLayout'),
    children: [
      {
        path: '',
        name: 'teacherHome',
        component: () => import('src/pages/teacher/Home.vue')
      },
      {
        path: 'profile',
        name: 'teacherProfile',
        component: () => import('src/pages/teacher/PersonalProfilePage.vue')
      },

      { path: 'courses', component: () => import('pages/teacher/course/CourseListPage.vue') },
      { path: 'course/:courseID/:courseSession/', name: 'course_page', component: () => import('pages/teacher/course/CourseEvaluationPage.vue') },

      {
        path: 'advisor/advisee_selection',
        name: 'adviseeSelection',
        component: () => import('pages/teacher/advisor/AdviseeSelectionPage.vue')
      },
      {
        path: 'advisor/advisee_selection/advisee_info/:studentID',
        name: 'adviseeInformation',
        component: () => import('pages/teacher/advisor/AdviseeInformationPage.vue')
      },
      {
        path: 'advisor/advisee_selection/advisee_info/:studentID/advisee_grades',
        name: 'adviseeGrades',
        component: () => import('pages/teacher/advisor/AdviseeGradesPage')
      },
      {
        path: 'advisor/course_registration',
        name: 'adviseeCourseRegistration',
        component: () => import('pages/teacher/advisor/AdviseeCourseRegistrationPage')
      },
      {
        path: 'advisor/conversation',
        name: 'adviseeConversation',
        component: () => import('pages/teacher/advisor/AdviseeConversationPage.vue')
      },

      { path: 'head/course_registration', component: () => import('pages/teacher/head/HeadCourseRegistrationPage.vue') },
      { path: 'head/result_evaluation', component: () => import('pages/teacher/head/HeadResultEvaluationPage.vue') },

      { path: 'examiner', component: () => import('pages/teacher/examiner/ExaminerPage.vue') },
      { path: 'examiner/:courseID', name: "examiner-evaluation-page", component: () => import('pages/teacher/examiner/ExaminerEvaluationPage.vue') },

      { path: 'scrutinizer', component: () => import('pages/teacher/scrutinizer/ScrutinizerPage.vue') },
      { path: 'scrutinizer/:courseID', name: "scrutinizer-course-page", component: () => import('pages/teacher/scrutinizer/ScrutinizerCoursePage.vue') },

      { path: 'issues', name: 'issue_page', component: () => import('src/pages/teacher/IssuePage.vue') }
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
          {
            path: 'search',
            name: 'AdminAccountSearchPage',
            component: () => import('pages/admin/accounts/Search')
          },
          {
            path: 'edit/:userType/:id',
            name: 'AdminAccountEditPage',
            component: () => import('pages/admin/accounts/Edit')
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
          {
            path: 'search',
            name: 'AdminCourseSearchPage',
            component: () => import('pages/admin/courses/Search')
          },
          {
            path: 'edit/:courseID/:syllabusID',
            name: 'AdminCourseEditPage',
            component: () => import('pages/admin/courses/Edit')
          },
          {
            path: 'assign',
            name: 'AdminCourseAssignPage',
            component: () => import('pages/admin/courses/Assignment')
          }
        ]
      },
      {
        path: 'slots',
        name: 'AdminSlotManagePage',
        component: () => import('pages/admin/SlotManagement'),
      },
      {
        path: 'session',
        name: 'AdminSessionAssignPage',
        component: () => import('pages/admin/SessionAssignment'),
      },
      {
        path: 'departments',
        name: 'AdminDeptManagePage',
        component: () => import('pages/admin/DeptManagement'),
      },
      {
        path: 'halls',
        name: 'AdminHallManagePage',
        component: () => import('pages/admin/HallManagement'),
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
