<template>
  <div class="container">

    <div class="issue-header">
      <div class="issue-header-row">
        <h4>{{ issueDetails.title }}</h4>
        <q-chip  v-if="issueDetails.courseSession" style="margin-top: 56px; margin-left: 20px; " color="teal" text-color="white">{{ issueDetails.courseSession.course.courseID }}:
          {{ issueDetails.courseSession.course.title }} </q-chip>
      </div>

      <div class="issue-header-row">
        <q-chip v-if="issueDetails.status === 'unresolved'" class="bg-deep-orange-9"  text-color="white" style="margin-top: 20px" icon="error" size="15px">Unresolved</q-chip>
        <q-chip v-if="issueDetails.status === 'resolved'" class="bg-positive"  text-color="white" style="margin-top: 20px" icon="check_circle" size="15px">Resolved</q-chip>
      </div>

      <div class="issue-header-row" style="margin-top: 10px">
        <div class="header-col-1"><b>Students:</b></div>
        <q-chip v-for="studentID in issueDetails.students" :key="studentID" color="black" text-color="white" square outline >{{ studentID }}</q-chip>
      </div>

      <div class="issue-header-row space-between" style="margin-top: 10px">
        <div  v-if="issueDetails.teachers">
          <span class="header-col-1"><b>Current Audience:</b></span>
          <q-chip v-for="teacher in issueDetails.teachers" :key="teacher._id" color="black" text-color="white" square outline> {{teacher.name}}</q-chip>
        </div>
        <q-btn v-if="issueDetails.issueCreator  && issueDetails.issueCreator.id === user.id" class="resolve-btn" color="teal" label="Mark As Resolved"  icon="check_circle"  no-caps @click="resolveClicked"/>
      </div>
    </div>

    <q-separator class="bg-blue-2" inset="true"/>


    <div v-for="(issue,index) in issueDetails.posts" :key="index">
      <div v-if="issue.postType === 'activity'">
        <user-activity
          image-link = "https://avatars.githubusercontent.com/u/31519659?s=80&amp;v=4"
          :user-name = issue.author.name
          :date = issue.date
          :activity= issue.description
        />
      </div>
      <div v-if="issue.postType === 'comment'">
        <user-comment
          image-link = "https://avatars.githubusercontent.com/u/32516061?s=80&amp;v=4"
          :user-name = issue.author.name
          :date = issue.date
          :comment= issue.description
        />
      </div>
    </div>

    <editor
      imageLink= 'https://avatars.githubusercontent.com/u/32516061?s=80&amp;v=4'
      @submitClicked="addComment"
    />
  </div>
</template>

<script>
import Comment from 'src/components/IssueComponents/Comment';
import Activity from "components/IssueComponents/Activity";
import Editor from "components/IssueComponents/Editor";

import {createNamespacedHelpers} from 'vuex';
import { mapGetters } from 'vuex';
const { mapActions} = createNamespacedHelpers('issues');

const slowDecayImage =  'https://avatars.githubusercontent.com/u/31519659?s=80&amp;v=4';
const mahirSezImage = 'https://avatars.githubusercontent.com/u/32516061?s=80&amp;v=4';

export default {
  name: "IssuePage.vue",
  components: {
    'user-comment': Comment,
    'user-activity': Activity,
    'editor': Editor
  },

  computed: {
    ...mapGetters("issues", {
      issueDetails: 'issueDetails'
    }),
    ...mapGetters(['user'])
  },
  async created() {
    await this.fetchIssueDetails( { issueID: this.$route.params.issueID});
  },
  watch: {
    async '$route.params' (to, from) {
      if(!this.$route.params.issueID ) {
        return;
      }
      await this.fetchIssueDetails( { issueID: this.$route.params.issueID});
    }
  },
  methods: {
    ...mapActions(['fetchIssueDetails', 'sendComment']),

    // fixme: incomplete method
    resolveClicked(e) {
      e.preventDefault();

    },
    async addComment(comment) {
      await this.sendComment({comment});
    }
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
      ],
    }
  }
}

</script>

<style scoped>

.resolve-btn {
  margin-right: 35px;
}

.header-col-1 {
  line-height: 36px;
  margin-right: 10px;
}

.issue-header-row {
  display: flex;
  flex-direction: row;
}
.space-between {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
