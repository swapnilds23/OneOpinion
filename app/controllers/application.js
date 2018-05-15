import Controller from '@ember/controller';
import Ember from 'ember';
export default Controller.extend({
  isLoggedIn: false,

  init: function() {
    this._super();
    // Ember.run.schedule("afterRender", this, function() {
    //   this.send("checkl");
    // });
    if (localStorage.getItem("userId")) {
      this.set('isLoggedIn', true)
    } else {
      this.set('isLoggedIn', false)
    }

  }
  ,

  actions: {
    // checkl: function() {
    //   ,
    logout: function(){
      localStorage.removeItem('userId');
        this.set('isLoggedIn', false)
      this.transitionToRoute('sign-in')
    }
  }
});
