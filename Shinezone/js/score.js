////////////////////////////////////////////////////////////
// LEADERBOARD SCORE SETUP
////////////////////////////////////////////////////////////

var displayScoreBoard = true; //toggle submit and scoreboard button
var scoreBoardTitle = 'LEADERBOARD';
var scoreRank_arr = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th'];

var totalScorePage = 1; //total score pages, .e.g. 2 for 20 listing
var scoreReverse = false; //TRUE = DESCENDING
var submitTitle = 'SUBMIT YOUR SCORE';

var score_arr = [{ col: 'RANK', percent: 8, align: 'center' },
{ col: 'NAME', percent: 42, align: 'left' },
{ col: 'CATEGORY', percent: 20, align: 'center' },
{ col: 'SCORE', percent: 30, align: 'center' }];



$.scoreList = {};

function buildScoreboard() {
	$('.fontScoreTitle').html(scoreBoardTitle);
	$('.fontSubmitTitle').html(submitTitle);

	$('#buttonSave').click(function () {
		goScorePage('submit');
	});

	$('#buttonScore').click(function () {
		goScorePage('scoreboard');
	});

	$('#buttonBack').click(function () {
		goScorePage('');
	});

	$('#buttonScorePrev').click(function () {
		toggleScorePage(false);
	});

	$('#buttonScoreNext').click(function () {
		toggleScorePage(true);
	});

	$('#buttonSubmit').click(function () {
		var userScore = playerData.timer;
		if (resultSettings.mode == 'score') {
			userScore = playerData.score;
		}
		if (categorySettings.status) {
			submitUserScore(gameData.category_arr[gameData.categoryNum], userScore);
		} else {
			submitUserScore('', userScore);
		}
	});

	$('#buttonCancelSubmit').click(function () {
		goScorePage('');
	});

	for (var n = 0; n < 11; n++) {
		var scoreHTML = '<li class="ignorePadding">';
		for (var s = 0; s < score_arr.length; s++) {
			if (n == 0) {
				scoreHTML += '<div class="list fontScoreList resizeFont" style="width:' + score_arr[s].percent + '%; text-align:\'' + score_arr[s].align + '\';">' + score_arr[s].col + '</div>';
			} else {
				var rankText = '';
				if (s == 0) {
					rankText = scoreRank_arr[n - 1];
				}
				scoreHTML += '<div class="list fontScoreList resizeFont" style="width:' + score_arr[s].percent + '%; text-align:\'' + score_arr[s].align + '\';">' + rankText + '</div>';
			}
		}
		scoreHTML += '<div style="clear:both;"></div></li>';
		$('ul.scoreList').append(scoreHTML);
	}
}

function toggleSaveButton(con) {
	if (!displayScoreBoard) {
		return;
	} else {
		$('.resultContent .option').removeClass('singleOption');
	}

	if (con) {
		$('.resultContent .option').removeClass('NoSaveOption');
	} else {
		$('.resultContent .option').addClass('NoSaveOption');
	}
}


function goScorePage(page) {
	var targetContainer;
	$('.resultExtra').show();
	$('.scoreContent').hide();
	$('.submitContent').hide();

	switch (page) {
		case 'submit':
			targetContainer = $('.submitContent');
			break;

		case 'scoreboard':
			targetContainer = $('.scoreContent');

			scoreListsData.newPage = 1;
			if (categorySettings.status) {
				loadScoreboard(gameData.category_arr[gameData.categoryNum]);
			} else {
				loadScoreboard('');
			}
			break;

		case '':
			targetContainer = null
			$('.resultExtra').hide();
			break;
	}

	if (targetContainer != null) {
		targetContainer.show();
	}
}

