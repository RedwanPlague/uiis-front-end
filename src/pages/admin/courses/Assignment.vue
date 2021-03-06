<template>
  <q-page padding>
    <div class="text-h5 q-my-md">
      Edit Course Details
    </div>
    <div class="row q-col-gutter-md">
      <course-picker
        classes="col-6"
        v-model="courseToEdit"
        label="Course to Edit"
        required
        only-offered
        @input="loadCourseSessionData"
      />
      <session-field
        classes="col-5"
        v-model="sessionToEdit"
        label="Session"
        required
        readonly
      />
      <div class="col-1" v-if="courseToEdit">
        <q-btn icon="refresh" size="lg" dense flat @click="loadCourseSessionData"/>
      </div>
    </div>
    <q-form v-if="courseDataLoaded && !!courseToEdit">
      <div v-if="userHasPrivilege(PRIVILEGES.COURSE_SESSION_UPDATE)">
        <q-separator/>
        <q-expansion-item
          label="Evaluation Details"
          header-class="text-h6 q-pl-none"
        >
          <div class="row q-col-gutter-md q-mb-md q-pt-md">
            <q-input
              class="col-6"
              v-model="totalEvalCount"
              label="Total Evaluation Count"
              type="number"
              outlined
              :rules="[() => !!totalEvalCount || 'Please Fill this Field']"
            />
            <q-input
              class="col-6"
              v-model="consideredEvalCount"
              label="Considered Evaluation Count"
              type="number"
              outlined
              :rules="[() => !!consideredEvalCount || 'Please Fill this Field']"
            />
            <q-input
              class="col-6"
              v-model="totalMarks"
              label="Total Marks"
              type="number"
              outlined
              :rules="[() => !!totalMarks || 'Please Fill this Field']"
            />
            <q-input
              class="col-6"
              v-model="perEvalWeight"
              label="Per Evaluation Weight"
              type="number"
              outlined
              suffix="%"
              :rules="[() => !!perEvalWeight || 'Please Fill this Field']"
            />
            <q-input
              class="col-6"
              v-model="attendanceWeight"
              label="Attendance Weight"
              type="number"
              suffix="%"
              outlined
              :rules="[() => !!attendanceWeight || 'Please Fill this Field']"
            />
          </div>
        </q-expansion-item>
        <q-separator class="q-mb-lg"/>
      </div>
      <div v-if="userHasPrivilege(PRIVILEGES.COURSE_SESSION_ASSIGN_TEACHER)">
        <q-separator/>
        <q-expansion-item
          label="Assign Course Teachers"
          header-class="text-h6 q-pl-none"
        >
          <div class="q-pb-md q-col-gutter-md">
            <div v-for="(item, i) in teachers" :key="i" class="row q-col-gutter-md">
              <div class="col-7 row">
                <span class="col-1 text-h6">{{i+1}}.</span>
                <teacher-picker
                  classes="col-11"
                  label="Teacher"
                  v-model="item.teacher"
                  required
                />
              </div>
              <q-input
                class="col-4"
                v-model="item.evalCount"
                label="Evaluation Count"
                type="number"
                :max="totalEvalCount"
                :min="0"
                outlined
                :rules="[() => !!item.evalCount || 'Please Enter Evaluation Count']"
              />
              <div class="col-1">
                <q-btn
                  icon="delete" color="primary" flat dense
                  @click="removeCourseTeacher(i)"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-3"></div>
              <q-btn
                class="col-6" color="primary"
                outline icon="add" :ripple="false"
                @click="addNewCourseTeacher"
              />
            </div>
          </div>
        </q-expansion-item>
        <q-separator class="q-mb-lg"/>
      </div>
      <div v-if="userHasPrivilege(PRIVILEGES.COURSE_SESSION_ALLOT_SCHEDULE)">
        <q-separator/>
        <q-expansion-item
          label="Fix Schedule"
          header-class="text-h6 q-pl-none"
        >
          <div class="q-pb-md q-col-gutter-md">
            <div v-for="(item, i) in schedule" :key="i" class="row q-col-gutter-md">
              <div class="col-5 row">
                <span class="col-1 text-h6">{{i+1}}.</span>
                <slot-picker
                  classes="col-11"
                  v-model="item.slot"
                />
              </div>
              <q-input
                class="col-3"
                v-model="item.room"
                label="Room"
                outlined
                :rules="[() => !!item.room || 'Please Assign a Room']"
              />
              <day-of-week-picker
                class="col-3"
                v-model="item.day"
                label="Day of Week"
                required
              />
              <div class="col-1">
                <q-btn
                  icon="delete" color="primary" flat dense
                  @click="removeSlot(i)"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-3"></div>
              <q-btn
                class="col-6" color="primary"
                outline icon="add" :ripple="false"
                @click="addSlot"
              />
            </div>
          </div>
        </q-expansion-item>
        <q-separator class="q-mb-lg"/>
      </div>
      <div v-if="userHasPrivilege(PRIVILEGES.COURSE_SESSION_ASSIGN_EXAMINER)">
        <q-separator/>
        <q-expansion-item
          label="Assign Examiners"
          header-class="text-h6 q-pl-none"
        >
          <div class="q-pb-md q-col-gutter-md">
            <div v-for="(item, i) in examiners" :key="i" class="row q-col-gutter-md">
              <div class="col-5 row">
                <span class="col-1 text-h6">{{i+1}}.</span>
                <teacher-picker
                  classes="col-11"
                  label="Examiner"
                  v-model="item.teacher"
                  required
                />
              </div>
              <q-input
                class="col-3"
                v-model="item.part"
                label="Part"
                outlined
                :rules="[() => !!item.part || 'Please Assign a Part']"
              />
              <q-input
                class="col-3"
                v-model="item.totalMarks"
                label="Total Marks"
                outlined
                :rules="[() => !!item.totalMarks || 'Please Assign a Part']"
              />
              <div class="col-1">
                <q-btn
                  icon="delete" color="primary" flat dense
                  @click="removeExaminer(i)"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-3"></div>
              <q-btn
                class="col-6" color="primary"
                outline icon="add" :ripple="false"
                @click="addExaminer"
              />
            </div>
          </div>
        </q-expansion-item>
        <q-separator class="q-mb-lg"/>
      </div>
      <div v-if="userHasPrivilege(PRIVILEGES.COURSE_SESSION_ASSIGN_SCRUTINIZER)">
        <q-separator/>
        <q-expansion-item
          label="Assign Scrutinizers"
          header-class="text-h6 q-pl-none"
        >
          <div class="row q-col-gutter-md q-pt-sm">
            <div
              class="row col-4"
              v-for="(item, i) in scrutinizers"
              :key="i"
            >
              <teacher-picker
                classes="col-11"
                label="Scrutinizer"
                v-model="item.teacher"
                required
              />
              <div class="col-1">
                <q-btn
                  icon="delete" color="primary" flat dense
                  @click="removeScrutinizer(i)"
                />
              </div>
            </div>
          </div>
          <div class="row q-pb-md">
            <div class="col-3"></div>
            <q-btn
              class="col-6" color="primary"
              outline icon="add" :ripple="false"
              @click="addScrutinizer"
            />
          </div>
        </q-expansion-item>
        <q-separator class="q-mb-lg"/>
      </div>
      <div v-if="userHasPrivilege(PRIVILEGES.COURSE_SESSION_ASSIGN_INTERNAL)">
        <q-separator/>
        <q-expansion-item
          label="Assign Internals"
          header-class="text-h6 q-pl-none"
        >
          <div class="row q-col-gutter-md q-pt-sm">
            <div
              class="row col-4"
              v-for="(item, i) in internals"
              :key="i"
            >
              <teacher-picker
                classes="col-11"
                label="Internal"
                v-model="item.teacher"
                required
              />
              <div class="col-1">
                <q-btn
                  icon="delete" color="primary" flat dense
                  @click="removeInternal(i)"
                />
              </div>
            </div>
          </div>
          <div class="row q-pb-md">
            <div class="col-3"></div>
            <q-btn
              class="col-6" color="primary"
              outline icon="add" :ripple="false"
              @click="addInternal"
            />
          </div>
        </q-expansion-item>
        <q-separator class="q-mb-lg"/>
      </div>
      <div class="col-12 q-mt-lg">
        <q-btn label="Update" color="primary" unelevated @click="updateCourseSession" :loading="assignLoading"/>
        <q-btn label="Reset" color="primary" flat @click="resetForm"/>
      </div>
    </q-form>
    <q-inner-loading :showing="oldDataLoading"/>
    <div style="min-height: 200px"></div>
  </q-page>
