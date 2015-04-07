import Ember from 'ember';
import layout from '../templates/components/uw-header';

export default Ember.Component.extend({
  layout: layout,
  tagName: 'section,',
  classNames: ['uw-header-slim']
});
