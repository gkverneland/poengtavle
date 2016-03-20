chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('index.html', {
	frame: "none",
	width: 2560,
    height: 768,
	top: 0,
	left: 0
  });
});