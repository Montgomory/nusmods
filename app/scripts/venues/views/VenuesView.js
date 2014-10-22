'use strict';

var Marionette = require('backbone.marionette');
var template = require('../templates/venues.hbs');
var $ = require('jquery');
var Backbone = require('backbone');

module.exports = Marionette.LayoutView.extend({
  template: template,
  initialize: function () {
    
  },
  events: {
    'keypress input[type=text]': 'processKey',
    'click .js-nm-venue-search': 'searchVenue'
  },
  processKey: function (e) {
    if (e.which === 13) { // Enter key
      this.searchVenue();
    }
    return;
  },
  onShow: function () {
    this.showAvailabilityForVenue(this.model.get('selectedVenueName'));
  },
  searchVenue: function () {
    var searchText = $.trim($('.js-nm-venue-input').val().toUpperCase());
    this.showAvailabilityForVenue(searchText);
  },
  showAvailabilityForVenue: function (venue) {
    var selectedVenue = null;
    if (this.model.get('venuesList').indexOf(venue) > -1) {
      selectedVenue = this.model.get('venues')[venue];
    }
    this.model.set('selectedVenue', selectedVenue);
    this.model.set('selectedVenueName', venue);
    if (venue !== '') {
      Backbone.history.navigate('venues/' + venue);
    }
    this.render();
  }
});