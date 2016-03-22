chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('basketball.html', {
	frame: "none",
	width: 3840,
    height: 1080,
	top: 0,
	left: 0
  });
});