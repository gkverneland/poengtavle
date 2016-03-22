var startValue; //Start time
var zoomValue; //Fluid scale

window.onload = function() {

    startup();

};

function startup() {

    settings();
	eventListeners();
	windowPosition();
    initializeTimer();
    handleSync();
    handlePlusMinusButtons();
	
	$(document).bind('keyup', function(e) {
	
		switch (e.which) {
			case 13: //ENTER
				break;
			case 32: //SPACE
			    break;
		    case 49: //1
		        break;
		    case 50:
		        break;
		    case 51:
		        break;
		    case 65: //A
		        break;
		    case 83: //S
		        break;
		    case 90: //Z
		        break;
		    case 88: //X
		        break;
			case 112: //F1
				break;
			case 113: //F2
			    sync();
				break;
			case 114: //F3
				break;
			case 115: //F4
				break;
			case 120: //F9
				break;
			case 121: //F10
				break;
			case 122: //F11
				break;
			case 123: //F12
				break;
			case 107: //+ (zoomIn)
				break;
			case 109: //+ (zoomOut)
				break;
			default:
				break;
		}
		
	});
	
	$('#pause').click( function () {
		
		for (var i=1; i<5; i++) {
			var id = ('#t'+i);
			count(id,false);
		}

	});
	
	for (var i=1; i<5; i++) {
		$('#tm'+i+'n').html($('#tm'+i).val()+"&nbsp;");
		$(function(){
			//$('#tm'+i+'n').textfill();
		});
		$('#tm'+i).change( function() {
			var id = '#'+$(this).attr('id')+'n';
			$(id).html($(this).val()+"&nbsp;");
			$(function(){
				//$(id).textfill();
			});
		});
		
		$('#count'+i).click( function() {
			var id = ('#t'+$(this).attr('nr'));
			count(id,true);
		});
		
		$('#pause'+i).click( function() {
			var id = ('#t'+$(this).attr('nr'));
			count(id,false);
		});
	}

	}

function count(id,count) {
	if (!count) {
		$(id).attr('count','false');
	} else {
		$(id).attr('count','true');
		countDown(id);
	}
}

function countDown(clock) {

	var time = $(clock).val().split(":");
	var hh = time[0], mm = time[1], ss = time[2], ml = time[3];
	var results, end = false;
	
	if ($(clock).attr("count")=="true") {
	
	if (ml>0) {
		ml-=1;
		results = (aZ(hh)+":"+aZ(mm)+":"+aZ(ss)+":"+aZ(ml));
	} else {
	
		ml=99;
	
		if (ss>0) {
			ss-=1;
			results = (aZ(hh)+":"+aZ(mm)+":"+aZ(ss)+":"+aZ(ml));
		} else {
			
			ss=59;
			
			if (mm>0) {
				mm-=1;
				results = (aZ(hh)+":"+aZ(mm)+":"+aZ(ss)+":"+aZ(ml));
			} else {
				mm=59;
				
				if (hh>0) {
					hh-=1;
					results = (aZ(hh)+":"+aZ(mm)+":"+aZ(ss)+":"+aZ(ml));
				} else {
					results = "00:00:00:00";
					end = true;
				}
			
			}
		
		}
	
	}
	
	$(clock).val(results);
	$(clock+'d').html($(clock).val().substring(3));
		
	if (!end) {
		setTimeout( function() {
			countDown(clock);
		}, 10);
	} else {
		$(clock).attr("count",'false');
	}
	
	}
	
}

function addSecond(clock) {
    var time = $(clock).val().split(":");
    var hh = time[0], mm = time[1], ss = time[2], ml = time[3];
    var results;
        if (ss < 59) {
            ss++;
            results = (aZ(hh) + ":" + aZ(mm) + ":" + aZ(ss) + ":" + aZ(ml));
        } else {

            ss = 00;

            if (mm < 59) {
                mm++;
                results = (aZ(hh) + ":" + aZ(mm) + ":" + aZ(ss) + ":" + aZ(ml));
            } else {
                mm = 00;

                if (hh < 99) {
                    hh++;
                    results = (aZ(hh) + ":" + aZ(mm) + ":" + aZ(ss) + ":" + aZ(ml));
                } else {
                    results = "99:99:99:99";
                }
            }
        }
    
    $(clock).val(results);
    $(clock + 'd').html($(clock).val().substring(3));
}

function aZ(time) { //addZero?
	time = parseInt(time);
	if (time<10&&time>0) {
		return ("0"+time);
	} else {
		if (time==0) {
			return "00";
		} else {
			return time;
		}
	}
}

function windowPosition() {
	$('#info').html('Window | Position: x '+window.screenX +', y '+window.screenY + ' | Scale: width '+$(window).width() +', height '+$(window).height());
	setTimeout(windowPosition, 100);
}

function settings() {
	setKeyColor('#color','#display');
}

