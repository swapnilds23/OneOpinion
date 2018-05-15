import DS from 'ember-data';

export default DS.Model.extend({
  question: DS.attr('string'),
  answer1: DS.attr('string'),
  answer2: DS.attr('string'),
  answer3: DS.attr('string')
});
