import Controller from '@ember/controller';
import Ember from 'ember';
// import {
//   inject
// } from '@ember/service';
const {
  inject
} = Ember;
export default Controller.extend({
  firebaseApp: inject.service(),
  question:'',
  ans1:'',
  ans2:'',
  ans3:'',
  actions: {
    addQuestion() {

      // To check type of user
      var question = this.get('question')
      var optionA = this.get('optionA')
      var optionB = this.get('optionB')
      var optionC = this.get('optionC')
      var productName= localStorage.getItem('pName');

      const userRef = this.get('firebaseApp').database();
      let controller =this
        //To store user data in user tree
      userRef.ref('question/').child(productName+'/').push({
          question: question,
          optionA: optionA,
          optionB: optionB,
          optionC: optionC
        });

        controller.set('question', '');
        controller.set('optionA', '');
        controller.set('optionB', '');
        controller.set('optionC', '');

    },
    viewQuiz: function(){

      var productName1= localStorage.getItem('pName');
      var prodRef = this.get('firebaseApp').database();
      prodRef.ref('question/').child(productName1+'/').on('value', (snapshot) => {
        var productArray = [];
        productArray = Object.values(snapshot.val());
        for(var i=0;i< productArray.length;i++){
          this.set('question', productArray[i].question)
          this.set('ans1', productArray[i].optionA)
          this.set('ans2', productArray[i].optionB)
          this.set('ans3', productArray[i].optionC)
          var uResponse = this.store.createRecord('viewquiz', {
            question:this.get('question'),
            answer1:this.get('ans1'),
            answer2: this.get('ans2'),
            answer3:this.get('ans3'),
          });
          uResponse.save();
          this.set('question', '')
          this.set('ans1', '')
          this.set('ans2','')
          this.set('ans3', '')
        }
      });
      this.transitionToRoute('viewquiz')
    }
  }
});
