<template>
  <q-page class="container">
    <h5>{{ course_data.session }} {{ course_data.courseID }}: {{ course_data.courseName }}</h5>

    <div>
      <q-btn v-show="editAccess" :icon='buttonIcon' size='md' color="primary" :label="buttonText" class="" @click="toggleEditMode" ></q-btn>
    </div>
    <div class="table q-pa-md">
      <q-table
      title = 'Course Assessment'
      :data="student_data"
      :columns="columns"
      separator="cell"
      :pagination.sync="pagination"
      :filter="studentFilter"
      :row-key="student_data.studentID"
      >

      <template v-slot:top-right>
        <q-input  dense debounce="300" v-model="studentFilter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" ></q-icon>
          </template>
        </q-input>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="student_id" :props="props">
            {{ props.row.student_id }}
          </q-td>
          <q-td key="student_name" :props="props">
            {{props.row.student_name}}
          </q-td>

          <q-td v-for="i in course_data.evalCount" :props="props" :key="'eval_'+i">
            <q-input type="number" v-model="props.row['eval_'+i]" autofocus dense :disable="!editMode" input-class="text-center" />
          </q-td>

          <q-td key="attendance" :props="props">
            <q-input type="number" v-model="props.row.attendance" autofocus dense :disable="!editMode" input-class="text-center"/>
          </q-td>

        </q-tr>
      </template>
    </q-table>

      <div class="row q-pa-md" v-show="editAccess">
        <q-space />
        <q-btn no-caps icon='check_circle' size='md' color="primary" label="Submit Evalution" @click="submitFlag = true"></q-btn>
      </div>
    </div>


    <q-dialog v-model="submitFlag" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">Are you sure you want to submit your Term evaluation for {{ course_data.courseID }}: {{ course_data.courseName }}?</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Yes, Submit Evaluation" color="primary" v-close-popup @click="editAccess= false; "/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>

  import { mapGetters, mapActions} from 'vuex';
  import { mapMultiRowFields } from 'vuex-map-fields';
  console.log("heh eh");
  let eval_column_entry = {
    name: 'eval_',
    label: 'Evaluation - ',
    align: 'center',
    field: 'eval_',
    classes: 'bg-grey-1',
    headerClasses: 'bg-primary text-white',
    sortable: true
  }

  export default {
    name: "CourseEvaluationPage",

    computed: {
      ...mapGetters(['course_data']),
      ...mapMultiRowFields(['student_data']),
    },
    async created() {
      await this.fetchCourseDetails( { courseID: this.$route.params.courseID, session: this.$route.params.courseSession});
      for(let i = 1 ; i <= this.course_data.evalCount ; i++) {
        let new_eval_entry = {
          ...eval_column_entry
        };

        new_eval_entry.name += i;
        new_eval_entry.label += i;
        new_eval_entry.field += i;
        this.columns.splice(this.columns.length - 1, 0, new_eval_entry);
      }
    },
    watch: {
      async '$route.params' (to, from) {
        if(!this.$route.params.courseID ) {
          return;
        }
        await this.fetchCourseDetails( { courseID: this.$route.params.courseID, session: this.$route.params.courseSession});
      }
    },
    methods: {
      ...mapActions(['fetchCourseDetails', 'saveStudentData']),
      async toggleEditMode(e) {
        console.log(this.student_data);
        e.preventDefault();

        if(this.editMode) {
          await this.saveStudentData();
        }

        this.editMode = !this.editMode;
        if( this.editMode ) {
          this.buttonIcon =  'done';
          this.buttonText = 'Save';
          this.columns.forEach( (cell,index) => {
            if(index >= 2) cell.classes = 'bg-white-1';
          } );
        }
        else {
          this.buttonIcon =  'edit';
          this.buttonText = 'Edit';
          this.columns.forEach( (cell,index) => {
            if(index >= 2) cell.classes = 'bg-grey-1';
          });
        }
      }
    },
    data() {
      console.log("data");
      return {
        studentFilter: '',
        submitFlag: false,
        editMode: false,

        editAccess: true,
        buttonIcon:'edit',
        buttonText:'Edit',
        pagination: {
          page: 1,
          rowsPerPage: 0 // 0 means all rows
        },
        columns: [
          {
            name: 'student_id',
            label: 'Student ID',
            align: 'center',
            field: 'student_id',
            classes: 'bg-grey-1',
            headerClasses: 'bg-primary text-white',
            // style: 'width: 100px',
            sortable: true,
          },
          {
            name: 'student_name',
            label: 'Student Name',
            align: 'center',
            field: 'student_name',
            classes: 'bg-grey-1',
            headerClasses: 'bg-primary text-white',
            // style: 'width: 100px',
            sortable: true,
          },
          {
            name: 'attendance',
            label: 'Attendance Marks',
            align: 'center',
            field: 'attendance',
            classes: 'bg-grey-1',
            headerClasses: 'bg-primary text-white',
            // headerStyle: 'width: 400px',
            // style: 'width: 100px',
            sortable: true
          },
        ],
      }
    }


  }
</script>

<style scoped>
  .container {
    display: flex;
    align-items: center;
    flex-direction: column;
    align-self: center;
  }
  .table {
    width: 900px;
  }


</style>
