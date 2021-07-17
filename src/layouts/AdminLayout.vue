<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          UIIS Admin
        </q-toolbar-title>

        <q-btn-dropdown v-if="user" icon="person" :label="user.name" flat no-caps>
          <q-list>
            <q-item clickable v-close-popup :to="{ name: 'AdminAccountCreationPage' }" style="color: inherit" dense>
              <q-item-section>
                <q-item-label>
                  <q-avatar icon="account_circle"/>
                  Account
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="userLogOut(); $router.push({ name: 'Index' })" dense>
              <q-item-section>
                <q-item-label>
                  <q-avatar icon="logout"/>
                  Logout
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <q-btn v-else flat label="SIGN IN" :to="{ name: 'Index' }"/>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-if="user"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label header class="text-grey-8">
          Admin Quick Links
        </q-item-label>
        <quick-link
          v-for="quickLink in quickLinks"
          :key="quickLink.title"
          v-bind="quickLink"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import QuickLink from 'components/QuickLink'
import { mapGetters, mapActions } from 'vuex'
import {PRIVILEGES} from 'src/utils/constants'

export default {
  name: 'AdminLayout',
  data() {
    return {
      leftDrawerOpen: false,
      quickLinks: [],
    }
  },
  components: {
    QuickLink
  },
  computed: {
    ...mapGetters([
      'user',
      'userHasPrivilege',
    ])
  },
  methods: {
    ...mapActions([
      'userLogOut'
    ]),
    buildLinks() {
      const links = []
      const has = this.userHasPrivilege

      links.push({
        title: 'Home',
        icon: 'school',
        link: { name: 'AdminHome' }
      })

      const accountLinks = []
      if (has(PRIVILEGES.ACCOUNT_CREATION)) {
        accountLinks.push({
          title: 'Create',
          icon: 'school',
          link: { name: 'AdminAccountCreationPage' }
        })
      }
      if (has(PRIVILEGES.ACCOUNT_UPDATE)) {
        accountLinks.push({
          title: 'Search',
          icon: 'school',
          link: { name: 'AdminAccountSearchPage' }
        })
      }
      if (has(PRIVILEGES.ROLE_CREATION) || has(PRIVILEGES.ROLE_UPDATE)) {
        accountLinks.push({
          title: 'Roles',
          icon: 'school',
          link: { name: 'AdminRoleManagePage' }
        })
      }
      if (accountLinks.length > 0) {
        links.push({
          title: 'Accounts',
          icon: 'school',
          children: accountLinks
        })
      }

      const courseLinks = []
      if (has(PRIVILEGES.COURSE_CREATION)) {
        courseLinks.push({
          title: 'Create',
          icon: 'school',
          link: { name: 'AdminCourseCreationPage' }
        })
      }
      if (has(PRIVILEGES.COURSE_UPDATE)) {
        courseLinks.push({
          title: 'Search',
          icon: 'school',
          link: { name: 'AdminCourseSearchPage' }
        })
      }
      if (
        has(PRIVILEGES.COURSE_SESSION_CREATION) ||
        has(PRIVILEGES.COURSE_SESSION_UPDATE) ||
        has(PRIVILEGES.COURSE_SESSION_ALLOT_SCHEDULE) ||
        has(PRIVILEGES.COURSE_SESSION_ASSIGN_TEACHER) ||
        has(PRIVILEGES.COURSE_SESSION_ASSIGN_EXAMINER) ||
        has(PRIVILEGES.COURSE_SESSION_ASSIGN_SCRUTINIZER) ||
        has(PRIVILEGES.COURSE_SESSION_ASSIGN_RESULT_ACCESS_HOLDER)
      ) {
        courseLinks.push({
          title: 'Assign',
          icon: 'school',
          link: { name: 'AdminCourseAssignPage' }
        })
      }
      if (courseLinks.length > 0) {
        links.push({
          title: 'Courses',
          icon: 'school',
          children: courseLinks
        })
      }

      const dueLinks = []

      const feeLinks = []
      feeLinks.push({
        title: 'Batch Assign',
        icon: 'school',
        link: { name: 'AdminFeeAssignPage' }
      })
      feeLinks.push({
        title: 'Search',
        icon: 'school',
        link: { name: 'AdminFeeSearchPage' }
      })
      if (
        has(PRIVILEGES.LEVEL_CHANGING_FEE_MANAGEMENT) ||
        has(PRIVILEGES.EXAM_FEE_MANAGEMENT) ||
        has(PRIVILEGES.DINING_FEE_MANAGEMENT)
      ) {
        dueLinks.push({
          title: 'Fees',
          icon: 'school',
          children: feeLinks
        })
      }

      const fineLinks = []
      fineLinks.push({
        title: 'Assign',
        icon: 'school',
        link: { name: 'AdminFineAssignPage' }
      })
      fineLinks.push({
        title: 'Search',
        icon: 'school',
        link: { name: 'AdminFineSearchPage' }
      })
      if (
        has(PRIVILEGES.LIBRARY_FINE_MANAGEMENT) ||
        has(PRIVILEGES.LAB_FINE_MANAGEMENT) ||
        has(PRIVILEGES.DISCIPLINARY_FINE_MANAGEMENT)
      ) {
        dueLinks.push({
          title: 'Fines',
          icon: 'school',
          children: fineLinks
        })
      }

      if (dueLinks.length > 0) {
        links.push({
          title: 'Dues',
          icon: 'school',
          children: dueLinks
        })
      }

      links.push({
        title: 'Thesis Clearance',
        icon: 'school',
        link: { name: 'AdminThesisClearance' }
      })

      if (has(PRIVILEGES.SLOT_CREATION) || has(PRIVILEGES.SLOT_UPDATE)) {
        links.push({
          title: 'Slots',
          icon: 'school',
          link: { name: 'AdminSlotManagePage' }
        })
      }

      if (has(PRIVILEGES.CURRENT_SESSION_UPDATE)) {
        links.push({
          title: 'Session',
          icon: 'school',
          link: { name: 'AdminSessionAssignPage' }
        })
      }

      if (has(PRIVILEGES.DEPARTMENT_CREATION) || has(PRIVILEGES.DEPARTMENT_UPDATE)) {
        links.push({
          title: 'Departments',
          icon: 'school',
          link: { name: 'AdminDeptManagePage' }
        })
      }

      if (has(PRIVILEGES.HALL_CREATION) || has(PRIVILEGES.HALL_UPDATE)) {
        links.push({
          title: 'Halls',
          icon: 'school',
          link: { name: 'AdminHallManagePage' }
        })
      }

      this.quickLinks = links
    }
  },
  created() {
    if (this.user) {
      this.buildLinks()
    }
  },
}
</script>
