<template>
  <q-layout view="lhh Lpr lff">
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

        <q-btn-dropdown v-if="user" icon="person" color="primary" text-color="white" :label="user.name" dense flat no-caps>
          <q-list>
            <q-item clickable v-close-popup @click="$router.replace('/teacher/profile')" dense>
              <q-item-section>
                <q-item-label>
                  <q-avatar icon="account_circle"/>
                  Profile
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="$router.replace('/')" dense>
              <q-item-section>
                <q-item-label>
                  <q-avatar icon="logout"/>
                  Logout
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <!--
      <q-footer elevated fixed class="bg-secondary">
        <q-toolbar>
          <q-toolbar-title>
            XYZ University of Engineering and Technology
          </q-toolbar-title>
        </q-toolbar>
      </q-footer>
    -->

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
      style="font-weight: bold"
    >
      <q-list>
        <q-item-label header class="text-grey-8">
          Teacher Side
        </q-item-label>

        <div v-if="isMenuOptionsLoaded">
          <SidebarOption
            v-for="menuOption in menuOptionsTeacher"
            :key="menuOption.title"
            v-bind="menuOption"
          />

          <q-expansion-item v-if="isAdvisor" :content-inset-level="0.5" icon="supervisor_account" label="Advisor" default-closed>
            <SidebarOption
              v-for="menuOption in menuOptionsAdvisor"
              :key="menuOption.title"
              v-bind="menuOption"
            />
          </q-expansion-item>

          <q-expansion-item v-if="this.getHead.head === user.id" :content-inset-level="0.5" icon="supervised_user_circle" label="Department Head" default-closed>
            <SidebarOption
              v-for="menuOption in menuOptionsHead"
              :key="menuOption.title"
              v-bind="menuOption"
            />
          </q-expansion-item>

          <SidebarOption
            v-if="roles.includes('examiner')"
            v-for="menuOption in menuOptionsExaminer"
            :key="menuOption.title"
            v-bind="menuOption"
          />

          <SidebarOption
            v-if="roles.includes('scrutinizer')"
            v-for="menuOption in menuOptionsScrutinizer"
            :key="menuOption.title"
            v-bind="menuOption"
          />
          <SidebarOption
            v-if="roles.includes('internal')"
            v-for="menuOption in menuOptionsInternal"
            :key="menuOption.title"
            v-bind="menuOption"
          />
          <SidebarOption
            v-for="menuOption in menuOptionsIssues"
            :key="menuOption.title"
            v-bind="menuOption"
          />
          <SidebarOption
            v-if="roles.includes('eco')"
            v-for="menuOption in menuOptionsEco"
            :key="menuOption.title"
            v-bind="menuOption"
          />
        </div>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
      <!--<keep-alive>

      </keep-alive>-->
    </q-page-container>
  </q-layout>
</template>

<script>
import SidebarOption from "components/SidebarOption";

import { mapGetters, mapActions } from 'vuex';
import { api } from "boot/axios";

const menuOptionsTeacher = [
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
  }
];

const menuOptionsAdvisor = [
  {
    title: "Advisee Information",
    icon: "groups",
    path: "/teacher/advisor/advisee_selection"
  },
  {
    title: "Course Registration",
    icon: "app_registration",
    path: "/teacher/advisor/course_registration"
  }
];

const menuOptionsHead = [
  {
    title: "Course Registration",
    icon: "app_registration",
    path: "/teacher/head/course_registration"
  },
  {
    title: "Result Evaluation",
    icon: "dashboard",
    path: "/teacher/head/result_evaluation"
  }
];

const menuOptionsExaminer = [
  {
    title: "Examiner",
    icon: "quiz",
    path: "/teacher/examiner"
  }
];

const menuOptionsScrutinizer = [
  {
    title: "Scrutinizer",
    icon: "check_circle_outline",
    path: "/teacher/scrutinizer"
  }
];

const menuOptionsInternal = [
  {
    title: "Gradesheet Preparer",
    icon: "check_circle",
    path: "/teacher/gradesheet-preparer"
  }
];

const menuOptionsIssues = [
  {
    title: "Issue Corner",
    icon: "error",
    path: "/teacher/issues"
  }
];

const menuOptionsEco = [
  {
    title: "Exam Comptroller",
    icon: 'verified',
    path: '/teacher/eco'
  }
];

export default {
  name: "TeacherLayout",

  components: {
    SidebarOption
  },

  data() {
    return {
      isMenuOptionsLoaded: false,

      leftDrawerOpen: false,

      roles: [],

      isAdvisor: false,

      /* sidebar menu options */
      menuOptionsTeacher,
      menuOptionsAdvisor,
      menuOptionsHead,
      menuOptionsExaminer,
      menuOptionsScrutinizer,
      menuOptionsInternal,
      menuOptionsIssues,
      menuOptionsEco
    };
  },

  computed: mapGetters(['user', 'getHead']),

  methods: {
    ...mapActions(['fetchHead'])
  },

  async created() {
    try {
      if(this.user) {
        await this.fetchHead(this.user.department);
        this.roles = (await api.get('/teacher/roles/whoami')).data;
        this.isAdvisor = ((await api.get('/teacher/advisor/advisees')).data.length !== 0);
      }

      this.isMenuOptionsLoaded = true;
    } catch(error) {
      console.log(error);
    }
  }
};
</script>

<style scoped>

</style>
