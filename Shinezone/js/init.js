////////////////////////////////////////////////////////////
// INIT
////////////////////////////////////////////////////////////
var stageWidth, stageHeight = 0;
var isLoaded = false;


$(function () {
	if (window.location.protocol.substr(0, 4) === "file") {
		alert("Game may experience bugs because of security mode. Please install on server.");
	}

	$(window).resize(function () {
		resizeLoaderFunc();
	});
	resizeLoaderFunc();
	checkBrowser();
});


function resizeLoaderFunc() {
	stageWidth = window.innerWidth;
	stageHeight = window.innerHeight;

	$('#mainLoader').css('left', checkContentWidth($('#mainLoader')));
	$('#mainLoader').css('top', checkContentHeight($('#mainLoader')));
}

////////////////////////////////////////////
// BROSWER SETTINGS
///////////////////////////////////////////
var browserSupport = false;
var isTablet;
function checkBrowser() {
	isTablet = (/ipad|android|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i.test(navigator.userAgent.toLowerCase()));
	deviceVer = getDeviceVer();

	if (!isLoaded) {
		isLoaded = true;
		initPreload();
	}
}