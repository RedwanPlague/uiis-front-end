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
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import QuickLink from "components/QuickLink";
import { mapGetters, mapActions } from 'vuex'

const quickLinks = [
  {
    title: 'Accounts',
    icon: 'school',
    children: [
      {
        title: 'Create',
        icon: 'school',
        link: { name: 'AdminAccountCreationPage' }
      },
      {
        title: 'Search',
        icon: 'school',
        link: { name: 'AdminAccountSearchPage' }
      },
      /*{
        title: 'Edit',
        icon: 'school',
        link: { name: 'AdminAccountEditPage' }
      }*/
    ]
  },
  {
    title: 'Courses',
    icon: 'school',
    children: [
      {
        title: 'Create',
        icon: 'school',
        link: { name: 'AdminCourseCreationPage' }
      },
      {
        title: 'Search',
        icon: 'school',
        link: { name: 'AdminCourseSearchPage' }
      },
      {
        title: 'Assign',
        icon: 'school',
        link: { name: 'AdminCourseAssignmentPage' }
      },
    ]
  },
  {
    title: 'Slots',
    icon: 'school',
    link: { name: 'AdminSlotCreationPage' }
  },
  {
    title: 'Session',
    icon: 'school',
    link: { name: 'AdminSessionAssignmentPage' }
  },
  {
    title: 'Docs2',
    icon: 'school',
    children: [
      {
        title: 'Docs4',
        icon: 'school',
        link: 'https://quasar.dev'
      },
      {
        title: 'Docs5',
        icon: 'school',
        link: 'https://quasar.dev'
      },
      {
        title: 'Docs6',
        icon: 'school',
        children: [
          {
            title: 'Docs7',
            icon: 'school',
            link: 'https://quasar.dev'
          },
          {
            title: 'Docs8',
            icon: 'school',
            link: 'https://quasar.dev'
          },
          {
            title: 'Docs9',
            icon: 'school',
            link: 'https://quasar.dev'
          },
        ]
      },
    ]
  },
  {
    title: 'Docs3',
    icon: 'school',
    link: 'https://quasar.dev'
  },
];

export default {
  name: 'AdminLayout',
  data() {
    return {
      leftDrawerOpen: false,
      quickLinks,
    }
  },
  components: {
    QuickLink
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  methods: {
    ...mapActions([
      'userLogOut'
    ])
  }
}
</script>
