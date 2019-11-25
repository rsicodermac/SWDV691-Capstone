// Script used to load all assets for the game

function initPreload(){
	toggleLoader(true);
	
	$(window).resize(function(){
		resizeGameFunc();
	});
	resizeGameFunc();
	
	loader = new createjs.LoadQueue(false);
	gameAssets=[
			{src:'assets/bg_pixel.png', id:'bgPixel'},
			//buttons
			{src:'assets/button_back.svg', id:'button_back', type: createjs.LoadQueue.IMAGE},
			{src:'assets/button_cancel.svg', id:'button_cancel', type: createjs.LoadQueue.IMAGE},
			{src:'assets/button_exit.svg', id:'button_exit', type: createjs.LoadQueue.IMAGE},
			{src:'assets/button_facebook.svg', id:'button_facebook', type: createjs.LoadQueue.IMAGE},
			{src:'assets/button_fullscreen.svg', id:'button_fullscreen', type: createjs.LoadQueue.IMAGE},
			{src:'assets/button_next.svg', id:'button_next', type: createjs.LoadQueue.IMAGE},
			{src:'assets/button_ok.svg', id:'button_ok', type: createjs.LoadQueue.IMAGE},
			{src:'assets/button_option_close.svg', id:'button_option_close', type: createjs.LoadQueue.IMAGE},
			{src:'assets/button_option.svg', id:'button_option', type: createjs.LoadQueue.IMAGE},
			{src:'assets/button_prev.svg', id:'button_prev', type: createjs.LoadQueue.IMAGE},
			{src:'assets/button_ok.svg', id:'button_ok', type: createjs.LoadQueue.IMAGE},
			{src:'assets/button_replay.svg', id:'button_replay', type: createjs.LoadQueue.IMAGE},
			{src:'assets/button_reveal.svg', id:'button_reveal', type: createjs.LoadQueue.IMAGE},
			{src:'assets/button_save.svg', id:'button_save', type: createjs.LoadQueue.IMAGE},
			{src:'assets/button_score.svg', id:'button_score', type: createjs.LoadQueue.IMAGE},
			{src:'assets/button_sound_off.svg', id:'button_sound_off', type: createjs.LoadQueue.IMAGE},
			{src:'assets/button_sound_on.svg', id:'button_sound_on', type: createjs.LoadQueue.IMAGE},
			{src:'assets/button_start.svg', id:'button_start', type: createjs.LoadQueue.IMAGE},
			{src:'assets/button_submit.svg', id:'button_submit', type: createjs.LoadQueue.IMAGE},
			//extra items
			{src:'assets/item_correct.svg', id:'item_correct', type: createjs.LoadQueue.IMAGE},
			{src:'assets/item_cup_over.svg', id:'item_cup_over', type: createjs.LoadQueue.IMAGE},
			{src:'assets/item_cup.svg', id:'item_cup', type: createjs.LoadQueue.IMAGE},
			{src:'assets/item_question.svg', id:'item_question', type: createjs.LoadQueue.IMAGE},
			{src:'assets/item_timer.svg', id:'item_timer', type: createjs.LoadQueue.IMAGE},
			{src:'assets/item_unuse.svg', id:'item_unuse', type: createjs.LoadQueue.IMAGE}
			
			];
	// load game sounds
	soundOn = true;		
	if($.browser.mobile || isTablet){
		if(!enableMobileSound){
			soundOn=false;
		}
	}
	
	if(soundOn){
		gameAssets.push({src:'assets/sounds/click.ogg', id:'soundClick'});
		gameAssets.push({src:'assets/sounds/complete.ogg', id:'soundComplete'});
		gameAssets.push({src:'assets/sounds/over.ogg', id:'soundOver'});
		gameAssets.push({src:'assets/sounds/confirm.ogg', id:'soundConfirm'});
		gameAssets.push({src:'assets/sounds/correct.ogg', id:'soundCorrect'});
		gameAssets.push({src:'assets/sounds/press.ogg', id:'soundPress'});
		gameAssets.push({src:'assets/sounds/release.ogg', id:'soundRelease'});
		gameAssets.push({src:'assets/sounds/reveal.ogg', id:'soundReveal'});
		gameAssets.push({src:'assets/sounds/success.ogg', id:'soundSuccess'});
		// add mp3 to be playable across browsers
		createjs.Sound.alternateExtensions = ["mp3"];
		loader.installPlugin(createjs.Sound);
	}
	
	loader.addEventListener("complete", handleComplete);
	loader.addEventListener("fileload", fileComplete);
	loader.addEventListener("error",handleFileError);
	loader.on("progress", handleProgress, this);
	loader.loadgameAssets(gameAssets);
}


// percent loader 0 to 100 percent
function handleProgress() {
	$('#mainLoader span').html(Math.round(loader.progress/1*100)+'%');
}

function handleComplete() {
	toggleLoader(false);
	initMain();
};

function fileComplete() {
	
}

function handleFileError() {
	
}

// toggle loader hide/show
function toggleLoader(con){
	if(con){
		$('#mainLoader').show();
		$('#mainHolder').hide();
	}else{
		$('#mainLoader').hide();
		$('#mainHolder').show();
	}
}