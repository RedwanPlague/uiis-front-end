<template>
  <q-page padding>
    <div class="text-h5 q-my-md">
      Courses to Offer in Current Session
    </div>
    <q-form class="row q-col-gutter-md" @submit="updateOfferedCourses" @reset="resetForm">
      <course-picker
        classes="col-12"
        label="Course(s) to Offer"
        v-model="coursesToOffer"
        multiple
        required
      />
      <div class="col-12">
        <q-btn
          v-if="contentChanged"
          label="Update" color="primary"
          unelevated :loading="editLoading"
          type="submit"
        />
        <q-btn
          v-else
          label="Confirm" color="green"
          unelevated :loading="confirmLoading"
          @click="confirmOfferedCourses"
        />
        <q-btn v-if="contentChanged" label="Reset" flat color="primary" type="reset"/>
      </div>
    </q-form>
    <q-inner-loading :showing="oldDataLoading"/>
  </q-page>
</template>

<script>
import CoursePicker from 'components/FormElements/CoursePicker'
import edit from 'src/mixins/edit'
import {extract} from 'src/utils/apiDataPreProcessor'
import {deepCopy, deepEqual} from 'src/utils/utilities'

export default {
  name: 'OfferCourses',
  title: 'Courses to Offer',
  components: {
    CoursePicker
  },
  mixins: [
    edit
  ],
  data() {
    return {
      coursesToOffer: [],
      saveLoading: false,
      confirmLoading: false
    }
  },
  computed: {
    contentChanged() {
      const extractedOffers = extract(this.coursesToOffer)
      return !deepEqual(this.oldData.coursesToOffer, extractedOffers)
    },
  },
  methods: {
    updateOfferedCourses() {
      const extractedOffers = extract(this.coursesToOffer)
      this.callEditApi('/currentSession/update/coursesToOffer', {
        coursesToOffer: extractedOffers
      }, 'Offered Course Choices')
        .then(() => {
          this.oldData.coursesToOffer = extractedOffers
        })
        .catch(() => {})
    },
    confirmOfferedCourses() {
      this.confirmLoading = true
      this.$adminAPI.post('/currentSession/newCourseSessionsBatch', {
        coursesToOffer: extract(this.coursesToOffer)
      })
        .then(() => {
          this.confirmLoading = false
          this.$q.notify({
            message: 'Offered Course Choices Confirmed Successfully',
            type: 'positive'
          })
        })
        .catch(() => {
          this.confirmLoading = false
          this.$q.notify({
            message: 'Failed to Confirm Offered Course Choices',
            type: 'negative'
          })
        })
    },
    resetForm() {
      this.loadOldDataIntoForm()
    }
  },
  created() {
    this.fetchOldData('/currentSession/coursesToOffer', null, 'Offered Courses', 1)
      .catch(() => {})
  }
}
</script>
