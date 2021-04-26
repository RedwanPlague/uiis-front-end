<template>
  <q-page padding>
    <q-tabs
      v-model="tab"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab name="student" label="Student" />
      <q-tab name="teacher" label="Teacher" />
      <q-tab name="admin" label="Admin" />
    </q-tabs>

    <q-separator/>

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="student">
        <student-creator-form/>
      </q-tab-panel>
      <q-tab-panel name="teacher">
        <teacher-creator-form/>
      </q-tab-panel>
      <q-tab-panel name="admin">
        <admin-creator-form/>
      </q-tab-panel>
      <!--<q-tab-panel name="alarms">-->
      <!--  <div class="row">-->
      <!--    <div class="text-h5 q-pa-md">-->
      <!--      Search-->
      <!--      <q-select class="text-h5 q-mx-md" v-model="whichType" style="display: inline-block" :options="['Student', 'Teacher', 'Admin']"></q-select>-->
      <!--      Account-->
      <!--    </div>-->
      <!--  </div>-->
      <!--  <div v-if="whichType === 'Student'">-->
      <!--    <q-form class="row q-ma-sm">-->
      <!--      <q-input class="col-3 q-pa-sm" value="" label="Name"></q-input>-->
      <!--      <q-input class="col-3 q-pa-sm" value="" label="Student Id"></q-input>-->
      <!--      <q-select class="col-3 q-pa-sm" v-model="dept" :options="departments" label="Department"></q-select>-->
      <!--      <q-select class="col-3 q-pa-sm" v-model="hall" :options="halls" label="Hall"></q-select>-->
      <!--      <q-input class="col-4 q-pa-sm" value="" label="Advisor"></q-input>-->
      <!--      <div class="col-12 q-pa-sm">-->
      <!--        <q-btn label="Search Student" color="primary" unelevated @click="showCourses = !showCourses"></q-btn>-->
      <!--        <q-btn label="Cancel" color="primary" flat></q-btn>-->
      <!--      </div>-->
      <!--    </q-form>-->
      <!--  </div>-->
      <!--  <div v-else-if="whichType === 'Teacher'">-->
      <!--    <q-form class="row q-ma-sm">-->
      <!--      <q-input class="col-4 q-pa-sm" value="" label="Name"></q-input>-->
      <!--      <q-input class="col-4 q-pa-sm" value="" label="Teacher Id"></q-input>-->
      <!--      <q-select class="col-4 q-pa-sm" v-model="dept" :options="departments" label="Department"></q-select>-->
      <!--      <div class="col-12 q-pa-sm">-->
      <!--        <q-btn label="Search Teacher" color="primary" unelevated></q-btn>-->
      <!--        <q-btn label="Cancel" color="primary" flat></q-btn>-->
      <!--      </div>-->
      <!--    </q-form>-->
      <!--  </div>-->
      <!--  <div v-else-if="whichType === 'Admin'">-->
      <!--    <q-form class="row q-ma-sm">-->
      <!--      <q-input class="col-4 q-pa-sm" value="" label="Name"></q-input>-->
      <!--      <q-input class="col-3 q-pa-sm" value="" label="Admin Id"></q-input>-->
      <!--      <div class="col-6"></div>-->
      <!--      <q-select class="col-12 q-pa-sm" label="Privileges"-->
      <!--                v-model="againPrivilege" use-chips multiple :options="privilegeList" clearable-->
      <!--      ></q-select>-->
      <!--      <div class="col-12 q-pa-sm">-->
      <!--        <q-btn label="Search Admin" color="primary" unelevated @click="showAdmins = !showAdmins"></q-btn>-->
      <!--        <q-btn label="Cancel" color="primary" flat></q-btn>-->
      <!--      </div>-->
      <!--    </q-form>-->
      <!--  </div>-->
      <!--  <q-markup-table class="col-12 q-mt-lg" flat v-if="showCourses && whichType === 'Student'">-->
      <!--    <thead>-->
      <!--    <tr>-->
      <!--      <th class="text-left" style="font-size: 1.2em;">Student</th>-->
      <!--      <th style="font-size: 1.2em">{{newComing ? 'New Password' : ''}}</th>-->
      <!--      <th style="font-size: 1.2em; width: 10%">Level/Term</th>-->
      <!--      <th style="font-size: 1.2em; width: 10%" class="text-right"><span class="q-pr-md">Recover</span></th>-->
      <!--    </tr>-->
      <!--    </thead>-->
      <!--    <tbody>-->
      <!--    <tr v-for="(course, i) in courseList" :key="i" class="text-center">-->
      <!--      <td class="text-left" style="font-size: 1.1em">-->
      <!--        <router-link :to="{ name: 'AdminStudentPage' }" style="text-decoration: none; color: black">-->
      <!--          {{course.id}} - {{course.name}}-->
      <!--        </router-link>-->
      <!--      </td>-->
      <!--      <td style="font-size: 1.2em">-->
      <!--        <q-spinner v-if="course.newPassword === 'loading'" color="primary" size="md"/>-->
      <!--        <span v-else>{{course.newPassword}}</span>-->
      <!--      </td>-->
      <!--      <td style="font-size: 1.1em">{{course.lt}}</td>-->
      <!--      <td class="text-center text-bold" style="font-size: 1.1em">-->
      <!--        <q-btn-->
      <!--          flat-->
      <!--          icon="vpn_key"-->
      <!--          @click="setPassword(course)"-->
      <!--        ></q-btn>-->
      <!--      </td>-->
      <!--    </tr>-->
      <!--    </tbody>-->
      <!--  </q-markup-table>-->
      <!--  <q-markup-table class="col-12 q-mt-lg" flat v-if="showAdmins && whichType === 'Admin'">-->
      <!--    <thead>-->
      <!--    <tr>-->
      <!--      <th class="text-left" style="font-size: 1.2em; width: 15%">Admin Id</th>-->
      <!--      <th style="font-size: 1.2em;" class="text-left">Name</th>-->
      <!--      <th style="font-size: 1.2em; width: 10%"></th>-->
      <!--      <th style="font-size: 1.2em; width: 10%" class="text-right"><span class="q-pr-md">Edit</span></th>-->
      <!--      <th style="font-size: 1.2em; width: 10%" class="text-right"><span class="q-pr-md">Recover</span></th>-->
      <!--    </tr>-->
      <!--    </thead>-->
      <!--    <tbody>-->
      <!--    <tr>-->
      <!--      <td class="text-left" style="font-size: 1.1em">Ad-108</td>-->
      <!--      <td class="text-left" style="font-size: 1.1em">Abu Bakar</td>-->
      <!--      <td style="font-size: 1.2em"></td>-->
      <!--      <td class="text-right text-bold" style="font-size: 1.1em">-->
      <!--        <q-btn-->
      <!--          flat-->
      <!--          icon="edit"-->
      <!--          @click="showAdminEdit = true"-->
      <!--        ></q-btn>-->
      <!--      </td>-->
      <!--      <td class="text-left text-bold" style="font-size: 1.1em">-->
      <!--        <q-btn flat icon="vpn_key"></q-btn>-->
      <!--      </td>-->
      <!--    </tr>-->
      <!--    <tr v-if="showAdminEdit">-->
      <!--      <td colspan="5">-->
      <!--        <q-select-->
      <!--          v-model="curPrivileges"-->
      <!--          :options="privilegeList"-->
      <!--          label="Privileges"-->
      <!--          use-chips-->
      <!--          multiple-->
      <!--        >-->
      <!--          <template v-slot:append>-->
      <!--            <q-btn label="save" color="green" @click="showAdminEdit = false"></q-btn>-->
      <!--          </template>-->
      <!--        </q-select>-->
      <!--      </td>-->
      <!--    </tr>-->
      <!--    </tbody>-->
      <!--  </q-markup-table>-->
      <!--</q-tab-panel>-->
    </q-tab-panels>
  </q-page>
