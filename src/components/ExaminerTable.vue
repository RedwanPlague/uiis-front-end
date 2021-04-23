<template>
  <div class="q-pa-sm">
    <h6>{{courseName}}</h6>

    <div class="q-pa-md">
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
              <q-input type="number" v-model="props.row.marks" autofocus dense />
            </q-td>
          </q-tr>
        </template>
      </q-table>
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
  }
}
</script>

<style scoped>

</style>
