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

        <q-btn-dropdown v-if="user" color="primary" text-color="white" :label="user.name" dense flat no-caps>
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
          Teacher Side
        </q-item-label>

        <SidebarOption
          v-for="menuOption in menuOptionsTeacher"
          :key="menuOption.title"
          v-bind="menuOption"
        />

        <q-expansion-item :content-inset-level="0.5" icon="school" label="Advisor" default-closed>
          <SidebarOption
            v-for="menuOption in menuOptionsAdvisor"
            :key="menuOption.title"
            v-bind="menuOption"
          />
        </q-expansion-item>

        <q-expansion-item v-if="this.getHead.head === user.id" :content-inset-level="0.5" icon="school" label="Department Head" default-closed>
          <SidebarOption
            v-for="menuOption in menuOptionsHead"
            :key="menuOption.title"
            v-bind="menuOption"
          />
        </q-expansion-item>

        <SidebarOption
          v-for="menuOption in menuOptionsExaminer"
          :key="menuOption.title"
          v-bind="menuOption"
        />

        <SidebarOption
          v-for="menuOption in menuOptionsScrutinizer"
          :key="menuOption.title"
          v-bind="menuOption"
        />
        <SidebarOption
          v-for="menuOption in menuOptionsIssues"
          :key="menuOption.title"
          v-bind="menuOption"
        />
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
  },
  {
    title: "Conversation",
    icon: "question_answer",
    path: "/teacher/advisor/conversation"
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
    icon: "auto_stories",
    path: "/teacher/scrutinizer"
  }
];

const menuOptionsIssues = [
  {
    title: "Result Issues",
    icon: "error",
    path: "/teacher/issues"
  }
];

export default {
  name: "TeacherLayout",

  components: {
    SidebarOption
  },

  data() {
    return {
      leftDrawerOpen: false,

      /* sidebar menu options */
      menuOptionsTeacher,
      menuOptionsAdvisor,
      menuOptionsHead,
      menuOptionsExaminer,
      menuOptionsScrutinizer,
      menuOptionsIssues
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
      }
    } catch(error) {
      console.log(error);
    }
  }
};
</script>

<style scoped>

</style>
