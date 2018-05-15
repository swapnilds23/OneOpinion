import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('sign-up');
  this.route('sign-in');
  this.route('admin-page');
  this.route('quiz');
  this.route('questionset');
  //this.route('chart');
  // this.route('product-admin',{path:'/:product_name/admin'});
  this.route('viewquiz');
  this.route('product-user',{path:'/:product_name/product'});
  this.route('user-page');
  this.route('graph');
});

export default Router;
