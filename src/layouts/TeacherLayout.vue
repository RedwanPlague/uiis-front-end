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


        <q-btn
          round
          color="primary"
          style="font-size: 30px"
          unelevated
          stack
          padding="0px"
          dense>
          <q-icon name="account_circle" style="font-size:60px"></q-icon>
        </q-btn>

        <q-btn-dropdown
          color="primary"
          text-color="white"
          dense
          flat
        >
          <q-list>
            <q-item clickable v-close-popup @click="onItemClick">
              <q-item-section>
                <q-item-label>Photos</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="onItemClick">
              <q-item-section>
                <q-item-label>Videos</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="onItemClick">
              <q-item-section>
                <q-item-label>Articles</q-item-label>
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
        <q-item-label
          header
          class="text-grey-8"
        >
          Teacher Side
        </q-item-label>
        <SidebarOption
          v-for="menuOption in menuOptions"
          :key="menuOption.title"
          v-bind="menuOption"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
  import SidebarOption from "components/SidebarOption";

  const menuOptions = [
    {
      title: 'Classes',
      icon: 'school',
      path: '/teacher/classes'
    },
    {
      title: 'Examining Scripts',
      icon: 'quiz',
      path: '/teacher/examine'
    },
    {
      title: 'Scrutinizing Scripts',
      icon: 'manage_search',
      path: '/teacher/scrutinize'
    },
    {
      title: 'Advisor\'s Corner',
      icon: 'sports_kabaddi',
      path: '/teacher/advisor'
    },
    {
      title: 'Head of Dept Corner',
      icon: 'escalator_warning',
      path: '/teacher/head'
    }
  ];
  const linksData = [];

  export default {
    name: 'MainLayout',
    components: { SidebarOption },
    methods: {
      onItemClick() {

      }
    },
    data () {
      return {
        leftDrawerOpen: false,
        menuOptions
      }
    }
  }
</script>
