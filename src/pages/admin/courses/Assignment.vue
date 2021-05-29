<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <course-picker
        classes="col-6"
        v-model="course"
        label="Course to Edit"
        required
      />
      <session-field
        classes="col-6"
        v-model="session"
        label="Session"
        required
        readonly
      />
    </div>
    <q-form v-if="!!course">
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
          v-model="evalWeight"
          label="Per Evaluation Weight"
          type="number"
          outlined
          suffix="%"
          :rules="[() => !!evalWeight || 'Please Fill this Field']"
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
      <q-separator class="q-mb-sm"/>
      <q-separator/>
      <q-expansion-item
        label="Assign Course Teachers"
        header-class="text-h6 q-pl-none"
      >
        <div class="q-pb-md q-col-gutter-md">
          <div v-for="(item, i) in courseTeachers" :key="i" class="row q-col-gutter-md">
            <div class="col-5 row">
              <span class="col-1 text-h6">{{i+1}}.</span>
              <teacher-picker
                classes="col-11"
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
              v-model="item.evalCount"
              label="Evaluation Count"
              type="number"
              :max="totalEvalCount"
              :min="0"
              outlined
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
      <q-separator class="q-mb-sm"/>
      <q-separator/>
      <q-expansion-item
        label="Fix Schedule"
        header-class="text-h6 q-pl-none"
      >
        <div class="q-pb-md q-col-gutter-md">
          <div v-for="(item, i) in slots" :key="i" class="row q-col-gutter-md">
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
              :rules="[() => !!item.part || 'Please Assign a Room']"
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
      <q-separator class="q-mb-sm"/>
      <q-separator/>
      <q-expansion-item
        label="Assign Examiners"
        header-class="text-h6 q-pl-none"
      >
        <div class="q-pb-md q-col-gutter-md">
          <div v-for="(item, i) in examiners" :key="i" class="row q-col-gutter-md">
            <div class="col-7 row">
              <span class="col-1 text-h6">{{i+1}}.</span>
              <teacher-picker
                classes="col-11"
                label="Examiner"
                v-model="item.teacher"
                required
              />
            </div>
            <q-input
              class="col-4"
              v-model="item.part"
              label="Part"
              outlined
              :rules="[() => !!item.part || 'Please Assign a Part']"
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
      <q-separator class="q-mb-sm"/>
      <q-separator/>
      <q-expansion-item
        label="Assign Scrutinizers"
        header-class="text-h6 q-pl-none"
      >
        <div class="q-pb-md q-pt-sm">
          <teacher-picker
            classes="col-12"
            label="Scrutinizers"
            v-model="scrutinizers"
            multiple
            required
          />
        </div>
      </q-expansion-item>
      <q-separator class="q-mb-sm"/>
      <div class="col-12 q-mt-lg">
        <q-btn label="Assign" color="primary" unelevated @click="assignCourse" :loading="assignLoading"/>
        <q-btn label="Reset" color="primary" flat @click="resetForm"/>
      </div>
    </q-form>
    <div style="min-height: 200px"></div>
  </q-page>
</template>

<script>
import CoursePicker from 'components/FormElements/CoursePicker'
import TeacherPicker from 'components/FormElements/TeacherPicker'
import SlotPicker from 'components/FormElements/SlotPicker'
import DayOfWeekPicker from 'components/FormElements/DayOfWeekPicker'
import SessionField from 'components/FormElements/SessionField'

export default {
  name: 'CourseAssignment',
  components: {
    SessionField,
    DayOfWeekPicker,
    SlotPicker,
    TeacherPicker,
    CoursePicker
  },
  data() {
    return {
      course: null,
      session: '',
      totalEvalCount: '',
      consideredEvalCount: '',
      totalMarks: '',
      evalWeight: '',
      attendanceWeight: '',
      courseTeachers: [
        { teacher: null, part: '', evalCount: '' },
      ],
      slots: [
        { slot: null, room: '', day: null },
      ],
      examiners: [
        { teacher: null, part: '' },
      ],
      resultAccessHolders: [],
      scrutinizers: [],
      assignLoading: false
    }
  },
  methods: {
    addNewCourseTeacher() {
      const last = this.courseTeachers.length > 0 ?
        this.courseTeachers[this.courseTeachers.length-1] :
        { teacher: null, part: '', evalCount: '' }
      this.courseTeachers.push({ teacher: null, part: '', evalCount: last.evalCount })
    },
    removeCourseTeacher(index) {
      this.courseTeachers.splice(index, 1)
    },
    addSlot() {
      const last = this.slots.length > 0 ?
        this.slots[this.slots.length-1] :
        { slot: null, room: '', day: null }
      this.slots.push({ slot: last.slot, room: last.room, day: null })
    },
    removeSlot(index) {
      this.slots.splice(index, 1)
    },
    addExaminer() {
      this.examiners.push({ teacher: null, part: '' })
    },
    removeExaminer(index) {
      this.examiners.splice(index, 1)
    },
    assignCourse() {

    },
    resetForm() {

    }
  }
}
</script>

<style scoped>

</style>
