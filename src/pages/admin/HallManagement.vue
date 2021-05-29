<template>
  <q-page padding>
    <div class="text-h5 q-mb-md">
      Halls
    </div>
    <q-form
      v-if="!dataLoading"
      @submit="updateHalls"
      @reset="resetForm"
    >
      <div v-for="(hall, idx) in halls" :key="idx" class="row q-col-gutter-md q-mb-sm">
        <q-input
          class="col-2"
          v-model="hall.id"
          label="Hall ID"
          outlined
          :readonly="hall.old"
          :rules="[() => !!hall.id || 'Please Enter Hall ID']"
        />
        <q-input
          class="col-5"
          v-model="hall.name"
          label="Name"
          :rules="[() => !!hall.name || 'Please Enter Name']"
          outlined
          :readonly="hall.viewing"
        />
        <teacher-picker
          classes="col-4"
          v-model="hall.provost"
          label="Provost"
          :readonly="hall.viewing"
          :required="hall.old"
        />
        <div class="col-1">
          <q-btn
            v-if="hall.old"
            :icon="hall.viewing ? 'edit' : 'visibility'"
            :color="hall.viewing ? 'primary' : 'black'"
            @click="hall.viewing = !hall.viewing"
            flat dense
          />
          <q-btn
            v-else
            icon="delete" color="primary" flat dense
            @click="localRemoveHall(idx)"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-3"></div>
        <q-btn
          class="col-6" color="primary"
          outline icon="add" :ripple="false"
          @click="localAddHall"
        />
      </div>
      <div class="col-12 q-mt-lg">
        <q-btn label="Update" type="submit" color="primary" unelevated/>
        <q-btn label="Reset" type="reset" color="primary" flat/>
      </div>
    </q-form>
    <q-inner-loading :showing="dataLoading"/>
  </q-page>
</template>

<script>
import {apiFetch} from 'src/utils/apiWrappers'
import TeacherPicker from 'components/FormElements/TeacherPicker'
import creator from 'src/mixins/creator'
import edit from 'src/mixins/edit'

export default {
  name: 'DeptManagement',
  components: {TeacherPicker},
  mixins: [
    creator,
    edit
  ],
  data() {
    return {
      halls: [],
      hallList: [],
      dataLoading: false,
    }
  },
  methods: {
    fetchHalls() {
      this.dataLoading = true
      apiFetch('/hall/list', null, 'Halls')
        .then(response => {
          this.dataLoading = false
          this.hallList = response.data
          this.resetForm()
        })
        .catch(() => {
          this.dataLoading = false
        })
    },
    localAddHall() {
      this.halls.push({
        id: '',
        name: '',
        provost: null,
        viewing: false,
        old: false
      })
    },
    localRemoveHall(idx) {
      this.halls.splice(idx, 1)
    },
    updateHalls() {
      this.halls.forEach((hall, idx) => {
        console.log(hall)
        if (hall.old) {
          const prev = this.hallList[idx]
          if (
            prev.name !== hall.name ||
            !hall.provost ||
            prev.provost !== hall.provost.value
          ) {
            this.editHall(hall)
          }
        } else {
          this.createHall(hall)
        }
      })
      this.fetchHalls()
    },
    createHall(hall) {
      this.callCreateApi('/hall/create', {
        id: hall.id,
        name: hall.name,
        provost: hall.provost
      }, `${hall.name} hall`)
    },
    editHall(hall) {
      this.callEditApi('/hall/update/' + hall.id, {
        name: hall.name,
        provost: hall.provost
      }, `${hall.name} hall`)
    },
    resetForm() {
      this.halls = this.hallList.map(x => {
        return {
          ...x,
          viewing: true,
          old: true
        }
      })
    },
  },
  created() {
    this.fetchHalls()
  }
}
</script>
