<template>
  <q-page>
    <div style="max-width: 600px; margin-top: 6%" class="q-mx-auto q-px-md">
      <q-form @submit="submit" @reset="reset" class="q-gutter-md">
        <q-input
          v-model="id"
          label="Username"
          autocomplete="username"
          outlined
          :rules="[() => !!id || 'Please Enter a Username']"
        ></q-input>
        <q-input
          :type="passwordShow ? 'text' : 'password'"
          v-model="password"
          label="Password"
          autocomplete="current-password"
          outlined
          :rules="[() => !!password || 'Please Enter a Password']"
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
          <q-btn label="Submit" type="submit" color="primary" :loading="loginLoading"/>
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
      id: '',
      password: '',
      passwordShow: false,
      loginLoading: false
    }
  },
  methods: {
    ...mapActions([
      'userLogIn'
    ]),
    submit() {
      this.loginLoading = true
      this.userLogIn({
        id: this.id,
        password: this.password
      })
        .then((user) => {
          this.loginLoading = false
          if (user.userType === 'admin') {
            this.$router.replace({ name: 'AdminHome' })
          }
          else if(user.userType === 'teacher') {
            this.$router.replace({name: 'teacherHome'});
          }
          else if(user.userType === 'student') {
            this.$router.replace({name: 'studentHome'});
          }
        })
        .catch(error => {
          this.loginLoading = false
          console.log(error)
        })
    },
    reset() {
      this.id = ''
      this.password = ''
    }
  }
}
</script>
