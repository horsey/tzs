'use strict';
var moment = require('moment');
	     require('moment-timezone');
	     require('twix');

var   _    = require('lodash');

var slots = [],
    startTime,
    endTime,
    am = [
    [
	{
	    "start": 10,
	    "end": 13
	},
	{
	    "start": 16,
	    "end": 20
	}
    ],
    [
	{
	    "start": "10:00",
	    "end": "13:00"
	},
	{
	    "start": "16:00",
	    "end": "20:00"
	}
    ],
    [
	{
	    "start": "10:00",
	    "end": "13:00"
	},
	{
	    "start": "16:00",
	    "end": "20:00"
	}
    ],
    [
	{
	    "start": "10:00",
	    "end": "13:00"
	},
	{
	    "start": "16:00",
	    "end": "20:00"
	}
    ],
    [
	{
	    "start": "10:00",
	    "end": "13:00"
	},
	{
	    "start": "16:00",
	    "end": "20:00"
	}
    ],

    [
	{
	    "start": "10:00",
	    "end": "13:00"
	},
	{
	    "start": "16:00",
	    "end": "20:00"
	}
    ],
	[
	{
	    "start": "10:00",
	    "end": "13:00"
	},
	{
	    "start": "16:00",
	    "end": "20:00"
	}
    ]
];

function getAvailability(a, d) {
    var day,
	start,
	end,
	block,
	blockArray = [];

    day = _.nth(a, 0);
    for(var i = 0; i < day.length; i++) {

	start = moment(d).add(day[i].start, 'hours');
	end   = moment(d).add(day[i].end, 'hours');

	blockArray.push(moment(start).twix(end));
    }
    return blockArray;
}

startTime = moment.tz("2016-07-07 00:00", "Asia/Kolkata");
endTime   = moment.tz("2016-07-07 23:59", "Asia/Kolkata");

var iter = moment(startTime)
	   .twix(endTime)
	   .iterate(15, 'minutes');

var workingSlots = getAvailability(am, startTime);

while (iter.hasNext()) {
    var dt = iter.next();
    if(workingSlots[0].contains(dt) || workingSlots[1].contains(dt)) {
	slots.push(dt.format());
    }
}

console.log(slots);

/* TODOs:
   - Represent time in local time - for now +5:30 - DONE
   - Merge  availability matrix (2)
   - Merge appointments (3)
   - Merge blocked dates
   - Merge location identifier
*/
