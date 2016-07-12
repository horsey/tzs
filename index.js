/* Get the day of the week
 - Query for the am
 - Prepare the slot am
 - Overlay booked appointment slots

*/
'use strict';
var moment = require('moment');
	     require('moment-range');
	     require('moment-timezone');

var   _    = require('lodash');
var startTime,
    date,
    dayAm,
    dayArray = [],
    slot = {},
    am = [
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


var appts = [
    {
	"start": "2016-07-07T05:15:00Z", //10:45 AM IST
	"end": "2016-07-07T05:30:00Z"
    },
    {
	"start": "2016-07-07T05:30:00Z", //11:00 AM IST
	"end": "2016-07-07T05:45:00Z"
    },
    {
	"start": "2016-07-07T05:45:00Z", //11.15 AM IST
	"end": "2016-07-07T06:00:00Z"
    }
];

// function transformAppts(a) {
//     var apptTrans = [];
//     for (var i = 0; i < a.length; i++) {
//     }

// }

function transformAm(a, d) {
    var day,
	slots,
	start,
	end,
	dayAvabl,
	range = [];

     dayAvabl = _.nth(a, day);

    /* convert slots to a date range */
    /* Format
      [
      { start: '10:00', end: '13:00' },
      { start: '16:00', end: '20:00' }
      ]
    */

    for(var index = 0; index < dayAvabl.length; index++) {
	start = moment(d)
	       .add(parseInt(dayAvabl[index].start), 'hours')
	       .utc();

	end   = moment(d)
		.add(parseInt(dayAvabl[index].end), 'hours')
		.utc();
	range.push(moment.range(start, end));
    }
    return range;
}




startTime = moment("2016-07-07 00:00 +0530", "YYYY-MM-DD HH:mm Z")
	   .utcOffset(+330).format();

dayAm = transformAm(am, startTime);

//Initialize the slot object
slot = {"start_time": startTime}
dayArray.push(slot);

for(var i = 0; i < 96; i++) {
    startTime =  moment(startTime)
	.add(15, 'minutes')
	.utcOffset(+330)
	.format();

    slot = {"start_time": startTime};
    dayArray.push(slot);
}

//Overlay avaliablity matrix
var convertedArray = [];
for(var i = 0; i < dayAm.length; i++) {
    for(var j = 0; j < dayArray.length; j++) {
	if(dayAm[i].contains(new Date(dayArray[j].start_time))) {
	    convertedArray.push(dayArray[j]);
	}
    }
}

var someArray = [],
     r;

for(var i = 0; i < appts.length; i++) {
     r = moment.range(moment(moment(appts[i].start).utcOffset(330), moment(appts[i].end).utcOffset(330)));
    for(var j = 0; j < convertedArray.length; j++) {
	if(r.contains(convertedArray[j])) {
	    someArray.push(convertedArray[j]);
	}
    }
}

console.log(someArray);
//console.log(convertedArray);
// for(var i = 0; i < appts.length; i++) {
//     console.log(moment(appts[i].start).utcOffset(330).format());
//     console.log(moment(appts[i].end).utcOffset(330).format());
// }

//Overlay existing appointments
//for(var i = 0; i < appts.length; i++) {
//     for(var j = 0; j < convertedArray.length; j++) {
//     }
// }


/* TODOs:
   - Represent time in local time - for now +5:30 (1)
   - Merge  availability matrix (2)
   - Merge appointments (3)
   - Merge blocked dates
   - Merge location identifier
*/
