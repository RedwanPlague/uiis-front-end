<template>
  <div class="q-pa-sm">
    <div class="q-pa-md column items-center">
      <h6>{{courseName}}</h6>
      <q-table
        :data="marks"
        :columns="columns"
        row-key="student_id"
        separator="cell"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="student_id" :props="props">
              {{ props.row.student_id }}
            </q-td>
            <q-td key="marks" :props="props">
              <!-- {{ props.row.marks }} -->
              <q-input type="number" v-model="props.row.marks" autofocus dense :disable="!canEdit" />
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
    
    <div class="q-pa-md row justify-center">
      <q-checkbox v-model="canEdit" label="Edit" class="rounded-borders" />
      <q-btn no-caps color="primary" label="Upload" class="q-ml-xl" @click="onClick" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExaminerTable',
  props: {
    courseName: {
      type: String,
      required: true,
    },

    marks: {
      type: Array,
      required: true
    },
  },

  data() {
    return {
      canEdit: false,
      columns: [
        {
          // unique id, identifies column
          name: "student_id",

          // label that is displayed in the table
          label: "Student ID",
          field: "student_id",

          align: "left",
          sortable: false,
        },
        {
          name: "marks", label: "Marks", field: "marks", align: "left", sortable: false,
        },
      ]
    }
  },

  methods: {
    onClick() {
      this.$emit("upload", {courseName: this.courseName, marks: this.marks});
      //console.log({courseName: this.courseName, marks: this.marks});
    }
  }
}
</script>

<style scoped>
/* I don't know why the following doesn't work */
input[type="number"]::-webkit-outer-spin-button, input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
 
input[type="number"] {
    -moz-appearance: textfield;
}
</style>
