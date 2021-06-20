const PRIVILEGES = Object.freeze({
  ACCOUNT_CREATION: "account-creation",
  ACCOUNT_DELETION: "account-deletion",
  ACCOUNT_UPDATE: "account-update",

  COURSE_CREATION: "course-creation",
  COURSE_UPDATE: "course-update",
  COURSE_DELETION: "course-deletion",

  CURRENT_SESSION_UPDATE: "current-session-update",

  COURSE_SESSION_CREATION: "course-session-creation",
  COURSE_SESSION_UPDATE: "course-session-update",
  COURSE_SESSION_ASSIGN_EXAMINER: "course-session-assign-examiner",
  COURSE_SESSION_ASSIGN_TEACHER: "course-session-assign-teacher",
  COURSE_SESSION_ASSIGN_SCRUTINIZER: "course-session-assign-scrutinizer",
  COURSE_SESSION_ASSIGN_RESULT_ACCESS_HOLDER: "course-session-assign-result-access-holder",
  COURSE_SESSION_ALLOT_SCHEDULE: "course-session-allot-schedule",

  SLOT_CREATION: "slot-creation",
  SLOT_UPDATE: "slot-update",

  ROLE_CREATION: "role-creation",
  ROLE_UPDATE: "role-update",
  ROLE_DELETION: "role-deletion",

  DEPARTMENT_CREATION: "department-creation",
  DEPARTMENT_UPDATE: "department-update",

  HALL_CREATION: "hall-creation",
  HALL_UPDATE: "hall-update"
})

const DUE_TYPES = Object.freeze({
  LEVEL_CHANGING_FEE: "level-changing-fee",
  EXAM_FEE: "exam-fee",
  DINING_FEE: "dining-fee"
})

export {
  PRIVILEGES,
  DUE_TYPES
}