</template>

<script>
import StudentCreatorForm from "components/AccountCreatorForms/StudentCreatorForm";
import TeacherCreatorForm from "components/AccountCreatorForms/TeacherCreatorForm";
import AdminCreatorForm from "components/AccountCreatorForms/AdminCreatorForm";

export default {
  name: 'CoursePage',
  components: {
    StudentCreatorForm,
    TeacherCreatorForm,
    AdminCreatorForm
  },
  data() {
    return {
      tab: 'student',
      dept: '',
      departments: ['CSE', 'EEE', 'ME', 'CE', 'IPE', 'WRE', 'NAME', 'CHE'],
      hall: '',
      halls: ['AH', 'SWH', 'RH'],
      whichType: 'Student',
      password: '',
      againPrivilege: [],
      privilege: [],
      privilegeList: [
        'Account Create',
        'Account Edit',
        'Account View',
        'Privilege Grant',
        'Privilege Remove',
        'Course Create',
        'Course Edit',
        'Course View',
        'Scholarship Create',
        'Scholarship Edit',
        'Scholarship View',
        'Due Create',
        'Due Edit',
        'Due View',
      ],
      curPrivileges: [
        'Account Edit',
        'Account View',
        'Course View',
      ],
      intendedList: [
        'Level-1 / Term-I',
        'Level-1 / Term-II',
        'Level-2 / Term-I',
        'Level-2 / Term-II',
        'Level-3 / Term-I',
        'Level-3 / Term-II',
        'Level-4 / Term-I',
        'Level-4 / Term-II',
      ],
      courseList: [
        { id: '1605001', name: 'Ashraful Islam', newPassword: '', lt: 'L4-T1' },
        { id: '1705002', name: 'Zawad Abdullah', newPassword: '', lt: 'L3-T1' },
        { id: '1805003', name: 'Bishwajit Bhattacharjee', newPassword: '', lt: 'L2-T1' },
      ],
      showCourses: false,
      showEditCourse: false,
      courseAssign: '',
      teacher: '',
      teacherList: [
        'NBH: Nabil Bin Hasan',
        'AB: Abdul Baki',
        'KD: Kadir Doyan',
        'NBH: Nabil Bin Haan',
        'AB: Abdul Bai',
        'KD: Kadir Doya',
      ],
      newComing: false,
      showAdmins: false,
      showAdminEdit: false,
    }
  },
  computed: {
    courseOptions () {
      const options = []
      for (const course of this.courseList) {
        options.push(course.course)
      }
      return options
    }
  },
  methods: {
    setPassword (course) {
      course.newPassword = 'loading'
      this.newComing = true
      setInterval(() => {
        course.newPassword = 't6uzTDs%%5Er'
      }, 1000)
    }
  }
}
</script>
