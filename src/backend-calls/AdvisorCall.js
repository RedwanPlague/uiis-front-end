const axios = require('axios');
const url = "/teacher/advisor";

class AdvisorCall {
  /* getting advisees */
  static getAdvisees() {
    return new Promise((resolve, reject) => {
      axios.get(url+'/advisees').then((res) => {
        const advisees = res.data;
        resolve(advisees);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  /* getting specific advisee */
  static getAdvisee(id) {
    return new Promise((resolve, reject) => {
      axios.get(url+'/advisees/'+id).then((res) => {
        const advisee = res.data;
        resolve(advisee);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  /* getting specific advisee's specific semester's grades */
  static getGrades(id, level, term) {
    return new Promise((resolve, reject) => {
      axios.get(url+'/advisees/'+id+'/grades', {
        params: {
          level: level,
          term: term
        }
      }).then((res) => {
        const grades = res.data;
        resolve(grades);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  /* getting registrations */
  static getRegistrations() {
    return new Promise((resolve, reject) => {
      axios.get(url+'/registrations').then((res) => {
        const registrations = res.data;
        resolve(registrations);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  /* getting specific advisee's registrations */
  static getSpecificRegistrations(id, level, term) {
    return new Promise((resolve, reject) => {
      axios.get(url+'/registrations/'+id, {
        params: {
          level: level,
          term: term
        }
      }).then((res) => {
        const registrations = res.data;
        resolve(registrations);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  /* approving course registration application */
  static approveRegistration(id) {
    return axios.patch(url+'/registrations/'+id+'/approve');
  }

  /* rejecting course registration application */
  static rejectRegistration(id) {
    return axios.patch(url+'/registrations/'+id+'/reject');
  }
}

export default AdvisorCall;
