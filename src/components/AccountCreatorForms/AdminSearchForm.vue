<template>
  <div>
    <div class="text-h5 q-my-md">
      Search Admin Account
    </div>
    <q-form class="row q-col-gutter-md" @submit="searchAccount" @reset="resetForm">
      <q-input
        class="col-6"
        v-model="name"
        label="Name"
        outlined
        :rules="[() => !!columns || 'Dummy Text']"
      />
      <q-input
        class="col-6"
        v-model="id"
        label="Admin Id"
        outlined
        :rules="[() => !!columns || 'Dummy Text']"
      />
      <privilege-picker
        classes="col-12"
        v-model="privileges"
        label="Privileges"
        multiple
      />
      <role-picker
        classes="col-12"
        v-model="roles"
        label="Roles"
        multiple
      />
      <div class="col-12">
        <q-btn label="Search" type="submit" color="primary" unelevated/>
        <q-btn label="Reset" type="reset" color="primary" flat/>
      </div>
    </q-form>
    <div v-if="showResults" class="q-mt-lg">
      <q-table
        title="Results"
        :data="tableData"
        :columns="columns"
        @row-click="onRowClick"
        wrap-cells flat
      >
        <template v-slot:body-cell-privileges="props">
          <q-td :props="props">
            <q-chip v-for="(privilege, i) in props.value" :key="i" :label="privilege"/>
          </q-td>
        </template>
      </q-table>
    </div>
    <q-inner-loading :showing="searchLoading"/>
  </div>
</template>

<script>
import PrivilegePicker from 'components/FormElements/PrivilegePicker'
import RolePicker from 'components/FormElements/RolePicker'
import columnMerger from 'src/utils/columnMerger'
import search from 'src/mixins/search'
import {extract} from 'src/utils/apiDataPreProcessor'

const columns = [
  {name: 'id', label: 'Admin ID', field: 'id', style: 'width: 12%;', sortable: true},
  {name: 'name', label: 'Name', field: 'name', align: 'left'},
  {name: 'privileges', label: 'Privileges', field: 'privileges'},
]
const commonAttr = {
  style: 'font-size: 1.05em;', headerStyle: 'font-size: 1.05em;'
}
columnMerger(columns, commonAttr)

export default {
  name: 'AdminCreatorForm',
  components: {
    PrivilegePicker,
    RolePicker
  },
  mixins: [
    search
  ],
  data() {
    return {
      name: null,
      id: null,
      privileges: [],
      roles: [],
      columns
    }
  },
  methods: {
    searchAccount() {
      this.callSearchApi('account/admin/list', {
        id: this.id,
        name: this.name,
        privileges: extract(this.privileges),
        roles: extract(this.privileges)
      }, 'Admin account')
      // this.$router.push({
      //   name: 'AdminAccountSearchPage',
      //   query: {
      //     type: 'admin',
      //     id: this.id,
      //     name: this.name,
      //     privileges: this.privileges
      //   }
      // }).catch(() => {})
    },
    resetForm(query) {
      if (!query) query = {}
      this.name = query.name
      this.id = query.id
      this.privileges = query.privileges
    },
    onRowClick(event, row) {
      const routeData = this.$router.resolve({
        name: 'AdminAccountEditPage',
        params: {
          userType: 'admin',
          id: row.id
        }
      })
      window.open(routeData.href, '_blank')
    },
    loadResults(query) {
      if (query.type === 'admin') {
        this.resetForm(query)
        this.callSearchApi('account/admin/list', {
          id: query.id,
          name: query.name,
          privileges: query.privileges
        }, 'Admin account')
      }
    }
  },
  // created() {
  //   this.loadResults(this.$route.query)
  // },
  // watch: {
  //   $route(to/*, from*/) {
  //     this.loadResults(to.query)
  //   }
  // }
}
</script>

<style scoped>

</style>
