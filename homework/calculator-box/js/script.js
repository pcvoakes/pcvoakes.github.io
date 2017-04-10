var total = 0;

// user clicks #a10 - handle with .click
// add 10 to total, redefine total (total= 'total + 10')
// write total to #out

//click function for #a10 button
$('#a10').click(function () {
	//add 10 to var total
	total = total + 10;
	// write the new total to the center
	$('#out').text(total);
})

//click function for the #a20 button
$('#a20').click(function() {
	total = total + 20;
	$('#out').text(total);
})

//click function for the #a30 button
$('#a30').click(function() {
	total = total + 30;
	$('#out').text(total);
})

//click function for #red button
$('#red').click(function () {
	$('#out').css('background', 'red');
})

//click function for #blue button
$('#blue').click(function () {
	$('#out').css('background', 'blue');
})

//click function for #n10 button
$('#n10').click(function () {
	total = total - 10;
	$('#out').text(total);
})

//click function for #n20 button
$('#n20').click(function () {
	total = total - 20;
	$('#out').text(total);
})

//click function for #n30
$('#n30').click(function() {
	total = total - 30;
	$('#out').text(total);
})

//click #out to reset all changes
$('#out').click(function() {
	total = 0
	$('#out').text(total);
	$('#out').css('background', 'white');
})