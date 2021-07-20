const PRIVILEGES = Object.freeze({
  ACCOUNT_CREATION: 'account-creation',
  // ACCOUNT_DELETION: 'account-deletion',
  ACCOUNT_UPDATE: 'account-update',

  COURSE_CREATION: 'course-creation',
  COURSE_UPDATE: 'course-update',
  // COURSE_DELETION: 'course-deletion',

  CURRENT_SESSION_UPDATE: 'current-session-update',

  COURSE_SESSION_CREATION: 'course-session-creation',
  COURSE_SESSION_UPDATE: 'course-session-update',
  COURSE_SESSION_ASSIGN_EXAMINER: 'course-session-assign-examiner',
  COURSE_SESSION_ASSIGN_TEACHER: 'course-session-assign-teacher',
  COURSE_SESSION_ASSIGN_SCRUTINIZER: 'course-session-assign-scrutinizer',
  COURSE_SESSION_ASSIGN_INTERNAL: 'course-session-assign-internal',
  COURSE_SESSION_ALLOT_SCHEDULE: 'course-session-allot-schedule',

  SLOT_CREATION: 'slot-creation',
  SLOT_UPDATE: 'slot-update',

  ROLE_CREATION: 'role-creation',
  ROLE_UPDATE: 'role-update',
  // ROLE_DELETION: 'role-deletion',

  DEPARTMENT_CREATION: 'department-creation',
  DEPARTMENT_UPDATE: 'department-update',

  HALL_CREATION: 'hall-creation',
  HALL_UPDATE: 'hall-update',

  LEVEL_CHANGING_FEE_MANAGEMENT: 'level-changing-fee-management',
  DINING_FEE_MANAGEMENT: 'dining-fee-management',
  EXAM_FEE_MANAGEMENT: 'exam-fee-management',

  LIBRARY_FINE_MANAGEMENT: 'library-fine-management',
  LAB_FINE_MANAGEMENT: 'laboratory-fine-management',
  DISCIPLINARY_FINE_MANAGEMENT: 'disciplinary-fine-management',

  THESIS_CLEARANCE: 'thesis-clearance'
})

const DUE_TYPES = Object.freeze({
  LEVEL_CHANGING_FEE: 'level-changing-fee',
  EXAM_FEE: 'exam-fee',
  DINING_FEE: 'dining-fee'
})

const FINE_TYPES = Object.freeze({
  LIBRARY_FINE: 'library-fine',
  LAB_FINE: 'laboratory-fine',
  DISCIPLINARY_FINE: 'disciplinary-fine'
})

const DUE_STATUS = Object.freeze({
  PENDING: 'pending',
  CLEARED: 'cleared'
})

export {
  PRIVILEGES,
  DUE_TYPES,
  FINE_TYPES,
  DUE_STATUS
}
