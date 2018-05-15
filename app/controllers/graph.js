import Controller from '@ember/controller';
import Ember from 'ember';
const {
  inject
} = Ember;

export default Controller.extend({
  firebaseApp: inject.service(),
  counter: 0,
  counter1: 0,
  counter2: 0,
  counter3: 0,
  option1: '',
  option2: '',
  option3: '',
  productName:'',

  actions: {
    render: function() {

      this.set('isRender',true)
      this.set('productName',localStorage.getItem('pName'))
      this.set('counter',this.get('qNo'))
      var prodRef = this.get('firebaseApp').database();
      prodRef.ref('question/').child(this.get('productName')).on('value', (snapshot) => {
        var productArray = [];
        productArray = Object.values(snapshot.val());
        this.set('questionsize',productArray.length)
        //setting product options
        this.set('option1', productArray[this.get('counter')-1].optionA)
        this.set('option2', productArray[this.get('counter')-1].optionB)
        this.set('option3', productArray[this.get('counter')-1].optionC)
      });

      this.store.findAll('response').then((responseObj) => {
        if (responseObj.content.length) {
          // console.log(this.get('option1'))
          // console.log(this.get('option2'))
          // console.log(this.get('option3'))

          for (var j = 0; j < responseObj.content.length; j++) {
            const userData = responseObj.content[j]._data;
            if (userData.qNo == this.get('counter') && userData.productName == this.get('productName')) {
              if (this.get('option1') == userData.answer) {
                this.set('counter1', this.get('counter1') + 1)
              } else if (this.get('option2') == userData.answer) {
                this.set('counter2', this.get('counter2') + 1)
              } else if (this.get('option3') == userData.answer) {
                this.set('counter3', this.get('counter3') + 1)
              }
            }
            // console.log(this.get('counter1'))
            // console.log(this.get('counter2'))
            // console.log(this.get('counter3'))
          }
          var total = this.get('counter1') + this.get('counter2') + this.get('counter3')
          var count1 = (this.get('counter1') / total)*100
          this.set('counter1', count1)
          var count2 = (this.get('counter2') / total)*100
          this.set('counter2', count2)
          var count3 = (this.get('counter3') / total)*100
          this.set('counter3', count3)

        }
      });
    },
    clear:function(){
      this.set('counter3', '')
      this.set('counter2', '')
      this.set('counter1', '')
    },
    backTo: function(){
      this.set('isRender',false)
      this.set('qNo','')
      this.transitionToRoute('admin-page')
    }
  }
});
