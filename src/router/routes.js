import admin from 'src/router/admin'
import store from 'src/store'

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
      },
      {
        path: 'dues',
        name: 'StudentDueViewPage',
        component: () => import('pages/student/dues/ViewList')
      },
      {
        path: 'dues/status/:status',
        name: 'StudentDueStatusPage',
        component: () => import('pages/student/dues/PaymentStatus')
      },
      {
        path: 'clearance',
        name: 'StudentClearancePage',
        component: () => import('pages/student/Clearance')
      }
    ],
    beforeEnter(to, from, next) {
      store.dispatch('userTryAutoLogIn')
        .then(() => {
          const type = store.getters.user.userType
          if (type === 'admin') {
            next({name: 'AdminHome'})
          } else if (type === 'student') {
            next()
          } else if (type === 'teacher') {
            next({name: 'teacherHome'})
          }
        })
        .catch(() => next({name: 'Index'}))
    }
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

      {
        path: 'head/course_registration',
        name: 'headCourseRegistration',
        component: () => import('pages/teacher/head/HeadCourseRegistrationPage.vue')
      },
      {
        path: 'head/result_evaluation',
        name: 'headResultEvaluation',
        component: () => import('pages/teacher/head/HeadResultEvaluationPage.vue')
      },

      { path: 'examiner', component: () => import('src/pages/teacher/examiner/ExaminerPage.vue') },
      { path: 'examiner/:courseID/:part', name: "examiner-evaluation-page", component: () => import('src/pages/teacher/examiner/ExaminerEvaluationPage.vue') },

      { path: 'scrutinizer', component: () => import('pages/teacher/scrutinizer/ScrutinizerPage.vue') },
      { path: 'scrutinizer/:courseID', name: "scrutinizer-course-page", component: () => import('pages/teacher/scrutinizer/ScrutinizerCoursePage.vue') },

      { path: 'issues', name: 'issue_list', component: () => import('src/pages/teacher/IssueListPage.vue') },
      { path: 'issues/:issueID', name: 'issue_details', component: () => import('pages/teacher/IssueDetailsPage.vue') }
    ],
    beforeEnter(to, from, next) {
      store.dispatch('userTryAutoLogIn')
        .then(() => {
          const type = store.getters.user.userType
          if (type === 'admin') {
            next({name: 'AdminHome'})
          } else if (type === 'student') {
            next({name: 'studentHome'})
          } else if (type === 'teacher') {
            next()
          }
        })
        .catch(() => next({name: 'Index'}))
    }
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
