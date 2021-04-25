<template>
  <q-page>
    <div style="max-width: 600px" class="q-mx-auto q-mt-lg q-pt-lg q-px-md">
      <q-form @submit="submit" @reset="reset" class="q-gutter-md">
        <q-input v-model="tempUser" label="UserName" outlined></q-input>
        <q-input
          :type="passwordShow ? 'text' : 'password'"
          v-model="password"
          label="Password"
          outlined
        >
          <template v-slot:append>
            <q-icon
              :name="passwordShow ? 'visibility' : 'visibility_off'"
              class="cursor-pointer"
              @click="passwordShow = !passwordShow"
            />
          </template>
        </q-input>
        <div class="float-right">
          <q-btn label="Submit" type="submit" color="primary"/>
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm"/>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Index',
  data () {
    return {
      tempUser: '',
      password: '',
      passwordShow: false
    }
  },
  methods: {
    ...mapActions([
      'userLogIn'
    ]),
    submit() {
      this.$q.loading.show()
      this.userLogIn({
        userID: this.tempUser,
        password: this.password
      })
        .then((user) => {
          this.$q.loading.hide()
          // if (user.userType === 'admin') {
          //   this.$router.push({ name: 'AccountCreationPage' })
          // }
        })
        .catch(error => {
          console.log(error)
        })
    },
    reset() {
      this.tempUser = ''
      this.password = ''
    }
  }
}
</script>
