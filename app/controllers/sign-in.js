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

  email_login: '',
  pswd_login: '',
  isError:false,
  //isDisabled:true,
  isValid: match('email_login', /^.+@.+\..+$/),
  isValid1: match('pswd_login', /./),

  isFormValid: and('isValid','isValid1'),

  isDisabled: not('isValid'),
  firebaseApp: inject.service(),

  message:'',


  actions: {


    signIn() {

      let controller = this;
      var emailId = this.get('email_login')
      var pass = this.get('pswd_login')
      var userRole = ''
      //To create user record
      const auth = this.get('firebaseApp').auth();

      auth.signInWithEmailAndPassword(emailId, pass).then((response, error) => {
        //To store user id in local storage
        localStorage.setItem('userId', response.uid)
        //To clear text fields
        controller.set('email_login', '')
        controller.set('pswd_login', '')
        var userRef = this.get('firebaseApp').database();
        var uid = localStorage.getItem('userId')

        userRef.ref('users/' + uid).on('value', function(snapshot) {
          userRole = snapshot.val().role
          if (userRole == 'admin') {
            //  location.reload()
            this.transitionToRoute('admin-page').then(() => {
              location.reload();
            });
          } else if (userRole == 'regular') {

            this.transitionToRoute('user-page').then(() => {
              location.reload();
            });
            //location.reload()
          }
        }.bind(this));

      }).catch(function(error) {
        controller.set('email_login', '')
        controller.set('pswd_login', '')
        controller.set('isError',true)
        controller.set('isLoggedIn',true)
});
    }
  }
});
