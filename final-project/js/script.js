//Only using Tuna and Howler

//set up OScillator node to start auiod stream
// set up gain nodes for each of the Tuna effects
//establish the graph
//write a function to capture the cooridinates within the graph

//Establish audio context
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioCtx = new AudioContext();

//Establish Tuna in Audio Context
var tuna = new Tuna(audioCtx);

//establish the Oscillator and Effect Nodes
var oscillator = audioCtx.createOscillator();
var chorus = new tuna.Chorus({
	rate: 0,
    feedback: .25,
    delay: .00045,
    bypass: 1,
})
var tremolo = new tuna.Tremolo({
	intesnity: 10,
	rate: 0,
	stereoPhase: 180,
	bypass: 1,
})
var phaser = new tuna.Phaser({
	rate: 8,
	depth: 0.75,
	feedback: 0.6,
	stereoPhase: 60,
	baseModulationFrequency: 1000,
	bypass: 1,
})
var distortion = new tuna.Overdrive({
	outputGain: 0.5,
	drive: 0.7,
	curveAmount: 1,
	algorithmIndex: 1,
	bypass: 1,
})

var gateNodeStart = audioCtx.createGain();
var gateNodeEnd = audioCtx.createGain();
gateNodeEnd.gain.value = 0.25;


//Connect Gate Node to complete audio chain
gateNodeStart.connect(gateNodeEnd);
gateNodeEnd.connect(audioCtx.destination);

//Variable to set play button on or off
var playing = false;
oscillator.start();

// mouse pointer coordinate variables
var curX;
var curY;
var rate

$('#start').click(function() {
	if(playing === false) {
		playing = true
		buttonOn(this);
	} else {
		playing = false;
		buttonOff(this);
	}
})

//function to toggle effects on or off
function effectToggle(effectNode) {
	if (effectNode.bypass === 1) {
		effectNode.bypass = 0;
		gateNodeStart.connect(effectNode);
		effectNode.connect(gateNodeEnd);
	} else {
		effectNode.bypass = 1;
		effectNode.disconnect();
	}
}

//button change CSS for on/off states
function buttonOn(button) {
	$(button).addClass('gradient');
}

function buttonOff(button) {
	$(button).removeClass('gradient');
}

// Sets the effects button to toggle effects on or off
$('#tremolo').click(effectToggle(tremolo));

$('#chorus').click(function() {
	effectToggle(chorus);
})

$('#phaser').click(function() {
	effectToggle(phaser);
})

$('#overdrive').click(function() {
	effectToggle(distortion);
})

//Sets playback of sound to start only when mouse moves over the effects grid
$('#effects-grid').mouseenter(function() {
	if (playing === true) {
		oscillator.connect(gateNodeStart);
		gateNodeEnd.connect(audioCtx.destination);
	} 
})

$('#effects-grid').mouseout(function() {
	if (playing === true) {
		gateNodeEnd.disconnect(audioCtx.destination);
	}
})

//dynamically change the effect values
$('#effects-grid').mousemove(function() {
	curX = event.pageX;
	curY = event.pageY;
	rate = (curX - 500) / 75;
	tremolo.rate = rate
	chorus.rate = rate
	phaser.rate = rate
})

//JS library to establish layout of the grid
var ctx = $('#effects-grid');

var grid = new Chart(ctx, {
	type: 'line',
	data: {
		xLabels: ['Zilch', 'Chill', 'Tame', 'Neat', 'Wild', 'Too Far'],
		xAxes: [{
			beginAtZero:false,
		}],
		//yLabels: ['Nada', 'Chill', 'Tame', 'Neat', 'Wild', 'Too Far'],
	},
	options: {
		scales: {
			yAxes: [{
				beginAtZero: false,
				labels: ['Zilch', 'Chill', 'Tame', 'Neat', 'Wild', 'Too Far'],
			}],
		},
		//yAxes: [{
		//	beginAtZero: false,
		//}],
		defaultFontFamily: 'Exo 2', 
		responsive: true,
		maintainAspectRatio: true,
	}
})

//var data = {
//	xLabels: ['Zilch', 'Tame', 'Neat', 'Wild', 'Too Far'],
//}
/*
$('#sine').click(function() {
	sineTest.play({
		tuna: {
			Chorus: {
				intensity: 1,
				rate: 8,
				stereoPhase: 57,
				bypass: 0,
			}
		}
	})
})
*/

