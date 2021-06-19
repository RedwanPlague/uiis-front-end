export default {

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
        {
          path: 'role',
          name: 'AdminRoleManagePage',
          component: () => import('pages/admin/accounts/RoleManagement')
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
      path: 'fees',
      name: 'AdminFeeAssignPage',
      component: () => import('pages/admin/dues/FeeAssignment'),
    },
    {
      path: 'fines',
      name: 'AdminFineAssignPage',
      component: () => import('pages/admin/dues/FineAssignment'),
    },
    {
      path: 'slots',
      name: 'AdminSlotManagePage',
      component: () => import('pages/admin/singles/SlotManagement'),
    },
    {
      path: 'session',
      name: 'AdminSessionAssignPage',
      component: () => import('pages/admin/singles/SessionAssignment'),
    },
    {
      path: 'departments',
      name: 'AdminDeptManagePage',
      component: () => import('pages/admin/singles/DeptManagement'),
    },
    {
      path: 'halls',
      name: 'AdminHallManagePage',
      component: () => import('pages/admin/singles/HallManagement'),
    },
  ],
  // beforeEnter(to, from, next) {
  //   if (store.getters.user) {
  //     next()
  //   } else {
  //     next({ name: 'Index' })
  //   }
  // }
}
