<template>
  <div class ="container-row" >
    <div class="img-left">
      <img v-bind:src='imageLink' width="40" height="40" v-bind:alt='userName'>
    </div>
    <div class="text-bubble">
      <div class="bubble-single-slot">
        <span class="top-icon"><q-icon :name="topSlotIcon" style="font-size: 20px" ></q-icon></span>
        <span><b>{{userName}}</b> {{ activity }} on {{date}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Activity",
  props: {
    imageLink: String,
    userName: String,
    date: String,
    activity: String
  },
  created() {
    const activityType = this.activity.split(' ')[0];
    if(activityType === 'has') this.topSlotIcon = 'edit';
    else if(activityType === 'reopened') this.topSlotIcon = 'report_gmailerrorred';
    else if(activityType === 'created') this.topSlotIcon = 'note_add';
    else if(activityType === 'closed') this.topSlotIcon = 'done_all';
  },
  date() {
    return {
      topSlotIcon: '',
      iconSize : '',
    }
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
.bubble-single-slot {
  background: #f1f8ff;
  /*border-bottom: #c8e1ff solid 1px;*/
  border-radius: 9px 9px 9px 9px;
  padding-left:10px;
  line-height: 50px;
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


</style>
