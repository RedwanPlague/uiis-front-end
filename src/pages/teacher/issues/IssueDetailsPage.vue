<template>
  <div class="container" v-show="pageLoaded">

    <div class="issue-header">
      <div class="issue-header-row">
        <h4>{{ issueDetails.title }}</h4>
        <q-btn v-if="issueDetails.courseSession" :label="issueDetails.courseSession.course.courseID +  ': ' +  issueDetails.courseSession.course.title"  icon-right="mdi-open-in-new" style="height: 35px; margin-top: 52px; margin-left: 20px;" color="teal" text-color="white" @click="courseChipClicked" no-caps/>
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
        <q-btn v-if="issueDetails.issueCreator  && issueDetails.issueCreator._id === user.id" :disable="buttonLoading" class="resolve-btn" color="teal" :label="resolveButtonText"  :icon="resolveButtonIcon"  no-caps @click="resolveClicked"/>
      </div>
    </div>

    <q-separator class="bg-blue-2 separator" inset="true"/>


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

    <q-dialog v-model="resolveFlag" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">Are you sure you want to {{resolveButtonText.toLowerCase()}}?</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat :label="resolveButtonText" color="primary" v-close-popup @click="submitButtonClicked"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import Comment from 'components/IssueComponents/Comment';
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
    this.pageLoaded =  false;
    this.$q.loading.show({
      delay: 100, // ms
      message: 'Loading...',
      messageColor: 'white'
    });
    await this.fetchIssueDetails( { issueID: this.$route.params.issueID});
    this.setPageVariables();
    this.$q.loading.hide();
    this.pageLoaded =  true;
  },
  watch: {
    async '$route.params' (to, from) {
      if(!this.$route.params.issueID ) {
        return;
      }
      await this.fetchIssueDetails( { issueID: this.$route.params.issueID});
      this.setPageVariables();
    }
  },
  methods: {
    ...mapActions(['fetchIssueDetails', 'sendComment', 'changeIssueStatus']),

    courseChipClicked(e) {
      if(this.issueDetails.role === 'course') {
        const routeData = this.$router.resolve( {
          name: 'course_page',
          params: {
            courseID: this.issueDetails.courseSession.course.courseID,
            courseSession: 2021
          }
        });
        window.open(routeData.href, '_blank');
      }
      else if(this.issueDetails.role === 'examiner') {
        const routeData = this.$router.resolve( {
          name: 'examiner-evaluation-page',
          params: {
            courseID: this.issueDetails.courseSession.course.courseID,
            part: this.issueDetails.part
          }
        });
        window.open(routeData.href, '_blank');
      }
      else if(this.issueDetails.role === 'scrutinizer') {
        // const initLabel = this.issueDetails.part === '-' ? `teacher-${this.issueDetails.evalOwner._id}` : `examiner-${this.issueDetails.part}-${this.issueDetails.evalOwner._id}`;
        const routeData = this.$router.resolve( {
          name: 'scrutinizer-course-page',
          params: {
            courseID: this.issueDetails.courseSession.course.courseID,
          }
        });
        console.log(routeData);
        window.open(routeData.href, '_blank');
      }
      else if(this.issueDetails.role === 'internal') {
        // const initLabel = this.issueDetails.part === '-' ? `teacher-${this.issueDetails.evalOwner._id}` : `examiner-${this.issueDetails.part}-${this.issueDetails.evalOwner._id}`
        const routeData = this.$router.resolve( {
          name: 'internal-course-page',
          params: {
            courseID: this.issueDetails.courseSession.course.courseID,
          }
        });
        console.log(routeData);
        window.open(routeData.href, '_blank');
      }
      else {
        console.log(this.issueDetails.role);
        console.log("Not found");

      }
    },
    setPageVariables() {

      if(this.issueDetails.status === 'unresolved') {
        this.resolveButtonIcon= 'check_circle';
        this.resolveButtonText= 'Mark As Resolved';
      }
      else  {
        this.resolveButtonText = 'Reopen Issue';
        this.resolveButtonIcon = 'replay';
      }
    },
    resolveClicked(e) {
      e.preventDefault();
      this.resolveFlag = true;
    },
    async submitButtonClicked(e) {
      e.preventDefault();

      const notif = this.$q.notify({
        message: 'Updating...',
        position: "bottom-left",
        group: false, // required to be updatable
        timeout: 0, // we want to be in control when it gets dismissed
        spinner: true,
      });
      this.resolveFlag = false;

      this.buttonLoading = true;
      await this.changeIssueStatus();
      this.setPageVariables();
      this.buttonLoading = false;

      notif({
        icon: 'done', // we add an icon
        spinner: false, // we reset the spinner setting so the icon can be displayed
        message: 'Updated',
        timeout: 1500 // we will timeout it in 2.5s
      });

    },
    async addComment(comment) {

      const notif = this.$q.notify({
        message: 'Updating...',
        position: "bottom-left",
        group: false, // required to be updatable
        timeout: 0, // we want to be in control when it gets dismissed
        spinner: true,
      });
      await this.sendComment({comment});

      notif({
        icon: 'done', // we add an icon
        spinner: false, // we reset the spinner setting so the icon can be displayed
        message: 'Updated',
        timeout: 1500 // we will timeout it in 2.5s
      });
    }
  },
  data() {
    return {
      pageLoaded: '',
      buttonLoading: false,

      resolveButtonIcon: '',
      resolveButtonText: '',
      resolveFlag: false,
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

.separator {
  margin-top: 20px;
  margin-bottom: 20px;
}

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
