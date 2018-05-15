import Controller from '@ember/controller';
import {
  match,
  not
} from '@ember/object/computed';

export default Controller.extend({

  // product: '',
  // description: '',
  //  isClicked:"",


  actions: {

    showMenu() {
      this.set('isClicked', true);
    },
    addProduct() {
      const productName = this.get('pName');
      const description = this.get('pDesc');

      const newInvitation = this.store.createRecord('product', {
        id: productName,
        productName: productName,
        productDesc: description
      });
      newInvitation.save().then(response => {
        this.set('pName', '');
        this.set('pDesc', '');
      });
      this.set('isClicked', false);
    }
  }

});
//
//
//
// import Controller from '@ember/controller';
// import Ember from 'ember';
// const {
//   inject
// } = Ember;
// export default Controller.extend({
//   firebaseApp: inject.service(),
//   isClicked: false,
//   init: function() {
//     this._super();
//     var prodRef = this.get('firebaseApp').database();
//
//     prodRef.ref('products').on('value', (snapshot) => {
//       var productArray = [];
//       productArray = Object.values(snapshot.val());
//       console.log(productArray);
//       for (var i = 0; i < productArray.length; i++) {
//         var li = '<li class="lelement">' + productArray[i].productName + '</li>';
//         document.getElementById('productList1').innerHTML += li;
//       }
//     });
//
//     $(document).on('click', '.lelement', () => {
//       this.transitionToRoute('index')
//
//     });
//   },
//
//   actions: {
//     showMenu: function() {
//       this.set('isClicked', true);
//     },
//
//     addProduct: function() {
//       // To check type of user
//       var prodName = this.get('pName')
//       var prodDesc = this.get('pDesc')
//       var uid = localStorage.getItem('isLoggedIn')
//
//       const prodRef = this.get('firebaseApp').database();
//
//       prodRef.ref('products/' + prodName).set({
//         productName: prodName,
//         productDesc: prodDesc,
//         owner: uid
//       });
//       this.set('isClicked', false);
//     }
//   }
// });
