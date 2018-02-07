const songAudio = new Howl({
  src: ['../../audio/omfg-wonderful.mp3'],
  autoplay: true,
  volume: 0,
  onplay: showStartButton
});

const miss = new Howl({
  src: ['../../audio/miss.mp3'],
  autoplay: true,
  volume: 0
});

var hits = 0;
var misses = 0;
var startTime = 0;
var animationTime = 0;
var noteCount = 0;
animationTicker = 0;

var modal = document.getElementById('myModal');

function showStartButton() {
	document.querySelector(".modal-body").innerHTML = "<button class='start-button'>Start!</button>";
	document.querySelector(".start-button").onclick = startGame;
}

function addKeyEventListeners() {
	document.addEventListener("keydown", function(event){
		switch (event.key) {
			case "q":
			handlePoints(0);
			break;
			case "w":
			handlePoints(1);
			break;
			case "e":
			handlePoints(2);
			break;
			case "i":
			handlePoints(3);
			break;
			case "o":
			handlePoints(4);
			break;
			case "p":
			handlePoints(5);
			break;
			default:
			break;
		}
	});
}

function startGame() {
	addKeyEventListeners();
	modal.style.display = "none";
    songAudio.stop();
    songAudio.volume(1);
    miss.volume(1);
	var firstTimer = setTimeout(function(){
		songAudio.play();
		startTime = new Date().getTime();
		animationInterval();
	}, 2000);
	song.keys.forEach(function(keyArray, index){
		keyArray.forEach(function(number){
			noteCount += 1;
			document.querySelector("#note-count").innerHTML = noteCount;
			const targetTime = ((number - 1) * song.milliseconds);
			if (targetTime < 4000) {
				var div = document.createElement("div");
				div.classList.add("note");
				div.style.animation = "noteanimation 1s " + (targetTime + 1000) + "ms linear";
				div.id = targetTime;
				const columnNumber = index + 1;
				const noteColumn = document.querySelector(".column-" + columnNumber);
				noteColumn.appendChild(div);
			}
		});
	});
}

function animationInterval() {
	const interval = 2000; 
	var expected = Date.now() + interval;
	function step() {
	    var dt = Date.now() - expected; 
	    if (dt > interval) {
	        console.log("There was a problem with the interval.");
	    }
	    animateNotes();
	    expected += interval;
	    setTimeout(step, Math.max(0, interval - dt)); 
	}
	setTimeout(step, interval);
}

function animateNotes() {
	animationTicker += 2000;
	const notes = document.querySelectorAll(".note");
	notes.forEach(function(note){
		if (note.id < animationTicker) {
			note.parentNode.removeChild(note);
		}
	});
	song.keys.forEach(function(keyArray, index){
		keyArray.forEach(function(number, i){
			var targetTime = song.milliseconds * (number - 1);
			if (targetTime >= (animationTicker + 2000) && targetTime < (animationTicker + 4000)) {
				var div = document.createElement("div");
				div.classList.add("note");
				const time = targetTime - (animationTicker + 1000);
				div.style.animation = "noteanimation 1s " + Math.abs(time) + "ms linear";
				div.id = targetTime;
				const columnNumber = index + 1;
				const noteColumn = document.querySelector(".column-" + columnNumber);
				noteColumn.appendChild(div);
			}
		});
	});
}

function handlePoints(index) {
	const now = new Date().getTime();
	if (song.keys[index].length === 0) {
		missPoint(index);
	}
	song.keys[index].some(function(number, i){
		const targetTime = song.milliseconds * (number - 1);
		const difference = (now - startTime) - targetTime;
		if (Math.abs(difference) <= 200) {
			song.keys[index].splice(i, 1);
			hitPoint(index);
			return true;
		} else if (i === (song.keys[index].length - 1)) {
			missPoint(index);
		}
	});
}

function hitPoint(index) {
	hits += 1;
	document.querySelector("#hits").innerHTML = hits;
	animateHitAndMiss(index + 1, "hit");
}

function missPoint(index) {
	misses += 1;
	miss.play();
	document.querySelector("#misses").innerHTML = misses;
	animateHitAndMiss(index + 1, "miss");
}

function animateHitAndMiss(key, action){
	const keyDiv = document.querySelector(".key-" + key);
	const columnDiv = document.querySelector(".column-" + key);
	if (keyDiv.style.animation) {
		keyDiv.style.animation = "";
	}
	keyDiv.style.animation = action + "-flash linear 125ms 1";
	setTimeout(function(){ keyDiv.style.animation = ""; }, 125);
	if (columnDiv.style.animation) {
		columnDiv.style.animation = "";
	}
	columnDiv.style.animation = action + "-column-flash linear 125ms 1";
	setTimeout(function(){ columnDiv.style.animation = ""; }, 125);
}
