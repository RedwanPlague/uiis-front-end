<template>
  <div class ="container-row" >
    <div class="img-left">
      <img v-bind:src='imageLink' width="40" height="40" v-bind:alt='userName'>
    </div>
    <div class="text-bubble">
      <div class="bubble-top-slot">
        <span class="top-icon"><q-icon name="message" style="font-size: 20px;"></q-icon></span>
        <span><b>{{ userName }}</b> commented on {{ date }}</span>
      </div>
      <div class="bubble-down-slot" v-html="comment"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Comment",
  props: {
    imageLink: String,
    userName: String,
    date: String,
    comment: String
  }
}

</script>

<style scoped>

.top-icon {
  margin-right: 10px;
}

img {
  border-radius: 50%;
}

.container-row > div {
  margin-left: 17px;
}

.container-row {
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-left: 30px;
  margin-top: 20px;
  margin-bottom: 20px;
  /*padding-left: -20px;*/
  /*padding-top: 50px;*/
}
.img-left {
  padding-top: 6px;
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

.bubble-top-slot {
  background: #f1f8ff;
  border-bottom: #c8e1ff solid 1px;
  border-radius: 9px 9px 0 0;
  padding-left:10px;
  padding-right:20px;
  line-height: 45px;
}

.bubble-down-slot {
  border-radius: 0 0 9px 9px;
  text-align: left;
  padding: 15px 20px;
}


</style>
