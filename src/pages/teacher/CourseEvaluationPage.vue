<template>
  <q-page class="container" v-show="pageLoaded">

    <h5>Januray {{ course_data.session }} {{ course_data.courseID }}: {{ course_data.courseName }}</h5>


    <q-dialog v-model="csvButton">
      <q-card style="width: 400px">
        <q-card-section>
          <div class="text-h6">Upload CSV File</div>
        </q-card-section>

        <q-card-section class="q-pt-md">
          <input  type="file" id="csvFile" accept=".csv" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn class="q-mr-sm" label="Upload" color="primary" v-close-popup no-caps @click="readFile" />
          <q-btn label="Cancel" color="primary" v-close-popup no-caps/>
        </q-card-actions>
      </q-card>
    </q-dialog>


      <div class="button-row" >
        <div class="col" v-show="showEditButton">
        <q-btn :icon='buttonIcon' :disable="editButtonLoading" size='md' color="primary" :label="buttonText" @click="toggleEditMode" ></q-btn>
      </div>
      <div class="col csv-button" v-show="!course_data.hasForwarded">
          <q-btn
            size='md'
            color="primary"
            icon="upload"
            label="Import CSV"
            @click="csvButton = true"
          >
          </q-btn>
        </div>
      </div>


    <div class="table q-pa-lg">

      <q-table
      title = 'Course Assessment'
      :data="student_data"
      :columns="columns"
      separator="cell"
      :pagination.sync="pagination"
      :filter="studentFilter"
      :row-key="student_data => student_data.student_id"
      selection="multiple"
      :selected.sync="selected_students"
      >

      <template v-slot:top>
        <div class="q-table__title">Course Assessment</div>
        <q-space/>
        <q-input  outlined dense debounce="300" v-model="studentFilter" placeholder="Search" >
          <template v-slot:append>
            <q-icon name="search" ></q-icon>
          </template>
        </q-input>
      </template>

        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>

        <template v-slot:body="props">
        <q-tr :props="props" >
          <q-td key="student_id" :props="props" >
            {{ props.row.student_id }}
          </q-td>
          <q-td key="student_name" :props="props">
            {{props.row.student_name}}
          </q-td>

          <q-td v-for="i in course_data.evalCount" :props="props" :key="'eval_'+i">
            <q-input type="number" min="0" v-model="props.row['eval_'+i]" autofocus dense :disable="!props.row.editAccess || !editMode" input-class="text-center" />
          </q-td>

          <q-td key="attendance" :props="props">
            <q-input type="number" min="0" v-model="props.row.attendance" autofocus dense :disable="!props.row.editAccess || !editMode" input-class="text-center"/>
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <div class="row q-pa-lg" >
        <q-input  outlined dense  v-model="classCount" label="Total Classes:" type="number" min="0" :disable="!editMode"/>
        <q-space />
      <div  v-show="!course_data.hasForwarded">
        <q-btn no-caps icon='check_circle' size='md' style="height:40px" color="primary" label="Submit Evalution" @click="submitFlag = true"></q-btn>
      </div>
      </div>
    </div>


    <q-dialog v-model="submitFlag" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">Are you sure you want to submit your Term evaluation for {{ course_data.courseID }}: {{ course_data.courseName }}?</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Yes, Submit Evaluation" color="primary" v-close-popup @click="submitButtonClicked"/>
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script>

  import {createNamespacedHelpers} from 'vuex';
  const {mapGetters, mapActions} = createNamespacedHelpers('courseEval');

  import { mapMultiRowFields } from 'vuex-map-fields';
  import parseCSV from '../../utils/csvParser';

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
      ...mapGetters(['course_data', 'selected_students', 'showEditButton']),
      ...mapMultiRowFields('courseEval', ['student_data']),
      classCount: {
        get () {
          return this.course_data.classCount
        },
        set (value) {
          this.$store.commit('setClassCount', value);
        }
      }
    },
    async created() {
      this.pageLoaded = false;
      this.$q.loading.show({
        delay: 100, // ms
        message: 'Loading...',
        messageColor: 'white'
      });

      await this.fetchCourseDetails( { courseID: this.$route.params.courseID, session: this.$route.params.courseSession});
      for(let i = 1 ; i <= this.course_data.evalCount ; i++) {
        let new_eval_entry = {
          ...eval_column_entry
        };

        new_eval_entry.name += i;
        new_eval_entry.label += i + " (20)";
        new_eval_entry.field += i;
        this.columns.splice(this.columns.length - 1, 0, new_eval_entry);
      }
      this.$q.loading.hide();
      this.pageLoaded = true;
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
      ...mapActions(['fetchCourseDetails', 'saveStudentData', 'updateEvaluationTable', 'studentDataFilledCheck', 'setHasForwarded']),
      loadCSVData(input) {
        let csvData ;
        try {
          csvData = parseCSV(input);
        } catch (error) {
          console.log(error);
          return false;
        }

        if(!csvData || !this.updateEvaluationTable(csvData)) return false;
        this.saveStudentData();
        return true;

      },
      readFile() {

        const csvFile = document.getElementById("csvFile").files[0];
        if(!csvFile || csvFile.name.split(".").pop() !== "csv") {
          this.$q.notify({
            icon: 'error',
            message: 'Error: Please upload a .csv file',
            position: "bottom-left" ,
            actions: [
              { label: 'Dismiss', color: 'yellow', handler: () => { /* ... */ } }
            ]
          });
          return;
        }
        const notif = this.$q.notify({
          message: `Uploading File`,
          position: "bottom-left",
          group: false, // required to be updatable
          timeout: 0, // we want to be in control when it gets dismissed
          spinner: true,
        });

        let reader = new FileReader();
        reader.readAsText(csvFile);
        reader.onload = (event)=> {
          const ret = this.loadCSVData(event.target.result);
          if( !ret) {
            notif({
              icon: 'error', // we add an icon
              spinner: false, // we reset the spinner setting so the icon can be displayed
              message: 'Error: Failed parsing CSV file, please check data format',
              actions: [
                {
                  label: 'Dismiss', color: 'yellow', handler: () => { /* ... */
                  }
                }]
            });
          }
          else {
            notif({
              icon: 'done', // we add an icon
              spinner: false, // we reset the spinner setting so the icon can be displayed
              message: 'Evaluation table updated',
              timeout: 1500 // we will timeout it in 2.5s
            });
          }
        };
      },

      async submitButtonClicked(e) {
        e.preventDefault();

        if(this.editMode) await this.toggleEditMode(e);

        const notif = this.$q.notify({
          message: `Saving Evaluation`,
          position: "bottom-left",
          group: false, // required to be updatable
          timeout: 0, // we want to be in control when it gets dismissed
          spinner: true,
        });
        const tableFilled = await this.studentDataFilledCheck();

        if(tableFilled) {
          await this.setHasForwarded();
          await this.saveStudentData();

          notif({
            icon: 'done', // we add an icon
            spinner: false, // we reset the spinner setting so the icon can be displayed
            message: 'Result Submitted',
            timeout: 1500 // we will timeout it in 2.5s
          });
        }
        else {

          notif({
            icon: 'error', // we add an icon
            spinner: false, // we reset the spinner setting so the icon can be displayed
            message: 'Error: Please fill all table cells',
            actions: [
              { label: 'Dismiss', color: 'yellow', handler: () => { /* ... */ } }
            ]
          });
        }
      },

      async toggleEditMode(e) {
        e.preventDefault();

        this.editMode = !this.editMode;

        if(!this.editMode) {

          this.editButtonLoading = true;

          const notif = this.$q.notify({
            message: `Saving Evaluation`,
            position: "bottom-left",
            group: false, // required to be updatable
            timeout: 0, // we want to be in control when it gets dismissed
            spinner: true,
          });
          const ret = await this.saveStudentData();

          this.editButtonLoading = false;


          if(ret.error) {
            this.editMode = true;
            notif({
              icon: 'error', // we add an icon
              spinner: false, // we reset the spinner setting so the icon can be displayed
              message: 'Error: ' + ret.error,

              actions: [
                { label: 'Dismiss', color: 'yellow', handler: () => { /* ... */ } }
              ]
            });
          }
          else {
            notif({
              icon: 'done', // we add an icon
              spinner: false, // we reset the spinner setting so the icon can be displayed
              message: 'Progress Saved',
              timeout: 1500 // we will timeout it in 2.5s
            });
          }
        }
        if( this.editMode ) {
          this.buttonIcon =  'done';
          this.buttonText = 'Save';
          if( !this.course_data.hasForwarded) {
            this.columns.forEach((cell, index) => {
              if (index >= 2) cell.classes = 'bg-white-1';
            });
          }
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
          pageLoaded: '',
          editButtonLoading: false,

          csvButton: false,
          studentFilter: '',
          submitFlag: false,
          editMode: false,

          buttonIcon:'edit',
          buttonText:'Edit',
          pagination: {
            sortBy: 'student_id',
            page: 1,
            rowsPerPage: 0, // 0 means all rows
            ascending: true
          },
          total_mark_column: [
            {
              name: 'Total Mark',
              label: 'Total Mark',
              align: 'center',
              field: 'total_mark',
              classes: 'bg-grey-1',
              headerClasses: 'bg-primary text-white',
              // style: 'width: 100px',
              sortable: true,
            },
            {
              name: 'Eval - 1',
              label: 'Student ID',
              align: 'center',
              field: 'eval_1',
              classes: 'bg-grey-1',
              headerClasses: 'bg-primary text-white',
              // style: 'width: 100px',
              sortable: true,
            },
          ],
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
              label: 'Attendance Count',
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
    width: 950px;
  }

  h5 {
    margin-bottom: 50px;
    margin-top: 50px;
  }

  .button-row {
    display: flex;
    flex-direction: row;
    align-self: center;
    align-items: center;
    /*margin-left: 50px;*/
  }

  .csv-button {
    width: 400px;
    /*margin-left: 30px;*/
    padding-left: 110px;
  }

  .q-table tbody td:after{
    background: rgba(255,0,0,0.2);
  }



</style>
