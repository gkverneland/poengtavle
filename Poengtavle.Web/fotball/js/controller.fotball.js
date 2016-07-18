window.onload = function() {
    startup();
};

function startup() {
	eventListeners();
	windowPosition();
	handleSync();
    handlePlusMinusButtons();
	
	$(document).bind('keyup', function(e) {
	
		switch (e.which) {
			case 13: //ENTER
				break;
			case 32: //SPACE
			    break;
		    case 65: //A
		        incrementHjemme();
		        break;
		    case 83: //S
		        incrementBorte();
		        break;
		    case 90: //Z
		        decrementHjemme();
		        break;
		    case 88: //X
		        decrementBorte();
		        break;
			case 113: //F2
			    sync();
				break;
			default:
				break;
		}
		
	});
}

function windowPosition() {
	$('#info').html('Window | Position: x '+window.screenX +', y '+window.screenY + ' | Scale: width '+$(window).width() +', height '+$(window).height());
	setTimeout(windowPosition, 100);
}

function eventListeners() {
	
	screenLock();
	
	$('#switchPlace').click( function() {
		switchPlace();
	});
	
	$('#close').click( function() {
		window.close();
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

function incrementHjemme() {
    increment("hjemmeInput");
}

function incrementBorte() {
    increment("borteInput");
}

function decrementHjemme() {
    decrement("hjemmeInput");
}

function decrementBorte() {
    decrement("borteInput");
}

function increment(inputId) {
    $("#" + inputId).val(parseInt($("#" + inputId).val()) + 1);
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
            if (f === "increment") {
                increment(i);
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
    $("#hjemmeDisplay").html($("#hjemmeInput").val());
    $("#borteDisplay").html($("#borteInput").val());
}

function sync() {
    settPoeng();
}