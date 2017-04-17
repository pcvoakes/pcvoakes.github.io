var baseTone = new Howl({
  src: ['audio/base-tone-low.wav'],
  autoplay: false,
  loop: true,
  volume: 0.5,
});

var toneWad = new Wad({
	source:'/audio/base-tone-low.wav',
	volume: 0.5,
	loop: true,
	autoplay: false,
})

var sineTest = new Wad({
	source : 'sine',
	volume: .5,
})

var ctx = $('#effects-grid');

var grid = new Chart(ctx, {
	type: 'line',
	data: {
		labels: ['Zilch', 'Chill', 'Tame', 'Neat', 'Wild', 'Too Far'],
	},
	options: {
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
		loop: true,
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

