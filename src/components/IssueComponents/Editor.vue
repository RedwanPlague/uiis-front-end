<template>
  <div class="container-row" >
    <div class="img-left">
      <img v-bind:src='imageLink' width="40" height="40" alt='user'>
    </div>
    <div class="text-bubble button-row">
      <div class="bubble-top-slot">Add a comment:</div>
      <div class="bubble-down-slot">
        <q-editor toolbar-toggle-color="blue" class="text-editor" v-model="editorText" min-height="5rem" />
      </div>
      <q-btn  style="margin-left: 900px; " color="blue-4" label="Comment" no-caps @click="submitButtonClicked" :disable="!editorText"/>
    </div>

  </div>
</template>

<script>

export default {
  name: "Editor",
  props: {
    imageLink: String,
  },
  methods: {
    submitButtonClicked(event) {
      this.$emit('submitClicked', this.editorText);
      this.editorText = '';
    }
  },
  data() {
    return {
      editorText: '',
      items: [
        {
          value: 'SlowDecay',
          label: 'SlowDecay',
        },
        {
          value: 'MahirSez',
          label: 'MahirSez',
        },
      ],
    }
  }
}
</script>

<style scoped>


h4 {
  margin-bottom: 0;
  margin-top: 40px;
}

.text-editor {
  margin-left:-20px;
}

.img-left {
  padding-top: 6px;
}

img {
  border-radius: 50%;
}

.bubble-top-slot {
  background: #f1f8ff;
  border-bottom: #c8e1ff solid 1px;
  border-radius: 9px 9px 0 0;
  padding-left:20px;
  line-height: 45px;
}

.bubble-down-slot {
  border-radius: 0 0 9px 9px;
  text-align: left;
  padding-left:20px;
  /*line-height: 50px;*/
}

.button-row {
  display: flex;
  flex-direction: column;

}
.container-row {
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-left: 30px;
  margin-top: 20px;
  margin-bottom: 50px
  /*padding-left: -20px;*/
  /*padding-top: 50px;*/

}
.container-row > div {
  margin-left: 17px;
}
.text-bubble {
  position: relative;
  background: #ffffff;
  color: #000000;
  width: 1000px;
  border-radius: 9px;
  /*margin-left: -90px;*/
  border: #c8e1ff solid 1px;
}
.text-bubble:after {
  content: '';
  position: absolute;
  display: block;
  width: 0;
  z-index: 1;
  border-style: solid;
  border-color: transparent #f1f8ff;
  border-width: 11px 12px 11px 0;
  top: 25px;
  left: -12px;
  margin-top: -11px;
}
.text-bubble:before {
  content: '';
  position: absolute;
  width: 0;
  z-index: 0;
  border-style: solid;
  border-color: transparent #c8e1ff;
  border-width: 12px 13px 12px 0;
  top: 25px;
  left: -13.5px;
  margin-top: -12px;
  display: block;
}
</style>

