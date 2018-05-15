import DS from 'ember-data';

export default DS.Model.extend({
  productName: DS.attr('string'),
  answer: DS.attr('string'),
  qNo: DS.attr('string'),
  userid: DS.attr('string')
});
