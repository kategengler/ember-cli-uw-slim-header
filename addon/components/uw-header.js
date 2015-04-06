import Ember from 'ember';
import layout from '../templates/components/uw-header';

export default Ember.Component.extend({
  layout: layout,

  tagName: 'uw-header',
  classNames: ['uw-header-slim']
});
