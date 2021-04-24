<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-table
        title="Advisees" :data="rows" :columns="columns" row-key="studentID"
        :pagination.sync="pagination" hide-pagination
        @row-click="methodErNaam"
      />

      <div class="row justify-center q-mt-md">
        <q-pagination
          v-model="pagination.page"
          color="secondary"
          :max="pagesNumber"
          size="sm"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "AdviseeInformationPage",

  data () {
    return {
      /* for pagination */
      pagination: {
        sortBy: 'studentID',
        descending: false,
        page: 1,
        rowsPerPage: 10
        /* rowsNumber: xx if getting data from a server */
      },

      /* for tabulation */
      columns: [
        {
          name: 'studentID',
          required: true,
          label: 'Student ID',
          align: 'left',
          field: row => row.studentID,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'name',
          align: 'left',
          label: 'Name',
          field: 'name',
          sortable: true
        }
      ],
      rows: [
        {
          studentID: '1605002',
          name: 'Zawad'
        },
        {
          studentID: '1605003',
          name: 'Bishwa'
        },
        {
          studentID: '1605004',
          name: 'Redwan'
        },
        {
          studentID: '1605010',
          name: 'Rakib'
        },
        {
          studentID: '1605023',
          name: 'Sahil'
        },
        {
          studentID: '1605024',
          name: 'Mahir'
        }
      ]
    };
  },
  methods: {
    methodErNaam(event, row) {
      console.log(event);
      console.log(row);
      this.$router.push({ name: 'test', params: { studentID: row.studentID, name: row.name }});
    }
  },

  computed: {
    pagesNumber () {
      return Math.ceil(this.rows.length / this.pagination.rowsPerPage);
    }
  }
};
</script>

<style scoped></style>
