<template>
  <q-page  class="container">
    <div class="q-pa-md table">
      <q-table
        title="Unresolved Issues"
        :data="allIssues.unresolvedIssues"
        :columns="columns"
        separator="cell"
        :pagination.sync="pagination"
        :filter="unresolvedFilter"
        @row-click="onRowClick"
        :hide-bottom="allIssues.unresolvedIssues && allIssues.unresolvedIssues.length > 0"
      >
        <template v-slot:top-right>
          <q-input outlined dense debounce="300" v-model="unresolvedFilter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search" ></q-icon>
            </template>
          </q-input>
        </template>
      </q-table>
    </div>

    <div class="q-pa-md table">
      <q-table
        title="Resolved Issues"
        :data="allIssues.resolvedIssues"
        :columns="columns"
        separator="cell"
        :pagination.sync="pagination"
        :filter="resolvedFilter"
        @row-click="onRowClick"
        :hide-bottom="allIssues.resolvedIssues && allIssues.resolvedIssues.length > 0"
      >

        <template v-slot:top-right >
          <q-input outlined dense debounce="300" v-model="resolvedFilter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search" ></q-icon>
            </template>
          </q-input>
        </template>


      </q-table>
    </div>
  </q-page>
</template>

<script>

import {createNamespacedHelpers} from 'vuex';
const {mapGetters, mapActions} = createNamespacedHelpers('issues');

export default {
  name: "IssueListPage",
  data () {
    return {
      unresolvedFilter: '',
      resolvedFilter: '',
      pagination: {
        page: 1,
        rowsPerPage: 0 // 0 means all rows
      },
      columns: [
        {
          name: 'courseID',
          label: 'Course ID',
          align: 'center',
          field: 'courseID',
          classes: 'bg-grey-1 ellipsis',
          headerClasses: 'bg-primary text-white',
          headerStyle: 'width: 50px',
        },
        {
          name: 'courseTitle',
          align: 'center',
          label: 'Course Name',
          field: 'courseTitle',
          headerClasses: 'bg-primary text-white',
          headerStyle: 'width: 400px',
        },
        {
          name: 'title',
          align: 'center',
          label: 'Issue Title',
          field: 'title',
          headerClasses: 'bg-primary text-white',
          headerStyle: 'width: 400px',
        },
        {
          name: 'issueCreator',
          align: 'center',
          label: 'Creator',
          field: row => row.issueCreator.name,
          headerClasses: 'bg-primary text-white',
          headerStyle: 'width: 400px',
        },
      ],
    }
  },
  methods : {
    onRowClick(evt, row) {

      this.$router.push( {
        name: 'issue_details',
        params: {
          issueID: row._id
        }});
    },
    ...mapActions(['fetchIssues']),
  },
  async created() {
    this.$q.loading.show({
      delay: 100 // ms
    });
    await this.fetchIssues();
    this.$q.loading.hide();
  },
  computed: {
    ...mapGetters(['allIssues']),
  }
}
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.table {
  width: 900px;
  margin-top: 30px;
}

</style>


