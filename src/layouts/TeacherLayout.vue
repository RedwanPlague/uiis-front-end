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
          UIIS
        </q-toolbar-title>

        <!--
          <q-btn
            round
            color="primary"
            style="font-size: 30px"
            unelevated
            stack
            padding="0px"
            dense
          >
            <q-icon name="account_circle" style="font-size:60px"></q-icon>
          </q-btn>
        -->

        <q-btn-dropdown color="primary" text-color="white" dense flat>
          <q-list>
            <q-item clickable v-close-popup @click="$router.replace('/teacher/profile')">
              <q-item-section>
                <q-item-label>Profile</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="$router.replace('/')">
              <q-item-section>
                <q-item-label>Logout</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
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
          Teacher Side
        </q-item-label>
        <SidebarOption
          v-for="menuOption in menuOptions"
          :key="menuOption.title"
          v-bind="menuOption"
        />
      </q-list>
    </q-drawer>

    <q-footer elevated class="bg-secondary">
      <q-toolbar>
        <q-toolbar-title>
          Footer
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

    <q-page-container>
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>
  </q-layout>
</template>

<script>
import SidebarOption from "components/SidebarOption";

const menuOptions = [
  {
    title: "Home",
    icon: "home",
    path: "/teacher"
  },
  {
    title: "Profile",
    icon: "account_circle",
    path: "/teacher/profile"
  },
  {
    title: "Courses",
    icon: "class",
    path: "/teacher/courses"
  },
  {
    title: "Advisor",
    icon: "school",
    path: "/teacher/advisor"
  },
  {
    title: "Department Head",
    icon: "school",
    path: "/teacher/head"
  },
  {
    title: "Examiner",
    icon: "quiz",
    path: "/teacher/examiner"
  },
  {
    title: "Scrutinizer",
    icon: "auto_stories",
    path: "/teacher/scrutinizer"
  }
];

export default {
  name: "MainLayout",
  components: { SidebarOption },
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
