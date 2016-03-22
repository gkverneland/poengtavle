var startValue; //Start time
var zoomValue; //Fluid scale

window.onload = function() {

    startup();

};

function startup() {

    settings();
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
		    case 49: //1
		        setAktivtSett(1);
		        break;
		    case 50:
		        setAktivtSett(2);
		        break;
		    case 51:
		        setAktivtSett(3);
		        break;
		    case 65: //A
		        incrementAktivHjemme();
		        break;
		    case 83: //S
		        incrementAktivBorte();
		        break;
		    case 90: //Z
		        decrementAktivHjemme();
		        break;
		    case 88: //X
		        decrementAktivBorte();
		        break;
			case 112: //F1
				count('#t1',true);
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

function handleAktivtSett() {
    aktivtSett();
}
function handleSync() {
    $("#syncButton").click(function () {
        sync();
    });
    sync();
}

function aktivtSett() {

    $("#sett1, .sett1").css("font-weight", "normal");
    $("#sett2, .sett2").hide().css("font-weight", "normal");
    $("#sett3, .sett3").hide().css("font-weight", "normal");


    var value = getAktivtSett();

    $("#sett" + value + ", .sett" + value).css("font-weight", "bold");

    if (value > 2) {
        $("#sett3, .sett3").show();
    }
    if (value > 1) {
        $("#sett2, .sett2").show();
    }
    aktivtSettPoeng(value);
}

function setAktivtSett(sett) {
    $("input[type=radio][value='" + sett + "'][name='aktivtSett']").click();
}

function getAktivtSett() {
    return parseInt($("input[type=radio][name='aktivtSett']:checked").val());
}

function aktivtSettPoeng() {
    var aktivtSett = getAktivtSett();

    var hPoeng = $("#sett" + aktivtSett + "HInput").val();
    $("#Hpoeng").html(hPoeng);

    var bPoeng = $("#sett" + aktivtSett + "BInput").val();
    $("#Bpoeng").html(bPoeng);
}

function settPoeng() {
    $("#sett1H").html($("#sett1HInput").val());
    $("#sett1B").html($("#sett1BInput").val());
    $("#sett2H").html($("#sett2HInput").val());
    $("#sett2B").html($("#sett2BInput").val());
    $("#sett3H").html($("#sett3HInput").val());
    $("#sett3B").html($("#sett3BInput").val());
}

function sync() {
    aktivtSett();
    aktivtSettPoeng();
    settPoeng();
}