<template>
  <div class="container">

    <div class="issue-header">
      <div class="issue-header-row">
        <h4>Marks Discrepancy</h4>
        <q-chip style="margin-top: 56px; margin-left: 20px; " color="teal" text-color="white"  >CSE203: Data Structure & Algorithms-1</q-chip>
      </div>


      <div class="issue-header-row">
        <q-chip class="bg-deep-orange-9"  text-color="white" style="margin-top: 20px" icon="error" size="15px">Unresolved</q-chip>
<!--        <div class="header-col-issue-creator"><b>SlowDecay</b> created an issue on June 1</div>-->
      </div>

      <div class="issue-header-row" style="margin-top: 10px">
        <div class="header-col-1"><b>Students:</b></div>
        <q-chip color="black" text-color="white" square outline >1605001</q-chip>
        <q-chip color="black" text-color="white" square outline>1605002</q-chip>
      </div>

      <div class="issue-header-row" style="margin-top: 10px">
        <div class="header-col-1"><b>Current Audience:</b></div>
          <q-chip color="black" text-color="white" removable square outline>Teacher-1</q-chip>
          <q-chip color="black" text-color="white" removable square outline>SlowDecay</q-chip>
          <q-chip color="black" text-color="white" removable square outline>Mahirsez</q-chip>

          <q-btn class="resolve-btn" color="teal" label="Mark As Resolved"  icon="check_circle"  no-caps/>
        </div>
      </div>

    <q-separator class="bg-blue-2" inset="true"/>

    <div class ="container-row" >
      <div class="img-left">
        <img src="https://avatars.githubusercontent.com/u/31519659?s=80&amp;v=4" width="40" height="40" alt="@MahirSez">
      </div>
      <div class="text-bubble">
        <div class="bubble-single-slot"><b>SlowDecay</b> created this issue on June 1</div>
      </div>
    </div>

    <div class ="container-row" >
      <div class="img-left">
        <img src="https://avatars.githubusercontent.com/u/31519659?s=80&amp;v=4" width="40" height="40" alt="@MahirSez">
      </div>
      <div class="text-bubble">
        <div class="bubble-top-slot"><b>SlowDecay</b> commented on June 1</div>
        <div class="bubble-down-slot">Marks diye dei</div>
      </div>
    </div>


    <div class ="container-row" >
      <div class="img-left">
        <img src="https://avatars.githubusercontent.com/u/32516061?s=80&amp;v=4" width="40" height="40" alt="@MahirSez">
      </div>
      <div class="text-bubble">
        <div class="bubble-top-slot"><b>MahirSez</b> commented on June 2</div>
        <div class="bubble-down-slot">No</div>
      </div>
    </div>

    <div class ="container-row" >
      <div class="img-left">
        <img src="https://avatars.githubusercontent.com/u/32516061?s=80&amp;v=4" width="40" height="40" alt="@MahirSez">
      </div>
      <div class="text-bubble">
        <div class="bubble-single-slot"><b>MahirSez</b> updated marks on June 3</div>
      </div>
    </div>

    <div class ="container-row" >
      <div class="img-left">
        <img src="https://avatars.githubusercontent.com/u/31519659?s=80&amp;v=4" width="40" height="40" alt="@MahirSez">
      </div>
      <div class="text-bubble">
        <div class="bubble-top-slot"><b>SlowDecay</b> commented on June 1</div>
        <div class="bubble-down-slot">Bleh bleh bleh</div>
      </div>
    </div>



    <div class="container-row" style="margin-bottom: 50px">
      <div class="img-left">
        <img src="https://avatars.githubusercontent.com/u/32516061?s=80&amp;v=4" width="40" height="40" alt="@MahirSez">
      </div>
      <div class="text-bubble button-row">
        <div class="bubble-top-slot">Add a comment:</div>
        <div class="bubble-down-slot">
          <q-editor class="text-editor" v-model="editor" min-height="5rem" />
        </div>
        <q-btn  style="margin-left: 900px; " color="blue-4" label="Comment" no-caps/>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: "IssuePage.vue"
}
</script>

<style scoped>

.resolve-btn {
  margin-left: 420px;
}

.header-col-1 {
  line-height: 36px;
  margin-right: 10px;
}

.header-col-issue-creator {
  line-height: 72px;
  margin-left: 15px;
}

.issue-header-row {
  display: flex;
  flex-direction: row;
}

h4 {
  margin-bottom: 0;
  margin-top: 40px;
}
.issue-header {
  margin-left: 50px;
  margin-bottom: 16px;
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
.container {
  margin-right: 30px;
}
.bubble-top-slot {
  background: #f1f8ff;
  border-bottom: #c8e1ff solid 1px;
  border-radius: 9px 9px 0 0;
  padding-left:20px;
  line-height: 45px;
}
.bubble-single-slot {
  background: #f1f8ff;
  /*border-bottom: #c8e1ff solid 1px;*/
  border-radius: 9px 9px 9px 9px;
  padding-left:20px;
  line-height: 50px;
}
.bubble-down-slot {
  border-radius: 0 0 9px 9px;
  text-align: left;
  padding-left:20px;
  line-height: 50px;
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
