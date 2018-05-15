import DS from 'ember-data';

export default DS.Model.extend({

 productName: DS.attr('string'),
 productDesc: DS.attr('string')

});
