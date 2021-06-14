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


    <div v-for="(issue,index) in issueEntries" :key="index">
      <div v-if="issue.type === 'activity'">
        <user-activity
          :image-link = issue.imageLink
          :user-name = issue.userName
          :date = issue.date
          :activity= issue.activity
        />
      </div>
      <div v-else>
        <user-comment
          :image-link = issue.imageLink
          :user-name = issue.userName
          :date = issue.date
          :comment= issue.comment
        />
      </div>
    </div>

    <editor
      imageLink= 'https://avatars.githubusercontent.com/u/32516061?s=80&amp;v=4'
      userName="MahirSez"
      @submitClicked="appendNewComment"
    />
  </div>
</template>

<script>
import Comment from 'src/components/IssueComponents/Comment';
import Activity from "components/IssueComponents/Activity";
import Editor from "components/IssueComponents/Editor";

const slowDecayImage =  'https://avatars.githubusercontent.com/u/31519659?s=80&amp;v=4';
const mahirSezImage = 'https://avatars.githubusercontent.com/u/32516061?s=80&amp;v=4';

export default {
  name: "IssuePage.vue",
  components: {
    'user-comment': Comment,
    'user-activity': Activity,
    'editor': Editor
  },
  data() {
    return {


      issueEntries: [
        {
          type: 'activity',
          imageLink : slowDecayImage,
          userName: "SlowDecay",
          date: "June 1",
          activity: "created this issue",
        },
        {
          type: 'comment',
          imageLink : slowDecayImage,
          userName: "SlowDecay",
          date: "June 1",
          comment: "Marks diye dei",
        },
        {
          type: 'comment',
          imageLink : mahirSezImage,
          userName: "MahirSez",
          date: "June 2",
          comment: "No",
        },
        {
          type: 'activity',
          imageLink : mahirSezImage,
          userName: "MahirSez",
          date: "June 3",
          activity: "updated Marks",
        },
        {
          type: 'comment',
          imageLink: slowDecayImage,
          userName: "SlowDecay",
          date: "June 3",
          comment: "Bleh bleh bleh",
        }
      ]
    }
  },
  methods: {
    appendNewComment(comment) {
      this.issueEntries.push({
        type: 'comment',
        imageLink: mahirSezImage,
        userName: "MahirSez",
        date: "June 13",
        comment: comment
      })
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
