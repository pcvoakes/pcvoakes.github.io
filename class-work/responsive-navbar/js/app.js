$(document).ready(function () {
	// console.logs the window.width
	$(window).resize(function () {
		console.log($(window).width())
	})
})

// click event on burger
// slide toggle on the mobile nav
$('#burger').click(function () {
	$('#mobile-nav').slideToggle();
})