function submitUserScore(type, score) {
	var errorCon = false;
	var errorMessage = 'Submission error:';

	if ($('#uName').val().length == 0) {
		errorCon = true;
		errorMessage += '\n*Please enter your name';
	}

	if ($('#uEmail').val().length == 0) {
		errorCon = true;
		errorMessage += '\n*Please enter your email';
	}

	if (!validateEmail($('#uEmail').val())) {
		errorCon = true;
		errorMessage += '\n*Please enter a valite email';
	}

	if (errorCon) {
		alert(errorMessage);
	} else {
		//proceed	
		$.ajax({
			type: "POST",
			url: 'addScoreUnique.php',
			data: { name: $('#uName').val(), email: $('#uEmail').val(), type: type, score: score },
			success: submitScoreSuccess,
			dataType: 'json'
		});
	}
}

function submitScoreSuccess(data) {
	if (data.status == true) {
		toggleSaveButton(false);
		goScorePage('');
	} else {
		if (data.error == 0) {
			alert('Database connection error');
		} else {
			alert('Submission error, please try again.');
		}
	}
}

function validateEmail($email) {
	var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	return emailReg.test($email);
}

var scoreListsData = { page: 1, newPage: 1 };
function toggleScorePage(con) {
	if (con) {
		scoreListsData.newPage++;
		scoreListsData.newPage = scoreListsData.newPage > totalScorePage ? totalScorePage : scoreListsData.newPage;
	} else {
		scoreListsData.newPage--;
		scoreListsData.newPage = scoreListsData.newPage < 1 ? 1 : scoreListsData.newPage;
	}

	if (categorySettings.status) {
		loadScoreboard(gameData.category_arr[gameData.categoryNum]);
	} else {
		loadScoreboard('');
	}
}

function detectScorePage() {
	if (totalScorePage <= 1) {
		$('#buttonScorePrev').hide();
		$('#buttonScoreNext').hide();
	} else {
		$('#buttonScorePrev').hide();
		$('#buttonScoreNext').hide();

		if (scoreListsData.page > 1) {
			$('#buttonScorePrev').show();
		}

		if (scoreListsData.page < totalScorePage) {
			$('#buttonScoreNext').show();
		}
	}
}

function loadScoreboard(type) {
	if (scoreListsData.newPage != scoreListsData.page) {
		scoreListsData.page = scoreListsData.newPage;
	}

	detectScorePage();

	var pageLimit = String(((scoreListsData.page - 1) * 10) + ',' + ((scoreListsData.page) * 10));

	$.ajax({
		type: "POST",
		url: 'topRank.php',
		data: { type: type, reverse: scoreReverse, limit: pageLimit },
		success: loadScoreboardSuccess,
		dataType: 'json'
	});
}

function loadScoreboardSuccess(data) {
	var listCount = (scoreListsData.page - 1) * 10;

	for (var i = 0; i < 10; i++) {
		$('ul.scoreList li').eq(i + 1).find('div').eq(0).html('');

		if (typeof scoreRank_arr[listCount] != "undefined") {
			$('ul.scoreList li').eq(i + 1).find('div').eq(0).html(scoreRank_arr[listCount]);
		}

		$('ul.scoreList li').eq(i + 1).find('div').eq(1).html('');
		$('ul.scoreList li').eq(i + 1).find('div').eq(2).html('');
		$('ul.scoreList li').eq(i + 1).find('div').eq(3).html('');
		listCount++;
	}

	if (data.status == true) {
		var scoreList = data.datas;

		if (scoreList.length > 0) {
			for (var i = 0; i < scoreList.length; i++) {
				if (typeof scoreList[i] != "undefined") {
					$('ul.scoreList li').eq(i + 1).find('div').eq(0).html(scoreRank_arr[i]);
					$('ul.scoreList li').eq(i + 1).find('div').eq(1).html(scoreList[i].name);
					$('ul.scoreList li').eq(i + 1).find('div').eq(2).html(scoreList[i].type);

					if (resultSettings.mode == 'score') {
						$('ul.scoreList li').eq(i + 1).find('div').eq(3).html(scoreList[i].score);
					} else {
						$('ul.scoreList li').eq(i + 1).find('div').eq(3).html(millisecondsToTime(scoreList[i].score));
					}
				}
			}
		}
	} else {
		if (data.error == 0) {
			alert('Database connection error');
		}
	}
}