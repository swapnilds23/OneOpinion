import Controller from '@ember/controller';
import Ember from 'ember';
//import { not } from '@ember/object/computed';
const {
  inject
} = Ember;
export default Controller.extend({
firebaseApp: inject.service(),
  actions:{
    back: function(){
      this.get('store').findAll('viewquiz').then(function(record){
       record.content.forEach(function(rec) {
          Ember.run.once(this, function() {
             rec.deleteRecord();
             rec.save();
          });
       }, this);
    });
    this.transitionToRoute('admin-page')
    }
  }
});
