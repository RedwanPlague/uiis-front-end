import admin from 'src/router/admin'

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
        component: () => import('src/pages/student/CourseRegistration.vue')
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

      { path: 'courses', component: () => import('pages/teacher/CourseListPage.vue') },
      { path: 'course/:courseID/:courseSession/', name: 'course_page', component: () => import('src/pages/teacher/CourseEvaluationPage.vue') },

      {
        path: 'advisor/advisee_selection',
        name: 'adviseeSelection',
        component: () => import('pages/teacher/AdviseeSelectionPage.vue')
      },
      {
        path: 'advisor/advisee_selection/advisee_info/:studentID',
        name: 'adviseeInformation',
        component: () => import('pages/teacher/AdviseeInformationPage.vue')
      },
      {
        path: 'advisor/advisee_selection/advisee_info/:studentID/advisee_grades',
        name: 'adviseeGrades',
        component: () => import('pages/teacher/AdviseeGradesPage')
      },
      {
        path: 'advisor/course_registration',
        name: 'adviseeCourseRegistration',
        component: () => import('pages/teacher/AdviseeCourseRegistrationPage')
      },
      {
        path: 'advisor/conversation',
        name: 'adviseeConversation',
        component: () => import('pages/teacher/AdviseeConversationPage.vue')
      },

      { path: 'head/course_registration', component: () => import('pages/teacher/HeadCourseRegistrationPage.vue') },
      { path: 'head/result_evaluation', component: () => import('pages/teacher/HeadResultEvaluationPage.vue') },

      { path: 'examiner', component: () => import('src/pages/teacher/ExaminerPage.vue') },
      { path: 'examiner/:courseID', name: "examiner-evaluation-page", component: () => import('src/pages/teacher/ExaminerEvaluationPage.vue') },

      { path: 'scrutinizer', component: () => import('src/pages/teacher/ScrutinizerPage.vue') },
      { path: 'scrutinizer/:courseID', name: "scrutinizer-course-page", component: () => import('src/pages/teacher/ScrutinizerCoursePage.vue') },

      { path: 'issues', name: 'issue_list', component: () => import('src/pages/teacher/IssueListPage.vue') },
      { path: 'issues/:issueID', name: 'issue_details', component: () => import('pages/teacher/IssueDetailsPage.vue') }
    ]
  },

  admin,

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
