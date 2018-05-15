// import Controller from '@ember/controller';
//
// export default Controller.extend({
//   actions:{
//     startQuiz:function(name){
//       localStorage.setItem('pName', name);
//       this.transitionToRoute('questionset')
//     }
//   }
// });
import Controller from '@ember/controller';
import Ember from 'ember';
const {
  inject
} = Ember;
export default Controller.extend({

  firebaseApp: inject.service(),
  uRole:'',

  init() {
    this._super()
    var user = localStorage.getItem('userId');
    var userRef = this.get('firebaseApp').database();
    userRef.ref('users/' + user).on('value', (snapshot) => {
      var productArray = [];
      productArray = Object.values(snapshot.val());
      //console.log(productArray[1])
       this.set('uRole', productArray[1])
       if(this.get('uRole') == 'regular'){
        this.set('isUser',true)
       }
    }) ;

  },
  actions: {
    startQuiz: function(name) {
      localStorage.setItem('pName', name);
      this.transitionToRoute('questionset')
    },
    createQuiz: function(name) {
      localStorage.setItem('pName', name);
      this.transitionToRoute('quiz')
    },
    report: function(name) {
      localStorage.setItem('pName', name);
      this.transitionToRoute('graph')
    }
  }
});
