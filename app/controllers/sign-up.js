  import Controller from '@ember/controller';
import Ember from 'ember';
import { match, not, and } from '@ember/object/computed';
// import {
//   inject
// } from '@ember/service';
const {
  inject
} = Ember;

export default Controller.extend({

  name: '',
  email: '',
  pswd:'',

  //isDisabled:true,
  isValid: match('email', /^.+@.+\..+$/),
  isValid1: match('name', /./),
  isValid2: match('pswd', /./),
//  isValid3: match('pswd1', 'pswd'),

  isFormValid: and('isValid','isValid1','isValid2','isValid3'),

  isDisabled: not('isValid'),

  firebaseApp: inject.service(),

  actions: {
    signUp() {

      // To check type of user
      var emailId = this.get('email')
      var pass = this.get('pswd')
      var name = this.get('name')

      if (emailId.includes('@googlesurvey.com')) {
        var userRole = 'admin'
      } else {
        userRole = 'regular'
      }

      let controller = this;

      //To create user record
      const auth = this.get('firebaseApp').auth();
      const userRef = this.get('firebaseApp').database();
      auth.createUserWithEmailAndPassword(emailId, pass).then((userResponse) => {
        //To store user data in user tree
      userRef.ref('users/'+ userResponse.uid).set({
          username: name,
          email: emailId,
          role: userRole
        });



      });

      controller.set('email', '');
      controller.set('pswd', '');
      controller.set('name', '');
    //  controller.set('pswd1', '');

      //To navigate to login page
      this.transitionToRoute('sign-in')

    }
  }
});
