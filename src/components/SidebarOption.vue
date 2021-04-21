<template>
    <q-item clickable v-ripple :to="path" exact>
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
  export default {
    name: 'EssentialLink',
    props: {
      title: {
        type: String,
        required: true
      },
      path: {
        type: String,
        default: '#'
      },
      icon: {
        type: String,
        default: ''
      }
    }
  }
</script>