</template>

<script>
import CoursePicker from 'components/FormElements/CoursePicker'
import TeacherPicker from 'components/FormElements/TeacherPicker'
import SlotPicker from 'components/FormElements/SlotPicker'
import DayOfWeekPicker from 'components/FormElements/DayOfWeekPicker'
import SessionField from 'components/FormElements/SessionField'
import edit from 'src/mixins/edit'
import {deepCopy, deepEqual, numEqual} from 'src/utils/utilities'
import {PRIVILEGES} from 'src/utils/constants'
import {mapGetters} from 'vuex'

const getLast = (array, fallback) => {
  return array.length > 0 ? array[array.length-1] : fallback
}

const listLabel = {
  teachers: 'Course Teachers',
  schedule: 'Course Schedule',
  examiners: 'Examiners',
  internals: 'Internals',
  scrutinizers: 'Scrutinizers',
}
const listDefaults = {
  teachers: [{ teacher: null, evalCount: null }],
  schedule: [{ slot: null, room: null, day: null }],
  examiners: [{ teacher: null, part: null, totalMarks: null }],
  internals: [{ teacher: null }],
  scrutinizers: [{ teacher: null }],
}

export default {
  name: 'CourseAssignment',
  title: 'Assign Course Details',
  components: {
    SessionField,
    DayOfWeekPicker,
    SlotPicker,
    TeacherPicker,
    CoursePicker
  },
  mixins: [
    edit,
  ],
  data() {
    return {
      courseToEdit: null,
      sessionToEdit: null,
      courseDataLoaded: false,
      totalEvalCount: null,
      consideredEvalCount: null,
      totalMarks: null,
      perEvalWeight: null,
      attendanceWeight: null,
      teachers: listDefaults.teachers,
      schedule: listDefaults.schedule,
      examiners: listDefaults.examiners,
      internals: listDefaults.internals,
      scrutinizers: listDefaults.scrutinizers,
      assignLoading: false,
      PRIVILEGES
    }
  },
  computed: {
    ...mapGetters([
      'userHasPrivilege'
    ]),
    courseID() {
      return this.courseToEdit ? this.courseToEdit.value.courseID : null
    },
    syllabusID() {
      return this.courseToEdit ? this.courseToEdit.value.syllabusID : null
    },
    sessionStr() {
      return this.sessionToEdit ? new Date(this.sessionToEdit).toString() : null
    },
    identifier() {
      return `${this.courseID}/${this.syllabusID}/${this.sessionStr}`
    }
  },
  methods: {
    addNewCourseTeacher() {
      const last = getLast(this.teachers, listDefaults.teachers[0])
      this.teachers.push({ teacher: null, evalCount: last.evalCount })
    },
    removeCourseTeacher(index) {
      this.teachers.splice(index, 1)
    },
    addSlot() {
      const last = getLast(this.schedule, listDefaults.schedule[0])
      this.schedule.push({ slot: last.slot, room: last.room, day: null })
    },
    removeSlot(index) {
      this.schedule.splice(index, 1)
    },
    addExaminer() {
      const last = getLast(this.examiners, listDefaults.examiners[0])
      this.examiners.push({ teacher: null, part: null, totalMarks: last.totalMarks})
    },
    removeExaminer(index) {
      this.examiners.splice(index, 1)
    },
    addScrutinizer() {
      this.scrutinizers.push({...listDefaults.scrutinizers[0]})
    },
    removeScrutinizer(index) {
      this.scrutinizers.splice(index, 1)
    },
    addInternal() {
      this.internals.push({...listDefaults.internals[0]})
    },
    removeInternal(index) {
      this.internals.splice(index, 1)
    },
    updateEvaluationDetails() {
      if (
        !numEqual(this.totalEvalCount, this.oldData.totalEvalCount) ||
        !numEqual(this.consideredEvalCount, this.oldData.consideredEvalCount) ||
        !numEqual(this.totalMarks, this.oldData.totalMarks) ||
        !numEqual(this.perEvalWeight, this.oldData.perEvalWeight) ||
        !numEqual(this.attendanceWeight, this.oldData.attendanceWeight)
      ) {
        this.callEditApi(`/courseSession/update/${this.identifier}`, {
          totalEvalCount: this.totalEvalCount,
          consideredEvalCount: this.consideredEvalCount,
          totalMarks: this.totalMarks,
          perEvalWeight: this.perEvalWeight,
          attendanceWeight: this.attendanceWeight,
        }, 'Evaluation Details')
          .then(() => {
            this.oldData.totalEvalCount = this.totalEvalCount
            this.oldData.consideredEvalCount = this.consideredEvalCount
            this.oldData.totalMarks = this.totalMarks
            this.oldData.perEvalWeight = this.perEvalWeight
            this.oldData.attendanceWeight = this.attendanceWeight
          })
      }
    },
    updateList(type) {
      let list = deepCopy(this[type])
      if (!list || deepEqual(list, listDefaults[type])) {
        list = []
      }
      for (let i = 0; i < list.length; i++) {
        for (const key of Object.keys(list[i])) {
          if (list[i][key] && list[i][key].hasOwnProperty('value')) {
            list[i][key] = list[i][key].value
          }
        }
      }
      if (!deepEqual(list, this.oldData[type])) {
        this.callEditApi(`/courseSession/update/${this.identifier}/${type}`, list, listLabel[type])
          .then(() => {
            this.oldData[type] = list
          })
          .catch(() => {})
      }
    },
    updateCourseSession() {
      this.updateEvaluationDetails()
      this.updateList('teachers')
      this.updateList('schedule')
      this.updateList('examiners')
      this.updateList('scrutinizers')
      this.updateList('internals')
    },
    showErrorNotification(error) {
      const message = `Failed to load Course data`
      this.$q.notify({
        message,
        type: 'negative'
      })
      console.log(message)
      console.log(error.response)
    },
    loadCourseSessionData() {
      if (!this.courseToEdit || !this.sessionToEdit) return
      this.fetchOldData('/courseSession/list', {
        courseID: this.courseID,
        syllabusID: this.syllabusID,
        session: this.sessionStr
      }, 'Course Session')
        .then(() => {
          this.resetForm()
          this.courseDataLoaded = true
        })
        .catch(error => {
          if (error.doesNotExist) {
            this.createCourseSession()
          } else {
            this.showErrorNotification(error)
          }
        })
    },
    createCourseSession() {
      this.oldDataLoading = true
      this.$adminAPI.post('/courseSession/create', {
        courseID: this.courseID,
        syllabusID: this.syllabusID,
        session: this.sessionStr,
        totalEvalCount: 6,
        consideredEvalCount: 4,
        totalMarks: 300,
        perEvalWeight: 20,
        attendanceWeight: 10
      })
        .then(response => {
          this.oldData = response.data
          this.oldDataLoading = false
          this.courseDataLoaded = true
          this.resetForm()
        })
        .catch(error => this.showErrorNotification(error))
    },
    resetForm() {
      this.loadOldDataIntoForm()
      for (const key of Object.keys(listDefaults)) {
        if (!this[key] || this[key].length === 0) {
          this[key] = deepCopy(listDefaults[key])
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
