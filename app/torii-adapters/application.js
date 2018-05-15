//import { inject} from '@ember/service';
import Ember from 'ember';
const {  inject } = Ember;
import ToriiFirebaseAdapter from 'emberfire/torii-adapters/firebase';

export default ToriiFirebaseAdapter.extend({
  firebaseApp: inject.service()
});
