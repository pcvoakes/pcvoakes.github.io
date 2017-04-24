
var baseTone = new Howl({
  src: ['audio/base-tone-low.wav'],
  autoplay: false,
  loop: true,
  volume: 0.5,
});

var toneWad = new Wad({
	source:'../audio/base-tone-low.wav',
	volume: 0.25,
	loop: true,
	delay: {
		delayTime: .25,
		wet: 0.25,
		feedback: .75,
	},
	tremolo: {
		shape: 'triangle',
		magnitude: 1,
		speed: 1.5,
		attack: 0,
	},
	tuna: {
		Overdrive: {
			outputGain: 0.75,
			drive: 0.5,
			curveAmount: 1,
			algorithmIndex: 2,
			bypass: 0,
		},
	}
})

var sineTest = new Wad({
	source : 'sine',
	volume: .5,
})

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

$('#start').click(function () {
 	// conditional needed to make the button an on-off toggle for the tone to play
 	if (baseTone.playing() === false) {
 		baseTone.play()
 	} 
 	else {
 		baseTone.stop()
 	}
 	console.log(baseTone)
})

$('#start-wad').click(function () {
	toneWad.play();
})

$('#filter').click(function () {
	var tuna = new Tuna(Howler.ctx);
	var phaser = new tuna.Phaser({
	rate: 1.2,
	depth: 0.7,
	feedback: 0.3,
	stereoPhase: 70,
	baseModulationFrequency: 700,
	bypass: 0,
	});
	var input = Howler.ctx.createGain();
	var output = Howler.ctx.createGain();
	input.connect(phaser);
	phaser.connect(output);
	console.log(phaser);
	console.log(input);
})

