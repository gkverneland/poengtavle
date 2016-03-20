var startValue; //Start time
var zoomValue; //Fluid scale

window.onload = function() {

    startup();

};

function startup() {

settings();
	eventListeners();
	windowPosition();
	setStartValue();
	zoomValue = startValue;
	
	$(document).bind('keyup', function(e) {
	
		switch (e.which) {
			case 13: //ENTER
				for (var i=1; i<5; i++) {
					var id = ('#t'+i);
					if ($(id).attr('count')!='true') {
						count(id,true);
					}
				}
				break;
			case 32: //SPACE
				for (var i=1; i<5; i++) {
					var id = ('#t'+i);
					count(id,false);
				}
				break;
			case 112: //F1
				count('#t1',true);
				break;
			case 113: //F2
				count('#t2',true);
				break;
			case 114: //F3
				count('#t3',true);
				break;
			case 115: //F4
				count('#t4',true);
				break;
			case 120: //F9
				count('#t1',false);
				break;
			case 121: //F10
				count('#t2',false);
				break;
			case 122: //F11
				count('#t3',false);
				break;
			case 123: //F12
				count('#t4',false);
				break;
			case 107: //+ (zoomIn)
				var timeVal = [];
				timeVal[0] = getTimeValue('#t1');
				timeVal[1] = getTimeValue('#t2');
				timeVal[2] = getTimeValue('#t3');
				timeVal[3] = getTimeValue('#t4');
				
				zoomValue = Math.max.apply(Math, timeVal);
				break;
			case 109: //+ (zoomOut)
				zoomValue = startValue;
				break;
			default:
				break;
		}
		
	});
	
	$('#setCount').click( function () {
		
		for (var i=1; i<5; i++) {
			var id = ('#t'+i);
			$(id).val($('#time').val());
			$('#t'+i+'d').html($(id).val().substring(3));
		}
		
		setStartValue();
		zoomValue = startValue;

	});
    
	$('#addTimeButton').click(function () {
	    var timeToAdd = $("#addTimeInput").val();
	        
	    for (var i = 1; i < 5; i++) {
	        var id = ('#t' + i);
	        var remaining = timeToAdd;
	        while (remaining > 0) {
	            addSecond(id);
	            remaining--;
	        }
	    }
	});
	
	$('#count').click( function () {
		
		for (var i=1; i<5; i++) {
			var id = ('#t'+i);
			if ($(id).attr('count')!='true') {
				count(id,true);
			}
		}

	});
	
	$('#pause').click( function () {
		
		for (var i=1; i<5; i++) {
			var id = ('#t'+i);
			count(id,false);
		}

	});
	
	$('#zoomIn').click( function () {
		
		var timeVal = [];
		timeVal[0] = getTimeValue('#t1');
		timeVal[1] = getTimeValue('#t2');
		timeVal[2] = getTimeValue('#t3');
		timeVal[3] = getTimeValue('#t4');
		
		zoomValue = Math.max.apply(Math, timeVal);

	});
	
	$('#zoomOut').click( function () {
		
		zoomValue = startValue;

	});
	
	$('#save').click( function () {
		
		window.requestFileSystem(window.TEMPORARY, 1024*1024, onInitFs, errorHandler);

	});
	
	$('#load').click( function () {
		
		window.requestFileSystem(window.TEMPORARY, 1024*1024, onInitFsr, errorHandler);

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

function setStartValue() {
	var e = $("#time").val().split(":");
	
	for (var i = 0; i<e.length; i++) {
		e[i] = parseInt(e[i]);
	}
	
	startValue = ( (e[0]*60*60*100) + (e[1]*60*100) + (e[2]*100) + e[3] );
}

function getTimeValue(id) {
	var e = $(id).val().split(":");
	
	for (var i = 0; i<e.length; i++) {
		e[i] = parseInt(e[i]);
	}
	
	return ( (e[0]*60*60*100) + (e[1]*60*100) + (e[2]*100) + e[3] );
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

function updateFluid() {
	
	var time, idTime, idFluid, diff;
	
	for (var i = 1; i<5; i++) {
		idTime = "#t"+i;
		idFluid = "#fl"+i;
		
		time = getTimeValue(idTime);
		diff = zoomValue-time;

		if (diff!=0&&diff!="NaN") {
			newHeight = 100-((diff/zoomValue)*100);
			$(idFluid).height(newHeight+"%");

		} else {
			$(idFluid).height("100%");
		}
		
	}
	
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
	updateFluid();
	$(function(){
			//$('.teamNames').textfill();
	});
	setTimeout(windowPosition, 100);
}

function settings() {

	setKeyColor('#color','#display');
	setKeyColor('#f1','#fl1');
	setKeyColor('#f2','#fl2');
	setKeyColor('#f3','#fl3');
	setKeyColor('#f4','#fl4');
	
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

//Extension

window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
var fs = null;

function errorHandler(e) {
  var msg = '';
  switch (e.code) {
    case FileError.QUOTA_EXCEEDED_ERR:
      msg = 'QUOTA_EXCEEDED_ERR';
      break;
    case FileError.NOT_FOUND_ERR:
      msg = 'NOT_FOUND_ERR';
      break;
    case FileError.SECURITY_ERR:
      msg = 'SECURITY_ERR';
      break;
    case FileError.INVALID_MODIFICATION_ERR:
      msg = 'INVALID_MODIFICATION_ERR';
      break;
    case FileError.INVALID_STATE_ERR:
      msg = 'INVALID_STATE_ERR';
      break;
    default:
      msg = 'Unknown Error';
      break;
  };
	console.log(msg);
}

function initFS() {
  window.requestFileSystem(window.TEMPORARY, 1024*1024, function(filesystem) {
    fs = filesystem;
  }, errorHandler);
}

function onInitFs(fs) {

  fs.root.getFile('settings.txt', {create: true}, function(fileEntry) {

    // Create a FileWriter object for our FileEntry (settings.txt).
    fileEntry.createWriter(function(fileWriter) {

      fileWriter.onwriteend = function(e) {
      };

      fileWriter.onerror = function(e) {
      };

		fileWriter.truncate(0);

    }, errorHandler);

  }, errorHandler);
  
  fs.root.getFile('settings.txt', {create: true}, function(fileEntry) {

    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(function(fileWriter) {

      fileWriter.onwriteend = function(e) {

      };

      fileWriter.onerror = function(e) {
        console.log('Write failed: ' + e.toString());
      };

	  var left;
	  if ($('#controller').css('left')=="0px") {
		left = true;
	  } else {
		left = false;
	  }
	  
	  var lag = [$('#tm1').val(),$('#tm2').val(),$('#tm3').val(),$('#tm4').val()];
	  var farge = [$('#f1').val(),$('#f2').val(),$('#f3').val(),$('#f4').val()];
	  var tid = [$('#t1').val(),$('#t2').val(),$('#t3').val(),$('#t4').val()];
	  
	  var settings = {
			bakgrunn: $('#color').val(),
			lag: lag,
			farge: farge,
			tid: tid,
			left: left,
			startverdi: $('#time').val(),
			zoomValue: zoomValue
		};
	  
	  settings = JSON.stringify(settings);
	  
	  
      // Create a new Blob and write it to log.txt.
      var blob = new Blob([settings], {type: 'text/plain'});

		fileWriter.write(blob);

    }, errorHandler);

  }, errorHandler);

}

function onInitFsr(fs) {

  fs.root.getFile('settings.txt', {}, function(fileEntry) {

    // Get a File object representing the file,
    // then use FileReader to read its contents.
    fileEntry.file(function(file) {
       var reader = new FileReader();

       reader.onloadend = function(e) {

         settings = JSON.parse(this.result);
		 $('#color').val(settings.bakgrunn);
		 $('#display').css('background','#'+settings.bakgrunn);
		 
		 $('#tm1').val(settings.lag[0]); $('#tm1n').html(settings.lag[0]);
		 $('#tm2').val(settings.lag[1]); $('#tm2n').html(settings.lag[1]);
		 $('#tm3').val(settings.lag[2]); $('#tm3n').html(settings.lag[2]);
		 $('#tm4').val(settings.lag[3]); $('#tm4n').html(settings.lag[3]);
		 
		 $('#f1').val(settings.farge[0]); $('#fl1').css('background','#'+settings.farge[0]);
		 $('#f2').val(settings.farge[1]); $('#fl2').css('background','#'+settings.farge[1]);
		 $('#f3').val(settings.farge[2]); $('#fl3').css('background','#'+settings.farge[2]);
		 $('#f4').val(settings.farge[3]); $('#fl4').css('background','#'+settings.farge[3]);
		 
		 $('#t1').val(settings.tid[0]);
		 $('#t2').val(settings.tid[1]);
		 $('#t3').val(settings.tid[2]);
		 $('#t4').val(settings.tid[3]);
		 
		 $('#time').val(settings.startverdi);
		 setStartValue();
		 zoomValue = settings.zoomValue;
		 
		if ($('#controller').css('left')=="0px"&&settings.left == false) {
			switchPlace();
		} else {
			if ($('#controller').css('left')=="auto"&&settings.left == true) {
				switchPlace();
			}
		}
		 
       };

       reader.readAsText(file);
    }, errorHandler);

  }, errorHandler);

}

//TEXT SCALE
(function($) {
    $.fn.textfill = function(maxFontSize, maxWords) {
        maxFontSize = parseInt(maxFontSize, 10);
        maxWords = parseInt(maxWords, 10) || 3;
        return this.each(function(){
            var self = $(this),
                orgText = self.text(),
                fontSize = parseInt(self.css("fontSize"), 10),
                lineHeight = parseInt(self.css("lineHeight"), 10),
                maxHeight = self.height(),
                maxWidth = self.width(),
                words = self.text().split(" ");
            
            function calcSize(text) {
                var ourText = $("<span>"+text+"</span>").appendTo(self),
                    multiplier = maxWidth/ourText.width(),
                    newSize = fontSize*(multiplier-0.1);
                ourText.css(
                    "fontSize", 
                    (maxFontSize > 0 && newSize > maxFontSize) ? 
                        maxFontSize : 
                        newSize
                );
                var scrollHeight = self[0].scrollHeight;
                if (scrollHeight  > maxHeight) {
                    multiplier = maxHeight/scrollHeight;
                    newSize = (newSize*multiplier);
                    ourText.css(
                        "fontSize", 
                        (maxFontSize > 0 && newSize > maxFontSize) ? 
                            maxFontSize : 
                            newSize
                    );
                }
            }
            self.empty();
            if (words.length > maxWords) {
                while (words.length > 0) {
                    var newText = words.splice(0, maxWords).join(" ");
                    console.log
                    calcSize(newText);
                    self.append("<br>");
                }
            } else {
                calcSize(orgText);
            }
        });
    };
})(jQuery);