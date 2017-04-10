var baseTone = new Howl({
  src: ['audio/base-tone-low.wav'],
  autoplay: false,
  loop: true,
  volume: 0.5,
});

$('#start').click(function () {
 	// conditional needed to make the button an on-off toggle for the tone to play
 	if (baseTone.playing() === false) {
 		baseTone.play()
 	} 
 	else {
 		baseTone.stop()
 	}
})
