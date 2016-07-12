'use strict';
var moment = require('moment');
	     require('moment-timezone');
	     require('twix');

var   _    = require('lodash');

var iter = moment("2016-07-07 00:00 +0530", "YYYY-MM-DD HH:mm Z")
	   .twix("2016-07-07 23:59 +0530", "YYYY-MM-DD HH:mm Z")
	   .iterate(15, 'minutes');

var slots = [];

while (iter.hasNext()) {
    slots.push(iter.next()
	       .utcOffset(330)
	       .format());
}

console.log(slots);
