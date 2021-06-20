<template>
  <div>
    <q-expansion-item
      v-if="children"
      :label="title"
      :icon="icon"
      :content-inset-level="0.5"
      :default-opened="isActive"
    >
      <quick-link v-for="child in children" :key="child.title" v-bind="child"/>
    </q-expansion-item>

    <q-item v-else clickable v-ripple :to="link" exact exact-active-class="text-bold">
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
const findRecursive = (quickLink, routeName) => {
  if (quickLink.hasOwnProperty('children')) {
    for (const child of quickLink.children) {
      if (findRecursive(child, routeName)) {
        return true
      }
    }
    return false
  }
  return quickLink.link.name === routeName
}

export default {
  name: 'QuickLink',
  props: {
    title: {
      type: String,
      default: ''
    },
    link: {
      type: [Object, String],
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
  },
  computed: {
    isActive() {
      return findRecursive({
        link: this.link,
        children: this.children,
      }, this.$route.name)
    }
  }
}
</script>

<style scoped>
</style>
