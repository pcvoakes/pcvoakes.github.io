//Only sing Tuna JS library

//set up OScillator node to start audio stream
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
var phaser = new tuna.Phaser({
	rate: 0,
	depth: .75,
	feedback: 0.75,
	stereoPhase: 20,
	baseModulationFrequency: 700,
	bypass: 1,
})
var distortion = new tuna.Overdrive({
	outputGain: 0.1,
	drive: 0.5,
	curveAmount: 0,
	algorithmIndex: 2,
	bypass: 1,
})

//create nodes to provide a space in audio path to connect effect nodes
var gateNodeEnd = audioCtx.createGain();
gateNodeEnd.gain.value = 0.5;

//create node for oscillioscope visualizer
var analyser = audioCtx.createAnalyser();


//Variable to set play button on or off and start the oscillator
var playing = false;
var noteChange = false;

var scale = [440, 493.88, 554.37, 587.33, 659.25, 739.99, 783.99, 830.61, 880,]

//Connect Audio Nodes to complete audio chain
distortion.connect(phaser);
phaser.connect(gateNodeEnd);
gateNodeEnd.connect(analyser);
analyser.connect(audioCtx.destination)

oscillator.start();

//Set up the Waveform oscillioscope canvas
var canvas = document.querySelector('#effects-grid');
var canvasCtx = canvas.getContext('2d');
var intendedWidth = document.querySelector('.effect-grid').clientWidth;
canvas.setAttribute('width',intendedWidth);
var drawVisual;

//variables for width and height of visualizer
WIDTH = canvas.width;
HEIGHT = canvas.height;


//Oscillioscope visualizer function
function waveScope () {

	analyser.fftSize = 2048;
	var bufferLength = analyser.frequencyBinCount;
	var dataArray = new Uint8Array(bufferLength);

	canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

	function draw () {
		drawVisual = requestAnimationFrame(draw);

		analyser.getByteTimeDomainData(dataArray);

		canvasCtx.fillStyle = 'rgb(46,19,114)';
		canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
		
		canvasCtx.lineWidth = 4;
		canvasCtx.strokeStyle = '#1ADB6F';

		canvasCtx.beginPath();

		var sliceWidth = WIDTH * 1.0 / bufferLength;
		var x = 0

		for(var i = 0; i < bufferLength; i++) {
   
        	var v = dataArray[i] / 128.0;
        	var y = v * HEIGHT/2;

        	if(i === 0) {
          		canvasCtx.moveTo(x, y);
        	} else {
          		canvasCtx.lineTo(x, y);
        	}

        	x += sliceWidth;
      	}	

      	canvasCtx.lineTo(canvas.width, canvas.height/2);
      	canvasCtx.stroke();
	};
	draw ();
};


// mouse pointer coordinate variables
var curX
var curY
var rate

//function to toggle effects on or off
function effectToggle(effectNode) {
	if (effectNode.bypass === 1) {
		effectNode.bypass = 0;
	} else {
		effectNode.bypass = 1;
	}
}

$('#start').click(function () {
	if (playing === false) {
		playing = true;
	} else {
		playing = false;
	}
	$(this).toggleClass('gradient');
})

// Sets the effects button to toggle effects on or off
$('#phaser').click(function() {
	effectToggle(phaser);
	$(this).toggleClass('gradient');
})

$('#overdrive').click(function() {
	effectToggle(distortion);
	$(this).toggleClass('gradient');
})

$('#notes').click(function () {
	if (noteChange === false) {
		noteChange = true;
	} else {
		noteChange = false;
		oscillator.frequency.value = 440;
	}
	$(this).toggleClass('gradient');
})

//Sets playback of sound to start only when mouse moves over the effects grid
$('#effects-grid').mouseenter(function() {
	if (playing === true) {
		oscillator.connect(distortion);
		gateNodeEnd.connect(analyser);
		waveScope();
	} 
})

$('#effects-grid').mouseout(function() {
	if (playing === true) {
		gateNodeEnd.disconnect(analyser);
		canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
	}
})

//dynamically change the effect values
$('#effects-grid').mousemove(function() {
	curX = event.pageX;
	curY = event.pageY;
	rate = curX / curY;
	curve = (curX/curY) * 0.11;
	phaser.rate = rate;
	distortion.curveAmount = curve;
	if (noteChange === true) {
		if ((curX + curY) % 10 === 0) {
			var randomNum = Math.floor((Math.random() * scale.length));
			oscillator.frequency.value = scale[randomNum];
		}
	}	
	// console.log();
})

