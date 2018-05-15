import Controller from '@ember/controller';
import Ember from 'ember';
//import { not } from '@ember/object/computed';
const {
  inject
} = Ember;
export default Controller.extend({
  firebaseApp: inject.service(),
  count: 0,
  answer: '',
  isStart: true,
  message:'',
  productName:'',

  actions: {
    start() {
      this.set('productName',   localStorage.getItem('pName'))
      var prodRef = this.get('firebaseApp').database();
      prodRef.ref('question/').child(this.get('productName')).on('value', (snapshot) => {
        var productArray = [];
        productArray = Object.values(snapshot.val());
        this.set('isClicked', true)
        this.set('number', 'Q1.')
        this.set('question', productArray[0].question)
        this.set('optionA', productArray[0].optionA)
        this.set('optionB', productArray[0].optionB)
        this.set('optionC', productArray[0].optionC)
        this.set('ansA', productArray[0].optionA)
        this.set('ansB', productArray[0].optionB)
        this.set('ansC', productArray[0].optionC)
        this.set('isNext', true)
        this.set('isStart', false)
      })

    },
    next() {
        //var isDisabled=not(this.answer)
        //console.log('disabled Object='+isDisabled);
             // if(!this.answer){
             //   alert('Clicked Next:'+this.set('isDisabled',true));
             //   //this.get('target.router').refresh();
             //    //this.set('message','Please select valid option');
             //    //alert('Clicked Next:'+this.set('isDisabled',true)+this.isClicked);
             //    //isDisabled: not(this.answer);
             //
             //  }
             //  else if(this.isClicked){
             //    alert('In else'+this.answer);
             //  this.set('isDisabled',false);
              this.set('count', this.get('count') + 1)
              var prodRef = this.get('firebaseApp').database();
              prodRef.ref('question/').child(this.get('productName')).on('value', (snapshot) => {
              var productArray = [];
              productArray = Object.values(snapshot.val())

              if (productArray.length - 1 > this.get('count')) {
                  this.set('isClicked', true)
                  this.set('number', 'Q' + (this.get('count') + 1) + '.')
                  this.set('question', productArray[this.get('count')].question)
                  this.set('optionA', productArray[this.get('count')].optionA)
                  this.set('optionB', productArray[this.get('count')].optionB)
                  this.set('optionC', productArray[this.get('count')].optionC)
                  this.set('ansA', productArray[this.get('count')].optionA)
                  this.set('ansB', productArray[this.get('count')].optionB)
                  this.set('ansC', productArray[this.get('count')].optionC)

                  var uResponse = this.store.createRecord('response', {
                    productName: this.get('productName'),
                    answer: this.get('answer'),
                    qNo: this.get('count'),

                  });
                  uResponse.save();
                  this.set('answer', '')

                }
                else if (productArray.length - 1 == this.get('count')) {
                  this.set('isClicked', true)
                  this.set('isEnd', true)
                  this.set('isNext', false)
                  this.set('number', 'Q' + (this.get('count') + 1) + '.')
                  this.set('question', productArray[this.get('count')].question)
                  this.set('optionA', productArray[this.get('count')].optionA)
                  this.set('optionB', productArray[this.get('count')].optionB)
                  this.set('optionC', productArray[this.get('count')].optionC)
                  this.set('ansA', productArray[this.get('count')].optionA)
                  this.set('ansB', productArray[this.get('count')].optionB)
                  this.set('ansC', productArray[this.get('count')].optionC)

                  var uresponse = this.store.createRecord('response', {
                    productName: this.get('productName'),
                    answer: this.get('answer'),
                    qNo: this.get('count'),

                  });
                  uresponse.save();
                  this.set('answer', '')
                }
              });
            },
    end() {
      this.set('number', '')
      this.set('question', '')
      this.set('optionA', '')
      this.set('optionB', '')
      this.set('optionC', '')
      this.set('ansA', '')
      this.set('ansB', '')
      this.set('ansC', '')
      this.set('isEnd', false)
      this.set('isClicked', false)
      this.set('message', 'Thank you for submitting your survey')
      var uresponse = this.store.createRecord('response', {
        productName: this.get('productName'),
        answer: this.get('answer'),
        qNo: this.get('count')+1,
      });
      uresponse.save();
      this.set('answer', '')
      this.set('productName','')
      this.set('isBack', true)
    },
    selectedAns(choice) {

      this.set('answer', choice)

    },
    back: function(){
      localStorage.setItem('pName','')
      this.transitionToRoute('user-page')
    }
  }
});
