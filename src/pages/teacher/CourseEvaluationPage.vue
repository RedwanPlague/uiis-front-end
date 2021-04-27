<template>
  <q-page class="container">
    <h5>{{courseDetails.session }} {{courseDetails.courseID}}: {{courseDetails.courseName }}</h5>

    <div>
      <q-btn v-show="editAccess" :icon='buttonIcon' size='md' color="primary" :label="buttonText" class="" @click="toggleEditMode" ></q-btn>
    </div>
    <div class="table q-pa-md">
      <q-table
      title = 'Course Assessment'
      :data="student_data"
      :columns="columns"
      row-key="courseDetails.courseID"
      separator="cell"
      :pagination.sync="pagination"
      :filter="studentFilter"
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
          <q-td key="eval_1" :props="props" >
            <q-input type="number" v-model="props.row.eval_1" autofocus dense :disable="!editMode" input-class="text-center" />
          </q-td>
          <q-td key="eval_2" :props="props">
            <q-input type="number" v-model="props.row.eval_2" autofocus dense :disable="!editMode" input-class="text-center"/>
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
          <span class="q-ml-sm">Are you sure you want to submit your Term evaluation for {{courseDetails.courseID}}: {{courseDetails.courseName}}?</span>
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

  export default {
    name: "CourseEvaluationPage",

    computed: {
      ...mapGetters(['courseDetails']),
      ...mapMultiRowFields(['student_data']),
    },
    async created() {
      await this.fetchCourse( { courseID: this.$route.params.courseID, session: this.$route.params.courseSession});
      await this.fetchStudentData( { courseID: this.$route.params.courseID, session: this.$route.params.courseSession});
    },
    watch: {
      async '$route.params' (to, from) {
        if(!this.$route.params.courseID ) {
          return;
        }
        await this.fetchCourse( { courseID: this.$route.params.courseID, session: this.$route.params.courseSession});
        await this.fetchStudentData( { courseID: this.$route.params.courseID, session: this.$route.params.courseSession});

      }
    },
    methods: {
      ...mapActions(['fetchCourse', 'fetchStudentData', 'saveStudentData']),
      async toggleEditMode(e) {
        console.log(this.courseDetails);
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
            name: 'eval_1',
            label: 'Evaluation - 1',
            align: 'center',
            field: 'eval_1',
            classes: 'bg-grey-1',
            headerClasses: 'bg-primary text-white',
            // style: 'width: 100px',
            sortable: true
          },
          {
            name: 'eval_2',
            label: 'Evaluation - 2',
            align: 'center',
            field: 'eval_2',
            classes: 'bg-grey-1',
            headerClasses: 'bg-primary text-white',
            // headerStyle: 'width: 400px',
            // style: 'width: 100px',
            sortable: true
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
    width: 800px;
  }


</style>
