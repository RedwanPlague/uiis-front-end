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

    <q-footer elevated class="bg-secondary">
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

        <q-expansion-item :content-inset-level="0.5" icon="class" label="Courses" default-closed>
          <SidebarOption
            v-for="menuOption in menuOptionsCourseTeacher"
            :key="menuOption.title"
            v-bind="menuOption"
          />
        </q-expansion-item>

        <q-expansion-item :content-inset-level="0.5" icon="school" label="Advisor" default-closed>
          <SidebarOption
            v-for="menuOption in menuOptionsAdvisor"
            :key="menuOption.title"
            v-bind="menuOption"
          />
        </q-expansion-item>

        <q-expansion-item :content-inset-level="0.5" icon="school" label="Department Head" default-closed>
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
      </q-list>
    </q-drawer>

    <q-page-container>
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>
  </q-layout>
</template>

<script>
import SidebarOption from "components/SidebarOption";

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
  }
];

const menuOptionsCourseTeacher = [
  {
    title: "Attendance",
    icon: "edit_calendar",
    path: "/teacher/courses"
  },
  {
    title: "Class Evaluation",
    icon: "grading",
    path: "/teacher/courses"
  }
];

const menuOptionsAdvisor = [
  {
    title: "Advisee Information",
    icon: "groups",
    path: "/teacher/advisor"
  },
  {
    title: "Advisee Result",
    icon: "grade",
    path: "/teacher/advisor"
  },
  {
    title: "Course Registration",
    icon: "app_registration",
    path: "/teacher/advisor"
  },
  {
    title: "Conversation",
    icon: "question_answer",
    path: "/teacher/advisor"
  }
];

const menuOptionsHead = [
  {
    title: "Course Registration",
    icon: "app_registration",
    path: "/teacher/head"
  },
  {
    title: "Final Result",
    icon: "dashboard",
    path: "/teacher/head"
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

export default {
  name: "TeacherLayout",
  components: { SidebarOption },
  methods: {
  },
  data() {
    return {
      leftDrawerOpen: false,
      menuOptionsTeacher,
      menuOptionsCourseTeacher,
      menuOptionsAdvisor,
      menuOptionsHead,
      menuOptionsExaminer,
      menuOptionsScrutinizer
    };
  }
};
</script>
