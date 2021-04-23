<template>
  <div>
    <q-expansion-item v-if="children" :label="title" :icon="icon" :content-inset-level="0.5">
      <quick-link v-for="child in children" :key="child.title" v-bind="child"/>
    </q-expansion-item>

    <q-item v-else clickable v-ripple :to="link" exact-active-class="text-bold">
      <q-item-section v-if="icon" avatar>
        <q-icon :name="icon"/>
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ title }}</q-item-label>
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
export default {
  name: 'QuickLink',
  props: {
    title: {
      type: String,
      required: true
    },
    link: {
      type: Object,
      default() {
        return { name: 'ErrorPage' }
      }
    },
    icon: {
      type: String,
      default: ''
    },
    children: {
      type: Array,
      default: null
    }
  }
}
</script>

<style scoped>
</style>
