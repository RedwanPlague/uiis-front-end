<template>
  <div class="container">

    <div class="issue-header">
      <div class="issue-header-row">
        <h4>Marks Discrepancy</h4>
        <q-chip style="margin-top: 56px; margin-left: 20px; " color="teal" text-color="white"  >CSE203: Data Structure & Algorithms-1</q-chip>
      </div>

      <div class="issue-header-row">
        <q-chip class="bg-deep-orange-9"  text-color="white" style="margin-top: 20px" icon="error" size="15px">Unresolved</q-chip>
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

    <user-activity
      :imageLink = slowDecayImage
      user-name="SlowDecay"
      date="June 1"
      activity="created this issue"
    />

    <user-comment
      :imageLink = slowDecayImage
      userName = "SlowDecay"
      date = "June 1"
      comment = "Marks diye dei"
    />

    <user-comment
      :imageLink = mahirSezImage
      userName = "MahirSez"
      date = "June 2"
      comment = "No"
    />

    <user-activity
      :imageLink = mahirSezImage
      user-name="MahirSez"
      date="June 3"
      activity="uptated marks"
    />

    <user-comment
      :imageLink= slowDecayImage
      userName = "SlowDecay"
      date = "June 3"
      comment = "Bleh bleh bleh"
    />
    <editor
      :imageLink= mahirSezImage
      userName="MahirSez"
    />
  </div>
</template>

<script>
import Comment from 'src/components/IssueComponents/Comment';
import Activity from "components/IssueComponents/Activity";
import Editor from "components/IssueComponents/Editor";
export default {
  name: "IssuePage.vue",
  components: {
    'user-comment': Comment,
    'user-activity': Activity,
    'editor': Editor
  },
  data() {
    return {
      slowDecayImage: 'https://avatars.githubusercontent.com/u/31519659?s=80&amp;v=4',
      mahirSezImage: 'https://avatars.githubusercontent.com/u/32516061?s=80&amp;v=4'
    }
  }
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

img {
  border-radius: 50%;
}
.container {
  margin-right: 30px;
}
</style>
