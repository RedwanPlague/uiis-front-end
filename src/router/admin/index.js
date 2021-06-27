import store from 'src/store'
import {PRIVILEGES} from 'src/utils/constants'

const has = store.getters.userHasPrivilege

const prevent = (satisfy, next) => {
  satisfy ? next() : next({ name: 'AdminHome' })
}

export default {

  path: '/admin',
  component: () => import('layouts/AdminLayout'),
  children: [
    {
      path: '',
      name: 'AdminHome',
      component: () => import('pages/admin/singles/AdminHome')
    },
    {
      path: 'account',
      component: () => import('pages/admin/accounts/Wrapper'),
      children: [
        {
          path: 'create',
          name: 'AdminAccountCreationPage',
          component: () => import('pages/admin/accounts/Creation'),
          beforeEnter(to, from, next) {
            prevent(has(PRIVILEGES.ACCOUNT_CREATION), next)
          }
        },
        {
          path: 'search',
          name: 'AdminAccountSearchPage',
          component: () => import('pages/admin/accounts/Search'),
          beforeEnter(to, from, next) {
            prevent(has(PRIVILEGES.ACCOUNT_CREATION) || has(PRIVILEGES.ACCOUNT_UPDATE), next)
          }
        },
        {
          path: 'edit/:userType/:id',
          name: 'AdminAccountEditPage',
          component: () => import('pages/admin/accounts/Edit'),
          beforeEnter(to, from, next) {
            prevent(has(PRIVILEGES.ACCOUNT_CREATION) || has(PRIVILEGES.ACCOUNT_UPDATE), next)
          }
        },
        {
          path: 'role',
          name: 'AdminRoleManagePage',
          component: () => import('pages/admin/accounts/RoleManagement'),
          beforeEnter(to, from, next) {
            prevent(has(PRIVILEGES.ROLE_CREATION) || has(PRIVILEGES.ROLE_UPDATE), next)
          }
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
          component: () => import('pages/admin/courses/Creation'),
          beforeEnter(to, from, next) {
            prevent(has(PRIVILEGES.COURSE_CREATION), next)
          }
        },
        {
          path: 'search',
          name: 'AdminCourseSearchPage',
          component: () => import('pages/admin/courses/Search'),
          beforeEnter(to, from, next) {
            prevent(has(PRIVILEGES.COURSE_CREATION) || has(PRIVILEGES.COURSE_UPDATE), next)
          }
        },
        {
          path: 'edit/:courseID/:syllabusID',
          name: 'AdminCourseEditPage',
          component: () => import('pages/admin/courses/Edit'),
          beforeEnter(to, from, next) {
            prevent(has(PRIVILEGES.COURSE_CREATION) || has(PRIVILEGES.COURSE_UPDATE), next)
          }
        },
        {
          path: 'assign',
          name: 'AdminCourseAssignPage',
          component: () => import('pages/admin/courses/Assignment'),
          beforeEnter(to, from, next) {
            prevent(
              has(PRIVILEGES.COURSE_SESSION_CREATION) ||
              has(PRIVILEGES.COURSE_UPDATE) ||
              has(PRIVILEGES.COURSE_SESSION_ALLOT_SCHEDULE) ||
              has(PRIVILEGES.COURSE_SESSION_ASSIGN_TEACHER) ||
              has(PRIVILEGES.COURSE_SESSION_ASSIGN_EXAMINER) ||
              has(PRIVILEGES.COURSE_SESSION_ASSIGN_SCRUTINIZER)
            , next)
          }
        }
      ]
    },
    {
      path: 'fees',
      component: () => import('pages/admin/dues/fees/Wrapper'),
      children: [
        {
          path: 'assign',
          name: 'AdminFeeAssignPage',
          component: () => import ('pages/admin/dues/fees/FeeAssignment')
        },
        {
          path: 'search',
          name: 'AdminFeeSearchPage',
          component: () => import ('pages/admin/dues/fees/FeeSearch')
        },
      ],
      beforeEnter(to, from, next) {
        prevent(
          has(PRIVILEGES.LEVEL_CHANGING_FEE_MANAGEMENT) ||
          has(PRIVILEGES.EXAM_FEE_MANAGEMENT) ||
          has(PRIVILEGES.DINING_FEE_MANAGEMENT)
        , next)
      }
    },
    {
      path: 'fines',
      component: () => import('pages/admin/dues/fines/Wrapper'),
      children: [
        {
          path: 'assign',
          name: 'AdminFineAssignPage',
          component: () => import('pages/admin/dues/fines/FineAssignment'),
        },
        {
          path: 'search',
          name: 'AdminFineSearchPage',
          component: () => import('pages/admin/dues/fines/FineSearch'),
        },
        {
          path: 'edit/:fineID',
          name: 'AdminFineEditPage',
          component: () => import('pages/admin/dues/fines/FineEdit'),
        },
      ],
      beforeEnter(to, from, next) {
        prevent(
          has(PRIVILEGES.LIBRARY_FINE_MANAGEMENT) ||
          has(PRIVILEGES.LAB_FINE_MANAGEMENT) ||
          has(PRIVILEGES.DISCIPLINARY_FINE_MANAGEMENT)
        , next)
      }
    },
    {
      path: 'slots',
      name: 'AdminSlotManagePage',
      component: () => import('pages/admin/singles/SlotManagement'),
      beforeEnter(to, from, next) {
        prevent(has(PRIVILEGES.SLOT_CREATION) || has(PRIVILEGES.SLOT_UPDATE), next)
      }
    },
    {
      path: 'session',
      name: 'AdminSessionAssignPage',
      component: () => import('pages/admin/singles/SessionAssignment'),
      beforeEnter(to, from, next) {
        prevent(has(PRIVILEGES.CURRENT_SESSION_UPDATE), next)
      }
    },
    {
      path: 'departments',
      name: 'AdminDeptManagePage',
      component: () => import('pages/admin/singles/DeptManagement'),
      beforeEnter(to, from, next) {
        prevent(has(PRIVILEGES.DEPARTMENT_CREATION) || has(PRIVILEGES.DEPARTMENT_UPDATE), next)
      }
    },
    {
      path: 'halls',
      name: 'AdminHallManagePage',
      component: () => import('pages/admin/singles/HallManagement'),
      beforeEnter(to, from, next) {
        prevent(has(PRIVILEGES.HALL_CREATION) || has(PRIVILEGES.HALL_UPDATE), next)
      }
    },
  ],
  beforeEnter(to, from, next) {
    store.dispatch('userTryAutoLogIn')
      .then(() => {
        const type = store.getters.user.userType
        if (type === 'admin') {
          next()
        } else if (type === 'student') {
          next({name: 'studentHome'})
        } else if (type === 'teacher') {
          next({name: 'teacherHome'})
        }
      })
      .catch(() => next({name: 'Index'}))
  }
}
