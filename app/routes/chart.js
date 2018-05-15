import Route from '@ember/routing/route';
//import Ember from 'ember';
//import {computed} from '@ember/object';
export default Route.extend({
  // model() {
  //   var arr = []
  //   this.store.findAll('chart').then ((responseObj)=>{
  //     if (responseObj.content.length) {
  //       for (var i = 0; i < responseObj.content.length; i++) {
  //         const userData = responseObj.content[i]._data;
  //         console.log('Userdata='+userData);
  //         arr.push(Object.values(userData))
  //       }
  //     }
  //   })
  // }
  // model(){
  //   return this.store.findAll('chart');
  // },
  // numberData:computed('model',function(){
  //   return{
  //     labels: this.get('model').mapBy('label'),
  //     datasets:[{
  //       label: 'Number of products',
  //       data: this.get('model').mapBy('value')
  //     }]
  //   }
  // })
});
