<template>
  <q-layout view="lHh Lpr lff">
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
          UIIS
        </q-toolbar-title>

        <q-btn-dropdown
          flat
          dense
          no-caps
          v-if="user"
          color="primary"
          text-color="white"
          :label="user.name"
        >
          <q-list>
            <q-item
              dense
              clickable
              v-close-popup
              @click="$router.replace('/student/profile')"
            >
              <q-item-section>
                <q-item-label>
                  <q-avatar icon="account_circle"/>
                  Profile
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item
              dense
              clickable
              v-close-popup
              @click="$router.replace('/')"
            >
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

    <q-footer elevated fixed class="bg-secondary">
      <q-toolbar>
        <q-toolbar-title>
          Footer
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
      style="font-weight: bold"
    >
      <q-list>
        <q-item-label header class="text-grey-8">
          Student Side
        </q-item-label>

        <SidebarOption
          v-for="menuOption in menuOptions"
          :key="menuOption.title"
          v-bind="menuOption"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters } from 'vuex';

import SidebarOption from "components/SidebarOption";

const menuOptions = [
  {
    title: "Home",
    icon: "home",
    path: "/student"
  },
  {
    title: "Profile",
    icon: "account_circle",
    path: "/student/profile"
  },
  {
    title: "Course Registration",
    icon: "how_to_reg",
    path: "/student/course_registration"
  },
  {
    title: "View Grades",
    icon: "grading",
    path: "/student/semester_selection"
  },
  {
    title: 'Dues',
    icon: 'school',
    path: '/student/dues'
  }
];

export default {
  name: "StudentLayout",

  components: {
    SidebarOption
  },

  computed: {
    ...mapGetters(['user']),
  },

  methods: {

  },

  data() {
    return {
      leftDrawerOpen: false,
      menuOptions
    };
  }
};
</script>

<style scoped>

</style>
