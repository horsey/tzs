
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

var convertedArray = [];
for(var i = 0; i < dayAm.length; i++) { 
    for(var j = 0; j < dayArray.length; j++) { 
	if(dayAm[i].contains(new Date(dayArray[j].start_time))) { 
	    convertedArray.push(dayArray[j]);
	}
    }
}

console.log(convertedArray);


/* TODOs:
   - Represent time in local time - for now +5:30 (1)
   - Merge appointments
   - Merge blocked dates
   - Merge  availability matrix
   - Merge location identifier
*/