function eventListeners() {
	
	screenLock();
	
	$('#switchPlace').click( function() {
		switchPlace();
	});
	
	$('#close').click( function() {
		console.log('close');
		window.close();
	});
	
}

function setKeyColor(div,alt) {
	$(div).colorpicker({
		altField: alt,
		altProperties: 'background-color',
		altAlpha: false,
		alpha: false
	});
}

function switchPlace() {
	if ($('#controller').css('left')=="0px") {
		$('#controller').css('left','auto');
		$('#display').css('left','0px');
		$('#controller').css('right','0px');
		$('#display').css('right','auto');
	} else {
		$('#controller').css('right','auto');
		$('#display').css('right','0px');
		$('#controller').css('left','0px');
		$('#display').css('left','auto');
	}
}

function screenLock() {
	$("#dragLocker").hide();
	$('#key').click( function() {
		if ($(this).attr('locked')=='true') {
			$(this).attr('locked','false');
			$(this).css('background','url("images/open.png")');
			$(this).css('width','20px');
			$("#dragLocker").hide();
		} else {
			$(this).attr('locked','true');
			$(this).css('background','url("images/closed.png")');
			$(this).css('width','15px');
			$("#dragLocker").show();
		}
	});
}

function incrementAktivHjemme() {
    increment("sett" + getAktivtSett() + "HInput");
}

function incrementAktivBorte() {
    increment("sett" + getAktivtSett() + "BInput");
}

function decrementAktivHjemme() {
    decrement("sett" + getAktivtSett() + "HInput");
}

function decrementAktivBorte() {
    decrement("sett" + getAktivtSett() + "BInput");
}

function increment(inputId, poeng) {
    $("#" + inputId).val(parseInt($("#" + inputId).val()) + poeng);
}
function decrement(inputId) {
    var newValue = parseInt($("#" + inputId).val()) - 1;
    if (newValue >= 0) {
        $("#" + inputId).val(newValue);
    }
}

function handlePlusMinusButtons() {
    $("input.plusminus").each(function () {

        var input = $(this);
        $(input).click(function () {
            var f = input.attr("data-function");
            var i = input.attr("data-input");
            var p = parseInt(input.attr("data-points"));
            if (f === "increment") {
                increment(i, p);
            } else {
                decrement(i);
            }
        });
    });
}

function handleSync() {
    $("#syncButton").click(function () {
        sync();
    });
    sync();
}

function settPoeng() {
    $("#Hpoeng").html($("#poengInputH").val());
    $("#Bpoeng").html($("#poengInputB").val());
}

function settPeriode() {
    $("#periodeDisplay").html($("#periodeInput").val());
}

function sync() {
    settPoeng();
    settPeriode();
    settTid();
    updateTimerButtons();
}

var endTime;
var timerRunning;

function initializeTimer() {
    timerRunning = false;
    setInterval(updateTimer, 500);

    $("#startTimerButton").click(function () { startTimer() });
    $("#stopTimerButton").click(function () { stopTimer() });
}

function startTimer() {

    var remainingTime = $("#tidInput").val();

    var remainingMinutes = parseInt(remainingTime.split(':')[0]);
    var remainingSeconds = parseInt(remainingTime.split(':')[1]);
    endTime = new Date();
    endTime.setSeconds(endTime.getSeconds() + (remainingMinutes * 60) + remainingSeconds);

    timerRunning = true;
    updateTimer();
}

function stopTimer() {
    timerRunning = false;
}

function updateTimer() {
    if (timerRunning) {
        var remaining = getTimeRemaining(endTime);
        var timeString = '';
        if (remaining.total <= 0) {
            timerRunning = false;
            timeString = '00:00';
            
        } else {
            timeString = padZeros(remaining.minutes) + ":" + padZeros(remaining.seconds);
        }
        $("#tidInput").val(timeString);
        $("#tidDisplay").html(timeString);
    }
    updateTimerButtons();
}

function settTid() {
    if (!timerRunning) { //når timer kjører gjøres det automatisk
        $("#tidDisplay").html($("#tidInput").val());
    }
}

function updateTimerButtons() {
    if (timerRunning) {
        $("#startTimerButton").attr('disabled', 'disabled');
        $("#stopTimerButton").removeAttr('disabled');
    } else {
        $("#startTimerButton").removeAttr('disabled');
        $("#stopTimerButton").attr('disabled', 'disabled');
    }
}

function getTimeRemaining(end){
    var t = Date.parse(end) - Date.parse(new Date());
    var seconds = Math.floor( (t/1000) % 60 );
    var minutes = Math.floor( (t/1000/60) % 60 );
    var hours = Math.floor( (t/(1000*60*60)) % 24 );
    var days = Math.floor( t/(1000*60*60*24) );
    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}

function padZeros(number) {
    number = number + '';
    return number.length >= 2 ? number : new Array(2 - number.length + 1).join('0') + number;
}