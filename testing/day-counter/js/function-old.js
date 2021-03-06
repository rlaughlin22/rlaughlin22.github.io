$(document).ready(function(){
	clock();
});

// -------------- timeline and date ------------ //

var url = "https://spreadsheets.google.com/feeds/list/1BDFXHOQffqffczKyNjF1mhojIDzDvTHy-5-6KRpNb8I/od6/public/values?alt=json"
$.getJSON( url, function( json ) {
	console.log("done (: ");
  schedule = json;
 })
	.done(function(){
		timeline();
	});

function timeline(){
	var x = getDay(x);
    var p = 1;
    var t = 0;
	for(y = 0; y < days[x].periods.length; y++){
		var length = ((days[x].periods[y].length * 90) / 420) + "%";
        var startTime = days[x].periods[y].start.split(":");
        var startSeconds = (+startTime[0]) * 60 * 60 + (+startTime[1]) * 60;
        $("#periods-tr").append("<td style='width:" + length + "' id='period-" + y + "' data-starttime='" + startSeconds + "'><img src='img/" + days[x].periods[y].period + ".png' class='timeline-num'></td>");
        if(days[x].periods[y].start.split(":")[0] <= 12){
            if(days[x].periods[y].start.split(":")[0] <= 9){
                $("#periods-tr2").append("<td style='width:" + length + "'><div class='timeline-time-short'>" + days[x].periods[y].start + "</div></tr>");
            }
            else{
                $("#periods-tr2").append("<td style='width:" + length + "'><div>" + days[x].periods[y].start + "</div></tr>");
            }
        }
        else{
            var hour = days[x].periods[y].start.split(":")[0];
            var minute = days[x].periods[y].start.split(":")[1];
            console.log(hour);
            console.log(minute);
            if((hour - 12) <= 9){
                $("#periods-tr2").append("<td style='width:" + length + "'><div class='timeline-time-short'>" + (hour - 12) + ":" + minute + "</div></tr>");
            }
            else{
                $("#periods-tr2").append("<td style='width:" + length + "'><div>" + (hour - 12) + ":" + minute + "</div></tr>");
            }
        }
        $("#periods-tr3").append("<td style='width:" + length + "'><div style='opacity: 0'></div></tr>");
	}
	$("#periods-tr3").append("<div id='end'><img src='img/end.png' class='timeline-end'><div class='timeline-endtime'>3:15</div></div>");
}

function getDay(i){
	var today = new Date();
	var month = today.getMonth() + 1;
	var date = today.getDate();
	var day = today.getDay();
	var year = today.getFullYear();
	var fullDate = month + "/" + date + "/" + year;
	for(v = 0; v < schedule.feed.entry.length; v++){
		if(fullDate === schedule.feed.entry[v]['gsx$date']['$t']){
			i = schedule.feed.entry[v]['gsx$day']['$t'];
			$("#day").html("Day " + i);
		}
	}
	$("#date").html(weekday[day] + ", " + monthNames[month -1] + " " + date);
	return i;
}

// --------- clock stuff ------------- //

function clock(){
	var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    h = checkHour(h);
    m = checkMinute(m);
    $("#hour").html(h);
    $("#minute").html(":" + m);
    var schoolTime = today.getHours() * 3600 + m * 60 + s;
    if(schoolTime >= 29700 && schoolTime <= 54900){
        var percent = ((schoolTime - 29700) / 252) * (9 / 10) + "%";
        $("#timeline-progress").css("width", percent);
        var periodCount = $("#periods-tr td").length;
        if(periodCount >= 1){
            for(u = 0; u < (periodCount); u++){
                var startTime = $("#period-" + u).attr("data-starttime");
                if(schoolTime >= startTime){
                    if(!$("#period-" + u + " img").attr("src").includes("-white")){
                        var newSrc = $("#period-" + u + " img").attr("src").replace(".png","-white.png");
                        $("#period-" + u + " img").attr("src",newSrc);
                    }
                }
            }
        }
    }
    if(schoolTime >= 54900){
        $(".timeline-end").attr("src","img/end-white.png");
    }
    var t = setTimeout(function(){clock()},500);
}

function checkMinute(i){
    if(i<10){
        i = "0" + i
    }
    return i;
}

function checkHour(i){
	if(i > 12){
		i = i - 12;
		$("#ampm").html("PM");
	}else{
		$("#ampm").html("AM");
	}
    if(i == 12){
        $("#ampm").html("PM");
    }
    if(i == 0){
        return 12;
    }
	return i;
}

// --------------- dates arrays --------------- //

var monthNames = new Array();
monthNames[0] = "January";
monthNames[1] = "February";
monthNames[2] = "March";
monthNames[3] = "April";
monthNames[4] = "May";
monthNames[5] = "June";
monthNames[6] = "July";
monthNames[7] = "August";
monthNames[8] = "September";
monthNames[9] = "October";
monthNames[10] = "November";
monthNames[11] = "December";

var weekday = new Array();
weekday[0]=  "Sun";
weekday[1] = "Mon";
weekday[2] = "Tue";
weekday[3] = "Wed";
weekday[4] = "Thu";
weekday[5] = "Fri";
weekday[6] = "Sat";

// end